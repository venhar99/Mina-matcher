// script.js

async function getMatches() {
    const localUrl = "data/matches.json"; // Path to the data file

    try {
        const response = await fetch(localUrl);
        const data = await response.json();

        console.log(data); // For debugging, shows data in browser console

        const matchesEl = document.getElementById("matches");
        if (matchesEl) {
            matchesEl.innerText = JSON.stringify(data, null, 2);
        }
    } catch (error) {
        console.error("Error loading local matches file:", error);
    }
}

getMatches();
