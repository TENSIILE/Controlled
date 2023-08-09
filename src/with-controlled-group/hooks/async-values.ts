import { useEffect, useRef } from 'react';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import { __DEV__ } from '../../../constants';
import { controlledLogger } from '../../controlled.utils';
import { Empty } from '../../form-fields';
import { getDiffProperties } from '../helpers/get-diff-properties';
import { withControlledGroup } from '../with-controlled-group.hoc';
import { NonUndefined } from '../with-controlled-group.types';
import {
  HookArgumentAsyncValues,
  HookArgumentAsyncValuesFunction,
  HookArgumentAsyncValuesFunctionOptions,
} from '../with-controlled-group.types';
import { useControlledGroupContext } from './context';
import { _internalDifferenceValuesReviver } from './guard/difference-values-hook-guard';

let __LOG_ENABLED__ = false;

/**@public */
export const useAsyncValues = <InputFields extends FieldValues>(values: HookArgumentAsyncValues<InputFields>) => {
  const context = useControlledGroupContext<InputFields>();

  const startValuesRef = useRef<Empty>({});

  if (!context) {
    throw controlledLogger(
      `Ошибка! Невозможно использовать хук useAsyncValues вне вызова хока ${withControlledGroup.name}!`,
      { type: 'with-controlled-group' },
    );
  }

  const lockingDifferentValuesReviver = <Data>(data: Data, callback: (lockedValue: Data) => true): boolean => {
    let locked = false;

    if (data instanceof Object && '_type' in data && 'lockedValue' in data) {
      const { _type, lockedValue } = data as unknown as ReturnType<
        HookArgumentAsyncValuesFunctionOptions<InputFields, keyof InputFields>['lock']
      >;

      locked = _type === 'locking';

      return callback(lockedValue);
    }

    return locked;
  };

  const setValue = <Data>(name: Path<InputFields>, data: NonUndefined<Data>) => {
    const locked = lockingDifferentValuesReviver(data, lockedValue => {
      context.setValue(name, lockedValue as PathValue<InputFields, Path<InputFields>>, { shouldSilentSetter: true });

      return true;
    });

    if (!locked) {
      context.setValue(name, data as PathValue<InputFields, Path<InputFields>>, { shouldSilentSetter: true });

      _internalDifferenceValuesReviver?.(name);
    }

    context.clearErrors(name);
  };

  useEffect(() => {
    const changedValues = getDiffProperties<Empty>(startValuesRef.current, values);

    if (__LOG_ENABLED__) {
      console.count('UseAsyncValues Render');
    }

    const resetting = new Promise<void>(resolve => {
      Object.entries(changedValues).forEach(changedValue => {
        const [name, value] = changedValue as [Path<InputFields>, unknown];

        const resolvePromise = (promise: Promise<unknown>) => {
          promise.then(setValue.bind(this, name)).then(resolve);
        };

        if (value instanceof Promise) {
          return resolvePromise(value);
        }

        if (value instanceof Function) {
          const doneValue = (value as HookArgumentAsyncValuesFunction<InputFields, keyof InputFields>)(
            context.getValues(),
            {
              lock: value => ({
                _type: 'locking',
                lockedValue: value,
              }),
            },
          );

          if (doneValue instanceof Promise) {
            return resolvePromise(doneValue);
          }

          doneValue && setValue(name, doneValue);

          return resolve();
        }

        setValue(name, value);

        resolve();
      });
    });

    resetting.then(() => {
      startValuesRef.current = values;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);
};

useAsyncValues.log = () => {
  if (__DEV__) {
    __LOG_ENABLED__ = true;
  }
};
