import React from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import logoIcon from '../images/icon.png';

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    return(
        <View style={styles.container}>

            <View style={styles.bar}>
                <View style={{width: 375, height: 54, top: 0}}>
                    <Text style={styles.h1}>{title}</Text>
                </View>
            </View>

            <Image 
                style={styles.logoIcon}
                source={logoIcon}>
            </Image>

            
        </View>
        
    );
}
const styles = StyleSheet.create({

    container:{ 
        flexDirection:'row', 
        alignItems:'center'
    },

    bar:{
        width: 375,
        height: 54,
        
        justifyContent:'flex-start',

        backgroundColor: '#FFFFFF'
    },

    logoIcon:{
        width: 76,
        height: 76,
        top: 5,
        marginLeft: -350
    },

    h1:{
        paddingTop: 13,
        paddingLeft:143,
        // font-family: Ruda,
        fontWeight: '900',
        fontSize: 20,
        color: '#573A80'
    },
})