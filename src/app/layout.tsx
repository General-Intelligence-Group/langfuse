import Layout from "@/src/components/layouts/appLayout";
import { authOptions } from "@/src/server/auth";
import { getServerSession } from "next-auth";
import AuthProvider from "../components/technical/AuthProvider";
import Providers from "@/src/components/technical/Providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session)
  return (
      <AuthProvider>
      <html lang="en">
      <Providers>          
        
      <body>
              <Layout>{children}</Layout>
            </body>
    </Providers>
    </html>
        
            </AuthProvider>
  );
}
