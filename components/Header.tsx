import { FC, useRef} from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa";

import logo from "../public/Educaid.svg";

const Header: FC = () => {
  const navRef: any = useRef(null);

  const collapse = () => {
    navRef.current.classList.toggle("hidden");
  };

  return (
    <header className="z-50 top-0 sticky justify-between w-full items-center p-4 text-sm mb-10 text-white bg-black">
     <div className="flex items-center justify-between flex-wrap">
        <div className="flex-shrink-0 lg:mr-6">
          <Link href="/">
            <Image src={logo} alt="Educaid Logo" width={50} height={50} className="filter"/>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={collapse}
            className="px-3 py-2 border rounded border-white-400"
            aria-label="Toggle navigation"
          >
            <FaBars />
          </button>
        </div>
        <nav
          ref={navRef}
          className="w-full block flex-grow-0 lg:flex lg:items-center lg:w-auto justify-end hidden"
        >
          <ul className="lg:flex-grow">
            <li onClick={collapse} className="lg:inline-block">
              <Link href="/">
                <span className="block mt-4 lg:inline mr-4 lg:mt-0">Home</span>
              </Link>
            </li>
            <li onClick={collapse} className="lg:inline-block">
              <Link href="/about">
                <span className="block mt-4 lg:inline mr-4 lg:mt-0">About</span>
              </Link>
            </li>
            <li onClick={collapse} className="lg:inline-block">
              <Link href="/login">
                <span className="block mt-4 lg:inline lg:mt-0">Login</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;