import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface InteractiveGrapherProps {
  width?: number;
  height?: number;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  functionStr?: string;
}

const InteractiveGrapher: React.FC<InteractiveGrapherProps> = ({
  width = 600,
  height = 400,
  xMin: initialXMin = -10,
  xMax: initialXMax = 10,
  yMin: initialYMin = -10,
  yMax: initialYMax = 10,
  functionStr = 'Math.sin(x)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [xMin, setXMin] = useState(initialXMin);
  const [xMax, setXMax] = useState(initialXMax);
  const [yMin, setYMin] = useState(initialYMin);
  const [yMax, setYMax] = useState(initialYMax);
  const [currentFunction, setCurrentFunction] = useState(functionStr);
  const [inputFunction, setInputFunction] = useState(functionStr);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPosition, setLastPosition] = useState<Point | null>(null);
  const [error, setError] = useState<string | null>(null);

  const evalFunction = (x: number): number => {
    try {
      // eslint-disable-next-line no-new-func
      return Function('x', `return ${currentFunction}`)(x);
    } catch (e) {
      return 0;
    }
  };

  const updateGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    drawGrid(ctx);

    // Draw axes
    drawAxes(ctx);

    // Draw function
    drawFunction(ctx);
  };

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;

    // Vertical grid lines
    const xStep = width / (xMax - xMin);
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      const canvasX = ((x - xMin) / (xMax - xMin)) * width;
      ctx.beginPath();
      ctx.moveTo(canvasX, 0);
      ctx.lineTo(canvasX, height);
      ctx.stroke();
    }

    // Horizontal grid lines
    const yStep = height / (yMax - yMin);
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      const canvasY = height - ((y - yMin) / (yMax - yMin)) * height;
      ctx.beginPath();
      ctx.moveTo(0, canvasY);
      ctx.lineTo(width, canvasY);
      ctx.stroke();
    }
    ctx.restore();
  };

  const drawAxes = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.strokeStyle = '#4b5563';
    ctx.lineWidth = 1.5;

    // x-axis
    const yZero = height - ((0 - yMin) / (yMax - yMin)) * height;
    if (yZero >= 0 && yZero <= height) {
      ctx.beginPath();
      ctx.moveTo(0, yZero);
      ctx.lineTo(width, yZero);
      ctx.stroke();
    }

    // y-axis
    const xZero = ((0 - xMin) / (xMax - xMin)) * width;
    if (xZero >= 0 && xZero <= width) {
      ctx.beginPath();
      ctx.moveTo(xZero, 0);
      ctx.lineTo(xZero, height);
      ctx.stroke();
    }
    ctx.restore();
  };

  const drawFunction = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 2;
    ctx.beginPath();

    // Calculate points for the function
    const step = (xMax - xMin) / width;
    let prevY: number | null = null;

    for (let i = 0; i <= width; i++) {
      const x = xMin + i * step;
      try {
        const y = evalFunction(x);
        
        // Skip points outside of y range or non-numeric values
        if (isNaN(y) || y < yMin || y > yMax) {
          prevY = null;
          continue;
        }

        const canvasX = i;
        const canvasY = height - ((y - yMin) / (yMax - yMin)) * height;

        if (prevY === null) {
          ctx.moveTo(canvasX, canvasY);
        } else {
          // Only draw lines between points if the jump isn't too large
          const jump = Math.abs(canvasY - prevY);
          if (jump < height / 4) {
            ctx.lineTo(canvasX, canvasY);
          } else {
            ctx.moveTo(canvasX, canvasY);
          }
        }
        prevY = canvasY;
      } catch (e) {
        prevY = null;
      }
    }

    ctx.stroke();
    ctx.restore();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDragging(true);
    const rect = canvas.getBoundingClientRect();
    setLastPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !lastPosition) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = (x - lastPosition.x) * (xMax - xMin) / width;
    const dy = (y - lastPosition.y) * (yMax - yMin) / height;

    setXMin(prev => prev - dx);
    setXMax(prev => prev - dx);
    setYMin(prev => prev + dy);
    setYMax(prev => prev + dy);

    setLastPosition({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setLastPosition(null);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    
    const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate the point under the mouse in graph coordinates
    const graphX = xMin + (mouseX / width) * (xMax - xMin);
    const graphY = yMax - (mouseY / height) * (yMax - yMin);
    
    // Apply zoom
    const newXMin = graphX - (graphX - xMin) * zoomFactor;
    const newXMax = graphX + (xMax - graphX) * zoomFactor;
    const newYMin = graphY - (graphY - yMin) * zoomFactor;
    const newYMax = graphY + (yMax - graphY) * zoomFactor;
    
    setXMin(newXMin);
    setXMax(newXMax);
    setYMin(newYMin);
    setYMax(newYMax);
  };

  const handleFunctionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Test if the function can be evaluated
      const testX = 0;
      // eslint-disable-next-line no-new-func
      Function('x', `return ${inputFunction}`)(testX);
      
      setCurrentFunction(inputFunction);
      setError(null);
    } catch (e) {
      setError('Fonction invalide. Vérifiez la syntaxe.');
    }
  };

  const handleReset = () => {
    setXMin(initialXMin);
    setXMax(initialXMax);
    setYMin(initialYMin);
    setYMax(initialYMax);
    setCurrentFunction(functionStr);
    setInputFunction(functionStr);
    setError(null);
  };

  // Draw the graph when component mounts or any parameter changes
  useEffect(() => {
    updateGraph();
  }, [xMin, xMax, yMin, yMax, currentFunction, width, height]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <form onSubmit={handleFunctionSubmit} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-2">
          <div className="flex-grow">
            <label htmlFor="function" className="block text-sm font-medium text-gray-700 mb-1">
              Fonction f(x) =
            </label>
            <input
              type="text"
              id="function"
              value={inputFunction}
              onChange={(e) => setInputFunction(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ex: Math.sin(x)"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex gap-2 sm:self-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Tracer
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </form>

      <div className="border border-gray-200 rounded-md overflow-hidden mb-3 max-w-full">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className={`w-full max-w-full h-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        />
      </div>

      <div className="text-sm text-gray-500 mb-1">
        Domaine: x ∈ [{xMin.toFixed(2)}, {xMax.toFixed(2)}], y ∈ [{yMin.toFixed(2)}, {yMax.toFixed(2)}]
      </div>
      <div className="text-sm text-gray-500">
        <em>Astuce: Faites glisser pour déplacer et utilisez la molette pour zoomer</em>
      </div>
    </div>
  );
};

export default InteractiveGrapher;