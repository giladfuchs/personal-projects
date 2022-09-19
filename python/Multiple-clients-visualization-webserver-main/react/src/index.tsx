import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';

// load mock apis

// project imports
// import * as serviceWorker from 'serviceWorker';
import App from 'App';

// style + assets

// ==============================|| REACT DOM RENDER  ||============================== //
const container = document.getElementById("root");

ReactDOM.render(
            <BrowserRouter basename="">
                <App />
            </BrowserRouter>
    ,
   container);
 