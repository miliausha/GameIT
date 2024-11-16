'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import "./globals.css";
import Header from "./header";
import Footer from "./footer";
// import { UserProvider } from "./UserContext";



function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light'
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col h-screen`}
      >
        <Providers>
          {/* <UserProvider/> */}
            <Header />
            <div className="flex flex-1 flex-col">
              {children}
            </div>
            <Footer />
          {/* <UserProvider /> */}
        </Providers>
      </body>
    </html>
  );
}
