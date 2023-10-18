import React from 'react';

const RgbScheme = ({rgbColor, setColor}) => {
    return (
        <div style={{display:'inline-block'}}>
            <table>
                <thead>
                <tr>
                    <th style={{colspan: "2", style: "text-align: center"}}>RGB</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>R</td>
                    <td><input onChange={(e) => setColor({...rgbColor, r: e.target.value})} type="range" min="0"
                               max="255" step="1" value={rgbColor.r} id="r-slider"/></td>
                    <td><input onChange={(e) => setColor({...rgbColor, r: e.target.value})} style={{width: '40px'}}
                               type="number" min="0" max="255" value={rgbColor.r}/></td>
                </tr>
                <tr>
                    <td>G</td>
                    <td><input onChange={(e) => setColor({...rgbColor, g: e.target.value})} type="range" min="0"
                               max="255" step="1" value={rgbColor.g} id="g-slider"/></td>
                    <td><input onChange={(e) => setColor({...rgbColor, g: e.target.value})} style={{width: '40px'}}
                               type="number" min="0" max="255" value={rgbColor.g}/></td>
                </tr>
                <tr>
                    <td>B</td>
                    <td><input onChange={(e) => setColor({...rgbColor, b: e.target.value})} type="range" min="0"
                               max="255" step="1" value={rgbColor.b} id="b-slider"/></td>
                    <td><input onChange={(e) => setColor({...rgbColor, b: e.target.value})} style={{width: '40px'}}
                               type="number" min="0" max="255" value={rgbColor.b}/></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RgbScheme;