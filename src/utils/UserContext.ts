import { createContext, useContext } from "react";
import { UserType } from "../hooks/useFetchUser";

export const UserContext = createContext<UserType | undefined>(undefined);

export function useUserContext() {
  const user = useContext(UserContext);

  if (user === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return user;
}

