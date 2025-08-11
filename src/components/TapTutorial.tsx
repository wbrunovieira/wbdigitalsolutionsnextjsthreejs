import React, { useState, useEffect } from 'react';
import { useTranslations } from '@/contexts/TranslationContext';
import { motion, AnimatePresence } from 'framer-motion';

const TapTutorial: React.FC = () => {
    const [showTutorial, setShowTutorial] = useState(false);
    const currentMessages = useTranslations();

    useEffect(() => {
        // Sempre mostra o tutorial
        // Mostra após 3 segundos (tempo para o usuário se orientar)
        const timer = setTimeout(() => {
            setShowTutorial(true);
        }, 3000);

        // Auto-esconde após 8 segundos (mais tempo para ler)
        const hideTimer = setTimeout(() => {
            setShowTutorial(false);
        }, 11000);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {showTutorial && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-10 left-4 z-50 pointer-events-none"
                >
                    <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded-full flex items-center gap-2 shadow-lg">
                        <div className="relative">
                            <div className="w-8 h-8 bg-white/20 rounded-full animate-ping absolute"></div>
                            <svg 
                                className="w-8 h-8 relative z-10" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M15 15l-2 5L9 9l11 4-5 2z" 
                                />
                            </svg>
                        </div>
                        <span className="text-sm whitespace-nowrap">
                            {currentMessages.tapToSpeed || "Tap to speed up rotation"}
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TapTutorial;