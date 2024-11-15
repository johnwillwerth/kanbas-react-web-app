import React from 'react';
import Labs from "./Labs";
import Kanbas from './Kanbas';
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./Kanbas/store";
import Session from "./Kanbas/Account/Session";

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Session>
          <div>
            <Routes>
              <Route path="/" element={<Navigate to="/Kanbas" />} />
              <Route path="/Labs/*" element={<Labs />} />
              <Route path="/Kanbas/*" element={<Kanbas />} />
            </Routes>
          </div>
        </Session>
      </Provider>
    </HashRouter>
  );
}