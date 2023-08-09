import { FC } from 'react';
import { Control, Controller, DeepRequired, FieldErrorsImpl, FieldValues, Path, PathValue } from 'react-hook-form';

/**@public */
export type HookFormRules = Parameters<typeof Controller>[0]['rules'];

/**@public */
export type ControlledComponentsType<T extends string = string> = { [key in T]: FC<never> };

/**@internal */
export interface ControlledComponentOptionalProps {
  errorStatus?: 'error' | 'default' | string;
}

/**@internal */
export interface HookFormRequiredProps<InputFields extends FieldValues> {
  control?: Control<InputFields>;
  errors?: FieldErrorsImpl<DeepRequired<InputFields>>;
}

/**@internal */
export type AnonimFunction = (...args: any[]) => void;

/**@internal */
export interface ControlledGroup<InputFields extends FieldValues> {
  asyncDefaultValue?:
    | PathValue<InputFields, Path<InputFields>>
    | Promise<PathValue<InputFields, Path<InputFields>>>
    | ((inputFields: InputFields) => PathValue<InputFields, Path<InputFields>>)
    | null;
  isUnmountDestroyState?: boolean;
}

/**@internal */
export type NativeComponentProps<InputFields extends FieldValues, TOnActionType = AnonimFunction> = {
  name: Path<InputFields>;
  defaultValue?: PathValue<InputFields, Path<InputFields>>;
  rules?: HookFormRules;
  onAction?: TOnActionType;
  controlledGroup?: ControlledGroup<InputFields>;
} & HookFormRequiredProps<InputFields>;

/**@internal */
export type ReactHookFormProps<InputFields extends FieldValues> = Pick<
  NativeComponentProps<InputFields, AnonimFunction>,
  'name' | 'defaultValue' | 'rules' | 'onAction' | 'controlledGroup'
>;

/**@internal */
export type WithoutRequiredProps<Props> = Omit<Props, 'value' | 'onChange'>;

/**@internal */
export interface ControllerConfig<Props, OnChangePropName extends keyof Props | 'onChange' | null> {
  adapter?: (
    value: string,
    onChange: OnChangePropName extends null
      ? AnonimFunction
      : (Props & { onChange: unknown })[OnChangePropName & string],
    options: {
      props: Props;
      errorStatus: ControlledComponentOptionalProps['errorStatus'];
      errorMessage?: string;
    },
  ) => Partial<Props> | undefined;
}
