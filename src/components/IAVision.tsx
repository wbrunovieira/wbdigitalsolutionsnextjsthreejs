import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaSearch,
  FaEye,
  FaFileAlt,
  FaLock,
  FaCar,
  FaQrcode,
  FaCogs,
  FaUsers,
  FaStore,
  FaRobot,
} from "react-icons/fa";

// Ativando o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface VisionOption {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Lista de opções de Visão Computacional
const visionOptions: VisionOption[] = [
  {
    title: "Detecção e Classificação de Objetos",
    description:
      "Identifique e categorize produtos, peças ou até mesmo pessoas em imagens e vídeos, aumentando a precisão e reduzindo erros.",
    icon: <FaSearch className="text-4xl text-blue-400" />,
  },
  {
    title: "Controle de Qualidade Automatizado",
    description:
      "Analise defeitos e falhas em linhas de produção, garantindo maior consistência e evitando desperdícios.",
    icon: <FaEye className="text-4xl text-green-400" />,
  },
  {
    title: "Leitura e Análise de Documentos (OCR)",
    description:
      "Transforme papéis em dados digitais, agilizando processos de cadastro e reduzindo custos com digitação manual.",
    icon: <FaFileAlt className="text-4xl text-yellow-400" />,
  },
  {
    title: "Análise de Câmeras de Segurança",
    description:
      "Monitore ambientes em tempo real, detecte comportamentos suspeitos e garanta a segurança do seu negócio.",
    icon: <FaLock className="text-4xl text-red-400" />,
  },
  {
    title: "Rastreamento de Objetos",
    description:
      "Acompanhe movimentações de veículos, produtos ou pessoas, melhorando a gestão de ativos e otimizando rotas.",
    icon: <FaCar className="text-4xl text-indigo-400" />,
  },
  {
    title: "Reconhecimento Facial e Biometria",
    description:
      "Automatize controle de acesso, personalize experiências e crie processos mais seguros com tecnologia biométrica.",
    icon: <FaRobot className="text-4xl text-purple-400" />,
  },
  {
    title: "Análise de Comportamento em Ambiente de Varejo",
    description:
      "Mapeie deslocamento de clientes, identifique pontos de maior interesse e otimize o layout de suas lojas.",
    icon: <FaStore className="text-4xl text-pink-400" />,
  },
  {
    title: "Monitoramento de Filas e Engarrafamentos",
    description:
      "Estime tempos de espera, detecte congestionamentos e melhore a experiência em serviços e no trânsito.",
    icon: <FaUsers className="text-4xl text-blue-300" />,
  },
  {
    title: "Gestão de Estoque e Logística",
    description:
      "Identifique paletes, rastreie produtos e otimize toda a cadeia de suprimentos, do armazém ao transporte.",
    icon: <FaQrcode className="text-4xl text-gray-300" />,
  },
  {
    title: "Processos Industriais e Robótica",
    description:
      "Guie braços robóticos, monitore linhas de produção e aumente a segurança operacional com análise de imagens.",
    icon: <FaCogs className="text-4xl text-green-500" />,
  },
];

const VisionComputationalSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animação do título
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
          },
        }
      );

      // Animação dos cards
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-6 bg-custom-purple text-white"
      aria-labelledby="vision-computational-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="vision-computational-heading"
          ref={headingRef}
          className="text-4xl sm:text-5xl font-extrabold mb-8 text-center text-white"
        >
          Soluções de Visão Computacional
        </h2>
        <p className="text-yellowcustom text-center max-w-2xl mx-auto mb-12">
          Extraia informações valiosas de imagens e vídeos, automatizando processos, reduzindo custos e aumentando a eficiência.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visionOptions.map((option, index) => (
            <div
              key={index}
               ref={(el) => {
    cardRefs.current[index] = el; 
  }}
              className="rounded-2xl shadow-md bg-primary hover:bg-primary/80 transition-colors duration-300 p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4 transform group-hover:scale-110 transition duration-300">
                {option.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{option.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionComputationalSection;