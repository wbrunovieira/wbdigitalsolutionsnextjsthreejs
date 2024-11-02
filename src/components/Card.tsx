import { motion } from "framer-motion";

import { fadeIn, textVariant } from "../utils/motion";
import Image from "next/image";

interface CardProps {
    index: number;
    name: string;
    description: string;
    image: string;
    className?: string;
}

const Card = ({ index, name, description, image, className }: CardProps) => {
    return (
        <motion.div
            variants={fadeIn("up", "spring", index * 0.5, 0.75)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl shadow-lg ${className}`}
        >
            <div className="bg-primary p-5 rounded-2xl sm:w-[300px] w-full mt-6 ml-6">
                <div className="relative w-full h-[230px]">
                    <Image
                        src={image}
                        width={100}
                        height={300}
                        alt="project_image"
                        className="w-full h-full object-fit rounded-xl"
                    />

                    <div className="absolute inset-0 flex justify-end m-3 card-img_hover"></div>
                </div>

                <div className="mt-5">
                    <h3 className="text-white font-bold text-[24px]">{name}</h3>
                    <p className="mt-2 text-secondary text-[14px]">
                        {description}
                    </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2"></div>
            </div>
        </motion.div>
    );
};

export default Card;
