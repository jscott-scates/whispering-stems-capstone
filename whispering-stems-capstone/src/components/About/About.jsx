import { useState } from "react"
import { History } from "./History"
import { Colors } from "./Colors"
import { Flowers } from "./Flowers"
import { Anniversary } from "./Anniversary"
import { Occasions } from "./Occasions"

export const About = () => {
    const [activeTab, setActiveTab] = useState("History")

    const tabs = [
        "History",
        "Colors",
        "Flowers of the Month",
        "Anniversary Flowers",
        "Occasions"
    ]

    return <>
        <div className="max-w-screen-lg mx-auto grid grid-cols-3 gap-6 px-8 py-12">
            {/* Sidebar - 1/3 of the page */}
            <div className="border-r border-gray-300 pr-6">
                <h2 className="text-3xl font-bold text-stone-700 mb-6">About Floriography</h2>
                <div className="space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`block w-full text-left px-4 py-2 rounded-lg transition ${activeTab === tab
                                ? "bg-amber-300 text-white font-semibold"
                                : "text-gray-700 hover:bg-gray-200"
                                }`}
                            onClick={() => {
                                setActiveTab(tab)
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            {/* Tab Content - 2/3 of the page */}
            <div className="col-span-2 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
                {activeTab === "History" && <History />}
                {activeTab === "Colors" && <Colors />}
                {activeTab === "Flowers of the Month" && <Flowers />}
                {activeTab === "Anniversary Flowers" && <Anniversary />}
                {activeTab === "Occasions" && <Occasions />}
            </div>
        </div>

    </>
}