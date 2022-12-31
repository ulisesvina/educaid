import { FC } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const Dashboard: FC = () => {
    const { user } = useUser();
  return (
    <div>
      <h1 className="text-5xl font-black">Dashboard</h1>
      <span className="text-2xl">Welcome, {user?.name}</span>
      <section className="mt-5">
        <br />
        
      </section>
    </div>
  );
};

export default Dashboard;
