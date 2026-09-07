import { cardThankYou, CardLang } from '@/content/cardThankYou';

const CARD_URL = 'https://card.wbdigitalsolutions.com';

export interface CardContactFields {
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  note?: string;
}

const esc = (s: string) =>
  String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string));

export function thankYouHtml(lang: CardLang, name: string): string {
  const t = cardThankYou[lang];
  return `
  <div style="font-family: Arial, sans-serif; background:#f5f5f5; padding:24px;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
      <div style="background:linear-gradient(135deg,#350545,#792990);padding:26px 30px;">
        <h1 style="color:#fff;margin:0;font-size:20px;letter-spacing:.5px;">WB Digital Solutions</h1>
      </div>
      <div style="padding:30px;">
        <p style="color:#333;font-size:16px;margin:0 0 14px;">${t.greeting(esc(name))}</p>
        <p style="color:#444;line-height:1.6;margin:0;">${t.body}</p>
        <div style="text-align:center;margin:28px 0;">
          <a href="${CARD_URL}" style="display:inline-block;background-color:#350545;color:#ffb947 !important;font-weight:bold;font-size:15px;text-decoration:none;padding:15px 30px;border-radius:999px;border:2px solid #ffb947;">${t.cta}</a>
        </div>
        <p style="color:#444;line-height:1.6;margin:0;">${t.signoff}</p>
      </div>
      <div style="background:#1a0526;padding:16px 30px;text-align:center;">
        <a href="${CARD_URL}" style="color:#aaa6c3;font-size:12px;text-decoration:none;">card.wbdigitalsolutions.com</a>
      </div>
    </div>
  </div>`;
}

export function thankYouText(lang: CardLang, name: string): string {
  const t = cardThankYou[lang];
  const strip = (s: string) => s.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '');
  return `${t.greeting(name)}\n\n${strip(t.body)}\n\n${CARD_URL}\n\n${strip(t.signoff)}`;
}

export const adminNotificationHtml = (
  { name, phone, email, company, note }: CardContactFields,
) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <h2 style="color: #792990; border-bottom: 2px solid #792990; padding-bottom: 10px;">Novo contato do cartão digital</h2>
      <div style="margin: 20px 0;">
        <p style="color: #666; margin: 5px 0;"><strong>Nome:</strong></p>
        <p style="color: #333; margin: 5px 0 15px 0; padding: 10px; background:#f9f9f9; border-radius:5px;">${esc(name)}</p>
      </div>
      ${phone ? `<div style="margin: 20px 0;">
        <p style="color:#666;margin:5px 0;"><strong>Telefone:</strong></p>
        <p style="color:#333;margin:5px 0 15px 0;padding:10px;background:#f9f9f9;border-radius:5px;"><a href="tel:${esc(phone)}" style="color:#792990;text-decoration:none;">${esc(phone)}</a></p>
      </div>` : ''}
      ${email ? `<div style="margin: 20px 0;">
        <p style="color:#666;margin:5px 0;"><strong>Email:</strong></p>
        <p style="color:#333;margin:5px 0 15px 0;padding:10px;background:#f9f9f9;border-radius:5px;"><a href="mailto:${esc(email)}" style="color:#792990;text-decoration:none;">${esc(email)}</a></p>
      </div>` : ''}
      ${company ? `<div style="margin: 20px 0;">
        <p style="color:#666;margin:5px 0;"><strong>Empresa:</strong></p>
        <p style="color:#333;margin:5px 0 15px 0;padding:10px;background:#f9f9f9;border-radius:5px;">${esc(company)}</p>
      </div>` : ''}
      ${note ? `<div style="margin: 20px 0;">
        <p style="color:#666;margin:5px 0;"><strong>Nota:</strong></p>
        <p style="color:#333;margin:5px 0 15px 0;padding:15px;background:#f9f9f9;border-radius:5px;white-space:pre-wrap;">${esc(note)}</p>
      </div>` : ''}
      <div style="margin: 20px 0; padding: 12px 15px; background:#f3eafa; border-radius:5px; text-align:center;">
        <p style="color:#792990; margin:0; font-size:13px;">📎 Contato anexado (.vcf) — abra o anexo no celular para salvar na agenda.</p>
      </div>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
        <p style="color: #999; font-size: 12px;">Enviado pelo cartão digital — card.wbdigitalsolutions.com</p>
      </div>
    </div>
  </div>`;
