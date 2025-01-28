type TGeoLocation = {
  lat: string;
  lng: string;
};

type TCompany = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type TAddress = {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  geo?: TGeoLocation;
};

export type TUserEntity = {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: TAddress;
  phone: string;
  website?: string;
  company?: TCompany;
};
