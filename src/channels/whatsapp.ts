
import axios from 'axios';

const WATOKEN = process.env.WHATSAPP_TOKEN!;
const PHONE_ID = process.env.WHATSAPP_PHONE_ID!;
const VERIFY = process.env.WHATSAPP_VERIFY_TOKEN!;

export function verifyWebhook(req: any, res: any) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY) return res.status(200).send(challenge);
  return res.sendStatus(403);
}

export async function sendWA(to: string, text: string) {
  await axios.post(`https://graph.facebook.com/v19.0/${PHONE_ID}/messages`, {
    messaging_product: 'whatsapp', to, type: 'text', text: { body: text }
  }, { headers: { Authorization: `Bearer ${WATOKEN}` }});
}
