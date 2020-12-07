// Teste para o Modal e Upload:

// import { View, Text, Image, StyleSheet} from 'react-native'
// import { useState } from 'react';

// import React from 'react';


// const [images, setImages] = useState<string[]>([]);

// const data = new FormData();

// images.forEach((image, index)) => {
//   data.append('images',{
//     name: `image_${index.jpg}`,
//     type: 'image/jpg'
//     uri: image,
//   } as any)
// }


// async function handleSelectImages(){
//   const { status } = await ImagePicker.requestCameraRollPermissionsAsync()

//   if( status !== 'granted'){
//     alert('Precisamos de acesso')
//     return;
//   }

//   const result = await ImagePicker.launchImageLibraryAsync({
//     allowsEditing: true,
//     quality: 1,
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//   });

//   if(result.cancelled){
//     return;
//   }

//   const { uri: image } = result;

//   setImages([...images, image]);

// }

// <View style={styles.uploadedImagesContainer}>
//   {images.map(image => {
//     return (
//       <Image
//         key={image}
//         source={{ uri: image }}
//         styles={StyleSheet.uploadedImage}
//       />
//     );
//     })}
// </View>




// const OverlayExample = () => {
// const [visible, setVisible] = useState(false);

//   const toggleOverlay = () => {
//     setVisible(!visible);
//   };

//   return (
//     <View>
//       <Button title="EDITAR" onPress={toggleOverlay} />

//       <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
//         <Text>Hello from Overlay!</Text>
//       </Overlay>
//     </View>
//   );
// };