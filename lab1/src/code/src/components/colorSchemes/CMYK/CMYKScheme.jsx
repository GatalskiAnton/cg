import React from 'react';
import {cmykToRgb} from "../../../converters/rgbCmyk";

const CMYKScheme = ({cmykColor, setColor}) => {
        return (
        <div style={{display:'inline-block'}}>
            <table>
                <thead>
                <tr>
                    <th style={{colspan: "2", style: "text-align: center"}}>CMYK</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>C</td>
                    <td><input onChange={(e) => setColor(cmykToRgb({...cmykColor, c: e.target.value}))} type="range"
                               min="0" max="100" step="1" value={cmykColor.c} id="r-slider"/></td>
                    <td><input onChange={(e) => setColor(cmykToRgb({...cmykColor, c: e.target.value}))} style={{width: '40px'}} type="number" min="0" step="1" max="100" value={cmykColor.c}/></td>
                </tr>
                <tr>
                    <td>M</td>
                    <td><input onChange={(e) => setColor(cmykToRgb({...cmykColor, m: e.target.value}))} type="range" min="0" max="100" step="1" value={cmykColor.m} id="g-slider"/></td>
                    <td><input onChange={(e) => setColor(cmykToRgb({...cmykColor, m: e.target.value}))} style={{width: '40px'}} type="number" step="1" min="0" max="100" value={cmykColor.m}/></td>
                </tr>
                <tr>
                    <td>Y</td>
                    <td><input onChange={(e) => setColor(cmykToRgb({...cmykColor, y: e.target.value}))} type="range" min="0" max="100" step="1" value={cmykColor.y} id="b-slider"/></td>
                    <td><input onChange={(e) => setColor(cmykToRgb({...cmykColor, y: e.target.value}))} style={{width: '40px'}} type="number" min="0" max="100" value={cmykColor.y}/></td>
                </tr>
                <tr>
                    <td>K</td>
                    <td><input onChange={(e) => setColor(cmykToRgb({...cmykColor, k: e.target.value}))} type="range" min="0" max="100" step="1" value={cmykColor.k} id="b-slider"/></td>
                    <td><input onChange={(e) => setColor(cmykToRgb({...cmykColor, k: e.target.value}))} style={{width: '40px'}} type="number" min="0" step="1" max="100" value={cmykColor.k}/></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CMYKScheme;