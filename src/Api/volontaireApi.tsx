// src/Api/volontaireApi.ts
export interface Volunteer {
    id: number;
    competences: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  }
  
  export async function fetchVolontaires(): Promise<Volunteer[]> {
    const response = await fetch("http://localhost:8085/api/volontaires");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des volontaires");
    }
    return response.json();
  }
  