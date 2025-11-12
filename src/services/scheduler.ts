
import axios from 'axios';

const N8N_BASE_URL = process.env.N8N_BASE_URL!;
const N8N_API_KEY = process.env.N8N_API_KEY!;

export async function scheduleViaN8N(payload: {
  who: string;
  date: string; // ISO ou dd/mm/yyyy
  time: string; // HH:mm
  durationMin?: number;
  title?: string;
  description?: string;
  attendeeEmail?: string;
}) {
  const url = `${N8N_BASE_URL}/webhook/schedule_meeting`;
  const { data } = await axios.post(url, payload, {
    headers: { 'X-N8N-API-KEY': N8N_API_KEY }
  });
  return data;
}
