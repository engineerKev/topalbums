import type { AppProps } from 'next/app'
import Head from 'next/head';
import 'styles/globalStyles.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="all" />
        <meta name="keywords" content="react, nextjs, typescript, styled-components, scss, spa, ssr" />
        <meta name="author" content="Kevin Ruiz" />
        <title>Top Albums SPA | Kevin Ruiz</title>
        <meta name="description" key="desc" content="React+Typescript SPA with SSR. Built with Next.js, styled-components, and scss" />
        <meta
          property="og:description"
          content="React+Typescript SPA with SSR. Built with Next.js, styled-components, and scss"
        />
        <meta
          property="og:title"
          content="Top Albums SPA | Kevin Ruiz"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}