
import type { AssistantReply } from '../types.js';

export function detectIntent(text: string): AssistantReply {
  const t = (text || '').toLowerCase();
  if (/(agendar|reuni[aã]o|marcar|agenda).*(hoje|amanh[ãa]|\d{1,2}\/\d{1,2})/.test(t)) {
    return { text: 'Posso agendar. Me diga: data, horário e assunto.', action: 'SCHEDULE' };
  }
  if (/(enviar|mandar).*(arquivo|pdf|ebook|proposta|contrato)/.test(t)) {
    return { text: 'Qual arquivo você precisa? Tenho catálogos e propostas.', action: 'SEND_FILE' };
  }
  return { text: 'Como posso ajudar? Posso agendar reuniões e enviar materiais.', action: 'NONE' };
}
