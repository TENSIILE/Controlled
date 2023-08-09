import { FieldValues, UseFormReturn } from 'react-hook-form';
/**@internal */
export declare const triggeringFieldAfterSettingValue: <InputFields extends FieldValues>(nativeMethods: UseFormReturn<InputFields, any>, environment: {
    name: import("react-hook-form").Path<InputFields>;
    value: import("react-hook-form").PathValue<InputFields, import("react-hook-form").Path<InputFields>>;
    options: Partial<{
        shouldValidate: boolean;
        shouldDirty: boolean;
        shouldTouch: boolean;
    }> | undefined;
}) => Promise<boolean | void>;
