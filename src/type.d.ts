export interface Auth {
  username: string;
  password: string;
}
export interface signupState {
  username: string;
  email: string;
  password: string;
  full_name: string;
}
export interface User {
  timestamp: string;
  success: boolean;
  message: string;
  data: {
    employeeId: string;
    accessToken: string;
  };
}
