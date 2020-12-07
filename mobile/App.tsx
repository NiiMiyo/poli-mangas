import React from 'react';
import Rotas from './src/routes';
import { useFonts } from 'expo-font';
import { Ruda_400Regular, Ruda_600SemiBold, Ruda_700Bold, Ruda_900Black} from '@expo-google-fonts/ruda'

export default function App() {

  const [fontsLoaded] = useFonts({
    Ruda_400Regular, 
    Ruda_600SemiBold, 
    Ruda_700Bold, 
    Ruda_900Black
  })

  if(!fontsLoaded){
    return null;
  }
  
  return ( 
    <Rotas />
  );
}