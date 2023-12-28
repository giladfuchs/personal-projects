import { GeneralState } from '../../common/types/redux';

export const initialGeneralState: GeneralState = {
  error: '',
  loading: false,
  isTokenSet: false,
  success_api: false,
  accounts_users: [],
  accounts: [],
  devices: [],
  networks: [],
};
