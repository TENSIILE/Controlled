import { FieldValues } from 'react-hook-form';
import { HookFormRequiredProps, ReactHookFormProps, WithoutRequiredProps, ControlledComponentsType } from '../with-controller/with-controller.types';
/**
 * @public
 * @example
 * Input = 'input',
   Checkbox = 'checkbox',
   Textarea = 'textarea',
   ...
 */
export declare enum FormFieldType {
    Input = "input",
    Checkbox = "checkbox",
    Textarea = "textarea",
    Password = "password"
}
/**@public */
export type Empty = Record<string, unknown>;
/**@public */
export type FormFieldsDynamicsType<InputFields extends FieldValues> = Partial<Record<keyof InputFields, unknown>>;
/**@public */
export type FormFieldsItem<InputFields extends FieldValues> = PropsResponse<InputFields>;
/**@internal */
export interface PropsResponse<InputFields extends FieldValues> extends ReactHookFormProps<InputFields> {
    type?: FormFieldType | string;
}
/**@internal */
export interface FormFieldsProps<InputFields extends FieldValues, CustomFormFieldType extends string = string> extends HookFormRequiredProps<InputFields> {
    items: FormFieldsItem<InputFields>[];
    dynamics?: FormFieldsDynamicsType<InputFields>;
    controlledComponents?: ControlledComponentsType<CustomFormFieldType>;
}
/**@internal */
type BuildFormProps<Props, InputFields extends FieldValues | Empty = Empty, OnChangeActionPropName extends keyof Props | 'onChange' = 'onChange'> = WithoutRequiredProps<Props> & {
    onAction?: OnChangeActionPropName extends 'onChange' ? Props[OnChangeActionPropName & keyof Props] : PropsResponse<InputFields>['onAction'];
} & (InputFields extends Empty ? Omit<PropsResponse<InputFields>, 'name' | 'onAction'> : PropsResponse<InputFields>);
/**@internal */
export type FormPropsBuilder = <Props, InputFields extends FieldValues | Empty = Empty, OnChangeActionPropName extends keyof Props | 'onChange' = 'onChange'>(props: BuildFormProps<Props, InputFields, OnChangeActionPropName>) => BuildFormProps<Props, InputFields, OnChangeActionPropName>;
export {};
