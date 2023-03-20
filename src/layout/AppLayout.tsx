import SideMenu from './components/SideMenu';
import { Layout } from 'antd';
import { RouteObject, useRoutes } from 'react-router-dom';
import routes from '@renderer/routers/index';

const { Content, Sider } = Layout;

function AppLayout(): JSX.Element {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible theme="light">
        <SideMenu />
      </Sider>
      <Content style={{ overflow: 'auto', maxHeight: '100vh' }}>
        {useRoutes(routes as RouteObject[])}
      </Content>
    </Layout>
  );
}

export default AppLayout;
