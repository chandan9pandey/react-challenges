import { useEffect, useState } from "react";

import "./App.css";

function App() {
	const [color, setColor] = useState("");
	const [answers, setAnswers] = useState<string[]>([]);

	enum Result {
		correct,
		wrong,
	}

	const [result, setResult] = useState<Result | undefined>(undefined);

	const getRandomColor = () => {
		var letters = "0123456789ABCDEF";
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const generateColors = () => {
		const actualColor = getRandomColor();
		setColor(actualColor);
		setAnswers(
			[actualColor, getRandomColor(), getRandomColor()].sort(
				() => 0.5 - Math.random()
			)
		);
	};

	useEffect(() => {
		//TODO: Generate a random color
		generateColors();
	}, []);

	const handleAnswerClicked = (answer: string) => {
		if (answer === color) {
			setResult(Result.correct);
			generateColors();
		} else {
			setResult(Result.wrong);
		}
	};

	return (
		<div className="container">
			<div className="col">
				<h1 className="title">Guess the hexcode of color</h1>
				<div className="guess-me" style={{ background: color }}></div>
				{answers.map((answer) => (
					<button key={answer} onClick={() => handleAnswerClicked(answer)}>
						{answer}
					</button>
				))}
				{result === Result.wrong && <div className="wrong">Wrong Answer !</div>}
				{result === Result.correct && (
					<div className="correct">Correct Answer !</div>
				)}
			</div>
		</div>
	);
}

export default App;
