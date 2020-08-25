import React, { useState,createContext } from 'react';
import './App.css';
import Leftpanel from './Components/Leftpanel';
import Rightchat from './Components/Rightchat';
// import connect from '/connect.png';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import InitialRight from './Components/InitialRight';
import Login from "./Components/Login"


const User = createContext();

function App() {
  
  const [user, setuser] = useState("")

  return (
    
    <User.Provider value={{ user, setuser }}>
    <div className="App"> 
      <BrowserRouter>
        <Switch>
         
          <Route exact path="/" >
            {
              (!user) ?<> <Redirect to="/"  /> <Login /></> :
                <>
                    <Leftpanel context={user}/>
                    <InitialRight />
                </>
            }

            </Route>
            <Route path="/rooms/:roomId" >
            {(!user) ?<> <Redirect to="/"  /> <Login /></> :
                <>
                <Leftpanel />
              <Rightchat context={user} />
              <Login/>
                </>}
          </Route>
        </Switch>
      </BrowserRouter>
      </div>
      </User.Provider>
  );
}

export default App;
export { User };
