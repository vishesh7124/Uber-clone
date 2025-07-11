export interface Captain {
    email: string;
    fullname: {
        firstname: string;
        lastname: string;
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