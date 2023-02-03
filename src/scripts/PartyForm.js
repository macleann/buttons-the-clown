import { sendParty } from "./dataAccess.js"

export const PartyForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="parentName">Parent's Name</label>
            <input type="text" name="parentName" class="input">
        </div>
        <div class="field">
            <label class="label" for="childName">Child's Name</label>
            <input type="text" name="childName" class="input">
        </div>
        <div class="field">
            <label class="label" for="amount">Amount of partygoers</label>
            <input type="number" name="amount" class="input">
        </div>
        <div class="field">
            <label class="label" for="address">Address</label>
            <input type="text" name="address" class="input">
        </div>
        <div class="field">
            <label class="label" for="resDate">Reservation Date</label>
            <input type="date" name="resDate" class="input">
        </div>
        <div class="field">
            <label class="label" for="duration">Party Duration (in hours)</label>
            <input type="number" name="duration" class="input">
        </div>

        <button class="button" id="bookClown">Book a Clown!</button>
    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "bookClown") {
        const userParentName = document.querySelector("input[name='parentName']").value
        const userChildName = document.querySelector("input[name='childName']").value
        const userAmount = document.querySelector("input[name='amount']").value
        const userAddress = document.querySelector("input[name='address']").value
        const userResDate = document.querySelector("input[name='resDate']").value
        const userDuration = document.querySelector("input[name='duration']").value

        const dataToSendToAPI = {
            parentName: userParentName,
            childName: userChildName,
            amount: userAmount,
            address: userAddress,
            resDate: userResDate,
            duration: userDuration
        }

        sendParty(dataToSendToAPI)
    }
})