import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editUserById, getUserByUserId } from "../../Services/userServices"

export const EditUserForm = () => {
    const { userId } = useParams()
    const [currentUser, setCurrentUser] = useState()
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState()
    const navigate = useNavigate()

    const fetchAllData = () => {
        getUserByUserId(Number(userId)).then((userObj) => {
            setCurrentUser(userObj)
        })
    }

    useEffect(() => {
        fetchAllData()
    }, [userId])

    useEffect(() => {
        if (currentUser) {
            setUserName(currentUser.fullName)
            setUserEmail(currentUser.email)
        }
    }, [currentUser])

    const handleSaveChanges = (event) => {
        event.preventDefault()
        const editedUser = {
            id: currentUser.id,
            fullName: userName,
            email: userEmail,
            birthdayMonth: currentUser.birthdayMonth
        }
        editUserById(editedUser)
        navigate(`/account`)


    }

    if (!currentUser) { return null }
    return <>
        {/* user information content */}
        <div className="container mx-auto mt-8 p6">
            <h2 className="text-2xl font-bold text-left text-stone-500">User Information</h2>
            <hr className="w-70 text-left border-1 border-green-800" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm/6 font-medium text-stone-700">
                    Full Name
                </label>
                <div className="mt-2">
                    <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        value={userName}
                        onChange={(event) => {
                            setUserName(event.target.value)
                        }}
                        autoComplete="given-name"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-300 sm:text-sm/6"
                    />
                </div>
            </div>
            <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm/6 font-medium text-stone-700">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={userEmail}
                        onChange={(event) => {
                            setUserEmail(event.target.value)
                        }}
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-300 sm:text-sm/6"
                    />
                </div>
            </div>
            <div className="sm: col-span-full">
                <button
                    type="submit"
                    className="w-full sm:w-auto rounded-md bg-amber-300 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                    onClick={handleSaveChanges}
                >
                    Save Changes
                </button>

            </div>
        </div>
    </>
}