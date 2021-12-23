import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Explore from "./pages/Explore/Explore";
import Profile from "./pages/Profile/Profile";
import Create from "./pages/Create/Create";
import Navbar from "./components/Navbar/Navbar";
import CreateItem from "./pages/Create/CreateItem";
import { useWeb3React } from "@web3-react/core";
import CreatorPools from "./pages/CreatorPools/CreatorPools";

function App() {
  const { active } = useWeb3React();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/creatorpools" element={<CreatorPools />} />
        <Route path="/create" element={active ? <CreateItem /> : <Create />} />
        {/* <Route path="/createitem" element={<CreateItem />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
