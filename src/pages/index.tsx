"use client";
import LanguageRouter from "../utils/LanguageRouter";
import Home from "../components/Home";

function Index() {
    return (
        <div className="w-full max-w-7xl mx-auto">
            <LanguageRouter />
            <Home />
        </div>
    );
}

export default Index;
