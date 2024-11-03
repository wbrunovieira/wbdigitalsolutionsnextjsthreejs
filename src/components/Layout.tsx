// Layout.tsx
import { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
