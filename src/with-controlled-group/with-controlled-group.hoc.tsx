import React, { FC, ComponentType, useMemo } from 'react';
import { FieldValues, FormProvider, useForm, UseFormProps } from 'react-hook-form';
import { isUndefined, controlledLogger } from '../controlled.utils';
import { unionOfAllIncomingDefaultValues } from './helpers';
import { useControlledGroupContext, useCreatePrivateHandleSubmit, useEmit, useSetValue } from './hooks';
import { useDifferenceValuesHookGuard } from './hooks/guard';
import { ControlledGroupType, ControlledGroupOptions, ControlledGroupReturn } from './with-controlled-group.types';

export const withControlledGroup = <Props, InputFields extends FieldValues>(
  Component: ComponentType<ControlledGroupType<Props, InputFields>>,
  options?: ControlledGroupOptions<InputFields>,
): FC<Props> => {
  const _defaultValues = options?.formArgs?.defaultValues ?? {};

  const _cachedValues = { current: { ..._defaultValues } };

  // eslint-disable-next-line react/display-name
  return (props: Props) => {
    const parentMethods = useControlledGroupContext<InputFields>();

    const methods = useForm<InputFields>({
      ...options?.formArgs,
      defaultValues: unionOfAllIncomingDefaultValues<InputFields>(options, {
        defaultValues: _defaultValues,
        cachedValues: _cachedValues,
      }),
    } as UseFormProps<InputFields>);

    if (options?.isDataDifferenceTrackingEnabled && Object.values(methods.control._formValues).some(isUndefined)) {
      throw controlledLogger(
        'Для использования трекинга мутированных данных, необходимо указать значения по умолчанию всем контролируемым компонентам группы!',
        { type: 'with-controlled-group' },
      );
    }

    const handleSubmit = useCreatePrivateHandleSubmit<InputFields>(methods, options, {
      cachedValues: _cachedValues,
    });

    const setValue = useSetValue<InputFields>(methods);

    const unstable_emit = useEmit<InputFields>(methods);

    const getDifferenceValues = useDifferenceValuesHookGuard<InputFields>(
      methods,
      methods.control._defaultValues,
      options?.isDataDifferenceTrackingEnabled,
    );

    const _methods: ControlledGroupReturn<InputFields>['controlled'] = useMemo(
      () => ({
        cachedState: _cachedValues.current,
        ...methods,
        ...(parentMethods && options?.isGroupUnite && parentMethods),
        setValue,
        handleSubmit,
        unstable_emit,
        getDifferenceValues,
      }),
      [methods, parentMethods, getDifferenceValues, handleSubmit, setValue, unstable_emit],
    );

    return (
      <FormProvider {..._methods}>
        <Component {...props} controlled={_methods} />
      </FormProvider>
    );
  };
};
