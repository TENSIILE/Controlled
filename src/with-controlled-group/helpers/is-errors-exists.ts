import { DeepRequired, FieldErrorsImpl, FieldValues } from 'react-hook-form';

/**@internal */
export const isErrorsExists = <InputFields extends FieldValues>(
  errors: FieldErrorsImpl<DeepRequired<InputFields>>,
): boolean => Boolean(Object.keys(errors).length);
