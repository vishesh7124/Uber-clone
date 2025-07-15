export interface User {
    email: string;
    fullname: {
        firstname: string;
        lastname: string;
    };
    _id?: string; 
    socketId?: string;
  }
  export type UserContextType = {
    user: User;
    setUser: (user: User) => void;
  };