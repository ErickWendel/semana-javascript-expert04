import Room from "../entities/room.js";

function createFeaturedSpeakersTemplate(featuredAttendees) {
    if(!featuredAttendees.length) return '';

    const attendees = featuredAttendees.map((attende) => {
        return `
               <li>${attende.username} <span role="img" class="emoji">💬</span></li>
            `
    })

    return attendees.join('')
}


export default function getTemplate(room = new Room()) {
    const { owner } = room

    return `
    <a id="${room.id}" href="${room.roomLink || "#"}">
    <div class="cards__card">
    <span class="cards__card__topicRoom">
        ${room.subTopic}
        <i class="fa fa-home"></i>
    </span>
    <p class="cards__card__title">
    <p class="cards__card__title">
        ${room.topic}
    </p>
    <div class="cards__card__info">
        <div class="avatar">
        <img src="${owner.img}" alt="${owner.username}">
        </div>
        <div class="cards__card__info__speakers">
        <ul>
            ${createFeaturedSpeakersTemplate(room.featuredAttendees)}
            <span class="cards__card__info__speakers__listeners">
            ${room.attendeesCount} <i class="fa fa-user"></i> / ${room.speakersCount}
            <i class="fa fa-comment"></i>
            </span>
        </ul>
        </div>
    </div>
    </div>
    </a>
`
}
