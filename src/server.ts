
import 'dotenv/config';
import express from 'express';
import { buildRouter } from './router.js';
import { bot } from './channels/telegram.js';

const app = express();
app.use(express.json());
app.use(buildRouter());

const PORT = Number(process.env.PORT || 8080);

app.listen(PORT, async () => {
  console.log(`Server on http://localhost:${PORT}`);
  await bot.launch();
  console.log('Telegram bot is running (polling).');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
