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
