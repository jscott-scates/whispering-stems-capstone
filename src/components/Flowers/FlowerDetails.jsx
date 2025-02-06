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

    if (!currentFlower || meanings.length < 0) { return null }
    return <>
        {/* Container for all elements related to the flower */}
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-8 py-12">

            {/* Flower Image Section */}
            <div className="flex justify-center items-center p-4 w-full">
                <img
                    alt="A straight table wreath of dogwood flowers"
                    src={currentFlower.img}
                    className="w-xl object-cover aspect-square border-4 border-amber-300 rounded-lg shadow-lg"
                />
            </div>

            {/* Information Section */}
            <div className="space-y-10 px-6 text-center md:text-left w-full">
                {/* Flower Header */}
                <div className="text-center">
                    <h2 className="text-5xl font-bold text-stone-500">{currentFlower.name}</h2>
                    <hr className="w-[150px] mx-auto mt-4 border-2 border-green-800" />
                </div>

                {/* Flower Meaning(s) and Color */}
                <div className="flex justify-between text-lg font-medium text-stone-500 pt-8 pb-8">
                    <div>
                        <span className="font-semibold text-stone-700">Meaning(s): </span>
                        {meanings.map((flowerMeaning) => flowerMeaning.meaning.meaningTag)}
                    </div>
                    <div>
                        <span className="font-semibold text-stone-700 pl-[15px]">Color: </span>
                        {currentFlower.color.name}
                    </div>
                </div>

                {/* Flower Description */}
                <div>
                    <h3 className="text-2xl font-semibold text-stone-700">Description</h3>
                    <p className="text-stone-700 leading-relaxed">{currentFlower.flowerDescription}</p>
                </div>

                {/* Floriography Section */}
                <div>
                    <h3 className="text-2xl font-semibold text-stone-700 pt-8">Floriography</h3>
                    <p className="text-stone-700 leading-relaxed">{currentFlower.overview}</p>
                </div>
            </div>
        </div>
    </>
}
