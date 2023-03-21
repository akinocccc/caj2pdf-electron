import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { App, ConfigProvider, message } from 'antd';
import Reset from './assets/styles/reset';
import AppLayout from './layout/AppLayout';

message.config({
  top: 100,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider direction="ltr">
    <App>
      <Reset />
      <Router>
        <AppLayout />
      </Router>
    </App>
  </ConfigProvider>
);
