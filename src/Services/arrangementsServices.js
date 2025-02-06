import { getAllColors } from "./flowerServices"

export const getAllArrangements = () => {
    return fetch(`http://localhost:8088/arrangements`).then(res => res.json())
}

export const getMeaningByArrangementId = (arrangementId) => {
    return fetch(`http://localhost:8088/meaning_arrangements?arrangementId=${arrangementId}&_expand=meaning`).then(res => res.json())
}

export const getFlowersByArrangementId = async (arrangementId) => {
    //Fetch flowers within the arrangement
    const response = await fetch(`http://localhost:8088/arrangements_flowers?arrangementId=${arrangementId}&_expand=flower`)
    const flowersData = await response.json()

    //Fetch the colors array
    const colorsResponse = await fetch(`http://localhost:8088/colors`)
    const colorsData = await colorsResponse.json()

    //Attach colors to the flowers based on colorId
    const flowerWithColor = flowersData.map(arrangementFlower => ({
        ...arrangementFlower,
        flower: {
            ...arrangementFlower.flower,
            color: colorsData.find(color => color.id === arrangementFlower.flower.colorId)
        }
    }))

    //Returns the flower with an embedded colors table to access flower color. 
    return flowerWithColor
}

export const getArrangementByArrangementId = (arrangementId) => {
    return fetch(`http://localhost:8088/arrangements/${arrangementId}`).then(res => res.json())
}

export const getAllArrangementsMeanings = () => {
    return fetch(`http://localhost:8088/meaning_arrangements?_expand=meaning`).then(res => res.json())
}

export const postNewArrangement = async (arrangementObject) => {
    const postOptions = await fetch(`http://localhost:8088/arrangements`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(arrangementObject)
    })
    const data = await postOptions.json()
    return data
}

export const createArrangementFlowerEntry = async (arrangementFlowersArray) => {
    for (const flower of arrangementFlowersArray) {
        const newArrangementFlowerEntry = {
            arrangementId: flower.arrangementId,
            flowerId: flower.flowerId
        }
        await fetch(`http://localhost:8088/arrangements_flowers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newArrangementFlowerEntry)
        })
    }
}

export const createArrangementMeaningEntry = async (arrangementMeaningObj) => {
    const postOptions = await fetch(`http://localhost:8088/meaning_arrangements`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(arrangementMeaningObj)
    })
    const data = await postOptions.json()
    return data
}

export const updateArrangement = async (arrangementEntry) => {
    return fetch(`http://localhost:8088/arrangements/${arrangementEntry.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(arrangementEntry)
    })
}

export const deleteAllFlowersByArrangementId = async (arrangement) => {
    const response = await fetch(`http://localhost:8088/arrangements_flowers?arrangementId=${arrangement.id}`)
    const flowers = await response.json()

    for (const flower of flowers) {
        await fetch(`http://localhost:8088/arrangements_flowers/${flower.id}`, {
            method: "DELETE"
        })
    }
}

export const updateArrangementMeaning = async (arrangementMeaningObj) => {
    const postOptions = await fetch(`http://localhost:8088/meaning_arrangements/${arrangementMeaningObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(arrangementMeaningObj)
    })
    const data = await postOptions.json()
    return data
}

export const deleteArrangement = (arrangementId) => {
    return fetch(`http://localhost:8088/arrangements/${arrangementId}`, {
        method: "DELETE"
    }).then((res) => res.json())
}

export const deleteArrangementMeaning = async (arrangementId) => {
    return fetch(`http://localhost:8088/meaning_arrangements/arrangementId=${arrangementId}`, {
        method: "DELETE"
    }).then((res) => res.json())
}