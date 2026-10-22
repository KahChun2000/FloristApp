import React from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import RootNavigator from './src/navigation/RootNavigator';

const navigationRef = createNavigationContainerRef();

function updateStatusBar() {
  const routeName = navigationRef.getCurrentRoute()?.name ?? '';
  if (routeName === 'Mall') {
    StatusBar.setBarStyle('dark-content');
  } else {
    StatusBar.setBarStyle('light-content');
  }
}

function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={updateStatusBar}
          onStateChange={updateStatusBar}
        >
          <RootNavigator />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;
