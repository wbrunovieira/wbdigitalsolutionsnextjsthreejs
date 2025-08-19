// src/pages/index.tsx
"use client";
import LanguageRouter from "../utils/LanguageRouter";
import Home from "../components/Home";
import MetaTags from "@/components/MetaTags";

function Index() {
    return (
        <div className="w-full">
          <MetaTags />
            <LanguageRouter />
            <Home />
        </div>
    );
}

export default Index;
