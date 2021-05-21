class PeerCustomModule extends globalThis.Peer {
    constructor({ config, onCall }) {
        super(...config)

        this.onCall = onCall
    }

    call(...args) {
        const originalCallResult = super.call(...args)

        // aqui acontece a magia, interceptamos o call e adicionamos
        // o comportamento do call para todos os objetos
        this.onCall(originalCallResult)

        return originalCallResult
    }
}


export default class PeerBuilder {
    constructor({ peerConfig }) {
        this.peerConfig = peerConfig
        this.onError = () => { }
        this.onConnectionOpened = () => { }
        this.onCallError = () => { }
        this.onCallClose = () => { }
        this.onCallReceived = () => { }
        this.onStreamReceived = () => { }
    }

    setOnError(fn) {
        this.onError = fn

        return this
    }

    setOnConnectionOpened(fn) {
        this.onConnectionOpened = fn

        return this
    }

    setOnCallError(fn) {
        this.onCallError = fn

        return this
    }

    setOnCallClose(fn) {
        this.onCallClose = fn

        return this
    }

    setOnCallReceived(fn) {
        this.onCallReceived = fn

        return this
    }

    setOnStreamReceived(fn) {
        this.onStreamReceived = fn

        return this
    }
    _prepareCallEvent(call) {
        call.on('stream', (stream) => this.onStreamReceived(call, stream))
        call.on('error', (error) => this.onCallError(call, error))
        call.on('close', () => this.onCallClose(call))

        this.onCallReceived(call)
    }
    
    async build() {
        // o peer recebe uma lista de argumentos,
        // new Peer(id, config1, config2)
        // params = [], new Peer(...paramsc)

        // const peer = new globalThis.Peer(...this.peerConfig)
        const peer = new PeerCustomModule({
            config: [...this.peerConfig],
            onCall: this._prepareCallEvent.bind(this)
        })
        peer.on('error', this.onError)
        peer.on('call', this._prepareCallEvent.bind(this))

        return new Promise((resolve) => peer.on('open', () => {
            this.onConnectionOpened(peer)
            return resolve(peer)
        }))
    }

}