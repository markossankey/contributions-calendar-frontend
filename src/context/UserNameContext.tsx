import { createContext, ReactNode, SetStateAction, useState } from "react";

export const UserNames = createContext(
  undefined as unknown as UserNamesContextType
);

export const UserNameContext = ({ children }: { children: ReactNode }) => {
  const [userNames, setUserNames] = useState({
    githubUsername: "markossankey",
    gitlabUsername: "msankey1",
  });

  return (
    <UserNames.Provider value={{ userNames, setUserNames }}>
      {children}
    </UserNames.Provider>
  );
};

type UserNames = {
  gitlabUsername: string;
  githubUsername: string;
};

interface UserNamesContextType {
  userNames: UserNames;
  setUserNames: React.Dispatch<SetStateAction<UserNames>>;
}
