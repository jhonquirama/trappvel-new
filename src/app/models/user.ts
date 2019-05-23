export interface UserInterface {
  id?: string;
  name?: string;
  lastName?: string;
  age?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  photoUrl?: string;
  rol?: string;// los usuarios se identificaran con 0=seguidor de lugares   1= creador de lugares  2=admin
}
