import Attendee from "./attendee.js"

export default class Room {
    constructor({ id, topic, attendeesCount, speakersCount, featuredAttendees, owner, users }) {

        this.id = id
        this.topic = topic
        this.attendeesCount = attendeesCount
        this.speakersCount = speakersCount
        this.featuredAttendees = featuredAttendees?.map(attendee => new Attendee(attendee))
        this.owner = new Attendee(owner)
        this.users = users
    }
}