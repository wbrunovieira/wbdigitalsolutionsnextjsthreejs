// Branded, email-safe HTML templates for the contact form (auto-reply to the
// visitor + internal notification). Plain ESM, no framework/node deps so it can
// be imported by the Next API route AND rendered by a preview script.
//
// Email constraints honoured:
//  - table layout, inline styles, raster-free logo (CSS "WB" badge + wordmark —
//    Gmail strips SVG), gradient with a solid fallback for Outlook.
//  - DARK-MODE SAFE: the whole email is dark by design with light text, using
//    colours dark enough that Gmail/Outlook dark mode leaves them alone (it only
//    aggressively inverts near-white surfaces). So it reads correctly whether the
//    client is in light or dark mode — nothing light to invert badly.

const C = {
  bg: "#120a18", // page background
  card: "#1f0f2e", // main card
  inset: "#2a1740", // field boxes / insets
  border: "rgba(255,255,255,0.10)",
  head: "#ffffff",
  text: "#e9e0f1",
  muted: "#a896ba",
  primary: "#350545",
  purple: "#792990",
  accent: "#ffb947",
  footerBg: "#0d0713",
  okBg: "rgba(74,222,128,0.16)",
  ok: "#4ade80",
};

const BRAND = {
  site: "https://www.wbdigitalsolutions.com",
  email: "bruno@wbdigitalsolutions.com",
  whatsappLabel: "+55 11 98286-4581",
  whatsappLink: "https://wa.me/5511982864581",
  year: 2026,
};

