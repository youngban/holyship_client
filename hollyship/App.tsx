import * as React from 'react';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import AppStack from './src/screens/index';

interface Props {}
interface State {}

const ApplicationContent = () => (
  <Layout style={{ flex: 1, justifyContent: 'center' }}>
    <AppStack />
  </Layout>
);

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={darkTheme}>
        <ApplicationContent />
      </ApplicationProvider>
    );
  }
}
