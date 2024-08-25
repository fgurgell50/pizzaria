import React, { useContext } from "react";
import { ActivityIndicator, SafeAreaView } from 'react-native'
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { AuthContext } from "@/contexts/AuthContext";

function Routes(){
    const { isAuthenticated, loading } = useContext(AuthContext);

    if(loading){
        return(
            <SafeAreaView style={{ flex:1, backgroundColor: '#F5f7fb', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={60} color='#1D1D2E'/>
            </SafeAreaView>
        );
    }

    return(
        <SafeAreaView style={{ flex: 1 }}>
            {isAuthenticated ? <AppRoutes/> : <AuthRoutes/>}
        </SafeAreaView>
    );
}

export default Routes;
