/**@internal */
export declare const isUndefined: (data: unknown) => data is undefined;
/**@internal */
export declare const controlledLogger: <ErrorView extends "throw" | "error" = "throw">(message: string, { name, errorView, type, }?: {
    type?: "with-controller" | "form-fields" | "with-controlled-group" | undefined;
    name?: string | undefined;
    errorView?: ErrorView | undefined;
}) => ErrorView extends "error" ? void : never;
