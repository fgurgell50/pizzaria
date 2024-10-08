import React, { useContext, useState, useEffect} from 'react';
import { 
    Text, 
    SafeAreaView, 
    TouchableOpacity, 
    TextInput, 
    StyleSheet,
    Modal,
    FlatList
} from 'react-native';
import { AuthContext } from '@/contexts/AuthContext';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { api } from '@/services/api';
import { ModalPicker } from '@/components/ModalPicker';
import { ListItem } from '@/components/listItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '@/routes/app.routes';

type RouteDetailParams = {
    Order: {
        number: number | string
        order_id: string
    }
}

export type CategoryProps = {
    id: string
    name: string
}

export type ProductProps = {
    id: string
    name: string
}

export type ItemProps = {
    id: string
    product_id: string
    name: string
    amount: string | number
}

type OrderRouteProp = RouteProp<RouteDetailParams,'Order'>

export default function Order(){
    const route = useRoute<OrderRouteProp>() // para receber os parametros "tipados"
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const [ category, setCategory ] = useState<CategoryProps[] | []>([]) 
    // uma lista de categorias por isso um array vazio
    const [ categotySelected, setCategorySelected ] = useState<CategoryProps | undefined>()
    //seleciona a que foi escolhida
    const [ amount, setAmount ] = useState('1')
    const [ modalCategoryVisible, setModalCategoryVisible ] = useState(false)

    const [ products, setProducts ] = useState<ProductProps[] | []>([])
    const [ productSelected, setProductSelected ] = useState<ProductProps | undefined>()
    const [ modalProductVisible, setModalProductVisible ] = useState(false) 

    const [ items, setItems ] = useState<ItemProps[]>([])

    useEffect(() => {
        async function loadInfo() {
            const response = await api.get('/category')
            //console.log(response.data)
            setCategory(response.data)
            setCategorySelected(response.data[0])
        }

        loadInfo()

    }, [])

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/category/product', {
                params: {
                    category_id: categotySelected?.id
                }
            })
            //console.log('===============================================')
            //console.log(response.data)
            setProducts(response.data)
            setProductSelected(response.data[0])
        }

        loadProducts()

    }, [categotySelected])



    //const { signOut } = useContext(AuthContext)

    const [ number, setNumber ] = useState('')

    async function openOrder(){
       if(number === ''){
        return
       }
       //requisicao e abrir a mesa e navegar para próxima tela
    }

    async function handleCloseOrder() {
        try {
           await api.delete('/order',{
                params: {
                    order_id: route.params?.order_id
                }
            })
            navigation.goBack()

        } catch (error) {
            console.log(error)
        }
    }

    function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item)
    }

    function handleChangeProduct(item:ProductProps){
        setProductSelected(item)
    }

    async function handleAdd(){
        //console.log('Clicou')
        const response = await api.post('/order/add', {
            order_id: route.params.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        })
        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount 
        }

        setItems(oldArray => [...oldArray, data])
        //ega o Array da Lista e adicioa mais o ultimo item

    }

    async function handleDeleteItem(item_id: string){
        const response = await api.delete('/order/remove', {
            params:{
                item_id: item_id
            }
        })
        //após remover da API removemos da Lista os itens
        let removeItem = items.filter( item => {
            return(item.id !== item_id)
        } )

        setItems(removeItem)
    }

    function handleFinishOrder(){
        navigation.navigate("FinishOrder")
    }

    return(
        <SafeAreaView style = { styles.container }>
            <SafeAreaView style = { styles.header } >
                <Text style = { styles.title } >Mesa {route.params.number}</Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name="trash-2" size={28} color='#FF3F4b'/>
                    </TouchableOpacity>
                )}
            </SafeAreaView>

            {category.length !== 0 && (
            <TouchableOpacity 
                style = { styles.input }  
                //primeira etapa qdo clica para habilitar e abrir o Modal abaixo
                 //esse item é alterado pela handleChangeCategory
                onPress={ () => setModalCategoryVisible(true) } >
                    <Text style = { { color: '#FFF' }} >
                        {categotySelected?.name}
                    </Text>
            </TouchableOpacity>
            )}

            {products.length !== 0 && (
            <TouchableOpacity 
                style = { styles.input }  
                onPress={ () => setModalProductVisible(true) } >
                    <Text style = { { color: '#FFF' }} >
                        {productSelected?.name}
                    </Text>
            </TouchableOpacity>
            )}

            <SafeAreaView style = { styles.qtdContainer } >
                <Text style = { styles.qtdText } >Quantidade</Text>
                <TextInput 
                    style = {[ styles.input, { width: '60%', textAlign:'center' } ]}
                    placeholderTextColor = '#F0F0F0'
                    keyboardType = 'numeric'
                    value={amount}
                    onChangeText={setAmount}
                />
            </SafeAreaView>

            <SafeAreaView style = { styles.actions } >
                <TouchableOpacity style = { styles.buttonAdd } onPress={handleAdd} >
                    <Text style = { styles.buttonText } >+</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style = { [styles.button, {opacity: items.length === 0 ? 0.3 : 1 }] }
                    disabled = {items.length === 0}
                    onPress={ handleFinishOrder }
                >
                    <Text style = { styles.buttonText } >Avançar</Text>
                </TouchableOpacity>
            </SafeAreaView>

            <FlatList 
                showsVerticalScrollIndicator = {false}
                style = { {  flex: 1, marginTop: 24 } }
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={ ({item}) => <ListItem data={item} deleteItem= {handleDeleteItem}/> }
            />
            
            <Modal //qdo está true abre o Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType='fade'
            >
                <ModalPicker 
                //chama o componente ModalPicker que precisa receber
                //as 3 propriedades abaixo: 
                    handleCloseModal={ () => setModalCategoryVisible(false) }
                    options ={category} //pega as Categorias no Backend
                    selectedItem = {handleChangeCategory} // seleciona a Categoria q foi clicada
                />
            </Modal>

            <Modal //Products //qdo está true abre o Modal
                transparent={true}
                visible={modalProductVisible}
                animationType='fade'
            >
                <ModalPicker 
                //chama o componente ModalPicker que precisa receber
                //as 3 propriedades abaixo: 
                    handleCloseModal={ () => setModalProductVisible(false) }
                    options ={products} //pega os Products no Backend
                    selectedItem = {handleChangeProduct} // seleciona o Product q foi clicado
                />
            </Modal>

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