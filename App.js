// import { StatusBar } from 'expo-status-bar';
// import { Button, StyleSheet, Text, View } from 'react-native';
// import { Audio } from 'expo-av';
// import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
// // import Tts from 'react-native-tts';
// // import SoundPlayer from 'react-native-sound-player'


// export default function App() {
  
//   return (
//     <View style={styles.container}>
//       <Button
//         onPress={onClick}
//         title="Play audio"
//         color="#841584"
//         accessibilityLabel="Learn more about this purple button"
//     />
    


//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const soundObject = new Audio.Sound()


// function onClick(){
//   playAudio(require('./assets/spook3.mp3'))
// }

// async function playAudio(filepath){
//   alert(filepath)
//   try {
//     let source = filepath
//     await soundObject.loadAsync(source)
//     await soundObject
//       .playAsync()
//       .then(async playbackStatus => {
//         // alert('playback complete')
//         setTimeout(() => {
//           // soundObject.unloadAsync()
//           // soundObject.unloadAsync()
//         }, playbackStatus.playableDurationMillis)
//       })
//       .catch(error => {
//         alert(error)
//         console.log(error)
//       })
//   } catch (error) {
//     alert(error)
//     console.log(error)
//   }
// }



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

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
        color="#541584"
        accessibilityLabel="Learn more about this purple button"
    />
    <Button
        onPress={onClick2}
        title="Play audio"
        color="#121584"
        accessibilityLabel="Learn more about this purple button"
    />
    


      <StatusBar style="auto" />
    </View>
  );
}

// let soundObject = new Audio.Sound()
let soundObjectArr = [new Audio.Sound()]

// let isLooping = false
// let loopAmount = 0;
let audioQueue = [[]]

function onClick(){
  audioQueue = [
    [require('./assets/test.mp3'),require('./assets/spook3.mp3'),require('./assets/spook3.mp3')],
    [require('./assets/test.wav'),require('./assets/test.mp3')],
    [require('./assets/spook3.mp3'),require('./assets/test.mp3')]
  ]
  playAudioLoop()
}

function onClick2(){
  stopAudio()
}


function stopAudio(){
  soundObjectArr.forEach(element => {
    element.unloadAsync()
  })
}

function playAudioLoop(){
  stopAudio()
  try{
  if(audioQueue.length < 0 || audioQueue[0].length < 0) return
  }catch{
    return
  }
  for(let i = audioQueue[0].length-1; i > 0; i--){
    soundObjectArr[i] = new Audio.Sound()
    console.log(soundObjectArr[i])
    playAudio(soundObjectArr[i],audioQueue[0][i],false)
  }
  soundObjectArr[0] = new Audio.Sound()
  playAudio(soundObjectArr[0],audioQueue[0][0],true)
  audioQueue.shift()
}

async function playAudio(audioObject,filepath,isLooper){
  // if(soundObject._loaded) await soundObject.unloadAsync()
  try {
    let source = filepath
    await audioObject.loadAsync(source)
    await audioObject.playAsync()
      .then(async playbackStatus => {
        setTimeout(() => {
          audioObject.unloadAsync()
          if (isLooper) {
            console.log('looping')
            playAudioLoop()
          }
        }, playbackStatus.durationMillis)
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


function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 3000);
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
