import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandForm from "./pages/LandForm";
import OwnerForm from "./pages/OwnerForm";
import AllHoldings from "./pages/AllHoldings";
import AllOwners from "./pages/AllOwners";
import SingleOwner from "./pages/SingleOwner";
import SingleLandHolding from "./pages/SingleLandHolding";

import ProtectedWrapper from "./components/ProtectedWrapper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/protected" element={<ProtectedWrapper />}>
          <Route path="owners/:ownerId/landHoldings" element={<LandForm />} />
          <Route path="ownerForm" element={<OwnerForm />} />
          <Route path="allHoldings" element={<AllHoldings />} />
          <Route path="owners" element={<AllOwners />} />
          <Route path="owners/:ownerId" element={<SingleOwner />} />
          <Route
            path="owners/:ownerId/landHoldings/:landHoldingId"
            element={<SingleLandHolding />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
