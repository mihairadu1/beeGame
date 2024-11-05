import { LocalStorageManager } from "../utils/localstorage-manager"

document.addEventListener("DOMContentLoaded", () => {
    const playerNameInput = document.getElementById("player-name-input") as HTMLInputElement;
    const startButton = document.getElementById("action-button") as HTMLButtonElement;

    startButton.addEventListener("click", () => {
        const playerName = playerNameInput.value.trim() || "Unknown Player";
        LocalStorageManager.save("playerName", playerName);
        window.location.href = "game.html";
    });
});
