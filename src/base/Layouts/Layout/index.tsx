import { LenisProvider } from '@/base/Lenis';
import { createClient } from '@/prismicio';
import Header from '@/components/Header';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    const client = createClient();

    const header = await client.getSingle('header');

    return (
        <>
            <LenisProvider root/>
            <Header data={header?.data} />
            {children}
        </>
    )
}

export default MainLayout;