import { useCallback } from 'react';
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { triggeringFieldAfterSettingValue } from '../helpers';
import { ControlledGroupSetValueHandler } from '../with-controlled-group.types';

/**@internal */
export const useSetValue = <InputFields extends FieldValues>(nativeMethods: UseFormReturn<InputFields>) => {
  const setValue: ControlledGroupSetValueHandler<InputFields> = useCallback(
    (name, value, options) => {
      const _value = value instanceof Function ? value(nativeMethods.getValues(name)) : value;

      if (options?.shouldRunTrigger) {
        return triggeringFieldAfterSettingValue(nativeMethods, {
          name,
          value: _value as PathValue<InputFields, Path<InputFields>>,
          options,
        });
      }

      const silentSetter = () => {
        nativeMethods.control._names.watch.delete(name);

        nativeMethods.setValue(name, _value, options);

        nativeMethods.control._names.watch.add(name);
      };

      if (options?.shouldSilentSetter) {
        return silentSetter();
      }

      nativeMethods.setValue(name, _value, options);
    },
    [nativeMethods],
  );

  return setValue;
};
