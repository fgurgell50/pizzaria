import React from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInputBase } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function FinishOrder(){
    return(
        <SafeAreaView style = { styles.container }>
            <Text style= { styles.alert } >\Voce deseja finalizar esse pedido</Text>
            <Text style= { styles.title } >Mesa 30</Text>

        <TouchableOpacity style = { styles.button }>
            <Text style = { styles.textButton } >Finalizar Pedido</Text>
            <Feather name="shopping-cart"  size={20} color='#1d1d2e'  F>
        </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    alert: {
        fontSize: 20,
        color: '#FFFF',
        fontWeight: 'bold',
        marginBottom: 12
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFF',
        marginBottom: 12
    },
    textButton: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: '#1d1d2e'
    },
    button: {
        backgroundColor: '#3fffa3',
        flexDirection: 'row',
        width: '63%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    }
}) 