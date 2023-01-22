import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Educaid.svg";
import { useUser } from "@auth0/nextjs-auth0/client";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const { user, isLoading } = useUser(),
    dropdownRef = useRef(null),
    navRef = useRef(null),
    collapse = () => navRef.current.classList.toggle("hidden"),
    collapseDropdown = () => dropdownRef.current.classList.toggle("hidden");

  return (
    <header className="bg-black bg-opacity-80 backdrop-blur-sm text-white p-2 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="inline-block flex-shrink-0">
          <Image src={Logo} width={50} className="invert" />
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
            <li className="lg:inline-block">
              <Link href="/">
                <span className="block lg:inline lg:mt-0 m-3 px-4 py-2 hover:bg-gray-700 rounded-md">
                  Home
                </span>
              </Link>
              <Link href="/about">
                <span className="block lg:inline lg:mt-0 m-3 px-4 py-2 hover:bg-gray-700 rounded-md">
                  About
                </span>
              </Link>
              {!isLoading && user ? (
                <div className="block lg:inline lg:mt-0 m-3 px-4 py-2 rounded-md transition-all">
                  <button
                    data-dropdown-toggle="dropdownDivider"
                    type="button"
                    onClick={collapseDropdown}
                    className="block mt-4 lg:inline mr-4 lg:mt-0"
                  >
                    <img
                      src={user.picture}
                      className="inline rounded mr-2"
                      alt="Profile picture"
                      width={20}
                      height={20}
                    />
                    <span className="mr-2">
                      <b>{user.name}</b>
                    </span>
                    <IoMdArrowDropdown className="inline" />
                  </button>

                  <div
                    id="dropdownDivider"
                    ref={dropdownRef}
                    className="hidden z-10 w-44 absolute lg:right-0 lg:mr-5 mt-2 bg-black text-white border divide-y divide-gray-100 shadow"
                  >
                    <ul
                      className="py-1 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDividerButton"
                    >
                      <li>
                        <Link
                          href="/dashboard"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/settings"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </Link>
                      </li>
                    </ul>
                    <div className="py-1">
                      <Link
                        href="/api/auth/logout"
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        <span className="text-red-500">Logout</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/api/auth/login">
                <span className="block lg:inline lg:mt-0 m-3 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md transition-all">
                  Get Started
                </span>
              </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
