import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Volontaire from "./pages/Volontaire";
import VolontaireForm from "./pages/volontaireForm";
import Alerte from "./pages/Alerte";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
//import Contact from "./pages/Contact";
//import About from "./pages/About";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
  
      <Route path="/Volontaire" element={<Volontaire />} />
      <Route path="/devenir-volontaire" element={<VolontaireForm />} />
      <Route path="/Alerte" element={<Alerte/>}/>
      <Route path="/ContactUs" element={<ContactUs/>} />
      <Route path="/About" element={<About/>} />
 
    </Routes>
  );
};

export default AppRouter;