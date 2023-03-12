import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, View} from 'react-native';
import {Audio} from 'expo-av';


export default function App() {

    return (<View style={styles.container}>
            <Button
                onPress={onClick}
                title="Play audio"
                color="#541584"
                accessibilityLabel="Learn more about this purple button"
            />
            <StatusBar style="auto"/>
        </View>);
}

const NOTE_RANGE = 12
// const NOTE_LIBRARY_RANGE = [21, 96]
const NOTE_LIBRARY_RANGE = [0, 75]


let soundObjectArr = []
let audioQueue = []
let MIDI_NOTE = [
    require('./assets/notes/A0.mp3'),
    require('./assets/notes/Bb0.mp3'),
    require('./assets/notes/B0.mp3'),
    require('./assets/notes/C1.mp3'),
    require('./assets/notes/Db1.mp3'),
    require('./assets/notes/D1.mp3'),
    require('./assets/notes/Eb1.mp3'),
    require('./assets/notes/E1.mp3'),
    require('./assets/notes/F1.mp3'),
    require('./assets/notes/Gb1.mp3'),
    require('./assets/notes/G1.mp3'),
    require('./assets/notes/Ab1.mp3'),
    require('./assets/notes/A1.mp3'),
    require('./assets/notes/Bb1.mp3'),
    require('./assets/notes/B1.mp3'),
    require('./assets/notes/C2.mp3'),
    require('./assets/notes/Db2.mp3'),
    require('./assets/notes/D2.mp3'),
    require('./assets/notes/Eb2.mp3'),
    require('./assets/notes/E2.mp3'),
    require('./assets/notes/F2.mp3'),
    require('./assets/notes/Gb2.mp3'),
    require('./assets/notes/G2.mp3'),
    require('./assets/notes/Ab2.mp3'),
    require('./assets/notes/A2.mp3'),
    require('./assets/notes/Bb2.mp3'),
    require('./assets/notes/B2.mp3'),
    require('./assets/notes/C3.mp3'),
    require('./assets/notes/Db3.mp3'),
    require('./assets/notes/D3.mp3'),
    require('./assets/notes/Eb3.mp3'),
    require('./assets/notes/E3.mp3'),
    require('./assets/notes/F3.mp3'),
    require('./assets/notes/Gb3.mp3'),
    require('./assets/notes/G3.mp3'),
    require('./assets/notes/Ab3.mp3'),
    require('./assets/notes/A3.mp3'),
    require('./assets/notes/Bb3.mp3'),
    require('./assets/notes/B3.mp3'),
    require('./assets/notes/C4.mp3'),
    require('./assets/notes/Db4.mp3'),
    require('./assets/notes/D4.mp3'),
    require('./assets/notes/Eb4.mp3'),
    require('./assets/notes/E4.mp3'),
    require('./assets/notes/F4.mp3'),
    require('./assets/notes/Gb4.mp3'),
    require('./assets/notes/G4.mp3'),
    require('./assets/notes/Ab4.mp3'),
    require('./assets/notes/A4.mp3'),
    require('./assets/notes/Bb4.mp3'),
    require('./assets/notes/B4.mp3'),
    require('./assets/notes/C5.mp3'),
    require('./assets/notes/Db5.mp3'),
    require('./assets/notes/D5.mp3'),
    require('./assets/notes/Eb5.mp3'),
    require('./assets/notes/E5.mp3'),
    require('./assets/notes/F5.mp3'),
    require('./assets/notes/Gb5.mp3'),
    require('./assets/notes/G5.mp3'),
    require('./assets/notes/Ab5.mp3'),
    require('./assets/notes/A5.mp3'),
    require('./assets/notes/Bb5.mp3'),
    require('./assets/notes/B5.mp3'),
    require('./assets/notes/C6.mp3'),
    require('./assets/notes/Db6.mp3'),
    require('./assets/notes/D6.mp3'),
    require('./assets/notes/Eb6.mp3'),
    require('./assets/notes/E6.mp3'),
    require('./assets/notes/F6.mp3'),
    require('./assets/notes/Gb6.mp3'),
    require('./assets/notes/G6.mp3'),
    require('./assets/notes/Ab6.mp3'),
    require('./assets/notes/A6.mp3'),
    require('./assets/notes/Bb6.mp3'),
    require('./assets/notes/B6.mp3'),
    require('./assets/notes/C7.mp3'),
]

let INTERVAL = []
let totalAudioLoops = 0

let isPaused = true

function onClick() {
    if(isPaused) {
        addNotesToQueue()
        audioStart(addNotesToQueue)
    }
    else {
        audioStop()
    }
    isPaused ^=true
}

function queueAudio(audio, delay = 0) {
    if (audio instanceof Array) {
        audio.push(delay)
        audioQueue.push(audio)
    } else {
        var array = [audio, delay]
        audioQueue.push(array)
    }
}

function addNotesToQueue() {
    var initialNote = randomInt(
        NOTE_LIBRARY_RANGE[0] + (NOTE_RANGE*2),
        NOTE_LIBRARY_RANGE[1] - (NOTE_RANGE*2)
    )
    var secondNote = initialNote + randomInt(-1 * NOTE_RANGE, NOTE_RANGE)
    queueAudio(MIDI_NOTE[initialNote])
    queueAudio(MIDI_NOTE[secondNote])
    console.log(Math.abs(secondNote - initialNote))

    // queueAudio(INTERVAL[Math.abs(secondNote - initialNote)])
}

function randomInt(min, max) { // min and max included
    min = Math.max(NOTE_LIBRARY_RANGE[0], min)
    max = Math.min(NOTE_LIBRARY_RANGE[1], max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//uses https://newt.phys.unsw.edu.au/jw/notes.html for note names
function intToNoteName(pitch) {
    pitch = pitch - 21
    const noteNames = ["a", "a-", "b", "c", "c-", "d", "d-", "e", "f", "f-", "g", "g-"]
    var note = noteNames[pitch % 12]
    var octave = Math.floor((pitch + 9) / 12)
    return note + octave.toString()
}

function audioStop() {
    soundObjectArr.forEach(element => {
        element.unloadAsync()
    })
    soundObjectArr = []
    audioQueue = []
    totalAudioLoops++
}

function audioStart(cb = null){
    totalAudioLoops++
    audioStartHelper(cb,totalAudioLoops)
}

function audioStartHelper(cb,curentLoopNumber = 0) {
    if(curentLoopNumber != totalAudioLoops) return;
    soundObjectArr.forEach(element => {
        element.unloadAsync()
    })
    soundObjectArr = []
    try {
        if ((audioQueue.length < 0)||(audioQueue[0].length < 0)) return

    } catch {
        return
    }
    for (let i = audioQueue[0].length - 2; i > 0; i--) {
        soundObjectArr[i] = new Audio.Sound()
        playAudio(soundObjectArr[i], audioQueue[0][i],curentLoopNumber)
    }
    soundObjectArr[0] = new Audio.Sound()
    playAudio(soundObjectArr[0], audioQueue[0][0],curentLoopNumber, audioQueue[0][audioQueue[0].length-1], true,cb)
    audioQueue.shift()
}

async function playAudio(audioObject, filepath, core, timeShift = 0, isFinal = false,cb) {
    try {
        let source = filepath
        await audioObject.loadAsync(source)
        await audioObject.playAsync()
            .then(async playbackStatus => {
                setTimeout(() => {
                    audioObject.unloadAsync()
                    if (isFinal) {
                        if(cb != null) cb()
                        audioStartHelper(cb,core)
                    }
                }, playbackStatus.durationMillis+(timeShift*1000))
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.log(error)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    },
});
