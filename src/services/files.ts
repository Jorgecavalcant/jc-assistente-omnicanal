
export function resolveFileLink(requested: string): { name: string; url: string } | null {
  const base = process.env.PUBLIC_FILES_BASE_URL || '';
  const catalogo: Record<string, string> = {
    'apresentacao': 'apresentacao.pdf',
    'ebook-diagnostico': 'ebook_diagnostico.pdf',
    'proposta-modelo': 'proposta_modelo.pdf'
  };
  const key = (requested || '').toLowerCase().trim();
  const fname = catalogo[key];
  if (!fname) return null;
  return { name: fname, url: `${base}/${encodeURIComponent(fname)}` };
}
