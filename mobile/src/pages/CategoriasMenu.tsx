import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import BottomBar from '../components/BottomBar';
import Header from '../components/Header';

export default function CategoriasMenu() {

    return (
        <SafeAreaView style={styles.container}>

            <Header title="NOME DA CATEGORIA" />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 331, height: 156 }}>
                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.button}
                        source={{ uri: 'http://vignette1.wikia.nocookie.net/cowboybebop/images/2/22/MangaSS1.jpg/revision/latest?cb=20090317032643' }}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonAdd} onPress={() => { }}>
                    <Text style={{ color: '#242323', paddingLeft: 3, paddingBottom: 3 }}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.button}
                        source={{ uri: 'http://vignette1.wikia.nocookie.net/cowboybebop/images/2/22/MangaSS1.jpg/revision/latest?cb=20090317032643' }}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonAdd} onPress={() => { }}>
                    <Text style={{ color: '#242323', paddingLeft: 3, paddingBottom: 3 }}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.button}
                        source={{ uri: 'http://vignette1.wikia.nocookie.net/cowboybebop/images/2/22/MangaSS1.jpg/revision/latest?cb=20090317032643' }}>
                    </Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonAdd} onPress={() => { }}>
                    <Text style={{ color: '#242323', paddingLeft: 3, paddingBottom: 3 }}>+</Text>
                </TouchableOpacity>

            </View>

            <View style={{ width: 331, height: 156, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.h2}>NOME</Text>
                <Text style={styles.h3}>NOME</Text>
                <Text style={styles.h4}>NOME</Text>
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
        paddingLeft: 48,
        top: 150,

        fontWeight: '900',
        fontSize: 15,

        color: '#FFFFFF'
    },

    h3: {
        paddingLeft: 48,
        top: 150,

        fontWeight: '900',
        fontSize: 15,

        color: '#FFFFFF'
    },

    h4: {
        paddingLeft: 60,
        top: 150,

        fontWeight: '900',
        fontSize: 15,

        color: '#FFFFFF'
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

})