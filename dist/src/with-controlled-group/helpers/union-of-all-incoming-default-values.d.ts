import { FieldValues } from 'react-hook-form';
import { ControlledDefaultValues, ControlledGroupOptions, ControlledMutableCacheValues } from '../with-controlled-group.types';
/**@internal */
export declare const unionOfAllIncomingDefaultValues: <InputFields extends FieldValues>(options: Partial<{
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
    defaultValues: ControlledDefaultValues;
    cachedValues: ControlledMutableCacheValues;
}) => ControlledDefaultValues;
