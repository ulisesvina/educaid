import { FC, useEffect } from "react";

const Error: FC = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-black text-red-600">Error</h1>
      <section className="mt-5">
        <span className="text-2xl">
          An unknown error ocurred. Going back to home in 5 seconds.
        </span>
      </section>
    </div>
  );
};

export default Error;
