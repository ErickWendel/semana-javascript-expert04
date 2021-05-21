import { constants } from "../../_shared/constants.js"
import Attendee from "./entities/attendee.js"
import getTemplate from "./templates/attendeeTemplate.js"

const imgUser = document.getElementById('imgUser')
const roomTopic = document.getElementById('pTopic')
const gridAttendees = document.getElementById('gridAttendees')
const gridSpeakers = document.getElementById('gridSpeakers')
const btnMicrophone = document.getElementById('btnMicrophone')
const btnClipBoard = document.getElementById('btnClipBoard')
const btnClap = document.getElementById('btnClap')
const toggleImage = document.getElementById('toggleImage')
const btnLeave = document.getElementById('btnLeave')

export default class View {
    static redirectToLogin() {
        window.location = constants.pages.login
    }
    
    static updateUserImage({ img, username }) {
        imgUser.src = img
        imgUser.al = username
    }

    static updateRoomTopic({ topic }) {
        roomTopic.innerHTML = topic
    }

    static updateAttendeesOnGrid(users) {
        users.forEach(item => View.addAttendeeOnGrid(item))
    }

    static _getExistingItemOnGrid({ id, baseElement = document }) {
        const existingItem = baseElement.querySelector(`[id="${id}"]`)
        return existingItem
    }


    static removeItemFromGrid(id) {
        const existingElement = View._getExistingItemOnGrid({ id })
        existingElement?.remove()
    }

    static addAttendeeOnGrid(item, removeFirst = false) {
        const attendee = new Attendee(item)
        const id = attendee.id
        const htmlTemplate = getTemplate(attendee)
        const baseElement = attendee.isSpeaker ? gridSpeakers : gridAttendees

        if (removeFirst) {
            View.removeItemFromGrid(id)
            baseElement.innerHTML += htmlTemplate
            return;
        }

        const existingItem = View._getExistingItemOnGrid({ id, baseElement })
        if (existingItem) {
            existingItem.innerHTML = htmlTemplate;
            return;
        }

        baseElement.innerHTML += htmlTemplate

    }

    static _createAudioElement({ muted = true, srcObject }) {
        const audio = document.createElement('audio')
        audio.muted = muted
        audio.srcObject = srcObject

        audio.addEventListener('loadedmetadata', async () => {
            try {
                await audio.play()
            } catch (error) {
                console.error('erro to play', error)
            }
        })

    }



    static renderAudioElement({ callerId, stream, isCurrentId }) {
        View._createAudioElement({
            muted: isCurrentId,
            srcObject: stream
        })

    }
    static showUserFeatures(isSpeaker) {

        // attendee
        if (!isSpeaker) {
            btnClap.classList.remove('hidden')
            btnMicrophone.classList.add('hidden')
            btnClipBoard.classList.add('hidden')
            return;
        }
        // speaker
        btnClap.classList.add('hidden')
        btnMicrophone.classList.remove('hidden')
        btnClipBoard.classList.remove('hidden')
    }

    static _onClapClick(command) {
        return () => {
            command()
            const basePath = './../../assets/icons/'
            const handActive = 'hand-solid.svg'
            const handInactive = 'hand.svg'

            if (toggleImage.src.match(handInactive)) {
                toggleImage.src = `${basePath}${handActive}`
                return;
            }
            toggleImage.src = `${basePath}${handInactive}`
        }
    }
    static configureClapButton(command) {
        btnClap.addEventListener('click', View._onClapClick(command))
    }

    static _redirectToLobby() {
        window.location = constants.pages.lobby
    }

    static _toggleMicrophoneIcon() {
        const icon = btnMicrophone.firstElementChild
        const classes = [...icon.classList]

        const inactiveMicClass = 'fa-microphone-slash'
        const activeMicClass = 'fa-microphone'

        const isInactiveMic = classes.includes(inactiveMicClass)
        if(isInactiveMic) {
            icon.classList.remove(inactiveMicClass)
            icon.classList.add(activeMicClass)
            return;
        }

        icon.classList.add(inactiveMicClass)
        icon.classList.remove(activeMicClass)
        // 
        // 
    }
    static configureLeaveButton() {
        btnLeave.addEventListener('click', () => View._redirectToLobby())
    }

    static configureOnMicrophoneActivation(command) {
        btnMicrophone.addEventListener('click', () => {
            View._toggleMicrophoneIcon()
            command()
        })
    }

}