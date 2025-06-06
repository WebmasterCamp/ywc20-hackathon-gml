import './globals.css';
import type { Metadata } from 'next';
import { Bai_Jamjuree } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/layout/navbar';
import { AuthProvider } from '@/components/auth/auth-provider';

const baiJamjuree = Bai_Jamjuree({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'โคจร | Cojon',
  description: 'หาเพื่อนเข้าบาร์ หาเวลาเข้าร่วม | Friend Finder for Bars',
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={baiJamjuree.className}>
        <AuthProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex-1 pb-20 md:pb-4 md:pl-[250px] max-h-screen">
                {children}
              </main>
              <div className="fixed bottom-0 left-0 right-0 z-50 md:static">
                <Navbar />
              </div>
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}