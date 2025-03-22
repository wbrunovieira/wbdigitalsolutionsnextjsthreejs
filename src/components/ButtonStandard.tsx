import React, { useState } from "react";

interface ButtonStandardProps {
  buttonText: string;
  type?: "button" | "submit" | "reset";
}

const ButtonStandard: React.FC<ButtonStandardProps> = ({
  buttonText,
  type = "submit",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type={type}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex justify-center gap-2 items-center shadow-xl text-md text-primary bg-yellowcustom backdrop-blur-md lg:font-semibold isolation-auto px-4 py-1 overflow-hidden border-2 rounded-lg whitespace-nowrap min-w-[180px] h-12"
    >
      {buttonText}
      <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-700 transition-all duration-300 group-hover:border-none group-hover:bg-gray-50">
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isHovered ? "rotate-90" : "rotate-45"
          }`}
          viewBox="0 0 16 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            className="fill-primary"
          />
        </svg>
      </div>
    </button>
  );
};

export default ButtonStandard;