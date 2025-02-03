import { useEffect, useState } from "react"
import { getAllFlowers, getAllMeanings } from "../../Services/flowerServices"
import { createArrangementFlowerEntry, deleteAllFlowersByArrangementId, getArrangementByArrangementId, getFlowersByArrangementId, getMeaningByArrangementId, updateArrangement, updateArrangementMeaning } from "../../Services/arrangementsServices"
import { useNavigate, useParams } from "react-router-dom"


export const EditArrangementForm = ({ currentUser }) => {
    const [arrangement, setArrangement] = useState()
    const [allMeanings, setAllMeanings] = useState()
    const [allFlowers, setAllFlowers] = useState([])
    const [originalFlowers, setOriginalFlowers] = useState()
    const [originalMeaning, setOriginalMeaning] = useState()
    const [selectedFlowers, setSelectedFlowers] = useState([])
    const [selectedMeaning, setSelectedMeaning] = useState("")
    const [selectedMeaningId, setSelectedMeaningId] = useState()
    const [name, setName] = useState("")
    const [userNotes, setUserNotes] = useState("")
    const { arrangementId } = useParams()
    const navigate = useNavigate()

    const fetchAllData = () => {
        getAllMeanings().then((meaningsArray) => {
            setAllMeanings(meaningsArray)
        })
        getAllFlowers().then((flowersArray) => {
            setAllFlowers(flowersArray)
        })
        getArrangementByArrangementId(Number(arrangementId)).then((arrangementObj) => {
            setArrangement(arrangementObj)
        })
        getMeaningByArrangementId(Number(arrangementId)).then((meaningArrangement) => {
            setOriginalMeaning(meaningArrangement)
        })
        getFlowersByArrangementId(Number(arrangementId)).then((flowersArray) => {
            setOriginalFlowers(flowersArray)
        })
    }

    const setFlowerSelectionStatus = (flower) => {
        setSelectedFlowers((previousSelectedState) => {
            if (previousSelectedState.some((floret) => floret.id === flower.id)) {
                // Remove the flower if it's already selected
                return previousSelectedState.filter((floret) => floret.id !== flower.id)
            } else {
                // Add the flower to the arrangement if it's not already selected
                return [...previousSelectedState, flower]
            }
        })
    }

    const handleArrangementSave = async (event) => {
        event.preventDefault()

        const updatedArrangement = {
            id: arrangement.id,
            userId: currentUser.id,
            name: name,
            notes: userNotes,
            dateCreated: arrangement.dateCreated,
            lastUpdated: new Date(),
            img: "link_to_img.jpg"
        }
        await  updateArrangement(updatedArrangement)

        await deleteAllFlowersByArrangementId(arrangement)

        const flowerArrangementsEntry = selectedFlowers.map((flower) => ({
                arrangementId: arrangement.id,
                flowerId: flower.id
            }))
        await createArrangementFlowerEntry(flowerArrangementsEntry)
        
        const updatedMeaning = {
            id: originalMeaning[0].id,
            arrangementId: arrangement.id,
            meaningId: selectedMeaningId
        }

       await updateArrangementMeaning(updatedMeaning)
       navigate(`/arrangements/${arrangementId}`)
    }

        useEffect(() => {
            if(arrangementId){
                fetchAllData()
            }
        }, [arrangementId])

        useEffect(() => {
            if (originalFlowers) {
                const arrangementFlowers = originalFlowers.map(originalFlower => originalFlower.flower)
                setSelectedFlowers(arrangementFlowers)
            }
        }, [originalFlowers])

        useEffect(() => {
            if (arrangement && originalMeaning && originalMeaning.length > 0) {
                setName(arrangement.name)
                setUserNotes(arrangement.notes)
                setSelectedMeaning(originalMeaning[0].meaning.meaningTag)
                setSelectedMeaningId(originalMeaning[0].meaning.id)
            }
        }, [arrangement, originalMeaning])

        useEffect(() => {
            if(allMeanings && allMeanings.length > 0){
                const foundMeaningId = allMeanings.find(meaning => meaning.meaningTag === selectedMeaning)
                setSelectedMeaningId(foundMeaningId.id)
            }
        },[selectedMeaning])

        if (!allMeanings || !allFlowers || !arrangement) { return null }
        return <>
            {/* Header Information */}
            <div className="container mx-auto mt-8 p6">
                <div className="space-y-4">
                    <div className="relative w-80">
                        <input
                            type="text"
                            id="arrangementName"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                        <label
                            htmlFor="arrangementName"
                            className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
                        >
                            Arrangement Name
                        </label>
                    </div>
                </div>
                <hr className="w-200 mx-auto mt-4 border-2 border-green-800" />
            </div>
            {/* Arrangement Name Entry */}

            {/* Meaning Selection Box */}
            <div className="relative w-80">
                <select
                    className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none appearance-none"
                    onChange={(event) => setSelectedMeaning(event.target.value)}
                    value={selectedMeaning || ""}
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
                    Select Meaning
                </label>
            </div>
            {/* Flowers Container */}
            <div className="flex gap-6">
                {/* Add Flowers to Arrangement Section */}
                <div className="w-1/2 bg-stone-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3 text-stone-500">Add Flowers to Arrangement</h2>
                    <hr className="w-100 text-left border-1 border-green-800" />
                    <div className="grid grid-cols-2 gap-4">
                        {
                            allFlowers.filter((flower) => !selectedFlowers?.some((floret) => floret.id === flower.id))
                                .map((flower) => (
                                    <div key={flower.id} className="flex items-center justify-between bg-white shadow-md rounded-lg p-3">
                                        <span>{flower.name}</span>
                                        <button
                                            onClick={() => setFlowerSelectionStatus(flower)}
                                            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                                        >
                                            ➕
                                        </button>
                                    </div>
                                ))
                        }
                    </div>
                </div>
                {/* Flowers Currently in Arrangement Section */}
                <div className="w-1/2 bg-stone-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3 text-stone-500">Flowers Currently in Arrangement</h2>
                    <hr className="w-100 text-left border-1 border-green-800" />
                    <div className="grid grid-cols-2 gap-4">
                        {
                            selectedFlowers?.map((flower) => (
                                <div key={flower.id} className="flex items-center justify-between bg-white shadow-md rounded-lg p-3">
                                    <span>{flower.name}</span>
                                    <button
                                        onClick={() => setFlowerSelectionStatus(flower)}
                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                    >
                                        ➖
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* User Notes Section */}
            <div>
                <div>
                    <div className="w-full">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Notes
                        </label>
                        <textarea
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                            placeholder="Add your creation notes here"
                            value={userNotes}
                            onChange={(event) => setUserNotes(event.target.value)}
                        ></textarea>
                    </div>
                </div>
            </div>
            {/* Show All Flowers Button (Resets searches) */}
            <button
                className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-900 transition"
                onClick={handleArrangementSave}
            >
                Save Edits
            </button>
        </>
    } 
