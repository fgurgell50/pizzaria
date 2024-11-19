import React, { useContext, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
//import { AuthContext } from '@/contexts/AuthContext';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '@/routes/app.routes';
import { api } from '@/services/api';

export default function Dashboard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()
    //const { signOut } = useContext(AuthContext)
    const [ number, setNumber ] = useState('')

    async function openOrder(){ 
       if(number === ''){
        return
       }

       try {
        const response = await api.post('/order', {
            table: Number(number) // convertendo para número
           })
        //console.log(response.data)

           //requisicao e abrir a mesa e navegar para próxima tela
       navigation.navigate('Order', { number: number, order_id: response.data.id })
       setNumber('')

       } catch (error) {
            console.log(error)
       }
    }

    return(
        <SafeAreaView style = { styles.container }>
            <Text style = { styles.title } >Novo Pedido</Text>
            <TextInput 
                placeholder='Número da Mesa'
                placeholderTextColor= '#F0F0F0'
                style = { styles.input }
                keyboardType='numeric'
                value={number}
                onChangeText={setNumber}
            />

            <TouchableOpacity style = { styles.button } onPress={openOrder}>
                <Text style = { styles.textButton } >Abrir Mesa</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //pegar o tam inteiro da tela 
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#1d1d2e'    
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 24    
    },
    input: {
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 22,
        color: '#FFF'
    },
    button: {
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius:4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold'
    }
})