const STRINGS = {
  "en": {
    flag: "🇬🇧", langName: "English",
    subject: (name) => `New contact message — ${name}`,
    autoReplySubject: "Thank you for reaching out — WB Digital Solutions",
    tagline: "Websites, Systems, AI & Automation that drive results",
    main: { eyebrow: "New contact message", name: "Name", email: "Email", message: "Message", via: "Sent via the WB Digital Solutions website" },
    reply: { title: "Thank you for reaching out!", greeting: (n) => `Hello ${n},`, body: "We’ve received your message and our team will get back to you shortly. In the meantime, feel free to explore the work we do.", cta: "View our projects", signoff: "Warm regards,", team: "The WB Digital Solutions Team" },
    footer: { reach: "Reach us", rights: "All rights reserved" },
  },
  "pt-BR": {
    flag: "🇧🇷", langName: "Português",
    subject: (name) => `Nova mensagem de contato — ${name}`,
    autoReplySubject: "Obrigado pelo seu contato — WB Digital Solutions",
    tagline: "Sites, Sistemas, IA e Automação que geram resultados",
    main: { eyebrow: "Nova mensagem de contato", name: "Nome", email: "Email", message: "Mensagem", via: "Enviado pelo site da WB Digital Solutions" },
    reply: { title: "Obrigado pelo seu contato!", greeting: (n) => `Olá ${n},`, body: "Recebemos a sua mensagem e nossa equipe vai te retornar em breve. Enquanto isso, fique à vontade para conhecer os trabalhos que realizamos.", cta: "Ver nossos projetos", signoff: "Atenciosamente,", team: "Equipe WB Digital Solutions" },
    footer: { reach: "Fale com a gente", rights: "Todos os direitos reservados" },
  },
  "es": {
    flag: "🇪🇸", langName: "Español",
    subject: (name) => `Nuevo mensaje de contacto — ${name}`,
    autoReplySubject: "Gracias por tu contacto — WB Digital Solutions",
    tagline: "Sitios, Sistemas, IA y Automatización que generan resultados",
    main: { eyebrow: "Nuevo mensaje de contacto", name: "Nombre", email: "Correo", message: "Mensaje", via: "Enviado desde el sitio de WB Digital Solutions" },
    reply: { title: "¡Gracias por tu contacto!", greeting: (n) => `Hola ${n},`, body: "Hemos recibido tu mensaje y nuestro equipo te responderá muy pronto. Mientras tanto, te invitamos a conocer nuestro trabajo.", cta: "Ver nuestros proyectos", signoff: "Saludos cordiales,", team: "Equipo WB Digital Solutions" },
    footer: { reach: "Habla con nosotros", rights: "Todos los derechos reservados" },
  },
  "it": {
    flag: "🇮🇹", langName: "Italiano",
    subject: (name) => `Nuovo messaggio di contatto — ${name}`,
    autoReplySubject: "Grazie per il tuo contatto — WB Digital Solutions",
    tagline: "Siti, Sistemi, IA e Automazione che generano risultati",
    main: { eyebrow: "Nuovo messaggio di contatto", name: "Nome", email: "Email", message: "Messaggio", via: "Inviato dal sito di WB Digital Solutions" },
    reply: { title: "Grazie per il tuo contatto!", greeting: (n) => `Ciao ${n},`, body: "Abbiamo ricevuto il tuo messaggio e il nostro team ti risponderà a breve. Nel frattempo, dai un’occhiata ai lavori che realizziamo.", cta: "Vedi i nostri progetti", signoff: "Cordiali saluti,", team: "Team WB Digital Solutions" },
    footer: { reach: "Scrivici", rights: "Tutti i diritti riservati" },
  },
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Header: raster-free logo lockup (round "WB" badge + wordmark) on a brand
// gradient (solid #350545 fallback for Outlook), with a yellow accent rule.
function header(s) {
  return `
  <tr>
    <td bgcolor="${C.primary}" style="background:${C.primary};background-image:linear-gradient(135deg,${C.primary} 0%,${C.purple} 100%);padding:26px 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="vertical-align:middle;width:46px;">
          <div style="width:46px;height:46px;border-radius:50%;background:${C.accent};color:${C.primary};font-family:Arial,Helvetica,sans-serif;font-weight:800;font-size:17px;line-height:46px;text-align:center;">WB</div>
        </td>
        <td style="vertical-align:middle;padding-left:14px;">
          <div style="color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;letter-spacing:.3px;">WB Digital Solutions</div>
          <div style="color:#e3d3ee;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:.4px;margin-top:2px;">${s.tagline}</div>
        </td>
      </tr></table>
    </td>
  </tr>
  <tr><td style="height:4px;background:${C.accent};line-height:4px;font-size:0;">&nbsp;</td></tr>`;
}

function footer(s) {
  return `
  <tr>
    <td bgcolor="${C.footerBg}" style="background:${C.footerBg};padding:24px 32px;text-align:center;">
      <p style="margin:0 0 10px;color:${C.muted};font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:.5px;text-transform:uppercase;">${s.footer.reach}</p>
      <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:13px;">
        <a href="mailto:${BRAND.email}" style="color:${C.accent};text-decoration:none;">${BRAND.email}</a>
        <span style="color:#5a4570;">&nbsp;•&nbsp;</span>
        <a href="${BRAND.whatsappLink}" style="color:${C.accent};text-decoration:none;">WhatsApp ${BRAND.whatsappLabel}</a>
        <span style="color:#5a4570;">&nbsp;•&nbsp;</span>
        <a href="${BRAND.site}" style="color:${C.accent};text-decoration:none;">wbdigitalsolutions.com</a>
      </p>
      <p style="margin:0;color:#6b5680;font-family:Arial,Helvetica,sans-serif;font-size:11px;">© ${BRAND.year} WB Digital Solutions — ${s.footer.rights}</p>
    </td>
  </tr>`;
}

function shell(preheader, contentRows) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>WB Digital Solutions</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.bg};">${preheader}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg};">
  <tr><td align="center" style="padding:28px 14px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:${C.card};border:1px solid ${C.border};border-radius:14px;overflow:hidden;box-shadow:0 6px 28px rgba(0,0,0,0.45);">
      ${contentRows}
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// Visitor auto-reply
function buildAutoReply(lang, name) {
  const s = STRINGS[lang] || STRINGS["pt-BR"];
  const safeName = escapeHtml(name);
  const rows = `
  ${header(s)}
  <tr><td style="padding:36px 36px 0;text-align:center;">
    <div style="width:64px;height:64px;border-radius:50%;background:${C.okBg};color:${C.ok};font-family:Arial,Helvetica,sans-serif;font-size:34px;line-height:64px;text-align:center;margin:0 auto;">&#10003;</div>
  </td></tr>
  <tr><td style="padding:18px 36px 0;text-align:center;">
    <h1 style="margin:0;color:${C.head};font-family:Arial,Helvetica,sans-serif;font-size:23px;font-weight:800;">${s.reply.title}</h1>
  </td></tr>
  <tr><td style="padding:18px 40px 0;">
    <p style="margin:0 0 14px;color:${C.text};font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;">${s.reply.greeting(safeName)}</p>
    <p style="margin:0;color:${C.muted};font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;">${s.reply.body}</p>
  </td></tr>
  <tr><td style="padding:28px 40px;text-align:center;">
    <a href="${BRAND.site}/projects" style="display:inline-block;background:${C.accent};color:${C.primary};font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:13px 28px;border-radius:9px;">${s.reply.cta} &rarr;</a>
  </td></tr>
  <tr><td style="padding:0 40px 38px;">
    <p style="margin:0;color:${C.text};font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;">${s.reply.signoff}<br><strong style="color:#ffffff;">${s.reply.team}</strong></p>
  </td></tr>
  ${footer(s)}`;
  return shell(s.reply.title, rows);
}

