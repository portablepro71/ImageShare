import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing'
import logo from './assets/logo.png';
import { StatusBar } from 'expo-status-bar';
import uploadToAnonymousFilesAsync from 'anonymous-files';



//HTML kullanımı gibi farkı yok etiketler ve style'lar aşşağıdan alınarak yapılır
export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null);

  //Galeri erişim izni alma ve galeriden fotoğraf seçme bloğu
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    if (Platform.OS === 'web') {
        let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
        setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
        setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    }

    setSelectedImage({ localUri: pickerResult.uri});
  };
  
  let openShareDialogAsync = async () => {
      if (!(await Sharing.isAvailableAsync())) {
        alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
        return;
    }

      await Sharing.shareAsync(selectedImage.remoteUri || selectedImage.localUri);
  };

  //Seçilen fotoğraf için açılan yeni page
  //Görseli tekrardan değiştirmek için aynı butonu burayada koydum
  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />        
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.buttonStyle}>
          <Text style = {styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );

  }

  //Genel uygulama tasarım bölgesi
  return (
    <View style={styles.container}>
      
      <Image source = {logo} style = {styles.logo}/>
      
      <Text style = {styles.instructions}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.buttonStyle}>
          <Text style = {styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}


//CSS STYLE buradan tanımlanıp yukarıda kullanılır
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom:50,
  },
  instructions:{
    color:'#888',
    fontSize: 18,
    marginHorizontal: 50,
  },
  buttonStyle: {
    backgroundColor: 'gray',
    fontSize: 20,
    margin: 10,
    borderRadius: 10,
    padding: 5,
  },
  buttonText:{
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
