import { getAllFlowers } from "../../Services/flowerServices"
import { useState, useEffect } from "react"
import { Flower } from "./Flower"


export const FloretLibrary = () => {
    const [allFlowers, setAllFlowers] = useState([])
    const [colorSelection, setColorSelection] = useState()
    const [meaningSelection, setMeaningSelection] = useState()
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredFlowers, setFilteredFlowers] = useState([])
    
    //fetchAndSetAllFlowers function when called, calls getAllFlowers then waits for a response to return an array of flowers to set allFlowers and filteredFlowers.
    const fetchAndSetAllFlowers = () => {
        getAllFlowers().then((flowersArray) => {
            setAllFlowers(flowersArray)
            setFilteredFlowers(flowersArray)
        })
    }

    //Runs after the initial render and executes the fetchAndSetAllFlowers function
    useEffect(() => {
        fetchAndSetAllFlowers()
    },[])

    if(!filteredFlowers){return null}
    return <>
        <div className="flowers-container">
            <h2>Floret Library</h2>
            <article className="flowers">
                {
                    filteredFlowers.map(flowerObj => {
                        return (
                            <Flower flowerObj={flowerObj} key={flowerObj.id}  fetchAndSetAllFlowers={() => fetchAndSetAllFlowers()}/>
                        )
                    })
                }
            </article>
        </div>
    </>
}