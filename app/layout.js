import { Inter } from "next/font/google";
import "./globals.scss";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alp's Personal Website",
  description: "Personal",
};

let footer = (
  <footer>
    <div className="title"></div>
    <div className="links">
      <Link className="icon" href={"https://github.com/yalcinalp"}><img src="/assets/github-logo.svg"></img></Link>
      <Link className="icon" href={"https://www.linkedin.com/in/yalcinalp//"}><img src="/assets/linkedin-logo.svg"></img></Link>
    </div>
  </footer>
);

let header = (
  <header>
    <Link href="/" className="logo">
      <img src="/assets/logo.svg"></img>
      {/* <h1>.ilc</h1> */}
    </Link>
  </header>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
