import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import logoIcon from '../images/icon.svg';
import homeIcon from '../images/home.svg';
import categoriesIcon from '../images/categories.svg';
import libraryIcon from '../images/library.svg';
import BottomBar from '../components/BottomBar';
import Header from '../components/Header';

export default function Categorias() {

    const navigationHome = useNavigation()

    function routeToHome(){
        navigationHome.navigate('Inicio')
    }

    const navigationLibrary = useNavigation()

    function routeToLibrary(){
        navigationLibrary.navigate('Biblioteca')
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header title="CATEGORIAS" />

            <View style={{width: 340, height:45, flexDirection:'row',paddingLeft: 9, justifyContent:'space-between', marginTop: -80}}>
                <TouchableOpacity style={styles.buttonCategories} onPress={() => { }}>
                    <Text style={styles.h6}>SHOUJO</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCategories} onPress={() => { }}>
                    <Text style={styles.h6}>YAOI</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCategories} onPress={() => { }}>
                    <Text style={styles.h6}>ECHI</Text>
                </TouchableOpacity>
            </View>

            <View style={{width: 340, height:45, flexDirection:'row',paddingLeft: 9, justifyContent:'space-between', marginTop: 20}}>
                <TouchableOpacity style={styles.buttonCategories} onPress={() => { }}>
                    <Text style={styles.h6}>MÁGIA</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCategories} onPress={() => { }}>
                    <Text style={styles.h6}>COMÉDIA</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCategories} onPress={() => { }}>
                    <Text style={styles.h6}>SEINEN</Text>
                </TouchableOpacity>
            </View>

            <View style={{width: 340, height:45, flexDirection:'row',paddingLeft: 9, justifyContent:'space-between', marginTop: 20}}>
                <TouchableOpacity style={styles.buttonCategories} onPress={() => { }}>
                    <Text style={styles.h6}>SHOUNEN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCategories} onPress={() => { }}>
                    <Text style={styles.h6}>YURI</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCategories} onPress={() => { }}>
                    <Text style={styles.h6}>SCI-FI</Text>
                </TouchableOpacity>
            </View>  

            <BottomBar page="Categories" />
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#744DA9',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    h6:{
        width: 75,
        height: 27,

        // fontFamily: Ruda,
        fontWeight: '700',
        fontSize: 20,
        
        color: '#573A80'
    },

    buttonCategories:{
        width: 102,
        height: 45,
        left: 22,
        top: 103,

        backgroundColor: '#FFFFFF',
        
        borderRadius: 5,

        alignItems:'center'
    },
})