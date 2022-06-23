import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from 'rn-custom-style-sheet';
import { ScaledScreen } from './ScaledScreen';
import { ThemeScreen } from './ThemeScreen';
import { ScaledThemeScreen } from './ScaledThemeScreen';
import { HomeScreen } from './HomeScreen';
import { MediaQueryScreen } from './MediaQueryScreen';
import { StyleComponentScreen } from './StyleComponentScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Scaled" component={ScaledScreen} />
          <Stack.Screen name="Theme" component={ThemeScreen} />
          <Stack.Screen name="ScaledTheme" component={ScaledThemeScreen} />
          <Stack.Screen name="MediaQuery" component={MediaQueryScreen} />
          <Stack.Screen name="StyleComponent" component={StyleComponentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
