import { fetchParties, fetchClowns, fetchDoneParties } from "./dataAccess.js"
import { ClownShow } from "./ClownShow.js"

const mainContainer = document.querySelector("#container")

const renderHTML = () => {
    fetchParties()
        .then(() => fetchClowns())
        .then(() => fetchDoneParties())
        .then(() => {
            mainContainer.innerHTML = ClownShow()
        })
}

renderHTML()

mainContainer.addEventListener("stateChanged", customEvent => {
    renderHTML()
})