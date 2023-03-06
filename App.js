import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
// import Tts from 'react-native-tts';
// import SoundPlayer from 'react-native-sound-player'


export default function App() {
  
  return (
    <View style={styles.container}>
      <Button
        onPress={onClick}
        title="Play audio"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
    />
    


      <StatusBar style="auto" />
    </View>
  );
}

const soundObject = new Audio.Sound()


function onClick(){
  playAudio(require('./assets/spook3.mp3'))
}

async function playAudio(filepath){
  try {
    let source = filepath
    await soundObject.loadAsync(source)
    await soundObject
      .playAsync()
      .then(async playbackStatus => {
        // alert('playback complete')
        setTimeout(() => {
          soundObject.unloadAsync()
          // soundObject.unloadAsync()
        }, playbackStatus.playableDurationMillis)
      })
      .catch(error => {
        alert(error)
        console.log(error)
      })
  } catch (error) {
    alert(error)
    console.log(error)
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
