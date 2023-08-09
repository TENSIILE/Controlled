import { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { dischargeDispatch, isErrorsExists } from '../../helpers';
import { ControlledGroupDischargeOptions } from '../../with-controlled-group.types';

/**@internal*/
export const useDischargeDispatchingHookGuard = <InputFields extends FieldValues>(
  nativeMethods: UseFormReturn<InputFields>,
  dischargeOptions: ControlledGroupDischargeOptions<InputFields> | undefined,
): VoidFunction => {
  if (dischargeOptions) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const { unsubscribe } = nativeMethods.control._subjects.watch.subscribe({
        next: () => {
          dischargeDispatch('onChange', dischargeOptions, nativeMethods.getValues);
        },
      });

      return () => {
        unsubscribe();
        dischargeDispatch('onUnmount', dischargeOptions, nativeMethods.getValues);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }

  return () => {
    if (dischargeOptions?.mode === 'onSuccessfulSubmit' && !isErrorsExists(nativeMethods.formState.errors)) {
      return dischargeOptions && dischargeDispatch('onSuccessfulSubmit', dischargeOptions, nativeMethods.getValues);
    }

    dischargeOptions && dischargeDispatch('onSubmit', dischargeOptions, nativeMethods.getValues);
  };
};
