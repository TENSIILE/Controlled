import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ControlledGroupEmitHandler } from '../with-controlled-group.types';
/**
 * @internal
 * @unstable
 **/
export declare const useEmit: <InputFields extends FieldValues>(nativeMethods: UseFormReturn<InputFields, any>) => ControlledGroupEmitHandler<InputFields>;
