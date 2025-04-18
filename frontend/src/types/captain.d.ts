export interface Captain {
    email: string;
    fullName: {
        firstName: string;
        lastName: string;
        vehicle:{
            color: string,
            plate: string,
            capacity: number,
            vehicleType: string
        }
    };
    status: 'active' | 'inactive';


  }
  export type CaptainContextType = {
    captain: Captain | null;
    setCaptain: (captain: Captain) => void;
  };