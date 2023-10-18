import './App.css'
import {HexColorPicker, RgbColorPicker} from "react-colorful";
import {useState} from "react";
import RGBScheme from "./components/colorSchemes/RGB/RGBScheme";
import HSLScheme from "./components/colorSchemes/HSL/HSLScheme";
import CMYKScheme from "./components/colorSchemes/CMYK/CMYKScheme";
import {rgbToCmyk} from './converters/rgbCmyk';
import {rgbToHsl} from "./converters/rgbHsl";

function App() {

    const [color, setColor] = useState({r: 60, g: 70, b: 103});

    return (
        <div className="app">
            <div style={{backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`}} className="content">
                <div className="converter">
                    <h1>Color converter</h1>
                    <hr/>
                    <div className="converter-content">
                        <div className="content-color-display">
                            <RgbColorPicker color={color} onChange={setColor}/>
                        </div>
                        <div className="content-inputs">
                            <RGBScheme rgbColor={color} setColor={setColor}></RGBScheme>
                            <HSLScheme hslColor={rgbToHsl(color)} setColor={setColor}></HSLScheme>
                            <CMYKScheme cmykColor={rgbToCmyk(color)} setColor={setColor}></CMYKScheme>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
