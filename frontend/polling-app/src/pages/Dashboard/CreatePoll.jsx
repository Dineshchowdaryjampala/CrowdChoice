import React, { useContext, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import { POLL_TYPE } from "../../utils/data";
import OptionInput from "../../components/input/OptionInput";
import OptionImageSelector from "../../components/input/OptionImageSelector";
import uploadImage from "../../utils/uploadImage";
import toast from "react-hot-toast";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const CreatePoll = () => {
  useUserAuth();

  const { user, onPollCreateOrDelete } = useContext(UserContext);

  const [pollData, setPollData] = useState({
    question: "",
    type: "",
    options: [],
    imageOptions: [],
    error: "",
  });

  const handleValueChange = (key, value) => {
    setPollData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearData = () => {
    setPollData({ question: "", type: "", options: [], imageOptions: [], error: "" });
  };

  const updateImageAndGetLink = async (imageOptions) => {
    const optionPromises = imageOptions.map(async (imageOption) => {
      try {
        const imgUploadRes = await uploadImage(imageOption.file);
        return imgUploadRes.imageUrl || "";
      } catch (error) {
        toast.error(`Error uploading image: ${imageOption.file.name}`);
        return "";
      }
    });

    return await Promise.all(optionPromises);
  };

  const getOptions = async () => {
    return pollData.type === "image-based"
      ? await updateImageAndGetLink(pollData.imageOptions)
      : pollData.options;
  };

  const handleCreatePoll = async () => {
    if (!pollData.question || !pollData.type) {
      handleValueChange("error", "Question & Type are required");
      return;
    }

    if (
      (pollData.type === "single-choice" && pollData.options.length < 2) ||
      (pollData.type === "image-based" && pollData.imageOptions.length < 2)
    ) {
      handleValueChange("error", "Enter at least two options");
      return;
    }

    handleValueChange("error", "");

    const optionData = await getOptions();

    try {
      const response = await axiosInstance.post(API_PATHS.POLLS.CREATE, {
        question: pollData.question,
        type: pollData.type,
        options: optionData,
        creatorId: user._id,
      });

      if (response) {
        toast.success("Poll Created Successfully!");
        onPollCreateOrDelete();
        clearData();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
      handleValueChange("error", errorMessage);
    }
  };

  return (
    <DashboardLayout activeMenu="Create Poll">
      <div className="bg-white shadow-lg rounded-lg p-10 mx-auto w-full md:w-3/4 lg:w-2/3 border border-blue-300">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6">Create a New Poll</h2>

        <label className="text-sm font-medium text-gray-700">Question</label>
        <textarea
          placeholder="What's on your mind?"
          className="w-full p-4 mt-2 text-gray-900 border rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          value={pollData.question}
          onChange={({ target }) => handleValueChange("question", target.value)}
        />

        <label className="text-sm font-medium text-gray-700 mt-6 block">Poll Type</label>
        <div className="flex gap-3 flex-wrap mt-2">
          {POLL_TYPE.map((item) => (
            <div
              key={item.value}
              className={`cursor-pointer px-5 py-3 rounded-md text-sm font-medium border transition-all ${
                pollData.type === item.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-blue-300 text-blue-600 hover:bg-blue-100"
              }`}
              onClick={() => handleValueChange("type", item.value)}
            >
              {item.label}
            </div>
          ))}
        </div>

        {pollData.type === "single-choice" && (
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">Options</label>
            <OptionInput optionList={pollData.options} setOptionList={(value) => handleValueChange("options", value)} />
          </div>
        )}

        {pollData.type === "image-based" && (
          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700">Image Options</label>
            <OptionImageSelector imageList={pollData.imageOptions} setImageList={(value) => handleValueChange("imageOptions", value)} />
          </div>
        )}

        {pollData.error && <p className="text-sm text-red-500 mt-4">{pollData.error}</p>}

        <button className="w-full mt-8 bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition-all" onClick={handleCreatePoll}>
          Create Poll
        </button>
      </div>
    </DashboardLayout>
  );
};

export default CreatePoll;
