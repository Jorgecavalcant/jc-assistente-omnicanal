
import express from 'express';
import path from 'node:path';
import { bot } from './channels/telegram.js';
import { verifyWebhook } from './channels/whatsapp.js';

export function buildRouter() {
  const r = express.Router();

  const dir = process.env.FILES_DIR || path.resolve('public/files');
  r.use('/files', express.static(dir));

  r.get('/webhooks/whatsapp', verifyWebhook);

  return r;
}
