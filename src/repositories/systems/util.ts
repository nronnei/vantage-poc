import {
  RecoilState,
  RecoilValueReadOnly,
  SerializableParam,
  SetterOrUpdater,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue
} from 'recoil';

export const generateGetter = <T>(
  state: RecoilState<T>
    | RecoilValueReadOnly<T>
    | ((param: SerializableParam) => RecoilState<T>)
    | ((param: SerializableParam) => RecoilValueReadOnly<T>)
  ,
  param?: SerializableParam,
) => {
  const targetState = typeof state === 'function' ? state(param) : state;
  return (): T => useRecoilValue(targetState);
}

export const generateCrud = <T>(
  state: RecoilState<T> | ((param: SerializableParam) => RecoilState<T>),
  param?: SerializableParam,
) => {
  const targetState = typeof state === 'function' ? state(param) : state;
  const useValue = generateGetter(state, param);
  if (state instanceof RecoilState) {
    const useSetValue = useRecoilCallback(({ set }): SetterOrUpdater<T> => (valOrUpdater) => {
      return set(targetState, valOrUpdater);
    });
    const useState = () => useRecoilState(targetState);
    return [useValue, useSetValue, useState];
  } else {
    return [useValue];
  }
}
