import { useState } from "react";
import "./App.css";
import { useGetSynonyms } from "./hooks/useGetSynonynms";

function App() {
	const [word, setWord] = useState("");
	const { isLoading, synonyms, getSynonyms } = useGetSynonyms();

	const handleFetchSynonyms = async (e: React.FormEvent) => {
		e.preventDefault();
		getSynonyms(word);
	};
	const handleSynonymsClicked = (newWord: string) => {
		setWord(newWord);
		getSynonyms(word);
	};
	return (
		<div className="App">
			<form onSubmit={handleFetchSynonyms} action="">
				<label htmlFor="word">Your Word</label>
				<input
					value={word}
					type="text"
					id="word-input"
					onChange={(e) => setWord(e.target.value)}
				/>
				<button>Submit</button>
			</form>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<ul>
					{synonyms.map((synonym) => (
						<li
							onClick={() => handleSynonymsClicked(synonym.word)}
							key={synonym.word}
						>
							{synonym.word}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default App;
