import { AuthState } from "./auth.types";

export const initialAuthState: AuthState = {
  person: { details: { firstName: "", lastName: "", phone: "" } },
  domains: [],
  isValidDomain: false,
};
