import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import SecurityAuditScreen from '../screens/SecurityAuditScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#0B1326' },
        cardStyleInterpolator: ({ current, next, layouts }) => {
          const opacity = current.progress.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.3, 1],
          });
          const scale = current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.97, 1],
          });
          return {
            cardStyle: {
              opacity,
              transform: [{ scale }],
            },
          };
        },
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 400 } },
          close: { animation: 'timing', config: { duration: 300 } },
        },
      }}
      initialRouteName="Auth"
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="SecurityAudit" component={SecurityAuditScreen} />
      <Stack.Screen name="MainApp" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

