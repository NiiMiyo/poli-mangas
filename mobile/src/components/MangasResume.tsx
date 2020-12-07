import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView} from 'react-native';

interface MangasProps {
    pic: string;
    status: string;
    year: string;
    author: string;
    copyright: string;
    name: string;
    synopsis: string;

}

export default function MangasResume({ pic, status, year, author, copyright, name, synopsis}: MangasProps) {
    return(
        <View style={styles.container}>

            <Image
            style={styles.picIcon}
            source={{uri:pic}}>
            </Image>

            <View style={styles.infos}>

            </View>
            <Text style={styles.status}>STATUS: {status}</Text>
            <Text style={styles.year}>ANO: {year}</Text>
            <Text style={styles.author}>AUTOR: {author}</Text>
            <Text style={styles.copyright}>COPYRIGHT: {copyright}</Text>

            <Text style={styles.name}>{name}</Text>
            <Text style={styles.synopsis}>{synopsis}</Text>

            <View>
                <TouchableOpacity style={styles.buttonAdd} onPress={() => {}}>
                    <Text style={styles.add}>ADICIONAR</Text>
                </TouchableOpacity>
            </View>
            
            
        </View>
        
    );
}
const styles = StyleSheet.create({

    container:{
        flex: 1
    },

    picIcon:{
        position: 'absolute',

        height: 214,
        width: 137,
        left: 8,
        top: 66,

        borderWidth: 2,
        borderColor: '#FFFFFF'
    },

    infos:{
        width: 154,
        height: 151,
        left: 153,
        top: 82,

        justifyContent:'space-between'
    },

    status:{
        fontSize: 12,
        //fontFamily:'Ruda_600SemiBold',
        textAlign: 'justify',
    },

    year:{
        fontSize: 12,
        //fontFamily:'Ruda_600SemiBold',
        textAlign: 'justify',
    },

    author:{
        fontSize: 12,
        //fontFamily:'Ruda_600SemiBold',
        textAlign: 'justify',
    },

    copyright:{
        fontSize: 12,
        //fontFamily:'Ruda_600SemiBold',
        textAlign: 'justify',
    },

    name:{
        fontSize: 25,
        //fontFamily:'Ruda_900Black',
        textAlign: 'justify',
    },

    synopsis:{
        fontSize: 10,
        //fontFamily:'Ruda_400Regular',
        textAlign: 'justify',
    },

    buttonAdd:{
        height: 18,
        width: 95,
        left: 0,
        top: 2,

        borderRadius: 4,
        backgroundColor:'242323',

        alignItems:'center'
    },

    add:{
        fontSize: 15,
        //fontFamily:'Ruda_900Black',
        color:'FFFFFF'
    },
})