import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily}, sans-serif;
        }
      `}</style>
      <div className="flex flex-col h-screen justify-between">
        <Header />
        <div className="max-w-4xl m-auto">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
