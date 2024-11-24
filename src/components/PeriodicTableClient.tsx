"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, PerspectiveCamera } from "@react-three/drei";
import { useSpring, animated as a3 } from "@react-spring/three";
import { useSpring as useWebSpring, animated } from "@react-spring/web";
import * as THREE from "three";


type Direction = "up" | "down" | "left" | "right" | "forward" | "backward";

interface BaseElementData {
    id: string;
    title: string;
    position?: [number, number, number];
}

interface VideoElementData extends BaseElementData {
    type: "video";
    videoUrl: string;
    description?: string;
}

interface CardElementData extends BaseElementData {
    type: "card";
    content: string;
    imageUrl?: string;
}

interface TextElementData extends BaseElementData {
    type: "text";
    content: string;
}

interface ImageElementData extends BaseElementData {
    type: "image";
    imageUrl: string;
    altText?: string;
}

interface LinkElementData extends BaseElementData {
    type: "link";
    url: string;
    text: string;
}

type ElementData =
    | VideoElementData
    | CardElementData
    | ImageElementData
    | TextElementData
    | LinkElementData;

type LayoutType = "tabela" | "esfera" | "hélice" | "grade";

interface SceneProps {
    layout: LayoutType;
    cameraRef: React.MutableRefObject<THREE.PerspectiveCamera | null>;
    onElementClick: (
        data: ElementData,
        position: { x: number; y: number }
    ) => void;
}

interface ElementProps {
    data: ElementData;
    layout: LayoutType;
    index: number;
    onClick: (data: ElementData, position: { x: number; y: number }) => void;
}

interface ModalProps {
    data: ElementData;
    onClose: () => void;
    elementPosition: { x: number; y: number } | null;
}

