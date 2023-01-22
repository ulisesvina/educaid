import "@/styles/globals.css";
import Head from "next/head";
3;
import { Inter } from "@next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <title>
          Educaid
        </title>
        <link rel="icon" href="/Educaid.png" type="image/png"/>
      </Head>
      <div className="flex flex-col">
        <UserProvider>
          <Header />
          <div className="flex-1 my-10">
            <Component {...pageProps} />
          </div>
        </UserProvider>
      </div>
    </div>
  );
}
