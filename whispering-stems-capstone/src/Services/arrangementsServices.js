
export const getAllArrangements = () => {
    return fetch(`http://localhost:8088/arrangements`).then(res => res.json())
}

export const getMeaningByArrangementId = (arrangementId) => {
    return fetch(`http://localhost:8088/meaning_arrangements?arrangementId=${arrangementId}&_expand=meaning`).then(res => res.json())
}

export const getFlowersByArrangementId = (arrangementId) => {
    return fetch(`http://localhost:8088/arrangements_flowers?arrangementId=${arrangementId}&_expand=flower`).then(res => res.json())
}

export const getArrangementByArrangementId = (arrangementId) => {
    return fetch(`http://localhost:8088/arrangements/${arrangementId}`).then(res => res.json())
}

export const getAllArrangementsMeanings = () => {
    return fetch(`http://localhost:8088/meaning_arrangements?_expand=meaning`).then(res => res.json())
}