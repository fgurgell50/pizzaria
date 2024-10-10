
import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import Routes from '@/routes'; // Ajuste o caminho conforme necessário
import { AuthProvider } from '@/contexts/AuthContext';

export default function HomeScreen() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#1d1d2e' }}>
        <StatusBar backgroundColor= '#1d1d2e' barStyle= 'light-content' translucent= {false} />
        <Routes />
      </SafeAreaView>
    </AuthProvider>
  );
}
