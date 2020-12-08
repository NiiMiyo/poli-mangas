import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import BottomBar from '../components/BottomBar';


export default function CategoriasMenu() {

    const navigationSynopsys = useNavigation()

    function routeToSynopsys(){
        navigationSynopsys.navigate('Sinopses')
    }
    
    return (
        <SafeAreaView style={styles.container}>


            <View style={{width: 331, height: 190, marginTop: 20, marginLeft: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={routeToSynopsys}>
                    <Image
                        style={styles.button}
                        source={{ uri: 'https://mangayabu.top/capas/haikyuu-manga.jpg' }}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonAdd} onPress={() => { }}>
                    <Text style={{ color: '#242323', paddingLeft: 3, paddingBottom: 3 }}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.button}
                        source={{ uri: '' }}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonAdd} onPress={() => { }}>
                    <Text style={{ color: '#242323', paddingLeft: 3, paddingBottom: 3 }}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.button}
                        source={{ uri: '' }}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonAdd} onPress={() => { }}>
                    <Text style={{ color: '#242323', paddingLeft: 3, paddingBottom: 3 }}>+</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.text}>
                <Text style={styles.h2}>Haikyuu!!</Text>
                <Text style={styles.h2}>NOME</Text>
                <Text style={styles.h2}>NOME</Text>
            </View>

            <BottomBar page="Default" />

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

    bar: {
        width: 375,
        height: 54,

        justifyContent: 'flex-start',

        backgroundColor: '#FFFFFF'
    },

    h2: {
        left: 21,
        top: 120,

        fontWeight: '900',
        fontFamily:'Ruda_900Black',
        fontSize: 15,

        color: '#FFFFFF',
    },

    button: {
        top: 10,
        left: 27,

        height: 120,
        width: 84,

        lineHeight: 20,

        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FFFFFF'
    },

    buttonAdd: {
        width: 16,
        height: 10,
        top: -60,
        left: 5,

        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        justifyContent: 'center',
    },

    text:{
        width:280, 
        height:165, 
        
        marginLeft:40,
        marginTop:-10,
        
        flexDirection:'row', 
        justifyContent:'space-between', 
    
    }
})