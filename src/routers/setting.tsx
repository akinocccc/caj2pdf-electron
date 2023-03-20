import { Navigate } from 'react-router-dom';
import {
  FileDoneOutlined,
  FileSyncOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

import Transformer from '@renderer/pages/Transformer';
import { lazy } from 'react';

const routes: Route.RouteObject[] = [
  {
    index: true,
    element: <Navigate replace to="/tranformer" />,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/tranformer',
    // element: <Transformer />,
    component: lazy(() => import('@renderer/pages/Transformer')),
    meta: {
      name: 'Transformer',
      icon: <FileSyncOutlined />,
    },
  },
  {
    path: '/about',
    component: lazy(() => import('@renderer/pages/About')),
    meta: {
      name: 'About',
      icon: <InfoCircleOutlined />,
    },
  },
  {
    path: '/doneList',
    element: <div>123</div>,
    meta: {
      name: '已完成',
      icon: <FileDoneOutlined />,
    },
  },
];

export default routes;
