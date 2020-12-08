import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

interface MangasProps {
    pic: string;
    status: string;
    year: string;
    author: string;
    copyright: string;
    name: string;
    synopsis: string;

}

export default function MangasResume({ pic, status, year, author, copyright, name, synopsis }: MangasProps) {
    return (
        <View style={styles.container}>

            <Image
                style={styles.picIcon}
                source={{ uri: pic }}>
            </Image>

            <View style={styles.infos}>
                <Text style={styles.status}>STATUS: {status}</Text>
                <Text style={styles.year}>ANO: {year}</Text>
                <Text style={styles.author}>AUTOR: {author}</Text>
                <Text style={styles.copyright}>COPYRIGHT: {copyright}</Text>

            </View>

                <TouchableOpacity style={styles.buttonAdd} onPress={() => { }}>
                    <Text style={styles.add}>ADICIONAR</Text>
                </TouchableOpacity>
            
            <View style={styles.synopsisDiv}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.synopsis}>{synopsis}</Text>
            </View>
            

        </View>

    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1
    },

    picIcon: {
        position: 'absolute',

        height: 214,
        width: 137,
        left: 8,
        top: 40,

        borderWidth: 2,
        borderColor: '#FFFFFF'
    },

    infos: {
        width: 154,
        height: 151,
        marginLeft: 153,
        top: 40,

        justifyContent: 'space-between'
    },

    status: {
        fontSize: 12,
        fontFamily: 'Ruda_600SemiBold',
        textAlign: 'justify',
        color: '#FFFFFF'
    },

    year: {
        fontSize: 12,
        fontFamily: 'Ruda_600SemiBold',
        textAlign: 'justify',
        color: '#FFFFFF'
    },

    author: {
        fontSize: 12,
        fontFamily: 'Ruda_600SemiBold',
        textAlign: 'justify',
        color: '#FFFFFF'
    },

    copyright: {
        fontSize: 12,
        fontFamily: 'Ruda_600SemiBold',
        textAlign: 'justify',
        color: '#FFFFFF'

    },

    name: {
        fontSize: 25,
        fontFamily: 'Ruda_900Black',
        textAlign: 'justify',
        color: '#FFFFFF'
    },

    synopsis: {
        fontSize: 10,
        fontFamily: 'Ruda_400Regular',
        textAlign: 'justify',
        color: '#FFFFFF'
    },

    buttonAdd: {
        height: 18,
        width: 95,
        marginLeft: 250,
        top: 125,

        borderRadius: 4,
        backgroundColor: '#242323',

        alignItems: 'center'
    },

    add: {
        fontSize: 15,
        fontFamily: 'Ruda_900Black',
        color: '#FFFFFF'
    },

    synopsisDiv:{
        width: 255,
        height: 195,
        marginLeft: 8,
        top: 100
    }
})