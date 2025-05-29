import axios from "axios";

export interface Catastrophe {
    id: number;
    type: string;
    date: string;
    pays: string;
    latitude: number;
    longitude: number;
    niveauUrgence: string;
    etat: string;
  }



export const fetchCatastrophes = async (): Promise<Catastrophe[]> => {
    try {
      const response = await axios.get<Catastrophe[]>('http://localhost:8085/api/catastrophes');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catastrophes:', error);
      throw error;
    }
};
