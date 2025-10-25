import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen } from '@/components/layout/Screen';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
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
    paddingHorizontal: theme.responsive.spacing.md,
    paddingVertical: theme.responsive.spacing.sm,
    backgroundColor: theme.colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  backButton: {
    padding: theme.responsive.spacing.sm,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    ...theme.typography.styles.h3,
    fontSize: theme.responsive.fontSize.large,
  },
  headerSubtitle: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    marginTop: theme.responsive.spacing.xs,
  },
  placeholder: {
    width: theme.responsive.moderateScale(40),
  },
  content: {
    padding: theme.responsive.getScreenPadding(),
    paddingBottom: theme.responsive.spacing.xl,
  },
  question: {
    ...theme.typography.styles.h2,
    fontSize: theme.responsive.fontSize.h4,
    textAlign: 'center',
    marginBottom: theme.responsive.spacing.lg,
  },
  smartDetectionCard: {
    backgroundColor: theme.colors.info.light,
    borderWidth: 1,
    borderColor: theme.colors.info.main,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.lg,
  },
  smartDetectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.responsive.spacing.sm,
  },
  smartDetectionInfo: {
    flex: 1,
  },
  smartDetectionTitle: {
    ...theme.typography.styles.body,
    fontWeight: '600',
    color: theme.colors.info.dark,
    marginBottom: theme.responsive.spacing.xs,
  },
  smartDetectionAmount: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.info.dark,
  },
  smartDetectionDate: {
    ...theme.typography.styles.caption,
    color: theme.colors.info.main,
    marginTop: theme.responsive.spacing.xs,
  },
  smartDetectionActions: {
    flexDirection: 'row',
    gap: theme.responsive.spacing.sm,
  },
  useAmountButton: {
    flex: 1,
    backgroundColor: theme.colors.info.main,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.responsive.spacing.sm,
    alignItems: 'center',
  },
  useAmountButtonText: {
    ...theme.typography.styles.button,
    color: '#FFFFFF',
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  enterDifferentButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.info.main,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.responsive.spacing.sm,
    alignItems: 'center',
  },
  enterDifferentButtonText: {
    ...theme.typography.styles.button,
    color: theme.colors.info.main,
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  sourcesContainer: {
    gap: theme.responsive.spacing.sm,
    marginBottom: theme.responsive.spacing.lg,
  },
  sourceCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    ...theme.shadows.sm,
  },
  sourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.sm,
  },
  sourceIcon: {
    fontSize: theme.responsive.fontSize.h3,
    marginRight: theme.responsive.spacing.sm,
  },
  sourceNameInput: {
    flex: 1,
    ...theme.typography.styles.body,
    fontWeight: '500',
    color: theme.colors.text.primary,
  },
  removeButton: {
    padding: theme.responsive.spacing.xs,
  },
  sourceAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: theme.responsive.fontSize.h3,
    color: theme.colors.text.tertiary,
    marginRight: theme.responsive.spacing.sm,
  },
  sourceAmountInput: {
    flex: 1,
    fontSize: theme.responsive.fontSize.h3,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  addSourceButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    alignItems: 'center',
    marginBottom: theme.responsive.spacing.lg,
  },
  addSourceText: {
    ...theme.typography.styles.button,
    color: theme.colors.text.secondary,
    fontSize: theme.responsive.fontSize.bodySmall,
  },
  totalCard: {
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.lg,
  },
  totalLabel: {
    ...theme.typography.styles.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.responsive.spacing.xs,
  },
  totalAmount: {
    fontSize: theme.responsive.fontSize.h1,
    fontWeight: '700',
    color: theme.colors.primary[700],
  },
  commonTypesCard: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.lg,
  },
  commonTypesLabel: {
    ...theme.typography.styles.label,
    fontSize: theme.responsive.fontSize.caption,
    color: theme.colors.text.secondary,
    fontWeight: '600',
    marginBottom: theme.responsive.spacing.sm,
  },
  commonTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.responsive.spacing.sm,
  },
  commonTypeChip: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.responsive.spacing.sm,
    paddingVertical: 6,
  },
  commonTypeText: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.secondary,
  },
});
