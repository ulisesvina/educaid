import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export interface Diagnosis {
  isSet: boolean;
  diagnosis: string | null;
}

export interface Interest {
  isSet: boolean;
  interest: string | null;
}

export interface Info {
  diagnosis: Diagnosis;
  interest: Interest;
  loading: boolean;
}

const InfoContext = createContext<Info>({
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

const InfoProvider = ({ children }: ReactNode | any) => {
  const { user, isLoading: userIsLoading } = useUser();

  const [diagnosis, setDiagnosis] = useState<Diagnosis>({
    isSet: false,
    diagnosis: null,
  });
  const [interest, setInterest] = useState<Interest>({
    isSet: false,
    interest: null,
  });
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    if (user && !userIsLoading) {
      fetch(`/api/user/user-fetch?email=${user.email}`)
        .then((res) => res.json())
        .then(({ user }) => {
          if (user) {
            if (!!user.diagnosis)
              setDiagnosis({ isSet: true, diagnosis: user.diagnosis });
            if (!!user.interest)
              setInterest({ isSet: true, interest: user.interest });
          }
          isLoading(false);
        });
    }
  }, [userIsLoading]);

  return (
    <InfoContext.Provider
      value={{
        diagnosis,
        interest,
        loading,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = () => useContext(InfoContext);
export default InfoProvider;
