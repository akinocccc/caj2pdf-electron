declare global {
  interface Window {
    store: {
      get: (key: string) => any;
      set: (key: string, val: any) => void;
    };
  }
}
