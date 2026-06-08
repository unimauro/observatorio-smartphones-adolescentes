import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { DataProvider } from "./lib/store";
import Layout from "./components/Layout";
import Panorama from "./pages/Panorama";
import SaludMental from "./pages/SaludMental";
import Educacion from "./pages/Educacion";
import Riesgos from "./pages/Riesgos";
import Familia from "./pages/Familia";
import Latam from "./pages/Latam";
import Peru from "./pages/Peru";
import Biblioteca from "./pages/Biblioteca";
import Timeline from "./pages/Timeline";
import Investigadores from "./pages/Investigadores";
import Faq from "./pages/Faq";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DataProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Panorama />} />
            <Route path="salud-mental" element={<SaludMental />} />
            <Route path="educacion" element={<Educacion />} />
            <Route path="riesgos" element={<Riesgos />} />
            <Route path="familia" element={<Familia />} />
            <Route path="latam" element={<Latam />} />
            <Route path="peru" element={<Peru />} />
            <Route path="biblioteca" element={<Biblioteca />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="investigadores" element={<Investigadores />} />
            <Route path="faq" element={<Faq />} />
          </Route>
        </Routes>
      </HashRouter>
    </DataProvider>
  </React.StrictMode>
);
