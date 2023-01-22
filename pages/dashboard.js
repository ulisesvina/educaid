import { useUser } from "@auth0/nextjs-auth0/client";
import { useInfo } from "@/context/InfoProvider";

const Dashboard = () => {
  const { user } = useUser();
  const { diagnosis, interest } = useInfo();

  return (
    <div className="mt-24 w-9/12 mx-auto">
      <h1 className="text-5xl font-black">Dashboard</h1>
      <span className="text-2xl">Welcome, {user?.name}</span>
      <section className="mt-100">
        <br />
        <h2 className="text-3xl font-semibold">Your Info</h2>
        <div className="mt-2">
          <h3 className="text-2xl font-semibold">Medical Information</h3>
          <p className="text-xl mt-2">
            {diagnosis.isSet ? (
              <>
                You <b>might</b> suffer from {diagnosis.diagnosis}. Get more
                information about a professional diagnosis{" "}
                <a
                  href="https://www.mind.org.uk/information-support/types-of-mental-health-problems/mental-health-problems-introduction/diagnosis/"
		rel="noreferrer"
                  target="_blank"
                  className="text-blue-300 underline"
                >
                  here
                </a>
              </>
            ) : (
              <>
                <span>Not Set</span>
                <button
                  onClick={() =>
                    (window.location.href = "/questionaire?id=diagnose")
                  }
                  className="ml-5 bg-blue-500 text-white px-4 py-1 rounded-md"
                >
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
              <span>Your interests are: {interest.interest}</span>
            ) : (
              <>
                <span>Not Set</span>
                <button
                  onClick={() =>
                    (window.location.href = "/questionaire?id=interests")
                  }
                  className="ml-5 bg-blue-500 text-white px-4 py-1 rounded-md"
                >
                  Begin test
                </button>
              </>
            )}
          </p>
        </div>
      </section>
      {interest.isSet && diagnosis.isSet ? (
        <section className="mt-10">
          <h1 className="text-3xl font-black">Learn</h1>
          <div className="mt-2">
            <h3 className="text-2xl font-semibold inline-block">
              What is summation?
            </h3>
            <button
              onClick={() =>
                (window.location.href = "/learn?subject=summation")
              }
              className="inline-block ml-5 bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-md"
            >
              Attend course
            </button>
            <p className="text-xl mt-2"></p>
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-semibold inline-block">
              What is diabetes?
            </h3>
            <button
              onClick={() =>
                (window.location.href = "/learn?subject=diabetes")
              }
              className="inline-block ml-5 bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-md"
            >
              Attend course
            </button>
            <p className="text-xl mt-2"></p>
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-semibold inline-block">
              What is tablature?
            </h3>
            <button
              onClick={() =>
                (window.location.href = "/learn?subject=tablature")
              }
              className="inline-block ml-5 bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded-md"
            >
              Attend course
            </button>
            <p className="text-xl mt-2"></p>
          </div>
        </section>
      ) : (
        <section className="mt-10 text-xl font-bold">
          Complete your tests in order to access learning resources.
        </section>
      )}
    </div>
  );
};

export default Dashboard;
