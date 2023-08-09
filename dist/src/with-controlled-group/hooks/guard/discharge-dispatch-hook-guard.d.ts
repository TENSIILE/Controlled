import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ControlledGroupDischargeOptions } from '../../with-controlled-group.types';
/**@internal*/
export declare const useDischargeDispatchingHookGuard: <InputFields extends FieldValues>(nativeMethods: UseFormReturn<InputFields, any>, dischargeOptions: ControlledGroupDischargeOptions<InputFields> | undefined) => VoidFunction;
