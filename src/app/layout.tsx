import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  icons: {
    icon: "/icon_fif.png",
    apple: "/icon_fif.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
