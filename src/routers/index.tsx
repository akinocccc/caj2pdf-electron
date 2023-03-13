import {
  ActionFunction,
  LoaderFunction,
  Navigate,
  ShouldRevalidateFunction,
} from 'react-router-dom';
import {
  FileDoneOutlined,
  FileSyncOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { lazy } from 'react';
interface RouteObject {
  path?: string;
  index?: boolean;
  children?: RouteObject[];
  caseSensitive?: boolean;
  id?: string;
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

const About = lazy(() => import('@renderer/pages/About'));
const Transformer = lazy(() => import('@renderer/pages/Transformer'));

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
    meta: {
      name: '转换器',
      icon: <FileSyncOutlined />,
    },
  },
  {
    path: '/doneList',
    element: <Transformer />,
    meta: {
      name: '已完成',
      // eslint-disable-next-line react/jsx-no-undef
      icon: <FileDoneOutlined />,
    },
  },
  {
    path: '/about',
    element: <About />,
    meta: {
      name: '关于我们',
      icon: <InfoCircleOutlined />,
    },
  },
];

export default routes;
