import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Delphis</title>
        <meta name="description" content="Home for home tutors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`font-sans ${inter.variable}`}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  );
};

export default api.withTRPC(MyApp);
