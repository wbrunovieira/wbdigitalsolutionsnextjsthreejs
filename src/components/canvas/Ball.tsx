import { motion } from "framer-motion";
import Image from "next/image";

type BallCanvasProps = {
    icon: string;
    index?: number;
};

const BallCanvas = ({ icon, index = 0 }: BallCanvasProps) => (
    <motion.div
        className="relative w-full h-full rounded-full flex items-center justify-center cursor-pointer select-none overflow-hidden"
        style={{
            background:
                "radial-gradient(circle at 38% 30%, #e9d5ff, #7c3aed 38%, #350545 68%, #150222 92%)",
            boxShadow:
                "5px 8px 22px rgba(0,0,0,0.7), 0 0 14px rgba(121,41,144,0.2)",
        }}
        animate={{ y: [0, -9, 0] }}
        transition={{
            duration: 2.2 + (index % 5) * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.13,
        }}
        whileHover={{
            scale: 1.14,
            boxShadow:
                "5px 8px 28px rgba(0,0,0,0.8), 0 0 36px rgba(168,85,247,0.55)",
            transition: { duration: 0.22 },
        }}
        whileTap={{ scale: 0.93 }}
    >
        {/* Specular highlight — faz a esfera parecer polida/3D */}
        <div
            className="absolute rounded-full pointer-events-none"
            style={{
                top: "13%",
                left: "19%",
                width: "30%",
                height: "22%",
                background:
                    "radial-gradient(ellipse, rgba(255,255,255,0.52) 0%, transparent 80%)",
            }}
        />
        <div
            className="relative z-10 w-[48%] h-[48%]"
            style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.65))" }}
        >
            <Image
                src={icon}
                alt=""
                fill
                className="object-contain"
                loading="lazy"
                unoptimized
            />
        </div>
    </motion.div>
);

export default BallCanvas;
