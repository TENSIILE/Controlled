import React, { ComponentType } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { controlledLogger } from '../controlled.utils';
import { useControllerGroupEffect, useControlledGroupContext } from '../with-controlled-group/hooks';
import {
  ControllerConfig,
  NativeComponentProps,
  WithoutRequiredProps,
  ControlledComponentOptionalProps,
  AnonimFunction,
} from './with-controller.types';

/**
 *
 * @param WrappedComponent Компонент или JSX-элемент, который необходимо преобразовать в контролируемый
 * @param config Объект конфигураций для тонкой настройки компонента
 * @returns Контролируемый компонент `React.ComponentType<...>`
 */
export const withController =
  <Props, K extends keyof Props | null = null>(
    WrappedComponent: ComponentType<Props>,
    config?: ControllerConfig<Props, K extends null ? 'onChange' : K>,
  ) =>
  // eslint-disable-next-line react/display-name
  <InputFields extends FieldValues>({
    control,
    errors,
    name,
    defaultValue,
    controlledGroup,
    rules,
    onAction,
    ...ownProps
  }: NativeComponentProps<InputFields, K extends null ? AnonimFunction : Props[K & string]> &
    WithoutRequiredProps<K extends null ? Props : Omit<Props, K & string>>) => {
    const methods = useControlledGroupContext<InputFields>();

    const commonErrors = errors || methods?.formState.errors;
    const commonControl = control || methods?.control;

    if (!commonControl || !commonErrors) {
      throw controlledLogger('Вы забыли указать пропсы "control" или "errors" для работы компонента!', { name });
    }

    return (
      <Controller
        control={commonControl}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { value, onChange } }) => {
          const _ownProps = ownProps as unknown as Props & ControlledComponentOptionalProps;

          const handleChange: AnonimFunction = (...args) => {
            onChange(...args);
            (onAction as any)?.(...args);
          };

          const adaptedProps = config?.adapter?.(value as string, handleChange as any, {
            props: _ownProps,
            errorMessage: commonErrors[name]?.message?.toString(),
            errorStatus: (commonErrors[name]?.message ? 'error' : _ownProps.errorStatus) ?? 'default',
          });

          useControllerGroupEffect(methods, controlledGroup, name);

          return <WrappedComponent {..._ownProps} onChange={handleChange} value={value} {...adaptedProps} />;
        }}
      />
    );
  };
