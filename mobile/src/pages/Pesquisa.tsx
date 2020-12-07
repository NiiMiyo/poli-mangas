import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform, SafeAreaView, StatusBar} from 'react-native';

export default function Pesquisa() {
    return()
}

const styles = StyleSheet.create({
    container:{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
})
    