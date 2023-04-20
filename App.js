import { NavigationContainer } from '@react-navigation/native';
import Main from './src/components/Main';
import { UserProvider } from './src/components/UserProvider';

export default function App() {
  return <UserProvider><NavigationContainer><Main/></NavigationContainer></UserProvider>
  
} 