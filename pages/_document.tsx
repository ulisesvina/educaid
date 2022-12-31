import { FC } from "react";
import { Html, Head, Main, NextScript } from "next/document";

const Document: FC = () => (
    <Html>
        <Head>
            <link rel="icon" type="image/png" href="/Educaid.png" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;