import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Components/SignIn/SignIn.component";
import Register from "./Components/SignUp/SignUp.component";
import ProductListing from "./Components/ProductListing/ProductListing.component";
import Header from "./Components/Header/Header.component";
import Footer from "./Components/Footer/Footer.component";
import './AssetFunctions/FontawesomeLib';
// import {FontAwesome} from './Assets/FontawesomeLib';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <FontAwesome /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path='/cart' element={<Cart />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductListing />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
