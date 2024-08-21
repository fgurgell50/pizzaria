
import React from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import Routes from '@/routes'; // Ajuste o caminho conforme necessário

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1d1d2e' }}>
      <StatusBar backgroundColor= '#1d1d2e' barStyle= 'light-content' translucent= {false} />
      <Routes />
    </SafeAreaView>
  );
}
