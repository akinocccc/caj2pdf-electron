import { Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const wrapper = {
  margin: 10,
  padding: '0 20px',
  borderRadius: '4px',
  borderSizing: 'border-box',
};

function About(): JSX.Element {
  return (
    <Typography style={wrapper}>
      <Title>About the application</Title>
      <Paragraph>
        The application is developed by Electron and uses caj2pdf as tranformer.
      </Paragraph>
      <Paragraph>Thx for all caj2pdf developer.</Paragraph>
      <Paragraph>Welcome to issue or PR.</Paragraph>
    </Typography>
  );
}

export default About;
