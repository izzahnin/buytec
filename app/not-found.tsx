import Link from "next/link";
import Navbar from "@components/Navbar";
import "./globals.css";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="flex custom-height items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold">Not Found</h2>
          <h2 className="mb-4 text-6xl font-bold">404</h2>
          <p className="mb-8 text-lg">Could not find the requested resource</p>
          <Link href="/"  className="text-blue-500">
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
}
