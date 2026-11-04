import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AppColors } from '~theme';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('Error caught:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.emoji}>😵</Text>

          <Text style={styles.title}>Oops! Something went wrong</Text>

          <Text style={styles.subtitle}>
            The app ran into an unexpected issue.
          </Text>

          <TouchableOpacity style={styles.primaryBtn} onPress={this.reset}>
            <Text style={styles.primaryText}>Try Again</Text>
          </TouchableOpacity>

          {/* Dev error details */}
          {__DEV__ && this.state.error && (
            <ScrollView
              style={styles.devBox}
              contentContainerStyle={{ padding: 10 }}>
              <Text style={styles.devText}>{this.state.error.toString()}</Text>
            </ScrollView>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.White,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: AppColors.whiteGrey,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  primaryBtn: {
    backgroundColor: AppColors.Secondary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 12,
  },
  primaryText: {
    color: AppColors.White,
    fontWeight: '600',
  },
  devBox: {
    marginTop: 20,
    maxHeight: 150,
    width: '100%',
    backgroundColor: AppColors.DarkBlue,
    borderRadius: 8,
  },
  devText: {
    color: AppColors.White,
    fontSize: 12,
  },
});
