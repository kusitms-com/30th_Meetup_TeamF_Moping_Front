"use client";

import React, { useState } from "react";

interface EventNameInputProps {
  className?: string;
}

const EventNameInput: React.FC<EventNameInputProps> = ({ className }) => {
  const [eventName, setEventName] = useState(""); // Input starts empty
  const [isInputActive, setIsInputActive] = useState(false); // Track if input is active
  const [isInputCompleted, setIsInputCompleted] = useState(false); // Track if input is completed

  const handleClear = () => {
    setEventName(""); // Clear the input when the X button is clicked
    setIsInputActive(false); // Reset input activation state
    setIsInputCompleted(false); // Reset the input completion state
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
    if (!isInputActive) {
      setIsInputActive(true); // Activate input when user starts typing
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default form submission or other behaviors
      setIsInputCompleted(true); // Mark the input as completed when Enter is pressed
      setIsInputActive(false); // Deactivate the input after completion
    }
  };

  return (
    <div
      className={`w-[328px] h-14 p-4 rounded-lg flex items-center bg-[#f7f7f7] ${className}`}
    >
      <input
        type="text"
        value={eventName}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Detect Enter key press
        placeholder="10.13 모임"
        maxLength={20} // Limit to 20 characters
        className="bg-transparent border-none grow shrink basis-0 text-[#2c2c2c] text-base font-medium font-['Pretendard'] leading-normal outline-none flex-1"
      />

      {eventName && (
        <button onClick={handleClear} className="ml-2">
          <img
            src="/images/Cancel.svg" // Cancel 아이콘으로 대체
            alt="Clear input"
            className="w-6 h-6"
          />
        </button>
      )}
    </div>
  );
};

export default EventNameInput;
