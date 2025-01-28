import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaChartLine,
  FaLightbulb,
  FaUserCheck,
  FaShieldAlt,
  FaMoneyBill,
  FaRobot,
  FaEye,
  FaCog,
  FaCheckCircle,
  FaCalendarCheck,
} from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

gsap.registerPlugin(ScrollTrigger);

interface MLService {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const iconMapper: Record<string, React.ReactNode> = {
  "FaChartLine": <FaChartLine className="text-xl text-blue-400" />,
  "FaLightbulb": <FaLightbulb className="text-xl text-yellow-400" />,
  "FaUserCheck": <FaUserCheck className="text-xl text-green-400" />,
  "FaShieldAlt": <FaShieldAlt className="text-xl text-red-400" />,
  "FaMoneyBill": <FaMoneyBill className="text-xl text-green-500" />,
  "FaRobot": <FaRobot className="text-xl text-indigo-400" />,
  "FaEye": <FaEye className="text-xl text-purple-400" />,
  "FaCog": <FaCog className="text-xl text-gray-300" />,
  "FaCheckCircle": <FaCheckCircle className="text-xl text-green-300" />,
  "FaCalendarCheck": <FaCalendarCheck className="text-xl text-blue-300" />,
};

const MachineLearningServices: React.FC = () => {
  const { language } = useLanguage();
  const currentMessages = useTranslations();

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );


      servicesRef.current.forEach((service, index) => {
        if (!service) return;
        gsap.fromTo(
          service,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: service,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  const mlServices: MLService[] = currentMessages.mlServices.map((service: any) => {
    return {
      title: service.title,
      description: service.description,
      icon: iconMapper[service.icon] || <FaChartLine className="text-xl text-blue-400" />,
    };
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-custom-gradient text-white py-20 px-6 mt-32"
      aria-labelledby="ml-services-title"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="ml-services-title"
          ref={titleRef}
          className="text-4xl sm:text-5xl font-bold mb-8 text-center"
        >
          {currentMessages.mlServicesTitle}
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          {currentMessages.mlServicesSubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {mlServices.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                servicesRef.current[index] = el;
              }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <div className="p-4 bg-primary rounded-full">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {service.title}
                </h3>
                <p className="text-primary text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachineLearningServices;