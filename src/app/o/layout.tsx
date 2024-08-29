import Navbar from '@/components/Navbar'

interface RootLayoutProps {
    children: React.ReactNode;
  }
  
  export default async function RootLayout({ children }: RootLayoutProps) {
    return (
      <div className="flex pl-2 bg-slate-200 min-h-screen py-3">
        <Navbar/>
        {children}
      </div>
    );
  }