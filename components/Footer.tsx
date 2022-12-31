import { FC } from "react";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

const Footer: FC = () => {
  return (
    <footer className="bottom-0 w-full p-2 shadow md:p-3 text-center mt-10 bg-black text-white">
      <div className="md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          © {new Date().getFullYear() + " "}
          Ulises Viña.
        </span>
        <span className="ml-2">Made with ❤️ in Mexico City.</span>
        <ul className="flex flex-wrap items-center mt-3 text-sm sm:mt-0">
          <li className="lg:inline-block">
            <Link href="/">
              <span className="mr-4 hover:underline md:mr-6">Home</span>
            </Link>
          </li>
          <li className="lg:inline-block">
            <Link href="/about">
              <span className="mr-4 hover:underline md:mr-6">About</span>
            </Link>
          </li>
          <li className="lg:inline-block">
            <Link href="/api/auth/login">
              <span className="mr-4 hover:underline md:mr-6">Login</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-2 text-sm">
        Licensed under the GNU General Public License version 3.0.
        <ul className="mt-2">
          <li className="inline-block p-2">
            <a
              href="https://github.com/ulisesvina/educaid"
              target="_blank"
              rel="noreferrer noopener"
            >
              <BsGithub className="inline" size={18} /> Source Code
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
