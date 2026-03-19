import "./globals.css";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body className="pt-20 overflow-x-hidden flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}