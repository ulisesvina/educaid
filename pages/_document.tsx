import { FC } from "react";
import { Html, Head, Main, NextScript } from "next/document";

const Document: FC = () => (
    <Html>
        <Head>
            <title>Educaid</title>
            <meta name="description" content="Educaid" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" type="image/png" href="/Educaid.png" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;