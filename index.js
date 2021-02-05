const AbiDecoder = function () {
  const SolidityCoder = require("./web3/lib/solidity/coder.js");
  const Web3 = require("web3");

/* eslint-disable no-unused-vars */
  const { sha3, BN } = require("web3-utils");

  const abiCoder = require("web3-eth-abi");


  const state = {
    savedABIs: [],
    methodIDs: {},
  };

  function _getABIs() {
    return state.savedABIs;
  }

  function _typeToString(input) {
    if (input.type === "tuple") {
      return "(" + input.components.map(_typeToString).join(",") + ")";
    }
    return input.type;
  }

  function _addABI(abiArray) {
    if (Array.isArray(abiArray)) {

			// Iterate new abi to generate method id's
			abiArray.map(function (abi) {
				if (abi.name) {
					const signature = new Web3().sha3(abi.name + "(" + abi.inputs.map(function (input) {
						return input.type;
					}).join(",") + ")");
					if (abi.type == "event") {
						state.methodIDs[signature.slice(2)] = abi;
					}
					else {
						state.methodIDs[signature.slice(2, 10)] = abi;
					}
				}
			});

			state.savedABIs = state.savedABIs.concat(abiArray);
		}
		else {
			throw new Error("Expected ABI array, got " + typeof abiArray);
		}
	}

	function _removeABI(abiArray) {
		if (Array.isArray(abiArray)) {

			// Iterate new abi to generate method id's
			abiArray.map(function (abi) {
				if (abi.name) {
					const signature = new Web3().sha3(abi.name + "(" + abi.inputs.map(function (input) {
						return input.type;
					}).join(",") + ")");
					if (abi.type == "event") {
						if (state.methodIDs[signature.slice(2)]) {
							delete state.methodIDs[signature.slice(2)];
						}
					}
					else {
						if (state.methodIDs[signature.slice(2, 10)]) {
							delete state.methodIDs[signature.slice(2, 10)];
						}
					}
				}
			});
		}
		else {
			throw new Error("Expected ABI array, got " + typeof abiArray);
		}
	}

  function _getMethodIDs() {
    return state.methodIDs;
  }

  function _decodeMethod(data) {
    const methodID = data.slice(2, 10);
    const abiItem = state.methodIDs[methodID];
    if (abiItem) {
      const params = abiItem.inputs.map(function (item) {
        return item.type;
      });
      let decoded = SolidityCoder.decodeParams(params, data.slice(10));
      return {
        name: abiItem.name,
        params: decoded.map(function (param, index) {
          let parsedParam = param;
          const isUint = abiItem.inputs[index].type.indexOf("uint") == 0;
          const isInt = abiItem.inputs[index].type.indexOf("int") == 0;

          if (isUint || isInt) {
            const isArray = Array.isArray(param);

            if (isArray) {
              parsedParam = param.map((val) => new Web3().toBigNumber(val).toString());
            } else {
              parsedParam = new Web3().toBigNumber(param).toString();
            }
          }
          return {
            name: abiItem.inputs[index].name,
            value: parsedParam,
            type: abiItem.inputs[index].type,
          };
        }),
      };
    }
  }

/**
* @generator
* @function padZeros
* @yields {address} 
*/
  

  function padZeros(address) {
    var formatted = address;
    if (address.indexOf("0x") != -1) {
      formatted = address.slice(2);
    }

    if (formatted.length < 40) {
      while (formatted.length < 40) formatted = "0" + formatted;
    }

    return "0x" + formatted;
  }
/** 
* @decodelogs 
* @param {logs}
* @return {keepBlockNumber , keepTxHash} 
*/

  function _decodeLogs(logs, keepBlockNumber, keepTxHash) {
    return logs.map(function (logItem) {
      const methodID = logItem.topics[0].slice(2);
      const method = state.methodIDs[methodID];
      if (method) {
        const logData = logItem.data;
        let decodedParams = [];
        let dataIndex = 0;
        let topicsIndex = 1;
/** 
* @summary 
* @param {index} dataTypes 
* @return {tuple} 
*/
        
  let dataTypes = [];
  method.inputs.map(function (input) {
    if (!input.indexed) {
      if (input.type === "tuple") {
   //     dataTypes.push("tuple"(input));
        dataTypes.push("tuple" + _typeToString(input));

            } else {
              dataTypes.push(input);
            }
          }
        });
        const decodedData = SolidityCoder.decodeParams(dataTypes, logData.slice(2));
        // Loop topic and data to get the params
        method.inputs.map(function (param) {
          var decodedP = {
            name: param.name,
            type: param.type,
          };

          if (param.indexed) {
            decodedP.value = logItem.topics[topicsIndex];
            topicsIndex++;
          } else {
            decodedP.value = decodedData[dataIndex];
            dataIndex++;
          }

          if (param.type == "address") {
            decodedP.value = padZeros(new Web3().toBigNumber(decodedP.value).toString(16));
          } else if (param.type == "uint256" || param.type == "uint8" || param.type == "int") {
          
               // ensure to remove leading 0x for hex numbers
          if (typeof decodedP.value === "string" && decodedP.value.startsWith("0x")) {
            decodedP.value = new BN(decodedP.value.slice(2), 16).toString(10);
          } else {
            decodedP.value = new BN(decodedP.value).toString(10);
          }

        }

        decodedParams.push(decodedP);
      });
          //  decodedP.value = new Web3().toBigNumber(decodedP.value).toString(10);
         // }

        var eventObj = { 
          name: method.name,
          events: decodedParams,
          address: logItem.address,
        };
        if (keepBlockNumber) {
          eventObj['blockNumber'] = logItem.blockNumber;
        }
  
        if (keepTxHash) {
          eventObj['transactionHash'] = logItem.transactionHash;
        }
  
        return eventObj;
      }
    });
  }

  return {
    getABIs: _getABIs,
    addABI: _addABI,
    getMethodIDs: _getMethodIDs,
    decodeMethod: _decodeMethod,
    decodeLogs: _decodeLogs,
    removeABI: _removeABI,
  };
};

const abiDecoder = new AbiDecoder();

module.exports = {
  AbiDecoder: AbiDecoder,
  getABIs: abiDecoder.getABIs,
  addABI: abiDecoder.addABI,
  getMethodIDs: abiDecoder.getMethodIDs,
  decodeMethod: abiDecoder.decodeMethod,
  decodeLogs: abiDecoder.decodeLogs,
  removeABI: abiDecoder.removeABI,
};
