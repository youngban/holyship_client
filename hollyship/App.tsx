import * as React from 'react';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  IconRegistry,
} from 'react-native-ui-kitten';
import AppStack from './src/screens/index';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

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
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={darkTheme}>
          <ApplicationContent />
        </ApplicationProvider>
      </>
    );
  }
}
