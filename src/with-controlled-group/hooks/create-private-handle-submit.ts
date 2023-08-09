import { useCallback } from 'react';
import { FieldValues, SubmitErrorHandler, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { isUndefined } from '../../controlled.utils';
import {
  ControlledGroupHandleSubmitPrivateSettings,
  ControlledGroupOptions,
  ControlledMutableCacheValues,
} from '../with-controlled-group.types';
import { useCachedValuesHookGuard, useDischargeDispatchingHookGuard } from './guard';

/**@internal */
export const useCreatePrivateHandleSubmit = <InputFields extends FieldValues>(
  nativeMethods: UseFormReturn<InputFields>,
  options: ControlledGroupOptions<InputFields> | undefined,
  environment: { cachedValues: ControlledMutableCacheValues },
): UseFormHandleSubmit<InputFields> => {
  const dischargeOnSubmit = useDischargeDispatchingHookGuard<InputFields>(nativeMethods, options?.discharge);

  useCachedValuesHookGuard<InputFields>(nativeMethods.getValues, options?.isCacheEnabled, environment.cachedValues);

  return useCallback(
    (onValid, onIsvalid) => event => {
      event?.preventDefault();

      const isAllMounted = options?.await?.every(name => nativeMethods.control._names.mount.has(name.toString()));

      if (isAllMounted || isUndefined(isAllMounted)) {
        dischargeOnSubmit();

        return nativeMethods.handleSubmit(onValid, onIsvalid)(event);
      }

      const settings: ControlledGroupHandleSubmitPrivateSettings = {
        _settings: { isComponentsLoading: !isAllMounted },
      };

      const _onValid = (state: InputFields) => onValid({ ...state, ...settings });

      const noop = () => null;

      const _onIsvalid = (errors: ReturnType<SubmitErrorHandler<InputFields>>) =>
        onIsvalid?.({ ...errors, ...settings });

      return nativeMethods.handleSubmit(options?.isGiveAwaitedAnswer ? _onValid : noop, _onIsvalid)(event);
    },
    [nativeMethods, dischargeOnSubmit, options?.await, options?.isGiveAwaitedAnswer],
  );
};
