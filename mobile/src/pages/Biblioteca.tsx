import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from 'react-native';

import BottomBar from '../components/BottomBar';

export default function Biblioteca() {

    return (

        <SafeAreaView style={styles.container}>

            <View style={{ width: 320, height: 430, alignItems:'center', marginTop: -60, marginLeft: 20 }}>
                <View style={{ width: 320, height: 140, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.button} onPress={() => { }}>
                        <Image
                            style={styles.iconMangas}
                            source={{ uri: '' }}>
                        </Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => { }}>
                        <Image
                            style={styles.iconMangas}
                            source={{ uri: '' }}>
                        </Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => { }}>
                        <Image
                            style={styles.iconMangas}
                            source={{ uri: '' }}>
                        </Image>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{width:280, height:165, marginLeft:48, flexDirection:'row', justifyContent:'space-between', marginTop:-170}}>
                <Text style={styles.h2}>NOME</Text>
                <Text style={styles.h2}>NOME</Text>
                <Text style={styles.h2}>NOME</Text>
            </View>

            <BottomBar page="Library" />


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#744DA9',
        flexDirection: 'column',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    h2: {
        left: 21,
        top: 120,

        fontFamily:'Ruda_900Black',
        fontSize: 15,

        color: '#FFFFFF'
    },

    button: {
        top: 119,
        left: 9,

        height: 120,
        width: 84,

        lineHeight: 20,

        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FFFFFF'
    },
    iconMangas: {},
})