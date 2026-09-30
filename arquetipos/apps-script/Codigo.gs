/**
 * Estudo de Arquétipo · 3P's Produções
 * Recebe cada resposta do quiz, salva numa planilha e envia o resultado por e-mail
 * para o cliente e para você (dono da planilha).
 *
 * Como instalar: veja arquetipos/README.md
 */

// ===== CONFIGURAÇÃO =====
const NOME_ABA = 'Respostas';
const NOME_REMETENTE = "3P's Produções";
// Deixe vazio para usar o e-mail da conta Google dona deste script.
const EMAIL_DONO = '';
// Link opcional para o cliente agendar a devolutiva (WhatsApp, Calendly etc.). Deixe vazio para não mostrar.
const LINK_CONTATO = 'https://wa.me/5521979223500';
// ========================

const CABECALHO = ['Data', 'Nome', 'E-mail', 'Principal', 'Secundário', 'Terciário', 'Leitura', 'Motivação',
  'Inocente', 'Explorador', 'Sábio', 'Herói', 'Rebelde', 'Mago', 'Cara Comum', 'Amante', 'Bobo da Corte',
  'Cuidador', 'Criador', 'Governante', 'Desempate', 'Média', 'Desvio', 'Alertas', 'Respostas (1 a 60)', 'Origem'];
const ARQS = ['Inocente', 'Explorador', 'Sábio', 'Herói', 'Rebelde', 'Mago', 'Cara Comum', 'Amante',
  'Bobo da Corte', 'Cuidador', 'Criador', 'Governante'];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.hp) return resposta_({ ok: true }); // robô (campo invisível preenchido)
    validar_(d);

    // evita envios repetidos do mesmo e-mail em sequência
    const cache = CacheService.getScriptCache();
    const chave = 'env_' + d.email.toLowerCase() + '_' + d.respostas;
    if (cache.get(chave)) return resposta_({ ok: true, repetido: true });
    cache.put(chave, '1', 600);

    salvar_(d);
    enviarCliente_(d);
    enviarDono_(d);
    return resposta_({ ok: true });
  } catch (err) {
    console.error(err);
    return resposta_({ ok: false, erro: String(err) });
  }
}

function doGet() {
  return ContentService.createTextOutput('Estudo de Arquétipo: endpoint ativo.');
}

function validar_(d) {
  if (!d || typeof d !== 'object') throw new Error('Dados inválidos');
  if (!d.nome || String(d.nome).length > 120) throw new Error('Nome inválido');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email || '')) throw new Error('E-mail inválido');
  if (!/^[1-5]{60}$/.test(d.respostas || '')) throw new Error('Respostas inválidas');
  if (ARQS.indexOf(d.principal) < 0) throw new Error('Arquétipo inválido');
}

function planilha_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let aba = ss.getSheetByName(NOME_ABA);
  if (!aba) aba = ss.insertSheet(NOME_ABA);
  if (aba.getLastRow() === 0) {
    aba.appendRow(CABECALHO);
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold');
  }
  return aba;
}

function salvar_(d) {
  const p = d.pontos || {};
  const linha = [new Date(), limpar_(d.nome), d.email, d.principal, d.secundario, d.terciario, d.leitura, d.motivacao]
    .concat(ARQS.map(function (a) { return Number(p[a]) || 0; }))
    .concat([d.desempate || '', d.media, d.desvio, (d.alertas || []).join(' | '), "'" + d.respostas, d.site || '']);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try { planilha_().appendRow(linha); } finally { lock.releaseLock(); }
}

function enviarCliente_(d) {
  const x = d.detalhe || {};
  const html = moldura_(
    '<p style="margin:0 0 6px;color:#5E637D;font-size:13px;text-transform:uppercase;letter-spacing:.1em">Seu resultado</p>' +
    '<h1 style="margin:0 0 12px;font-size:28px;color:#1A1D33">Sua marca é ' + esc_(d.principal) + '</h1>' +
    '<p style="margin:0 0 20px;font-size:16px;color:#1A1D33">Olá, ' + esc_(primeiroNome_(d.nome)) + '! ' +
    'Obrigado por fazer o estudo. Estes são os três arquétipos que mais aparecem nas suas respostas:</p>' +
    podio_(d) +
    '<h2 style="margin:24px 0 8px;font-size:20px;color:#1A1D33">' + esc_(x.nome) + ', em detalhe</h2>' +
    tabela_([['Desejo', x.desejo], ['Medo', x.medo], ['Promessa', x.promessa], ['Tom de voz', x.voz],
      ['Estética', x.visual], ['Ideias de vídeo', x.video], ['Exemplos de marcas', x.refs]]) +
    (d.segundo ? '<p style="margin:16px 0 0;font-size:15px;color:#1A1D33">O segundo arquétipo, <b>' + esc_(d.segundo.nome) +
      '</b>, dá o tempero da sua comunicação: ' + esc_(String(d.segundo.voz).toLowerCase()) + '.</p>' : '') +
    '<h2 style="margin:24px 0 8px;font-size:20px;color:#1A1D33">Pontuação completa (0 a 20)</h2>' + barras_(d) +
    '<p style="margin:20px 0 0;font-size:14px;color:#5E637D">Este estudo é um ponto de partida. O resultado fica mais preciso numa conversa de devolutiva, ' +
    'em que confirmamos os arquétipos com exemplos reais do seu negócio.</p>' +
    (LINK_CONTATO ? '<p style="margin:20px 0 0"><a href="' + LINK_CONTATO + '" style="display:inline-block;background:#3B3FB6;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:600">Agendar minha devolutiva</a></p>' : '')
  );
  MailApp.sendEmail({
    to: d.email,
    subject: 'Seu arquétipo de marca: ' + d.principal,
    htmlBody: html,
    name: NOME_REMETENTE,
    replyTo: EMAIL_DONO || Session.getEffectiveUser().getEmail()
  });
}

