import { App, ConfigProvider, message } from 'antd';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import MainApp from './APP';

message.config({
  top: 100,
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider direction="ltr">
    <App>
      <Router>
        <MainApp />
      </Router>
    </App>
  </ConfigProvider>
);
