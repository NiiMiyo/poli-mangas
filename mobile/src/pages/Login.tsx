import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Ruda_400Regular, Ruda_600SemiBold, Ruda_700Bold, Ruda_900Black } from '@expo-google-fonts/ruda'

import emailIcon from '../images/icon-email.png';
import lockIcon from '../images/lock.png';

import { useNavigation } from '@react-navigation/native';

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigationHome = useNavigation()

  function routeToHome() {
    navigationHome.navigate('Inicio')
  }

  const navigationSignUp = useNavigation()

  function routeToSignUp() {
    navigationSignUp.navigate('Cadastro')
  }

    const emailAttribute = email;
    const passwordAttribute = password;

    function validationField() {
      if(emailAttribute == '' || passwordAttribute == '') {
        return alert("Preencha os campos!!")
      }
      else{
        return routeToHome();
      }
    }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bar}></View>

      <Text style={styles.title}>Bem-Vindo</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

      <View style={styles.icons}>
        <Image
          style={styles.email}
          source={emailIcon}>
        </Image>

        <Image
          style={styles.lock}
          source={lockIcon}>
        </Image>
      </View>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#A697BB"
        underlineColorAndroid="transparent"
        value={email}
        onChangeText={(email) => setEmail(email)}
        style={styles.user}>
      </TextInput>

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#A697BB"
        underlineColorAndroid="transparent"
        secureTextEntry={true}
        value={password}
        onChangeText={(password) => setPassword(password)}
        style={styles.password}>
      </TextInput>

      <TouchableOpacity style={styles.button} onPress={validationField}>
        <Text style={styles.login}>LOGIN</Text>
      </TouchableOpacity>

      <View style={{alignItems:'center'}}>
        <Text style={styles.textSignUp}>Ainda não tem uma conta?</Text>
      </View>

      <TouchableOpacity style={styles.button2} onPress={routeToSignUp}>
        <Text style={styles.signUp}>CADASTRE-SE</Text>
      </TouchableOpacity>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#744DA9',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  bar: {
    position: 'absolute',
    backgroundColor: '#242323',
    width: 375,
    height: 57,
    alignItems: 'flex-start',
  },

  title: {
    fontSize: 50,
    marginTop: 61,
    justifyContent: 'space-between',
    color: '#ffffff',
    marginLeft: 20,
    fontFamily: 'Ruda_900Black'
  },

  subtitle: {
    fontSize: 15,
    marginLeft: 20,
    color: '#ffffff',
    fontFamily: 'Ruda_400Regular'
  },
  icons: {},

  email: {
    width: 27,
    height: 21,
    left: 45,
    top: 113,

    borderRadius: 2

  },

  lock: {
    width: 17,
    height: 23,
    left: 50,
    top: 155,
  },

  user: {
    backgroundColor: '#573A80',
    color: '#FFFFFF',

    width: 277,
    height: 38,
    marginTop: 60,
    marginLeft: 40,
    paddingLeft: 40,
    borderRadius: 2,

    justifyContent: 'center'
  },

  password: {
    backgroundColor: '#573A80',
    color: '#FFFFFF',

    width: 277,
    height: 38,
    marginTop: 28,
    marginLeft: 40,
    paddingLeft: 40,
    borderRadius: 2,

    justifyContent: 'center'
  },

  button: {
    marginLeft: 60,
    width: 237,
    height: 44,
    backgroundColor: '#242323',
    marginTop: 30,
    borderRadius: 5,
    elevation: 3,

    alignItems: 'center',
    justifyContent: 'center'
  },

  login: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Ruda_900Black'
  },

  textSignUp: {
    marginTop: 126,
    color: '#ffffff',
    fontSize: 20,
    justifyContent: 'center',
    fontFamily: 'Ruda_900Black'
  },

  button2: {
    marginLeft: 69,
    width: 237,
    height: 44,
    backgroundColor: '#242323',
    marginTop: 30,
    borderRadius: 5,
    elevation: 3,

    alignItems: 'center',
    justifyContent: 'center'
  },

  signUp: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    fontWeigh: '900',
    fontFamily: 'Ruda_900Black'
  },
});