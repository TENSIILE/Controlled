import { __DEV__ } from '../../../constants';
import { controlledLogger } from '../../controlled.utils';

/**@internal */
export const overrideSpreadWithLogging = <Return>(
  acc: Record<string, unknown>,
  sources: (Record<string, unknown> | undefined)[],
  options?: { componentName?: string },
): Return => {
  let result = {};

  sources.forEach(source => {
    __DEV__ &&
      source &&
      Object.keys(source).forEach(key => {
        if (key in acc) {
          // Данный лог присущь только для [FORM-FIELDS]
          return controlledLogger(
            'Обратите внимание на пропсу - [controlledComponents]! \n\nПредупреждение! Ключ (' +
              key +
              ') уже существует в аккумулированном объекте всех контролируюмых компонентов! Предыдущий компонент с таким ключом был удален из объекта! Игнорирование проблемы переопределения может негативно повлиять на работу контролируемых компонетов в будущем!',
            { name: options?.componentName, errorView: 'error', type: 'form-fields' },
          );
        }
      });

    result = { ...(acc as unknown as Return), ...source };
  });

  return result as Return;
};
