import { PartyForm } from "./PartyForm.js"
import { Parties } from "./Parties.js"

export const ClownShow = () => {
    return `
        <h1>Hire Buttons and Lollipop the Clowns</h1>
        <section class="formSection">
            ${PartyForm()}
        </section>
        <section class="bookedParties">
            <h2>Parties</h2>
            ${Parties()}
        </section>`
}