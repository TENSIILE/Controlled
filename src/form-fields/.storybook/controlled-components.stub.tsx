import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Typography } from 'antd';
import { CUSTOM_ERROR_MESSAGE, REQUIRED } from '../../controlled.constants';
import { ControlledCheckbox, ControlledInput, ControlledTextArea } from '../../with-controller/controlled-components';
import * as styles from './form-fields.css';

interface ControlledComponentsStubValues {
  city: string;
  isApproval: boolean;
  text: string;
}

const INPUT_RULES = {
  required: REQUIRED,
  minLength: {
    value: 5,
    message: CUSTOM_ERROR_MESSAGE,
  },
};

export const ControlledComponentsStub: FC = () => {
  const [data, setData] = useState('');
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ControlledComponentsStubValues>({
    defaultValues: {
      isApproval: true,
    },
  });

  const onSubmit = (data: ControlledComponentsStubValues) => {
    setData(JSON.stringify(data, null, 2));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <ControlledInput
          control={control}
          errors={errors}
          name='city'
          rules={INPUT_RULES}
          placeholder='Введите свой город'
        />

        <ControlledTextArea
          control={control}
          errors={errors}
          name='text'
          placeholder='Введите свое описание'
          style={{ width: '100%' }}
        />

        <ControlledCheckbox control={control} errors={errors} name='isApproval'>
          Согласен с правилами
        </ControlledCheckbox>

        <Button type='primary' htmlType='submit'>
          Отправить
        </Button>
      </form>
      <div className={styles.preview}>
        <Typography>Данные:</Typography>
        <pre>{data}</pre>
      </div>
    </div>
  );
};

ControlledComponentsStub.displayName = 'ControlledComponentsStub';
