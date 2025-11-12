
export type Channel = 'telegram' | 'whatsapp';

export interface IncomingMessage {
  channel: Channel;
  userId: string;
  text?: string;
}

export interface AssistantReply {
  text: string;
  action?: 'SCHEDULE' | 'SEND_FILE' | 'NONE';
  actionPayload?: any;
}
