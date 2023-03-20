import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App, ConfigProvider, message, Spin } from 'antd';
import Reset from './assets/styles/reset';
import AppLayout from './layout/AppLayout';
import styled from 'styled-components';

message.config({
  top: 100,
});

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider direction="ltr">
    <App>
      <Reset />
      <Router>
        <Suspense
          fallback={
            <CenterDiv>
              <Spin size="large" tip="Loading..." />
            </CenterDiv>
          }
        >
          <AppLayout />
        </Suspense>
      </Router>
    </App>
  </ConfigProvider>
);
