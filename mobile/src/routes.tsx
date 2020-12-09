import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack' 

const { Navigator, Screen } = createStackNavigator();

import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Menu from './pages/Menu';
import Categorias from './pages/Categorias';
import CategoriasMenu from './pages/CategoriasMenu';
import Biblioteca from './pages/Biblioteca';
import Cadastro from './pages/Cadastro';

import Header from './components/Header';

export default function Rotas(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} >
                <Screen name= "Login" component={Login} />

                <Screen name= "Inicio" component={Inicio} />

                <Screen name= "Menu" component={Menu} />

                <Screen name= "Cadastro" component={Cadastro} />

                <Screen 
                name= "Categorias" 
                component={Categorias} 
                options={{
                    headerShown:true,
                    header: () => <Header title="CATEGORIAS" />
                }}
                />

                <Screen name= "CategoriasMenu" component={CategoriasMenu} />

                <Screen 
                name= "Biblioteca" 
                component={Biblioteca} 
                options={{
                    headerShown:true,
                    header: () => <Header title="BIBLIOTECA" />
                }}
                />
                
            </Navigator>
        </NavigationContainer>
    );
}