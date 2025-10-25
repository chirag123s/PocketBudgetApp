import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

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
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║                   ERROR CAUGHT                           ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('ERROR MESSAGE:', error.toString());
    console.log('');
    console.log('ERROR STACK:', error.stack);
    console.log('');
    console.log('COMPONENT STACK:', errorInfo.componentStack);
    console.log('');
    console.log('═══════════════════════════════════════════════════════════');

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
    padding: theme.responsive.spacing.lg,
    paddingTop: theme.responsive.spacing.xxl,
  },
  header: {
    marginBottom: theme.responsive.spacing.xl,
  },
  title: {
    fontSize: theme.responsive.fontSize.h2,
    fontWeight: '700',
    color: theme.colors.danger.main,
    marginBottom: theme.responsive.spacing.sm,
  },
  subtitle: {
    fontSize: theme.responsive.fontSize.body,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
  errorCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.responsive.scale(12),
    padding: theme.responsive.spacing.md,
    marginBottom: theme.responsive.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.danger.main,
  },
  errorLabel: {
    fontSize: theme.responsive.fontSize.bodySmall,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.responsive.spacing.sm,
  },
  errorText: {
    fontSize: theme.responsive.fontSize.bodySmall,
    color: theme.colors.danger.dark,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  stackText: {
    fontSize: theme.responsive.fontSize.caption,
    color: theme.colors.text.secondary,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  button: {
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.responsive.scale(12),
    padding: theme.responsive.spacing.md,
    alignItems: 'center',
    marginTop: theme.responsive.spacing.lg,
  },
  buttonText: {
    fontSize: theme.responsive.fontSize.button,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  hint: {
    fontSize: theme.responsive.fontSize.caption,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: theme.responsive.spacing.lg,
    fontStyle: 'italic',
  },
});

export default ErrorBoundary;
