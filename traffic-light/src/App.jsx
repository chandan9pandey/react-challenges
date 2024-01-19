import { useEffect, useState } from "react";
import "./App.css";
import Lights from "./Lights.jsx";
import "./App.css";

function App() {
	const colors = ["red", "yellow", "green"];
	const [lit, setLit] = useState("red");
	const texts = ["Stop", "Look & Wait", "Go"];
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (lit == "red") {
			setMessage("Stop");
		} else if (lit == "yellow") {
			setMessage("Look & Wait");
		} else if (lit == "green") {
			setMessage("Go");
		}
	});
	return (
		<div className="App">
			{colors.map((color) => {
				return <Lights color={color} lit={lit} key={color} setLit={setLit} />;
			})}
			<p className="message" style={{ color: lit }}>
				{message}
			</p>
		</div>
	);
}

export default App;
