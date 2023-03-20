import { Suspense } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import styled from 'styled-components';
import routeTable from '@renderer/routers/setting';
import { Spin } from 'antd';

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const syncRouter = (table: Route.RouteObject[]): RouteObject[] => {
  const routes: Route.RouteObject[] = table.map((route) => ({
    index: route?.index,
    path: route?.path,
    element: route?.element || (
      <Suspense
        fallback={
          <CenterDiv>
            <Spin size="large" tip="Loading..." />
          </CenterDiv>
        }
      >
        <route.component />
      </Suspense>
    ),
    children: route.children && syncRouter(route.children),
  }));
  return routes as RouteObject[];
};

export default () => useRoutes(syncRouter(routeTable));
