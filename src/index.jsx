import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react';

import App from './App.jsx'
import { AudioProvider } from './AudioContext.jsx';


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(

  <StrictMode>
    
    <AudioProvider>
        <App/>
    </AudioProvider>

  </StrictMode>
);

