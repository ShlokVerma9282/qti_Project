import { useState } from "react";

export default function C3() {
    const [showAdd, setShowAdd] = useState(false); // State to manage visibility of Add component

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto p-4">
                <div className="mb-3">
                    {/* Button to toggle visibility of Add component */}
                    <button onClick={() => setShowAdd(!showAdd)} className="bg-gradient-to-tr from-blue-500 to bg-purple-500 text-white px-5 py-2 rounded-lg">
                        {showAdd ? 'Hide Add Topic' : 'Add New Topic +'}
                    </button>
                </div>
                {/* Render Add component based on state */}
                {showAdd && (
                    <div>
                        <div className="container  mx-auto py-4">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-xl font-bold text-black">Add Topic</h1>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="course-title" className="block mb-2 font-medium ">Topic Name</label>
                                    <input type="text" id="course-title" className="w-full border-2 border-gray-300 p-2 rounded-lg" />
                                    <p style={{ color: "grey" }}>© Topic titles are displayed publicly wherever required. Each topic may contain one or more lessons, quiz and assignments.</p>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="course-permalink" className="block mb-2 font-medium">Topic Summary</label>
                                    <input type="text" id="course-permalink" className="w-full h-24  border-2 border-gray-300 p-2 rounded-lg" />
                                    <p style={{ color: "grey" }}>© Add a summary of short text to prepare students for the activities for the topic. The text is shown on the course page beside the tooltip beside the topic name.</p>
                                </div>
                                <div className="flex justify-end"> {/* Added flex container for alignment */}
                                    <button className="bg-blue-500 text-white px-5 py-2 rounded-lg">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}