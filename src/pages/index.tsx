// src/pages/index.tsx
"use client";
import LanguageRouter from "../utils/LanguageRouter";
import Home from "../components/Home";
import PageHead from "@/components/PageHead";

function Index() {
    return (
        <div className="w-full">
          <PageHead />
            <LanguageRouter />
            <Home />
        </div>
    );
}

export default Index;
