import { useState } from "react";

export default function C4() {
    const [activeTab, setActiveTab] = useState("button1");

    return (
        <div className="bg-gray-100 ">
            <div className="container mx-auto p-4">
                <div className="m-5 flex items-center">
                    <div className="flex flex-col px-5 py-4 rounded-lg">
                        <button
                            className={`btn ${activeTab === "button1"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-black-500 hover:bg-blue-400 hover:text-white"
                                } w-60 h-10 py-2 px-4 rounded-full text-lg font-semibold mb-4`}
                            onClick={() => setActiveTab("button1")}
                        >
                            Paid
                        </button>
                        <button
                            className={`btn ${activeTab === "button2"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-black-500 hover:bg-blue-400 hover:text-white"
                                } w-60 h-10 py-2 px-4 text-lg font-semibold rounded-full`}
                            onClick={() => {
                                setActiveTab("button2");
                            }}
                        >
                            Free
                        </button>
                    </div>
                    {activeTab === "button1" && (
                        <div className="m-4">
                            <div className="m-4">
                                <label htmlFor="regular-price" className="block font-bold">
                                    Regular Price (₹)
                                </label>
                                <input
                                    type="text"
                                    id="regular-price"
                                    className="w-full border-2 border-gray-300 p-2 rounded-lg"
                                    placeholder="₹ Regular Price"
                                />
                                <p className="text-gray-600">© The Project Price Includes Your Author Fee.</p>
                            </div>
                            <div className="m-4">
                                <label htmlFor="discounted-price" className="block mb-2 font-bold">
                                    Discounted Price (₹)
                                </label>
                                <input
                                    type="text"
                                    id="discounted-price"
                                    className="w-full border-2 border-gray-300 p-2 rounded-lg"
                                    placeholder="₹ Discounted Price"
                                />
                                <p className="text-gray-600">© The Project Price Includes Your Author Fee.</p>
                            </div>
                            <div className="w-full px-4">
                                <label htmlFor="difficulty-level" className="block mb-2 font-bold">
                                    Difficulty Level
                                </label>
                                <select
                                    className="w-1000 h-10 text-gray-400 border-2 border-gray-600 p-2 rounded-lg leading-tight"
                                    id="difficulty-level"
                                >
                                    <option value="all-levels">Web developer</option>
                                    <option value="beginner">data science</option>
                                    <option value="intermediate">Machine learning</option>
                                    <option value="advanced">Devops</option>
                                </select>
                            </div>
                        </div>
                    )}
                    {activeTab === "button2" && <p></p>}
                </div>
            </div>
        </div>
    )
}