const elements: ElementData[] = [
    {
        id: "video-apresentacao",
        title: "WB Web",
        type: "card",
        content: "Sistema para Lojas, Industrias, Servicos em Geral.",
    },
    {
        id: "video-apresentacao",
        title: "Vídeo WB Web",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/up7kmO4Ys5M",
        description: "Vídeo de apresentação WB Web.",
    },
    {
        id: "site-topicos",
        title: "Site - Tópicos",
        type: "card",
        content: `Benefícios de um Website Personalizado
O Poder de UI/UX
A Vantagem de Código
Alcance o Topo com o SEO
O Poder do Copywriting
Conteúdo Engajador e Persuasivo
Blog: Aumente Tráfego e Autoridade
Landing Pages que Convertem
Portais Digitais de Alto Desempenho
Desenvolvimento Rápido e Eficiente
Melhorias Frequentes
Design Pensado no Cliente
Qualidade
Suporte
Tecnologia, Hospedagem e Atualizações`,
    },
    {
        id: "catalogo-download",
        title: "Catálogo - Download",
        type: "card",
        content: "Download\nCatálogo Sites",
        imageUrl: "path_to_catalog_image",
    },
    {
        id: "websites-personalizados",
        title: "Websites Personalizados de Ponta para o Seu Negócio",
        type: "card",
        content: `Somos especialistas em criar websites totalmente customizados com tecnologia de ponta e designs modernos. Entregamos sites exclusivos para impulsionar os seus resultados online.

Na WB Digital Solutions, desenvolvemos websites 100% personalizados para atender às necessidades únicas do seu negócio. Nossa equipe utiliza as tecnologias mais recentes como NodeJS e React para criar sites rápidos, seguros e com uma experiência incrível para os usuários.

Confie em nós para potencializar a presença digital da sua empresa.`,
    },
    {
        id: "beneficios-website",
        title: "Benefícios de um Website Personalizado",
        type: "card",
        content: `- Layout moderno e adequado à sua marca
- Site otimizado para buscadores, aumentando seu alcance
- Carregamento rápido, melhorando a experiência do usuário
- Design responsivo para todos aparelhos - desktop, mobile, etc.
- Segurança reforçada contra hacking e vazamento de dados
- Suporte contínuo da nossa equipe especializada
- Tecnologia de ponta para sites sofisticados
- Projeto 100% exclusivo criado do zero só para sua empresa
- Aumento de vendas e conversões online
- Qualidade superior, destacando você da concorrência`,
    },
    {
        id: "poder-ui-ux",
        title: "Transforme Seu Site em um Sucesso: O Poder de UI/UX",
        type: "card",
        content: `Por que investir em UI/UX é essencial para o sucesso do seu site

Um site bem-sucedido hoje depende de uma interface (UI) intuitiva e agradável, junto com uma experiência de usuário (UX) de alta qualidade. Os usuários online estão mais exigentes do que nunca, e um site com navegação confusa simplesmente afasta visitantes.

Um design moderno, alinhado à sua marca, inspira confiança e profissionalismo, mantendo os visitantes interessados. Uma experiência de uso eficiente também aumenta o tempo gasto no site, tornando mais provável que os visitantes se convertam em leads ou clientes.

Investir em UI e UX superiores é a chave para destacar seu site na concorrência. Essa abordagem diferenciada conquista e envolve os usuários de forma mais eficaz, gerando resultados positivos para sua pequena ou média empresa.

Na WB Digital Solutions, estamos aqui para transformar sua presença online em um sucesso notável.`,
    },
    {
        id: "vantagem-codigo",
        title: "Sites Personalizados: A Vantagem de Código Sobre Templates Prontos",
        type: "card",
        content: `Por que investir em um site feito sob medida pode impulsionar o seu negócio online

Quando se trata de criar uma presença online eficaz, a escolha entre usar templates prontos e investir em um site personalizado é crucial. Na WB Digital Solutions, desenvolvemos sites do zero, garantindo um desempenho superior, carregamento rápido e maior segurança. Além disso, sites personalizados são otimizados para SEO, melhorando a visibilidade nos mecanismos de busca.

Outro benefício fundamental é a liberdade no design, permitindo que sua marca se destaque e atenda às necessidades do seu público. A segurança é prioridade, com camadas adicionais de proteção contra ameaças cibernéticas. Em resumo, um site personalizado oferece desempenho, segurança e flexibilidade superiores em relação aos templates prontos, garantindo que sua presença online seja única, eficaz e segura.

Vamos transformar sua visão em realidade digital!`,
    },
    {
        id: "alcance-seo",
        title: "Alcance o Topo com o SEO",
        type: "card",
        content: `Você já ouviu falar em SEO? Trata-se de otimizar seu site para aparecer nos primeiros resultados do Google.

Na WB Digital Solutions, nossa equipe aplica estratégias avançadas de SEO desde o início do desenvolvimento do seu site. Isso significa que seu site será facilmente encontrado por clientes em potencial, aumentando o tráfego e as vendas.

Vamos trabalhar juntos para garantir que sua presença online seja notada pelos mecanismos de busca e pelos seus futuros clientes.`,
    },
    {
        id: "poder-copywriting",
        title: "O Poder do Copywriting",
        type: "card",
        content: `Copywriting é a arte de criar textos persuasivos que conquistam. Na WB Digital Solutions, nossa equipe de copywriters trabalha para criar conteúdo envolvente que transforma visitantes em clientes e transmite sua mensagem com clareza e persuasão.

Vamos criar uma narrativa poderosa para o seu site, garantindo o sucesso online que você deseja.`,
    },

    {
        id: "contato_2",
        title: "CONTATE",
        type: "card",
        content: `Não perca mais tempo. Mande já uma mensagem.
O seu novo site espera por você!

Agende uma reunião.`,
    },
    {
        id: "formulario-contato",
        title: "Formulário de Contato",
        type: "card",
        content: `Seu Nome
Seu Email
Seu Telefone
Assunto
Mensagem`,
    },
    {
        id: "newsletter",
        title: "Increva-se em nossa Newsletter",
        type: "card",
        content: "Digite o seu e-mail",
    },
    {
        id: "rodape",
        title: "WB Digital Solutions",
        type: "card",
        content: `O seu parceiro ideal para tecnologia e marketing digital

Brasil: +55 11 5026-4203
Portugal: +351 30 880 8015
contato@wbdigitalsolutions.com`,
    },
    {
        id: "blogs-recentes",
        title: "Blogs Recentes",
        type: "card",
        content: `27 de out, 2023
Por que eu ainda preciso de um site?

06 de out, 2023
Como o Sistema de Gestão Transforma Empresas`,
    },
    {
        id: "direitos-reservados",
        title: "Direitos Reservados",
        type: "text",
        content: "©WBDIGITALSOLUTIONS | Todos os direitos reservados.",
    },
];

