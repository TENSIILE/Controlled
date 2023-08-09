import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ControlledGroupSetValueHandler } from '../with-controlled-group.types';
/**@internal */
export declare const useSetValue: <InputFields extends FieldValues>(nativeMethods: UseFormReturn<InputFields, any>) => ControlledGroupSetValueHandler<InputFields>;
