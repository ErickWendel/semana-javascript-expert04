import Attendee from "../entities/attendee.js"
const speakericon = '<img src="./../../assets/icons/asterisk.svg" alt="File icon" class="icon" />'

export default function getTemplate(attendee = new Attendee()) {
    const speakerTemplate = attendee.isSpeaker ? speakericon : ""

    return `
    <div id="${attendee.id}" class="room-card__user">
        <div class="room-card__user__img">
        <img src="${attendee.img}" alt="${attendee.username}">
        </div>
        <p class="room-card__user__name">
        ${speakerTemplate}
        ${attendee.firstName}
        </p>
    </div>
    `;
}

