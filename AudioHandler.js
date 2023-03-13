import {Audio, InterruptionModeAndroid, InterruptionModeIOS} from "expo-av";

let soundObjectArr = []
let audioQueue = []
let totalAudioLoops = 0

export function queue(audio, delay = 0) {
    if (audio instanceof Array) {
        audio.push(delay)
        audioQueue.push(audio)
    } else {
        var array = [audio, delay]
        audioQueue.push(array)
    }
}

export function stop() {
    soundObjectArr.forEach(element => {
        element.unloadAsync()
    })
    soundObjectArr = []
    audioQueue = []
    totalAudioLoops++
}

export function start(cb = null){
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
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: InterruptionModeIOS.DuckOthers,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
            playThroughEarpieceAndroid: false
        });
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
