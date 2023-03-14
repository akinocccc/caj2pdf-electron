import {
  ActionFunction,
  createHashRouter,
  LoaderFunction,
  Navigate,
  ShouldRevalidateFunction,
} from 'react-router-dom';
import {
  FileDoneOutlined,
  FileSyncOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: RouteObject[];
  caseSensitive?: boolean;
  id?: string;
  lazy?: any;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  shouldRevalidate?: ShouldRevalidateFunction;
  meta?: {
    name?: string;
    icon?: React.ReactNode;
    hidden?: boolean | false;
  };
}

import Transformer from '@renderer/pages/Transformer';
// const About = lazy(() => import('@renderer/pages/About'));

const routes: RouteObject[] = [
  {
    index: true,
    element: <Navigate replace to="/tranformer" />,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/tranformer',
    element: <Transformer />,
    async lazy() {
      const Transformer = await import('@renderer/pages/Transformer');
      return { element: Transformer };
    },
    meta: {
      name: 'Transformer',
      icon: <FileSyncOutlined />,
    },
  },
  // {
  //   path: '/about',
  //   element: <About />,
  //   meta: {
  //     name: 'About',
  //     icon: <InfoCircleOutlined />,
  //   },
  // },
  // {
  //   path: '/doneList',
  //   element: <div>123</div>,
  //   meta: {
  //     name: '已完成',
  //     icon: <FileDoneOutlined />,
  //   },
  // },
];

export default routes;

// export default createHashRouter(routes as any);
