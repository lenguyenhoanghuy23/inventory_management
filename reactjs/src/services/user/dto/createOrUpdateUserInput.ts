export interface CreateOrUpdateUserInput {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  roleNames: string[];
  orgNames: string[];
  password: string;
  id: number;
}
