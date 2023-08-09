import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ControlledGroupDischargeOptions } from '../with-controlled-group.types';
/**@internal*/
export declare const dischargeDispatch: <InputFields extends FieldValues>(currentMode: "onChange" | "onUnmount" | "onSubmit" | "onSuccessfulSubmit", dischargeOptions: ControlledGroupDischargeOptions<InputFields>, getValues: import("react-hook-form").UseFormGetValues<InputFields>) => void;
