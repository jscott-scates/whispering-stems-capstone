import { useState } from "react"
import unsplashHomePage from "../../images/homepage/unsplashHomePage.jpg"
import { useEffect } from "react"
import { getAllArrangements } from "../../Services/arrangementsServices"
import { Link } from "react-router-dom"
import { Arrangement } from "../Arrangements/Arrangement"
import { getUserByUserId } from "../../Services/userServices"

export const Welcome = ({ currentUser }) => {
    const [allArrangements, setAllArrangements] = useState()
    const [sortedArrangements, setSortedArrangements] = useState()
    const [user, setUser] = useState()

    const fetchAndSetArrangements = () => {
        getAllArrangements().then((arangementsArray => {
            setAllArrangements(arangementsArray)
        }))
        getUserByUserId(Number(currentUser.id)).then(userData => {
            setUser(userData)
        })
    }

    useEffect(() => {
        if (currentUser) {
            fetchAndSetArrangements()
        }
    }, [currentUser])

    useEffect(() => {
        if (allArrangements && allArrangements.length > 0) {

            const sorted = allArrangements.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
            setSortedArrangements(sorted)
        }
    }, [allArrangements])




    if (!sortedArrangements) { return null }
    return <>
        {/* cover image for home page */}
        <img
            alt="A picture of a pale pink and white bouquet against a dark background"
            src={unsplashHomePage}
            className="object-cover md:object-cover h-100 w-full"
        />
        {/* homepage content */}
        <div className="container mx-auto mt-8 p6">
            <h2 className="text-5xl font-bold text-center text-stone-500">Recent Community Creations</h2>
            <hr className="w-200 mx-auto mt-4 border-2 border-green-800" />
        </div>
        <div>
            <div className="flex justify-between m-10 pl-20 pr-20">
                {
                    sortedArrangements.slice(0, 5).map(arrangement => {
                        return (
                            <Link to={`/arrangements/${arrangement.id}`} key={arrangement.id}>
                                <Arrangement arrangementObj={arrangement} user={user} fetchAndSetAllArrangements={() => fetchAndSetArrangements()} />
                            </Link>
                        )
                    })
                }
            </div>
        </div>



    </>
}

//Show the 5 most recent creations by lastEditedDate
