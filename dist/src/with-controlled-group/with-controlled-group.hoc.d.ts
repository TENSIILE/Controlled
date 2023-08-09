import React, { FC, ComponentType } from 'react';
import { FieldValues } from 'react-hook-form';
import { ControlledGroupType, ControlledGroupOptions } from './with-controlled-group.types';
export declare const withControlledGroup: <Props, InputFields extends FieldValues>(Component: React.ComponentType<ControlledGroupType<Props, InputFields>>, options?: Partial<{
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
    discharge: import("./with-controlled-group.types").ControlledGroupDischargeOptions<InputFields>;
    isDataDifferenceTrackingEnabled: boolean;
}> | undefined) => React.FC<Props>;
