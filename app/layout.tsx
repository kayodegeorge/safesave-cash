"use client"

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "./components/Providers";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "SafeSave Customer Onbording Portal",
//   description: "Portal for SafeSave Customer Onbording",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body className={inter.className}>
      <QueryClientProvider client={queryClient}>
      <Providers>{children}</Providers>
      </QueryClientProvider>
      </body>
    </html>
  );
}
