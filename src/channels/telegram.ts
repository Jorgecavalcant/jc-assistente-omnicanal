
import { Telegraf } from 'telegraf';
import { chatLLM } from '../llm.js';
import { detectIntent } from '../services/intent.js';
import { scheduleViaN8N } from '../services/scheduler.js';
import { resolveFileLink } from '../services/files.js';

const token = process.env.TELEGRAM_BOT_TOKEN!;
export const bot = new Telegraf(token);

const SYSTEM = 'Você é um assistente de atendimento da JC Planejamento. Responda sempre em pt-BR, de forma objetiva, cordial e clara.';

bot.on('text', async (ctx) => {
  const text = ctx.message.text || '';
  const intent = detectIntent(text);

  if (intent.action === 'SCHEDULE') {
    await ctx.reply('Ótimo! Envie no formato: "Agendar dd/mm/yyyy HH:mm – Assunto – email"');
    return;
  }
  if (intent.action === 'SEND_FILE') {
    await ctx.reply('Qual arquivo? Opções: "apresentacao", "ebook-diagnostico", "proposta-modelo"');
    return;
  }

  const answer = await chatLLM(SYSTEM, text);
  await ctx.reply(answer);
});

bot.hears(/^agendar\s+(\d{1,2}\/\d{1,2}\/\d{2,4})\s+(\d{2}:\d{2})\s+[-–]\s+([^–]+)(?:[-–]\s*(\S+@\S+))?/i, async (ctx) => {
  const m = ctx.match as RegExpMatchArray;
  const [_, d, h, assunto, email] = m;
  await scheduleViaN8N({ who: ctx.from.username || String(ctx.from.id), date: d, time: h, title: assunto.trim(), attendeeEmail: email });
  await ctx.reply('Reunião enviada para agendamento no Google Calendar. Você receberá o convite em instantes.');
});

bot.hears(/^arquivo\s+(.+)/i, async (ctx) => {
  const req = (ctx.match as RegExpMatchArray)[1];
  const file = resolveFileLink(req);
  if (!file) return ctx.reply('Arquivo não encontrado. Tente: apresentacao, ebook-diagnostico, proposta-modelo');
  await ctx.reply(`Aqui está: ${file.url}`);
});
