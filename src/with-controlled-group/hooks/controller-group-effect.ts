import { useEffect } from 'react';
import { FieldValues, Path, PathValue } from 'react-hook-form';
import { controlledLogger } from '../../controlled.utils';
import { ControlledGroup } from '../../with-controller/with-controller.types';
import { withControlledGroup } from '../with-controlled-group.hoc';
import { UseControlledContextReturn } from '../with-controlled-group.types';
import { _internalDifferenceValuesReviver } from './guard/difference-values-hook-guard';

/**@internal */
export const useControllerGroupEffect = <InputFields extends FieldValues>(
  ctx: UseControlledContextReturn<InputFields>,
  controlledGroup: ControlledGroup<InputFields> | undefined,
  name: Path<InputFields>,
): void => {
  useEffect(() => {
    if (controlledGroup) {
      if (!ctx) {
        throw controlledLogger(
          `Было замечено использование пропсы "controlledGroup"! Отсутствует наличие привязки компонента к какой-либо контролируемой группе, чтобы использовать их возможности, пожалуйста, воспользуютесь функцией "${withControlledGroup.name}"!`,
          { name },
        );
      }

      const setValue = <TData extends PathValue<InputFields, Path<InputFields>>>(data: TData) => {
        ctx.setValue(name, data, { shouldSilentSetter: true });
        ctx.clearErrors(name);

        _internalDifferenceValuesReviver?.(name);
      };

      if (controlledGroup?.asyncDefaultValue) {
        const asyncDefaultValue =
          controlledGroup.asyncDefaultValue instanceof Function
            ? controlledGroup.asyncDefaultValue(ctx.getValues())
            : controlledGroup.asyncDefaultValue;

        if (asyncDefaultValue instanceof Promise) {
          asyncDefaultValue.then(setValue);

          return;
        }

        setValue(asyncDefaultValue);
      }

      if (controlledGroup.isUnmountDestroyState && name in ctx.cachedState) {
        throw controlledLogger(
          'Конфликт! Кэширование состояния не может работать вместе с его обнулением при демонтировании компонента!',
          { name },
        );
      }

      return () => {
        controlledGroup.isUnmountDestroyState &&
          ctx.setValue(name, undefined as PathValue<InputFields, Path<InputFields>>, {
            shouldSilentSetter: true,
          });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledGroup?.asyncDefaultValue]);
};
