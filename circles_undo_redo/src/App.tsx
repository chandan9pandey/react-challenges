import React, { useState } from "react";
import "./App.css";

type TPoint = {
	x: number;
	y: number;
};

function App() {
	const [points, setPoints] = useState<TPoint[]>([]);
	const [popped, setPopped] = useState<TPoint[]>([]);
	function handlePlaceCircle(e: React.MouseEvent<HTMLDivElement>) {
		const { clientX, clientY } = e;
		setPoints([
			...points,
			{
				x: clientX,
				y: clientY,
			},
		]);
	}
	function handleUndo() {
		// TODO: remove the last point added to array
		const newPoints = [...points];
		const poppedPoint = newPoints.pop();
		if (!poppedPoint) return;
		setPopped([...popped, poppedPoint]);
		setPoints(newPoints);
	}
	function handleRedo() {
		const newPopped = [...popped];
		const poppedPoint = newPopped.pop();
		if (!poppedPoint) return;
		setPoints([...points, poppedPoint]);
		setPopped(newPopped);
	}
	return (
		<>
			<button disabled={points.length === 0} onClick={handleUndo}>
				Undo
			</button>
			<button disabled={popped.length === 0} onClick={handleRedo}>
				Redo
			</button>
			<div className="App" onClick={handlePlaceCircle}>
				{points.map((point, idx) => (
					<div
						key={idx}
						className="point"
						style={{ left: point.x - 5 + "px", top: point.y - 5 + "px" }}
					></div>
				))}
			</div>
		</>
	);
}

export default App;
