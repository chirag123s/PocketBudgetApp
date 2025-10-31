import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  WidgetId,
  WidgetConfig,
  DEFAULT_WIDGET_ORDER,
  DEFAULT_ENABLED_WIDGETS,
} from '@/components/widgets';

/**
 * Widget Context
 * Manages widget visibility, order, and configuration
 */

interface WidgetSettings {
  enabledWidgets: WidgetId[];
  widgetOrder: WidgetId[];
  widgetConfig: Record<WidgetId, WidgetConfig>;
}

interface WidgetContextValue {
  enabledWidgets: WidgetId[];
  widgetOrder: WidgetId[];
  widgetConfig: Record<WidgetId, WidgetConfig>;
  isLoading: boolean;
  toggleWidget: (widgetId: WidgetId) => Promise<void>;
  updateWidgetOrder: (newOrder: WidgetId[]) => Promise<void>;
  updateWidgetConfig: (widgetId: WidgetId, config: WidgetConfig) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const WidgetContext = createContext<WidgetContextValue | undefined>(undefined);

const STORAGE_KEY = '@widget_settings';

interface WidgetProviderProps {
  children: ReactNode;
}

export const WidgetProvider: React.FC<WidgetProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<WidgetSettings>({
    enabledWidgets: DEFAULT_ENABLED_WIDGETS,
    widgetOrder: DEFAULT_WIDGET_ORDER,
    widgetConfig: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from storage on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);

        // Merge with default order to include any new widgets
        const storedOrder = parsed.widgetOrder || [];
        const newWidgets = DEFAULT_WIDGET_ORDER.filter(
          (id) => !storedOrder.includes(id)
        );
        const mergedOrder = [...storedOrder, ...newWidgets];

        setSettings({
          ...parsed,
          widgetOrder: mergedOrder,
        });
      }
    } catch (error) {
      console.error('Failed to load widget settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: WidgetSettings) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Failed to save widget settings:', error);
    }
  };

  const toggleWidget = async (widgetId: WidgetId) => {
    const isEnabled = settings.enabledWidgets.includes(widgetId);
    const newEnabledWidgets = isEnabled
      ? settings.enabledWidgets.filter((id) => id !== widgetId)
      : [...settings.enabledWidgets, widgetId];

    await saveSettings({
      ...settings,
      enabledWidgets: newEnabledWidgets,
    });
  };

  const updateWidgetOrder = async (newOrder: WidgetId[]) => {
    await saveSettings({
      ...settings,
      widgetOrder: newOrder,
    });
  };

  const updateWidgetConfig = async (widgetId: WidgetId, config: WidgetConfig) => {
    await saveSettings({
      ...settings,
      widgetConfig: {
        ...settings.widgetConfig,
        [widgetId]: config,
      },
    });
  };

  const resetToDefaults = async () => {
    await saveSettings({
      enabledWidgets: DEFAULT_ENABLED_WIDGETS,
      widgetOrder: DEFAULT_WIDGET_ORDER,
      widgetConfig: {},
    });
  };

  const value: WidgetContextValue = {
    enabledWidgets: settings.enabledWidgets,
    widgetOrder: settings.widgetOrder,
    widgetConfig: settings.widgetConfig,
    isLoading,
    toggleWidget,
    updateWidgetOrder,
    updateWidgetConfig,
    resetToDefaults,
  };

  return <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>;
};

export const useWidgets = (): WidgetContextValue => {
  const context = useContext(WidgetContext);
  if (context === undefined) {
    throw new Error('useWidgets must be used within a WidgetProvider');
  }
  return context;
};
