"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/svg/logo-white.svg";
import { useTranslations } from "@/contexts/TranslationContext";
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";

const Footer: React.FC = () => {
  const currentMessages = useTranslations();

  return (
    <footer className="bg-modern-gradient text-white px-6 py-10 lg:px-10 mt-32">

      <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <Image
            src={logo}
            alt="logo"
            width={158}
            height={42}
            className="w-32 h-9 object-contain"
          />

          <h3 className="text-sm mt-4 font-bold underline tracking-wider">
            {currentMessages.contacts}
          </h3>

          <div className="flex flex-col gap-2 mt-3 text-sm">
            <p className="flex items-center">
              <FiPhone className="mr-2" />
              <a href="tel:+551150264203">
                {currentMessages.brazil}: +55 11 5026-4203
              </a>
            </p>

            <p className="flex items-center">
              <FiMail className="mr-2" />
              <a href="mailto:bruno@wbdigitalsolutions.com">
                bruno@wbdigitalsolutions.com
              </a>
            </p>
            <p className="flex items-center">
              <SiWhatsapp className="mr-2" />
              <a
                href="https://wa.me/5511982864581"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp: +55 11 98286-4581
              </a>
            </p>
          </div>

          <div className="flex space-x-4 mt-6">
            <Link href="https://www.instagram.com/wb.digitalsolutions/">
              <FaInstagram className="text-lg hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link href="https://www.facebook.com/wb.digitalsolutions">
              <FaFacebookF className="text-lg hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link href="https://www.youtube.com/@wbdigitalsolutions">
              <FaYoutube className="text-lg hover:scale-110 transition-transform duration-300" />
            </Link>
            <Link href="https://www.tiktok.com/@wb.digitalsolutions">
              <FaTiktok className="text-lg hover:scale-110 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 tracking-wider">
            {currentMessages.artificialIntelligence}
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/automation" className="text-sm hover:underline">
                {currentMessages.process}
              </Link>
            </li>
            <li>
              <Link href="/automation" className="text-sm hover:underline">
                {currentMessages.assistant}
              </Link>
            </li>
            <li>
              <Link href="/ai" className="text-sm hover:underline">
                {currentMessages.analizy}
              </Link>
            </li>
            <li>
              <Link href="/ai" className="text-sm hover:underline">
                {currentMessages.dataManagement}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 tracking-wider">
            {currentMessages.recentBlogs}
          </h4>
          <ul className="space-y-3">
            <li>
              <Link href="/blog/do-i-need-a-website" className="hover:underline text-sm">
                {currentMessages.diINeedSite}
              </Link>
              <span className="block text-xs text-gray-400">27 de out, 2023</span>
            </li>
            <li>
              <Link href="/blog/how-emotional-design-can" className="hover:underline text-sm">
                {currentMessages.DesignEmotional}
              </Link>
              <span className="block text-xs text-gray-400">06 de out, 2023</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-primary py-4 mt-8 text-center">
        <p className="text-secondary text-sm">
          © WBDIGITALSOLUTIONS | {currentMessages.allRightsReserved}
        </p>
      </div>
    </footer>
  );
};

export default Footer;