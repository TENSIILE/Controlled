import { FieldValues, Path } from 'react-hook-form';
import { ControlledGroup } from '../../with-controller/with-controller.types';
import { UseControlledContextReturn } from '../with-controlled-group.types';
/**@internal */
export declare const useControllerGroupEffect: <InputFields extends FieldValues>(ctx: UseControlledContextReturn<InputFields>, controlledGroup: ControlledGroup<InputFields> | undefined, name: Path<InputFields>) => void;
