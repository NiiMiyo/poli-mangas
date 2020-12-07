import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar} from 'react-native';

import BottomBar from '../components/BottomBar';

export default function Biblioteca() {

    return (

        <SafeAreaView style={styles.container}>

            <View style={{ flexDirection:'row', alignItems:'center' }}>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Image 
                    style={styles.iconMangas}
                    source= {{uri: 'https://th.bing.com/th/id/OIP.dcNN03Gcybh1GSg5E3QJQgHaLh?pid=Api&rs=1'}}>
                    </Image>
                </TouchableOpacity>

                <Text style={styles.h2}>NOME</Text>

            </View>

            <BottomBar page="Library" />


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#744DA9',
        flexDirection:'column',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    h2:{
        height: 20,
        width: 43,
        left: 21,
        top: 120,

        fontWeight: '900',
        fontSize: 15,

        color: '#FFFFFF'
    },

    button:{
        top: 119,
        left: 9,

        height: 120,
        width: 84,

        lineHeight: 20,

        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FFFFFF'
    },
    iconMangas:{},
})