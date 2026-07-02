import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';

// Navigation theme - dark
const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#6366F1',
    background: '#0B1326',
    card: '#0F1A35',
    text: '#F1F5F9',
    border: 'rgba(255,255,255,0.06)',
    notification: '#EF4444',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" backgroundColor="#0B1326" />
      <AppNavigator />
    </NavigationContainer>
  );
}
