import React from 'react';
import { StyleSheet, View, SafeAreaView, Platform, StatusBar} from 'react-native';

import BottomBar from '../components/BottomBar';
import MangasResume from '../components/MangasResume';

export default function Sinopses() {

    return (

        <SafeAreaView style={styles.container}>

            <View>
                <MangasResume 
                pic="https://mangayabu.top/capas/haikyuu-manga.jpg"
                status="Completo"
                year="-"
                author="-"
                copyright="https://mangayabu.top/manga/haikyuu/"
                name="Haikyuu!!"
                synopsis="O estudante do ensino médio Shōyō Hinata se apega 
                ao voleibol depois de ver um jogo do campeonato 
                nacional na televisão. Embora não seja muito alto, 
                ele se determina a seguir os passos do ídolo do 
                campeonato, apelidado de Pequeno Gigante, depois 
                de ver seus jogos. Ele cria um clube de voleibol e 
                começa a praticar sozinho."/>
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