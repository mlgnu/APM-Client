import { createContext, useContext } from "react";
import { Profile } from "../hooks/useFetchProfile";

export const ProfileContext = createContext<Profile | undefined>(undefined);

export function useProfileContext() {
  const profile = useContext(ProfileContext);

  if (profile === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return profile;
}
