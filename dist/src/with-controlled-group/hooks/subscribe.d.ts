import { EventType, FieldValues } from 'react-hook-form';
import { UseSubscribeArgumentCallback } from '../with-controlled-group.types';
/**@public */
export declare const useSubscribe: <InputFields extends FieldValues, CustomEventType extends string = EventType>(callback: UseSubscribeArgumentCallback<InputFields, CustomEventType>, deps?: (keyof InputFields)[] | undefined) => void;
