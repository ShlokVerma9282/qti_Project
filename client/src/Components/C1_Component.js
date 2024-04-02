import { useState, useEffect } from "react";
import axios from 'axios';

export default function C1() {
    const [activeButton, setActiveButton] = useState("button1");
    const [activeTab, setActiveTab] = useState("button1");
    const [selectedFile, setSelectedFile] = useState(null);
    const num=1;
    const [title, setTitle] = useState();
    const [slug, setSlug] = useState();
    const [about, setAbout] = useState();
    const defaultBackgroundImage = 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg'; // Provide a valid URL for your default image

    useEffect(() => {
        if (title && slug && about) {
            axios.post('http://localhost:3001/c_1', {num,title, slug, about })
                .then(result => console.log(result))
                .catch(err => console.log(err))
        }
    }, [title, slug, about]);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file.size <= 700 * 430 * 3 && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/webp')) {
            setSelectedFile(file);
        } else {
            alert('Please select a file that is 700x430 pixels or smaller and is a JPG, JPEG, PNG, GIF, or WEBP file.');
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.currentTarget.classList.add('border-4', 'border-dashed', 'border-blue-500', 'hover:bg-gray-100');
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        event.currentTarget.classList.remove('border-4', 'border-dashed', 'border-blue-500', 'hover:bg-gray-100');
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.currentTarget.classList.remove('border-4', 'border-dashed', 'border-blue-500', 'hover:bg-gray-100');
        const file = event.dataTransfer.files[0];
        if (file.size <= 700 * 430 * 3 && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/webp')) {
            setSelectedFile(file);
        } else {
            alert('Please select a file that is 700x430 pixels or smaller and is a JPG, JPEG, PNG, GIF, or WEBP file.');
        }
    };

    const handleImageClick = () => {
        console.log('Image clicked');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // No need for explicit submission handling since it's handled by useEffect now
    };

    return (
        <div className="bg-gray-100 ">
            <div className="container mx-auto p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="course-title" className="block mb-2 font-bold ">Course Title</label>
                        <input onChange={(e) => setTitle(e.target.value)} type="text" id="course-title" className="w-full border-2 border-gray-300 p-2 rounded-lg" placeholder="Enter course title" />
                        <p style={{ color: "grey" }}>© Title should be 30 character</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="course-slug" className="block mb-2 font-bold">Course Slug</label>
                        <input onChange={(e) => setSlug(e.target.value)} type="text" id="course-slug" className="w-full border-2 border-gray-300 p-2 rounded-lg" placeholder="Enter course slug" />
                        <p style={{ color: "grey" }}>© Permalink:https://yourdomain.com/new-course
                        </p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="course-permalink" className="block mb-2 font-bold">About Course</label>
                        <input onChange={(e) => setAbout(e.target.value)} type="text" id="course-permalink" className="w-full h-32  border-2 border-gray-300 p-2 rounded-lg" />
                        <p style={{ color: "grey" }}>© HTML or plain text allowed, no emoji This field is used for search, so please be descriptive!</p>
                    </div>
                    {/* No need for a button here since data is dynamically updated */}
                </form>
                    <h1 className="text-lg font-bold text-black mt-6">Course Setting</h1>
                    <div className="m-5 flex items-center">
                        <div className="flex flex-col px-5 py-4 rounded-lg">
                            <button
                                className={`btn ${activeButton === "button1"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-black-500 hover:bg-blue-400 hover:text-white"
                                    } w-60 h-10 py-2 px-4 rounded-full text-lg font-semibold mb-4`}
                                onClick={() => setActiveButton("button1")}
                            >
                                General
                            </button>
                            <button
                                className={`btn ${activeButton === "button2"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-black-500 hover:bg-blue-400 hover:text-white"
                                    } w-60 h-10 py-2 px-4 text-lg font-semibold rounded-full`}
                                onClick={() => setActiveButton("button2")}
                            >
                                Content Drip
                            </button>
                        </div>
                        {activeButton === "button1" && (
                            <div className="m-4">
                                <div className=" -mx-4">
                                    <div className="w-1/2 px-4">
                                        <label className="block mb-2 font-bold">Maximum Students</label>
                                        <input
                                            type="number"
                                            className="w-full h-10 border-2 border-gray-300 p-2 rounded-lg leading-tight"
                                            id="max-students"
                                            placeholder="100"
                                        />
                                        <p>Number of students that can enroll in this course. Set 0 for no limits</p>
                                    </div>
                                    <div className="w-1/2 px-4">
                                        <label className="block mb-2 font-bold">Difficulty Level</label>
                                        <select
                                            className="w-full h-10 border-2 border-gray-300 p-2 rounded-lg leading-tight"
                                            id="difficulty-level"
                                        >
                                            <option value="all-levels">All Levels</option>
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="-mx-4">
                                    <div className="w-1/2 px-4">
                                        <div className="w-full">
                                            <label className="block mb-2 font-bold">
                                                <div className="flex items-center mt-3">
                                                    <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                                                        <input
                                                            type="checkbox"
                                                            name="toggle"
                                                            id="public-course-toggle"
                                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                        />
                                                        <label
                                                            htmlFor="public-course-toggle"
                                                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                                        ></label>
                                                    </div>
                                                    <span className="ml-5">Public Course</span>
                                                </div>
                                            </label>
                                            <label className="text-gray-500" htmlFor="public-course">
                                                No enrollment required.
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-4">
                                        <div className="w-full">
                                            <label className="block mb-2 font-bold">
                                                <div className="flex items-center mt-3">
                                                    <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                                                        <input
                                                            type="checkbox"
                                                            name="toggle"
                                                            id="enable-q-a-toggle"
                                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                        />
                                                        <label
                                                            htmlFor="enable-q-a-toggle"
                                                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                                        ></label>
                                                    </div>
                                                    <span className="ml-5">Q&A</span>
                                                </div>
                                            </label>
                                            <label className="text-gray-500" htmlFor="enable-q-a">
                                                Enable Q&A section for your course
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeButton === "button2" && (
                            <div className="m-4">
                                <label className="block mb-2 text-gray-500 text-lg mt-5 ">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-gray-500 mr-2"
                                        id="public-course"
                                    />
                                    Enable
                                </label>
                                <p>Enable / Disable content drip</p>
                                <div className="mt-6">
                                    <h1 className="text-lg">Content Drip Type</h1>
                                    <h3 className="text-gray-600 mt-3 text-lg">
                                        You can schedule your course content using the above content drip options.
                                    </h3>
                                    <div>
                                        <div>
                                            <input type="radio" id="option1" name="option" value="option1" />
                                            <label htmlFor="option1">Schedule Course Contents By Date</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="option2" name="option" value="option2" />
                                            <label htmlFor="option2">Content Available After X Days From Enrollment</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="option3" name="option" value="option3" />
                                            <label htmlFor="option3">Course Content Available Sequentially</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="option4" name="option" value="option4" />
                                            <label htmlFor="option4">Course Content Unlocked After Finishing Prerequisites</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <h1 className="text-lg font-bold text-black">Course Price</h1>
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
                                        Regular Price ($)
                                    </label>
                                    <input
                                        type="text"
                                        id="regular-price"
                                        className="w-full border-2 border-gray-300 p-2 rounded-lg"
                                        placeholder="$ Regular Price"
                                    />
                                    <p className="text-gray-600">© The Course Price Includes Your Author Fee.</p>
                                </div>
                                <div className="m-4">
                                    <label htmlFor="discounted-price" className="block mb-2 font-bold">
                                        Discounted Price ($)
                                    </label>
                                    <input
                                        type="text"
                                        id="discounted-price"
                                        className="w-full border-2 border-gray-300 p-2 rounded-lg"
                                        placeholder="$ Discounted Price"
                                    />
                                    <p className="text-gray-600">© The Course Price Includes Your Author Fee.</p>
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
                    <div className="mt-6">
                        <h1 className="block mb-2 font-bold text-lg">Course Thumbnail</h1>

                        <div
                            onClick={handleImageClick}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className="w-900 h-400 border-4 border-dashed border-blue-500 hover:bg-gray-100 flex flex-col justify-center items-center cursor-pointer"
                            style={{ height: '400px' }} // Adjust height inline
                        >
                            <div
                                className="flex flex-col justify-center items-center"
                                style={{
                                    backgroundImage: `url(${selectedFile ? URL.createObjectURL(selectedFile) : defaultBackgroundImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    width: '100%',
                                    height: '100%'
                                }}
                            >
                                {selectedFile ? (
                                    <p style={{ color: "grey" }}>Size: 700×430 pixels, File Support: JPG, JPEG, PNG, GIF, WEBP</p>
                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="w-10 h-10 text-gray-500"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                        <p className="mt-1 text-sm text-gray-600">Drag & drop your file here or click to select a file</p>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/gif,image/webp"
                                            className="hidden"
                                            onChange={handleFileInputChange}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                        <h1 style={{ color: "grey" }}>© Size: 700×430 pixels, File Support: JPG, JPEG, PNG, GIF,</h1>
                    </div>
                {/* </div> */}
            </div>
        </div>
    );
}