import { ABI } from "./types";
export declare function getABIs(): ABI.Item[];
export declare function addABI(items: ABI.Item[]): void;
export declare function removeABI(items: ABI.Item[]): void;
export declare function getMethodIDs(): Map<string, ABI.Item>;
export interface DecodedMethod {
    name: string;
    params: DecodedMethodParam[];
}
export interface DecodedMethodParam {
    name: string;
    type: string;
    value?: any;
}
export declare function decodeMethod(data: string): DecodedMethod | undefined;
export interface LogItem {
    transactionIndex: string;
    logIndex: string;
    blockNumber: string;
    transactionHash: string;
    blockHash: string;
    data: string;
    topics: string[];
    address: string;
}
export declare function decodeLogs(logs: LogItem[]): ({
    name: string | undefined;
    events: DecodedMethodParam[] | undefined;
    address: string;
} | undefined)[];
//# sourceMappingURL=index.d.ts.map