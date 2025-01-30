// Layout.tsx
import { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col items-center">

            <div className="w-full max-w-[1400px]">
                <Nav />
                <main className="flex-1 w-full">{children}</main>
                <Footer />
            </div>
          
        </div>
    );
};

export default Layout;