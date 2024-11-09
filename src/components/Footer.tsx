import Image from "next/image";
import Link from "next/link";

import logo from "/public/svg/logo-white.svg";

import EmailInput from "./EmailInput";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationContext";

import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";
import ButtonStandard from "./ButtonStandard";

const Footer: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const currentMessages = useTranslations();

    return (
        <footer className="bg-modern-gradient text-white py-8 px-10">
            <div className="container mx-auto px-4">
                <form
                    action="https://api.web3forms.com/submit"
                    method="POST"
                    className="bg-cover p-6 rounded w-full"
                >
                    <input
                        type="hidden"
                        name="access_key"
                        value="4aeac532-e643-44c4-83c7-23d0c4b5e78e"
                    />

                    <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
                        <h2 className="text-xl font-semibold whitespace-nowrap lg:mr-4">
                            {currentMessages.subscribeNewsletter}
                        </h2>

                        <div className="flex items-center gap-2 w-full lg:w-auto">

                            <EmailInput />
                            <ButtonStandard buttonText={currentMessages.send} />

                            <input
                                type="hidden"
                                name="redirect"
                                value="https://www.wbdigitalsolutions.com/success.html"
                            />
                        </div>
                    </div>
                </form>
                <div className="mt-6 border- transition-transform duration-300 ease-in-out mx-auto w-full"></div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div>
                        <Image
                            className="w-32 h-9 object-contain"
                            src={logo}
                            alt="logo"
                            width={158}
                            height={42}
                        />

                        <div className="flex flex-col pl-4">
                            <h3 className="text-sm mt-4 font-bold underline tracking-wider">
                                {currentMessages.contacts}
                            </h3>

                            <p className="mt-2 whitespace-nowrap font-thin text-xs text-sm hover:underline flex items-center hover:scale-105 transition-transform duration-300 ease-in-out">
                                <FiPhone className="mr-2" />{" "}
                                <a href="tel:+551150264203">
                                    {currentMessages.brazil}: +55 11 5026-4203
                                </a>
                            </p>
                            <p className="mt-3 whitespace-nowrap font-thin text-xs text-sm hover:underline flex items-center hover:scale-105 transition-transform duration-300 ease-in-out">
                                <FiPhone className="mr-2" />{" "}
                                <a href="tel:+351308808015">
                                    {currentMessages.portugal}: +351 30 880 8015
                                </a>
                            </p>
                            <p className="mt-2 whitespace-nowrap font-thin text-xs text-sm hover:underline flex items-center hover:scale-105 transition-transform duration-300 ease-in-out">
                                <FiMail className="mr-2" />{" "}
                                <a href="mailto:contato@wbdigitalsolutions.com">
                                    contato@wbdigitalsolutions.com
                                </a>
                            </p>
                            <p className="mt-2 whitespace-nowrap font-thin text-xs text-sm hover:underline flex items-center hover:scale-105 transition-transform duration-300 ease-in-out">
                                <SiWhatsapp className="mr-2" />{" "}
                                <a
                                    href="https://wa.me/5511982864581"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    WhatsApp: +55 11 98286-4581
                                </a>
                            </p>
                        </div>

                        <div className="flex space-x-4 mt-8 pl-4">
                            <Link href="https://www.instagram.com/wb.digitalsolutions/">
                                <FaInstagram className="text-lg hover:scale-110  transition-transform duration-300 ease-in-out" />
                            </Link>
                            <Link href="https://www.facebook.com/wb.digitalsolutions">
                                <FaFacebookF className="text-lg hover:scale-110  transition-transform duration-300 ease-in-out" />
                            </Link>
                            <Link href="https://www.youtube.com/@wbdigitalsolutions">
                                <FaYoutube className="text-lg hover:scale-110  transition-transform duration-300 ease-in-out" />
                            </Link>
                            <Link href="https://www.tiktok.com/@wb.digitalsolutions">
                                <FaTiktok className="text-lg hover:scale-110  transition-transform duration-300 ease-in-out" />
                            </Link>
                        </div>
                    </div>

                    {language === "pt-BR" && (
                        <div>
                            <h4 className="font-semibold mb-2 tracking-wider">
                                Sistemas de Gestão
                            </h4>
                            <ul>
                                <li>
                                    <Link
                                        href="wbweb.html"
                                        className="font-thin text-xs text-sm hover:underline"
                                    >
                                        Gestão para Empresas (WB Web)
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="wbsalao.html"
                                        className="font-thin text-xs text-sm hover:underline"
                                    >
                                        Gestão para Salões (WB Salão)
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="wbclinica.html"
                                        className="font-thin text-xs text-sm hover:underline"
                                    >
                                        Gestão para Clínicas de Saúde (WB
                                        Clínica)
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="wbfood.html"
                                        className="font-thin text-xs text-sm hover:underline"
                                    >
                                        Gestão para Restaurantes (WB Food)
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="wbpet.html"
                                        className="font-thin text-xs text-sm hover:underline"
                                    >
                                        Gestão para Pet Shops (WB Pet)
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}

                    <div>
                        <h4 className="font-semibold mb-2 tracking-wider">
                            {currentMessages.artificialIntelligence}
                        </h4>
                        <ul>
                            <li>
                                <Link
                                    href="automacao-empresarial.html"
                                    className="font-thin text-xs text-sm hover:underline"
                                >
                                    {currentMessages.process}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="assistentes-virtuais.html"
                                    className="font-thin text-xs text-sm hover:underline"
                                >
                                    {currentMessages.assistant}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="analise-preditiva.html"
                                    className="font-thin text-xs text-sm hover:underline"
                                >
                                    {currentMessages.analizy}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="gestao-inteligente-dados.html"
                                    className="font-thin text-xs text-sm hover:underline"
                                >
                                    {currentMessages.dataManagement}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="suporte-tecnologia.html"
                                    className="font-thin text-xs text-sm hover:underline"
                                >
                                    {currentMessages.IASupport}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2 tracking-wider">
                            {currentMessages.digitalMarketing}
                        </h4>
                        <ul>
                            <li>
                                <Link
                                    href="site.html"
                                    className="font-thin text-xs text-sm hover:underline"
                                >
                                    {currentMessages.siteCreation}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="social.html"
                                    className="font-thin text-xs text-sm hover:underline"
                                >
                                    {currentMessages.SocialMedia}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="trafego.html"
                                    className="font-thin text-xs text-sm hover:underline"
                                >
                                    {currentMessages.addCampaing}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="trafego.html"
                                    className="font-thin text-xs text-sm hover:underline"
                                >
                                    {currentMessages.design}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 tracking-wider">
                            {currentMessages.recentBlogs}
                        </h4>
                        <ul>
                            <li>
                                <Link
                                    href="blog-details-1-Site.html"
                                    className="hover:underline font-thin text-xs text-sm"
                                >
                                    {currentMessages.diINeedSite}
                                </Link>
                                <span className="block text-xs text-gray-400">
                                    27 de out, 2023
                                </span>
                            </li>
                            <li className="mt-4">
                                <Link
                                    href="blog-como-o-sistemas-de-gestão-transforma-empresas.html"
                                    className="hover:underline font-thin text-xs text-sm"
                                >
                                    {currentMessages.SistemsTransform}
                                </Link>
                                <span className="block text-xs text-gray-400">
                                    06 de out, 2023
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-primary py-4 mt-8">
                <div className="container mx-auto px-4">
                    <p className="text-center text-secondary">
                        © WBDIGITALSOLUTIONS |{" "}
                        {currentMessages.allRightsReserved}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
