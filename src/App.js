import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Page404 from "./pages/Page404";
import "./style/style.css";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<About />} />
                    <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
