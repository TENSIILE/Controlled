import { FieldValues } from 'react-hook-form';
import {
  ControlledDefaultValues,
  ControlledGroupOptions,
  ControlledMutableCacheValues,
} from '../with-controlled-group.types';

/**@internal */
export const unionOfAllIncomingDefaultValues = <InputFields extends FieldValues>(
  options: ControlledGroupOptions<InputFields> | undefined,
  environment: {
    defaultValues: ControlledDefaultValues;
    cachedValues: ControlledMutableCacheValues;
  },
): ControlledDefaultValues => {
  const stock = options?.discharge?.get();

  const stockDefaultValues = options?.discharge?.hasLoadingStateAtStartup ? { ...stock } : {};

  const defaultValues = options?.isCacheEnabled ? environment.cachedValues.current : environment.defaultValues;

  let result = {};

  if (['anyone', undefined].includes(options?.discharge?.orderOfPrecedence)) {
    result = { ...defaultValues, ...stockDefaultValues };
  }

  if (options?.discharge?.orderOfPrecedence === 'cache') {
    result = { ...stockDefaultValues, ...defaultValues };
  }

  return result;
};
