export interface RegisterForm {
  personalDetails: {
    firstName: string;
    lastName: string;
    phone: string;
    gender: string;
    onlyOrganizerNews: boolean;
    allNews: boolean;
  };
}
