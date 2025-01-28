import { useState, useEffect } from "react"
import { getMeaningByFlowerId } from "../../Services/flowerServices"

export const Flower = ({flowerObj}) => { //fetchAndSetAllFlowers
    const [flowerMeanings, setFlowerMeanings] = useState()

    
    const fetchAndSetMeanings = () => {
        getMeaningByFlowerId(flowerObj.id).then((flowerMeaningsArray) => {
            setFlowerMeanings(flowerMeaningsArray)
        })
    }

    useEffect(() => {
        if(flowerObj?.id) {
            fetchAndSetMeanings()
        }
    },[flowerObj])

    console.log(flowerMeanings)

    if(!flowerMeanings || !flowerObj){return null}
    return <>
        <section className="flower">
            <div className="flower-info flower-img">
                {flowerObj.img}
            </div>
            <div className="flower-info">
                <h4>{flowerObj.name}</h4>
                <h5>Meaning(s): {flowerMeanings?.map((flowerMeaning) => flowerMeaning.meaning.meaningTag).join(" ")}</h5>
            </div>
        </section>
    </>
}