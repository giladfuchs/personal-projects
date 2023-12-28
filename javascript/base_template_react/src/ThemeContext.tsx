import React from 'react';

// const defaultState = {
//   dark: false,
// };

// const ThemeContext = createContext(defaultState);

// export default ThemeContext;
const ContextAccount = React.createContext<any>({
  acoount: [],
  setAccount: () => {}, //methode will update context value
  
})
export default ContextAccount;
