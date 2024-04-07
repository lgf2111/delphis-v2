import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
// import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Delphis</title>
        <meta name="description" content="Home of home tutors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main className={`font-sans ${inter.variable}`}> */}
      <main className="font-sans">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
