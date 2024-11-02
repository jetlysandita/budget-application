import { SupabaseProvider } from '@/context/SupabaseContext';
import { ToastProvider } from '@/context/ToastContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights you need
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${openSans.style.fontFamily};
        }
      `}</style>
      <ToastProvider>
        <SupabaseProvider>
          <Component {...pageProps} />
        </SupabaseProvider>
      </ToastProvider>
    </>
  );
}
