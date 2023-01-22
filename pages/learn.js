import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInfo } from "@/context/InfoProvider";
import Spinner from "@/components/Spinner";

const Learn = () => {
  const router = useRouter(),
    { subject } = router.query,
    [isLoading, setIsLoading] = useState(true),
    [text, setText] = useState(""),
    { diagnosis, interest } = useInfo();

  useEffect(() => {
    if (subject) {
      fetch("/api/teach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          diagnosis: diagnosis.diagnosis,
          interest: interest.interest,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setText(data.choices[0].text);
        })
        .catch((error) => console.error(error));
    }
  }, [subject]);

  return (
    <div className="mt-24 w-9/12 mx-auto">
      <h1 className="text-5xl font-black">Learn {subject}</h1>
      {isLoading ? (
        <div className="flex justify-center items-center my-10">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl my-5">{text}</p>
        </div>
      )}
      <p>
        <Link href="/dashboard">Back to Dashboard</Link>
      </p>
    </div>
  );
};

export default Learn;
