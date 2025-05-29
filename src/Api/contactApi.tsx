
import axios from 'axios';

interface ContactData {
  name: string;
  email: string;
  message: string;
}

export const sendContactMessage = async (contactData: ContactData): Promise<void> => {
  const url = 'http://localhost:8085/api/contact'; // adapte l'URL ici
  await axios.post(url, contactData);
};
