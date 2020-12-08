import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, SafeAreaView, StatusBar, Platform} from 'react-native';
import { Search } from 'react-feather';
import { useNavigation } from '@react-navigation/native';
import BottomBar from '../components/BottomBar';

import menuIcon from '../images/menu-hamb.png';

export default function Inicio() {

    const navigationMenu = useNavigation()

    function routeToMenu(){
        navigationMenu.navigate('Menu')
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.bar}></View>

            <View style={styles.search}>
                <TextInput
                    placeholder="O que você quer ler?"
                    placeholderTextColor="#FFFFFF"
                    underlineColorAndroid="transparent"
                    style={styles.text}>
                </TextInput>

                <View style={{position: 'absolute'}}>

                    <TouchableOpacity onPress={routeToMenu}>
                        <Image
                            style={styles.menuIcon}
                            source={menuIcon}>
                        </Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.lupaIcon}>
                        <Search name="search" size={20} color="#FFFFFF" />
                    </TouchableOpacity>

                </View>
            </View>


            <View style={{ flexDirection: 'column' }}>
                <View style={{top: 83, flexDirection: 'row'}}>
                    <Text style={styles.h1}>Popular</Text>
                    <TouchableOpacity style={styles.buttonVerMais} onPress={() => { }}>
                        <Text style={styles.verMais}>VER MAIS</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* fazer a programação que pegue os links das imagens pra adicionar aqui*/}
            <View style={{ width: 357, height: 120, flexDirection: 'row', justifyContent: 'space-between', top: 95, left: 9 }}>
                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.buttonMangas}
                        source={{ uri: 'http://omegacenter.es/blog/wp-content/uploads/2017/06/jojophantomblood01definitivo-729x1024.jpg' }}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.buttonMangas}
                        source={{ uri: 'http://omegacenter.es/blog/wp-content/uploads/2017/06/jojophantomblood01definitivo-729x1024.jpg' }}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.buttonMangas}
                        source={{ uri: 'http://omegacenter.es/blog/wp-content/uploads/2017/06/jojophantomblood01definitivo-729x1024.jpg' }}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.buttonMangas}
                        source={{ uri: 'http://omegacenter.es/blog/wp-content/uploads/2017/06/jojophantomblood01definitivo-729x1024.jpg' }}>
                    </Image>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'column' }}>
                <View style={{width: 349, height: 27, top: 105, flexDirection: 'row'}}>
                    <Text style={styles.h1}>Adicionados Recentemente</Text>
                    <TouchableOpacity style={styles.buttonVerMais2} onPress={() => { }}>
                        <Text style={styles.verMais}>VER MAIS</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={{ width: 357, height: 120, flexDirection: 'row', justifyContent: 'space-between', top: 120, marginLeft: 9}}>
                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.buttonMangas}
                        source={{ uri: 'http://omegacenter.es/blog/wp-content/uploads/2017/06/jojophantomblood01definitivo-729x1024.jpg' }}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.buttonMangas}
                        source={{ uri: 'http://omegacenter.es/blog/wp-content/uploads/2017/06/jojophantomblood01definitivo-729x1024.jpg' }}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.buttonMangas}
                        source={{ uri: 'http://omegacenter.es/blog/wp-content/uploads/2017/06/jojophantomblood01definitivo-729x1024.jpg' }}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.buttonMangas}
                        source={{ uri: 'http://omegacenter.es/blog/wp-content/uploads/2017/06/jojophantomblood01definitivo-729x1024.jpg' }}>
                    </Image>
                </TouchableOpacity>
            </View>


            <View style={{ flexDirection: 'column' }}>
                <View style={{top: 135, flexDirection: 'row'}}>
                    <Text style={styles.h1}>Shoujo</Text>
                    <TouchableOpacity style={styles.buttonVerMais3} onPress={() => { }}>
                        <Text style={styles.verMais}>VER MAIS</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ width: 357, height: 120, flexDirection: 'row', justifyContent: 'space-between', top: 150, left: 9 }}>
                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.buttonMangas}
                        source={{ uri: 'http://omegacenter.es/blog/wp-content/uploads/2017/06/jojophantomblood01definitivo-729x1024.jpg' }}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.buttonMangas}
                        source={{ uri: 'http://omegacenter.es/blog/wp-content/uploads/2017/06/jojophantomblood01definitivo-729x1024.jpg' }}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.buttonMangas}
                        source={{ uri: 'http://omegacenter.es/blog/wp-content/uploads/2017/06/jojophantomblood01definitivo-729x1024.jpg' }}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <Image
                        style={styles.buttonMangas}
                        source={{ uri: 'http://omegacenter.es/blog/wp-content/uploads/2017/06/jojophantomblood01definitivo-729x1024.jpg' }}>
                    </Image>
                </TouchableOpacity>
            </View>

           
            <BottomBar page="Home" />

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

    menuIcon: {
        width: 28,
        height: 16,
        left: 15,
        marginTop: 20
    },

    lupaIcon: {
        width: 15.36,
        height: 18.17,
        left: 340,
        right: 20,
        marginTop: -19
    },

    h1: {
        fontSize: 20,
        fontWeight: '900',
        paddingLeft: 9,
        color: '#FFFFFF'
    },

    buttonVerMais: {
        backgroundColor: '#242323',
        borderRadius: 5,

        marginTop: 8,
        left: 234,
        width: 54,
        height: 13
    },

    verMais: {
        fontSize: 9,
        fontWeight: '900',
        textAlign: 'center',
        color: '#FFFFFF'
    },

    buttonVerMais2: {
        backgroundColor: '#242323',
        borderRadius: 5,

        marginTop: 8,
        left: 44,
        width: 54,
        height: 13
    },

    buttonVerMais3: {
        backgroundColor: '#242323',
        borderRadius: 5,

        marginTop: 8,
        left: 236,
        width: 54,
        height: 13
    },

    buttonMangas: {

        height: 120,
        width: 84,  

        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FFFFFF'
    },
})