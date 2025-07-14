export interface Captain {
    email: string;
    fullname: {
        firstname: string;
        lastname: string;
    };
    vehicle:{
          color: string,
          plate: string,
          capacity: number,
          vehicleType: string
    }
    status: 'active' | 'inactive';
    _id?: string;


  }
  export type CaptainContextType = {
    captain: Captain | null;
    setCaptain: (captain: Captain) => void;
  };