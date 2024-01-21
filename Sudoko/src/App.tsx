import { useState } from "react";
import "./App.css";

const getInitialGrid = () => [
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function App() {
	const [grid, setGrid] = useState<number[][]>(getInitialGrid());

	function setGridValue(rowIndex: number, colIndex: number, value: number) {
		const newGrid = [...grid];
		newGrid[rowIndex][colIndex] = value;
		setGrid(newGrid);
	}

	async function handleSolvePuzzle() {
		let puzzleAsString = "";
		for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
			for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
				const value = grid[colIndex][rowIndex];
				puzzleAsString += value === 0 ? "." : value;
			}
		}
		const response = await fetch("http://127.0.0.1:5000", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				sudoku: [puzzleAsString],
			}),
		});
		const json = await response.json();
		console.log(json);
		const solution = json.data[0].solution;
		console.log(solution);
		const newGrid = new Array(9).fill("").map(() => new Array(9).fill(0));
		for (let rowIndex = 0; rowIndex < newGrid.length; rowIndex++) {
			for (let colIndex = 0; colIndex < newGrid[rowIndex].length; colIndex++) {
				newGrid[colIndex][rowIndex] = parseInt(
					solution.charAt(rowIndex * 9 + colIndex)
				);
			}
		}
		setGrid(newGrid);
	}

	function clearSolvePuzzle() {
		setGrid(getInitialGrid());
	}

	return (
		<div className="App">
			<div className="container">
				<h2>Sudoku Solver</h2>
				<div className="grid">
					{grid.map((row, rowIndex) => (
						<div className="row" key={rowIndex}>
							{row.map((number, colIndex) => (
								<div className="cell" key={colIndex}>
									<input
										value={number}
										onChange={(e) =>
											setGridValue(
												rowIndex,
												colIndex,
												parseInt(e.target.value) || 0
											)
										}
									/>
								</div>
							))}
						</div>
					))}
				</div>
				<div className="btn-section">
					<button className="button-50" onClick={handleSolvePuzzle}>
						Solve
					</button>
					<button className="button-50" onClick={clearSolvePuzzle}>
						Clear
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
