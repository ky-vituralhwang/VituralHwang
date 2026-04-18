import { LenisProvider } from '@/base/Lenis';
import { createClient } from '@/prismicio';
import Header from '@/components/Header';

interface MainLayoutProps {
    children: React.ReactNode;
    isLandingPage?: boolean;
}

const MainLayout = async ({ children, isLandingPage = false }: MainLayoutProps) => {
    const client = createClient();

    const header = await client.getSingle('header');

    return (
        <>
            <LenisProvider root/>
            <Header
                data={header?.data}
                isLandingPage={isLandingPage}
            />
            {children}
        </>
    )
}

export default MainLayout;