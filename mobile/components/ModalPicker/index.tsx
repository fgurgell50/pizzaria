import React from "react";
import { SafeAreaView, 
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView
 } from "react-native";

 //importou do index do Order
 import { CategoryProps } from "@/pages/Order";

 // tipagem para receber no ModalPicker com os mesmos nomes 
 interface ModalPickerProps{
    options: CategoryProps[]
    handleCloseModal: () => void
    selectedItem: (item: CategoryProps) => void
 }

 const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export function ModalPicker({ options, handleCloseModal, selectedItem }: ModalPickerProps) {

    function onPressItem( item: CategoryProps ){
        //console.log(item)
        selectedItem(item)
        handleCloseModal()
    }

    const option = options.map( (item, index) => (
        // monsta a lista como um botao para ser selecionado e passa o item onPressItem
        <TouchableOpacity key={index} style = { styles.options } onPress={ () => onPressItem(item) } >
            <Text style = { styles.item } >
                {item?.name} 
            </Text>
        </TouchableOpacity>
    ) )


    return( 
        // chama o componente e todo ele é um botao q clica e seleciona e chamar o handleCloseModal
        // lista para selecionar 
        <TouchableOpacity style={ styles.container }  onPress={handleCloseModal}>
            <SafeAreaView style={ styles.content } >
                <ScrollView showsVerticalScrollIndicator={false} >
                    {option}  
                </ScrollView>
            </SafeAreaView>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#8a8a8a',
        borderRadius: 4
    },
    options: {
        alignItems: 'flex-start',
        //borderTopWidth: 0.8,
        borderBottomWidth: 0.8,
        borderTopColor: '#8a8a8a'
    },
    item: {
        margin: 18,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#101026'
    }
})