import React, { useContext, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { AuthContext } from '@/contexts/AuthContext';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

type RouteDetailParams = {
    Order: {
        number: number | string
        order_id: string
    }
}
type OrderRouteProp = RouteProp<RouteDetailParams,'Order'>

export default function Order(){
    const route = useRoute<OrderRouteProp>() // para receber os parametros "tipados"

    //const { signOut } = useContext(AuthContext)

    const [ number, setNumber ] = useState('')

    async function openOrder(){
       if(number === ''){
        return
       }

       //requisicao e abrir a mesa e navegar para próxima tela

    }

    return(
        <SafeAreaView style = { styles.container }>
            <SafeAreaView style = { styles.header } >
                <Text style = { styles.title } >Mesa {route.params.number}</Text>
                <TouchableOpacity>
                    <Feather name="trash-2" size={28} color='#FF3F4b'/>
                </TouchableOpacity>
            </SafeAreaView>

            <TouchableOpacity style = { styles.input } >
                <Text style = { { color: '#FFF' }} >Pizzas</Text>
            </TouchableOpacity>

            <TouchableOpacity style = { styles.input } >
                <Text style = { { color: '#FFF' }}  >Pizza de Calabresa</Text>
            </TouchableOpacity>

            <SafeAreaView style = { styles.qtdContainer } >
                <Text style = { styles.qtdText } >Quantidade</Text>
                <TextInput 
                    style = {[ styles.input, { width: '60%', textAlign:'center' } ]}
                    placeholderTextColor = '#F0F0F0'
                    keyboardType = 'numeric'
                    value='1'
                />
            </SafeAreaView>

            <SafeAreaView style = { styles.actions } >
                <TouchableOpacity style = { styles.buttonAdd } >
                    <Text style = { styles.buttonText } >+</Text>
                </TouchableOpacity>

                <TouchableOpacity style = { styles.button } >
                    <Text style = { styles.buttonText } >Avançar</Text>
                </TouchableOpacity>

            </SafeAreaView>
            

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //pegar o tam inteiro da tela 
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%',
        backgroundColor: '#1d1d2e'    
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginRight: 14    
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#101026',
        borderRadius: 4,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#FFF',
        fontSize: 20
    },
    qtdContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        height: 40,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'

    }
})