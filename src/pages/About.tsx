import { Card } from 'antd';
import { useState } from 'react';

function About(): JSX.Element {
  const [aaa, setAaa] = useState('');
  return <Card bordered={false}></Card>;
}

export default About;
