import { useState } from "react";

export default function C3() {
    const [showAdd, setShowAdd] = useState(false); // State to manage visibility of Add component
    const [editIndex, setEditIndex] = useState(null); // State to track the index of the topic being edited
    const [topicName, setTopicName] = useState('');
    const [topicSummary, setTopicSummary] = useState('');
    const [topics, setTopics] = useState([]); // State to store submitted topics

    const handleTopicNameChange = (e) => {
        setTopicName(e.target.value);
    };

    const handleTopicSummaryChange = (e) => {
        setTopicSummary(e.target.value);
    };

    const handleSubmission = () => {
        // Validate topic name and summary
        if (topicName.trim() === '' || topicSummary.trim() === '') {
            alert('Please enter both topic name and summary.');
            return;
        }

        // Create a new topic object
        const newTopic = {
            name: topicName,
            summary: topicSummary
        };

        // If editIndex is not null, update the existing topic
        if (editIndex !== null) {
            const updatedTopics = [...topics];
            updatedTopics[editIndex] = newTopic;
            setTopics(updatedTopics);
            setEditIndex(null); // Reset editIndex after editing
        } else {
            // Add the new topic to the topics array
            setTopics([...topics, newTopic]);
        }

        // Clear input fields after submission
        setTopicName('');
        setTopicSummary('');

        // Hide Add component after submission
        setShowAdd(false);
    };

    const handleEditTopic = (index) => {
        const editedTopic = topics[index];
        setTopicName(editedTopic.name);
        setTopicSummary(editedTopic.summary);
        setEditIndex(index);
        setShowAdd(true);
    };

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
                        <div className="container mx-auto py-4">
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-xl font-bold text-black">Add Topic</h1>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="course-title" className="block mb-2 font-medium ">Topic Name</label>
                                    <input 
                                        type="text" 
                                        id="course-title" 
                                        className="w-full border-2 border-gray-300 p-2 rounded-lg" 
                                        value={topicName} 
                                        onChange={handleTopicNameChange} 
                                    />
                                    <p style={{ color: "grey" }}>© Topic titles are displayed publicly wherever required. Each topic may contain one or more lessons, quiz and assignments.</p>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="course-permalink" className="block mb-2 font-medium">Topic Summary</label>
                                    <input 
                                        type="text" 
                                        id="course-permalink" 
                                        className="w-full h-24  border-2 border-gray-300 p-2 rounded-lg" 
                                        value={topicSummary} 
                                        onChange={handleTopicSummaryChange} 
                                    />
                                    <p style={{ color: "grey" }}>© Add a summary of short text to prepare students for the activities for the topic. The text is shown on the course page beside the tooltip beside the topic name.</p>
                                </div>
                                <div className="flex justify-end"> {/* Added flex container for alignment */}
                                    <button className="bg-blue-500 text-white px-5 py-2 rounded-lg mr-2" onClick={handleSubmission}>Submit</button>
                                    <button className="bg-gray-500 text-white px-5 py-2 rounded-lg" onClick={() => setShowAdd(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Display submitted topics */}
            {topics.length > 0 && (
                <div className="container mx-auto p-4">
                    <h2 className="text-xl font-bold mb-2">Submitted Topics</h2>
                    <ol>
                        {topics.map((topic, index) => (
                            <li key={index} className="mb-2">
                                <strong>{index + 1}. {topic.name}</strong>: {topic.summary}
                                <button className="ml-2 bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEditTopic(index)}>Edit</button>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}