const Element: React.FC<ElementProps> = ({ data, layout, index, onClick }) => {
    const [hovered, setHovered] = useState(false);
    const groupRef = useRef<THREE.Group>(null);

    const { pos } = useSpring({
        pos: data.position || [0, 0, 0],
        config: { mass: 1, tension: 170, friction: 26 },
        delay: index * 50,
    });

    useFrame(({ camera }) => {
        if (groupRef.current) {
            groupRef.current.lookAt(camera.position);
        }
    });

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const elementPosition = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };
        console.log("Posição do elemento clicado:", elementPosition);
        onClick(data, elementPosition);
    };

    return (
        <a3.group
            ref={groupRef}
            position={pos as any}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Html
                transform
                distanceFactor={4}
                position={[0, 0, 0]}
                center
                style={{
                    transition: "transform 0.3s ease",
                    opacity: 1,
                    transform: `scale(${hovered ? 1.1 : 1})`,
                    zIndex: 1,
                    cursor: "pointer",
                    pointerEvents: "auto",
                }}
            >
                <div
                    className="p-2 w-60 h-60 flex flex-col justify-center items-center rounded-lg shadow-lg bg-white overflow-hidden hover:scale-110 transition duration-300 ease-in-out "
                    onClick={handleClick}
                >
                    <h3 className="text-lg font-semibold text-center mb-2 truncate p-2">
                        {data.title}
                    </h3>
                    <div className="w-full h-full flex items-center justify-center overflow-y-auto">
                        {(() => {
                            switch (data.type) {
                                case "video":
                                    return (
                                        <iframe
                                            className="w-full h-full rounded"
                                            src={data.videoUrl}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    );
                                case "image":
                                    return (
                                        <img
                                            className="w-full h-full object-cover rounded"
                                            src={data.imageUrl}
                                            alt={data.altText || data.title}
                                        />
                                    );
                                case "card":
                                    return (
                                        <div className="text-sm text-center overflow-hidden text-ellipsis p-2 line-clamp-5">
                                            <p>{data.content}</p>
                                        </div>
                                    );
                                case "link":
                                    return (
                                        <a
                                            href={data.url}
                                            className="text-blue-500 underline text-center truncate"
                                        >
                                            {data.text}
                                        </a>
                                    );
                                default:
                                    return null;
                            }
                        })()}
                    </div>
                </div>
            </Html>
        </a3.group>
    );
};

const getPosition = (
    index: number,
    layout: LayoutType
): [number, number, number] => {
    switch (layout) {
        case "tabela":
            const columns = 5;
            const spacing = 4;
            const x = (index % columns) * spacing - (columns * spacing) / 2;
            const y = -Math.floor(index / columns) * spacing + 5;
            const z = 0;
            return [x, y, z];
        case "esfera": {
            const phi = Math.acos(-1 + (2 * index) / elements.length);
            const theta = Math.sqrt(elements.length * Math.PI) * phi;
            return [
                15 * Math.cos(theta) * Math.sin(phi),
                15 * Math.sin(theta) * Math.sin(phi),
                15 * Math.cos(phi),
            ];
        }
        case "hélice": {
            const theta = index * 0.175 + Math.PI;
            const y = -(index * 2) + 20;
            return [20 * Math.cos(theta), y, 20 * Math.sin(theta)];
        }
        case "grade": {
            const columnsGrid = 5;
            const spacingGrid = 10;
            const xGrid = (index % columnsGrid) * spacingGrid - 2;
            const yGrid = -Math.floor(index / columnsGrid) * spacingGrid + 2;
            const zGrid =
                Math.floor(index / (columnsGrid * columnsGrid)) * 20 - 40;
            return [xGrid, yGrid, zGrid];
        }
        default:
            return [0, 0, 0];
    }
};

const Scene: React.FC<SceneProps> = ({ layout, cameraRef, onElementClick }) => {
    return (
        <>
            <PerspectiveCamera
                ref={cameraRef}
                makeDefault
                position={[0, 0, 12]}
                fov={50}
            />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />

            {elements.map((data, index) => (
                <Element
                    key={data.id}
                    data={{
                        ...data,
                        position: getPosition(index, layout),
                    }}
                    layout={layout}
                    index={index}
                    onClick={onElementClick}
                />
            ))}

            <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={5}
                maxDistance={500}
            />
        </>
    );
};

