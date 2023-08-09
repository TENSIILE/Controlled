import { useEffect } from 'react';
import { EventType, FieldValues, Path } from 'react-hook-form';
import { controlledLogger, isUndefined } from '../../controlled.utils';
import { withControlledGroup } from '../with-controlled-group.hoc';
import { UseSubscribeArgumentCallback } from '../with-controlled-group.types';
import { useControlledGroupContext } from './context';

/**@public */
export const useSubscribe = <InputFields extends FieldValues, CustomEventType extends string = EventType>(
  callback: UseSubscribeArgumentCallback<InputFields, CustomEventType>,
  deps?: (keyof InputFields)[],
): void => {
  const context = useControlledGroupContext<InputFields>();

  if (!context) {
    throw controlledLogger(
      `Ошибка! Невозможно использовать хук useSubscribe вне вызова хока ${withControlledGroup.name}!`,
      { type: 'with-controlled-group' },
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const { unsubscribe } = context.control._subjects.watch.subscribe({
      next: value => {
        const currentValue = value.name && context.getValues(value.name as Path<InputFields>);

        const defaultValue = value.name && context.control._defaultValues[value.name];

        if (isUndefined(deps) || !deps.length) {
          return callback({ ...value, value: currentValue ?? defaultValue } as Parameters<
            UseSubscribeArgumentCallback<InputFields, CustomEventType>
          >['0']);
        }

        deps.forEach(dep => {
          if (value.name === dep) {
            callback({ ...value, value: currentValue ?? defaultValue } as Parameters<
              UseSubscribeArgumentCallback<InputFields, CustomEventType>
            >['0']);
          }
        }, []);
      },
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
