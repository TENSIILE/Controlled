import { ControlledGroupHandleSubmitPrivateSettings } from '../with-controlled-group.types';

/**@public*/
export const getPrivateSettingsSubmit = <InputFieldsData>(
  data: InputFieldsData,
): ControlledGroupHandleSubmitPrivateSettings['_settings'] | null => {
  const _data = data as unknown as ControlledGroupHandleSubmitPrivateSettings;

  return '_settings' in _data ? _data['_settings'] : null;
};
