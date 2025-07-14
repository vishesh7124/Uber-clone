export interface User {
    email: string;
    fullName: {
        firstName: string;
        lastName: string;
    };
    _id?: string; 
  }
  export type UserContextType = {
    user: User;
    setUser: (user: User) => void;
  };