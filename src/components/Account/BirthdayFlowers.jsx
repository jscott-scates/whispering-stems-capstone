import { useEffect, useState } from "react"
import { getAllFlowers } from "../../Services/flowerServices"
import { Link } from "react-router-dom"
import { Flower } from "../Flowers/Flower"


export const BirthdayFlowers = ({ user }) => {
    const [allFlowers, setAllFlowers] = useState()
    const [birthdayFlowers, setBirthdayFlowers] = useState([])

    useEffect(() => {
        getAllFlowers().then((flowersArray) => {
            setAllFlowers(flowersArray)
        })
    }, [user])

    useEffect(() => {
        if (allFlowers) {
            const foundBirthdayFlowers = allFlowers.filter(flower => flower.birthdayImportance === user.birthdayMonth)
            setBirthdayFlowers(foundBirthdayFlowers)
        }
    }, [allFlowers])


    return <>
        {/* user information content */}
        <div className="container mx-auto mt-8 p6">
            <h2 className="text-2xl font-bold text-left text-stone-500">Birthday Flowers</h2>
            <hr className="w-70 text-left border-1 border-green-800 mb-4" />
        </div>
        {/* container that holds all the flower cards */}
        <div className="grid grid-cols-3 gap-6">
            {/* container for individual cards */}
            {
                birthdayFlowers.map(flowerObj => {
                    return (
                        <Link to={`/floret-library/${flowerObj.id}`} key={flowerObj.id}>
                            <Flower flowerObj={flowerObj} />
                        </Link>
                    )
                })
            }
        </div>
    </>
}