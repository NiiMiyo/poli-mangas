import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import homeIcon from '../images/home-v3.png';
import categoriesIcon from '../images/categories.png';
import libraryIcon from '../images/library.png';
import { useState } from 'react';

export default function Menu() {

    const navigationHome = useNavigation()

    function routeToHome() {
        navigationHome.navigate('Inicio')
    }

    const navigationCategories = useNavigation()

    function routeToCategories() {
        navigationCategories.navigate('Categorias')
    }

    const navigationLibrary = useNavigation()

    function routeToLibrary() {
        navigationLibrary.navigate('Biblioteca')
    }

    const [images, setImages] = useState<string[]>([]);

    async function handleSelectImages() {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

        if (status !== 'granted') {
            alert('Precisamos de acesso')
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (result.cancelled) {
            return;
        }

        const { uri: image } = result;

        setImages([...images, image]);

    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.background1}>
                <Text style={styles.user}>Anne</Text>
            </View>

            <View style={styles.profile}>
                <Image
                    style={styles.pic}
                    source={{ uri: 'https://i.pinimg.com/originals/ce/49/97/ce4997d03391041106c5d555b306c77a.png' }}>
                </Image>

                <TouchableOpacity style={styles.buttonEdit} onPress={handleSelectImages}>
                    <Text style={styles.edit}>EDITAR</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.uploadedImagesContainer}>
                {images.map(image => {
                    return (
                        <Image
                            key={image}
                            source={{ uri: image }}
                            style={styles.uploadedImage}
                        />
                    );
                })}
            </View>


            <View style={{ paddingLeft: 20, justifyContent: 'space-between', width: 200, height: 200, top: -250 }}>

                <TouchableOpacity style={{ width: 102, height: 27, flexDirection: 'row', justifyContent: 'space-between' }} onPress={routeToHome}>
                    <Image
                        style={styles.homeIcon}
                        source={homeIcon}>
                    </Image>

                    <Text style={styles.h1Home}>ÍNICIO</Text>
                </TouchableOpacity>



                <TouchableOpacity style={{width: 156, height: 27, flexDirection:'row', justifyContent:'space-between'}} onPress={routeToLibrary}>
                    <Image
                        style={styles.libraryIcon}
                        source={libraryIcon}>
                    </Image>

                    <Text style={styles.h1Home}>BIBLIOTECA</Text>
                </TouchableOpacity>




                <TouchableOpacity style={{width: 165, height: 40, flexDirection:'row', justifyContent:'space-between'}} onPress={routeToCategories}>
                    <Image
                        style={styles.categoriesIcon}
                        source={categoriesIcon}>
                    </Image>

                    <Text style={styles.h1Home}>CATEGORIAS</Text>
                </TouchableOpacity>

            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    background1:{
        width: 375,
        height: 306,

        alignItems:'center',
        backgroundColor: '#232424'
    },

    profile:{
        width: 375,
        height: 306,
        top: 0,

        alignItems:'center',

        justifyContent:'center',
    },

    pic:{
        position: 'absolute',
        
        width: 125,
        height: 125,
        top: -230,

        borderRadius: 500,
        borderWidth: 2,
        borderColor: '#FFFFFF'
    },

    user:{
        marginTop: 212,

        fontSize: 15,
        fontWeight: '900',
        // fontFamily: Ruda,
        color:'#FFFFFF'
        
    },

    buttonEdit:{
        width: 112,
        height: 22,
        top: -200,

        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        textAlign:'center'
    },

    edit:{
        left: 31,

        fontWeight: '900',
        fontSize: 15,

        color: '#573A80'
    },

    h1Home:{
        fontWeight: '900',
        fontSize: 20,

        color: '#573A80'
    },

    homeIcon:{
        width: 26,
        height: 26,
        left: 0,
        top: 0,
    },
    libraryIcon:{
        width: 22,
        height: 24,
        top: 2
    },
    categoriesIcon:{
        width: 22,
        height: 12,
        top: 10
    },

    uploadedImagesContainer:{
        flexDirection: 'row'
    },
    uploadedImage:{
        position:'absolute',
        width: 125,
        height: 125,
    
        top: -537,

        marginLeft: 125,

        borderRadius: 500,
        borderWidth: 2,
        borderColor: '#FFFFFF'
    }
})