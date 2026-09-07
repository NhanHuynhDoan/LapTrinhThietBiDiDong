import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { ImageSourcePropType } from "react-native";

export interface User {
  name: string;
  email: string;
  avatar: ImageSourcePropType;
}

interface UserContextValue {
  user: User | null;
  updateUserName: (name: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined,
);

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>({
    name: "Nguyễn Văn An",
    email: "huynhdoannhan@gmail.com",
    avatar: require("../image/avt.jpg"),
  });

  const updateUserName = (name: string) => {
    setUser((currentUser) =>
      currentUser ? { ...currentUser, name } : currentUser,
    );
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUserName, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser phải được sử dụng bên trong UserProvider");
  }

  return context;
}
