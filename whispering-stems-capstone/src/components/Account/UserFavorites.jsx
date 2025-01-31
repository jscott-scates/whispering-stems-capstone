import { useEffect, useState } from "react"
import { getAllArrangements } from "../../Services/arrangementsServices"
import { getAllArrangementLikes } from "../../Services/likesServices"
import { Link } from "react-router-dom"
import { Arrangement } from "../Arrangements/Arrangement"


export const UserFavorites = ({user}) => {
    const [allUserLikes, setAllUserLikes] = useState([])
    const [filteredArrangements, setFilteredArrangements] = useState([])

    const fetchAndSetAllData = () => {
        getAllArrangementLikes().then((userLikesArray) => {
            setAllUserLikes(userLikesArray)
        })
    }

    useEffect(() => {
        fetchAndSetAllData()
    },[])

    useEffect(() => {
        if(allUserLikes.length > 0 ){
            const foundUserLikes = allUserLikes.filter(userLike => userLike.userId === user.id)
            setFilteredArrangements(foundUserLikes)
        }
    },[allUserLikes, user])

    console.log(filteredArrangements)

    return <>
        {/* user information content */}
        <div className="container mx-auto mt-8 p6">
            <h2 className="text-2xl font-bold text-left text-stone-500">Favorite Arrangements</h2>
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
                                    <Arrangement arrangementObj={arrangementObj} user={user} fetchAndSetAllArrangements={() => fetchAndSetAllArrangements()}/>
                                </Link>
                            )                
                        })
                    }
                </div>
            </div>
    </>
}