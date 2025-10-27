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
    padding: theme.spacing[6],
    paddingTop: theme.spacing[12],
  },
  header: {
    marginBottom: theme.spacing[8],
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.danger.main,
    marginBottom: theme.spacing[2],
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
  errorCard: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: 12,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[4],
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.danger.main,
  },
  errorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
  },
  errorText: {
    fontSize: 14,
    color: theme.colors.danger.dark,
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  stackText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  button: {
    backgroundColor: theme.colors.primary[500],
    borderRadius: 12,
    padding: theme.spacing[4],
    alignItems: 'center',
    marginTop: theme.spacing[6],
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  hint: {
    fontSize: 12,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: theme.spacing[6],
    fontStyle: 'italic',
  },
});

export default ErrorBoundary;
