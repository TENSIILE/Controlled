import { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ControlledGroupOptions, ControlledMutableCacheValues } from '../../with-controlled-group.types';

/**@internal*/
export const useCachedValuesHookGuard = <InputFields extends FieldValues>(
  getValues: UseFormReturn<InputFields>['getValues'],
  isCacheEnabled: ControlledGroupOptions<InputFields>['isCacheEnabled'],
  cachedValues: ControlledMutableCacheValues,
): void => {
  if (isCacheEnabled) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      return () => {
        cachedValues.current = getValues();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }
};
