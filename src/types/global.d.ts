declare namespace Route {
  type RouteObject = {
    path?: string;
    index?: boolean;
    children?: RouteObject[];
    caseSensitive?: boolean;
    id?: string;
    element?: React.ReactNode | null;
    component?: any;
    errorElement?: React.ReactNode | null;
    shouldRevalidate?: ShouldRevalidateFunction;
    meta?: {
      name?: string;
      icon?: React.ReactNode;
      hidden?: boolean | false;
    };
  };
}

interface FileObject {
  filename: string;
  path: string;
}

interface OutputFileObject extends FileObject {
  outputPath: string;
}

interface Api {
  store: {
    get: (key: string, defaultValue?: any) => any;
    set: (key: string, val: any) => void;
    reset: (...keys: string[]) => void;
    clear: () => void;
  };
}

declare const api: Api;
