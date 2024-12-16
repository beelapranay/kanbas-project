import Labs from "./Labs";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Kanbas from "./Kanbas";
import { Provider } from "react-redux";
import store from "./Kanbas/store";
import LandingPage from "./LandingPage";
export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="LandingPage" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
            <Route path='/LandingPage' element={<LandingPage />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}