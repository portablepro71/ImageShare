import { StatusBar } from 'expo-status-bar';
import { Image ,StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker'

//HTML kullanımı gibi farkı yok etiketler ve style'lar aşşağıdan alınarak yapılır
export default function App() {
  
  //Galeri erişim izni alma ve galeriden fotoğraf seçme bloğu
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  }



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

});
