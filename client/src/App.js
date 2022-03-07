import React from 'react';
import Routing from './Routes';
import { LoggedInContext } from './Context/LoggedInContext';
import { useState } from 'react';

import { useUser } from './auth/useUser';

function App() {
  //const user = useUser();

  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <LoggedInContext.Provider value={{loggedIn, setLoggedIn}}>
      <Routing/>
    </LoggedInContext.Provider>
  );
}


export default App;
