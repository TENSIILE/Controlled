import { useRef, useLayoutEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { controlledLogger } from '../../controlled.utils';
import { withControlledGroup } from '../with-controlled-group.hoc';
import { useControlledGroupContext } from './context';

/**@public */
export const useDefaultValues = <InputFields extends FieldValues>(defaultValues: Partial<InputFields>): void => {
  const hasAssignedRef = useRef(false);

  const context = useControlledGroupContext<InputFields>();

  if (!context) {
    throw controlledLogger(
      `Ошибка! Невозможно использовать хук useDefaultValues вне вызова хока ${withControlledGroup.name}!`,
      { type: 'with-controlled-group' },
    );
  }

  !hasAssignedRef.current && Object.assign(context.control._defaultValues as Partial<InputFields>, defaultValues);

  useLayoutEffect(() => {
    hasAssignedRef.current = true;
  }, []);
};
