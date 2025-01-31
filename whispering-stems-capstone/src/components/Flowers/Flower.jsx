import { useState, useEffect } from "react"
import { getMeaningByFlowerId } from "../../Services/flowerServices"

export const Flower = ({flowerObj}) => { //fetchAndSetAllFlowers
    const [flowerMeanings, setFlowerMeanings] = useState()

    //fetches and sets the meanings associated with a specific flower id
    const fetchAndSetMeanings = () => {
        getMeaningByFlowerId(flowerObj.id).then((flowerMeaningsArray) => {
            setFlowerMeanings(flowerMeaningsArray)
        })
    }
    //calls fetchAndSetMeanings dependent on the flowerObj
    useEffect(() => {
        if(flowerObj?.id) {
            fetchAndSetMeanings()
        }
    },[flowerObj])

    if(!flowerMeanings || !flowerObj){return null}
    return <>
        <div className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        {/* Image */}
            <img src="/images/sample.jpg" alt="Card Image" className="w-full h-48 object-cover" />

        {/* Card Content */}
            <div className="p-4">
                <h3 className="text-xl font-semibold text-stone-800 text-center">{flowerObj.name}</h3>
                <p className="text-stone-500 mt-2">
                    Meaning(s): {flowerMeanings?.map((flowerMeaning) => flowerMeaning.meaning.meaningTag).join(" ")}
                </p>
            </div>
        </div>
    </>
}
