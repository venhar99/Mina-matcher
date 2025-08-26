document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("predictions");
    container.innerHTML = "Loading match data...";

    try {
        const response = await fetch("predictions.json");
        const data = await response.json();

        if (data && data.matches && data.matches.length > 0) {
            container.innerHTML = "";
            data.matches.slice(0, 10).forEach(match => {
                const div = document.createElement("div");
                div.textContent = `${match.homeTeam.name} vs ${match.awayTeam.name} – ${match.status}`;
                container.appendChild(div);
            });
        } else {
            container.innerHTML = "No matches found.";
        }
    } catch (error) {
        container.innerHTML = "Error loading match data.";
        console.error(error);
    }
});
