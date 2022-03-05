export type BusinessDetails = {
  details: {
    organization: string;
    address: string;
    phone: string;
  };

  otherData: {
    logo?: string;
    links?: { [key: string]: string };
    about?: string;
    notifications?: [string];
    guestPermission: boolean;
  };
};
