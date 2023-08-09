import React, { FC, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';
import { controlledLogger } from '../controlled.utils';
import { useControlledGroupContext } from '../with-controlled-group';
import { overrideSpreadWithLogging } from '../with-controlled-group/helpers';
import { ControlledComponents } from '../with-controller/controlled-components';
import { NativeComponentProps, ControlledComponentsType } from '../with-controller/with-controller.types';
import { FormFieldsProps, FormFieldType, FormPropsBuilder } from './form-fields.types';

/**@public */
export function FormFields<InputFields extends FieldValues, CustomFormFieldType extends string = string>({
  items,
  control,
  errors,
  dynamics,
  controlledComponents,
}: FormFieldsProps<InputFields, CustomFormFieldType>) {
  const AllControlledComponents = useMemo(
    () => overrideSpreadWithLogging<ControlledComponentsType>(ControlledComponents, [controlledComponents]),
    [controlledComponents],
  );

  const methods = useControlledGroupContext<InputFields>();

  const commonErrors = errors || methods?.formState.errors;
  const commonControl = control || methods?.control;

  return (
    <>
      {items.map(({ name, defaultValue, type = FormFieldType.Input, rules, onAction, ...ownProps }) => {
        if (!commonControl || !commonErrors) {
          throw controlledLogger('Вы забыли указать пропсы "control" и "errors" для работы компонента!', {
            type: 'form-fields',
            name,
          });
        }

        const Controller = AllControlledComponents[type] as FC<NativeComponentProps<InputFields>>;

        const dynamicProps = (dynamics?.[name] || {}) as Record<string, unknown>;

        if (!Controller) {
          throw controlledLogger(
            `Контролируемого компонента с типом {"type": '${type}'} не существует! Возможно Вы ошиблись в пропсе 'type'!`,
            { type: 'form-fields', name },
          );
        }

        return (
          <Controller
            key={name}
            name={name}
            defaultValue={defaultValue}
            control={commonControl}
            errors={commonErrors}
            rules={rules}
            onAction={onAction}
            {...ownProps}
            {...dynamicProps}
          />
        );
      })}
    </>
  );
}

export const buildFieldProps: FormPropsBuilder = props => props;
