import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import TopCryptos from "./TopCryptos";
import Quiz from "./Quiz";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="Hot" element={<TopCryptos />} />
        <Route path="Quiz" element={<Quiz />} />
      </Route>
    </Routes>
  );
};

export default App;
