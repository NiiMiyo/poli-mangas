import React, {useState} from 'react';
import { AppLoading } from 'expo'
import {StyleSheet, Text, View, Image, SafeAreaView, Platform, StatusBar, Dimensions, Button, TextInput} from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks'
import {useFonts,
    Ruda_900Black,
    Ruda_700Bold,
    Ruda_400Regular,
  } from '@expo-google-fonts/ruda'
  
  function cadastro(props) {
    console.log(Dimensions.get('screen'));
    console.log (useDimensions());

    const [name, setName] = useState <string>('Peridot_23');
    const [email, setEmail] = useState <string>('UmcarneirinhoMortoPeloLobo@gmail.com');
    const [password, setPassword] = useState <string>('choro24On')

    const iconUser = require('../icons/iconUser.svg');
    const iconEmail = require('../icons/iconEmail.svg');
    const iconPass = require ('../icons/cadeado.svg');

    let [fontsLoaded] = useFonts({
        Ruda_900Black,
        Ruda_700Bold,
        Ruda_400Regular
      });
    if (!fontsLoaded) { 
    return <AppLoading /> 
    }
    return (
        <SafeAreaView style={[styles.container, containerStyles]}>
      <View style ={{
        height: 57,
        backgroundColor:'#242323',
      }}>
      </View>

      <Text style= {[styles.caracTextBlack, styles.separator]}>Cadastre-se</Text>
    <View style={styles.container2}>
      <View>
        <Image source={iconUser} style={styles.iconUser}/>
        <Image source ={iconEmail} style = {styles.iconEmail}/>
        <Image source ={iconPass} style = {styles.iconPass}/>  
      </View>
      
      

        <TextInput style = {[styles.input, styles.separator]}
        inlineImageLeft='iconUser'
        placeholder = 'Username' 
        onChangeText= {(val) => setName(val)}/>

        <TextInput style = {[styles.input, styles.separator]}
        placeholder ='Email'
        onChangeText = {(val) => setEmail(val)}/>

        <TextInput style = {[styles.input, styles.separator]}
        placeholder = 'Password'
        secureTextEntry = {true}
        onChangeText = {(val) => setPassword(val)} />
      </View>

        <View style = {styles.RegisterButton} >
          <Button
          color = "#242323"
          title = "Cadastrar"
          onPress = {()=>console.log("Button Tapped")}
          >
          </Button>
        </View>
        <Text style= {[styles.caracTextBold, styles.separator]}>Já tem uma conta?</Text>
        <View style={styles.LoginButton} >
          <Button
          color = "#242323"
          title = "Login"
          onPress = {()=>console.log("Button Tapped")}
          >
          </Button>
        </View>
    </SafeAreaView>

      );
  }

  const containerStyles = {backgroundColor: '#744DA9'};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#744DA9',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container2:{
    marginTop:-60
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#744DA9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  caracTextBlack:{
    fontSize: 30,
    color: 'white',
    fontFamily: 'Ruda_900Black',
    justifyContent: 'flex-start',
    marginHorizontal: 16,

  },
  caracTextBold:{
    fontSize: 20,
    color: 'white',
    fontFamily: 'Ruda_700Bold',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal:90,
    marginTop:10,
    marginBottom: -160
  },
  LoginButton:{
    flex:1,
    alignContent: 'center',
    justifyContent: 'center',
    fontFamily: 'Ruda_900Black',
    color: '#69D2E7',
    fontSize: 20,
    width: 95,
    height:30,
    marginTop: 100,
    marginLeft:130,  
  },
  RegisterButton:{
    flex: 1, 
    width: 237,
    height: 44,
    marginTop: -70,
    marginLeft:60,
    elevation:10,
    alignItems: 'stretch',
    justifyContent: 'center', 
    background: '#ff9000',
    transition: '0.5s',
    fontFamily: 'Ruda_900Black',
    fontSize: 40,
    borderBottomColor: '#744DA9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input:{
    borderColor: '#573A80',
    width: 318,
    height: 38,
    marginTop:10,
    marginLeft:30,
    paddingLeft:40,
    borderRadius:2,
    justifyContent: 'center',
    backgroundColor:'#573A80',
  },
  iconUser:{
    width:26,
    height:26,
    left:36,
    top:88,
  },
  iconEmail:{
    width:27,
    height:21,
    left:36,
    top:120
  },
  iconPass:{
    width:18,
    height:26,
    left:38,
    top:154
  },
});
  
  export default cadastro;
