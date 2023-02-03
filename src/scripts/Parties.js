import { getParties, getClowns, getDoneParties, saveDoneParty, deleteParty } from "./dataAccess.js"

export const Parties = () => {
    const parties = getParties()
    const clowns = getClowns()
    const doneParties = getDoneParties()

    return `
        <table>
            <tr>
                <th>Party</th>
                <th>Clown</th>
                <th></th>
            </tr>
    ${parties
    .sort((firstDate, nextDate) => {
        return new Date(nextDate.resDate) - new Date(firstDate.resDate)
    })    
    .sort((aParty, bParty) => {
        const DoneParties = doneParties.find(doneParty => parseInt(doneParty.partyId) === aParty.id)
        const notDoneParties = doneParties.find(doneParty => parseInt(doneParty.partyId) !== bParty.id)
        if (DoneParties && !notDoneParties) {
            return 1
        } else if (notDoneParties && !DoneParties) {
            return -1
        }
    })
    .map(party => {
        return `
            <tr>
                <td>${party.childName}'s Party</td>
                
        ${doneParties
        .find(doneParty => parseInt(doneParty.partyId) === party.id)
        ?
            (function() {
                const foundDoneParty = doneParties.find(doneParty => parseInt(doneParty.partyId) === party.id)
                const foundClown = clowns.find(clown => parseInt(foundDoneParty.clownId) === clown.id)
                return `
                <td class="doneParty">${foundClown.name}</td>`
            }) ()
        :
                `<td class="upcomingParty">
                    <select id="clowns">
                        <option value="">Choose</option>
                        ${clowns.map(clown => {
                            return `<option value="${party.id}--${clown.id}">${clown.name}</option>`
                        })}
                    </select>
                </td>`
        }
                <td>
                    <button class="party__delete" id="party--${party.id}">Delete</button>
                </td>
            </tr>`
    })
    .join("")}
        </table>`
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("party--")) {
        const [,partyId] = clickEvent.target.id.split("--")
        deleteParty(parseInt(partyId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [partyId, clownId] = event.target.value.split("--")
            const doneParty = {
                partyId: partyId,
                clownId: clownId,
                date_created: new Date()
            }

            saveDoneParty(doneParty)
        }
    }
)