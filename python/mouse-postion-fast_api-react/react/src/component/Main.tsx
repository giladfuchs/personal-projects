import React from 'react';
import HeaderPage from './Header';
import HocNavigate from '../common/hooks/useNavigate';

function App() {
const navigate = HocNavigate();

  const savedCallback: any = React.useRef();

  console.log('main');
       

  const update_dashboard =async () => {

      const body =   await navigate.fetch_model_by_id()
      console.log(body);
      

  };
  React.useEffect(() => {
      savedCallback.current = update_dashboard;
  }, [update_dashboard]);

  React.useEffect(() => {

      
      update_dashboard()
      const timer = setInterval(
          () => savedCallback.current(),
          6000 * 1232
          // 60*1000
      );
      return () => clearInterval(timer);
  }, []);
  return (
<HeaderPage/>

  );
}

export default App;
