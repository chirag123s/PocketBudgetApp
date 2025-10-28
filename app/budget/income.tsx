import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

interface IncomeSource {
  id: number;
  name: string;
  amount: string;
  icon: string;
}

const commonIncomeSources = ['Salary', 'Side Hustle', 'Centrelink', 'Investment', 'Rental Income'];

export default function IncomeEntry() {
  const router = useRouter();
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([
    { id: 1, name: 'Salary', amount: '', icon: '💰' },
  ]);
  const [showSmartDetection, setShowSmartDetection] = useState(true);

  const addIncomeSource = () => {
    setIncomeSources([
      ...incomeSources,
      { id: Date.now(), name: '', amount: '', icon: '💼' },
    ]);
  };

  const removeIncomeSource = (id: number) => {
    if (incomeSources.length > 1) {
      setIncomeSources(incomeSources.filter(source => source.id !== id));
    }
  };

  const updateIncomeSource = (id: number, field: 'name' | 'amount', value: string) => {
    setIncomeSources(incomeSources.map(source =>
      source.id === id ? { ...source, [field]: value } : source
    ));
  };

  const calculateTotal = () => {
    return incomeSources.reduce((sum, source) => sum + (parseFloat(source.amount) || 0), 0);
  };

  const useDetectedSalary = () => {
    setIncomeSources([{ id: 1, name: 'Acme Corp Salary', amount: '3200', icon: '💰' }]);
    setShowSmartDetection(false);
  };

  return (
    <Screen noPadding backgroundColor={theme.colors.background.secondary}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary[600]} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Income</Text>
          <Text style={styles.headerSubtitle}>Step 2 of 4</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Question */}
        <Text style={styles.question}>
          How much do you expect{'\n'}to earn this period?
        </Text>

        {/* Smart Detection */}
        {showSmartDetection && (
          <View style={styles.smartDetectionCard}>
            <View style={styles.smartDetectionHeader}>
              <View style={styles.smartDetectionInfo}>
                <Text style={styles.smartDetectionTitle}>We found your salary!</Text>
                <Text style={styles.smartDetectionAmount}>Acme Corp - $3,200</Text>
                <Text style={styles.smartDetectionDate}>(Received Oct 15)</Text>
              </View>
              <TouchableOpacity onPress={() => setShowSmartDetection(false)}>
                <Ionicons name="close" size={20} color={theme.colors.info.dark} />
              </TouchableOpacity>
            </View>
            <View style={styles.smartDetectionActions}>
              <TouchableOpacity
                style={styles.useAmountButton}
                onPress={useDetectedSalary}
              >
                <Text style={styles.useAmountButtonText}>Use This Amount</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.enterDifferentButton}
                onPress={() => setShowSmartDetection(false)}
              >
                <Text style={styles.enterDifferentButtonText}>Enter Different</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Income Sources */}
        <View style={styles.sourcesContainer}>
          {incomeSources.map((source, index) => (
            <View key={source.id} style={styles.sourceCard}>
              <View style={styles.sourceHeader}>
                <Text style={styles.sourceIcon}>{source.icon}</Text>
                <TextInput
                  style={styles.sourceNameInput}
                  placeholder="Income source name"
                  value={source.name}
                  onChangeText={(value) => updateIncomeSource(source.id, 'name', value)}
                  placeholderTextColor={theme.colors.text.tertiary}
                />
                {incomeSources.length > 1 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeIncomeSource(source.id)}
                  >
                    <Ionicons name="close" size={16} color={theme.colors.danger.main} />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.sourceAmountContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={styles.sourceAmountInput}
                  placeholder="0"
                  value={source.amount}
                  onChangeText={(value) => updateIncomeSource(source.id, 'amount', value)}
                  keyboardType="numeric"
                  placeholderTextColor={theme.colors.text.tertiary}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Add Income Source Button */}
        <TouchableOpacity
          style={styles.addSourceButton}
          onPress={addIncomeSource}
        >
          <Text style={styles.addSourceText}>+ Add Income Source</Text>
        </TouchableOpacity>

        {/* Total */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Income</Text>
          <Text style={styles.totalAmount}>
            ${calculateTotal().toLocaleString('en-AU')} / month
          </Text>
        </View>

        {/* Common Income Types */}
        <View style={styles.commonTypesCard}>
          <Text style={styles.commonTypesLabel}>COMMON INCOME SOURCES</Text>
          <View style={styles.commonTypesGrid}>
            {commonIncomeSources.map((type, index) => (
              <View key={index} style={styles.commonTypeChip}>
                <Text style={styles.commonTypeText}>{type}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Continue Button */}
        <Button
          variant="primary"
          fullWidth
          size="large"
          onPress={() => router.push('/budget/categories')}
        >
          Continue
        </Button>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsive.spacing[4],
    paddingVertical: responsive.spacing[2],
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: responsive.spacing[2],
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: responsive.fontSize.lg,
    lineHeight: responsive.fontSize.lg * 1.5,
  },
  headerSubtitle: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    marginTop: responsive.spacing[1],
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: responsive.spacing[6],
    paddingBottom: responsive.spacing[8],
  },
  question: {
    ...theme.typography.styles.h2,
    fontSize: responsive.fontSize.xl,
    lineHeight: responsive.fontSize.xl * 1.5,
    textAlign: 'center',
    marginBottom: responsive.spacing[6],
  },
  smartDetectionCard: {
    backgroundColor: theme.colors.info.light,
    borderWidth: 1,
    borderColor: theme.colors.info.main,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[6],
  },
  smartDetectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: responsive.spacing[2],
  },
  smartDetectionInfo: {
    flex: 1,
  },
  smartDetectionTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.info.dark,
    marginBottom: responsive.spacing[1],
  },
  smartDetectionAmount: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.info.dark,
  },
  smartDetectionDate: {
    ...theme.typography.styles.caption,
    color: theme.colors.info.main,
    marginTop: responsive.spacing[1],
  },
  smartDetectionActions: {
    flexDirection: 'row',
    gap: responsive.spacing[2],
  },
  useAmountButton: {
    flex: 1,
    backgroundColor: theme.colors.info.main,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: responsive.spacing[2],
    alignItems: 'center',
  },
  useAmountButtonText: {
    ...theme.typography.styles.button,
    color: '#FFFFFF',
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  enterDifferentButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.info.main,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: responsive.spacing[2],
    alignItems: 'center',
  },
  enterDifferentButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.info.main,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  sourcesContainer: {
    gap: responsive.spacing[2],
    marginBottom: responsive.spacing[6],
  },
  sourceCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    ...theme.shadows.sm,
  },
  sourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsive.spacing[2],
  },
  sourceIcon: {
    fontSize: responsive.fontSize.h4,
    lineHeight: responsive.fontSize.h4 * 1.5,
    marginRight: responsive.spacing[2],
  },
  sourceNameInput: {
    flex: 1,
    ...theme.typography.styles.body,
    fontWeight: '500',
    color: theme.colors.text.primary,
  },
  removeButton: {
    padding: responsive.spacing[1],
  },
  sourceAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: responsive.fontSize.h4,
    lineHeight: responsive.fontSize.h4 * 1.5,
    color: theme.colors.text.tertiary,
    marginRight: responsive.spacing[2],
  },
  sourceAmountInput: {
    flex: 1,
    fontSize: responsive.fontSize.h4,
    lineHeight: responsive.fontSize.h4 * 1.5,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  addSourceButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    alignItems: 'center',
    marginBottom: responsive.spacing[6],
  },
  addSourceText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
  },
  totalCard: {
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[6],
  },
  totalLabel: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: responsive.spacing[1],
  },
  totalAmount: {
    fontSize: responsive.fontSize.h2,
    lineHeight: responsive.fontSize.h2 * 1.5,
    fontWeight: '700',
    color: theme.colors.primary[700],
  },
  commonTypesCard: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[6],
  },
  commonTypesLabel: {
    ...theme.typography.styles.label,
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    color: theme.colors.text.secondary,
    fontWeight: '600',
    marginBottom: responsive.spacing[2],
  },
  commonTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.spacing[2],
  },
  commonTypeChip: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: responsive.spacing[2],
    paddingVertical: 6,
  },
  commonTypeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.secondary,
  },
});
