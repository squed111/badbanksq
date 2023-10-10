import { Route, Routes } from "react-router-dom";
import { Login, 
         CreateAccount, 
         Auth,
         Deposit,
         Withdraw,
         Logout, } from "./pages";
import Home from "./pages/Home";
import  Navbar  from "./components/navbar";


function App() {


  return (
    <div className="App">
      <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/deposit' element={<Deposit />} />
        <Route path='/withdraw' element={<Withdraw />} />
        <Route path='/logout' element={<Logout />} />
        
      </Routes>
    </div>
  );
}

export default App;