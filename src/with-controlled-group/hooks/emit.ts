import { useCallback } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { ControlledGroupEmitHandler } from '../with-controlled-group.types';

/**
 * @internal
 * @unstable
 **/
export const useEmit = <InputFields extends FieldValues>(nativeMethods: UseFormReturn<InputFields>) =>
  useCallback<ControlledGroupEmitHandler<InputFields>>(
    subject => {
      nativeMethods.control._subjects.watch.next(
        subject as unknown as Parameters<ControlledGroupEmitHandler<InputFields>>,
      );
      /**@hotfix */
      nativeMethods.setValue(
        subject.name as Path<InputFields>,
        nativeMethods.getValues(subject.name as Path<InputFields>),
      );
    },
    [nativeMethods],
  );
