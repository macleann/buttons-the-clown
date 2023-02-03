const applicationState = {}
const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")

export const fetchParties = () => {
    return fetch (`${API}/parties`)
        .then (response => response.json())
        .then (data => {
            applicationState.parties = data
        })
}

export const fetchClowns = () => {
    return fetch (`${API}/clowns`)
        .then (response => response.json())
        .then (data => {
            applicationState.clowns = data
        })
}

export const fetchDoneParties = () => {
    return fetch (`${API}/doneParties`)
        .then (response => response.json())
        .then (data => {
            applicationState.doneParties = data
        })
}

export const getParties = () => applicationState.parties.map(party => ({...party}))
export const getClowns = () => applicationState.clowns.map(clown => ({...clown}))
export const getDoneParties = () => applicationState.doneParties.map(doneParty => ({...doneParty}))

export const sendParty = (request) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }

    return fetch(`${API}/parties`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteParty = (id) => {
    return fetch(`${API}/parties/${id}`, {method: "DELETE"})
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const saveDoneParty = (doneParty) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(doneParty)
    }

    return fetch(`${API}/doneParties`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}