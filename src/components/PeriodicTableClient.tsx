"use client";

import React, {  useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, PerspectiveCamera } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

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

type LayoutType = "table" | "sphere" | "helix" | "grid";


interface ElementProps {
    data: ElementData;
    layout: LayoutType;
    index: number;
    onClick?: () => void;
}


const elements: ElementData[] = [
    {
        id: "home",
        title: "Home",
        type: "link",
        url: "#home", 
        text: "Home",
    },
    {
        id: "sistemas",
        title: "Sistemas",
        type: "link",
        url: "#sistemas",
        text: "Sistemas",
    },
    {
        id: "sites",
        title: "Sites",
        type: "link",
        url: "#sites",
        text: "Sites",
    },
    {
        id: "marketing-digital",
        title: "Marketing Digital",
        type: "link",
        url: "#marketing-digital",
        text: "Marketing Digital",
    },
    {
        id: "clientes",
        title: "Clientes",
        type: "link",
        url: "#clientes",
        text: "Clientes",
    },
    {
        id: "blog",
        title: "Blog",
        type: "link",
        url: "#blog",
        text: "Blog",
    },
    {
        id: "contato",
        title: "Contato",
        type: "link",
        url: "#contato",
        text: "Contato",
    },
    {
        id: "ligue-para-nos",
        title: "Ligue para nós",
        type: "text",
        content: "Brasil: +55 (11) 5206-4203\nPortugal: +351 30 880 8015",
    },
    {
        id: "desenvolvimento-sites",
        title: "Desenvolvimento de Websites Personalizados",
        type: "card",
        content: "Assista o Vídeo de Apresentação do nosso serviço de Site.",
    },
    {
        id: "video-apresentacao",
        title: "Vídeo de Apresentação",
        type: "video",
        videoUrl: "https://www.youtube.com/embed/P6t-OHgAXG8",
        description:
            "Vídeo de apresentação do serviço de desenvolvimento de sites.",
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
        id: "contato",
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

    
    const { pos } = useSpring<{ pos: [number, number, number] }>({
        pos: data.position || [0, 0, 0],
        config: { mass: 1, tension: 170, friction: 26 },
        delay: index * 50,
    });

    useFrame(() => {
        if (groupRef.current && (layout === "sphere" || layout === "helix")) {
            const target = new THREE.Vector3();
            target.copy(groupRef.current.position).multiplyScalar(2);
            groupRef.current.lookAt(target);
        }
    });

    return (
        <animated.group
            ref={groupRef}
            position={pos}
            onClick={onClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <Html
                transform
                distanceFactor={4}
                position={[0, 0, 0]}
                center
                style={{
                    transition: "all 0.2s",
                    opacity: 1,
                    transform: `scale(${hovered ? 1.1 : 1})`,
                    zIndex: 1,
                }}
            >
                {(() => {
                    switch (data.type) {
                        case "video":
                            return (
                                <iframe
                                    width="560"
                                    height="315"
                                    src={data.videoUrl}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        borderRadius: "8px",
                                        boxShadow:
                                            "0px 0px 12px rgba(0,0,0,0.5)",
                                    }}
                                ></iframe>
                            );
                        case "image":
                            return (
                                <img
                                    src={data.imageUrl}
                                    alt={data.altText || data.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        boxShadow:
                                            "0px 0px 12px rgba(0,0,0,0.5)",
                                    }}
                                />
                            );
                        case "card":
                            return (
                                <div
                                    style={{
                                        width: "300px",
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.9)",
                                        padding: "20px",
                                        borderRadius: "8px",
                                        boxShadow:
                                            "0px 0px 12px rgba(0,0,0,0.5)",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <h2>{data.title}</h2>
                                    {"imageUrl" in data && data.imageUrl && (
                                        <img
                                            src={data.imageUrl}
                                            alt={data.title}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                marginBottom: "10px",
                                            }}
                                        />
                                    )}
                                    <p>{data.content}</p>
                                </div>
                            );
                        case "text":
                            return (
                                <div
                                    style={{
                                        width: "300px",
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.9)",
                                        padding: "20px",
                                        borderRadius: "8px",
                                        boxShadow:
                                            "0px 0px 12px rgba(0,0,0,0.5)",
                                    }}
                                >
                                    <p>{data.content}</p>
                                </div>
                            );
                        case "link":
                            return (
                                <a
                                    href={data.url}
                                    style={{
                                        color: "blue",
                                        textDecoration: "underline",
                                        fontSize: "18px",
                                    }}
                                >
                                    {data.text}
                                </a>
                            );
                        default:
                            return null;
                    }
                })()}
            </Html>
        </animated.group>
    );
};

const getPosition = (
    index: number,
    layout: LayoutType
): [number, number, number] => {
    switch (layout) {
        case "table":
            const columns = 5;
            const spacing = 20;
            const x = (index % columns) * spacing - (columns * spacing) / 2;
            const y = -Math.floor(index / columns) * spacing + 20;
            const z = 0;
            return [x, y, z];
        case "sphere": {
            const phi = Math.acos(-1 + (2 * index) / elements.length);
            const theta = Math.sqrt(elements.length * Math.PI) * phi;
            return [
                20 * Math.cos(theta) * Math.sin(phi),
                20 * Math.sin(theta) * Math.sin(phi),
                20 * Math.cos(phi),
            ];
        }
        case "helix": {
            const theta = index * 0.175 + Math.PI;
            const y = -(index * 3) + 20;
            return [20 * Math.cos(theta), y, 20 * Math.sin(theta)];
        }
        case "grid": {
            const columnsGrid = 5;
            const spacingGrid = 20;
            const xGrid = (index % columnsGrid) * spacingGrid - 20;
            const yGrid = -Math.floor(index / columnsGrid) * spacingGrid + 20;
            const zGrid =
                Math.floor(index / (columnsGrid * columnsGrid)) * 20 - 40;
            return [xGrid, yGrid, zGrid];
        }
        default:
            return [0, 0, 0];
    }
};

const Scene: React.FC<{ layout: LayoutType }> = ({ layout }) => {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
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
                    onClick={() => console.log(`Clicked ${data.title}`)}
                />
            ))}

            <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={50}
                maxDistance={500}
            />
        </>
    );
};

const PeriodicTableClient = () => {
    const [layout, setLayout] = useState<LayoutType>("table");

    return (
        <div className="relative w-full h-screen" style={{ zIndex: 0 }}>
            {" "}
            <div
                className="absolute  w-full flex justify-center gap-4"
                style={{ zIndex: 50 }}
            >
                {(["table", "sphere", "helix", "grid"] as LayoutType[]).map(
                    (l) => (
                        <button
                            key={l}
                            onClick={() => setLayout(l)}
                            className={`
                            mt-8
                                px-4 py-2
                                text-secondary
                                border border-secondary
                                rounded
                                uppercase
                                transition-colors
                                hover:bg-primary
                                relative
                                ${
                                    layout === l
                                        ? "bg-yellowcustom"
                                        : "bg-transparent"
                                }
                            `}
                            style={{ zIndex: 51 }}
                        >
                            {l}
                        </button>
                    )
                )}
            </div>
            <Canvas
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            >
                <Scene layout={layout} />
            </Canvas>
        </div>
    );
};

export default PeriodicTableClient;
