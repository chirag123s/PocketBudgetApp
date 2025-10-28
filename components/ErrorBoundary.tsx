import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';
import { responsive } from '@/constants/responsive';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details to console
    console.error('╔══════════════════════════════════════════════════════════╗');
    console.error('║                   ERROR CAUGHT                           ║');
    console.error('╚══════════════════════════════════════════════════════════╝');
    console.error('');
    console.error('ERROR MESSAGE:', error.toString());
    console.error('ERROR NAME:', error.name);
    console.error('');
    console.error('ERROR STACK:', error.stack);
    console.error('');
    console.error('COMPONENT STACK:', errorInfo.componentStack);
    console.error('');
    console.error('ERROR OBJECT:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    console.error('');
    console.error('═══════════════════════════════════════════════════════════');

    this.setState({ errorInfo });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>⚠️ Oops! Something went wrong</Text>
            <Text style={styles.subtitle}>
              An error occurred in the app. Details are shown below:
            </Text>
          </View>

          <View style={styles.errorCard}>
            <Text style={styles.errorLabel}>Error Message:</Text>
            <Text style={styles.errorText}>
              {this.state.error?.toString()}
            </Text>
          </View>

          {this.state.error?.stack && (
            <View style={styles.errorCard}>
              <Text style={styles.errorLabel}>Stack Trace:</Text>
              <ScrollView horizontal>
                <Text style={styles.stackText}>
                  {this.state.error.stack}
                </Text>
              </ScrollView>
            </View>
          )}

          {this.state.errorInfo?.componentStack && (
            <View style={styles.errorCard}>
              <Text style={styles.errorLabel}>Component Stack:</Text>
              <ScrollView horizontal>
                <Text style={styles.stackText}>
                  {this.state.errorInfo.componentStack}
                </Text>
              </ScrollView>
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={this.resetError}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>

          <Text style={styles.hint}>
            💡 Tip: Check the console logs for full error details
          </Text>
        </ScrollView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  content: {
    padding: responsive.spacing[6],
    paddingTop: responsive.spacing[12],
  },
  header: {
    marginBottom: responsive.spacing[8],
  },
  title: {
    fontSize: responsive.fontSize.h3,
    lineHeight: responsive.fontSize.h3 * 1.3,
    fontWeight: '700',
    color: theme.colors.danger.main,
    marginBottom: responsive.spacing[2],
  },
  subtitle: {
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    color: theme.colors.text.secondary,
  },
  errorCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: responsive.layout.cardRadius,
    padding: responsive.spacing[4],
    marginBottom: responsive.spacing[4],
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.danger.main,
  },
  errorLabel: {
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: responsive.spacing[2],
  },
  errorText: {
    fontSize: responsive.fontSize.sm,
    lineHeight: responsive.fontSize.sm * 1.5,
    color: theme.colors.danger.dark,
    fontFamily: 'monospace',
  },
  stackText: {
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    color: theme.colors.text.secondary,
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: theme.colors.primary[500],
    borderRadius: responsive.layout.cardRadius,
    padding: responsive.spacing[4],
    alignItems: 'center',
    marginTop: responsive.spacing[6],
  },
  buttonText: {
    fontSize: responsive.fontSize.md,
    lineHeight: responsive.fontSize.md * 1.5,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  hint: {
    fontSize: responsive.fontSize.xs,
    lineHeight: responsive.fontSize.xs * 1.5,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: responsive.spacing[6],
    fontStyle: 'italic',
  },
});

export default ErrorBoundary;
