import '@/styles/globals.css'
import { IBM_Plex_Sans } from "next/font/google";

const IBMPlexSans = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${IBMPlexSans.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
