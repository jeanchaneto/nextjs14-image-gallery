import Link from "next/link";
import Search from "./Search";

function Navbar() {
  return (
    <header className="bg-neutral-900 sticky top-0 z-10">
      <nav className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center p-4 font-bold max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl text-neutral-100 text-center whitespace-nowrap" >
          <Link href="/">NEXT.JS 14 Image Gallery</Link>
        </h1>
        <Search/>
      </nav>
    </header>
  );
}

export default Navbar;
