import { useState, useEffect } from "react"
import { getAllArrangements, getAllArrangementsMeanings } from "../../Services/arrangementsServices"
import { Link } from "react-router-dom"
import { Arrangement } from "./Arrangement"
import { ArrangementFilterBar } from "./ArrangementsFilterBar"
import unsplashArrangementLibrary from "../../images/arrangementLibrary/unsplashArrangementLibrary.jpg"
import { getUserByUserId } from "../../Services/userServices"

export const ArrangementsList = ({ currentUser }) => {
    const [allArrangements, setAllArrangements] = useState()
    const [filteredArrangements, setFilteredArrangements] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [meaningSelection, setMeaningSelection] = useState()
    const [allArrangementMeanings, setArrangementMeanings] = useState()
    const [user, setUser] = useState()


    //fetches and sets allArrangements and arrangementMeanings
    const fetchAndSetAllArrangements = () => {
        getAllArrangements().then((arrangementsArray) => {
            setAllArrangements(arrangementsArray)
            setFilteredArrangements(arrangementsArray)
        })
        getAllArrangementsMeanings().then((arrangementMeaningsArray) => {
            setArrangementMeanings(arrangementMeaningsArray)
        })
        getUserByUserId(currentUser.id).then((userObj) => {
            setUser(userObj)
        })
    }

    //Runs after the initial render and executes the fetchAndSetAllArrangements function
    useEffect(() => {
        if (currentUser) {
            fetchAndSetAllArrangements()
        }
    }, [currentUser])

    //Runs anytime the searchTerm changes to setFilteredArrangements to arrangements that contain searchTerm in the name
    useEffect(() => {
        if (allArrangements) {
            const foundArrangements = allArrangements.filter(arrangement => arrangement.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredArrangements(foundArrangements)
        }
    }, [searchTerm, allArrangements])

    //Runs anytime the meaningSelection changes to setFilteredFlowers to flowers that contain the meaningSelection in the meaningTag
    useEffect(() => {
        if (!meaningSelection) {
            setFilteredArrangements(allArrangements)
            return
        }
        const foundArrangements = allArrangementMeanings.filter(arrangementMeaning => arrangementMeaning.meaning.meaningTag === meaningSelection)
        const foundArrangementIds = foundArrangements.map(arrangement => arrangement.arrangementId)
        const matchedMeaningsArrangements = allArrangements.filter(arrangement => foundArrangementIds.includes(arrangement.id))
        setFilteredArrangements(matchedMeaningsArrangements)
    }, [meaningSelection, allArrangementMeanings])

    if (!filteredArrangements || !currentUser) { return null }
    return <>
        {/* Arrangements Cover Image */}
        <div className="pt-8">
            <img
                alt="A straight table wreath of dog wood flowers"
                src={unsplashArrangementLibrary}
                className="w-3/4 mx-auto  h-100 object-cover md:object-cover border-4 border-amber-300"
            />
        </div>
        {/* arrangements content */}
        <div className="container mx-auto mt-8 p6 pt-8">
            <h2 className="text-5xl font-bold text-center text-stone-500">Community Arrangements</h2>
            <hr className="w-200 mx-auto mt-4 border-2 border-green-800" />
        </div>
        {/* container that holds the arrangement cards and filter bar */}
        <div className="grid grid-cols-[1fr_350px] gap-6 px-10 pt-8">
            {/* container that holds all the arrangement cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* container for individual cards */}
                {
                    filteredArrangements.map(arrangementObj => {
                        return (
                            <Link to={`/arrangements/${arrangementObj.id}`} key={arrangementObj.id}>
                                <Arrangement arrangementObj={arrangementObj} user={user} fetchAndSetAllArrangements={() => fetchAndSetAllArrangements()} />
                            </Link>
                        )
                    })
                }
            </div>
            {/* container for the arrangements filter bar*/}
            <div className="sticky top-8 h-ful bg-white p-4 shadow-md rounded-md">
                <ArrangementFilterBar setMeaningSelection={setMeaningSelection} meaningSelection={meaningSelection} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            </div>
        </div>

    </>
}