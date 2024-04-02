export default function C2() {
    return (
        <div className="bg-gray-100 ">
            <div className="container mx-auto p-4">
                <div className="mb-4">
                    <input type="text" id="Youtube" className="w-full border-2 border-gray-300 p-2 rounded-lg " placeholder='Youtube' />
                </div>
                <div className="mb-2">
                    <label htmlFor="course-permalink" className="block mb-2 font-bold">Add Video URL</label>
                    <input type="text" id="URL" className="w-full border-2 border-gray-300 p-2 rounded-lg mb-2" placeholder='Add URL Here' />
                    <p style={{ color: "gray" }}>Example:https://www.youtube.com/</p>
                </div>
            </div>
        </div>
    )
}