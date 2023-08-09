import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ControlledGroupDischargeOptions } from '../with-controlled-group.types';

/**@internal*/
export const dischargeDispatch = <InputFields extends FieldValues>(
  currentMode: ControlledGroupDischargeOptions<InputFields>['mode'],
  dischargeOptions: ControlledGroupDischargeOptions<InputFields>,
  getValues: UseFormReturn<InputFields>['getValues'],
): void => {
  const { mode, set } = dischargeOptions;
  currentMode === mode && set(getValues());
};
