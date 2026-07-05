// src/pages/index.tsx
"use client";
import LanguageRouter from "../utils/LanguageRouter";
import Home from "../components/Home";
import PageHead from "@/components/PageHead";
import { makeI18nStaticProps } from "@/lib/i18n";

// Per-locale prerender with SSR-correct messages (built-in Next i18n).
export const getStaticProps = makeI18nStaticProps();

function Index() {
    return (
        <div className="w-full">
          <PageHead pageKey="home" />
            <LanguageRouter />
            <Home />
        </div>
    );
}

export default Index;
