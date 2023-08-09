import React from 'react';
import { FieldValues } from 'react-hook-form';
import { FormFieldsProps, FormPropsBuilder } from './form-fields.types';
/**@public */
export declare function FormFields<InputFields extends FieldValues, CustomFormFieldType extends string = string>({ items, control, errors, dynamics, controlledComponents, }: FormFieldsProps<InputFields, CustomFormFieldType>): React.JSX.Element;
export declare const buildFieldProps: FormPropsBuilder;
