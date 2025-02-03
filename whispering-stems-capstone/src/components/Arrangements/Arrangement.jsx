import {useState, useEffect} from "react"
import { getMeaningByArrangementId } from "../../Services/arrangementsServices"
import { createUserEntryLike, deleteUserLikeEntry, getAllArrangementLikes } from "../../Services/likesServices"
import { useNavigate } from "react-router-dom"


export const Arrangement = ({arrangementObj, user, fetchAndSetAllArrangements}) => {
    const [arrangementMeanings, setArrangementMeanings] = useState()
    const [likes, setLikes] = useState([])
    const [filteredLikes, setFilteredLikes] = useState([])
    const navigate = useNavigate()

    //Dependecy array dictates to getMeaningsByArrangementId and getAllArrangementLikes if there are changes to the arrangementObj or user
    useEffect(() => {
        if(arrangementObj){
        getMeaningByArrangementId(arrangementObj.id).then((arrangementMeaningsArray) => {
            setArrangementMeanings(arrangementMeaningsArray)
        })
        getAllArrangementLikes().then((arrangementLikes) => {
            setLikes(arrangementLikes)
        })
        }
    },[arrangementObj, user])

    // setsFilteredLikes based on changes to arrangementObj and likes by filtering likes by if the user liked an arrangementId that is equal to the current arrangement id
    useEffect(() => {
        if(likes.length > 0){
            const foundUserLikes = likes.filter(userLike => userLike.arrangementId === arrangementObj.id)
            setFilteredLikes(foundUserLikes)
        }
    },[arrangementObj,likes])

    //evaluates user length and if it is greater than 0, it finds if the current user liked the current arrangement and 
    const didCurrentUserLikeArrangement = () => {
        if(user){
            const userLikedCurrentArrangement = filteredLikes.find((userLike) => userLike.userId === user.id)
            return userLikedCurrentArrangement
        }  
    }

    //if the like button is clicked on an arrangement creates a userLikeEntry
    const handleLike = async (event) => {
        event.preventDefault()
        const userLikeEntry = {
            userId: user.id,
            arrangementId: arrangementObj.id
        }
        createUserEntryLike(userLikeEntry)
        fetchAndSetAllArrangements()
    }

    //if the unlike button is clicked on an arrangement, deletes userLikeEntry
    const handleDeleteLike = (event) => {
        event.preventDefault()
        const findArrangementLike = filteredLikes.find((userLike) => userLike.userId === user.id)
    
        deleteUserLikeEntry(findArrangementLike.id)
        fetchAndSetAllArrangements()
    }

    if(!arrangementObj || !user || !arrangementMeanings){return null} 
    return <>
         <div className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        {/* Image */}
            <img src="/images/sample.jpg" alt="Card Image" className="w-full h-48 object-cover" />

        {/* Card Content */}
            <div className="p-4">
                <h3 className="text-xl font-semibold text-stone-800 text-center">{arrangementObj.name}</h3>
                <p className="text-stone-500 mt-2">
                    Meaning(s): {arrangementMeanings.map((arrangementMeaning) => arrangementMeaning.meaning.meaningTag).join(" ")}
                </p>
                 {/* Button Container */}
                 <div>
                    {user.id !== arrangementObj.userId && (
                        <>
                            {!didCurrentUserLikeArrangement() && <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-900 transition" onClick={handleLike}>Love It!</button>}
                            {!!didCurrentUserLikeArrangement() && <button className="mt-4 bg-red-300 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition" onClick={handleDeleteLike}>Nevermind!</button>}
                        </>
                    )}
                    {user.id === arrangementObj.userId && <button className="mt-4 bg-amber-300 text-white px-4 py-2 rounded-lg hover:bg-amber-500 transition" onClick={(event) => { event.preventDefault(); navigate(`${arrangementObj.id}/edit-arrangement`)}}>Edit Arrangement</button>}
                 </div>
            </div>
        </div>
       
    </>
} 