import { useEffect, useState } from "react"
import { getAllArrangementLikes } from "../../Services/likesServices"
import { Link } from "react-router-dom"
import { Arrangement } from "../Arrangements/Arrangement"


export const UserFavorites = ({ user }) => {
    const [allUserLikes, setAllUserLikes] = useState([])
    const [filteredArrangements, setFilteredArrangements] = useState([])

    const fetchAndSetAllData = () => {
        getAllArrangementLikes().then((userLikesArray) => {
            setAllUserLikes(userLikesArray)
        })
    }

    useEffect(() => {
        fetchAndSetAllData()
    }, [])

    useEffect(() => {
        if (allUserLikes.length > 0) {
            const foundUserLikes = allUserLikes.filter(userLike => userLike.userId === user.id)
            setFilteredArrangements(foundUserLikes)
        }
    }, [allUserLikes, user])

    return <>
        {/* user information content */}
        <div className="container mx-auto mt-8 p6">
            <h2 className="text-2xl font-bold text-left text-stone-500">Favorite Arrangements</h2>
            <hr className="w-70 text-left border-1 border-green-800 mb-4" />
        </div>
        {/* container that holds all the arrangement cards */}
        <div className="grid grid-cols-3 gap-6">
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
    </>
}