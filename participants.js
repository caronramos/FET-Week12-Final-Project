const participants = [
    {
        id: 3,
        name: "Jane Doe",
        level: "Beginner",
        fee: 25
    }
];

$(() => {
    renderParticipants();
})

function renderParticipants() {
    $("#participants-container").empty().append(
        participants.map(p => renderParticipant(p))
    );
}

function renderParticipant(participant) {
    return (
        `<tr>
            <td>${participant.name}</td>
            <td>${participant.level}</td>
            <td>$${participant.fee}</td>
            <td class="text-end">
                <button class="btn btn-primary btn-sm" onclick="openEditParticipantModal(${participant.id})">Update</button>
                <button class="btn btn-danger btn-sm" onclick="deleteParticipant(${participant.id})">Delete</button>
            </td>
        </tr>`
    )
}

const editParticipantModal = new bootstrap.Modal(document.getElementById('edit-participant-modal'))
let currentEditParticipantId = -1;
let nextParticipantId = 0;

function openEditParticipantModal(id) {
    let participant = participants.find(p => p.id === id);

    if(!participant) {
        participant = {
            id: nextParticipantId,
            name: [],
            level: [],
            fee: []
        }
        nextParticipantId++;
    }

    currentEditParticipantId = participant.id;

    $("#edit-participant-modal-title").text(`Edit ${participant.name}`)
    $("#participant-name-input").val(participant.name);
    $("#participant-level-input").val(participant.level);
    $("#participant-fee-input").val(participant.fee);

    editParticipantModal.show();
}

function saveEditParticipantModal() {
    let participant = participants.find(p => p.id === currentEditParticipantId);

    if(!participant) {
        participant = { id: currentEditParticipantId };
        participants.push(participant);
    }

    participant.name = $("#participant-name-input").val();
    participant.level = $("#participant-level-input").val();
    participant.fee = $("#participant-fee-input").val();

    editParticipantModal.hide();

    renderParticipants();
}

function deleteParticipant(id) {
    const participantIndex = participants.findIndex(p => p.id === id);
    participants.splice(participantIndex, 1);
    renderParticipants();
}
