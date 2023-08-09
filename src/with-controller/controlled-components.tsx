import React from 'react';
import { Input, Checkbox } from 'antd';
import { FormFieldType } from '../form-fields/form-fields.types';
import { ControlledComponentsType } from '../with-controller/with-controller.types';
import { withController } from './with-controller.hoc';

/**
 * Примеры создания контролируемых компонентов на основе готовой библиотеки
 * и нативного `input` JSX-элемента.
 */
export const ControlledNativeInput = withController<JSX.IntrinsicElements['input']>(props => <input {...props} />, {
  adapter(value, onChange, options) {
    return {
      value,
      onChange,
      placeholder: options.errorMessage,
    };
  },
});

export const ControlledInput = withController(Input);

export const ControlledCheckbox = withController(Checkbox, {
  adapter(value) {
    return { checked: Boolean(value) };
  },
});

export const ControlledTextArea = withController(Input.TextArea);

export const ControlledPassword = withController(Input.Password);

export const ControlledComponents: ControlledComponentsType<FormFieldType> = {
  [FormFieldType.Input]: ControlledInput,
  [FormFieldType.Checkbox]: ControlledCheckbox,
  [FormFieldType.Textarea]: ControlledTextArea,
  [FormFieldType.Password]: ControlledPassword,
};
