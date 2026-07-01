import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import LostPets from "./pages/LostPets";
import Sightings from "./pages/Sightings";
import ImageSearch from "./pages/ImageSearch";
import Caregivers from "./pages/Caregivers";
import Alerts from "./pages/Alerts";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pets" element={<LostPets />} />
          <Route path="/sightings" element={<Sightings />} />
          <Route path="/search" element={<ImageSearch />} />
          <Route path="/caregivers" element={<Caregivers />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}