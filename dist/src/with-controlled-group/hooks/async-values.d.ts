import { FieldValues } from 'react-hook-form';
import { HookArgumentAsyncValues } from '../with-controlled-group.types';
/**@public */
export declare const useAsyncValues: {
    <InputFields extends FieldValues>(values: HookArgumentAsyncValues<InputFields>): void;
    log(): void;
};
