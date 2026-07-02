import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/colors';
import DashboardScreen from '../screens/main/DashboardScreen';
import ShieldScreen from '../screens/main/ShieldScreen';
import AnalyticsScreen from '../screens/main/AnalyticsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ name, focused, color, label, badge }) => (
  <View style={[tbStyles.iconWrapper, focused && tbStyles.iconWrapperFocused]}>
    {focused && (
      <LinearGradient
        colors={[Colors.accentIndigo + '30', 'transparent']}
        style={StyleSheet.absoluteFill}
      />
    )}
    <Ionicons name={name} size={22} color={color} />
    {badge && <View style={tbStyles.badge}><Text style={tbStyles.badgeText}>{badge}</Text></View>}
  </View>
);

const tbStyles = StyleSheet.create({
  iconWrapper: {
    width: 48, height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconWrapperFocused: {
    borderWidth: 1,
    borderColor: Colors.borderGlow,
  },
  badge: {
    position: 'absolute',
    top: 4, right: 4,
    width: 8, height: 8,
    borderRadius: 4,
    backgroundColor: Colors.critical,
    borderWidth: 1.5,
    borderColor: Colors.bgPrimary,
  },
  badgeText: { fontSize: 8, color: '#FFF', fontWeight: '700' },
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0C1528',
          borderTopWidth: 1,
          borderTopColor: Colors.borderSubtle,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 24 : 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: Colors.accentIndigo,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name={focused ? 'grid' : 'grid-outline'} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Shield"
        component={ShieldScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name={focused ? 'shield' : 'shield-outline'} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name={focused ? 'bar-chart' : 'bar-chart-outline'} focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} focused={focused} color={color} badge />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

