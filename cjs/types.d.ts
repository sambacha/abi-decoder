export declare namespace ABI {
    type Type = "function" | "constructor" | "event" | "fallback";
    type StateMutabilityType = "pure" | "view" | "nonpayable" | "payable";
    interface Item {
        type: Type;
        anonymous?: boolean;
        constant?: boolean;
        gas?: number;
        inputs?: Input[];
        name?: string;
        outputs?: Output[];
        payable?: boolean;
        stateMutability?: StateMutabilityType;
    }
    interface Input {
        name: string;
        type: string;
        indexed?: boolean;
        components?: Input[];
        internalType?: string;
    }
    interface Output {
        name: string;
        type: string;
        components?: Output[];
        internalType?: string;
    }
}
//# sourceMappingURL=types.d.ts.map