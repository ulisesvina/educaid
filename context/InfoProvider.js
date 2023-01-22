import { createContext, useContext, useState, useEffect } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";

const InfoContext = createContext({
  diagnosis: {
    isSet: false,
    diagnosis: null,
  },
  interest: {
    isSet: false,
    interest: null,
  },
  loading: true,
});

const InfoProvider = ({ children }) => {
  const { user, userIsLoading } = useUser();
  const [diagnosis, setDiagnosisState] = useState({
    isSet: false,
    diagnosis: null,
  });
  const [interest, setInterestState] = useState({
    isSet: false,
    interest: null,
  });
  const [loading, setIsLoading] = useState(true);

  const setInterest = (interest) => {
    localStorage.setItem("interest", JSON.stringify(interest));
    setInterestState({
      isSet: true,
      interest: interest,
    });
  };
  const setDiagnosis = (diagnosis) => {
    localStorage.setItem("diagnosis", JSON.stringify(diagnosis));
    setDiagnosisState({
      isSet: true,
      diagnosis: diagnosis,
    });
  };

  useEffect(() => {
    const diagnosis = localStorage.getItem("diagnosis"),
      interest = localStorage.getItem("interest");

    console.log(diagnosis);

    if (diagnosis) {
      setDiagnosisState({
        isSet: true,
        diagnosis: diagnosis,
      });
    }
    if (interest) {
      setInterestState({
        isSet: true,
        interest: interest,
      });
    }

    setIsLoading(false);
  }, []);

  return (
    <InfoContext.Provider
      value={{
        diagnosis,
        interest,
        loading,
        setDiagnosis,
        setInterest,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = () => useContext(InfoContext);
export default InfoProvider;
