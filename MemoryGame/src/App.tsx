import { useState } from "react";
import "./App.css";

type TCell = {
	row: number;
	col: number;
};

function App() {
	const [grid, setGrid] = useState(generateRandomArray(4, 4));

	const [previousClicked, setPreviousClicked] = useState<TCell | undefined>();

	const [revealedGrid, setRevealedGrid] = useState(
		new Array(grid.length)
			.fill("")
			.map(() => new Array(grid[0].length).fill(false))
	);

	function generateRandomArray(rows: number, cols: number) {
		// Create a 2D array
		let array = [];

		// Populate the array with unique numbers in random order
		let numbers = Array.from(
			{ length: (rows * cols) / 2 },
			(_, index) => index + 1
		);
		numbers = [...numbers, ...numbers]; // Duplicate the numbers to have pairs

		// Shuffle the array
		for (let i = numbers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[numbers[i], numbers[j]] = [numbers[j], numbers[i]];
		}

		// Fill the 2D array with shuffled numbers
		for (let i = 0; i < rows; i++) {
			let row = [];
			for (let j = 0; j < cols; j++) {
				row.push(numbers[i * cols + j]);
			}
			array.push(row);
		}

		return array;
	}

	function handleCardClicked(rowIndex: number, colIndex: number) {
		if (revealedGrid[rowIndex][colIndex]) return;
		const clickedNumber = grid[rowIndex][colIndex];
		const newRevealedGrid = [...revealedGrid];
		newRevealedGrid[rowIndex][colIndex] = true;
		setRevealedGrid(newRevealedGrid);
		if (previousClicked) {
			const previousClickedNumber =
				grid[previousClicked.row][previousClicked.col];
			if (previousClickedNumber !== clickedNumber) {
				//if they don't match, hide them after 1 sec
				setTimeout(() => {
					newRevealedGrid[rowIndex][colIndex] = false;
					newRevealedGrid[previousClicked.row][previousClicked.col] = false;
					setRevealedGrid([...newRevealedGrid]);
				}, 1000);
			} else {
				//check if everything has been reveal, then show an alert
				const hasWon = revealedGrid.flat().every((isRevealed) => isRevealed);
				if (hasWon) {
					setTimeout(() => {
						alert("You won!");
					}, 500);
				}
			}
			setPreviousClicked(undefined);
		} else {
			setPreviousClicked({ row: rowIndex, col: colIndex });
		}
	}

	return (
		<div className="App">
			<h2 style={{ marginBottom: "70px" }}>Memory Game</h2>
			<div className="grid">
				{grid.map((row, rowIndex) => (
					<div key={rowIndex} className="row">
						{row.map((number, colIndex) => (
							<div
								onClick={() => handleCardClicked(rowIndex, colIndex)}
								key={colIndex}
								className={
									"card" + (revealedGrid[rowIndex][colIndex] ? " revealed" : "")
								}
							>
								{revealedGrid[rowIndex][colIndex] ? number : ""}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
