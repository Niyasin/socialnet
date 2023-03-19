import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

function App() {
  const [user,setUser]=useState(null);
  return (<>
    {user?<>
      <Home user={user}/>
    </>:
      <Login setUser={setUser}/>
    }
  </>
  );
}

export default App;
