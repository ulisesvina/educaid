import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Home = () => {
  const { user, isLoading } = useUser();

  return (
    <div className="mt-24 w-9/12 mx-auto">
      <h1 className="text-7xl font-black">
        Next generation
        <br />
        <span className="animate-text bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent ">
          education suite
        </span>
      </h1>
      <div className="text-3xl mt-5">
        Educaid is a suite of tools that will help you learn{" "}
        <b>without limits.</b>
      </div>
      <div className="mt-2">
        {user ? (
          <Link href="/dashboard">
            <button className="btn font-semibold text-md bg-blue-500 p-3 px-4 m-3 ml-0 rounded-sm ">
              Dashboard
            </button>
          </Link>
        ) : (
          <Link href="/api/auth/login">
            <button className="btn font-semibold text-md bg-blue-500 p-3 px-4 m-3 ml-0 rounded-sm ">
              Get Started
            </button>
          </Link>
        )}
        <Link href="/about">
          <button className="btn text-md bg-gray-500 p-3 px-4 m-3 ml-0 rounded-sm ">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
