export const constants = {
    socketUrl: 'http://localhost:3000',
    // socketUrl: 'https://ew-socket-server.herokuapp.com',
    socketNamespaces: {
        room: 'room',
        lobby: 'lobby'
    },
    peerConfig: Object.values({
        id: undefined,
        config: {
            // host: 'ew-peerjs-server.herokuapp.com',
            // secure: true,
            // path: '/'
            port: 9000,
            host: 'localhost',
            path: '/'
        }
    }),
    pages: {
        lobby: '/pages/lobby',
        login: '/pages/login',
    },
    events: {
        USER_CONNECTED: 'userConnection',
        USER_DISCONNECTED: 'userDisconnection',

        JOIN_ROOM: 'joinRoom',
        LOBBY_UPDATED: 'lobbyUpdated',
        UPGRADE_USER_PERMISSION: 'upgradeUserPermission',

        SPEAK_REQUEST: 'speakRequest',
        SPEAK_ANSWER: 'speakAnswer'
    },
    firebaseConfig : {
        apiKey: "AIzaSyCdLFMlgRxj82fC9AvBB58VcrTMeJUWkLA",
        authDomain: "semana-js-expert.firebaseapp.com",
        projectId: "semana-js-expert",
        storageBucket: "semana-js-expert.appspot.com",
        messagingSenderId: "794971418018",
        appId: "1:794971418018:web:b81e5c23e3dc8ca7d3d6fb",
        measurementId: "G-CLPKV7RXQF"
    },
    storageKey: 'jsexpert:storage:user'
}