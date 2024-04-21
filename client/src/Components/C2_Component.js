import React, { useState, useEffect } from "react";
import axios from 'axios';
import useMutation from '../hooks/useMutation';
import useQuery from '../hooks/useQuery';

const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png', 'video/mp4'];
const URL = '/media';

const ErrorText = ({ children, ...props }) => (
  <div style={{ fontSize: "lg", color: "red" }} {...props}>
    {children}
  </div>
);

export default function C2() {
  const [activeButton, setActiveButton] = useState("button1");
  const [selectedWebsite, setSelectedWebsite] = useState('YouTube');
  const websites = ['YouTube', 'Twitch', 'Vimeo'];
  const num = 1;
  const [drop, setDrop] = useState();
  const [link, setLink] = useState();
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleWebsiteChange = (e) => {
    setSelectedWebsite(e.target.value);
    setDrop(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const selectedFileNames = selectedFiles.map(file => file.name);
    setFiles(selectedFiles);
    setFileNames(selectedFileNames);
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);

    const updatedFileNames = [...fileNames];
    updatedFileNames.splice(index, 1);
    setFileNames(updatedFileNames);
  };

  useEffect(() => {
    if (drop && link) {
      axios.post('http://localhost:3001/c_2', { num, drop, link })
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
  }, [drop, link]);

  const [refetch, setRefetch] = useState(0);
  const {
    mutate: uploadMedia,
    isLoading: uploadingMedia,
    error: uploadMediaError,
  } = useMutation({ url: URL });

  const {
    data: mediaData = [],
    isLoading: mediaLoading,
    error: fetchError,
  } = useQuery(URL, refetch);

  const handleUpload = async (file, index) => {
    if (!validFileTypes.find(type => type === file.type)) {
      setError('File must be in MP4 format');
      return;
    }

    const form = new FormData();
    form.append('media', file);

    await uploadMedia(form);
    setTimeout(() => {
      setRefetch(s => s + 1);
      removeFile(index); // Remove uploaded file from array
    }, 1000);
  };

  const uploadFilesSequentially = async () => {
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      await handleUpload(files[i], i);
    }
    setTimeout(() => {
      setFiles([]);
      setFileNames([]);
      setUploading(false);
    }, 10000); // Clear array after 10 seconds
  };

  return (
    <div className="bg-gray-100">
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
            <div className="m-4 w-2/4">
              <div className="mb-4">
                <label htmlFor="website" className="block mb-2 ">Select Website</label>
                <select
                  id="website"
                  className="w-full border-2 border-gray-300 p-2 rounded-lg"
                  value={selectedWebsite}
                  onChange={handleWebsiteChange}
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
            <div className="m-4 w-1/2">
              <div className="mb-2">
                <label htmlFor="file" className="block mb-2 font-bold">Add Video File</label>
                <input type="file" id="file" onChange={handleFileChange} className="hidden" multiple />
                <label htmlFor="file" className="cursor-pointer  bg-blue-500 text-white w-1/3 h-10 py-2 px-4 rounded-xl text-lg font-semibold mb-2 flex items-center justify-center">
                  Select File
                </label>
              </div>
              <div className="flex flex-col space-y-2">
                {fileNames.map((fileName, index) => (
                  <div key={index} className="flex items-center justify-between border border-gray-300 p-2 rounded-lg">
                    <div>{fileName}</div>
                    <button onClick={() => removeFile(index)} className="btn bg-red-500 text-white px-3 py-1 rounded-full">Remove</button>
                  </div>
                ))}
              </div>

              <button
                onClick={uploadFilesSequentially}
                className="cursor-pointer  bg-blue-500 text-white w-1/3 h-10 py-2 px-4 rounded-xl text-lg font-semibold mb-2 flex items-center justify-center"
              >
                {uploading ? (
                  <div className="w-6 h-6 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  "Upload"
                )}
              </button>
              {error && <ErrorText>{error}</ErrorText>}
              {uploadMediaError && <ErrorText>{uploadMediaError}</ErrorText>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
