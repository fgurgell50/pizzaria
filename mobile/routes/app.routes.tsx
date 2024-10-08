import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "@/pages/Dashboard"; 
import Order from "@/pages/Order";
import FinishOrder  from "@/pages/FinishOrder";


export type StackParamsList = {
    Dashboard: undefined
    Order: {
        number: number | string
        order_id: string
    }
    FinishOrder: undefined
}

const Stack = createNativeStackNavigator<StackParamsList>()

//páginas dos usuários logados

function AppRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} 
            /*
            options={{ 
                title: 'Dashboard',
                headerStyle: { backgroundColor: '#f4511e' },
                headerTitleStyle: { color: '#fff' },
                headerTitleAlign: 'left' 
                
              }}
                */
                 options={{headerShown: false}}
             />
            
            <Stack.Screen 
                name="Order" 
                component={Order} 
                options={{headerShown: false}}
             />

            <Stack.Screen 
                name="FinishOrder" 
                component={FinishOrder} 
                options={{
                    title: 'Finalizando',
                    headerStyle: {
                        backgroundColor: '#1d1d2e'
                    },
                    headerTintColor: '#FFFF'
                }}
             />

            </Stack.Navigator>
    )
}

export default AppRoutes