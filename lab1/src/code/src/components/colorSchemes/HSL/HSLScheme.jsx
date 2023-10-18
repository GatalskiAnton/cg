import React from 'react';
import {hslToRgb} from "../../../converters/rgbHsl";

const HSLScheme = ({hslColor, setColor}) => {
    return (
        <div style={{display:'inline-block'}}>
            <table >
                <thead>
                <tr>
                    <th style={{colspan: "2", style: "text-align: center"}}>HSL</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>H</td>
                    <td><input type="range"
                               onChange={(e) => setColor(hslToRgb({...hslColor, h: e.target.value / 360}))}
                               min="0" max="359" step="1" value={Math.round(hslColor.h * 360)} id="h-slider"/></td>
                    <td><input
                        onChange={(e) => setColor(hslToRgb({...hslColor, h: e.target.value / 360}))}

                        style={{width: '40px'}} type="number" min="0" max="360" value={Math.round(hslColor.h * 360)}/>
                    </td>
                </tr>
                <tr>
                    <td>S</td>
                    <td><input type="range"
                               onChange={(e) => setColor(hslToRgb({...hslColor, s: e.target.value / 100}))}
                               min="0" max="100" step="1" value={Math.round(hslColor.s*100)}
                               id="s-slider"/></td>
                    <td><input
                        onChange={(e) => setColor(hslToRgb({...hslColor, s: e.target.value / 100}))}

                        style={{width: '40px'}} type="number" min="0" max="100"
                        value={Math.round(hslColor.s*100)}/></td>
                </tr>
                <tr>
                    <td>L</td>
                    <td><input
                        onChange={(e) => setColor(hslToRgb({...hslColor, l: e.target.value / 100}))}
                        type="range" min="0" max="100" step="1" value={Math.round(hslColor.l*100)}
                               id="l-slider"/></td>
                    <td><input
                        onChange={(e) => setColor(hslToRgb({...hslColor, l: e.target.value / 100}))}
                        style={{width: '40px'}} type="number" min="0" max="100"
                               value={Math.round(hslColor.l*100)}/></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default HSLScheme;