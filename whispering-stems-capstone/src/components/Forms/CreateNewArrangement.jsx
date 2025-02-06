import { useEffect, useState } from "react"
import { getAllFlowers, getAllMeanings } from "../../Services/flowerServices"
import { createArrangementFlowerEntry, createArrangementMeaningEntry, postNewArrangement } from "../../Services/arrangementsServices"
import { useNavigate } from "react-router-dom"
import generateImage from "../../utilities/imageGenerator"
import uploadToCloudinary from "../../utilities/cloudinary"

export const CreateNewArrangement = ({ currentUser }) => {
    const [allMeanings, setAllMeanings] = useState()
    const [allFlowers, setAllFlowers] = useState([])
    const [selectedFlowers, setSelectedFlowers] = useState([])
    const [selectedMeaning, setSelectedMeaning] = useState()
    const [name, setName] = useState("")
    const [userNotes, setUserNotes] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchAllData = () => {
        getAllMeanings().then((meaningsArray) => {
            setAllMeanings(meaningsArray)
        })
        getAllFlowers().then((flowersArray) => {
            setAllFlowers(flowersArray)
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
        setLoading(true)

        const arrangementObject = {
            userId: currentUser.id,
            name: name,
            notes: userNotes,
            dateCreated: new Date(),
            lastUpdated: new Date(),
            img: ""
        }

        // Step 1: Generate Image using OpenAI
        const generatedImage = await generateImage({ flowers: selectedFlowers })

        if (!generatedImage) {
            window.alert("Image generation failed. Please try again.")
            setLoading(false)
            return
        }

        // Step 2: Upload Generated Image to Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(generatedImage)

        if (!cloudinaryUrl) {
            window.alert("Image upload to Cloudinary failed. Please try again.")
            setLoading(false)
            return
        }

        // Step 3: Add Cloudinary URL to Arrangement Object
        arrangementObject.img = cloudinaryUrl

        if (name && selectedMeaning && selectedFlowers.length > 0) {
            const data = await postNewArrangement(arrangementObject)

            if (selectedFlowers && selectedFlowers.length > 0) {
                const flowerArrangementsEntry = selectedFlowers.map((flower) => ({
                    arrangementId: data.id,
                    flowerId: flower.id
                }))
                await createArrangementFlowerEntry(flowerArrangementsEntry)
            }
            if (selectedMeaning) {
                const arrangementMeaningEntry = {
                    arrangementId: data.id,
                    meaningId: Number(selectedMeaning)
                }
                await createArrangementMeaningEntry(arrangementMeaningEntry)
                setLoading(false)
                navigate(`/arrangements/${data.id}`)
            }
        }

        if (!name || !selectedMeaning || selectedFlowers.length === 0) {
            window.alert("Please ensure that your arrangement has a name, meaning, and at least one flower in the arrangement.")
            setLoading(false)
            return
        }


    }

    useEffect(() => {
        fetchAllData()
    }, [])

    if (!allMeanings || !allFlowers) { return null }
    return <>

        {/* Show All Flowers Button (Resets searches) */}
        {
            loading ?
                <>
                    <div className="h-screen flex place-items-center justify-center" role="status">
                        <svg aria-hidden="true" className="inline w-50 h-50 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </>
                :
                <>
                    {/* Header Information */}
                    <div className="container mx-auto mt-8 p6">
                        <h2 className="text-5xl font-bold text-center text-stone-500">Create New Arrangement</h2>
                        <hr className="w-200 mx-auto mt-4 border-2 border-green-800" />
                    </div>
                    {/* Arrangement Name Entry */}
                    <div className="space-y-4 pl-8 pb-4 pt-4">
                        <div className="relative w-80">
                            <input
                                type="text"
                                id="arrangementName"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none"
                            />
                            <label
                                htmlFor="arrangementName"
                                className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-red-400"
                            >
                                Arrangement Name
                            </label>
                        </div>
                    </div>
                    {/* Meaning Selection Box */}
                    <div className="space-y-4 pl-8 pb-4">
                        <div className="relative w-80 ">
                            <select
                                className="peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 bg-white focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none appearance-none"
                                onChange={(event) => setSelectedMeaning(event.target.value)}
                                value={selectedMeaning}
                            >

                                <option value="" className="text-gray-400"></option>
                                {allMeanings.map(meaning => (
                                    <option value={meaning.id} key={meaning.id}>
                                        {meaning.meaningTag}
                                    </option>
                                ))}
                            </select>
                            <label
                                htmlFor="meaningSearch"
                                className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-red-400"
                            >
                                Select Meaning
                            </label>
                        </div>
                    </div>
                    {/* Flowers Container */}
                    <div className="flex gap-6 pl-8 pr-8">
                        {/* Add Flowers to Arrangement Section */}
                        <div className="w-1/2 bg-stone-100 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold text-stone-500">Add Flowers to Arrangement</h2>
                            <hr className="w-100 text-left border-1 border-green-800 mb-3" />
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
                            <h2 className="text-lg font-semibold text-stone-500">Flowers Currently in Arrangement</h2>
                            <hr className="w-100 text-left border-1 border-green-800 mb-3" />
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
                    <div className="pl-8 pt-8 pr-8">
                        <div>
                            <div className="w-full">
                                <label className="block text-gray-700 text-lg font-semibold mb-2">
                                    Notes
                                </label>
                                <textarea
                                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent shadow-sm"
                                    placeholder="Add your creation notes here"
                                    value={userNotes}
                                    onChange={(event) => setUserNotes(event.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="pl-8 pt-4 pr-8">
                        <button
                            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-900 transition"
                            onClick={handleArrangementSave}
                        >
                            Save New Arrangement
                        </button>
                    </div>
                </>
        }
    </>
} 