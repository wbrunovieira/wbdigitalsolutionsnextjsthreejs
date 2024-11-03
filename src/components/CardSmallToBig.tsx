import Image from "next/image";

interface CardProps {
    // index: number;
    name: string;
    subTitle: string;
    description: string;
    image: string;
    // className?: string;
}

const CardSmallToBig = ({ name, description, image,subTitle }: CardProps) => {
    return (
        <div className="duration-300 font-mono text-white group cursor-pointer relative overflow-hidden bg-primary w-48 h-96  rounded-3xl p-4 hover:w-56 hover:bg-custom-purple">
            <h3 className="text-xl text-center">{name}</h3>
            <div className="gap-4 relative">
                {/* <svg
                    viewBox="0 0 64 64"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-20 scale-[110%]"
                >
                    <defs>
                        <linearGradient
                            gradientUnits="userSpaceOnUse"
                            y2="28.33"
                            y1="19.67"
                            x2="21.5"
                            x1="16.5"
                            id="b"
                        >
                            <stop stopColor="#fbbf24" offset={0} />
                            <stop stopColor="#fbbf24" offset=".45" />
                            <stop stopColor="#f59e0b" offset={1} />
                        </linearGradient>
                        <linearGradient
                            gradientUnits="userSpaceOnUse"
                            y2="50.8"
                            y1="21.96"
                            x2="39.2"
                            x1="22.56"
                            id="c"
                        >
                            <stop stopColor="#f3f7fe" offset={0} />
                            <stop stopColor="#f3f7fe" offset=".45" />
                            <stop stopColor="#deeafb" offset={1} />
                        </linearGradient>
                        <linearGradient
                            gradientUnits="userSpaceOnUse"
                            y2="48.05"
                            y1="42.95"
                            x2="25.47"
                            x1="22.53"
                            id="a"
                        >
                            <stop stopColor="#4286ee" offset={0} />
                            <stop stopColor="#4286ee" offset=".45" />
                            <stop stopColor="#0950bc" offset={1} />
                        </linearGradient>
                        <linearGradient
                            xlinkHref="#a"
                            y2="48.05"
                            y1="42.95"
                            x2="32.47"
                            x1="29.53"
                            id="d"
                        />
                        <linearGradient
                            xlinkHref="#a"
                            y2="48.05"
                            y1="42.95"
                            x2="39.47"
                            x1="36.53"
                            id="e"
                        />
                    </defs>
                    <circle
                        strokeWidth=".5"
                        strokeMiterlimit={10}
                        stroke="#f8af18"
                        fill="url(#b)"
                        r={5}
                        cy={24}
                        cx={19}
                    />
                    <path
                        d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17"
                        strokeWidth={2}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        stroke="#fbbf24"
                        fill="none"
                    >
                        <animateTransform
                            values="0 19 24; 360 19 24"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="45s"
                            attributeName="transform"
                        />
                    </path>
                    <path
                        d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"
                        strokeWidth=".5"
                        strokeMiterlimit={10}
                        stroke="#e6effc"
                        fill="url(#c)"
                    />
                    <path
                        d="M24.39 43.03l-.78 4.94"
                        strokeWidth={2}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        stroke="url(#a)"
                        fill="none"
                    >
                        <animateTransform
                            values="1 -5; -2 10"
                            type="translate"
                            repeatCount="indefinite"
                            dur="0.7s"
                            attributeName="transform"
                        />
                    </path>
                    <path
                        d="M31.39 43.03l-.78 4.94"
                        strokeWidth={2}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        stroke="url(#d)"
                        fill="none"
                    >
                        <animateTransform
                            values="1 -5; -2 10"
                            type="translate"
                            repeatCount="indefinite"
                            dur="0.7s"
                            begin="-0.4s"
                            attributeName="transform"
                        />
                    </path>
                    <path
                        d="M38.39 43.03l-.78 4.94"
                        strokeWidth={2}
                        strokeMiterlimit={10}
                        strokeLinecap="round"
                        stroke="url(#e)"
                        fill="none"
                    >
                        <animateTransform
                            values="1 -5; -2 10"
                            type="translate"
                            repeatCount="indefinite"
                            dur="0.7s"
                            begin="-0.2s"
                            attributeName="transform"
                        />
                    </path>
                </svg> */}
                <Image
                    src={image}
                    width={200}
                    height={400}
                    alt="project_image"
                    className="w-full h-full object-fit rounded-xl"
                />

                <h4 className="font-sans duration-300 absolute left-1/2 -translate-x-1/2 text-sm text-center group-hover:translate-x-8 group-hover:-translate-y-16 group-hover:scale-150">
                   {subTitle}
                </h4>
            </div>
            <div className="absolute duration-300 -left-32 mt-2 group-hover:left-10">
                <p className="text-sm"> {description}</p>
                <p className="text-sm">50% humidity</p>
            </div>
        </div>
    );
};

export default CardSmallToBig;
