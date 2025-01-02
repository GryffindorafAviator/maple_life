import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import XmasIconSymbol from '@/components/ui/XmasIconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="sitting_tracking"
        options={{
          title: 'Sitting',
          tabBarIcon: ({ color }) => <XmasIconSymbol source={require('../../assets/icons/christmas-tree.png')} />,
        }}
      />
      <Tabs.Screen
        name="eating_tracking"
        options={{
          title: 'Eating',
          tabBarIcon: ({ color }) => <XmasIconSymbol source={require('../../assets/icons/christmas-wreath.png')} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Log',
          tabBarIcon: ({ color }) => <XmasIconSymbol source={require('../../assets/icons/christmas-bell.png')} />,
        }}
      />
    </Tabs>
  );
}
