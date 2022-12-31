import Link from "next/link";
import { FC } from "react";

const Home: FC = () => {
  return (
    <div>
      <h1 className="text-5xl font-black">
        Next generation
        <br />
        <span className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent ">
          education suite.
        </span>
      </h1>
      <p className="text-2xl mt-2">
        Educaid is a suite of tools that will help you{" "}
        <span className="font-semibold">learn without limits.</span>
      </p>
      <div>
        <Link href="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-3 mx-0">
            Get Started
          </button>
        </Link>
        <Link href="/about">
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-3">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
