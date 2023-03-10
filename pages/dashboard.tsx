import { FC } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useInfo } from "../context/InfoProvider";

const Dashboard: FC = () => {
  const { user } = useUser();
  const { diagnosis, interest } = useInfo();

  return (
    <div>
      <h1 className="text-5xl font-black">Dashboard</h1>
      <span className="text-2xl">Welcome, {user?.name}</span>
      <section className="mt-100">
        <br />
        <h2 className="text-3xl font-semibold">Your Info</h2>
        <div className="mt-2">
          <h3 className="text-2xl font-semibold">Medical Information</h3>
          <p className="text-xl mt-2">
            {diagnosis.isSet ? (
              <span><b>It is possible that you suffer</b> {diagnosis.diagnosis}</span>
            ) : (
              <>
                <span>Not Set</span>
                <button onClick={()=>window.location.href="/questionaire?id=diagnose"} className="ml-5 bg-blue-500 text-white px-4 py-1 rounded-md">
                  Begin test
                </button>
              </>
            )}
          </p>
        </div>
        <div className="mt-2">
          <h3 className="text-2xl font-semibold">Interests</h3>
          <p className="text-xl mt-2">
            {interest.isSet ? (
              interest.interest
            ) : (
              <>
                <span>Not Set</span>
                <button onClick={()=>window.location.href="/questionaire?id=interests"} className="ml-5 bg-blue-500 text-white px-4 py-1 rounded-md">
                  Begin test
                </button>
              </>
            )}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
