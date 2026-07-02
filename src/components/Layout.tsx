// Layout.tsx
import { ReactNode } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Nav from "./Nav";
import Footer from "./Footer";

const ChatBotButton = dynamic(() => import("./ChatBotButton"), { ssr: false });

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const is3DShowcase = router.pathname === '/3d-showcase';
    const is3DTunnel = router.pathname === '/3d-tunnel';
    // Standalone personal CV pages — brunodev.* → /dev, brunov.* → /vendas — no Nav/Footer/ChatBot.
    const isCV = router.pathname === '/dev' || router.pathname === '/vendas';

    // For these full-screen pages, render only the children without layout
    if (is3DShowcase || is3DTunnel || isCV) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center">

            <div className="w-full max-w-[1400px]">
                <Nav />
                <ChatBotButton /> 
                <main className="flex-1 w-full">{children}</main>
                {/* relative z-10 keeps the footer above any page-level fixed
                    background canvas (e.g. the /websites ScrollWebsiteHero3D). */}
                <div className="relative z-10">
                    <Footer />
                </div>
            </div>
          
        </div>
    );
};

export default Layout;