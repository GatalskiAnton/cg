import classes from './App.module.css'
import {useEffect, useRef, useState} from "react";
import {drawBresenham, drawStepByStep} from "./rasterAlgo";

function App() {
    const [coordinates, setCoordinates] = useState({x1: 0, y1: 0, x2: 0, y2: 0})
    const [algoTime, setAlgoTime] = useState({stepByStep: 0, Bresenham: 0})
    const canvasRef = useRef();
    const [logs, setLogs] = useState([])
    const gridSize = 15
    const padding = 15

    const drawGrid = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width - padding * 2
        const height = canvas.height - padding * 2

        //draw axes
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText('x', 5 * gridSize + 5, 20);
        ctx.moveTo(15, 15)
        ctx.lineTo(5 * gridSize + 5, 15)
        ctx.moveTo(5 * gridSize + 5, 15)
        ctx.lineTo(5 * gridSize + 5 - 15, 10)
        ctx.moveTo(5 * gridSize + 5, 15)
        ctx.lineTo(5 * gridSize + 5 - 15, 20)

        ctx.fillText('y', 10, 5 * gridSize + 30);
        ctx.moveTo(15, 15)
        ctx.lineTo(15, 5 * gridSize + 15)
        ctx.moveTo(15, 5 * gridSize + 15)
        ctx.lineTo(20, 5 * gridSize)
        ctx.moveTo(15, 5 * gridSize + 15)
        ctx.lineTo(10, 5 * gridSize)
        ctx.font = "12px Arial";
        ctx.fillStyle = "black"
        //draw grid
        for (let i = gridSize; i < width - padding * 2; i += gridSize) {
            ctx.moveTo(padding * 2 + 15, i + padding * 2)
            ctx.lineTo(height - 5, i + padding * 2)
            ctx.moveTo(i + padding * 2, padding * 2 + 15)
            ctx.lineTo(i + padding * 2, width - 5)
            ctx.stroke();
        }

        //draw coordinates
        for (let i = gridSize; i < width - padding * 3; i += gridSize) {
            ctx.fillText(i / gridSize - 1, padding + 10, i + padding * 2 + 12);
            ctx.fillText(i / gridSize - 1, i + padding * 2, padding * 2 + 15 - 12);
        }
    }

    useEffect(() => {
        drawGrid()
    }, []);


    const drawLineByPoints = (points) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        drawGrid()
        if (points.length > 0) ctx.moveTo(points[0][0], points[0][1]);
        ctx.fillRect(points[0][0], points[0][1], 16, 16);
        for (let i = 1; i < points.length; i++) {
            ctx.fillRect(points[i][0], points[i][1], 16, 16);
        }
        ctx.stroke();
        ctx.closePath();
    };


    const handleBresenham = () => {
        const start = new Date()
        setLogs([])
        const points = drawBresenham(coordinates.x1, coordinates.y1, coordinates.x2, coordinates.y2, gridSize, setLogs)
        drawLineByPoints(points)
        const end = new Date()
        setAlgoTime({...algoTime, Bresenham: (end.getTime() - start.getTime())})
    }

    const handleStepByStep = () =>{
        const start = new Date()
        setLogs([])
        const points = drawStepByStep(coordinates.x1, coordinates.y1, coordinates.x2, coordinates.y2, gridSize, setLogs)
        drawLineByPoints(points)
        const end = new Date()
        setAlgoTime({...algoTime, stepByStep: (end.getTime() - start.getTime())})
    }


    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid()
        setAlgoTime({stepByStep: 0, Bresenham: 0})
        setLogs([])
    }

    return (
        <div>
            <div className={classes.canvasContainer}>
                <div>
                    <button onClick={handleStepByStep}>Step-by-step
                    </button>
                    <div>Time: {algoTime.stepByStep}ms.</div>
                </div>
                <canvas ref={canvasRef} width={500} height={500}></canvas>
                <div>
                    <button onClick={handleBresenham}>Bresenham
                    </button>
                    <div>Time: {algoTime.Bresenham}ms.</div>
                </div>

            </div>
            <div className={classes.inputContainer}>
                <div className={classes.coordinatesContainer}>
                    <div className={classes.point}>
                        <span>Start point</span>
                        <div>x
                            <input max={27} min={0} onChange={(e) => {
                                setCoordinates({...coordinates, x1: Number(e.target.value)})
                            }} type="number"/>
                        </div>
                        <div>y
                            <input max={27} min={0} onChange={(e) => {
                                setCoordinates({...coordinates, y1: Number(e.target.value)})
                            }} type="number"/>
                        </div>
                    </div>
                    <div>
                        <button onClick={clearCanvas}>Clear</button>
                    </div>
                    <div className={classes.point}>
                        <span>End point</span>
                        <div>x
                            <input max={27} min={0} onChange={(e) => {
                                setCoordinates({...coordinates, x2: Number(e.target.value)})
                            }} type="number"/>
                        </div>
                        <div>y
                            <input max={27} min={0} onChange={(e) => {
                                setCoordinates({...coordinates, y2: Number(e.target.value)})
                            }} type="number"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.logContainer}>
                <div>Logs</div>
                <div className={classes.logContent}>
                    {logs.map(log =>
                        <div className={classes.logMessage}>{log}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
