import { useState, useEffect } from "react";
import axios from 'axios';

export default function C2() {
    const [activeButton, setActiveButton] = useState("button1");
    const [selectedWebsite, setSelectedWebsite] = useState('YouTube');
    const websites = ['YouTube', 'Twitch', 'Vimeo']; // Add more websites as needed
    const num=1;
    const [drop, setDrop] = useState();
    const [link, setLink] = useState();

    const handleWebsiteChange = (e) => {
        setSelectedWebsite(e.target.value);
    };

    useEffect(() => {
        if (drop && link) {
            axios.post('http://localhost:3001/c_2', {num,drop,link})
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
    }, [drop,link]);

    return (
        <div className="bg-gray-100 ">
            <div className="container mx-auto p-4">
            <div className="m-5 flex items-center">
                        <div className="flex flex-col px-5 py-4 rounded-lg">
                            <button
                                className={`btn ${activeButton === "button1"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-black-500 hover:bg-blue-400 hover:text-white"
                                    } w-60 h-10 py-2 px-4 rounded-full text-lg font-semibold mb-4`}
                                onClick={() => setActiveButton("button1")}
                            >
                            Upload from Link
                            </button>
                            <button
                                className={`btn ${activeButton === "button2"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-black-500 hover:bg-blue-400 hover:text-white"
                                    } w-60 h-10 py-2 px-4 text-lg font-semibold rounded-full`}
                                onClick={() => setActiveButton("button2")}
                            >
                                Upload from PC
                            </button>
                        </div>
                        {activeButton === "button1" && (
                            <div className="m-4 w-full">
                                    <div className="mb-4">
                                    <label htmlFor="website" className="block mb-2 ">Select Website</label>
                                    <select
                                        id="website"
                                        className="w-full border-2 border-gray-300 p-2 rounded-lg"
                                        value={selectedWebsite}
                                        onChange={(e) => {
                                            handleWebsiteChange(e);
                                            setDrop(e.target.value);
                                        }}
                                    >
                                        {websites.map((website) => (
                                            <option key={website} value={website}>{website}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="URL" className="block mb-2 font-bold">Add Video URL</label>
                                    <input type="text" id="URL" onChange={(e) => setLink(e.target.value)} className="w-full border-2 border-gray-300 p-2 rounded-lg mb-2" placeholder='Add URL Here' />
                                    <p style={{ color: "gray" }}>Example: https://www.{selectedWebsite.toLowerCase()}.com/</p>
                                </div>
                            </div>
                        )}
                        {activeButton === "button2" && (
                            <div className="m-4">
                               
                            </div>
                        )}
                    </div>
                        
            </div>
        </div>
    )
}
