const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function createGame(name) {
  const response = await fetch(`${API_URL}/game/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    throw new Error("Impossible de créer la partie");
  }

  return response.json();
}


export async function joinGame(gameId, name) {
  const response = await fetch(`${API_URL}/game/${gameId}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    throw new Error("Impossible de rejoindre la partie");
  }

  return response.json();
}


export async function getState(gameId, playerId) {
  const response = await fetch(
    `${API_URL}/game/${gameId}/state?playerId=${encodeURIComponent(playerId)}`
  );

  if (!response.ok) {
    throw new Error("Impossible de récupérer l'état du jeu");
  }

  return response.json();
}