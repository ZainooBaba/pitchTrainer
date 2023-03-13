import {StatusBar} from 'expo-status-bar';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {queue, start, stop} from './AudioHandler.js'


export default function App() {

    return (<View style={styles.container}>
            <Pressable style={styles.playButton} onPress={onClick} onPressIn={onClick} onPressOut={onClick}>
            <Text style={styles.playButtonText}> ▶</Text>
        </Pressable>
            <StatusBar style="auto"/>
        </View>);
}

const NOTE_LIBRARY_RANGE = [0, 75]
const NOTE_RANGE = 12
const WAIT_TIMES = [-1.5,-1,0.5]

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
let INTERVAL = [
    require('./assets/Intervals/Interval_1.mp3'),
    require('./assets/Intervals/Interval_2.mp3'),
    require('./assets/Intervals/Interval_3.mp3'),
    require('./assets/Intervals/Interval_4.mp3'),
    require('./assets/Intervals/Interval_5.mp3'),
    require('./assets/Intervals/Interval_6.mp3'),
    require('./assets/Intervals/Interval_7.mp3'),
    require('./assets/Intervals/Interval_8.mp3'),
    require('./assets/Intervals/Interval_9.mp3'),
    require('./assets/Intervals/Interval_10.mp3'),
    require('./assets/Intervals/Interval_11.mp3'),
    require('./assets/Intervals/Interval_12.mp3'),
    require('./assets/Intervals/Interval_13.mp3'),
    require('./assets/Intervals/Interval_15.mp3'),
]

let isPaused = true

function onClick() {
    if(isPaused) {
        addNotesToQueue()
        start(addNotesToQueue)
    }
    else {
        stop()
    }
    isPaused ^=true
}

function addNotesToQueue() {
    let initialNote = randomInt(
        NOTE_LIBRARY_RANGE[0] + (NOTE_RANGE*2),
        NOTE_LIBRARY_RANGE[1] - (NOTE_RANGE*2)
    )
    let secondNote = initialNote + randomInt(-1 * NOTE_RANGE, NOTE_RANGE)
    queue(MIDI_NOTE[initialNote],WAIT_TIMES[0])
    queue(MIDI_NOTE[secondNote],WAIT_TIMES[1])
    queue(INTERVAL[Math.abs(secondNote - initialNote)],WAIT_TIMES[2])
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

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center',
    },
    playButton: {
        backgroundColor: 'red',
        height: 270,
        width: 270,
        borderRadius: 125,
        borderColor:'white',
        borderWidth: 10,
        textAlign: 'center',
        textAlignVertical:'lower',
    },
    playButtonText:{
        textAlign:'center',
        textAlignVertical:'lower',
        fontSize:200,
        color: 'white'
    }
});
