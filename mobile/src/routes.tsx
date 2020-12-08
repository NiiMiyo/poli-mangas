import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import cadastro from './pages/cadastro';

const { Navigator, Screen } = createStackNavigator();

export default function Rotas(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} >
                <Screen name= "cadastro" component={cadastro} />
            </Navigator>
        </NavigationContainer>
    );
}