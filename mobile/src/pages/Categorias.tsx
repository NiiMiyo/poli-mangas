import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';


import BottomBar from '../components/BottomBar';

export default function Categorias() {

    const navigationShoujo = useNavigation()

    function routeToShoujo(){
        navigationShoujo.navigate('CategoriasMenu')
    }
    
    return (
        <SafeAreaView style={styles.container}>

            <View style={{ width: 333, height: 365, alignItems:'center'}}>

                <View style={{ width: 340, height: 45, flexDirection: 'row', justifyContent: 'space-between', marginTop: -50}}>
                    <TouchableOpacity style={styles.buttonCategories} onPress={routeToShoujo}>
                        <Text style={styles.h6}>ESPORTE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonCategories} onPress={() => { }}>
                        <Text style={styles.h6}>YAOI</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonCategories} onPress={() => { }}>
                        <Text style={styles.h6}>ECHI</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: 340, height: 45, flexDirection: 'row', justifyContent: 'space-between', marginTop: 29 }}>
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

                <View style={{ width: 340, height: 45, flexDirection: 'row', justifyContent: 'space-between', marginTop: 29 }}>
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

            </View>

            <BottomBar page="Categories" />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#744DA9',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    h6: {
        fontFamily: 'Ruda_600SemiBold', 
        fontSize: 20,

        color: '#573A80'
    },

    buttonCategories: {
        width: 102,
        height: 45,
        left: 22,
        top: 103,

        backgroundColor: '#FFFFFF',

        borderRadius: 5,

        justifyContent:'center',
        textAlign: 'center'
    },
})