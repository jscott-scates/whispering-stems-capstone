import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getFlowerByFlowerId, getMeaningByFlowerId } from "../../Services/flowerServices"

export const FlowerDetails = () => {
    const [currentFlower, setCurrentFlower] = useState()
    const [meanings, setMeanings] = useState([])
    const { flowerId } = useParams()

    //fetches and sets the currentFlower and flower meanings based on the flowerId
    const fetchAndSetFlowerAndMeanings = () => {
        getFlowerByFlowerId(Number(flowerId)).then((flowerData) => {
            setCurrentFlower(flowerData)
        })
        getMeaningByFlowerId(Number(flowerId)).then((meaningData) => {
            setMeanings(meaningData)
        })
    }

    //calls fetchAndSetFlowerAndMeanings dependent on the flowerId
    useEffect(() => {
        if (flowerId) {
            fetchAndSetFlowerAndMeanings()
        }
    }, [flowerId])

    if (!currentFlower || meanings.length < 0) {return null}
        return <>
            {/*This is a container that contains all elements related to  the flower */}
            <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start px-8 py-12">
                {/* Flower Image */}
                <div className="flex justify-center p-4">
                    <img
                        alt="A straight table wreath of dog wood flowers"
                        src="image.placeholder.png"
                        className="w-[90%] max-w-lg h-[500px] object-cover border-4 border-amber-300 rounded-lg shadow-lg"
                    />
                    {/*information section details */}
                    <div className="space-y-10 px-6">
                        <div>
                            {/* arrangement header */}
                            <div className="text-center">
                                <h2 className="text-5xl font-bold text-center text-stone-500">{currentFlower.name}</h2>
                                <hr className="w-60 mx-auto mt-4 border-2 border-green-800" />
                            </div>
                            {/*Arrangement Meaning(s) and Date Created */}
                            <div className="flex justify-between text-lg font-medium text-stone-500 pt-8 pb-8">
                                {/* Meanings Displayed Here inline with meanings */}
                                <div>
                                    <span className="font-semibold text-stone-700">
                                        Meaning(s): </span> {meanings.map((flowerMeaning) => flowerMeaning.meaning.meaningTag)}
                                </div>
                                {/* Flower Color Displayed inline with meanings */}
                                <div>
                                    <span className="font-semibold text-stone-700 pl-15px">
                                        Color: </span>{currentFlower.color.name}
                                </div>
                            </div>
                            <div>
                                {/* Description of the Flower's Appearance */}
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-semibold text-stone-700">Description</h3>
                                    <p className="text-stone-700 leading-relaxed">{currentFlower.flowerDescription}</p>
                                </div>

                                {/*Floriography Overview */}
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-semibold text-stone-700 pt-8">Floriography</h3>
                                    <p className="text-stone-700 leading-relaxed">{currentFlower.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
}