function enviarDono_(d) {
  const para = EMAIL_DONO || Session.getEffectiveUser().getEmail();
  const html = moldura_(
    '<h1 style="margin:0 0 12px;font-size:24px;color:#1A1D33">Nova resposta: ' + esc_(d.nome) + '</h1>' +
    tabela_([['Nome', d.nome], ['E-mail', d.email], ['Principal', d.principal], ['Secundário', d.secundario],
      ['Terciário', d.terciario], ['Leitura', d.leitura], ['Motivação dominante', d.motivacao],
      ['Desempate', d.desempate || '(não precisou)'], ['Média / desvio', d.media + ' / ' + d.desvio],
      ['Alertas', (d.alertas || []).join(' ') || 'Nenhum']]) +
    '<h2 style="margin:24px 0 8px;font-size:18px;color:#1A1D33">Pontuação (0 a 20)</h2>' + barras_(d) +
    '<h2 style="margin:24px 0 8px;font-size:18px;color:#1A1D33">Respostas brutas (item 1 a 60)</h2>' +
    '<p style="font-family:monospace;font-size:14px;word-break:break-all;margin:0">' + esc_(d.respostas) + '</p>' +
    '<p style="margin:20px 0 0"><a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '">Abrir a planilha com todas as respostas</a></p>'
  );
  MailApp.sendEmail({
    to: para,
    subject: 'Arquétipo · ' + d.nome + ' → ' + d.principal,
    htmlBody: html,
    name: 'Estudo de Arquétipo',
    replyTo: d.email
  });
}

// ---------- utilidades de e-mail ----------
function moldura_(conteudo) {
  return '<div style="background:#F2F3F6;padding:24px 12px;font-family:Arial,Helvetica,sans-serif">' +
    '<div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #DADDE7;border-radius:14px;padding:28px">' +
    conteudo + '</div>' +
    '<p style="text-align:center;font-size:12px;color:#5E637D;margin:16px 0 0">' + NOME_REMETENTE +
    ' · Estudo de arquétipo de marca baseado no modelo de Margaret Mark e Carol S. Pearson.</p></div>';
}
function podio_(d) {
  const it = [['Principal', d.principal], ['Secundário', d.secundario], ['Terciário', d.terciario]];
  const p = d.pontos || {};
  return '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:8px 0"><tr>' +
    it.map(function (x, i) {
      return '<td style="background:#F2F3F6;border-radius:10px;padding:12px;vertical-align:top;' + (i === 0 ? 'border:2px solid #3B3FB6' : '') + '">' +
        '<div style="font-size:11px;color:#5E637D;text-transform:uppercase;letter-spacing:.08em">' + x[0] + '</div>' +
        '<div style="font-size:17px;font-weight:bold;color:#1A1D33;margin-top:4px">' + esc_(x[1]) + '</div>' +
        '<div style="font-size:13px;color:#5E637D">' + (p[x[1]] || 0) + ' de 20</div></td>';
    }).join('') + '</tr></table>';
}
function tabela_(linhas) {
  return '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">' +
    linhas.map(function (l) {
      return '<tr><td style="padding:8px 12px 8px 0;color:#5E637D;font-size:14px;vertical-align:top;width:34%;border-top:1px solid #DADDE7">' + esc_(l[0]) +
        '</td><td style="padding:8px 0;color:#1A1D33;font-size:15px;vertical-align:top;border-top:1px solid #DADDE7">' + esc_(l[1]) + '</td></tr>';
    }).join('') + '</table>';
}
function barras_(d) {
  const p = d.pontos || {};
  const ordem = (d.ranking && d.ranking.length ? d.ranking : ARQS);
  return '<table role="presentation" width="100%" cellspacing="0" cellpadding="0">' + ordem.map(function (a) {
    const v = Number(p[a]) || 0, w = Math.round(v / 20 * 100);
    return '<tr><td style="font-size:14px;color:#1A1D33;padding:4px 8px 4px 0;width:120px">' + esc_(a) + '</td>' +
      '<td style="padding:4px 0"><div style="background:#DADDE7;border-radius:99px;height:10px"><div style="background:#3B3FB6;border-radius:99px;height:10px;width:' + w + '%"></div></div></td>' +
      '<td style="font-size:13px;color:#5E637D;text-align:right;width:36px">' + v + '</td></tr>';
  }).join('') + '</table>';
}
function esc_(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function limpar_(s) { s = String(s || ''); return /^[=+\-@]/.test(s) ? "'" + s : s; } // evita fórmulas injetadas na planilha
function primeiroNome_(n) { return String(n || '').trim().split(/\s+/)[0]; }
function resposta_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

/** Rode esta função uma vez pelo editor para autorizar e testar o envio. */
function testar() {
  const r = '453245342143525343215432453214354321543245321454321543254321';
  doPost({ postData: { contents: JSON.stringify({
    nome: 'Teste da Silva', email: Session.getEffectiveUser().getEmail(), principal: 'Criador', secundario: 'Mago', terciario: 'Sábio',
    pontos: { 'Criador': 17, 'Mago': 15, 'Sábio': 14 }, ranking: ARQS, leitura: 'Resultado moderado', motivacao: 'Estabilidade',
    alertas: [], media: 3.4, desvio: 1.1, respostas: r, site: 'teste',
    detalhe: { nome: 'Criador', desejo: 'Criar algo original', medo: 'A mediocridade', promessa: 'Se pode ser imaginado, pode ser criado',
      voz: 'Inventiva', visual: 'Autoral', video: 'Making of', refs: 'LEGO, Adobe' }, segundo: { nome: 'Mago', voz: 'Visionária' }
  }) } });
}
