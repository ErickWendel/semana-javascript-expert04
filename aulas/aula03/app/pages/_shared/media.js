export default class Media {
    static async getUserAudio(audio = true) {
        return navigator.mediaDevices.getUserMedia({
            audio
        })
    }

    static createMediaStreamFake() {
        return new MediaStream([
            Media._createEmptyAudioTrack()
        ])
    }

    static _createEmptyAudioTrack() {
        const audioContext = new AudioContext()
        const oscillator = audioContext.createOscillator()
        const destination = oscillator.connect(audioContext.createMediaStreamDestination())
        oscillator.start()
        const [track] = destination.stream.getAudioTracks()

        return Object.assign(track, { enabled: false })
    }
}