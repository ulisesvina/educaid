import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import InfoProvider from "../context/InfoProvider";
import { Inter } from "@next/font/google";
import Head from "next/head";

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
      <Head>
        <title>Educaid</title>
      </Head>
      <UserProvider>
        <InfoProvider>
          <div className="flex flex-col h-screen justify-between">
            <Header />
            <div className="max-w-5xl w-full h-full my-0 mx-auto py-0 px-4">
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
        </InfoProvider>
      </UserProvider>
    </>
  );
};

export default App;