const Modal: React.FC<ModalProps> = ({ data, onClose, elementPosition }) => {
    const overlaySpring = useWebSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { tension: 280, friction: 60 },
    });

    const modalSpring = useWebSpring({
        from: {
            opacity: 0,
            transform: elementPosition
                ? `translate(${elementPosition.x - window.innerWidth / 2 - 150
                }px, ${elementPosition.y - window.innerHeight / 2 - 100
                }px) scale(0.5)`
                : "translate(-50%, -50%) scale(0.5)",
        },
        to: {
            opacity: 1,
            transform: "translate(-50%, -50%) scale(1)",
        },
        config: {
            mass: 1,
            tension: 200,
            friction: 26,
        },
        onStart: () => {
            if (elementPosition) {
                const initialX =
                    elementPosition.x - window.innerWidth / 2 - 150;
                const initialY =
                    elementPosition.y - window.innerHeight / 2 - 100;

                console.log(
                    "Posição inicial ajustada para a animação do modal (com offset):",
                    {
                        x: initialX,
                        y: initialY,
                    }
                );
            } else {
                console.log(
                    "Posição inicial da animação do modal não disponível"
                );
            }
        },
    });

    return (
        <animated.div
            style={{
                ...overlaySpring,
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <animated.div
                style={{
                    ...modalSpring,
                    position: "fixed",
                    left: "50%",
                    top: "50%",
                    backgroundColor: "#1a1a1a",
                    padding: "20rem",
                    borderRadius: "0.5rem",
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    overflow: "auto",
                }}
                onClick={(e) => e.stopPropagation()}
                className="bg-custom-gradient"
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white text-2xl focus:outline-none p-2"
                >
                    ✕
                </button>

                <h2 className="text-xl text-white font-semibold mb-4">
                    {data.title}
                </h2>

                {data.type === "video" && (
                    <iframe
                        width="560"
                        height="315"
                        src={data.videoUrl}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="rounded-lg shadow-lg"
                    />
                )}

                {data.type === "link" && (
                    <a href={data.url} className="text-blue-500 underline">
                        {data.text}
                    </a>
                )}

                {data.type === "card" && (
                    <p className="text-white mt-4">{data.content}</p>
                )}

                {data.type === "image" && (
                    <img
                        src={data.imageUrl}
                        alt={data.altText || data.title}
                        className="rounded-lg shadow-lg mt-4"
                    />
                )}

                {data.type === "text" && (
                    <p className="text-white mt-4">{data.content}</p>
                )}
            </animated.div>
        </animated.div>
    );
};

const PeriodicTableClient = () => {
    const [layout, setLayout] = useState<LayoutType>("tabela");
    const [selectedElement, setSelectedElement] = useState<ElementData | null>(
        null
    );
    const [elementPosition, setElementPosition] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

    const handleElementClick = (
        data: ElementData,
        position: { x: number; y: number }
    ) => {
        setElementPosition(position);
        setSelectedElement(data);
    };

    const closeModal = () => {
        setSelectedElement(null);
        setElementPosition(null);
    };

    return (
        <div className="bg-transparent w-full flex flex-col items-center justify-center ">
            <div className="flex flex-col p-2 justify-center z-50 border bg-transparent rounded-md w-1/4 mx-auto">
                <div className="flex bg-transparent items-center justify-center gap-2 mt-4 ">
                    <p className="text-white font-thin text-xs">
                        Escolha a disposição dos Cartões
                    </p>
                </div>
                <div className="flex items-center justify-center gap-2">
                    {(
                        ["tabela", "esfera", "hélice", "grade"] as LayoutType[]
                    ).map((l) => (
                        <button
                            key={l}
                            onClick={() => setLayout(l)}
                            className={`
                                mt-2 px-2 py-1 text-white border border-secondary rounded capitalize
                                transition-colors hover:bg-primary transition duration-300 ease-in-out
                                 z-[1001]
                                ${layout === l
                                    ? "bg-yellowcustom"
                                    : "bg-transparent"
                                }
                            `}
                        >
                            {l}
                        </button>
                    ))}
                </div>
            </div>

            <div
                className="w-full h-screen flex items-center justify-center"
                style={{ zIndex: 910 }}
            >
                <Canvas className="top-0 left-0 w-full h-full z-40">
                    <Scene
                        layout={layout}
                        cameraRef={cameraRef}
                        onElementClick={handleElementClick}
                    />
                </Canvas>

                {selectedElement && (
                    <Modal
                        data={selectedElement}
                        onClose={closeModal}
                        elementPosition={elementPosition}
                    />
                )}
            </div>
        </div>
    );
};

export default PeriodicTableClient;
