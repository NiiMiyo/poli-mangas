import React from 'react';
import { StyleSheet, View, SafeAreaView, Platform, StatusBar} from 'react-native';

import Header from '../components/Header';
import BottomBar from '../components/BottomBar';
import MangasResume from '../components/MangasResume';

export default function Sinopses() {

    return (

        <SafeAreaView style={styles.container}>
    
            <Header title="" />

            <View>
                <MangasResume 
                pic=""
                status=""
                year=""
                author=""
                copyright=""
                name=""
                synopsis=""/>
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
})