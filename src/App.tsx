// Packages importings
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// components importings
import Header from "./components/Header";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

// lazy loading importings
const Home = lazy(() => import("./components/Home"));
const Quize = lazy(() => import("./components/Quize"));
const Learning = lazy(() => import("./components/Learning"));
const Login = lazy(() => import("./components/Login"));
const Result = lazy(() => import("./components/Result"));

const App = () => {
  return (
    <Router>
      <Header />
   <Suspense fallback={<Loader/>}>

   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quize" element={<Quize />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/login" element={<Login />} />
        <Route path="/result" element={<Result />} />
      </Routes>
   </Suspense>
    </Router>
  );
};

export default App;
