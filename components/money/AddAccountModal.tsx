import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '@/constants/theme';
import { responsive, ms } from '@/constants/responsive';
import { useTheme } from '@/contexts/ThemeContext';
import { BottomSheetModal } from '@/components/ui';

interface AddAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onAddAccount: (accountData: any) => void;
}

type AccountType = 'bank' | 'credit' | 'investment' | 'loan' | 'cash';
type ConnectionMethod = 'openbanking' | 'manual';
type Step = 'selectType' | 'selectMethod' | 'fillDetails' | 'confirm';

interface AccountTypeOption {
  type: AccountType;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
  color: string;
}

export function AddAccountModal({
  visible,
  onClose,
  onAddAccount,
}: AddAccountModalProps) {
  const { theme: themeMode } = useTheme();
  const theme = getTheme(themeMode);

  const [step, setStep] = useState<Step>('selectType');
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);
  const [connectionMethod, setConnectionMethod] = useState<ConnectionMethod | null>(null);
  const [accountData, setAccountData] = useState<any>({});

  const colors = {
    primary: theme.colors.info.main,
    neutralBg: theme.colors.background.secondary,
    neutralWhite: theme.colors.background.primary,
    neutralDarkest: theme.colors.text.primary,
    neutralDark: theme.colors.text.secondary,
    neutralMedium: theme.colors.text.tertiary,
    success: theme.colors.success.main,
    warning: theme.colors.warning.main,
    error: theme.colors.danger.main,
  };

  const accountTypes: AccountTypeOption[] = [
    {
      type: 'bank',
      label: 'Bank Account',
      icon: 'card-outline',
      description: 'Checking or savings account',
      color: colors.primary,
    },
    {
      type: 'credit',
      label: 'Credit Card',
      icon: 'card',
      description: 'Track credit card spending',
      color: colors.error,
    },
    {
      type: 'investment',
      label: 'Investment',
      icon: 'trending-up',
      description: 'Shares, ETFs, or managed funds',
      color: colors.success,
    },
    {
      type: 'loan',
      label: 'Loan',
      icon: 'calculator-outline',
      description: 'Home, car, or personal loan',
      color: colors.warning,
    },
    {
      type: 'cash',
      label: 'Cash',
      icon: 'cash-outline',
      description: 'Physical cash or wallet',
      color: '#6B7280',
    },
  ];

  const handleReset = () => {
    setStep('selectType');
    setSelectedType(null);
    setConnectionMethod(null);
    setAccountData({});
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSelectType = (type: AccountType) => {
    setSelectedType(type);
    // Bank and Credit Card can use Open Banking
    if (type === 'bank' || type === 'credit') {
      setStep('selectMethod');
    } else {
      setConnectionMethod('manual');
      setStep('fillDetails');
    }
  };

  const handleSelectMethod = (method: ConnectionMethod) => {
    setConnectionMethod(method);
    if (method === 'openbanking') {
      // TODO: Navigate to Basiq Open Banking flow
      console.log('Open Banking flow');
      handleClose();
    } else {
      setStep('fillDetails');
    }
  };

  const handleSubmit = () => {
    const completeData = {
      type: selectedType,
      connectionMethod,
      ...accountData,
      createdAt: new Date().toISOString(),
    };
    onAddAccount(completeData);
    handleClose();
  };

  const renderStepIndicator = () => {
    const steps = ['selectType', 'selectMethod', 'fillDetails'];
    const currentStepIndex = steps.indexOf(step);

    return (
      <View style={styles.stepIndicator}>
        {steps.map((s, index) => {
          if (s === 'selectMethod' && selectedType !== 'bank' && selectedType !== 'credit') {
            return null;
          }
          const isActive = index <= currentStepIndex;
          return (
            <View key={s} style={styles.stepItem}>
              <View style={[styles.stepDot, isActive && styles.stepDotActive]} />
              {index < steps.length - 1 && (
                <View style={[styles.stepLine, isActive && styles.stepLineActive]} />
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderSelectType = () => (
    <View style={styles.content}>
      <Text style={styles.contentTitle}>Choose Account Type</Text>
      <Text style={styles.contentDescription}>
        Select the type of account you want to add
      </Text>

      <View style={styles.optionsList}>
        {accountTypes.map((option) => (
          <TouchableOpacity
            key={option.type}
            style={styles.accountTypeCard}
            onPress={() => handleSelectType(option.type)}
            activeOpacity={0.7}
          >
            <View style={[styles.accountTypeIcon, { backgroundColor: `${option.color}15` }]}>
              <Ionicons name={option.icon} size={28} color={option.color} />
            </View>
            <View style={styles.accountTypeInfo}>
              <Text style={styles.accountTypeLabel}>{option.label}</Text>
              <Text style={styles.accountTypeDescription}>{option.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.neutralMedium} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSelectMethod = () => (
    <View style={styles.content}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setStep('selectType')}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={24} color={colors.neutralDarkest} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.contentTitle}>Connect Your Account</Text>
      <Text style={styles.contentDescription}>
        Choose how you'd like to connect your account
      </Text>

      <View style={styles.methodsList}>
        {/* Open Banking Option */}
        <TouchableOpacity
          style={styles.methodCard}
          onPress={() => handleSelectMethod('openbanking')}
          activeOpacity={0.7}
        >
          <View style={styles.methodCardHeader}>
            <View style={[styles.methodIcon, { backgroundColor: `${colors.success}15` }]}>
              <Ionicons name="flash" size={24} color={colors.success} />
            </View>
            <View style={styles.methodBadge}>
              <Text style={styles.methodBadgeText}>RECOMMENDED</Text>
            </View>
          </View>
          <Text style={styles.methodTitle}>Connect via Open Banking</Text>
          <Text style={styles.methodDescription}>
            • Secure automatic connection{'\n'}
            • Real-time balance updates{'\n'}
            • Automatic transaction sync{'\n'}
            • Bank-grade security
          </Text>
          <View style={styles.methodFooter}>
            <Ionicons name="shield-checkmark" size={16} color={colors.success} />
            <Text style={[styles.methodFooterText, { color: colors.success }]}>
              Powered by Basiq
            </Text>
          </View>
        </TouchableOpacity>

        {/* Manual Entry Option */}
        <TouchableOpacity
          style={styles.methodCard}
          onPress={() => handleSelectMethod('manual')}
          activeOpacity={0.7}
        >
          <View style={styles.methodCardHeader}>
            <View style={[styles.methodIcon, { backgroundColor: `${colors.primary}15` }]}>
              <Ionicons name="create-outline" size={24} color={colors.primary} />
            </View>
          </View>
          <Text style={styles.methodTitle}>Manual Entry</Text>
          <Text style={styles.methodDescription}>
            • Enter account details manually{'\n'}
            • Update balance manually{'\n'}
            • Full control over data{'\n'}
            • No bank connection required
          </Text>
          <View style={styles.methodFooter}>
            <Ionicons name="hand-left-outline" size={16} color={colors.neutralMedium} />
            <Text style={styles.methodFooterText}>Manual updates</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderBankForm = () => (
    <View style={styles.form}>
      <View style={styles.formField}>
        <Text style={styles.formLabel}>Account Name *</Text>
        <TextInput
          style={styles.formInput}
          placeholder="e.g., My Savings Account"
          placeholderTextColor={colors.neutralMedium}
          value={accountData.name || ''}
          onChangeText={(text) => setAccountData({ ...accountData, name: text })}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Bank / Institution *</Text>
        <TextInput
          style={styles.formInput}
          placeholder="e.g., Commonwealth Bank"
          placeholderTextColor={colors.neutralMedium}
          value={accountData.institution || ''}
          onChangeText={(text) => setAccountData({ ...accountData, institution: text })}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Account Type *</Text>
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              accountData.subType === 'checking' && styles.segmentButtonActive,
            ]}
            onPress={() => setAccountData({ ...accountData, subType: 'checking' })}
          >
            <Text
              style={[
                styles.segmentButtonText,
                accountData.subType === 'checking' && styles.segmentButtonTextActive,
              ]}
            >
              Checking
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              accountData.subType === 'savings' && styles.segmentButtonActive,
            ]}
            onPress={() => setAccountData({ ...accountData, subType: 'savings' })}
          >
            <Text
              style={[
                styles.segmentButtonText,
                accountData.subType === 'savings' && styles.segmentButtonTextActive,
              ]}
            >
              Savings
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Current Balance *</Text>
        <View style={styles.currencyInput}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.formInputCurrency}
            placeholder="0.00"
            placeholderTextColor={colors.neutralMedium}
            keyboardType="decimal-pad"
            value={accountData.balance || ''}
            onChangeText={(text) => setAccountData({ ...accountData, balance: text })}
          />
        </View>
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Account Number (Optional)</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Last 4 digits"
          placeholderTextColor={colors.neutralMedium}
          keyboardType="number-pad"
          maxLength={4}
          value={accountData.accountNumber || ''}
          onChangeText={(text) => setAccountData({ ...accountData, accountNumber: text })}
        />
      </View>
    </View>
  );

  const renderCreditForm = () => (
    <View style={styles.form}>
      <View style={styles.formField}>
        <Text style={styles.formLabel}>Card Name *</Text>
        <TextInput
          style={styles.formInput}
          placeholder="e.g., Visa Platinum"
          placeholderTextColor={colors.neutralMedium}
          value={accountData.name || ''}
          onChangeText={(text) => setAccountData({ ...accountData, name: text })}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Bank / Issuer *</Text>
        <TextInput
          style={styles.formInput}
          placeholder="e.g., ANZ"
          placeholderTextColor={colors.neutralMedium}
          value={accountData.institution || ''}
          onChangeText={(text) => setAccountData({ ...accountData, institution: text })}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Current Balance *</Text>
        <Text style={styles.formHint}>Amount you currently owe</Text>
        <View style={styles.currencyInput}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.formInputCurrency}
            placeholder="0.00"
            placeholderTextColor={colors.neutralMedium}
            keyboardType="decimal-pad"
            value={accountData.balance || ''}
            onChangeText={(text) => setAccountData({ ...accountData, balance: text })}
          />
        </View>
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Credit Limit *</Text>
        <View style={styles.currencyInput}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.formInputCurrency}
            placeholder="0.00"
            placeholderTextColor={colors.neutralMedium}
            keyboardType="decimal-pad"
            value={accountData.creditLimit || ''}
            onChangeText={(text) => setAccountData({ ...accountData, creditLimit: text })}
          />
        </View>
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Statement Day (Optional)</Text>
        <TextInput
          style={styles.formInput}
          placeholder="e.g., 15"
          placeholderTextColor={colors.neutralMedium}
          keyboardType="number-pad"
          maxLength={2}
          value={accountData.statementDay || ''}
          onChangeText={(text) => setAccountData({ ...accountData, statementDay: text })}
        />
      </View>
    </View>
  );

  const renderInvestmentForm = () => (
    <View style={styles.form}>
      <View style={styles.formField}>
        <Text style={styles.formLabel}>Account Name *</Text>
        <TextInput
          style={styles.formInput}
          placeholder="e.g., Share Portfolio"
          placeholderTextColor={colors.neutralMedium}
          value={accountData.name || ''}
          onChangeText={(text) => setAccountData({ ...accountData, name: text })}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Platform / Broker *</Text>
        <TextInput
          style={styles.formInput}
          placeholder="e.g., CommSec, SelfWealth"
          placeholderTextColor={colors.neutralMedium}
          value={accountData.institution || ''}
          onChangeText={(text) => setAccountData({ ...accountData, institution: text })}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Investment Type *</Text>
        <View style={styles.pickerButtons}>
          {['Shares', 'ETFs', 'Managed Funds', 'Super'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.pickerButton,
                accountData.subType === type && styles.pickerButtonActive,
              ]}
              onPress={() => setAccountData({ ...accountData, subType: type })}
            >
              <Text
                style={[
                  styles.pickerButtonText,
                  accountData.subType === type && styles.pickerButtonTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Current Value *</Text>
        <View style={styles.currencyInput}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.formInputCurrency}
            placeholder="0.00"
            placeholderTextColor={colors.neutralMedium}
            keyboardType="decimal-pad"
            value={accountData.balance || ''}
            onChangeText={(text) => setAccountData({ ...accountData, balance: text })}
          />
        </View>
      </View>
    </View>
  );

  const renderLoanForm = () => (
    <View style={styles.form}>
      <View style={styles.formField}>
        <Text style={styles.formLabel}>Loan Name *</Text>
        <TextInput
          style={styles.formInput}
          placeholder="e.g., Home Loan"
          placeholderTextColor={colors.neutralMedium}
          value={accountData.name || ''}
          onChangeText={(text) => setAccountData({ ...accountData, name: text })}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Lender *</Text>
        <TextInput
          style={styles.formInput}
          placeholder="e.g., Westpac"
          placeholderTextColor={colors.neutralMedium}
          value={accountData.institution || ''}
          onChangeText={(text) => setAccountData({ ...accountData, institution: text })}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Loan Type *</Text>
        <View style={styles.pickerButtons}>
          {['Home', 'Car', 'Personal', 'Student'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.pickerButton,
                accountData.subType === type && styles.pickerButtonActive,
              ]}
              onPress={() => setAccountData({ ...accountData, subType: type })}
            >
              <Text
                style={[
                  styles.pickerButtonText,
                  accountData.subType === type && styles.pickerButtonTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Outstanding Balance *</Text>
        <Text style={styles.formHint}>Amount still owed</Text>
        <View style={styles.currencyInput}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.formInputCurrency}
            placeholder="0.00"
            placeholderTextColor={colors.neutralMedium}
            keyboardType="decimal-pad"
            value={accountData.balance || ''}
            onChangeText={(text) => setAccountData({ ...accountData, balance: text })}
          />
        </View>
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Interest Rate (Optional)</Text>
        <View style={styles.percentInput}>
          <TextInput
            style={styles.formInputPercent}
            placeholder="0.00"
            placeholderTextColor={colors.neutralMedium}
            keyboardType="decimal-pad"
            value={accountData.interestRate || ''}
            onChangeText={(text) => setAccountData({ ...accountData, interestRate: text })}
          />
          <Text style={styles.percentSymbol}>%</Text>
        </View>
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Monthly Payment (Optional)</Text>
        <View style={styles.currencyInput}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.formInputCurrency}
            placeholder="0.00"
            placeholderTextColor={colors.neutralMedium}
            keyboardType="decimal-pad"
            value={accountData.monthlyPayment || ''}
            onChangeText={(text) => setAccountData({ ...accountData, monthlyPayment: text })}
          />
        </View>
      </View>
    </View>
  );

  const renderCashForm = () => (
    <View style={styles.form}>
      <View style={styles.formField}>
        <Text style={styles.formLabel}>Cash Account Name *</Text>
        <TextInput
          style={styles.formInput}
          placeholder="e.g., Wallet, Emergency Cash"
          placeholderTextColor={colors.neutralMedium}
          value={accountData.name || ''}
          onChangeText={(text) => setAccountData({ ...accountData, name: text })}
        />
      </View>

      <View style={styles.formField}>
        <Text style={styles.formLabel}>Current Amount *</Text>
        <View style={styles.currencyInput}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.formInputCurrency}
            placeholder="0.00"
            placeholderTextColor={colors.neutralMedium}
            keyboardType="decimal-pad"
            value={accountData.balance || ''}
            onChangeText={(text) => setAccountData({ ...accountData, balance: text })}
          />
        </View>
      </View>
    </View>
  );

  const renderFillDetails = () => {
    const accountType = accountTypes.find((t) => t.type === selectedType);

    return (
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (selectedType === 'bank' || selectedType === 'credit') {
              setStep('selectMethod');
            } else {
              setStep('selectType');
            }
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={colors.neutralDarkest} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.accountTypeHeader}>
          <View style={[styles.accountTypeIconLarge, { backgroundColor: `${accountType?.color}15` }]}>
            <Ionicons name={accountType?.icon || 'card-outline'} size={32} color={accountType?.color} />
          </View>
          <Text style={styles.contentTitle}>{accountType?.label} Details</Text>
        </View>

        {selectedType === 'bank' && renderBankForm()}
        {selectedType === 'credit' && renderCreditForm()}
        {selectedType === 'investment' && renderInvestmentForm()}
        {selectedType === 'loan' && renderLoanForm()}
        {selectedType === 'cash' && renderCashForm()}
      </View>
    );
  };

  const isFormValid = () => {
    if (!accountData.name || !accountData.balance) return false;
    if (selectedType === 'bank' || selectedType === 'credit' || selectedType === 'investment' || selectedType === 'loan') {
      if (!accountData.institution) return false;
    }
    if (selectedType === 'credit' && !accountData.creditLimit) return false;
    return true;
  };

  const getTitle = () => {
    switch (step) {
      case 'selectType':
        return 'Add Account';
      case 'selectMethod':
        return 'Connect Account';
      case 'fillDetails':
        return 'Account Details';
      default:
        return 'Add Account';
    }
  };

  const styles = StyleSheet.create({
    content: {
      // Content wrapper - no flex needed since parent handles layout
    },
    contentTitle: {
      fontSize: responsive.fontSize.xl,
      fontWeight: '700',
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[2],
    },
    contentDescription: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
      marginBottom: responsive.spacing[4],
    },
    stepIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: responsive.spacing[4],
      paddingHorizontal: responsive.spacing[8],
    },
    stepItem: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    stepDot: {
      width: ms(8),
      height: ms(8),
      borderRadius: ms(4),
      backgroundColor: colors.neutralMedium,
    },
    stepDotActive: {
      backgroundColor: colors.primary,
    },
    stepLine: {
      flex: 1,
      height: 2,
      backgroundColor: colors.neutralMedium,
      marginHorizontal: responsive.spacing[2],
    },
    stepLineActive: {
      backgroundColor: colors.primary,
    },
    optionsList: {
      gap: responsive.spacing[2],
    },
    accountTypeCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: responsive.spacing[3],
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border.light,
      backgroundColor: colors.neutralWhite,
      gap: responsive.spacing[3],
    },
    accountTypeIcon: {
      width: ms(56),
      height: ms(56),
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    accountTypeInfo: {
      flex: 1,
    },
    accountTypeLabel: {
      fontSize: responsive.fontSize.md,
      fontWeight: '600',
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[0.5],
    },
    accountTypeDescription: {
      fontSize: responsive.fontSize.xs,
      color: colors.neutralDark,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[1],
      marginBottom: responsive.spacing[3],
      alignSelf: 'flex-start',
    },
    backButtonText: {
      fontSize: responsive.fontSize.md,
      fontWeight: '600',
      color: colors.neutralDarkest,
    },
    methodsList: {
      gap: responsive.spacing[3],
    },
    methodCard: {
      padding: responsive.spacing[4],
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1.5,
      borderColor: theme.colors.border.light,
      backgroundColor: colors.neutralWhite,
    },
    methodCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsive.spacing[2],
    },
    methodIcon: {
      width: ms(48),
      height: ms(48),
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    methodBadge: {
      backgroundColor: colors.success,
      paddingHorizontal: responsive.spacing[2],
      paddingVertical: responsive.spacing[1],
      borderRadius: theme.borderRadius.sm,
    },
    methodBadgeText: {
      fontSize: responsive.fontSize.xs,
      fontWeight: '700',
      color: '#ffffff',
    },
    methodTitle: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '700',
      color: colors.neutralDarkest,
      marginBottom: responsive.spacing[2],
    },
    methodDescription: {
      fontSize: responsive.fontSize.sm,
      color: colors.neutralDark,
      lineHeight: 22,
      marginBottom: responsive.spacing[3],
    },
    methodFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsive.spacing[1],
      paddingTop: responsive.spacing[2],
      borderTopWidth: 1,
      borderTopColor: theme.colors.border.light,
    },
    methodFooterText: {
      fontSize: responsive.fontSize.xs,
      fontWeight: '600',
      color: colors.neutralMedium,
    },
    accountTypeHeader: {
      alignItems: 'center',
      marginBottom: responsive.spacing[4],
    },
    accountTypeIconLarge: {
      width: ms(72),
      height: ms(72),
      borderRadius: theme.borderRadius.xl,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: responsive.spacing[3],
    },
    form: {
      gap: responsive.spacing[4],
    },
    formField: {
      gap: responsive.spacing[2],
    },
    formLabel: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDarkest,
    },
    formHint: {
      fontSize: responsive.fontSize.xs,
      color: colors.neutralMedium,
      marginTop: -responsive.spacing[1],
    },
    formInput: {
      borderWidth: 1,
      borderColor: theme.colors.border.light,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: responsive.spacing[3],
      paddingVertical: responsive.spacing[3],
      fontSize: responsive.fontSize.md,
      color: colors.neutralDarkest,
      backgroundColor: colors.neutralWhite,
    },
    currencyInput: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border.light,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: responsive.spacing[3],
      backgroundColor: colors.neutralWhite,
    },
    currencySymbol: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '600',
      color: colors.neutralDark,
      marginRight: responsive.spacing[2],
    },
    formInputCurrency: {
      flex: 1,
      paddingVertical: responsive.spacing[3],
      fontSize: responsive.fontSize.md,
      color: colors.neutralDarkest,
    },
    percentInput: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border.light,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: responsive.spacing[3],
      backgroundColor: colors.neutralWhite,
    },
    formInputPercent: {
      flex: 1,
      paddingVertical: responsive.spacing[3],
      fontSize: responsive.fontSize.md,
      color: colors.neutralDarkest,
    },
    percentSymbol: {
      fontSize: responsive.fontSize.lg,
      fontWeight: '600',
      color: colors.neutralDark,
      marginLeft: responsive.spacing[2],
    },
    segmentedControl: {
      flexDirection: 'row',
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border.light,
      overflow: 'hidden',
    },
    segmentButton: {
      flex: 1,
      paddingVertical: responsive.spacing[3],
      alignItems: 'center',
      backgroundColor: colors.neutralWhite,
    },
    segmentButtonActive: {
      backgroundColor: colors.primary,
    },
    segmentButtonText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDarkest,
    },
    segmentButtonTextActive: {
      color: '#ffffff',
    },
    pickerButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: responsive.spacing[2],
    },
    pickerButton: {
      paddingVertical: responsive.spacing[2],
      paddingHorizontal: responsive.spacing[3],
      borderRadius: theme.borderRadius.full,
      borderWidth: 1,
      borderColor: theme.colors.border.light,
      backgroundColor: colors.neutralWhite,
    },
    pickerButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    pickerButtonText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: colors.neutralDarkest,
    },
    pickerButtonTextActive: {
      color: '#ffffff',
    },
    submitButton: {
      backgroundColor: colors.primary,
      borderRadius: theme.borderRadius.lg,
      paddingVertical: responsive.spacing[3],
      alignItems: 'center',
      ...theme.shadows.sm,
    },
    submitButtonDisabled: {
      backgroundColor: colors.neutralMedium,
    },
    submitButtonText: {
      fontSize: responsive.fontSize.md,
      fontWeight: '700',
      color: '#ffffff',
    },
  });

  const renderFooter = () => {
    if (step !== 'fillDetails') return null;

    return (
      <TouchableOpacity
        style={[styles.submitButton, !isFormValid() && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={!isFormValid()}
        activeOpacity={0.8}
      >
        <Text style={styles.submitButtonText}>Add Account</Text>
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheetModal
      visible={visible}
      onClose={handleClose}
      title={getTitle()}
      scrollable={true}
      maxHeight="90%"
      footer={renderFooter()}
    >
      {step !== 'selectType' && renderStepIndicator()}
      {step === 'selectType' && renderSelectType()}
      {step === 'selectMethod' && renderSelectMethod()}
      {step === 'fillDetails' && renderFillDetails()}
    </BottomSheetModal>
  );
}
