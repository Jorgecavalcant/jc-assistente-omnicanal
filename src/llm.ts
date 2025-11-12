
import axios from 'axios';

const provider = process.env.LLM_PROVIDER || 'ollama';

export async function chatLLM(system: string, user: string): Promise<string> {
  if (provider === 'openai') return openaiChat(system, user);
  return ollamaChat(system, user);
}

async function ollamaChat(system: string, user: string): Promise<string> {
  const host = process.env.OLLAMA_HOST || 'http://localhost:11434';
  const model = process.env.OLLAMA_MODEL || 'phi4:Q4_0';
  const { data } = await axios.post(`${host}/api/chat`, {
    model,
    options: {
      temperature: 0.5,
      num_ctx: 1024,
      low_vram: true
    },
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ]
  }, { timeout: 120000 });
  const content = data?.message?.content;
  return content || 'Desculpe, não consegui gerar uma resposta agora.';
}

async function openaiChat(system: string, user: string): Promise<string> {
  const key = process.env.OPENAI_API_KEY!;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const { data } = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user }
      ]
    },
    { headers: { Authorization: `Bearer ${key}` }, timeout: 120000 }
  );
  return data.choices?.[0]?.message?.content || 'Sem resposta.';
}
