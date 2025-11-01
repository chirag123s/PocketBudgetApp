import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTheme } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import PagerView from 'react-native-pager-view';
import HomeScreen from './index';
import MoneyTab from './money';
import BudgetTab from './budget';
import InsightsTab from './insights';
import MoreScreen from './more';

type TabName = 'index' | 'money' | 'budget' | 'insights' | 'more';

const TAB_ORDER: TabName[] = ['index', 'money', 'budget', 'insights', 'more'];

const TAB_CONFIG = [
  { id: 'index', title: 'Home', icon: 'home' as const },
  { id: 'money', title: 'Money', icon: 'cash' as const },
  { id: 'budget', title: 'Budget', icon: 'wallet' as const },
  { id: 'insights', title: 'Insights', icon: 'analytics' as const },
  { id: 'more', title: 'More', icon: 'ellipsis-horizontal' as const },
];

export default function TabsLayout() {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState<TabName>('index');
  const pagerRef = useRef<PagerView>(null);

  // Handle tab press
  const handleTabPress = (tabId: TabName) => {
    setActiveTab(tabId);
    const pageIndex = TAB_ORDER.indexOf(tabId);
    pagerRef.current?.setPage(pageIndex);
  };

  // Handle swipe
  const handlePageSelected = (e: any) => {
    const pageIndex = e.nativeEvent.position;
    setActiveTab(TAB_ORDER[pageIndex]);
  };

  const tabBarHeight = 60 + insets.bottom;
  const tabBarPaddingBottom = Math.max(8, insets.bottom);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: theme.colors.background.primary,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border.light,
      height: tabBarHeight,
      paddingBottom: tabBarPaddingBottom,
      paddingTop: 8,
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
    },
    tabLabel: {
      fontSize: 12,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      {/* Swipeable Content */}
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={handlePageSelected}
      >
        <View key="index" style={{ flex: 1 }}>
          <HomeScreen />
        </View>
        <View key="money" style={{ flex: 1 }}>
          <MoneyTab />
        </View>
        <View key="budget" style={{ flex: 1 }}>
          <BudgetTab />
        </View>
        <View key="insights" style={{ flex: 1 }}>
          <InsightsTab />
        </View>
        <View key="more" style={{ flex: 1 }}>
          <MoreScreen />
        </View>
      </PagerView>

      {/* Custom Tab Bar */}
      <View style={styles.tabBar}>
        {TAB_CONFIG.map((tab) => {
          const isActive = activeTab === tab.id;
          const color = isActive ? theme.colors.info.main : theme.colors.text.tertiary;

          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabButton}
              onPress={() => handleTabPress(tab.id as TabName)}
              activeOpacity={0.7}
            >
              <Ionicons name={tab.icon} size={24} color={color} />
              <Text style={[styles.tabLabel, { color }]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
