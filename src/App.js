import React from "react";
import routes from './routes'
import { useRoutes } from "react-router-dom";
import HeadTop from "./components/HeadTop";
import HeadMenu from "./components/HeadMenu";

import backImage from './static/backImage.jpg'
import './App.scss'

function App() {
    const element = useRoutes(routes)

    return (
        <div className="App">
            <img src={backImage} alt='' className="homeBack" />
            <div className="home">
                <div className="top">
                    <HeadTop />
                </div>
                <div className="menu">
                    <HeadMenu />
                </div>

                <div className="area">
                    {element}
                </div>
                <footer></footer>
            </div>
        </div>
    );
}

export default App;
