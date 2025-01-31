import { getAllFlowers, getAllFlowersMeanings } from "../../Services/flowerServices"
import { useState, useEffect } from "react"
import { Flower } from "./Flower"
import { Link } from "react-router-dom"
import { FilterBar } from "./FlowersFilterBar"
import unsplashFloretLibraryCover from "../../images/floretLibrary/unsplashFloretLibraryCover.jpg"


export const FloretLibrary = () => {
    const [allFlowers, setAllFlowers] = useState([])
    const [colorSelection, setColorSelection] = useState()
    const [meaningSelection, setMeaningSelection] = useState()
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredFlowers, setFilteredFlowers] = useState([])
    const [allFlowerMeanings, setAllFlowerMeanings] = useState([])
    
    //fetchAndSetAllFlowers function when called, calls getAllFlowers then waits for a response to return an array of flowers to set allFlowers and filteredFlowers.
    const fetchAndSetAllFlowers = () => {
        getAllFlowers().then((flowersArray) => {
            setAllFlowers(flowersArray)
            setFilteredFlowers(flowersArray)
        })
        getAllFlowersMeanings().then((flowerMeaningsArray) => {
            setAllFlowerMeanings(flowerMeaningsArray)
        })
    }

    //Runs after the initial render and executes the fetchAndSetAllFlowers function
    useEffect(() => {
        fetchAndSetAllFlowers()
    },[])

    //Runs anytime the searchTerm changes to setFilteredFlowers to flowers that contain searchTerm in the name
    useEffect(() => {
        const foundFlowers = allFlowers.filter(flower => flower.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredFlowers(foundFlowers)
    }, [searchTerm,allFlowers])

    //Runs anytime the meaningSelection changes to setFilteredFlowers to flowers that contain the meaningSelection in the meaningTag
    useEffect(() => {
        if (!meaningSelection){
            setFilteredFlowers(allFlowers)
            return
        }
        const foundFlowers = allFlowerMeanings.filter(flowerMeaning => flowerMeaning.meaning.meaningTag === meaningSelection)
        const foundFlowerIds = foundFlowers.map(flower => flower.flowerId)
        const matchedMeaningsFlowers = allFlowers.filter(flower => foundFlowerIds.includes(flower.id))
            setFilteredFlowers(matchedMeaningsFlowers)
        },[meaningSelection,allFlowerMeanings])

    //Runs anytime the colorSelection changes to setFilteredFlowers to flowers that contain the colorSelection in the meaningTag
    useEffect(() => {
        if (!colorSelection){
            setFilteredFlowers(allFlowers)
            return
        }
        const foundFlowers = allFlowers.filter(flower => flower.color.name === colorSelection)
            setFilteredFlowers(foundFlowers)
    },[colorSelection,allFlowers])

    if(!filteredFlowers){return null}
    return <>
    {/* Floret Library Cover Image */}
        <div className="pt-8">
            <img 
                alt="A straight table wreath of dog wood flowers"
                src={unsplashFloretLibraryCover}
                className="w-3/4 mx-auto  h-100 object-cover md:object-cover border-4 border-amber-300"
            />
        </div>
    {/* floret library content */}
        <div className="container mx-auto mt-8 p6 pt-8">
            <h2 className="text-5xl font-bold text-center text-stone-500">Floret Library</h2>
            <hr className="w-200 mx-auto mt-4 border-2 border-green-800"/>
        </div>
    {/* container that holds the flower cards and filter bar */}
    <div className="grid grid-cols-[1fr_350px] gap-6 px-10 pt-8">
        {/* container that holds all the flower cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* container for individual cards */}
            {
                filteredFlowers.map(flowerObj => {
                    return (
                        <Link to={`/floret-library/${flowerObj.id}`} key={flowerObj.id}>
                            <Flower flowerObj={flowerObj} />
                        </Link>
                    )                
                })
            }
        </div>
         {/* container for the flowers filter ba*/}
         <div className="sticky top-8 h-ful bg-white p-4 shadow-md rounded-md">
            <FilterBar setColorSelection={setColorSelection} colorSelection={colorSelection} setMeaningSelection={setMeaningSelection} meaningSelection={meaningSelection} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
        </div>
    </div>
    </>
}