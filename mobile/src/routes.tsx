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
import Sinopses from './pages/Sinopses';
import PesquisaNotFound from './pages/PesquisaNotFound'

import Header from './components/Header';

import cadastro from './pages/cadastro';


export default function Rotas(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} >
                <Screen name= "Login" component={Login} />

                <Screen name= "Inicio" component={Inicio} />

                <Screen name= "Menu" component={Menu} />

                <Screen name= "PesquisaNotFound" component={PesquisaNotFound} />

                <Screen 
                name= "Categorias" 
                component={Categorias} 
                options={{
                    headerShown:true,
                    header: () => <Header title="CATEGORIAS" />
                }}
                />

                <Screen 
                name= "CategoriasMenu" 
                component={CategoriasMenu}
                options={{
                    headerShown:true,
                    header: () => <Header title="ESPORTES" />
                }} />

                <Screen 
                name= "Biblioteca" 
                component={Biblioteca} 
                options={{
                    headerShown:true,
                    header: () => <Header title="BIBLIOTECA" />
                }}
                />

                <Screen 
                name= "Sinopses" 
                component={Sinopses} 
                options={{
                    headerShown:true,
                    header: () => <Header title="HAIKYUU" />
                }}
                />




                
                <Screen name= "cadastro" component={cadastro} />
            </Navigator>
        </NavigationContainer>
    );
}