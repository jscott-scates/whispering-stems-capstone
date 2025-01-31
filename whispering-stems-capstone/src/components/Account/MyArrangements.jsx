import { useEffect, useState } from "react"
import { getAllArrangements } from "../../Services/arrangementsServices"
import { Link } from "react-router-dom"
import { Arrangement } from "../Arrangements/Arrangement"

export const MyArrangements = ({ user }) => {
    const [allArrangements, setAllArrangements] = useState([])
    const [filteredArrangements, setFilteredArrangements] = useState([])

    const fetchAndSetArrangementsData = () => {
        getAllArrangements().then((arrangementsArray) => {
            setAllArrangements(arrangementsArray)
        })
    }


    useEffect(() => {
        fetchAndSetArrangementsData()
    }, [])

    useEffect(() => {
        if (allArrangements.length > 0 && user) {
            const userArrangements = allArrangements.filter(arrangement => arrangement.userId === user.id)
            setFilteredArrangements(userArrangements)
        }
    }, [user])

    if (!filteredArrangements) { return null }
    console.log(setFilteredArrangements)
    return <>
        {/* arrangements content */}
        <div className="container mx-auto mt-8 p6">
            <h2 className="text-2xl font-bold text-left text-stone-500">{filteredArrangements.length} Arrangements Made</h2>
            <hr className="w-70 text-left border-1 border-green-800" />
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
        </div>
    </>
}