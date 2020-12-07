import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform, SafeAreaView, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Overlay } from 'react-native-elements';

import homeIcon from '../images/home-v2.svg';
import categoriesIcon from '../images/categories-v2.svg';
import libraryIcon from '../images/library-v2.svg';
import { useState } from 'react';
import { Button } from 'react-native';

export default function Menu() {

    const navigationHome = useNavigation()

    function routeToHome(){
        navigationHome.navigate('Inicio')
    }

    const navigationCategories = useNavigation()

    function routeToCategories(){
        navigationCategories.navigate('Categorias')
    }

    const navigationLibrary = useNavigation()

    function routeToLibrary(){
        navigationLibrary.navigate('Biblioteca')
    }

    return ( 
      <SafeAreaView style={styles.container}>
          <View>
            <View style={styles.background1}></View>
          </View>

          <View style={styles.profile}>
                <View>
                    {/* pegar a foto do user e colocar ai */}
                        <Image 
                        style={styles.pic}
                        source= {{uri: 'https://i.pinimg.com/originals/ce/49/97/ce4997d03391041106c5d555b306c77a.png'}}>
                        </Image>
                </View>

                {/* fazer a lógica de pegar o user e colocar ai */}
                <View style={{justifyContent:'center', alignContent:'center'}}>
                    <Text style={styles.user}>pam</Text>
                </View>

                <View>
                    <TouchableOpacity style={styles.buttonEdit} onPress={() => {}}>
                            <Text style={styles.edit}>EDITAR</Text>
                    </TouchableOpacity>
                </View>
          </View>

          <View style={{paddingLeft:20, justifyContent:'space-between', width: 200, height: 200}}>

                <View>
                    <TouchableOpacity onPress={ routeToHome }>
                        {/* <Image 
                        style={styles.homeIcon}
                        source={homeIcon}>
                        </Image> */}

                        <Text style={styles.h1Home}>ÍNICIO</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={ routeToLibrary }>
                        {/* <Image 
                        style={styles.libraryIcon}
                        source={libraryIcon}>
                        </Image> */}

                        <Text style={styles.h1Home}>BIBLIOTECA</Text>
                    </TouchableOpacity>

              </View>

                <View>
                    <TouchableOpacity onPress={ routeToCategories }>
                        {/* <Image 
                        style={styles.categoriesIcon}
                        source={categoriesIcon}>
                        </Image> */}

                        <Text style={styles.h1Home}>CATEGORIAS</Text>
                    </TouchableOpacity>
                </View>

          </View>
          

      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    background1:{
        width: 375,
        height: 306,

        backgroundColor: '#232424'
    },

    profile:{
        justifyContent:'center'
    
    },

    pic:{
        position: 'absolute',
        
        width: 125,
        height: 125,
        left: 125,
        top: 63,

        borderRadius: 500,
        borderWidth: 2,
        borderColor: '#FFFFFF'
    },

    user:{
        left: 160,
        top: -110,

        fontSize: 15,
        fontWeight: '900'
        // fontFamily: Ruda,
        
    },

    buttonEdit:{
        width: 112,
        height: 22,
        left: 120,
        top: -80,

        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        textAlign:'center'
    },

    edit:{
        left: 31,

        // fontFamily: Ruda,
        fontWeight: '900',
        fontSize: 15,

        color: '#573A80'
    },

    items:{},

    h1Home:{
        // fontFamily: Ruda,
        fontWeight: '900',
        fontSize: 20,

        color: '#573A80'
    },

    // homeIcon:{
    //     width: 102,
    //     height: 27,
    //     left: 0,
    //     top: 0,
    // },
    // libraryIcon:{
    //     width: 149,
    //     height: 27,
    //     left: 0,
    //     top: 86,
    // },
    // categoriesIcon:{
    //     width: 153,
    //     height: 27,
    //     left: 0,
    //     top: 172,
    // },

})