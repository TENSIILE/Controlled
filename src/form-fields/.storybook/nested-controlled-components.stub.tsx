import React, { FC, useCallback, useEffect, useState } from 'react';
import { Spin, Typography, Button } from 'antd';
import { useDefaultValues } from '../../with-controlled-group';
import { useAsyncValues } from '../../with-controlled-group/hooks/async-values';
import { withControlledGroup } from '../../with-controlled-group/with-controlled-group.hoc';
import { ControlledCheckbox, ControlledInput, ControlledTextArea } from '../../with-controller/controlled-components';
import { HookFormRules } from '../../with-controller/with-controller.types';
import * as styles from './form-fields.css';

interface ControlledComponentsStubValues {
  name: string;
  lastname: string;
  city: string;
  isApproval: boolean;
  text: string;
}

const REQUIRED = 'Field is required';

const REQUIRED_RULES: HookFormRules = {
  required: REQUIRED,
  minLength: {
    value: 2,
    message: '5345345',
  },
};

const DistantComponents: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div>
      <ControlledTextArea<ControlledComponentsStubValues>
        name='text'
        placeholder='Введите свое описание'
        style={{ width: '100%' }}
      />
    </div>
  );
};

const NestedComponent = withControlledGroup(
  () => {
    return (
      <>
        <ControlledInput name='name' rules={REQUIRED_RULES} placeholder='Введите свое имя' />
        <ControlledInput name='lastname' rules={REQUIRED_RULES} placeholder='Введите свою фамилию' />
      </>
    );
  },
  { isGroupUnite: true },
);

export const _NestedControlledComponentsStub = withControlledGroup<unknown, ControlledComponentsStubValues>(
  ({ controlled }) => {
    const [state, setState] = useState('');

    useDefaultValues<ControlledComponentsStubValues>({
      city: 'London',
      isApproval: true,
      text: '',
    });

    const cityValue = controlled.watch('city');

    const text = useCallback((_, { lock }) => lock(cityValue), [cityValue]);

    useAsyncValues<ControlledComponentsStubValues>({
      text,
    });

    const onSubmit = (data: ControlledComponentsStubValues, e?: React.BaseSyntheticEvent) => {
      e?.preventDefault();

      setState(JSON.stringify(data, null, 2));
    };

    return (
      <div className={styles.container}>
        <form onSubmit={controlled.handleSubmit(onSubmit)} className={styles.form}>
          <NestedComponent />

          <ControlledInput
            name='city'
            rules={REQUIRED_RULES}
            defaultValue='New York'
            placeholder='Введите свой город'
          />
          <ControlledCheckbox name='isApproval'>Согласен с правилами</ControlledCheckbox>

          <DistantComponents />

          <Button type='primary' htmlType='submit'>
            Отправить
          </Button>
        </form>
        <div className={styles.preview}>
          <Typography>Данные:</Typography>
          <pre>{state}</pre>
        </div>
      </div>
    );
  },
  {
    formArgs: {
      mode: 'onChange',
    },
    await: ['text'],
    isCacheEnabled: true,
  },
);

export const NestedControlledComponentsStub: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div>
      <button onClick={handleClick}>{isOpen ? 'Unmount' : 'Mount'}</button>
      {isOpen ? <_NestedControlledComponentsStub /> : <h1>Hello</h1>}
    </div>
  );
};

NestedControlledComponentsStub.displayName = 'NestedControlledComponentsStub';
