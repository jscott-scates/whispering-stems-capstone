
export const getAllFlowers = () => {
    return fetch(`http://localhost:8088/flowers?_expand=color&_embed=flowers_meanings`).then(res => res.json())
}

export const getAllMeanings = () => {
    return fetch(`http://localhost:8088/meanings`).then(res => res.json())
}

export const getMeaningByFlowerId = (flowerId) => {
    return fetch(`http://localhost:8088/flowers_meanings?flowerId=${flowerId}&_expand=meaning`).then(res => res.json())
}