export default class Attendee {
    constructor({ id, username, img, isSpeaker, roomId, peerId }) {
        this.id = id
        this.img = img || ""
        this.isSpeaker = isSpeaker
        this.roomId = roomId
        this.peerId = peerId

        const name = username || "Usuário Anônimo"
        this.username = name

        const [firstName, lastName] = name.split(/\s/)
        this.firstName = firstName
        this.lastName = lastName
    }
}