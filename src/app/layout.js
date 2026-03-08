import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import ThemeProvider from "@/components/layout/ThemeProvider";

export const metadata = {
  title: "SaaS Dashboard",
  description: "Professional Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
