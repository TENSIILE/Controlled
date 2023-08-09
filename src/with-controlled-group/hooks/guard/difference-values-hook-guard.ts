/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from 'react';
import { DeepPartial, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { controlledLogger } from '../../../controlled.utils';
import { getDiffProperties } from '../../helpers';
import { ControlledDefaultValues, DifferenceValuesReviverHandler } from '../../with-controlled-group.types';

/**@internal*/
export let _internalDifferenceValuesReviver: DifferenceValuesReviverHandler | undefined;

const differenceValuesReviverGenerator =
  <InputFields extends FieldValues>(
    nativeMethods: UseFormReturn<InputFields>,
    differenceValuesRef: { current: { default: ControlledDefaultValues; state: ControlledDefaultValues } },
  ): DifferenceValuesReviverHandler =>
  inputFieldName => {
    const fieldName = inputFieldName as unknown as Path<InputFields>;

    const value = nativeMethods.getValues(fieldName);

    differenceValuesRef.current.default = { ...differenceValuesRef.current.default, [fieldName]: value };
  };

/**@internal*/
export const useDifferenceValuesHookGuard = <InputFields extends FieldValues>(
  nativeMethods: UseFormReturn<InputFields>,
  defaultValues: ControlledDefaultValues,
  isDataDifferenceTrackingEnabled: boolean | undefined,
): (() => Partial<InputFields>) => {
  const differenceValuesRef = useRef({ default: defaultValues, state: {} });

  if (isDataDifferenceTrackingEnabled) {
    const setDifference = (state: DeepPartial<InputFields>) => {
      const difference = getDiffProperties(differenceValuesRef.current.default, state);

      /**
       * @attention
       * Для использования трекинга измененных данных, пожайлуста, устанавливайте дефолтные состояния всем компонентам, либо через пропсу `defaultValue`, либо через хук `useDefaultValues`, это поможет избежать проблем с неправильным определением изменения состояния всей группы!
       */
      differenceValuesRef.current.state = difference;
    };

    const differenceValuesReviver = differenceValuesReviverGenerator<InputFields>(nativeMethods, differenceValuesRef);

    _internalDifferenceValuesReviver = differenceValuesReviver;

    useEffect(() => {
      nativeMethods.watch(setDifference);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }

  return () => {
    if (!isDataDifferenceTrackingEnabled) {
      throw controlledLogger(
        'Была замечана попытка получить состояния измененных полей! Отслеживание измененного состояния отключено! Для того, чтобы начать пользоваться им, включите пункт isDataDifferenceTrackingEnabled в настройках контролируемой группы!',
        { type: 'with-controlled-group' },
      );
    }

    return differenceValuesRef.current.state;
  };
};
