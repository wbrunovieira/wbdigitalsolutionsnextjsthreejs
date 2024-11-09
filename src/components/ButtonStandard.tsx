interface ButtonStandardProps {
    buttonText: string;
}

const ButtonStandard: React.FC<ButtonStandardProps> = ({ buttonText }) => {
    return (
        <button
            type="submit"
            className="flex justify-center gap-2 items-center shadow-xl text-md  text-primary bg-yellowcustom backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-lg before:bg-custom-purple hover:text-secondary before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-1 overflow-hidden border-2 rounded-lg group whitespace-nowrap min-w-[180px] h-12"
        >
            {buttonText}
            <svg
                className="w-6 h-6 ml-2 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-white ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45 whitespace-nowrap"
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-primary group-hover:fill-primary"
                />
            </svg>
        </button>
    );
};

export default ButtonStandard;
