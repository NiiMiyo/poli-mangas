import React, { useState } from "react";
import { View, StyleSheet, ScrollView} from "react-native";


interface ChaptersCounterProps {
    list: [];
}

export default function ChaptersCounter({ list }: ChaptersCounterProps) {
    return(
        <ScrollView style={{width:104, height:17}}>
                <select style={styles.options}>
                    <option style={styles.caps}>CAPÍTULOS</option>
                    <option style={styles.caps} value="link">CAPÍTULO 01</option>
                    <option style={styles.caps} value="link">CAPÍTULO 02</option>
                </select>
        </ScrollView>
        
    );
}
const styles = StyleSheet.create({

    container:{ 
        flexDirection:'row', 
        alignItems:'center'
    },
    options:{
        width: 104,
        height: 17,
        left: 7,
        top: 432,
        //fontFamily:'Ruda_400Regular',

    },
    caps:{
        fontSize:10
        //fontFamily:'Ruda_400Regular',
    }
})