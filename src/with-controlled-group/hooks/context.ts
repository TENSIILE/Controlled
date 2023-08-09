import { FieldValues, useFormContext } from 'react-hook-form';
import { UseControlledContextReturn } from '../with-controlled-group.types';

/**@public*/
export const useControlledGroupContext = <InputFields extends FieldValues>() =>
  useFormContext() as UseControlledContextReturn<InputFields>;
