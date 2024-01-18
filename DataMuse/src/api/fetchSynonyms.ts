const BASE_URL = `https://api.datamuse.com`;
const fetchSynonyms = (word: string) => {
	return fetch(`${BASE_URL}/words?rel_syn=${word}`).then((response) =>
		response.json()
	);
};

export default fetchSynonyms;
