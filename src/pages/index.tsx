// src/pages/index.tsx
"use client";
import LanguageRouter from "../utils/LanguageRouter";
import Home from "../components/Home";
import PageHead from "@/components/PageHead";

function Index() {
    return (
        <div className="w-full max-w-7xl mt-16">
          <PageHead />
            <LanguageRouter />
            <Home />
        </div>
    );
}

export default Index;
