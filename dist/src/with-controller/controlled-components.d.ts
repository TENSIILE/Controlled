import React from 'react';
import { FormFieldType } from '../form-fields/form-fields.types';
import { ControlledComponentsType } from '../with-controller/with-controller.types';
/**
 * Примеры создания контролируемых компонентов на основе готовой библиотеки
 * и нативного `input` JSX-элемента.
 */
export declare const ControlledNativeInput: <InputFields extends import("react-hook-form").FieldValues>({ control, errors, name, defaultValue, controlledGroup, rules, onAction, ...ownProps }: {
    name: import("react-hook-form").Path<InputFields>;
    defaultValue?: import("react-hook-form").PathValue<InputFields, import("react-hook-form").Path<InputFields>> | undefined;
    rules?: Omit<Partial<{
        required: string | import("react-hook-form").ValidationRule<boolean>;
        min: import("react-hook-form").ValidationRule<string | number>;
        max: import("react-hook-form").ValidationRule<string | number>;
        maxLength: import("react-hook-form").ValidationRule<number>;
        minLength: import("react-hook-form").ValidationRule<number>;
        pattern: import("react-hook-form").ValidationRule<RegExp>;
        validate: import("react-hook-form").Validate<any> | Record<string, import("react-hook-form").Validate<any>>;
        valueAsNumber: boolean;
        valueAsDate: boolean;
        value: any;
        setValueAs: (value: any) => any;
        shouldUnregister?: boolean | undefined;
        onChange?: ((event: any) => void) | undefined;
        onBlur?: ((event: any) => void) | undefined;
        disabled: boolean;
        deps: string | string[];
    }>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined;
    onAction?: import("../with-controller/with-controller.types").AnonimFunction | undefined;
    controlledGroup?: import("../with-controller/with-controller.types").ControlledGroup<InputFields> | undefined;
} & import("../with-controller/with-controller.types").HookFormRequiredProps<InputFields> & import("../with-controller/with-controller.types").WithoutRequiredProps<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>) => React.JSX.Element;
export declare const ControlledInput: <InputFields extends import("react-hook-form").FieldValues>({ control, errors, name, defaultValue, controlledGroup, rules, onAction, ...ownProps }: {
    name: import("react-hook-form").Path<InputFields>;
    defaultValue?: import("react-hook-form").PathValue<InputFields, import("react-hook-form").Path<InputFields>> | undefined;
    rules?: Omit<Partial<{
        required: string | import("react-hook-form").ValidationRule<boolean>;
        min: import("react-hook-form").ValidationRule<string | number>;
        max: import("react-hook-form").ValidationRule<string | number>;
        maxLength: import("react-hook-form").ValidationRule<number>;
        minLength: import("react-hook-form").ValidationRule<number>;
        pattern: import("react-hook-form").ValidationRule<RegExp>;
        validate: import("react-hook-form").Validate<any> | Record<string, import("react-hook-form").Validate<any>>;
        valueAsNumber: boolean;
        valueAsDate: boolean;
        value: any;
        setValueAs: (value: any) => any;
        shouldUnregister?: boolean | undefined;
        onChange?: ((event: any) => void) | undefined;
        onBlur?: ((event: any) => void) | undefined;
        disabled: boolean;
        deps: string | string[];
    }>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined;
    onAction?: import("../with-controller/with-controller.types").AnonimFunction | undefined;
    controlledGroup?: import("../with-controller/with-controller.types").ControlledGroup<InputFields> | undefined;
} & import("../with-controller/with-controller.types").HookFormRequiredProps<InputFields> & import("../with-controller/with-controller.types").WithoutRequiredProps<import("antd").InputProps & React.RefAttributes<import("antd").InputRef>>) => React.JSX.Element;
export declare const ControlledCheckbox: <InputFields extends import("react-hook-form").FieldValues>({ control, errors, name, defaultValue, controlledGroup, rules, onAction, ...ownProps }: {
    name: import("react-hook-form").Path<InputFields>;
    defaultValue?: import("react-hook-form").PathValue<InputFields, import("react-hook-form").Path<InputFields>> | undefined;
    rules?: Omit<Partial<{
        required: string | import("react-hook-form").ValidationRule<boolean>;
        min: import("react-hook-form").ValidationRule<string | number>;
        max: import("react-hook-form").ValidationRule<string | number>;
        maxLength: import("react-hook-form").ValidationRule<number>;
        minLength: import("react-hook-form").ValidationRule<number>;
        pattern: import("react-hook-form").ValidationRule<RegExp>;
        validate: import("react-hook-form").Validate<any> | Record<string, import("react-hook-form").Validate<any>>;
        valueAsNumber: boolean;
        valueAsDate: boolean;
        value: any;
        setValueAs: (value: any) => any;
        shouldUnregister?: boolean | undefined;
        onChange?: ((event: any) => void) | undefined;
        onBlur?: ((event: any) => void) | undefined;
        disabled: boolean;
        deps: string | string[];
    }>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined;
    onAction?: import("../with-controller/with-controller.types").AnonimFunction | undefined;
    controlledGroup?: import("../with-controller/with-controller.types").ControlledGroup<InputFields> | undefined;
} & import("../with-controller/with-controller.types").HookFormRequiredProps<InputFields> & import("../with-controller/with-controller.types").WithoutRequiredProps<import("antd").CheckboxProps & React.RefAttributes<HTMLInputElement>>) => React.JSX.Element;
export declare const ControlledTextArea: <InputFields extends import("react-hook-form").FieldValues>({ control, errors, name, defaultValue, controlledGroup, rules, onAction, ...ownProps }: {
    name: import("react-hook-form").Path<InputFields>;
    defaultValue?: import("react-hook-form").PathValue<InputFields, import("react-hook-form").Path<InputFields>> | undefined;
    rules?: Omit<Partial<{
        required: string | import("react-hook-form").ValidationRule<boolean>;
        min: import("react-hook-form").ValidationRule<string | number>;
        max: import("react-hook-form").ValidationRule<string | number>;
        maxLength: import("react-hook-form").ValidationRule<number>;
        minLength: import("react-hook-form").ValidationRule<number>;
        pattern: import("react-hook-form").ValidationRule<RegExp>;
        validate: import("react-hook-form").Validate<any> | Record<string, import("react-hook-form").Validate<any>>;
        valueAsNumber: boolean;
        valueAsDate: boolean;
        value: any;
        setValueAs: (value: any) => any;
        shouldUnregister?: boolean | undefined;
        onChange?: ((event: any) => void) | undefined;
        onBlur?: ((event: any) => void) | undefined;
        disabled: boolean;
        deps: string | string[];
    }>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined;
    onAction?: import("../with-controller/with-controller.types").AnonimFunction | undefined;
    controlledGroup?: import("../with-controller/with-controller.types").ControlledGroup<InputFields> | undefined;
} & import("../with-controller/with-controller.types").HookFormRequiredProps<InputFields> & import("../with-controller/with-controller.types").WithoutRequiredProps<import("antd/es/input").TextAreaProps & React.RefAttributes<import("antd/es/input/TextArea").TextAreaRef>>) => React.JSX.Element;
export declare const ControlledPassword: <InputFields extends import("react-hook-form").FieldValues>({ control, errors, name, defaultValue, controlledGroup, rules, onAction, ...ownProps }: {
    name: import("react-hook-form").Path<InputFields>;
    defaultValue?: import("react-hook-form").PathValue<InputFields, import("react-hook-form").Path<InputFields>> | undefined;
    rules?: Omit<Partial<{
        required: string | import("react-hook-form").ValidationRule<boolean>;
        min: import("react-hook-form").ValidationRule<string | number>;
        max: import("react-hook-form").ValidationRule<string | number>;
        maxLength: import("react-hook-form").ValidationRule<number>;
        minLength: import("react-hook-form").ValidationRule<number>;
        pattern: import("react-hook-form").ValidationRule<RegExp>;
        validate: import("react-hook-form").Validate<any> | Record<string, import("react-hook-form").Validate<any>>;
        valueAsNumber: boolean;
        valueAsDate: boolean;
        value: any;
        setValueAs: (value: any) => any;
        shouldUnregister?: boolean | undefined;
        onChange?: ((event: any) => void) | undefined;
        onBlur?: ((event: any) => void) | undefined;
        disabled: boolean;
        deps: string | string[];
    }>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined;
    onAction?: import("../with-controller/with-controller.types").AnonimFunction | undefined;
    controlledGroup?: import("../with-controller/with-controller.types").ControlledGroup<InputFields> | undefined;
} & import("../with-controller/with-controller.types").HookFormRequiredProps<InputFields> & import("../with-controller/with-controller.types").WithoutRequiredProps<import("antd/es/input").PasswordProps & React.RefAttributes<import("antd").InputRef>>) => React.JSX.Element;
export declare const ControlledComponents: ControlledComponentsType<FormFieldType>;
