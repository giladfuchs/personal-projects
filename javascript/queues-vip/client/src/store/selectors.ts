//data
export const getBusiness = (state: any) => state.data.business;

export const getServices = (state: any) => state.data.services;
export const getSchedule = (state: any) => state.data.schedule;
export const getMat = (state: any) => state.data.mat;
export const getDays = (state: any) => state.data.days;
export const getDurationOfNewQueue = (state: any) =>
  state.data.durationOfNewQueue;

export const getStartMinTime = (state: any) => state.data.startMinTime;
export const getTimeDistance = (state: any) => state.data.timeDistance;
export const getPrice = (state: any) => state.data.price;

//auth
export const getPerson = (state: any) => state.auth.person;
export const getDomains = (state: any) => state.auth.domains;
export const getIsValidDomain = (state: any) => state.auth.isValidDomain;

//genral

export const getStep = (state: any) => state.general.step;
export const getLoading = (state: any) => state.general.loading;
export const getError = (state: any) => state.general.error;
export const getisLogin = (state: any) => state.general.isLogin;
export const getIsAdmin = (state: any) => state.general.isAdmin;
export const getIsTokenSet = (state: any) => state.general.isTokenSet;
