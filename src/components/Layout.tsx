// Layout.tsx
import { ReactNode } from "react";
import { useRouter } from "next/router";
import Nav from "./Nav";
import Footer from "./Footer";
import ChatBotButton from "./ChatBotButton";

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const is3DShowcase = router.pathname === '/3d-showcase';
    const is3DTunnel = router.pathname === '/3d-tunnel';

    // For 3D showcase and tunnel, render only the children without layout
    if (is3DShowcase || is3DTunnel) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center">

            <div className="w-full max-w-[1400px]">
                <Nav />
                <ChatBotButton /> 
                <main className="flex-1 w-full">{children}</main>
                <Footer />
            </div>
          
        </div>
    );
};

export default Layout;