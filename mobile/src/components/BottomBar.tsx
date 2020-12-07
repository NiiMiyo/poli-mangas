import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//branco
import homeIconV1 from '../images/home.svg';
import categoriesIconV1 from '../images/categories.svg';
import libraryIconV1 from '../images/library.svg';

//roxo
import homeIconV2 from '../images/home-v2.svg';
import categoriesIconV2 from '../images/categories-v2.svg';
import libraryIconV2 from '../images/library-v2.svg';

interface BottomBarProps {
    page: "Library" | "Home" | "Categories" | "Default";
}

export default function BottomBar({ page }: BottomBarProps) {

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

    switch (page) {
        case 'Library':
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View style={styles.bottomBar}></View>

                    <View style={styles.iconsBar}>
                        <TouchableOpacity onPress={() => { }}>
                            <Image
                                style={styles.libraryIcon}
                                source={libraryIconV2}>
                            </Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={routeToHome}>
                            <Image
                                style={styles.homeIcon}
                                source={homeIconV1}>
                            </Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={routeToCategories}>
                            <Image
                                style={styles.categoriesIcon}
                                source={categoriesIconV1}>
                            </Image>
                        </TouchableOpacity>
                    </View>


                </View>
            );
        case 'Categories':
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View style={styles.bottomBar}></View>

                    <View style={styles.iconsBar}>

                        <TouchableOpacity onPress={routeToHome}>
                            <Image
                                style={styles.homeIcon}
                                source={homeIconV1}>
                            </Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={routeToLibrary}>
                            <Image
                                style={styles.libraryIcon}
                                source={libraryIconV1}>
                            </Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { }}>
                            <Image
                                style={styles.categoriesIcon}
                                source={categoriesIconV2}>
                            </Image>
                        </TouchableOpacity>

                    </View>


                </View>

            );
        case 'Home':
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <View style={styles.bottomBar}></View>

                    <View style={styles.iconsBar}>
                        <TouchableOpacity onPress={routeToLibrary}>
                            <Image
                                style={styles.libraryIcon}
                                source={libraryIconV1}>
                            </Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { }}>
                            <Image
                                style={styles.homeIcon}
                                source={homeIconV2}>
                            </Image>
                        </TouchableOpacity>)

                    <TouchableOpacity onPress={routeToCategories}>
                            <Image
                                style={styles.categoriesIcon}
                                source={categoriesIconV1}>
                            </Image>
                        </TouchableOpacity>

                    </View>




                </View>
            );

        case 'Default':
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.bottomBar}></View>

                    <View style={styles.iconsBar}>

                        <TouchableOpacity onPress={routeToLibrary}>
                            <Image
                                style={styles.libraryIcon}
                                source={libraryIconV1}>
                            </Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={routeToHome}>
                            <Image
                                style={styles.homeIcon}
                                source={homeIconV1}>
                            </Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={routeToCategories}>
                            <Image
                                style={styles.categoriesIcon}
                                source={categoriesIconV1}>
                            </Image>
                        </TouchableOpacity>

                    </View>


                </View>
            );
    }

}
const styles = StyleSheet.create({

    bottomBar: {
        position: 'absolute',
        top: 667,

        width: 375,
        height: 54,

        backgroundColor: '#242323'
    },
    iconsBar: {
        width: 256,
        height: 26,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingLeft: 100,
        paddingRight: -100,
        top: 618
    },

    libraryIcon: {
        height: 24,
        width: 22,
    },
    homeIcon: {
        height: 26,
        width: 26,
    },
    categoriesIcon: {
        height: 17,
        width: 31.17,
    },
})