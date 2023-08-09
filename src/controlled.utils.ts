/**@internal */
export const isUndefined = (data: unknown): data is undefined => typeof data === 'undefined';

class ControlledError extends Error {
  name = 'ControlledError';
}

/**@internal */
export const controlledLogger = <ErrorView extends 'throw' | 'error' = 'throw'>(
  message: string,
  {
    name,
    errorView = 'throw' as ErrorView,
    type = 'with-controller',
  }: {
    type?: 'with-controller' | 'form-fields' | 'with-controlled-group';
    name?: string;
    errorView?: ErrorView;
  } = {},
): ErrorView extends 'error' ? void : never => {
  const WITH_CONTROLLER = `
  ▒█░░▒█ ▀█▀ ▀▀█▀▀ ▒█░▒█ ░░ ▒█▀▀█ ▒█▀▀▀█ ▒█▄░▒█ ▀▀█▀▀ ▒█▀▀█ ▒█▀▀▀█ ▒█░░░ ▒█░░░ ▒█▀▀▀ ▒█▀▀█ 
  ▒█▒█▒█ ▒█░ ░▒█░░ ▒█▀▀█ ▀▀ ▒█░░░ ▒█░░▒█ ▒█▒█▒█ ░▒█░░ ▒█▄▄▀ ▒█░░▒█ ▒█░░░ ▒█░░░ ▒█▀▀▀ ▒█▄▄▀ 
  ▒█▄▀▄█ ▄█▄ ░▒█░░ ▒█░▒█ ░░ ▒█▄▄█ ▒█▄▄▄█ ▒█░░▀█ ░▒█░░ ▒█░▒█ ▒█▄▄▄█ ▒█▄▄█ ▒█▄▄█ ▒█▄▄▄ ▒█░▒█`;

  const FORM_FIELDS = `
  ▒█▀▀▀ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▄▀█ ░░ ▒█▀▀▀ ▀█▀ ▒█▀▀▀ ▒█░░░ ▒█▀▀▄ ▒█▀▀▀█ 
  ▒█▀▀▀ ▒█░░▒█ ▒█▄▄▀ ▒█▒█▒█ ▀▀ ▒█▀▀▀ ▒█░ ▒█▀▀▀ ▒█░░░ ▒█░▒█ ░▀▀▀▄▄ 
  ▒█░░░ ▒█▄▄▄█ ▒█░▒█ ▒█░░▒█ ░░ ▒█░░░ ▄█▄ ▒█▄▄▄ ▒█▄▄█ ▒█▄▄▀ ▒█▄▄▄█`;

  const WITH_CONTROLLED_GROUP = `
  █░░░█ ░▀░ ▀▀█▀▀ █░░█ ░░ █▀▀ █▀▀█ █▀▀▄ ▀▀█▀▀ █▀▀█ █▀▀█ █░░ █░░ █▀▀ █▀▀▄ ░░ █▀▀▀ █▀▀█ █▀▀█ █░░█ █▀▀█ 
  █▄█▄█ ▀█▀ ░░█░░ █▀▀█ ▀▀ █░░ █░░█ █░░█ ░░█░░ █▄▄▀ █░░█ █░░ █░░ █▀▀ █░░█ ▀▀ █░▀█ █▄▄▀ █░░█ █░░█ █░░█ 
  ░▀░▀░ ▀▀▀ ░░▀░░ ▀░░▀ ░░ ▀▀▀ ▀▀▀▀ ▀░░▀ ░░▀░░ ▀░▀▀ ▀▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀░ ░░ ▀▀▀▀ ▀░▀▀ ▀▀▀▀ ░▀▀▀ █▀▀▀`;

  const TYPES: Record<typeof type, string> = {
    'with-controller': WITH_CONTROLLER,
    'form-fields': FORM_FIELDS,
    'with-controlled-group': WITH_CONTROLLED_GROUP,
  };

  const resultMessage = `${TYPES[type]}\n\n ${
    name ? `Имя компонента - [${name}]\n\n` : ''
  } [${type.toUpperCase()}]: ${message}`;

  if (errorView === 'error') {
    return console.error(resultMessage) as never;
  }

  throw new ControlledError(resultMessage);
};
