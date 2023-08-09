import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ControlledDefaultValues, DifferenceValuesReviverHandler } from '../../with-controlled-group.types';
/**@internal*/
export declare let _internalDifferenceValuesReviver: DifferenceValuesReviverHandler | undefined;
/**@internal*/
export declare const useDifferenceValuesHookGuard: <InputFields extends FieldValues>(nativeMethods: UseFormReturn<InputFields, any>, defaultValues: ControlledDefaultValues, isDataDifferenceTrackingEnabled: boolean | undefined) => () => Partial<InputFields>;
