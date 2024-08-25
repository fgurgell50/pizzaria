import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './app/(tabs)'; // Ajuste o caminho 
import {AuthProvider} from '@/contexts/AuthContext';

export default function App() {
  return (
    <NavigationContainer>

        <HomeScreen />

    </NavigationContainer>
  );
}
