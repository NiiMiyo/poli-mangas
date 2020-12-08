import React from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Image, Platform, SafeAreaView, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ArrowLeftCircle } from 'react-feather';
import notFound from '../images/not-found@3x.png';

import BottomBar from '../components/BottomBar';

export default function PesquisaNotFound() {

    const navigationHome = useNavigation()

    function routeToHome(){
        navigationHome.navigate('Inicio')
    }
    
    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.bar}></View>

            <View style={styles.search}>
                <TextInput
                    placeholder='Search: ...' 
                    placeholderTextColor="#FFFFFF"
                    underlineColorAndroid="transparent"
                    style={styles.text}>
                </TextInput>

                <View style={{position: 'absolute'}}>

                    <TouchableOpacity style={styles.arrowIcon} onPress={routeToHome}>
                        <ArrowLeftCircle name="arrow" size={20} color="#FFFFFF" />
                    </TouchableOpacity>

                </View>
            </View>

                <Image 
                style={styles.notFound}
                source={notFound}>
                </Image>

            <View style={{top:180, alignItems:'baseline', paddingLeft: 50, width:220, height:216,}}>
                <Text style={styles.h1}>
                Opa, parece que não temos 
                o que você buscou. 
                Tem certeza que digitou certo?
                </Text>
            </View>

            <BottomBar page="Default" />

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

    bar: {
        position: 'absolute',
        backgroundColor: '#242323',
        width: 375,
        height: 57,
        alignItems: 'flex-start',
        elevation: 120,

        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
    },

    search: {
        height: 57,
        width: 375,

        alignItems: 'flex-start',
        position: 'absolute',
        elevation: 120,
    },

    text: {
        backgroundColor: '#573A80',
        color: '#FFFFFF',
        justifyContent: 'center',

        width: 280,
        height: 26,
        left: 38,
        marginRight: 40,
        marginLeft: 52,
        marginTop: 15,

        paddingLeft: 10,
        borderRadius: 7,
        elevation: 120,

    },

    arrowIcon: {
        width: 40,
        height: 30,
        left: 15,
        marginTop: 18
    },
    notFound:{
        height: 225,
        width: 225,
        left: 82,
        top: 152,

    },

    h1:{
        width:220,
        height:57,
        top: 209,
        
        paddingLeft:70,
        color: '#FFFFFF',
        fontFamily: 'Ruda_700Bold',
        textAlign:'center',
        fontSize: 15
    },
})