// Internal notification (to the team)
function buildMain(lang, name, email, message) {
  const s = STRINGS[lang] || STRINGS["pt-BR"];
  const field = (label, valueHtml) => `
    <tr><td style="padding:0 40px;">
      <p style="margin:18px 0 4px;color:${C.muted};font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;">${label}</p>
      <div style="color:${C.text};font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;background:${C.inset};border:1px solid ${C.border};border-radius:9px;padding:12px 14px;white-space:pre-wrap;">${valueHtml}</div>
    </td></tr>`;
  const rows = `
  ${header(s)}
  <tr><td style="padding:30px 40px 0;">
    <span style="display:inline-block;background:rgba(121,41,144,0.28);color:#e9c8f5;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;padding:6px 12px;border-radius:999px;">${s.flag} ${s.main.eyebrow}</span>
  </td></tr>
  ${field(s.main.name, escapeHtml(name))}
  ${field(s.main.email, `<a href="mailto:${escapeHtml(email)}" style="color:${C.accent};text-decoration:none;">${escapeHtml(email)}</a>`)}
  ${field(s.main.message, escapeHtml(message))}
  <tr><td style="padding:26px 40px 36px;">
    <p style="margin:0;color:${C.muted};font-family:Arial,Helvetica,sans-serif;font-size:11px;">${s.main.via}</p>
  </td></tr>
  ${footer(s)}`;
  return shell(`${s.main.eyebrow}: ${name}`, rows);
}

function plain(lines) {
  return lines.filter((l) => l !== null && l !== undefined).join("\n");
}

// Single entry point used by the API route.
function getContactEmails(lang, { name, email, message }) {
  const s = STRINGS[lang] || STRINGS["pt-BR"];
  return {
    subject: s.subject(name),
    autoReplySubject: s.autoReplySubject,
    mainHtml: buildMain(lang, name, email, message),
    autoReplyHtml: buildAutoReply(lang, name),
    mainText: plain([
      s.main.eyebrow,
      `${s.langName} (${lang})`,
      "",
      `${s.main.name}: ${name}`,
      `${s.main.email}: ${email}`,
      "",
      `${s.main.message}:`,
      message,
      "",
      "---",
      s.main.via,
    ]),
    autoReplyText: plain([
      s.reply.title,
      "",
      s.reply.greeting(name),
      s.reply.body,
      "",
      s.reply.signoff,
      s.reply.team,
      "",
      `${BRAND.email} · ${BRAND.whatsappLabel} · ${BRAND.site}`,
    ]),
  };
}

export { getContactEmails, buildAutoReply, buildMain, BRAND, STRINGS };
