import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PricingPage from "./pages/PricingPage";
import SigninPage from "./pages/SigninPage";
import DashboardPage from "./pages/DashboardPage";
import VerifyotpPage from "./pages/VerifyotpPage";
import SignUpPage from "./pages/SignUpPage";
import SignupVerify from "./pages/SignupVerify";
import ChattingPage from "./pages/ChatingPage";
import Aboutus from "./pages/Aboutus";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/pricing" element={<PricingPage/>}/>
        <Route path="/signin" element={<SigninPage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/signin/verifyotp" element={<VerifyotpPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signup/verifyotp" element={<SignupVerify/>}/>
        <Route path="/chatting" element={<ChattingPage/>}/>
        <Route path="/aboutus" element={<Aboutus/>}/>
      </Routes>
    </div>
  );
}

export default App;
