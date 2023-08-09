import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Typography, InputProps, CheckboxProps } from 'antd';
import { REQUIRED, CUSTOM_ERROR_MESSAGE } from '../../controlled.constants';
import { FormFields, buildFieldProps } from '../../form-fields/form-fields';
import { FormFieldType } from '../../form-fields/form-fields.types';
import { ControlledInput } from '../../with-controller/controlled-components';
import { HookFormRules } from '../../with-controller/with-controller.types';
import * as styles from './form-fields.css';

interface FormFieldStubValues {
  city: string;
  cityCode: string;
  isApproval: boolean;
  text: string;
}

enum CustomFieldType {
  CustomInput = 'customInput',
}

const rules: HookFormRules = {
  required: REQUIRED,
  minLength: {
    value: 5,
    message: CUSTOM_ERROR_MESSAGE,
  },
};

const FORM_FIELD_ITEMS = [
  buildFieldProps<InputProps, FormFieldStubValues>({
    name: 'city',
    rules,
    placeholder: 'Введите свой город',
  }),
  buildFieldProps<InputProps, FormFieldStubValues>({
    name: 'cityCode',
    rules,
    disabled: true,
    placeholder: 'Введите свой код города',
  }),
  buildFieldProps<InputProps, FormFieldStubValues>({
    name: 'text',
    type: FormFieldType.Textarea,
    placeholder: 'Введите свое описание',
    style: { width: '100%' },
  }),
  buildFieldProps<CheckboxProps, FormFieldStubValues>({
    name: 'isApproval',
    type: FormFieldType.Checkbox,
    children: 'Согласен с правилами',
  }),
];

export const FormFieldsStub: FC = () => {
  const [data, setData] = useState('');
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormFieldStubValues>();

  const onSubmit = (data: FormFieldStubValues) => setData(JSON.stringify(data, null, 2));

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormFields<FormFieldStubValues, CustomFieldType>
          control={control}
          errors={errors}
          items={FORM_FIELD_ITEMS}
          dynamics={{
            city: buildFieldProps<InputProps>({
              onAction: ({ target: { value } }) =>
                setValue('cityCode', value ? `[${value.slice(0, 2).toUpperCase()}] ${value}` : ''),
            }),
          }}
          controlledComponents={{ [CustomFieldType.CustomInput]: ControlledInput }}
        />
        <Button type='primary' htmlType='submit'>
          Отправить
        </Button>
      </form>
      <div className={styles.preview}>
        <Typography.Text>Данные:</Typography.Text>
        <pre>{data}</pre>
      </div>
    </div>
  );
};

FormFieldsStub.displayName = 'FormFields';
