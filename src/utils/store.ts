const { store } = api;

export const get = (key: string, defaultValue: any): any => {
  return store.get(key, defaultValue);
};

export const set = (key: string, value: any) => {
  store.set(key, value);
};

export const reset = (keys: string[]) => {
  store.reset(...keys);
};
