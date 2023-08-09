import { FieldValues, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { ControlledGroupOptions, ControlledMutableCacheValues } from '../with-controlled-group.types';
/**@internal */
export declare const useCreatePrivateHandleSubmit: <InputFields extends FieldValues>(nativeMethods: UseFormReturn<InputFields, any>, options: Partial<{
    formArgs: Partial<{
        mode: keyof import("react-hook-form").ValidationMode;
        reValidateMode: "onChange" | "onSubmit" | "onBlur";
        defaultValues: import("react-hook-form").DeepPartial<InputFields>;
        resolver: import("react-hook-form").Resolver<InputFields, any>;
        context: any;
        shouldFocusError: boolean;
        shouldUnregister: boolean;
        shouldUseNativeValidation: boolean;
        criteriaMode: import("react-hook-form").CriteriaMode;
        delayError: number;
    }>;
    await: (keyof InputFields)[];
    isGiveAwaitedAnswer: boolean;
    isCacheEnabled: boolean;
    isGroupUnite: boolean;
    discharge: import("../with-controlled-group.types").ControlledGroupDischargeOptions<InputFields>;
    isDataDifferenceTrackingEnabled: boolean;
}> | undefined, environment: {
    cachedValues: ControlledMutableCacheValues;
}) => UseFormHandleSubmit<InputFields>;
