import { useEffect, useState } from "react"
import { MyArrangements } from "./MyArrangements"
import { getUserByUserId } from "../../Services/userServices"
import { UserInformation } from "./UserInformation"
import { BirthdayFlowers } from "./BirthdayFlowers"
import { UserFavorites } from "./UserFavorites"
import { useNavigate } from "react-router-dom"

export const Account = ({currentUser}) => {
    const [activeTab, setActiveTab] = useState("My Arrangements") //default state is set to render the "My Arrangements" section of the user profile.
    const [user, setUser] = useState()
    const navigate = useNavigate()

    const fetchAndSetAllNeededData = () => {
        getUserByUserId(Number(currentUser.id)).then((userData) => {
            setUser(userData)
        })
    }

    useEffect(() => {
        if(currentUser){
            fetchAndSetAllNeededData()
        }    
    },[currentUser])

    const tabs = [
        "My Arrangements",
        "User Information",
        "Birthday Flowers",
        "Favorites",
        "Sign Out"
    ]

    return <>
        <div className="max-w-screen-lg mx-auto grid grid-cols-3 gap-6 px-8 py-12">
            {/* Sidebar - 1/3 of the Page */}
            <div className="border-r border-gray-300 pr-6">
                <h2 className="text-3xl font-bold text-stone-700 mb-6">My Account</h2>
                <div className="space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`block w-full text-left px-4 py-2 rounded-lg transition ${activeTab === tab
                                    ? "bg-blue-500 text-white font-semibold"
                                    : "text-gray-700 hover:bg-gray-200"
                                }`}
                            onClick={() => {
                                if(tab === "Sign Out"){
                                    localStorage.removeItem("whisperingStems_user")
                                    navigate("/", { replace: true }) 
                                }
                                setActiveTab(tab)
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content - 2/3 of the Page */}
            <div className="col-span-2 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
                {activeTab === "My Arrangements" && <MyArrangements user={user}/>}
                {activeTab === "User Information" && <UserInformation user={user}/>}
                {activeTab === "Birthday Flowers" && <BirthdayFlowers user={user}/>}
                {activeTab === "Favorites" && <UserFavorites user={user}/>}
                {activeTab === "Sign Out" && <p className="text-red-500">Logging out now.</p>}
            </div>
        </div>
    </>
}