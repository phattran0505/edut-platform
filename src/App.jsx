import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import History from "./pages/History";
import Suggestions from "./pages/Suggestions";
import ChatBot from "./components/chat/ChatBot";
import FooterInfo from "./components/layout/FooterInfo";
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container-custom md:px-4 px-0 md:pt-0 pt-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
          <Route path="/suggestions" element={<Suggestions />} />
        </Routes>
      </main>
      <ChatBot />
      <FooterInfo />
      <Footer />
    </div>
  );
};

export default App;
