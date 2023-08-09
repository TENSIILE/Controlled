import React, { ComponentType } from 'react';
import { FieldValues } from 'react-hook-form';
import { ControllerConfig, NativeComponentProps, WithoutRequiredProps, AnonimFunction } from './with-controller.types';
/**
 *
 * @param WrappedComponent Компонент или JSX-элемент, который необходимо преобразовать в контролируемый
 * @param config Объект конфигураций для тонкой настройки компонента
 * @returns Контролируемый компонент `React.ComponentType<...>`
 */
export declare const withController: <Props, K extends keyof Props | null = null>(WrappedComponent: React.ComponentType<Props>, config?: ControllerConfig<Props, K extends null ? "onChange" : K> | undefined) => <InputFields extends FieldValues>({ control, errors, name, defaultValue, controlledGroup, rules, onAction, ...ownProps }: {
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
    onAction?: (K extends null ? AnonimFunction : Props[K & string]) | undefined;
    controlledGroup?: import("./with-controller.types").ControlledGroup<InputFields> | undefined;
} & import("./with-controller.types").HookFormRequiredProps<InputFields> & WithoutRequiredProps<K extends null ? Props : Omit<Props, K & string>>) => React.JSX.Element;
