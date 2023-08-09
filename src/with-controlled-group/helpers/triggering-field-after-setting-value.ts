import { FieldValues, UseFormReturn } from 'react-hook-form';

/**@internal */
export const triggeringFieldAfterSettingValue = <InputFields extends FieldValues>(
  nativeMethods: UseFormReturn<InputFields>,
  environment: {
    name: Parameters<UseFormReturn<InputFields>['setValue']>['0'];
    value: Parameters<UseFormReturn<InputFields>['setValue']>['1'];
    options: Parameters<UseFormReturn<InputFields>['setValue']>['2'];
  },
): Promise<boolean | void> =>
  new Promise<void>(resolve => {
    nativeMethods.setValue(environment.name, environment.value, environment.options);
    resolve();
  }).then(() => nativeMethods.trigger(environment.name));
