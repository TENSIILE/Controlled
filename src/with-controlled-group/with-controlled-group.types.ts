import { FieldValues, UseFormReturn, UseFormProps, Path, PathValue, EventType } from 'react-hook-form';

/**@public*/
export type ControlledGroupType<Props, InputFields extends FieldValues> = Props & ControlledGroupReturn<InputFields>;

/**@internal */
export type ControlledDefaultValues = Record<string, unknown>;

/**@internal */
export type ControlledMutableCacheValues = { current: ControlledDefaultValues };

/**@internal*/
export interface ControlledGroupDischargeOptions<InputFields extends FieldValues> {
  /** Режим в котором будет сохранятся состояние формы.
   *
   * `onChange` - при её изменении;
   *
   * `onUnmount` - при размонтировании контролируемой группы (компонента);
   *
   * `onSubmit` - при любой отправке формы;
   *
   * `onSuccessfulSubmit` - при успешной отправке формы.
   */
  mode: 'onChange' | 'onUnmount' | 'onSubmit' | 'onSuccessfulSubmit';
  /** Запись текущего состояния формы.
   * @example
   * {
   *    set: (state) => sessionStorage.setItem('<KEY>', JSON.stringify(state))
   * }
   */
  set: (state: InputFields) => void;
  /** Получение и установка состояния для формы.
   * * @example
   * {
   *    get: () => sessionStorage.getItem('<KEY>')
   * }
   */
  get: () => InputFields | null;
  /** Монтирование состояния подгруженной формы при монтировании. */
  hasLoadingStateAtStartup?: boolean;
  /**
   * @default anyone
   * Установка приоритета подгрузки, при повторном монтировании:
   *  `cache` - состояние берется из кеша,
   *  `anyone` - состояние берется из метода `get`.*/
  orderOfPrecedence?: 'cache' | 'anyone';
}

/**@internal*/
export type ControlledGroupOptions<InputFields extends FieldValues> = Partial<{
  /** Стандартные аргументы хука `useForm` React Hook Form. */
  formArgs: UseFormProps<InputFields>;
  /** Массив полей группы, рендер которых необходимо дождаться перед отправкой формы.*/
  await: (keyof InputFields)[];
  /** Настройка для получения информации о том, что сейчас идет загрузка полей. */
  isGiveAwaitedAnswer: boolean;
  /** Включение кеширования для размонтированных компонентов.
   * При демонтировании и повторном монтировании контролируемой группы, состояние формы вернется к моменту последнего демонтирования.*/
  isCacheEnabled: boolean;
  /** Объединяет контролируемую группу с контролируемой родительской группой.
   * Состояния всех дочерних контролируемых групп будет доступно внутри контролируемого родителя. */
  isGroupUnite: boolean;
  /**Подгрузка и сгруз состояния формы. */
  discharge: ControlledGroupDischargeOptions<InputFields>;
  /** Настройка для отслеживания измененных полей.
   * Получить мутированные поля можно получить с помощью метода `getDifferenceValues()` из пропсы `controlled`.*/
  isDataDifferenceTrackingEnabled: boolean;
}>;

/**@internal*/
type ControlledGroupUseFormForeignReturn<InputFields extends FieldValues> = {
  cachedState: Partial<InputFields>;
  setValue: ControlledGroupSetValueHandler<InputFields>;
  unstable_emit: ControlledGroupEmitHandler<InputFields>;
  getDifferenceValues: () => Partial<InputFields>;
};

/**@internal */
type ControlledGroupUseModifiedFormReturn<InputFields extends FieldValues> = Omit<
  UseFormReturn<InputFields>,
  'setValue'
>;

/**@internal*/
export type ControlledGroupReturn<InputFields extends FieldValues> = {
  controlled: ControlledGroupUseModifiedFormReturn<InputFields> & ControlledGroupUseFormForeignReturn<InputFields>;
};

/**@internal*/
export interface ControlledGroupHandleSubmitPrivateSettings {
  _settings: {
    isComponentsLoading: boolean;
  };
}

/**@internal */
export type UseControlledContextReturn<InputFields extends FieldValues> =
  | (ControlledGroupUseModifiedFormReturn<InputFields> & ControlledGroupUseFormForeignReturn<InputFields>)
  | null;

/**@internal */
export type ControlledGroupSetValueHandler<InputFields extends FieldValues> = <Name extends Path<InputFields>>(
  name: Name,
  value: PathValue<InputFields, Name> | ((prevState: PathValue<InputFields, Name>) => PathValue<InputFields, Name>),
  options?: Partial<{
    shouldValidate: boolean;
    shouldDirty: boolean;
    shouldTouch: boolean;
    shouldRunTrigger: boolean;
    shouldSilentSetter: boolean;
  }>,
) => void;

/**@internal */
export type UseSubscribeArgumentCallback<
  InputFields extends FieldValues,
  CustomEventType extends string = EventType,
> = (
  subject: WatchSubject<InputFields, CustomEventType> & { value?: PathValue<InputFields, Path<InputFields>> | '' },
) => void;

/**@internal */
export type ControlledGroupEmitHandler<InputFields extends FieldValues> = <CustomEventType extends string = EventType>(
  subject: WatchSubject<InputFields, CustomEventType>,
) => void;

/**@internal */
type WatchSubject<InputFields extends FieldValues, CustomEventType extends string = EventType> = Partial<{
  name: keyof InputFields;
  type: CustomEventType | EventType;
  values: FieldValues;
}>;

/**@internal */
export type DifferenceValuesReviverHandler = <InputFields extends FieldValues>(
  inputFieldName: Path<InputFields>,
) => void;

/**@internal */
export type HookArgumentAsyncValuesFunctionOptions<InputFields extends FieldValues, Key extends keyof InputFields> = {
  lock: (value: InputFields[Key]) => {
    lockedValue: InputFields[Key];
    _type: 'locking';
  };
};

/**@internal */
export type HookArgumentAsyncValuesFunction<InputFields extends FieldValues, Key extends keyof InputFields> = (
  formValues: InputFields,
  options: HookArgumentAsyncValuesFunctionOptions<InputFields, Key>,
) => InputFields[Key] | Promise<InputFields[Key]>;

/**@internal */
export type HookArgumentAsyncValues<InputFields extends FieldValues> = {
  [key in keyof Partial<InputFields>]:
    | HookArgumentAsyncValuesFunction<InputFields, key>
    | Promise<InputFields[key]>
    | InputFields[key];
};

/**@internal */
export type NonUndefined<T> = T extends undefined ? never : T;
