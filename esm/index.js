import BN from "bn.js";
import { sha3 } from "web3-utils";
import { AbiCoder } from "web3-eth-abi";
const coder = new AbiCoder();
const savedABIs = new Set();
const methodIDs = new Map();
export function getABIs() {
    return Array.from(savedABIs);
}
function typeStringify(input) {
    if (input.type === "tuple") {
        return `(${input.components.map(typeStringify).join(",")})`;
    }
    return input.type;
}
export function addABI(items) {
    for (const abi of items) {
        savedABIs.add(abi);
        if (!abi.name) {
            return;
        }
        const signature = sha3(`${abi.name}(${abi.inputs.map(typeStringify).join(",")})`);
        if (abi.type === "event") {
            methodIDs.set(signature.slice(2), abi);
        }
        else {
            methodIDs.set(signature.slice(2, 10), abi);
        }
    }
}
export function removeABI(items) {
    for (const item of items) {
        savedABIs.add(item);
        if (!item.name) {
            return;
        }
        const signature = sha3(`${item.name}(${item.inputs.map(typeStringify).join(",")})`);
        if (item.type === "event") {
            methodIDs.delete(signature.slice(2));
        }
        else {
            methodIDs.delete(signature.slice(2, 10));
        }
    }
}
export function getMethodIDs() {
    return new Map(methodIDs);
}
export function decodeMethod(data) {
    const methodID = data.slice(2, 10);
    const item = methodIDs.get(methodID);
    if (!item) {
        return;
    }
    const { name, inputs } = item;
    let decoded = coder.decodeParameters(inputs, data.slice(10));
    const params = [];
    for (let i = 0; i < decoded.__length__; i++) {
        const { name, type } = inputs[i];
        params.push({
            name,
            type,
            value: ((value) => {
                if (/^u?int/.test(type)) {
                    if (Array.isArray(value)) {
                        return value.map((_) => new BN(_).toString());
                    }
                    else {
                        return new BN(value).toString();
                    }
                }
                else if (/^address/.test(type)) {
                    if (Array.isArray(value)) {
                        return value.map((_) => _.toLowerCase());
                    }
                    else {
                        return value.toLowerCase();
                    }
                }
                return;
            })(decoded[i]),
        });
    }
    return { name: name, params };
}
export function decodeLogs(logs) {
    logs = logs.filter((log) => log.topics.length > 0);
    return logs.map(({ topics, data, address }) => {
        var _a, _b;
        const methodID = topics[0].slice(2);
        const method = methodIDs.get(methodID);
        if (!method) {
            return;
        }
        const logData = data;
        let dataIndex = 0;
        let topicsIndex = 1;
        let dataTypes = [];
        (_a = method.inputs) === null || _a === void 0 ? void 0 : _a.map((input) => {
            if (!input.indexed) {
                dataTypes.push(input.type);
            }
        });
        const decodedData = coder.decodeParameters(dataTypes, logData.slice(2));
        // Loop topic and data to get the params
        const events = (_b = method.inputs) === null || _b === void 0 ? void 0 : _b.map(({ name, type, indexed }) => {
            let params = { name, type, value: "" };
            if (indexed) {
                params.value = topics[topicsIndex];
                topicsIndex++;
            }
            else {
                params.value = decodedData[dataIndex];
                dataIndex++;
            }
            if (type === "address") {
                params.value = params.value.toLowerCase();
                // 42 because len(0x) + 40
                if (params.value.length > 42) {
                    let toRemove = params.value.length - 42;
                    let temp = params.value.split("");
                    temp.splice(2, toRemove);
                    params.value = temp.join("");
                }
            }
            if (/^uint256|uint8|int$/.test(type)) {
                // ensure to remove leading 0x for hex numbers
                if (typeof params.value === "string" && params.value.startsWith("0x")) {
                    params.value = new BN(params.value.slice(2), 16).toString(10);
                }
                else {
                    params.value = new BN(params.value).toString(10);
                }
            }
            return params;
        });
        return { name: method.name, events, address };
    });
}
