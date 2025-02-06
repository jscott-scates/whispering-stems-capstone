import { getAllMeanings } from "../../Services/flowerServices"
import { useState, useEffect } from "react"


export const ArrangementFilterBar = ({ setSearchTerm, setMeaningSelection, searchTerm, meaningSelection }) => {
    const [allMeanings, setAllMeanings] = useState([])

    useEffect(() => {
        getAllMeanings().then((meaningsArray) => {
            setAllMeanings(meaningsArray)
        })
    }, [])

    const handleMeaningSearchChangeEvent = (event) => {
        setMeaningSelection(event.target.value)
    }

    const handleResettingSearches = () => {
        setSearchTerm("")
        setMeaningSelection("")
    }

    return <>
        <h3 className="text-2xl mx-auto mt-1 p6 pb-4 text-stone-500">Search</h3>
        <div className="space-y-4">
            {/* Search by Arrangement Name */}
            <div className="relative w-80">
                <input
                    type="text"
                    id="arrangementSearch"
                    className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <label
                    htmlFor="arrangementSearch"
                    className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
                >
                    Search by Arrangement Name
                </label>
            </div>

            {/* Search by Meaning Dropdown */}
            <div className="relative w-80">
                <select
                    id="meaningSearch"
                    onChange={handleMeaningSearchChangeEvent}
                    value={meaningSelection}
                    className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                >
                    <option value="" className="text-gray-400"></option>
                    {allMeanings.map(meaning => (
                        <option value={meaning.meaningTag} key={meaning.id}>
                            {meaning.meaningTag}
                        </option>
                    ))}
                </select>
                <label
                    htmlFor="meaningSearch"
                    className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
                >
                    Search by Meaning
                </label>
            </div>
            {/* Show All Arrangement Button (Resets searches) */}
            <button
                className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-900 transition"
                onClick={handleResettingSearches}
            >
                Show All Flowers
            </button>
        </div>
    </>

}
