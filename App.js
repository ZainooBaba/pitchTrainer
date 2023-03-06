import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
// import Tts from 'react-native-tts';
// import SoundPlayer from 'react-native-sound-player'


export default function App() {

  const playSound = React.useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(notificationSrc);
    setSound(sound);
    await sound.playAsync();
  }, []);



  // let audio = new Audio("/assets/test.mp3")

  // const start = () => {
  //   // audio.play()
  // }
  return (
    <View style={styles.container}>
      <Text>Hello word</Text>
      <Button
        onPress={onClick}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
    />
    


      <StatusBar style="auto" />
    </View>
  );
}

function onClick(){
  alert("yo")
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
