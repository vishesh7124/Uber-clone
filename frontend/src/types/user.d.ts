export interface User {
    email: string;
    fullName: {
        firstName: string;
        lastName: string;
    };

  }
  export type UserContextType = {
    user: User;
  };