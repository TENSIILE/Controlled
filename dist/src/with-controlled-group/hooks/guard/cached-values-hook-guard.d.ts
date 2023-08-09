import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ControlledGroupOptions, ControlledMutableCacheValues } from '../../with-controlled-group.types';
/**@internal*/
export declare const useCachedValuesHookGuard: <InputFields extends FieldValues>(getValues: import("react-hook-form").UseFormGetValues<InputFields>, isCacheEnabled: boolean | undefined, cachedValues: ControlledMutableCacheValues) => void;
