import { FC, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useUser } from "@auth0/nextjs-auth0/client";

import logo from "../public/Educaid.svg";

const Header: FC = () => {
  const { user, isLoading } = useUser();

  const navRef: any = useRef(null),
    dropdownRef: any = useRef(null);

  const collapse = () => navRef.current.classList.toggle("hidden");

  const collapseDropdown = () => dropdownRef.current.classList.toggle("hidden");

  return (
    <header className="z-50 top-0 sticky justify-between w-full items-center p-4 text-sm mb-10 text-white bg-black">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex-shrink-0 lg:mr-6">
          <Link href="/">
            <Image
              src={logo}
              alt="Educaid Logo"
              width={50}
              height={50}
              className="filter"
            />
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
            {!isLoading && user ? (
              <div className="lg:inline-block">
                <button
                  data-dropdown-toggle="dropdownDivider"
                  type="button"
                  onMouseOver={collapseDropdown}
                  className="block mt-4 lg:inline mr-4 lg:mt-0"
                >
                  <span className="mr-2">
                    <b>{user.name}</b>
                  </span>
                  <IoMdArrowDropdown className="inline" />
                </button>

                <div
                  id="dropdownDivider"
                  ref={dropdownRef}
                  className="hidden z-10 w-44 absolute lg:right-0 lg:mr-5 mt-2 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700"
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
              <li onClick={collapse} className="lg:inline-block">
                <Link href="/api/auth/login">
                  <span className="block mt-4 lg:inline lg:mt-0">Login</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
