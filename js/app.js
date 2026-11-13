/* 다키스트 던전 공략 수첩 — 화면 로직 (빌드 없이 동작하는 단일 스크립트) */
(function () {
  'use strict';
  const WIKI = 'https://darkestdungeon.wiki.gg/images/';
  const BOSSES = [].concat(typeof BOSSES_A !== 'undefined' ? BOSSES_A : [], typeof BOSSES_B !== 'undefined' ? BOSSES_B : []);
  // 게임에 실제로 나오는 한글 이름으로 바꾼다. 이전 표기는 '다른 번역'으로 남겨 검색과 인식에 계속 쓴다
  const KN = typeof KO_NAMES !== 'undefined' ? KO_NAMES : {};
  const setKo = (o, en) => { const k = KN[en || o.en]; if (o && k && k !== o.ko) { o.alt = (o.alt || []).concat(o.ko ? [o.ko] : []); o.ko = k; } };
  Object.keys(HERO_GUIDE).forEach(h => setKo(HERO_GUIDE[h], h)); DUNGEONS.forEach(d => setKo(d)); PROVISIONS.forEach(x => setKo(x)); BOSSES.forEach(x => setKo(x)); CURIOS.forEach(x => setKo(x)); TRINKETS.forEach(t => { t.ko = KN[t.en] || null; });
  Object.keys(HERO_DATA).forEach(h => HERO_DATA[h].skills.forEach(x => setKo(x)));
  if (typeof CAMP !== 'undefined') Object.keys(CAMP).forEach(h => CAMP[h].skills.forEach(x => setKo(x)));
  if (typeof TOWN !== 'undefined') { TOWN.buildings.forEach(x => setKo(x)); TOWN.quirks.lock.concat(TOWN.quirks.remove).forEach(x => setKo(x)); TOWN.heirlooms.forEach(x => setKo(x)); TOWN.districts.forEach(x => setKo(x)); }
  if (typeof EVENT_KO !== 'undefined') Object.keys(EVENT_KO).forEach(e => setKo(EVENT_KO[e], e));
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- 저장소
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* 무시 */ } },
  };
  let mode = store.get('dd.mode', 'both');         // both | ko | en
  let overrides = store.get('dd.terms', {});       // 영문명 -> 사용자가 입력한 한글 용어
  let weekly = store.get('dd.weekly', {});

  // ---------- 이미지
  function imgKey(name) { if (!name) return null; const k = String(name).trim().replace(/_/g, ' '); return k.charAt(0).toUpperCase() + k.slice(1); }
  function imgUrl(name, w) {
    const v = IMG[imgKey(name)]; if (!v) return null;
    const u = encodeURIComponent(v[0]);
    if (w && v[1] > w * 1.4 && !/\.gif$/i.test(v[0])) return WIKI + 'thumb/' + u + '/' + w + 'px-' + u;
    return WIKI + u;
  }
  function pic(name, w, cls, alt) {
    const u = imgUrl(name, w); if (!u) return '';
    return '<img class="' + (cls || 'pic') + '" loading="lazy" decoding="async" referrerpolicy="no-referrer" src="' + esc(u) + '" alt="' + esc(alt || '') + '" onerror="this.classList.add(\'broken\')">';
  }

  // ---------- 용어 표기
  function koOf(en, def) { return overrides[en] || def || en; }
  function T(en, def) {
    const k = koOf(en, def);
    if (mode === 'en' || k === en) return esc(en);
    if (mode === 'ko') return esc(k);
    return esc(k) + '<span class="en">' + esc(en) + '</span>';
  }
  const heroT = en => T(en, HERO_GUIDE[en] ? HERO_GUIDE[en].ko : en);
  const heroKo = en => koOf(en, HERO_GUIDE[en] ? HERO_GUIDE[en].ko : en);
  const DG = {}; DUNGEONS.forEach(d => DG[d.id] = d);
  const dgT = id => id === 'all' ? '공통' : (DG[id] ? T(DG[id].en, DG[id].ko) : esc(id));
  const PROV = {}; PROVISIONS.forEach(p => PROV[p.en] = p);
  const ITEM_EN = { hand: 'By hand', antivenom: 'Antivenom', bandage: 'Bandage', dog_treats: 'Dog Treats', holy_water: 'Holy Water', medicinal_herbs: 'Medicinal Herbs', shovel: 'Shovel', skeleton_key: 'Skeleton Key', torch: 'Torch', blood: 'The Blood', consecrated_essence: 'Consecrated Essence', potent_salve: 'Potent Salve', pineal_gland: 'Pineal Gland', pick_axe: 'Pick-Axe' };
  const ITEM_IMG = { hand: 'Byhand.png', dog_treats: 'Dog Treats.png' };
  function itemT(id) { const en = ITEM_EN[id] || id; const p = PROV[en]; return id === 'hand' ? '맨손' : T(en, p ? p.ko : ITEM_KO[id]); }
  function itemImg(id, cls) { return pic(ITEM_IMG[id] || (ITEM_EN[id] + '.png'), 0, cls || 'ico'); }
  const TRK = {}; TRINKETS.forEach(t => TRK[t.en] = t);
  const SKILL = {}; Object.keys(HERO_DATA).forEach(h => HERO_DATA[h].skills.forEach(s => { SKILL[h + '|' + s.en] = s; }));
  const RAR = { '': '매우 흔함', c: '흔함', u: '드묾', r: '희귀', v: '매우 희귀', a: '선조', y: '진홍 궁정', k: '특수', d: '특수' };
  const LOC = { corridor: '복도', curio_room: '방', treasure_room: '보물 방', secret_room: '비밀 방' };
  const LEVEL_TAG = { '입문': 'good', '중급': 'gold', '고급': 'red' };
  const GROUPS = [['ruins', '폐허'], ['weald', '삼림'], ['warrens', '사육장'], ['cove', '해만'], ['wandering', '방랑 보스'], ['event', '이벤트 보스'], ['courtyard', '안뜰 (CC DLC)'], ['farmstead', '농장 (CoM DLC)'], ['darkest', '가장 어두운 던전']];
  const bossT = b => T(b.en, b.ko);

  // ---------- 용어 등록부 (검색 · 용어 사전 공용)
  const TERMS = [];
  function reg(cat, en, ko, alt, href) { TERMS.push({ cat, en, ko, alt: alt || [], href }); }
  Object.keys(HERO_GUIDE).forEach(h => reg('영웅', h, HERO_GUIDE[h].ko, HERO_GUIDE[h].alt, '#/hero/' + encodeURIComponent(h)));
  DUNGEONS.forEach(d => reg('던전', d.en, d.ko, d.alt, '#/plan/' + d.id));
  BOSSES.forEach(b => reg('보스', b.en, b.ko, b.alt, '#/boss/' + b.id));
  PROVISIONS.forEach(p => reg('보급품', p.en, p.ko, p.alt, '#/plan'));
  if (typeof TOWN !== 'undefined') TOWN.buildings.forEach(b => reg('마을 건물', b.en, b.ko, b.alt, '#/town'));
  GLOSSARY.forEach(g => reg(g.cat, g.en, g.ko, g.alt, '#/glossary'));
  const seenCurio = {};
  CURIOS.forEach(c => { if (!seenCurio[c.en]) { seenCurio[c.en] = 1; reg('기물', c.en, c.ko, [], '#/curios/all?q=' + encodeURIComponent(c.en)); } });
  Object.keys(HERO_DATA).forEach(h => HERO_DATA[h].skills.forEach(s => { if (!(h === 'Abomination' && s.form === 'beast' && s.en === 'Transform')) reg('스킬', s.en, s.ko, [], '#/hero/' + encodeURIComponent(h)); }));
  const SEARCH_EXTRA = [];
  TRINKETS.forEach(t => SEARCH_EXTRA.push({ cat: '장신구', en: t.en, ko: (t.ko ? t.ko + ' — ' : '') + t.fx.join(' / '), alt: [], href: '#/trinkets?q=' + encodeURIComponent(t.en), noko: true }));
  PARTIES.forEach(p => SEARCH_EXTRA.push({ cat: '파티', en: p.name, ko: p.slots.map(s => heroKo(s.hero)).join(' · '), alt: [], href: '#/parties?id=' + p.id, noko: true }));
  if (typeof EVENT_KO !== 'undefined') Object.keys(EVENT_KO).forEach(e => SEARCH_EXTRA.push({ cat: '마을 이벤트', en: e, ko: EVENT_KO[e].ko, alt: [], href: '#/events?q=' + encodeURIComponent(e) }));

  // ---------- 공용 조각
  function skillLine(hero, en) {
    const s = SKILL[hero + '|' + en];
    if (!s) return '<div class="sk">' + esc(en) + '</div>';
    return '<div class="sk" title="' + esc([s.fx, s.self && ('자신: ' + s.self)].filter(Boolean).join(' / ')) + '">' + pic(s.img, 0, '') + '<span>' + T(s.en, s.ko) + '</span></div>';
  }
  function trinketLine(en) {
    const t = TRK[en]; if (!t) return '';
    return '<div class="tk">' + pic(t.img, 0, '') + '<span><b>' + T(t.en, t.ko) + '</b><br>' + esc(t.fx.join(' · ')) + '</span></div>';
  }
  function thirdTrinket(hero, have) { return (THIRD_TRINKET[hero] || []).find(t => TRK[t] && !(have || []).includes(t)) || null; }
  function thirdLine(hero, have) { const t = thirdTrinket(hero, have); return t ? '<div class="third" title="장신구 칸이 3개인 모드를 쓸 때의 추가 추천">' + trinketLine(t) + '<span class="tag">3번째 칸</span></div>' : ''; }
  function campHTML(hero) { const c = typeof CAMP !== 'undefined' && CAMP[hero]; if (!c) return '';
    return c.rec.map(n => { const k = c.skills.find(x => x.en === n); return '<div class="camp"><b>' + T(k.en, k.ko) + '</b><span class="tag gold">시간 ' + k.cost + '</span><span class="tag">' + esc(k.target) + '</span><div class="small dim">' + esc(k.fx) + '</div></div>'; }).join('') + '<p class="small dim">' + esc(c.why) + '</p>'; }
  function slotHTML(s, pos) {
    const h = HERO_DATA[s.hero] || {};
    let o = '<div class="slot"><div class="slot-top"><div class="port">' + pic(h.img, 120, '') + '</div><div><div class="pos">' + pos + '열' + (pos === 1 ? ' · 맨 앞' : pos === 4 ? ' · 맨 뒤' : '') + '</div><a class="hn" href="#/hero/' + encodeURIComponent(s.hero) + '">' + heroT(s.hero) + '</a></div></div>';
    o += '<h5>스킬</h5>' + s.skills.map(k => skillLine(s.hero, k)).join('');
    if (s.trinkets && s.trinkets.length) o += '<h5>장신구</h5>' + s.trinkets.map(trinketLine).join('') + thirdLine(s.hero, s.trinkets);
    if (s.alts && s.alts.length) o += '<h5>대체 영웅</h5><div class="alts">' + s.alts.map(a => '<div><a href="#/hero/' + encodeURIComponent(a.hero) + '">' + esc(heroKo(a.hero)) + '</a> — ' + esc(a.note) + '</div>').join('') + '</div>';
    return o + '</div>';
  }
  function lineupHTML(slots) {
    return '<div class="lineup">' + slots.map((s, i) => slotHTML(s, 4 - i)).join('') + '</div><div class="front-back"><span>← 후열 (4열)</span><span>전열 (1열) · 적 방향 →</span></div>';
  }
  function partyCard(p, open) {
    let o = '<div class="card party" id="party-' + p.id + '"><div class="party-head"><h3>' + esc(p.name) + '</h3><span class="tag ' + (LEVEL_TAG[p.level] || '') + '">' + esc(p.level) + '</span>' +
      p.tags.filter(t => DG[t]).map(t => '<span class="tag">' + esc(koOf(DG[t].en, DG[t].ko)) + '</span>').join('') + (p.tags.includes('boss') ? '<span class="tag red">보스</span>' : '') + '</div>';
    o += '<p class="dim">' + esc(p.desc) + '</p>' + lineupHTML(p.slots);
    o += '<details' + (open ? ' open' : '') + '><summary><b>운용법</b></summary><ol class="steps">' + p.howto.map(x => '<li>' + esc(x) + '</li>').join('') + '</ol>' + (p.weak ? '<div class="note warn">약점: ' + esc(p.weak) + '</div>' : '') + '</details></div>';
    return o;
  }
  function heroChips(list, cls) { return (list || []).filter(h => HERO_DATA[h]).map(h => '<a class="tag ' + (cls || '') + '" href="#/hero/' + encodeURIComponent(h) + '">' + esc(heroKo(h)) + '</a>').join(' '); }
  const ul = a => a && a.length ? '<ul>' + a.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' : '';
  function chipRow(items, cur, attr) { return '<div class="chips">' + items.map(([v, l]) => '<button class="chip' + (v === cur ? ' on' : '') + '" data-' + attr + '="' + esc(v) + '">' + l + '</button>').join('') + '</div>'; }

  // ---------- 기물 판정
  function scoreOf(inter) { let g = 0, b = 0; inter.r.forEach(r => { const st = RT_STATUS[r.t]; if (st === 'good') g += r.p; else if (st === 'bad') b += r.p; }); return { g, b, s: g - b }; }
  function verdict(c) {
    const hand = c.inter.find(i => i.item === 'hand');
    const items = c.inter.filter(i => i.item !== 'hand').map(i => ({ i, sc: scoreOf(i) })).sort((a, b) => b.sc.s - a.sc.s);
    const hs = hand ? scoreOf(hand) : null;
    const best = items[0];
    if (best && (!hs || best.sc.s > hs.s + 5)) {
      const also = items.filter(x => x !== best && x.sc.s >= best.sc.s - 0.01).map(x => x.i.item);
      return { cls: 'use', item: best.i.item, also, text: '사용', handBad: hs && hs.b >= 25 };
    }
    if (!hs) return { cls: 'ok', text: '상호작용' };
    if (hs.b === 0) return { cls: 'ok', text: '맨손으로 OK' };
    if (hs.g === 0) return { cls: 'no', text: '건드리지 말 것' };
    if (hs.b >= 50) return { cls: 'no', text: '비추천 (나쁜 결과 ' + Math.round(hs.b) + '%)' };
    return { cls: 'gamble', text: '도박 (좋음 ' + Math.round(hs.g) + '% / 나쁨 ' + Math.round(hs.b) + '%)' };
  }
  function curioCard(c) {
    const v = verdict(c);
    let vh = '<span class="verdict ' + v.cls + '">';
    if (v.item) vh += itemImg(v.item, 'ico sm') + itemT(v.item) + (v.also && v.also.length ? ' 또는 ' + v.also.map(itemT).join(' / ') : '') + ' 사용'; else vh += esc(v.text);
    vh += '</span>';
    if (v.item && v.handBad) vh += ' <span class="tag bad">맨손 금지</span>';
    c.inter.filter(i => i.item !== 'hand' && i.item !== v.item && scoreOf(i).b >= 50 && scoreOf(i).g === 0).forEach(i => { vh += ' <span class="tag bad">' + itemT(i.item) + ' 사용 금지</span>'; });
    let o = '<div class="card curio"><div class="curio-head"><div class="curio-img">' + pic(c.img, 200, '') + '</div><div><h3>' + T(c.en, c.ko) + '</h3><div class="small dim">' + dgT(c.dg) + (c.loc ? ' · ' + LOC[c.loc] : '') + '</div>' + vh + '</div></div>';
    if (c.note) o += '<div class="small dim">※ ' + esc(c.note) + '</div>';
    c.inter.forEach(it => {
      o += '<div class="inter"><div class="inter-h">' + itemImg(it.item, 'ico sm') + '<span>' + itemT(it.item) + '</span></div><div class="bar">' + it.r.map(r => '<i class="' + RT_STATUS[r.t] + '" style="width:' + r.p + '%"></i>').join('') + '</div><div class="res">' +
        it.r.map(r => '<span class="p">' + r.p + '%</span><span class="' + RT_STATUS[r.t] + '">' + esc(RT_KO[r.t] || r.t) + (r.e ? ': ' + esc(r.e) : '') + '</span>').join('') + '</div></div>';
    });
    if (c.types.length) o += '<div class="small dim">강제 상호작용 유형: ' + c.types.map(t => esc(CURIO_TYPE_KO[t] || t)).join(', ') + '</div>';
    return o + '</div>';
  }

  // ================= 화면들 =================
  const V = {};

  V.home = function () {
    const tiles = [
      ['#/plan', '원정 준비', '던전과 길이를 고르면 보급품 수량, 추천 파티, 주의할 적, 기물 요약이 한 화면에.'],
      ['#/run', '원정 진행 (보조 모니터용)', '던전을 도는 동안 띄워 두는 화면. 기물 그림을 누르면 지금 가방 기준으로 무엇을 할지 알려 줍니다.'],
      ['#/builder', '파티 편성기', '영웅을 직접 넣어 보고 힐 · 기절 · 후열 타격 · 던전 상성을 점검합니다.'],
      ['#/curios', '기물 조회', '던전에서 만난 기물에 무엇을 써야 하는지 확률과 함께 즉시 확인.'],
      ['#/parties', '추천 파티', '상황별 추천 파티와 자리별 대체 영웅, 스킬, 장신구.'],
      ['#/bosses', '보스 공략', '기믹, 공략 순서, 준비물, 추천/대체 파티.'],
      ['#/town', '마을 운영', '건물 업그레이드 순서, 매주 할 일, 기벽 관리, 구역.'],
      ['#/events', '이벤트', '마을 이벤트 효과와 탐험 중 돌발 상황 대처.'],
      ['#/heroes', '영웅', '18명 영웅의 역할, 추천 스킬 세팅, 전체 스킬 표.'],
      ['#/glossary', '용어 사전', '유저 한글패치와 용어가 다를 때 영문 기준으로 찾고, 내 게임 용어로 바꿔 표시.'],
    ];
    return '<div class="hero-banner"><h1>다키스트 던전 공략 수첩</h1><p>게임을 켜 둔 채로 바로 찾아보는 한글 공략. 모든 이름에 영문을 병기해 유저 한글패치와 공식 번역의 용어 차이에 상관없이 찾을 수 있습니다.</p></div>' +
      '<h2 style="margin-top:0">어디로 원정을 떠나나요?</h2><div class="dg-pick">' + DUNGEONS.map(d => dgCard(d, null)).join('') + '</div>' +
      '<h2>바로 가기</h2><div class="tiles">' + tiles.map(t => '<a class="card tile" href="' + t[0] + '"><h3>' + t[1] + '</h3><div class="dim small">' + t[2] + '</div></a>').join('') + '</div>' +
      '<div class="note">상단 검색창(단축키 <b>/</b>)에 한글이나 영문 일부를 입력하면 영웅 · 기물 · 보스 · 장신구 · 이벤트 · 용어를 한 번에 찾습니다. 오른쪽 위 버튼으로 <b>한글+영문 / 한글만 / 영문만</b> 표기를 바꿀 수 있습니다.</div>';
  };
  function dgCard(d, cur) {
    const u = imgUrl(d.img, 400);
    return '<a class="dg-card' + (cur === d.id ? ' on' : '') + '" href="#/plan/' + d.id + '" style="' + (u ? 'background-image:url(&quot;' + esc(u) + '&quot;)' : '') + '"><div><b>' + esc(koOf(d.en, d.ko)) + '</b><br><span class="small">' + esc(d.en) + (d.dlc ? ' · DLC' : '') + '</span></div></a>';
  }

  V.plan = function (args) {
    const id = DG[args[0]] ? args[0] : 'ruins'; const d = DG[id];
    const li = Math.min(2, Math.max(0, parseInt(args[1], 10) || 0));
    const labels = d.provLabels || ['짧은 원정', '중간 원정', '긴 원정'];
    let o = '<h1>원정 준비</h1><p class="lead">던전과 원정 길이를 고르세요. 수량은 일반적인 권장치이며, 파티 구성(힐러 유무, 골동품상 등)에 따라 가감합니다.</p>';
    o += '<div class="dg-pick">' + DUNGEONS.map(x => dgCard(x, id)).join('') + '</div>';
    o += '<h2>' + T(d.en, d.ko) + (d.dlc ? ' <span class="tag gold">' + esc(d.dlc) + ' DLC</span>' : '') + '</h2><p>' + esc(d.summary) + '</p>';
    o += '<div class="two"><div class="card"><h3>통하는 공격</h3><div class="chips">' + d.dmg.good.map(x => '<span class="tag good">' + esc(x) + '</span>').join('') + d.dmg.bad.map(x => '<span class="tag bad">✕ ' + esc(x) + '</span>').join('') + '</div><div class="small dim">적 유형: ' + esc(d.enemies) + '</div></div>' +
      '<div class="card"><h3>영웅</h3><div class="small dim" style="margin-top:6px">추천</div><div class="chips">' + heroChips(d.heroes.good, 'good') + '</div>' + (d.heroes.bad.length ? '<div class="small dim">비추천</div><div class="chips">' + heroChips(d.heroes.bad, 'bad') + '</div><div class="small dim">' + esc(d.badWhy) + '</div>' : '') + '</div></div>';
    // 보급품
    o += '<h2 id="provsec">보급품 체크리스트</h2>' + chipRow(labels.map((l, i) => [String(i), l]), String(li), 'len');
    o += '<div class="prov">' + Object.keys(d.provisions).map(k => {
      const n = d.provisions[k][li], p = PROV[k];
      return '<label class="' + (n ? '' : 'zero') + '"><input type="checkbox" class="provck">' + pic(p.img, 0, 'ico') + '<span>' + T(p.en, p.ko) + '</span><span class="n">' + (n ? '×' + n : '–') + '</span></label>';
    }).join('') + '</div>';
    // 이 던전 기물에 쓰는 아이템 집계
    const need = {};
    CURIOS.filter(c => c.dg === id || c.dg === 'all').forEach(c => { const v = verdict(c); if (v.item && PROV[ITEM_EN[v.item]]) (need[v.item] = need[v.item] || []).push(c); });
    const nk = Object.keys(need).sort((a, b) => need[b].length - need[a].length);
    if (nk.length) o += '<div class="card" style="margin-top:10px"><h3>이 던전 기물에 쓰는 아이템</h3>' + nk.map(k => '<div class="row small" style="margin-top:6px">' + itemImg(k, 'ico sm') + '<b>' + itemT(k) + '</b><span class="dim">' + need[k].map(c => esc(koOf(c.en, c.ko))).join(', ') + '</span></div>').join('') + '<p class="small"><a href="#/curios/' + id + '">→ 이 던전의 기물 전체 보기</a></p></div>';
    o += '<div class="two"><div><h2>주의할 적</h2>' + ul(d.threats) + '</div><div><h2>요령</h2>' + ul(d.tips) + '</div></div>';
    const bs = d.bosses.map(b => BOSSES.find(x => x.id === b)).filter(Boolean);
    if (bs.length) o += '<h2>보스</h2><div class="grid g3">' + bs.map(bossCard).join('') + '</div>';
    o += '<h2>추천 파티</h2>' + d.parties.map(pid => partyCard(PARTIES.find(p => p.id === pid), false)).join('');
    return o;
  };

  V.curios = function (args, q) {
    const dg = args[0] || 'all-any'; const kw = (q.q || '').toLowerCase(); const only = q.item === '1';
    const tabs = [['all-any', '전체'], ['all', '공통']].concat(DUNGEONS.filter(d => CURIOS.some(c => c.dg === d.id)).map(d => [d.id, esc(koOf(d.en, d.ko))]));
    let list = CURIOS.filter(c => dg === 'all-any' || c.dg === dg || (dg !== 'all' && c.dg === 'all'));
    if (kw) list = CURIOS.filter(c => (c.en + ' ' + c.ko + ' ' + (overrides[c.en] || '')).toLowerCase().includes(kw));
    if (only) list = list.filter(c => verdict(c).item);
    let o = '<h1>기물 조회</h1><p class="lead">기물 이름은 번역마다 다르니 <b>그림과 영문명</b>으로 찾으세요. 초록 = 좋은 결과, 빨강 = 나쁜 결과이며 막대 길이가 확률입니다. 각 카드 위의 판정은 확률을 기준으로 자동 계산한 권장 행동입니다.</p>';
    o += '<div class="row"><input class="field" id="curioq" placeholder="기물 검색 (예: 석관, Altar, urn)" value="' + esc(q.q || '') + '" style="flex:1;max-width:360px"><label class="row small"><input type="checkbox" id="curioitem"' + (only ? ' checked' : '') + '> 아이템이 필요한 기물만</label></div>';
    o += chipRow(tabs, kw ? '' : dg, 'cdg');
    o += '<div class="small dim">' + list.length + '개</div><div class="grid g2" style="margin-top:8px">' + list.map(curioCard).join('') + '</div>';
    o += '<div class="note">강제 상호작용: 특정 기벽(도벽, 호기심 등)을 가진 영웅은 복도의 해당 유형 기물을 멋대로 맨손으로 건드립니다. 전리품을 훔치기도 하므로 요양원에서 우선 제거하세요.</div>';
    return o;
  };

  V.parties = function (args, q) {
    const tag = q.tag || 'all';
    const tabs = [['all', '전체']].concat(DUNGEONS.filter(d => PARTIES.some(p => p.tags.includes(d.id))).map(d => [d.id, esc(koOf(d.en, d.ko))]), [['boss', '보스전'], ['gold', '골드 파밍']]);
    const list = PARTIES.filter(p => tag === 'all' || p.tags.includes(tag));
    let o = '<h1>추천 파티</h1><p class="lead">왼쪽이 4열(맨 뒤), 오른쪽이 1열(맨 앞)로 게임 화면과 같은 순서입니다. 각 자리마다 대체 영웅을 적어 두었으니 없는 영웅은 바꿔 넣으세요. 스킬 아이콘에 마우스를 올리면 효과가 보입니다.</p>';
    o += chipRow(tabs, tag, 'ptag') + list.map(p => partyCard(p, q.id === p.id)).join('');
    o += '<div class="note">보스별 전용 파티는 <a href="#/bosses">보스 공략</a>의 각 보스 페이지에 있습니다.</div>';
    return o;
  };

  V.heroes = function () {
    let o = '<h1>영웅</h1><p class="lead">영웅을 누르면 추천 스킬 세팅, 장신구, 전체 스킬 표를 볼 수 있습니다.</p><div class="grid g3">';
    o += Object.keys(HERO_GUIDE).map(h => { const g = HERO_GUIDE[h], d = HERO_DATA[h];
      return '<a class="card hero-card" href="#/hero/' + encodeURIComponent(h) + '"><div class="port">' + pic(d.img, 160, '') + '</div><div><h3>' + heroT(h) + '</h3><div class="small dim">' + esc(g.role) + '</div><div class="small">' + g.pos.map(p => '<span class="tag gold">' + p + '열</span>').join(' ') + (g.dlc ? ' <span class="tag">' + esc(g.dlc) + '</span>' : '') + '</div></div></a>'; }).join('');
    return o + '</div>';
  };
  function dots(str, cls, order) { return '<span class="dots">' + order.map(n => '<i class="' + (str.includes(String(n)) ? cls : '') + '"></i>').join('') + '</span>'; }
  function skillRow(s) {
    const tgt = s.to === 'self' ? '<span class="small dim">자신</span>' : '<span class="dots' + (s.aoe ? ' link' : '') + '">' + (s.ally ? [4, 3, 2, 1] : [1, 2, 3, 4]).map(n => '<i class="' + (s.to.includes(String(n)) ? (s.ally ? 'a' : 'e') : '') + '"></i>').join('') + '</span>';
    const val = s.heal ? '치유 ' + esc(s.heal) : (s.dmg && s.dmg !== '-' ? '피해 ' + esc(s.dmg) : '');
    return '<tr><td style="white-space:nowrap">' + pic(s.img, 0, 'ico') + '</td><td><b>' + T(s.en, s.ko) + '</b>' + (s.form ? ' <span class="tag">' + (s.form === 'beast' ? '야수' : '인간') + '</span>' : '') + '<div class="small dim">' + ({ melee: '근접', ranged: '원거리' }[s.type] || '') + (val ? ' · ' + val : '') + '</div></td><td style="white-space:nowrap">' + dots(s.from, 'h', [4, 3, 2, 1]) + '<span class="dots-sep">▶</span>' + tgt + '</td><td class="small">' + esc(s.fx) + (s.self ? '<div class="dim">자신: ' + esc(s.self) + '</div>' : '') + '</td></tr>';
  }
  V.hero = function (args) {
    const h = decodeURIComponent(args[0] || ''); const g = HERO_GUIDE[h], d = HERO_DATA[h];
    if (!g) return V.heroes();
    const RES = { stun: '기절', blight: '중독', bleed: '출혈', disease: '질병', mov: '이동', debuff: '약화', deathblow: '죽음의 일격', trap: '함정 해제' };
    let o = '<a class="back" href="#/heroes">← 영웅 목록</a><div class="hero-top"><div class="big">' + pic(d.img, 400, 'pic') + '</div><div><h1>' + heroT(h) + '</h1><div class="chips"><span class="tag gold">' + esc(g.role) + '</span>' + g.pos.map(p => '<span class="tag">' + p + '열</span>').join('') + (g.dlc ? '<span class="tag red">' + esc(g.dlc) + '</span>' : '') + (d.religious ? '<span class="tag">신앙심</span>' : '') + '</div><p>' + esc(g.summary) + '</p>';
    o += '<div class="stats"><span class="stat">체력<b>' + esc(d.hp) + '</b></span><span class="stat">회피<b>' + esc(d.dodge) + '</b></span><span class="stat">속도<b>' + esc(d.spd) + '</b></span><span class="stat">치명타<b>' + esc(d.crit) + '%</b></span><span class="stat">피해<b>' + esc(d.dmg) + '</b></span></div>';
    o += '<div class="small dim">레벨 1 기준 · 저항: ' + Object.keys(RES).filter(k => d.res[k]).map(k => RES[k] + ' ' + esc(d.res[k]) + '%').join(' · ') + (d.critbonus ? ' · 치명타 시: ' + esc(d.critbonus) : '') + '</div>';
    if (g.alt && g.alt.length) o += '<div class="small dim">다른 번역: ' + g.alt.map(esc).join(', ') + '</div>';
    o += '<div class="small" style="margin-top:6px">' + (g.best.length ? '잘 맞는 곳: ' + g.best.map(b => '<a class="tag good" href="#/plan/' + b + '">' + esc(koOf(DG[b].en, DG[b].ko)) + '</a>').join(' ') : '') + (g.worst.length ? ' 안 맞는 곳: ' + g.worst.map(b => '<span class="tag bad">' + esc(koOf(DG[b].en, DG[b].ko)) + '</span>').join(' ') : '') + '</div></div></div>';
    o += '<h2>추천 세팅</h2><div class="grid g2">' + g.builds.map(b => '<div class="card"><h3>' + esc(b.name) + '</h3><div class="two" style="margin-top:6px"><div><div class="small dim">스킬</div>' + b.skills.map(k => skillLine(h, k)).join('') + '</div><div><div class="small dim">장신구</div>' + b.trinkets.map(trinketLine).join('') + thirdLine(h, b.trinkets) + '</div></div><p class="small dim">' + esc(b.note) + '</p></div>').join('') + '</div>';
    o += '<h2>운용 팁</h2>' + ul(g.tips);
    if (typeof CAMP !== 'undefined' && CAMP[h]) o += '<h2>추천 야영 기술</h2><div class="card">' + campHTML(h) + '</div><details class="small"><summary>야영 기술 전체</summary><div class="tw"><table><tr><th>기술</th><th>시간</th><th>대상</th><th>효과</th></tr>' + CAMP[h].skills.map(k => '<tr><td><b>' + T(k.en, k.ko) + '</b></td><td>' + k.cost + '</td><td>' + esc(k.target) + '</td><td>' + esc(k.fx) + '</td></tr>').join('') + '</table></div></details>';
    o += '<h2>전체 스킬</h2><p class="small dim"><span class="dots"><i class="h"></i></span> 사용 가능한 내 위치(왼쪽이 4열) ▶ <span class="dots"><i class="e"></i></span> 적 대상(왼쪽이 적 1열) / <span class="dots"><i class="a"></i></span> 아군 대상. 네모로 이어진 칸은 동시 타격. 수치는 1레벨 기준.</p><div class="tw"><table><tr><th></th><th>스킬</th><th>위치 ▶ 대상</th><th>효과</th></tr>' + d.skills.map(skillRow).join('') + '</table></div>';
    const mine = TRINKETS.filter(t => t.cls === h);
    if (mine.length) o += '<h2>전용 장신구</h2><div class="grid g3">' + mine.map(trinketCard).join('') + '</div>';
    const ps = PARTIES.filter(p => p.slots.some(s => s.hero === h));
    const bs = BOSSES.filter(b => (b.good || []).includes(h));
    if (ps.length) o += '<h2>이 영웅이 들어가는 파티</h2><div class="chips">' + ps.map(p => '<a class="chip" href="#/parties?id=' + p.id + '">' + esc(p.name) + '</a>').join('') + '</div>';
    if (bs.length) o += '<h2>잘 맞는 보스</h2><div class="chips">' + bs.map(b => '<a class="chip" href="#/boss/' + b.id + '">' + esc(koOf(b.en, b.ko)) + '</a>').join('') + '</div>';
    return o;
  };

  function bossCard(b) {
    return '<a class="card boss-card" href="#/boss/' + b.id + '"><div class="bi">' + pic(b.img, 160, '') + '</div><div><h3>' + bossT(b) + '</h3><div class="small dim">' + esc(b.summary || '') + '</div></div></a>';
  }
  V.bosses = function () {
    if (!BOSSES.length) return '<h1>보스 공략</h1><p class="lead">보스 데이터를 불러오지 못했습니다.</p>';
    let o = '<h1>보스 공략</h1><p class="lead">보스를 누르면 기믹, 공략 순서, 준비물, 추천 파티와 대체 파티가 나옵니다.</p>';
    GROUPS.forEach(([g, label]) => { const l = BOSSES.filter(b => b.group === g); if (l.length) o += '<h2>' + label + '</h2><div class="grid g3">' + l.map(bossCard).join('') + '</div>'; });
    return o;
  };
  V.boss = function (args) {
    const b = BOSSES.find(x => x.id === args[0]); if (!b) return V.bosses();
    const RES = { stun: '기절', blight: '중독', bleed: '출혈', debuff: '약화', move: '이동' };
    const lv = ['견습', '숙련', '챔피언'];
    const fmt = a => Array.isArray(a) ? (a.length === 3 ? a.map((v, i) => v == null ? null : lv[i] + ' ' + v).filter(Boolean).join(' / ') : a.filter(v => v != null).join(' / ')) : a;
    let o = '<a class="back" href="#/bosses">← 보스 목록</a><div class="boss-top"><div class="big">' + pic(b.img, 400, 'pic') + '</div><div><h1>' + bossT(b) + '</h1><div class="chips">' + (b.type ? '<span class="tag gold">' + esc(b.type) + '</span>' : '') + (b.size ? '<span class="tag">크기 ' + esc(b.size) + '칸</span>' : '') + '<span class="tag red">' + esc((GROUPS.find(g => g[0] === b.group) || [0, ''])[1]) + '</span></div><p><b>' + esc(b.summary || '') + '</b></p>';
    if (b.quest) o += '<p class="small dim">원정: ' + esc(b.quest) + '</p>';
    if (b.how) o += '<div class="note">조우 조건: ' + esc(b.how) + '</div>';
    if (b.hp && fmt(b.hp) !== '') o += '<div class="small">체력: <b>' + esc(fmt(b.hp)) + '</b></div>';
    if (b.res && Object.keys(b.res).length) o += '<div class="small dim" style="margin-top:4px">저항(%)</div><div class="reslist">' + Object.keys(RES).filter(k => b.res[k] != null && fmt(b.res[k]) !== '').map(k => '<span class="stat">' + RES[k] + '<b>' + esc(fmt(b.res[k])) + '</b></span>').join('') + '</div>';
    if (b.variants) o += '<div class="small dim" style="margin-top:6px">' + b.variants.map(esc).join(' · ') + '</div>';
    if (b.alt && b.alt.length) o += '<div class="small dim">다른 번역: ' + b.alt.map(esc).join(', ') + '</div>';
    o += '</div></div>';
    if (b.prep) o += '<h2>원정 준비</h2>' + ul(b.prep);
    o += '<div class="two"><div><h2>핵심 기믹</h2>' + ul(b.mech) + '</div><div><h2>공략</h2><ol class="steps">' + (b.strat || []).map(x => '<li>' + esc(x) + '</li>').join('') + '</ol></div></div>';
    o += '<div class="two"><div><h2>준비물</h2>' + ul(b.bring) + '</div><div><h2>영웅</h2><div class="small dim">추천</div><div class="chips">' + heroChips(b.good, 'good') + '</div>' + (b.bad && b.bad.length ? '<div class="small dim">비추천</div><div class="chips">' + heroChips(b.bad, 'bad') + '</div>' : '') + (b.goodWhy ? '<p class="small dim">' + esc(b.goodWhy) + '</p>' : '') + '</div></div>';
    [['party', '추천 파티'], ['altParty', '대체 파티']].forEach(([k, l]) => { const p = b[k]; if (p && p.slots) o += '<h2>' + esc(p.name || l) + '</h2><div class="card">' + lineupHTML(p.slots) + (p.note ? '<p class="dim">' + esc(p.note) + '</p>' : '') + '</div>'; });
    if (b.reward) o += '<h2>보상</h2><p>' + esc(b.reward) + '</p>';
    return o;
  };

  V.town = function (args) {
    if (typeof TOWN === 'undefined') return '<h1>마을</h1>';
    const tab = args[0] || 'road';
    const tabs = [['road', '업그레이드 순서'], ['weekly', '매주 할 일'], ['buildings', '건물'], ['quirks', '스트레스 · 기벽'], ['heirlooms', '가보'], ['districts', '구역 (DLC)'], ['camp', '야영']];
    let o = '<h1>마을 운영</h1><p class="lead">원정에서 돌아온 뒤 마을에서 무엇을, 어떤 순서로 해야 하는지 정리했습니다.</p>' + chipRow(tabs, tab, 'ttab');
    if (tab === 'road') o += '<h2>건물 업그레이드 로드맵</h2><ol class="road">' + TOWN.priority.map(p => '<li><b>' + esc(p.title) + '</b><div class="dim">' + esc(p.detail) + '</div></li>').join('') + '</ol>';
    if (tab === 'weekly') o += '<h2>매주 체크리스트</h2><p class="small dim">체크 상태는 이 브라우저에 저장됩니다. <a href="#" id="wkreset">모두 해제</a></p>' + TOWN.weekly.map((w, i) => '<label class="check' + (weekly[i] ? ' done' : '') + '"><input type="checkbox" data-wk="' + i + '"' + (weekly[i] ? ' checked' : '') + '><span>' + esc(w) + '</span></label>').join('');
    if (tab === 'buildings') o += TOWN.buildings.map(b => '<div class="card" style="margin-top:12px"><div class="row">' + pic(b.img, 0, 'ico lg') + '<h3>' + T(b.en, b.ko) + '</h3></div><p>' + esc(b.what) + '</p>' + (b.upgrades && b.upgrades.length ? '<div class="tw"><table><tr><th>업그레이드</th><th>효과</th><th>가보</th><th>우선</th></tr>' + b.upgrades.map(u => '<tr><td><b>' + esc(u.name) + '</b></td><td>' + esc(u.effect) + '<div class="small dim">' + esc(u.why || '') + '</div></td><td class="small">' + esc(u.heirloom || '') + '</td><td class="prio-' + esc(u.prio) + '"><b>' + esc(u.prio) + '</b></td></tr>').join('') + '</table></div>' : '') + ul(b.tips) + '</div>').join('');
    if (tab === 'quirks') {
      const qt = (l, c) => '<div class="tw"><table><tr><th>기벽</th><th>이유</th></tr>' + l.map(x => '<tr><td style="white-space:nowrap"><b class="' + c + '">' + T(x.en, x.ko) + '</b></td><td>' + esc(x.why) + '</td></tr>').join('') + '</table></div>';
      o += '<h2>스트레스 해소</h2>' + ul(TOWN.stress) + '<div class="two"><div><h2>고정할 만한 긍정 기벽</h2>' + qt(TOWN.quirks.lock, 'prio-높음') + '</div><div><h2>먼저 지울 부정 기벽</h2>' + qt(TOWN.quirks.remove, '') + '</div></div>';
    }
    if (tab === 'heirlooms') o += '<h2>가보와 재화</h2><div class="grid g2">' + TOWN.heirlooms.map(h => '<div class="card"><div class="row">' + pic(h.img, 0, 'ico lg') + '<h3>' + T(h.en, h.ko) + '</h3></div><dl class="kv" style="margin-top:8px"><dt>주 획득처</dt><dd>' + esc(h.from) + '</dd><dt>사용처</dt><dd>' + esc(h.use) + '</dd></dl></div>').join('') + '</div>';
    if (tab === 'districts') o += '<h2>구역</h2>' + ul(TOWN.districtTips) + '<div class="tw"><table><tr><th>구역</th><th>효과</th><th>비용</th><th>우선</th></tr>' + TOWN.districts.map(d => '<tr><td><b>' + T(d.en, d.ko) + '</b><div><span class="tag">' + esc(d.dlc) + '</span></div></td><td>' + esc(d.effect) + '<div class="small dim">' + esc(d.note || '') + '</div></td><td class="small">' + esc(d.cost) + '</td><td class="prio-' + esc(d.prio) + '"><b>' + esc(d.prio) + '</b></td></tr>').join('') + '</table></div>';
    if (tab === 'camp') o += '<h2>야영</h2>' + ul(TOWN.camping);
    return o;
  };

  V.events = function (args, q) {
    const kw = (q.q || '').toLowerCase(), kind = q.kind || 'all';
    const SEC = { 'Events about Next Quest': '다음 원정에 영향', 'Events about Town Activities': '마을 시설에 영향', 'Events about Heroes and Resolve XP': '영웅 영입 · 레벨', 'Special Events': '특수 이벤트' };
    const KIND = { good: '이득', bad: '손해', neutral: '중립', quest: '퀘스트' };
    const rows = [];
    const EK = typeof EVENT_KO !== 'undefined' ? EVENT_KO : {};
    TOWN_EVENTS_RAW.forEach(e => { const en = e.en.replace(/^\[[A-Za-z]+\]\s*/, ''); rows.push({ en, img: e.img, sec: e.sec, raw: e.eff }); });
    (typeof EVENT_EXTRA !== 'undefined' ? EVENT_EXTRA : []).forEach(e => rows.push({ en: e.en, img: e.img, sec: e.sec, raw: e.eff }));
    let o = '<h1>이벤트</h1><p class="lead">원정에서 돌아오면 확률적으로 발생하는 마을 이벤트와, 탐험 중 마주치는 돌발 상황 대처법입니다.</p>';
    o += '<div class="row"><input class="field" id="evq" placeholder="이벤트 검색 (한글/영문)" value="' + esc(q.q || '') + '" style="flex:1;max-width:360px"></div>' + chipRow([['all', '전체'], ['good', '이득'], ['bad', '손해'], ['quest', '퀘스트'], ['field', '탐험 중 상황']], kind, 'ekind');
    if (kind === 'field') return o + '<div class="grid g2">' + FIELD_EVENTS.map(f => '<div class="card"><div class="row">' + pic(f.icon, 0, 'ico') + '<h3>' + esc(f.title) + '</h3></div>' + ul(f.body) + '</div>').join('') + '</div>';
    Object.keys(SEC).forEach(sec => {
      const l = rows.filter(r => r.sec === sec).map(r => Object.assign({ k: EK[r.en] || { ko: r.en, eff: r.raw, kind: 'neutral' } }, r))
        .filter(r => (kind === 'all' || r.k.kind === kind) && (!kw || (r.en + ' ' + r.k.ko + ' ' + r.k.eff).toLowerCase().includes(kw)));
      if (!l.length) return;
      o += '<h2>' + SEC[sec] + '</h2><div class="grid g2">' + l.map(r => '<div class="card ev ' + esc(r.k.kind || 'neutral') + '">' + (r.img ? '<div class="ei">' + pic(r.img, 220, 'pic') + '</div>' : '') + '<div><h3>' + T(r.en, r.k.ko) + '</h3><div class="chips" style="margin:4px 0"><span class="tag ' + ({ good: 'good', bad: 'bad', quest: 'gold' }[r.k.kind] || '') + '">' + (KIND[r.k.kind] || '') + '</span>' + (r.k.dlc ? '<span class="tag">' + esc(r.k.dlc) + ' DLC</span>' : '') + '</div><div>' + esc(r.k.eff) + '</div>' + (r.k.tip ? '<div class="small dim">→ ' + esc(r.k.tip) + '</div>' : '') + '</div></div>').join('') + '</div>';
    });
    return o;
  };

  function trinketCard(t) {
    return '<div class="card trk">' + pic(t.img, 0, '') + '<div><b class="rar-' + (t.rar || 'vc') + '">' + T(t.en, t.ko) + '</b><div class="small dim">' + esc(RAR[t.rar] || '특수') + (t.cls ? ' · ' + esc(heroKo(t.cls)) + ' 전용' : '') + (t.area ? ' · ' + esc(t.area) : '') + '</div><div class="small">' + t.fx.map(esc).join('<br>') + '</div></div></div>';
  }
  V.trinkets = function (args, q) {
    const kw = (q.q || '').toLowerCase(), cls = q.cls || 'all';
    const list = TRINKETS.filter(t => (cls === 'all' || (cls === 'common' ? !t.cls : t.cls === cls)) && (!kw || (t.en + ' ' + (t.ko || '') + ' ' + t.fx.join(' ') + ' ' + heroKo(t.cls || '')).toLowerCase().includes(kw)));
    let o = '<h1>장신구</h1><p class="lead">게임에 나오는 한글 이름과 영문명을 함께 표기합니다. 이름이나 효과로 검색할 수 있습니다(예: "두루마리", "기절", "속도").</p>';
    o += '<div class="row"><input class="field" id="trq" placeholder="이름 또는 효과 검색" value="' + esc(q.q || '') + '" style="flex:1;max-width:320px"><select class="field" id="trcls"><option value="all">모든 장신구</option><option value="common"' + (cls === 'common' ? ' selected' : '') + '>공용</option>' + Object.keys(HERO_GUIDE).map(h => '<option value="' + esc(h) + '"' + (cls === h ? ' selected' : '') + '>' + esc(heroKo(h)) + ' 전용</option>').join('') + '</select><span class="small dim">' + list.length + '개</span></div>';
    return o + '<div class="grid g3" style="margin-top:12px">' + list.map(trinketCard).join('') + '</div>';
  };

  V.glossary = function (args, q) {
    const kw = (q.q || '').toLowerCase(), cat = q.cat || '전체';
    const cats = ['전체'].concat(Array.from(new Set(TERMS.map(t => t.cat))));
    const list = TERMS.filter(t => (cat === '전체' || t.cat === cat) && (!kw || (t.en + ' ' + t.ko + ' ' + t.alt.join(' ') + ' ' + (overrides[t.en] || '')).toLowerCase().includes(kw)));
    const n = Object.keys(overrides).length;
    let o = '<h1>용어 사전</h1><p class="lead">에픽게임즈 버전의 유저 한글패치는 공식 한글판과 용어가 다릅니다. 이 가이드는 <b>영문 원문을 기준</b>으로 삼고, 한글 표기는 일반적인 번역으로 적었습니다. 내 게임에서 다르게 나오는 용어는 아래 "내 게임 용어" 칸에 적어 두면 사이트 전체의 이름 표기가 그 용어로 바뀝니다(이 브라우저에 저장).</p>';
    o += '<div class="card"><h3>표기 방식</h3>' + chipRow([['both', '한글 + 영문'], ['ko', '한글만'], ['en', '영문만']], mode, 'mode') + '<div class="small dim">게임 언어를 영어로 두고 플레이한다면 "영문만"이 편합니다. 내 용어 ' + n + '개 저장됨' + (n ? ' · <a href="#" id="glreset">모두 초기화</a> · <a href="#" id="glexport">내보내기</a>' : '') + ' · <a href="#" id="glimport">가져오기</a></div></div>';
    o += '<div class="row" style="margin-top:12px"><input class="field" id="glq" placeholder="용어 검색 (한글 · 영문 · 다른 번역)" value="' + esc(q.q || '') + '" style="flex:1;max-width:360px"></div>' + chipRow(cats.map(c => [c, esc(c)]), cat, 'gcat');
    o += '<div class="tw"><table class="gl"><tr><th>영문 (기준)</th><th>이 가이드의 표기</th><th>다른 번역 후보</th><th style="min-width:150px">내 게임 용어</th></tr>' + list.slice(0, 400).map(t => '<tr><td><b>' + esc(t.en) + '</b><div class="small dim">' + esc(t.cat) + '</div></td><td>' + esc(t.ko) + '</td><td class="small dim">' + t.alt.map(esc).join(', ') + '</td><td><input data-term="' + esc(t.en) + '" value="' + esc(overrides[t.en] || '') + '" placeholder="' + esc(t.ko) + '" class="' + (overrides[t.en] ? 'changed' : '') + '"></td></tr>').join('') + '</table></div>';
    o += '<div class="note">공략 본문의 문장 속 용어까지 바뀌지는 않습니다. 본문에는 처음 나오는 고유명사에 영문을 함께 적어 두었습니다.</div>';
    return o;
  };

  // ================= 원정 진행 화면 =================
  const RUN_ITEMS = ['Food', 'Torch', 'Shovel', 'Skeleton Key', 'Holy Water', 'Medicinal Herbs', 'Bandage', 'Antivenom', 'Laudanum'];
  let run = store.get('dd.run', { dg: 'ruins', inv: {}, sel: null, log: [] });
  const saveRun = () => store.set('dd.run', run);
  function runCurios() { return CURIOS.filter(c => c.dg === run.dg || c.dg === 'all'); }
  V.run = function (args) {
    if (args[0] && DG[args[0]] && args[0] !== run.dg) { run.dg = args[0]; run.sel = null; saveRun(); }
    const d = DG[run.dg] || DG.ruins; const list = runCurios();
    let o = '<h1>원정 진행</h1><p class="lead">게임 옆 모니터에 띄워 두는 화면입니다. 기물을 만나면 그림을 누르세요. 가진 보급품 수량을 맞춰 두면 지금 가방 기준으로 무엇을 할지 알려 줍니다.</p>';
    o += '<div class="chips">' + DUNGEONS.map(x => '<button class="chip' + (x.id === run.dg ? ' on' : '') + '" data-rdg="' + x.id + '">' + esc(koOf(x.en, x.ko)) + '</button>').join('') + '</div>';
    o += '<div class="runwrap"><div class="runcol">';
    // 가방
    o += '<div class="card"><div class="row"><h3>가방</h3><span class="small dim">권장 수량으로 채우기:</span>' + (d.provLabels || ['짧은', '중간', '긴']).map((l, i) => '<button class="chip sm" data-rfill="' + i + '">' + esc(l.replace(' 원정', '')) + '</button>').join('') + '<button class="chip sm" data-rfill="x">비우기</button></div><div class="inv">' +
      RUN_ITEMS.map(k => { const p = PROV[k], n = run.inv[k] || 0; return '<div class="invrow' + (n ? '' : ' zero') + '">' + pic(p.img, 0, 'ico') + '<span class="invname">' + T(p.en, p.ko) + '</span><button data-rinv="' + esc(k) + '" data-d="-1" aria-label="줄이기">−</button><b>' + n + '</b><button data-rinv="' + esc(k) + '" data-d="1" aria-label="늘리기">+</button></div>'; }).join('') +
      '</div><div class="row" style="margin-top:8px"><button class="chip sm" data-rquick="hunger">배고픔 (음식 −4)</button><button class="chip sm" data-rquick="torch">횃불 사용 (−1)</button><button class="chip sm" data-rquick="dig">장애물 (삽 −1)</button></div>' +
      ((run.inv.Food || 0) < 4 ? '<div class="note warn">음식이 4개 미만입니다. 다음 배고픔 이벤트에서 굶게 됩니다.</div>' : '') + '</div>';
    o += '<div class="card"><h3>이 던전에서 통하는 것</h3><div class="chips">' + d.dmg.good.map(x => '<span class="tag good">' + esc(x) + '</span>').join('') + d.dmg.bad.map(x => '<span class="tag bad">✕ ' + esc(x) + '</span>').join('') + '</div><h3 style="margin-top:8px">먼저 잡을 적</h3>' + ul(d.threats) + '</div>';
    const bs = d.bosses.map(b => BOSSES.find(x => x.id === b)).filter(Boolean);
    if (bs.length) o += '<div class="card"><h3>보스</h3><div class="chips">' + bs.map(b => '<a class="chip" href="#/boss/' + b.id + '">' + esc(koOf(b.en, b.ko)) + '</a>').join('') + '</div></div>';
    o += '</div><div class="runcol">';
    // 기물 그림판
    const groups = [['corridor', '복도'], ['curio_room', '방'], ['treasure_room', '보물 방'], ['secret_room', '비밀 방'], [null, '원정 전용 · 기타']];
    o += '<div class="card"><h3>기물 — 그림을 누르세요</h3>';
    groups.forEach(([loc, label]) => { const l = list.filter(c => (c.loc || null) === loc); if (!l.length) return;
      o += '<div class="small dim" style="margin-top:8px">' + label + '</div><div class="cgrid">' + l.map(c => { const v = verdict(c); const en = v.item && ITEM_EN[v.item]; const have = en && PROV[en] ? (run.inv[en] || 0) : null;
        return '<button class="ctile' + (run.sel === c.en ? ' on' : '') + ' v-' + v.cls + '" data-rsel="' + esc(c.en) + '"><span class="cimg">' + pic(c.img, 160, '') + '</span><span class="cname">' + esc(koOf(c.en, c.ko)) + '</span>' + (v.item ? '<span class="cneed' + (have === 0 ? ' none' : '') + '">' + itemImg(v.item, 'ico sm') + '</span>' : '') + '</button>'; }).join('') + '</div>'; });
    o += '<div class="small dim" style="margin-top:8px">테두리 색: <span class="tag good">아이템 사용</span> <span class="tag gold">맨손 OK</span> <span class="tag" style="color:#cdb9e6">도박</span> <span class="tag bad">건드리지 말 것</span> · 아이콘이 흐리면 가방에 그 아이템이 없음</div></div>';
    o += '</div><div class="runcol">';
    // 선택한 기물
    const c = list.find(x => x.en === run.sel);
    if (!c) o += '<div class="card dim">기물을 선택하면 여기에 권장 행동과 확률이 나옵니다.</div>';
    else {
      const v = verdict(c); let banner = '';
      if (v.item) {
        const opts = [v.item].concat(v.also || []).filter(i => PROV[ITEM_EN[i]]); const haveOpt = opts.find(i => (run.inv[ITEM_EN[i]] || 0) > 0);
        if (!opts.length) banner = '<div class="note">퀘스트 아이템으로 상호작용하는 기물입니다.</div>';
        else if (haveOpt) banner = '<div class="note good"><b>' + itemT(haveOpt) + '</b> 보유 ' + run.inv[ITEM_EN[haveOpt]] + '개 → 사용하세요. <button class="chip sm" data-ruse="' + esc(ITEM_EN[haveOpt]) + '">사용함 (−1)</button></div>';
        else { const hand = c.inter.find(i => i.item === 'hand'); const hs = hand ? scoreOf(hand) : null;
          banner = '<div class="note warn"><b>' + itemT(v.item) + '</b>이(가) 가방에 없습니다. ' + (!hs ? '아이템 없이는 열 수 없습니다.' : hs.b === 0 ? '맨손으로 해도 손해는 없지만 보상이 줄어듭니다.' : hs.b >= 40 ? '맨손은 나쁜 결과 ' + Math.round(hs.b) + '% — 지나치는 편이 낫습니다.' : '맨손은 좋음 ' + Math.round(hs.g) + '% / 나쁨 ' + Math.round(hs.b) + '% 도박입니다.') + '</div>'; }
      }
      o += banner + curioCard(c);
    }
    o += '<div class="card small dim">골동품상이 있으면 기물은 골동품상으로 조사하세요(추가 전리품). 함정 해제 확률이 높은 영웅으로 함정을 밟고, 강제 상호작용 기벽이 있는 영웅은 복도 기물을 멋대로 건드릴 수 있습니다.</div>';
    return o + '</div></div>';
  };

  // ================= 파티 편성기 =================
  let bld = store.get('dd.builder', { slots: [null, null, null, null], active: 0, dg: '' });
  const saveBld = () => store.set('dd.builder', bld);
  const usableAt = (s, pos) => s.from.includes(String(pos));
  function defaultSkills(hero, pos) {
    const all = HERO_DATA[hero].skills; const idx = [];
    if (hero === 'Abomination') return all.map((s, i) => i);
    const pref = (HERO_GUIDE[hero].builds[0] || { skills: [] }).skills;
    pref.forEach(n => { const i = all.findIndex(s => s.en === n); if (i >= 0 && usableAt(all[i], pos) && idx.length < 4) idx.push(i); });
    all.forEach((s, i) => { if (idx.length < 4 && !idx.includes(i) && usableAt(s, pos)) idx.push(i); });
    return idx;
  }
  function setSlot(i, hero) { bld.slots[i] = hero ? { hero, skills: defaultSkills(hero, 4 - i) } : null; }
  function analyze() {
    const A = { heal: [], stun: [], stress: [], bleed: [], blight: [], mark: [], markPay: [], move: [], cover: [0, 0, 0, 0], dead: [], notes: [], warn: [], good: [] };
    const filled = bld.slots.map((s, i) => s && { s, pos: 4 - i, h: HERO_DATA[s.hero], g: HERO_GUIDE[s.hero] }).filter(Boolean);
    filled.forEach(({ s, pos, h, g }) => {
      const nm = heroKo(s.hero);
      s.skills.forEach(i => { const k = h.skills[i]; if (!k) return;
        if (!usableAt(k, pos)) { A.dead.push(nm + ' — ' + koOf(k.en, k.ko)); return; }
        const fx = k.fx || '';
        if (k.heal && k.to !== 'self') A.heal.push(nm + ' ' + k.en);
        if (/기절 \(/.test(fx)) A.stun.push(nm + ' ' + k.en);
        if (k.ally && /스트레스 -\d|-\d+ 스트레스/.test(fx)) A.stress.push(nm + ' ' + k.en);
        if (!k.ally && /출혈 \(/.test(fx)) A.bleed.push(nm);
        if (!k.ally && /중독 \(/.test(fx)) A.blight.push(nm);
        if (/대상에 표식/.test(fx)) A.mark.push(nm);
        if (/표식 대상 상대/.test(fx)) A.markPay.push(nm);
        if (/전진|후퇴/.test(k.self || '')) A.move.push(nm + ' ' + k.en);
        if (!k.ally && k.to !== 'self' && k.dmg && k.dmg !== '-100%') [1, 2, 3, 4].forEach(r => { if (k.to.includes(String(r))) A.cover[r - 1]++; });
      });
      if (!g.pos.includes(pos)) A.warn.push(nm + ': ' + pos + '열은 권장 자리가 아닙니다 (권장 ' + g.pos.join('·') + '열).');
    });
    const n = filled.length; if (!n) return A;
    const uniq = a => Array.from(new Set(a));
    const names = filled.map(f => f.s.hero);
    names.forEach((h, i) => { if (names.indexOf(h) !== i && h === 'Flagellant') A.warn.push('고행자는 파티에 한 명만 넣을 수 있습니다.'); });
    if (n === 4) {
      if (!A.heal.length) A.warn.push('아군을 치유하는 스킬이 없습니다. 짧은 원정이 아니면 위험합니다.'); else if (A.heal.length === 1 && /Wyrd|Battle Heal|Bandage|Fortifying/.test(A.heal[0])) A.notes.push('힐이 불안정하거나 약한 스킬 하나뿐입니다. 음식과 야영 힐을 넉넉히.'); else A.good.push('치유: ' + uniq(A.heal).join(', '));
      if (!A.stun.length) A.notes.push('기절 스킬이 없습니다. 일반 전투에서 사고가 늘 수 있습니다.'); else A.good.push('기절: ' + uniq(A.stun).join(', '));
      if (!A.stress.length) A.notes.push('전투 중 스트레스 치유가 없습니다. 중간 이상 길이에서는 야영 스킬로 보완해야 합니다.'); else A.good.push('스트레스 치유: ' + uniq(A.stress).join(', '));
      if (A.cover[2] + A.cover[3] < 3) A.warn.push('적 3·4열을 때릴 수 있는 스킬이 부족합니다 (3열 ' + A.cover[2] + '개, 4열 ' + A.cover[3] + '개). 후열의 스트레스 딜러와 후열 보스에 취약합니다.');
      if (A.cover[0] + A.cover[1] < 3) A.warn.push('적 1·2열을 때릴 스킬이 부족합니다.');
      if (A.mark.length && !A.markPay.length) A.notes.push('표식을 걸지만 표식 추가 피해를 받는 스킬이 없습니다.');
      if (!A.mark.length && A.markPay.length) A.notes.push('표식 추가 피해 스킬이 있는데 표식을 거는 스킬이 없습니다.');
      if (A.mark.length && uniq(A.markPay).length >= 2) A.good.push('표식 시너지: ' + uniq(A.markPay).join(', '));
      if (uniq(A.move).length >= 2) A.notes.push('위치를 바꾸는 스킬이 여러 개입니다 (' + uniq(A.move).join(', ') + '). 옆자리 영웅이 밀려도 스킬을 쓸 수 있는지 확인하세요.');
    }
    if (A.dead.length) A.warn.push('지금 자리에서 못 쓰는 스킬: ' + A.dead.join(', '));
    const d = DG[bld.dg];
    if (d) {
      const bleedBad = ['ruins', 'cove'].includes(d.id), blightBad = ['weald', 'warrens', 'courtyard'].includes(d.id);
      if (bleedBad && uniq(A.bleed).length) A.warn.push(koOf(d.en, d.ko) + '에서는 출혈이 잘 안 통합니다: ' + uniq(A.bleed).join(', ') + '의 출혈 스킬을 다른 스킬로 바꾸세요.');
      if (blightBad && uniq(A.blight).length) A.warn.push(koOf(d.en, d.ko) + '에서는 중독이 잘 안 통합니다: ' + uniq(A.blight).join(', ') + '.');
      if (!bleedBad && d.id !== 'farmstead' && d.id !== 'darkest' && n === 4 && !A.bleed.length && blightBad) A.notes.push('이 던전은 출혈이 약점인데 출혈 스킬이 없습니다.');
      if (bleedBad && n === 4 && !A.blight.length) A.notes.push('이 던전은 중독이 약점인데 중독 스킬이 없습니다.');
      names.forEach(h => { if (d.heroes.good.includes(h)) A.good.push(heroKo(h) + ': 이 던전 추천 영웅'); if (d.heroes.bad.includes(h)) A.notes.push(heroKo(h) + ': 이 던전 비추천 — ' + d.badWhy); });
    }
    ['warn', 'notes', 'good'].forEach(k => { A[k] = uniq(A[k]); });
    A.order = filled.slice().sort((a, b) => parseFloat(b.h.spd) - parseFloat(a.h.spd)).map(f => heroKo(f.s.hero) + ' ' + f.h.spd);
    return A;
  }
  V.builder = function () {
    const A = analyze(); const act = bld.active;
    let o = '<h1>파티 편성기</h1><p class="lead">자리를 누르고 영웅을 고르세요. 그 자리에서 쓸 수 있는 스킬만 켜지고, 힐·기절·후열 타격·스트레스 치유가 충분한지 바로 점검합니다. 던전을 고르면 상성도 봅니다.</p>';
    o += '<div class="row"><span class="small dim">불러오기:</span>' + PARTIES.map(p => '<button class="chip sm" data-bpreset="' + p.id + '">' + esc(p.name) + '</button>').join('') + '<button class="chip sm" data-bclear="1">비우기</button></div>';
    o += '<div class="row" style="margin-top:6px"><span class="small dim">갈 던전:</span><button class="chip sm' + (!bld.dg ? ' on' : '') + '" data-bdg="">선택 안 함</button>' + DUNGEONS.map(d => '<button class="chip sm' + (bld.dg === d.id ? ' on' : '') + '" data-bdg="' + d.id + '">' + esc(koOf(d.en, d.ko)) + '</button>').join('') + '</div>';
    o += '<div class="lineup">' + bld.slots.map((s, i) => { const pos = 4 - i;
      let c = '<div class="slot bslot' + (i === act ? ' active' : '') + '" data-bslot="' + i + '"><div class="slot-top">';
      if (!s) return c + '<div class="port"></div><div><div class="pos">' + pos + '열</div><span class="dim">비어 있음 — 눌러서 선택</span></div></div></div>';
      const h = HERO_DATA[s.hero]; const abom = s.hero === 'Abomination';
      c += '<div class="port">' + pic(h.img, 120, '') + '</div><div><div class="pos">' + pos + '열' + (pos === 1 ? ' · 맨 앞' : pos === 4 ? ' · 맨 뒤' : '') + '</div><a class="hn" href="#/hero/' + encodeURIComponent(s.hero) + '">' + heroT(s.hero) + '</a></div><button class="xbtn" data-bremove="' + i + '" title="빼기">✕</button></div>';
      c += '<h5>스킬 ' + (abom ? '(전부 사용)' : '(' + s.skills.length + '/4)') + '</h5>' + h.skills.map((k, ki) => { const ok = usableAt(k, pos), on = s.skills.includes(ki);
        return '<button class="bsk' + (on ? ' on' : '') + (ok ? '' : ' no') + '" data-bskill="' + i + ':' + ki + '" title="' + esc([k.fx, k.self && ('자신: ' + k.self), ok ? '' : '이 자리에서 사용 불가 (' + k.from.split('').join('·') + '열 전용)'].filter(Boolean).join(' / ')) + '">' + pic(k.img, 0, '') + '<span>' + esc(koOf(k.en, k.ko)) + '</span></button>'; }).join('');
      c += '<div class="row" style="margin-top:6px"><button class="chip sm" data-bmove="' + i + ':-1"' + (i === 0 ? ' disabled' : '') + '>← 뒤로</button><button class="chip sm" data-bmove="' + i + ':1"' + (i === 3 ? ' disabled' : '') + '>앞으로 →</button></div>';
      return c + '</div>'; }).join('') + '</div><div class="front-back"><span>← 후열 (4열)</span><span>전열 (1열) · 적 방향 →</span></div>';
    o += '<div class="two" style="margin-top:12px"><div class="card"><h3>' + (4 - act) + '열에 넣을 영웅</h3><div class="hpick">' + Object.keys(HERO_GUIDE).map(h => { const g = HERO_GUIDE[h]; const fit = g.pos.includes(4 - act); const used = bld.slots.some(s => s && s.hero === h);
      return '<button class="hp' + (fit ? ' fit' : '') + (used ? ' used' : '') + '" data-bhero="' + esc(h) + '" title="' + esc(g.role) + '"><span class="port">' + pic(HERO_DATA[h].img, 120, '') + '</span><span>' + esc(heroKo(h)) + '</span></button>'; }).join('') + '</div><div class="small dim">금색 테두리 = 이 자리가 권장 위치인 영웅</div></div>';
    o += '<div class="card"><h3>점검 결과</h3>';
    const n = bld.slots.filter(Boolean).length;
    if (!n) o += '<p class="dim">영웅을 넣으면 점검 결과가 나옵니다.</p>';
    else {
      o += A.warn.map(x => '<div class="chk bad">✕ ' + esc(x) + '</div>').join('') + A.notes.map(x => '<div class="chk mid">△ ' + esc(x) + '</div>').join('') + A.good.map(x => '<div class="chk ok">✓ ' + esc(x) + '</div>').join('');
      if (n < 4) o += '<div class="chk mid">△ 네 자리를 모두 채우면 전체 점검을 합니다.</div>';
      o += '<h3 style="margin-top:10px">적 열별 공격 스킬 수</h3><div class="cover">' + A.cover.map((v, i) => '<div class="' + (v === 0 ? 'c0' : v < 2 ? 'c1' : 'c2') + '"><b>' + v + '</b><span>적 ' + (i + 1) + '열</span></div>').join('') + '</div>';
      if (A.order) o += '<div class="small dim" style="margin-top:8px">기본 속도 순서: ' + A.order.map(esc).join(' → ') + '</div>';
    }
    return o + '</div></div>';
  };

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-rdg],[data-rfill],[data-rinv],[data-rquick],[data-rsel],[data-ruse],[data-bslot],[data-bhero],[data-bskill],[data-bpreset],[data-bclear],[data-bdg],[data-bremove],[data-bmove]');
    if (!t) return; const d = t.dataset; const dec = (k, n) => { run.inv[k] = Math.max(0, (run.inv[k] || 0) - n); };
    if (d.rdg != null) { run.dg = d.rdg; run.sel = null; saveRun(); history.replaceState(null, '', '#/run/' + d.rdg); }
    else if (d.rfill != null) { const dg = DG[run.dg]; run.inv = {}; if (d.rfill !== 'x') Object.keys(dg.provisions).forEach(k => { run.inv[k] = dg.provisions[k][+d.rfill]; }); saveRun(); }
    else if (d.rinv != null) { run.inv[d.rinv] = Math.max(0, (run.inv[d.rinv] || 0) + (+d.d)); saveRun(); }
    else if (d.rquick != null) { if (d.rquick === 'hunger') dec('Food', 4); else if (d.rquick === 'torch') dec('Torch', 1); else dec('Shovel', 1); saveRun(); }
    else if (d.rsel != null) { run.sel = d.rsel; saveRun(); }
    else if (d.ruse != null) { dec(d.ruse, 1); saveRun(); }
    else if (d.bremove != null) { e.stopPropagation(); setSlot(+d.bremove, null); bld.active = +d.bremove; saveBld(); }
    else if (d.bmove != null) { const [i, dir] = d.bmove.split(':').map(Number); const j = i + dir; if (j < 0 || j > 3) return; const a = bld.slots[i], b = bld.slots[j]; setSlot(j, a && a.hero); setSlot(i, b && b.hero); bld.active = j; saveBld(); }
    else if (d.bskill != null) { const [i, ki] = d.bskill.split(':').map(Number); const s = bld.slots[i]; if (!s || s.hero === 'Abomination') return; const at = s.skills.indexOf(ki); if (at >= 0) s.skills.splice(at, 1); else { if (!usableAt(HERO_DATA[s.hero].skills[ki], 4 - i)) return; if (s.skills.length >= 4) s.skills.shift(); s.skills.push(ki); } bld.active = i; saveBld(); }
    else if (d.bslot != null) { if (e.target.closest('a')) return; bld.active = +d.bslot; saveBld(); }
    else if (d.bhero != null) { setSlot(bld.active, d.bhero); const next = bld.slots.findIndex(s => !s); if (next >= 0) bld.active = next; saveBld(); }
    else if (d.bpreset != null) { const p = PARTIES.find(x => x.id === d.bpreset); p.slots.forEach((s, i) => { const all = HERO_DATA[s.hero].skills; bld.slots[i] = { hero: s.hero, skills: s.hero === 'Abomination' ? all.map((_, k) => k) : s.skills.map(n => all.findIndex(k => k.en === n)).filter(k => k >= 0) }; }); p.tags.some(tg => DG[tg] && (bld.dg = tg)); saveBld(); }
    else if (d.bclear != null) { bld = { slots: [null, null, null, null], active: 0, dg: bld.dg }; saveBld(); }
    else if (d.bdg != null) { bld.dg = d.bdg; saveBld(); }
    render(true);
  });

  // ================= 화면 인식 (게임 창 캡처 → 글자 읽기 → 상황 판단 → 맞는 페이지로 이동) =================
  const OCR = { stream: null, video: null, worker: null, busy: false, auto: false, timer: null, lines: [], status: '', thumb: null, last: null, pick: null, result: null, lastKey: '', open: store.get('dd.dockOpen', false), media: false, audio: null, ask: null, region: store.get('dd.ocrRegion', null) };
  let aliases = store.get('dd.ocrAlias', {});   // 읽은 글자(정규화) -> 'curio:영문명' | 'dg:id' | 'len:0~2' | 'screen:provision|map' | 'boss:id'
  Object.keys(aliases).forEach(k => { if (!/^[a-z]+:/.test(aliases[k])) aliases[k] = 'curio:' + aliases[k]; });
  let ctx = store.get('dd.ctx', { dg: null, len: null });   // 마지막으로 인식한 던전/길이 (보급품 화면에 던전 이름이 없을 때 사용)
  const normT = s => String(s).toLowerCase().replace(/[^0-9a-z가-힣]/g, '');
  function lev(a, b) { const m = a.length, n = b.length; if (!m) return n; if (!n) return m; let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; } return prev[n]; }
  const countIn = (hay, needle) => { let n = 0, i = 0; while ((i = hay.indexOf(needle, i)) >= 0) { n++; i += needle.length; } return n; };
  // 키워드 표 (영문 원문 + 이 가이드의 한글 + 다른 번역 후보 + 사용자가 용어 사전에 적은 용어). 실제 캡처로 계속 보강할 부분.
  const LEN_WORDS = [['short', '짧음', '짧은', '단거리'], ['medium', '중간', '보통'], ['long', '긺', '장거리', '긴원정', '긴', '김']];
  const SCREEN_WORDS = { provision: ['provision', 'provisions', '보급', '보급품', '물자', '식량및물자'], map: ['embark', 'expedition', 'questlength', '원정', '출정', '출발'] };
  function wordsOf(en, ko, alt) { return [en, ko, overrides[en]].concat(alt || []).filter(Boolean).map(normT).filter(k => k.length >= 2); }
  function matchCurio(lines, all, nl) {
    all = all || normT(lines.join(' ')); nl = nl || lines.map(normT).filter(x => x.length >= 2); let best = null;
    const consider = (en, score, how) => { const c = CURIOS.find(x => x.en === en); if (!c) return; if (c.dg === (ctx.dg || run.dg) || c.dg === 'all') score += 0.5; if (!best || score > best.score) best = { en, score, how }; };
    const seen = {};
    CURIOS.forEach(c => { if (seen[c.en]) return; seen[c.en] = 1;
      [c.ko, overrides[c.en], c.en.replace(/\s*\(.*\)/, '')].concat(c.alt || []).filter(Boolean).forEach(name => { const k = normT(name); if (k.length < 2) return;
        if (k.length >= 4 && all.includes(k)) consider(c.en, 10 + k.length, '이름 일치');
        else nl.forEach(l => { if (l === k) consider(c.en, 10 + k.length, '이름 일치'); else if (k.length >= 4 && Math.abs(l.length - k.length) <= 2) { const r = 1 - lev(l, k) / Math.max(l.length, k.length); if (r >= 0.75) consider(c.en, r * k.length, '비슷한 이름'); } });
      }); });
    return best;
  }
  // 읽은 글자로 지금 어떤 화면인지 판단
  function classify(lines) {
    const all = normT(lines.join(' ')); const nl = lines.map(normT).filter(x => x.length >= 2); const toks = lines.join(' ').split(/\s+/).map(normT).filter(Boolean);
    const R = { kind: 'none', dg: null, len: null, dgs: [], why: [] };
    const learned = {}; const hit = (k, v) => { (learned[k] = learned[k] || []).push(v); };
    Object.keys(aliases).forEach(a => { if (nl.includes(a) || (a.length >= 3 && all.includes(a))) { const [k, v] = aliases[a].split(/:(.*)/); hit(k, v); } });
    // 던전: 화면에 여러 던전 이름이 보일 수 있으므로 가장 많이 나온 이름을 고른다
    const cnt = {};
    DUNGEONS.forEach(d => { if (d.id === 'darkest') return; let n = 0; wordsOf(d.en, d.ko, d.alt).forEach(w => { n = Math.max(n, w.length >= 3 ? countIn(all, w) : toks.filter(t => t === w).length); }); if (n) cnt[d.id] = n; });
    (learned.dg || []).forEach(id => { cnt[id] = (cnt[id] || 0) + 5; });
    R.dgs = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a]);
    if (R.dgs.length === 1 || (R.dgs.length > 1 && cnt[R.dgs[0]] > cnt[R.dgs[1]])) R.dg = R.dgs[0];
    // 길이
    if (learned.len) R.len = +learned.len[0];
    else LEN_WORDS.forEach((ws, i) => { if (R.len == null && ws.some(w => toks.includes(w) || (w.length >= 5 && all.includes(w)))) R.len = i; });
    // 보급품 화면: 보급품 이름이 여러 개 보이거나 화면 제목이 보임
    const provHits = PROVISIONS.filter(p => wordsOf(p.en, p.ko, p.alt).some(w => w.length >= 3 ? all.includes(w) : toks.includes(w))).map(p => p.en);
    const isProv = (learned.screen || []).includes('provision') || provHits.length >= 3 || (provHits.length >= 2 && SCREEN_WORDS.provision.some(w => all.includes(w)));
    const boss = (learned.boss || [])[0] || (BOSSES.find(b => wordsOf(b.en, b.ko, b.alt).some(w => w.length >= 4 && all.includes(w))) || {}).id;
    const curio = learned.curio ? { en: learned.curio[0], how: '등록한 내 용어' } : matchCurio(lines, all, nl);
    if (isProv) { R.kind = 'provision'; R.why.push('보급품 이름 ' + provHits.length + '개'); }
    else if ((learned.screen || []).includes('map')) R.kind = 'map';
    else if (curio) { R.kind = 'curio'; R.curio = curio.en; R.why.push(curio.how); }
    else if (boss) { R.kind = 'boss'; R.boss = boss; }
    else if (R.dgs.length) { R.kind = 'map'; R.why.push('던전 이름'); }
    return R;
  }
  function applyResult(R, silentSame) {
    const key = [R.kind, R.dg, R.len, R.curio, R.boss].join('|');
    if (silentSame && key === OCR.lastKey) return; OCR.lastKey = key; OCR.ask = null;
    const dgName = id => koOf(DG[id].en, DG[id].ko); const LEN = ['짧은', '중간', '긴'];
    if (R.kind === 'curio') { const c = CURIOS.find(x => x.en === R.curio); if (c.dg !== 'all' && c.dg !== run.dg) run.dg = c.dg; run.sel = c.en; saveRun(); OCR.status = '탐험 중 · 기물: ' + koOf(c.en, c.ko) + ' → 원정 진행'; go('#/run/' + run.dg); return; }
    if (R.kind === 'boss') { const b = BOSSES.find(x => x.id === R.boss); OCR.status = '보스: ' + koOf(b.en, b.ko) + ' → 보스 공략'; go('#/boss/' + b.id); return; }
    if (R.kind === 'provision') {
      const dg = R.dg || ctx.dg, len = R.len != null ? R.len : (ctx.len != null ? ctx.len : 0);
      if (!dg) { OCR.status = '보급품 구매 화면 · 어느 던전인지 못 읽었습니다. 골라 주세요.'; OCR.ask = { kind: 'provision', len }; return; }
      ctx = { dg, len }; store.set('dd.ctx', ctx); OCR.status = '보급품 구매 화면 · ' + dgName(dg) + ' · ' + LEN[len] + ' 원정 → 보급품 체크리스트'; go('#/plan/' + dg + '/' + len, 'provsec'); return;
    }
    if (R.kind === 'map') {
      if (!R.dg) { OCR.status = '원정 선택 화면 · 던전 이름이 여러 개 보여서 하나로 정하지 못했습니다. 골라 주세요.'; OCR.ask = { kind: 'map', len: R.len, dgs: R.dgs }; return; }
      ctx = { dg: R.dg, len: R.len != null ? R.len : ctx.len }; store.set('dd.ctx', ctx); bld.dg = R.dg; saveBld();
      OCR.status = '원정 선택 화면 · ' + dgName(R.dg) + (R.len != null ? ' · ' + LEN[R.len] + ' 원정' : '') + ' → 추천 파티'; go('#/parties?tag=' + R.dg); return;
    }
    OCR.status = OCR.lines.length ? '어떤 화면인지 알아내지 못했습니다. 아래 읽은 글자 중 단서가 되는 것을 눌러 무엇인지 알려 주면 다음부터 인식합니다.' : '글자를 읽지 못했습니다.';
  }
  function go(hash, scrollId) { if (location.hash !== hash) location.hash = hash; else render(true); if (scrollId) setTimeout(() => { const el = document.getElementById(scrollId); if (el) el.scrollIntoView({ block: 'start' }); }, 60); }
  function loadScript(src) { return new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => no(new Error('스크립트를 불러오지 못했습니다')); document.head.appendChild(s); }); }
  async function ensureWorker() {
    if (OCR.worker) return OCR.worker;
    const base = new URL('vendor/tesseract/', location.href.split('#')[0]).href;
    if (!window.Tesseract) await loadScript(base + 'tesseract.min.js');
    OCR.worker = await window.Tesseract.createWorker(['kor', 'eng'], 1, { workerPath: base + 'worker.min.js', corePath: base, langPath: base + 'lang', gzip: true });
    return OCR.worker;
  }
  const POOL = {};
  function poolWorker(lang, i) { const k = lang + i; if (!POOL[k]) POOL[k] = (async () => { const base = new URL('vendor/tesseract/', location.href.split('#')[0]).href; if (!window.Tesseract) await loadScript(base + 'tesseract.min.js'); return window.Tesseract.createWorker(lang, 1, { workerPath: base + 'worker.min.js', corePath: base, langPath: base + 'lang', gzip: true }); })(); return POOL[k]; }
  async function recogWith(cv, lang, i) { const w = await poolWorker(lang, i || 0); const { data } = await w.recognize(cv); return data; }
  async function recognizeCanvas(cv) { const w = await ensureWorker(); const { data } = await w.recognize(cv); return data.text.split('\n').map(x => x.trim()).filter(x => normT(x).length >= 2); }
  function prep(src, W, H) {   // 원본(비디오/이미지) → 인식용 캔버스 + 미리보기
    const r = OCR.region || { x: 0, y: 0, w: 1, h: 1 };
    const sx = r.x * W, sy = r.y * H, sw = Math.max(8, r.w * W), sh = Math.max(8, r.h * H);
    const sc = sw < 1000 ? 2 : (sw > 1920 ? 1920 / sw : 1);
    const cv = document.createElement('canvas'); cv.width = Math.round(sw * sc); cv.height = Math.round(sh * sc);
    const cx = cv.getContext('2d'); cx.filter = 'grayscale(1) contrast(1.4)'; cx.drawImage(src, sx, sy, sw, sh, 0, 0, cv.width, cv.height);
    const t = document.createElement('canvas'); t.width = 480; t.height = Math.round(480 * H / W); t.getContext('2d').drawImage(src, 0, 0, t.width, t.height);
    const full = document.createElement('canvas'); full.width = W; full.height = H; full.getContext('2d').drawImage(src, 0, 0);
    try { OCR.thumb = t.toDataURL('image/jpeg', 0.6); OCR.last = full; } catch (e) { /* 무시 */ }
    return cv;
  }
  async function ocrConnect() {
    try {
      const s = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 5 }, audio: false });
      const v = document.createElement('video'); v.muted = true; v.srcObject = s; await v.play();
      OCR.stream = s; OCR.video = v; OCR.status = '게임 화면 연결됨. 처음 인식할 때 글자 인식 데이터(약 5MB)를 내려받습니다.';
      s.getVideoTracks()[0].addEventListener('ended', () => { ocrStop(); dock(); });
      setTimeout(() => { if (OCR.video && OCR.video.videoWidth) { prep(OCR.video, OCR.video.videoWidth, OCR.video.videoHeight); dock(); } }, 500);
    } catch (e) { OCR.status = '화면 공유가 취소되었거나 이 브라우저에서 지원되지 않습니다.'; }
    dock();
  }
  function ocrStop() { if (OCR.stream) OCR.stream.getTracks().forEach(t => t.stop()); clearInterval(OCR.timer); OCR.stream = OCR.video = null; OCR.auto = false; OCR.status = '연결 해제됨'; }
  async function ocrRun(src, W, H, silent) {
    if (OCR.busy) return; OCR.busy = true;
    if (!silent) { OCR.status = '인식 중…'; if (parseHash().view !== 'hud') OCR.open = true; dock(); }
    try {
      const t0 = performance.now(); const cv0 = prep(src, W, H);
      if (parseHash().view === 'hud') { OCR.pick = null; HUD.force = null;
        HUD.info = { screen: null, pending: true, calls: [], top: '<p class="reading"><i></i>화면을 읽는 중…</p>', bottom: '', say: '어디 보자… 잠시만 기다리시지요, 주인님.' }; HUD.fresh = true; render(true);   // 그림부터 보여 준다
        await hudAnalyze(); HUD.fresh = false; HUD.popin = true; OCR.status = '오버레이 갱신됨'; render(true); }
      else { const lines = await recognizeCanvas(cv0); OCR.lines = lines.slice(0, 24); OCR.pick = null; OCR.result = classify(lines); applyResult(OCR.result, silent); }
      OCR.ms = Math.round(performance.now() - t0);
    } catch (e) { OCR.status = '인식 실패: ' + e.message + (location.protocol === 'file:' ? ' (파일로 직접 연 경우 동작하지 않습니다. 배포된 주소에서 사용하세요.)' : ''); }
    OCR.busy = false; dock();
  }
  function ocrScan(silent) {
    const v = OCR.video; if (!v || !v.videoWidth) { OCR.status = '먼저 게임 화면을 연결하세요. (또는 스크린샷을 Ctrl+V로 붙여 넣기)'; OCR.open = true; dock(); return; }
    return ocrRun(v, v.videoWidth, v.videoHeight, silent);
  }
  // 미디어 키(다음 곡 등)를 전역 단축키로 사용 — 설치 없이 쓰는 실험적 방법
  function mediaToggle() {
    if (OCR.media) { OCR.media = false; if (OCR.audio) { OCR.audio.pause(); OCR.audio = null; } return; }
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)(); const osc = ac.createOscillator(), g = ac.createGain(), dst = ac.createMediaStreamDestination();
      g.gain.value = 0.0001; osc.connect(g); g.connect(dst); osc.start();
      const a = new Audio(); a.srcObject = dst.stream; a.play(); OCR.audio = a; OCR.media = true;
      if (navigator.mediaSession) { navigator.mediaSession.metadata = new MediaMetadata({ title: '공략 수첩 화면 인식 대기 중' }); ['nexttrack', 'previoustrack', 'play', 'pause'].forEach(k => { try { navigator.mediaSession.setActionHandler(k, () => { if (OCR.audio) OCR.audio.play(); ocrScan(false); }); } catch (e) { /* 무시 */ } }); }
    } catch (e) { OCR.status = '미디어 키를 쓸 수 없는 브라우저입니다.'; }
  }
  function dock() {
    let el = $('#dock'); if (!el) { el = document.createElement('div'); el.id = 'dock'; document.body.appendChild(el); }
    const sup = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia; const on = !!OCR.stream; const r = OCR.region;
    if (!OCR.open) { el.className = 'dock closed'; el.innerHTML = '<button class="dockbtn" data-ocr="open">' + (on ? '● ' : '') + '화면 인식</button>'; return; }
    el.className = 'dock';
    let o = '<div class="row"><h3>화면 인식</h3><button class="xbtn" data-ocr="close" title="접기">▾</button></div>';
    o += '<div class="row" style="margin-top:6px">' + (on ? '<button class="chip sm on" data-ocr="scan">지금 인식 (F8)</button><button class="chip sm' + (OCR.auto ? ' on' : '') + '" data-ocr="auto">자동 ' + (OCR.auto ? '켜짐' : '꺼짐') + '</button><button class="chip sm" data-ocr="stop">연결 해제</button>' : (sup ? '<button class="chip sm on" data-ocr="connect">게임 화면 연결</button>' : '<span class="small dim">이 브라우저는 화면 연결을 지원하지 않습니다. 스크린샷 붙여 넣기는 가능합니다.</span>')) + '<button class="chip sm' + (OCR.media ? ' on' : '') + '" data-ocr="media" title="키보드의 미디어 키(다음 곡 등)를 누르면 인식합니다. 게임 중에도 동작할 수 있는 실험적 방법입니다.">미디어 키 ' + (OCR.media ? '켜짐' : '꺼짐') + '</button></div>';
    if (OCR.status) o += '<div class="dockstatus">' + esc(OCR.status) + (OCR.ms ? ' <span class="dim">(' + OCR.ms + 'ms)</span>' : '') + '</div>';
    if (OCR.ask) o += '<div class="chips" style="margin:4px 0">' + DUNGEONS.filter(d => !OCR.ask.dgs || !OCR.ask.dgs.length || OCR.ask.dgs.includes(d.id)).map(d => '<button class="chip sm" data-oask="' + d.id + '">' + esc(koOf(d.en, d.ko)) + '</button>').join('') + '</div>';
    if (OCR.thumb) o += '<div class="ocrprev" id="ocrprev"><img src="' + OCR.thumb + '" alt="" draggable="false">' + (r ? '<i style="left:' + r.x * 100 + '%;top:' + r.y * 100 + '%;width:' + r.w * 100 + '%;height:' + r.h * 100 + '%"></i>' : '') + '</div><div class="small dim">미리보기를 드래그하면 그 영역만 읽습니다. ' + (r ? '<a href="#" data-ocr="noregion">영역 해제</a> · ' : '') + '<a href="#" data-ocr="save">이 캡처 저장</a></div>';
    if (OCR.lines.length) {
      o += '<div class="small dim" style="margin-top:6px">읽은 글자 — 단서가 되는 글자를 누르면 뜻을 등록할 수 있습니다</div><div class="chips docklines">' + OCR.lines.map((l, i) => '<button class="chip sm' + (OCR.pick === i ? ' on' : '') + '" data-opick="' + i + '">' + esc(l.slice(0, 28)) + '</button>').join('') + '</div>';
      if (OCR.pick != null) { const seen = {};
        o += '<select class="field" id="oteach" style="width:100%"><option value="">"' + esc(OCR.lines[OCR.pick].slice(0, 20)) + '" 은(는) 무엇인가요?</option><optgroup label="화면 종류"><option value="screen:map">원정 선택 화면</option><option value="screen:provision">보급품 구매 화면</option></optgroup><optgroup label="던전">' + DUNGEONS.map(d => '<option value="dg:' + d.id + '">' + esc(d.ko + ' (' + d.en + ')') + '</option>').join('') + '</optgroup><optgroup label="원정 길이"><option value="len:0">짧은 원정</option><option value="len:1">중간 원정</option><option value="len:2">긴 원정</option></optgroup><optgroup label="기물">' + CURIOS.filter(c => !seen[c.en] && (seen[c.en] = 1)).map(c => '<option value="curio:' + esc(c.en) + '">' + esc(c.ko + ' (' + c.en + ')') + '</option>').join('') + '</optgroup><optgroup label="보스">' + BOSSES.map(b => '<option value="boss:' + b.id + '">' + esc(b.ko + ' (' + b.en + ')') + '</option>').join('') + '</optgroup></select>'; }
    }
    const na = Object.keys(aliases).length;
    o += '<details class="small dim" style="margin-top:6px"><summary>사용법 · 게임 중 단축키</summary><ul><li>게임 창을 연결한 뒤 인식하면, 화면에 따라 추천 파티 · 보급품 체크리스트 · 기물 안내로 이동합니다.</li><li><b>게임 중 단축키</b>: 저장소의 <code>extension</code> 폴더를 크롬 확장으로 설치하면 전역 단축키(기본 Ctrl+Shift+1)로 캡처해 <b>전체 화면 오버레이</b>를 띄웁니다. 오버레이는 이 단축키로만 열립니다. 설치 방법은 README 참고. 설치 없이 쓰려면 "미디어 키"를 켜고 키보드의 다음 곡 키를 눌러 보세요.</li><li>연결 없이도 스크린샷을 찍어 이 페이지에 <b>Ctrl+V</b>로 붙여 넣으면 인식합니다.</li><li>화면은 이 컴퓨터 안에서만 처리됩니다.</li></ul>' + (na ? '등록한 글자 ' + na + '개 · <a href="#" data-ocr="clearalias">모두 지우기</a>' : '') + '</details>';
    el.innerHTML = o;
  }
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-ocr],[data-opick],[data-oask]'); if (!t) return; e.preventDefault(); const a = t.dataset.ocr;
    if (t.dataset.opick != null) { const i = +t.dataset.opick; OCR.pick = OCR.pick === i ? null : i; }
    else if (t.dataset.oask != null) { const R = Object.assign({}, OCR.result || {}, { kind: OCR.ask.kind, dg: t.dataset.oask, len: OCR.ask.len }); applyResult(R, false); }
    else if (a === 'open' || a === 'close') { OCR.open = a === 'open'; store.set('dd.dockOpen', OCR.open); }
    else if (a === 'connect') { ocrConnect(); return; }
    else if (a === 'scan') { ocrScan(false); return; }
    else if (a === 'stop') ocrStop();
    else if (a === 'auto') { OCR.auto = !OCR.auto; clearInterval(OCR.timer); if (OCR.auto) { OCR.timer = setInterval(() => ocrScan(true), 2500); ocrScan(true); } }
    else if (a === 'media') mediaToggle();
    else if (a === 'noregion') { OCR.region = null; store.set('dd.ocrRegion', null); }
    else if (a === 'save') { if (OCR.last) OCR.last.toBlob(b => { const u = URL.createObjectURL(b); const l = document.createElement('a'); l.href = u; l.download = 'dd-capture-' + Date.now() + '.png'; l.click(); setTimeout(() => URL.revokeObjectURL(u), 2000); }); }
    else if (a === 'clearalias') { if (confirm('등록한 글자를 모두 지울까요?')) { aliases = {}; store.set('dd.ocrAlias', aliases); } }
    dock();
  });
  document.addEventListener('change', e => { const t = e.target; if (t.dataset && t.dataset.hfix != null && t.value && HUD.info) { HUD.info.hero = t.value; hudBuild(); render(true); } });
  document.addEventListener('change', e => { const t = e.target; if (t.dataset && t.dataset.qteach != null && t.value && HUD.info && HUD.info.quirks) { const q = HUD.info.quirks[+t.dataset.qteach]; if (q) { aliases[normT(q.t)] = t.value; store.set('dd.ocrAlias', aliases); hudBuild(); render(true); } } });
  document.addEventListener('change', e => { if (e.target.id !== 'oteach' || !e.target.value || OCR.pick == null) return; const k = normT(OCR.lines[OCR.pick]); if (k.length >= 2) { aliases[k] = e.target.value; store.set('dd.ocrAlias', aliases); } OCR.pick = null; OCR.result = classify(OCR.lines); applyResult(OCR.result, false); dock(); });
  document.addEventListener('keydown', e => { if (e.key === 'F8') { e.preventDefault(); ocrScan(false); } });
  // 크롬 확장(전역 단축키)이 보내는 신호
  window.addEventListener('message', e => { if (e.source !== window || !e.data || e.data.ddCapture !== 1) return; if (parseHash().view !== 'hud') { history.pushState(null, '', '#/hud'); render(false); } ocrScan(false); });
  // 스크린샷 붙여 넣기
  document.addEventListener('paste', e => { const it = Array.from((e.clipboardData || {}).items || []).find(i => i.type.startsWith('image/')); if (!it) return; e.preventDefault(); const img = new Image(); img.onload = () => ocrRun(img, img.naturalWidth, img.naturalHeight, false); img.src = URL.createObjectURL(it.getAsFile()); });
  let drag = null;
  document.addEventListener('pointerdown', e => { const p = e.target.closest('#ocrprev'); if (!p) return; e.preventDefault(); const b = p.getBoundingClientRect(); drag = { b, x0: (e.clientX - b.left) / b.width, y0: (e.clientY - b.top) / b.height, el: p }; });
  document.addEventListener('pointermove', e => { if (!drag) return; const cl = v => Math.min(1, Math.max(0, v)); const x = cl((e.clientX - drag.b.left) / drag.b.width), y = cl((e.clientY - drag.b.top) / drag.b.height);
    drag.r = { x: Math.min(x, drag.x0), y: Math.min(y, drag.y0), w: Math.abs(x - drag.x0), h: Math.abs(y - drag.y0) }; let box = drag.el.querySelector('i'); if (!box) { box = document.createElement('i'); drag.el.appendChild(box); }
    box.style.cssText = 'left:' + drag.r.x * 100 + '%;top:' + drag.r.y * 100 + '%;width:' + drag.r.w * 100 + '%;height:' + drag.r.h * 100 + '%'; });
  document.addEventListener('pointerup', () => { if (!drag) return; const r = drag.r; drag = null; if (r && r.w > 0.03 && r.h > 0.02) { OCR.region = r; store.set('dd.ocrRegion', r); dock(); } });
  window.ddOcr = { recognizeCanvas, classify, run: ocrRun };
  dock();

  // ================= 오버레이: 전체 화면 · 3D · 캡처 위아래 여백 활용 =================
  const HUD = { force: null, pin: null, cache: {}, heroCache: {}, edit: false, stage: null, layer: null, tr: null, sel: null, info: null, busy: false, typer: null, fresh: false };
  // 기본 영역: 영문 원본 UI(16:9) 기준 좌표. 모드나 해상도에 따라 다르면 영역 편집으로 고친다.
  const cell = (role, col) => ({ role, x: 0.359 + col * 0.03635, y: 0.135, w: 0.035, h: 0.086 });
  const DEFAULT_ZONES = {
    provision: [{ role: 'title', x: 0.14, y: 0.16, w: 0.11, h: 0.07 }, { role: 'dg', x: 0.535, y: 0.08, w: 0.26, h: 0.045 }, { role: 'len', x: 0.535, y: 0.08, w: 0.26, h: 0.045 },
      cell('item:Food', 0), cell('item:Shovel', 1), cell('item:Antivenom', 2), cell('item:Bandage', 3), cell('item:Medicinal Herbs', 4), cell('item:Skeleton Key', 5), cell('item:Holy Water', 6), cell('item:Laudanum', 7), cell('item:Torch', 8)],
    map: [{ role: 'title', x: 0.12, y: 0.15, w: 0.14, h: 0.08 }, { role: 'quest', x: 0.08, y: 0.24, w: 0.19, h: 0.35 }, { role: 'tag:darkest', x: 0.667, y: 0.088, w: 0.09, h: 0.035 }, { role: 'tag:ruins', x: 0.563, y: 0.198, w: 0.03, h: 0.035 }, { role: 'tag:warrens', x: 0.486, y: 0.365, w: 0.04, h: 0.035 }, { role: 'tag:cove', x: 0.715, y: 0.365, w: 0.045, h: 0.035 }, { role: 'tag:weald', x: 0.573, y: 0.48, w: 0.05, h: 0.035 }],
    dungeon: [], hero: [{ role: 'hero', x: 0.085, y: 0.185, w: 0.24, h: 0.05 }, { role: 'skills', x: 0.4835, y: 0.288, w: 0.2915, h: 0.068 }, { role: 'portrait', x: 0.118, y: 0.475, w: 0.055, h: 0.11 }],
  };
  let zones = store.get('dd.zones7', null) || JSON.parse(JSON.stringify(DEFAULT_ZONES));
  const saveZones = () => store.set('dd.zones7', zones);
  const SCREENS = [['auto', '자동'], ['map', '원정 선택'], ['provision', '보급품'], ['hero', '영웅 정보'], ['dungeon', '탐험 중']];
  const PROV9 = ['Food', 'Torch', 'Shovel', 'Skeleton Key', 'Holy Water', 'Medicinal Herbs', 'Bandage', 'Antivenom', 'Laudanum'];
  const DG_SHORT = { ruins: '중독 ○ · 출혈 ✕', weald: '출혈 ○ · 중독 ✕', warrens: '출혈 ○ · 중독 ✕', cove: '중독 ○ · 출혈 ✕', courtyard: '출혈 ○ · 중독 ✕', farmstead: '광역 · 지속력', darkest: '스트레스 · 이형' };
  // 안내 캐릭터의 던전별 한마디 (공손한 집사 말투로 직접 작성)
  const DG_BUTLER = { ruins: '해골들은 피가 없으니 출혈은 헛수고지요. 중독을 쓰시고 성수와 열쇠를 챙기십시오. 지난번처럼 빈손으로 가시진 않겠지요?', weald: '그곳 것들은 독을 밥처럼 먹으니 출혈로 다스리시지요. 삽과 붕대, 해독제… 잊으시면 영웅들이 대신 값을 치를 겁니다, 히히.', warrens: '돼지 놈들은 피를 잘 흘립니다. 병도 잘 옮기고요. 약초와 붕대를 챙기시지요. 요양원 주인이 주인님을 참 좋아합디다.', cove: '비늘 덮인 것들은 출혈이 잘 안 듣습니다. 중독을 쓰시고 삽과 약초를 넉넉히. 젖은 양말은 덤이옵니다.', courtyard: '흡혈귀들은 출혈에 약합니다만, 저쪽 칼날이 더 깊지요. 붕대를 한가득 챙기십시오. 물리시거든… 가까이 오지는 마시고요, 히히.', farmstead: '끝도 없이 몰려올 터이니 오래 버틸 채비나 하시지요. 횃불은 필요 없습니다. 어차피 볼 것도 없으니까요.', darkest: '그곳이라… 히히히. 마음 달랠 수단을 둘 이상 갖추시지요. 묘지기에게는 제가 미리 일러 두겠습니다.' };
  function rolesOf(screen) {
    if (screen === 'map') return [['party', '일행 4칸 (한 줄 전체)'], ['title', '화면 제목 읽는 곳'], ['quest', '원정 정보 읽는 곳'], ['len', '원정 길이 읽는 곳']].concat(DUNGEONS.map(d => ['tag:' + d.id, d.ko + ' 이름표 자리']));
    if (screen === 'provision') return PROV9.map(k => ['item:' + k, PROV[k].ko + ' 칸']).concat([['party', '일행 4칸 (한 줄 전체)'], ['title', '화면 제목 읽는 곳'], ['dg', '던전 이름 읽는 곳'], ['len', '원정 길이 읽는 곳']]);
    if (screen === 'hero') return [['party', '일행 4칸 (한 줄 전체)'], ['hero', '영웅 직업 읽는 곳'], ['skills', '전투 기술 7칸 (한 줄 전체)'], ['trinkets', '장신구 칸 (한 줄 전체)'], ['camp', '야영 기술 7칸 (한 줄 전체)'], ['quirks', '기벽 목록 (전체)'], ['portrait', '영웅 얼굴 (목록에 쓸 그림)']];
    return [['curio', '기물 이름 읽는 곳'], ['info', '정보를 띄울 곳']];
  }
  const roleLabel = (screen, role) => (rolesOf(screen).find(r => r[0] === role) || [0, role])[1];
  const READ_ROLES = ['dg', 'len', 'curio', 'hero', 'title', 'quest'];
  const TITLE_WORDS = { map: ['영지지도', 'estatemap'], provision: ['원정준비', 'provision', '보급품'], hero: ['전투기술', 'combatskills'] };
  const TITLE_FALLBACK = { hero: { x: 0.575, y: 0.165, w: 0.11, h: 0.05 } };   // 영웅 화면의 '전투 기술' 머리글 자리
  // 직접 그린 안내 캐릭터 "까마귀 서기" (이 사이트 고유 캐릭터)
  const MASCOT_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 130"><ellipse cx="60" cy="122" rx="34" ry="6" fill="#000" opacity=".45"/><path d="M28 112c-6-30 4-62 32-62s38 32 32 62z" fill="#1c1a22" stroke="#3a3542" stroke-width="2"/><path d="M40 112c-2-18 2-34 20-34s22 16 20 34z" fill="#2a2732"/><circle cx="60" cy="40" r="26" fill="#1c1a22" stroke="#3a3542" stroke-width="2"/><path d="M52 44l-30 10 30 6z" fill="#d6a64a" stroke="#8a6a26" stroke-width="1.5"/><circle cx="68" cy="34" r="9" fill="#f3ead6"/><circle cx="70" cy="35" r="4" fill="#111"/><circle cx="68" cy="34" r="11.5" fill="none" stroke="#d6a64a" stroke-width="2.5"/><path d="M78 43q6 14 2 30" fill="none" stroke="#d6a64a" stroke-width="1.5"/><path d="M44 16l8 8M60 10v10M76 16l-7 8" stroke="#1c1a22" stroke-width="5" stroke-linecap="round"/><rect x="66" y="84" width="34" height="24" rx="3" fill="#e9dfc6" stroke="#8a6a26" stroke-width="1.5" transform="rotate(-8 83 96)"/><path d="M72 92h20M72 98h20M72 104h12" stroke="#8a7a5a" stroke-width="1.5" transform="rotate(-8 83 96)"/><path d="M30 84q-14 8-10 26 10-4 16-14z" fill="#16141b" stroke="#3a3542" stroke-width="2"/></svg>';

  // 장식 글꼴은 한두 글자씩 틀리게 읽히므로, 긴 글자열 안에서 비슷한 조각을 찾는다
  function fuzzyIn(hay, w, maxD) { if (hay.includes(w)) return true; if (w.length < 4) return false; maxD = maxD == null ? (w.length >= 9 ? 2 : 1) : maxD;
    for (let L = w.length - 1; L <= w.length + 1; L++) for (let i = 0; i + L <= hay.length; i++) if (hay[i] === w[0] || hay[i + 1] === w[1]) { if (lev(hay.substr(i, L), w) <= maxD) return true; } return false; }
  function readDungeon(text) { const t = normT(text); let best = null; DUNGEONS.forEach(d => { [d.en, d.ko, overrides[d.en]].concat(d.alt || []).filter(Boolean).map(normT).forEach(w => { if (w.length >= 2 && (w.length >= 5 ? fuzzyIn(t, w) : t.includes(w)) && (!best || w.length > best.n)) best = { id: d.id, n: w.length }; }); }); return best && best.id; }
  function readLen(text) { const toks = String(text).split(/[\s|]+/).map(normT).filter(Boolean); let r = null; LEN_WORDS.forEach((ws, i) => { if (r == null && ws.some(w => toks.some(t => t === w || (t.length >= 3 && w.length >= 4 && w.startsWith(t))))) r = i; }); return r; }
  function readHero(text) { const t = normT(text); let best = null; Object.keys(HERO_GUIDE).forEach(h => { [h, HERO_GUIDE[h].ko, overrides[h]].concat(HERO_GUIDE[h].alt).filter(Boolean).map(normT).forEach(w => { if (w.length >= 2 && (w.length >= 5 ? fuzzyIn(t, w) : t.includes(w)) && (!best || w.length > best.n)) best = { h, n: w.length }; }); }); return best && best.h; }
  function detectScreen(lines) { const a = normT(lines.join(' ')); const has = (w, d) => fuzzyIn(a, w, d);
    if (has('estatemap') || (has('goals', 0) && has('rewards')) || a.includes('영지지도') || (a.includes('목표') && a.includes('보상') && a.includes('원정준비'))) return 'map';
    if (has('sellback', 1) || has('inventoryto') || has('되팔기', 0) || a.includes('소지품을')) return 'provision';
    if (['quirks', 'equipment', 'resistances', 'campingskills', 'combatskills', 'preferredposition', 'basestats'].filter(w => has(w)).length >= 2) return 'hero';
    if (['전투기술', '야영기술', '저항력', '기본능력치', '추천위치', '추천목표', '죽음의일격'].filter(w => a.includes(w)).length >= 2) return 'hero';
    return null; }

  async function recognizeDetailed(cv) {
    const w = await ensureWorker(); const { data } = await w.recognize(cv);
    const f = b => ({ x: b.x0 / cv.width, y: b.y0 / cv.height, w: (b.x1 - b.x0) / cv.width, h: (b.y1 - b.y0) / cv.height });
    return { lines: (data.lines || []).map(l => ({ t: l.text.trim(), n: normT(l.text), b: f(l.bbox) })).filter(l => l.n.length >= 2), words: (data.words || []).map(x => ({ t: x.text, n: normT(x.text), b: f(x.bbox) })).filter(x => x.n.length >= 1) };
  }
  function cropCanvas(src, z) {
    const sx = z.x * src.width, sy = z.y * src.height, sw = Math.max(4, z.w * src.width), sh = Math.max(4, z.h * src.height);
    const sc = Math.min(6, Math.max(Math.min(3, Math.max(1, 1650 / src.height)), 60 / sh)); const cv = document.createElement('canvas'); cv.width = Math.round(sw * sc); cv.height = Math.round(sh * sc);
    const cx = cv.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.filter = 'grayscale(1) contrast(1.5)'; cx.drawImage(src, sx, sy, sw, sh, 0, 0, cv.width, cv.height); return cv;
  }
  function findBox(det, keys) {
    const w = det.words.find(x => keys.some(k => x.n === k || (k.length >= 3 && x.n.includes(k)) || (k.length >= 5 && x.n.length >= 4 && Math.abs(x.n.length - k.length) <= 1 && lev(x.n, k) <= 1))); return w ? w.b : null;
  }
  // 영웅 화면의 전투 기술 7칸: 선택된 칸은 색이 있고 선택 안 된 칸은 회색이라, 칸마다 색의 진하기를 잰다
  function readSkillRow(src, z) {
    const out = []; const cv = document.createElement('canvas'); cv.width = 7 * 16; cv.height = 16; const cx = cv.getContext('2d');
    cx.drawImage(src, z.x * src.width, z.y * src.height, z.w * src.width, z.h * src.height, 0, 0, cv.width, cv.height); let d; try { d = cx.getImageData(0, 0, cv.width, cv.height).data; } catch (e) { return null; }
    for (let k = 0; k < 7; k++) { let sum = 0, n = 0; for (let y = 3; y < 13; y++) for (let x = k * 16 + 3; x < k * 16 + 13; x++) { const i = (y * cv.width + x) * 4; sum += Math.max(d[i], d[i + 1], d[i + 2]) - Math.min(d[i], d[i + 1], d[i + 2]); n++; } out.push(sum / n); }
    return out.map(v => v > 28);
  }
  // 지도에서 고른 원정 뒤에 깔리는 붉은 얼룩을 찾는다 (지도 영역 안에서 붉은 화소가 가장 몰린 곳)
  function findSplatter(src) {
    const w = 200, h = Math.round(200 * src.height / src.width); const cv = document.createElement('canvas'); cv.width = w; cv.height = h; const cx = cv.getContext('2d'); cx.drawImage(src, 0, 0, w, h);
    let d; try { d = cx.getImageData(0, 0, w, h).data; } catch (e) { return null; }
    const red = new Uint8Array(w * h); const x0 = Math.round(w * 0.27), x1 = Math.round(w * 0.8), y0 = Math.round(h * 0.1), y1 = Math.round(h * 0.86);
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const i = (y * w + x) * 4; const r = d[i], g = d[i + 1], b = d[i + 2]; if (r >= 45 && g < 30 && b < 30 && r > 2.5 * Math.max(g, b) + 15) red[y * w + x] = 1; }
    const R = 5; let best = null; for (let y = y0 + R; y < y1 - R; y++) for (let x = x0 + R; x < x1 - R; x++) { let n = 0; for (let yy = -R; yy <= R; yy++) for (let xx = -R; xx <= R; xx++) n += red[(y + yy) * w + x + xx]; if (!best || n > best.n) best = { n, x, y }; }
    return best && best.n >= 25 ? { x: best.x / w, y: best.y / h, n: best.n } : null;
  }
  async function hudAnalyze() {
    const src = OCR.last; if (!src) return;
    const zfind = (scr, role) => (zones[scr] || []).find(x => x.role === role);
    const parts = [['t:map', zfind('map', 'title') || TITLE_FALLBACK.map], ['t:provision', zfind('provision', 'title') || TITLE_FALLBACK.provision], ['t:hero', zfind('hero', 'title') || TITLE_FALLBACK.hero], ['hero', zfind('hero', 'hero')], ['prov', zfind('provision', 'dg') || zfind('provision', 'len')], ['quest', zfind('map', 'quest')]].filter(x => x[1]).map(([key, z]) => ({ key, cv: cropCanvas(src, z) }));
    const sheet = document.createElement('canvas'); sheet.width = Math.max.apply(null, parts.map(x => x.cv.width)) + 48; sheet.height = parts.reduce((n, x) => n + x.cv.height + 28, 28);
    { const cx = sheet.getContext('2d'); cx.fillStyle = '#000'; cx.fillRect(0, 0, sheet.width, sheet.height); let y = 28; parts.forEach(x => { cx.drawImage(x.cv, 24, y); x.y0 = y - 10; x.y1 = y + x.cv.height + 10; y += x.cv.height + 28; }); }
    const readSheet = async lang => { const data = await recogWith(sheet, lang, 0); const txt = {}; parts.forEach(x => { txt[x.key] = ''; }); (data.lines || []).forEach(l => { const cy = (l.bbox.y0 + l.bbox.y1) / 2; const x = parts.find(q => cy >= q.y0 && cy < q.y1); if (x) txt[x.key] += ' ' + l.text.trim(); }); return txt; };
    const titleOf = txt => { const zt = normT(txt['t:map'] + txt['t:provision'] + txt['t:hero']); return Object.keys(TITLE_WORDS).find(k => TITLE_WORDS[k].some(w => fuzzyIn(zt, w, 1))) || null; };
    const qzone = zfind('hero', 'quirks') || QUIRK_ZONE; let lang = store.get('dd.lang', 'kor');
    let quirkJob = (!HUD.force || HUD.force === 'hero') ? readQuirkLines(src, qzone, lang).catch(() => []) : null;   // 영웅 화면일 때를 대비해 기벽은 동시에 읽어 둔다
    let txt = await readSheet(lang); let byTitle = HUD.force ? null : titleOf(txt);
    if (!byTitle && !HUD.force) { const other = lang === 'kor' ? 'eng' : 'kor'; const t2 = await readSheet(other); const b2 = titleOf(t2); if (b2) { byTitle = b2; txt = t2; lang = other; store.set('dd.lang', lang); if (b2 === 'hero') quirkJob = readQuirkLines(src, qzone, lang).catch(() => []); } }
    const quick = byTitle || (['map', 'provision', 'hero'].includes(HUD.force) ? HUD.force : null);
    let det = { lines: [], words: [] }, lines = [], all = '', R = { kind: 'none', dg: null, len: null, dgs: [] };
    if (!quick) { const sc = src.width > 2000 ? 2000 / src.width : (src.width < 1300 ? Math.min(3, 2000 / src.width) : 1);
      const cv = document.createElement('canvas'); cv.width = Math.round(src.width * sc); cv.height = Math.round(src.height * sc);
      const cx = cv.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.filter = 'grayscale(1) contrast(1.4)'; cx.drawImage(src, 0, 0, cv.width, cv.height);
      det = await recognizeDetailed(cv); lines = det.lines.map(l => l.t); all = lines.join(' '); R = classify(lines); }
    OCR.lines = lines.filter(l => /[a-z가-힣]{3}/i.test(l)).slice(0, 24);
    const lvl = /견습|베테랑|숙련|챔피언|apprentice|veteran|champion/.test(normT(all));
    let screen = HUD.force || (byTitle || detectScreen(lines) || (lvl && /목표|goals/.test(normT(all)) ? 'map' : null) || ({ provision: 'provision', curio: 'dungeon', boss: 'dungeon' }[R.kind]) || null);
    if (!screen && HUD.pin) screen = HUD.pin;   // 자동 판단이 안 될 때만 마지막으로 직접 고른 화면을 쓴다
    const I = { screen, dg: null, len: readLen(all), curio: R.curio, hero: null, det };
    if (screen === 'hero') I.hero = readHero(txt.hero || '') || readHero(all);
    if (quick === 'provision') { I.dg = readDungeon(txt.prov || ''); const l = readLen(txt.prov || ''); if (l != null) I.len = l; }
    if (quick === 'map') { const l = readLen(txt.quest || ''); if (l != null) I.len = l; I.questText = normT(txt.quest || ''); }
    if (quick) OCR.lines = Object.keys(txt).map(k => txt[k].trim()).filter(t => normT(t).length >= 2).map(t => t.slice(0, 60));
    if (screen === 'hero') { const zr = (zones.hero || []).find(z => z.role === 'skills'); if (zr) I.picked = readSkillRow(src, zr); }
    if (screen === 'hero') { try { I.quirks = quirkJob ? await quirkJob : await readQuirkLines(src, qzone, lang); } catch (e) { I.quirks = []; } }
    if (screen === 'provision' || screen === 'dungeon') I.dg = I.dg || R.dg;
    for (const z of (screen && zones[screen]) || []) {   // 지정한 영역만 따로 읽기 (더 정확)
      if (!READ_ROLES.includes(z.role) || z.role === 'title' || (quick && z.role !== 'curio')) continue;   // 빠른 경로에서는 위에서 한 번에 읽었다
      const zt = (await recognizeCanvas(cropCanvas(src, z))).join(' '); z._read = zt;
      if (z.role === 'dg') I.dg = readDungeon(zt) || I.dg;
      if (z.role === 'len') { const l = readLen(zt); if (l != null) I.len = l; }
      if (z.role === 'quest') { const l = readLen(zt); if (l != null) I.len = l; I.questText = normT(zt); }
      if (z.role === 'hero') I.hero = readHero(zt) || I.hero;
      if (z.role === 'curio') { const m = matchCurio([zt]); if (m) I.curio = m.en; }
      if (zt && OCR.lines.length < 24) OCR.lines.push(zt.slice(0, 60));
    }
    if (screen === 'map' && fuzzyIn(normT(all), 'darkestlvl', 1)) I.dg = 'darkest';
    if (screen === 'map') {
      const na = normT(all); I.boxes = {}; DUNGEONS.forEach(d => { const b = findBox(det, wordsOf(d.en, d.ko, d.alt).concat(d.id === 'courtyard' ? ['courtyard'] : [])) || (zones.map || []).find(z => z.role === 'tag:' + d.id); if (b) I.boxes[d.id] = b; });
      const bm = BOSSES.find(b => DG[b.group] && wordsOf(b.en, b.ko, b.alt).some(w => w.length >= 3 && (na.includes(w) || (I.questText || '').includes(w)))); if (bm) { I.boss = bm.id; if (!I.dg) I.dg = bm.group; }
      if (!I.dg) { const sp = findSplatter(src); if (sp) { let best = null; Object.keys(I.boxes).forEach(id => { const b = I.boxes[id]; const dx = sp.x - (b.x + b.w / 2), dy = (sp.y - (b.y + b.h + 0.07)) * (src.height / src.width); const dist = Math.hypot(dx, dy); if (!best || dist < best.dist) best = { id, dist }; }); if (best && best.dist < 0.12) { I.dg = best.id; I.guess = true; } } }
    }
    I.src = src; HUD.info = I; HUD.fresh = true; hudBuild();
    if (I.screen) HUD.cache[I.screen] = { cv: src, info: I }; if (I.screen) persistCap('stage:' + I.screen, src, I);
  }
  function itemT2(id) { const en = ITEM_EN[id] || id; const p = PROV[en]; return id === 'hand' ? '맨손' : koOf(en, p ? p.ko : ITEM_KO[id]); }
  // ---- 캡처를 브라우저의 디스크 저장소(IndexedDB)에 보관: 새로고침해도 이번 원정의 캡처가 남는다 ----
  const DB = { p: null,
    open() { return this.p || (this.p = new Promise((ok, no) => { const r = indexedDB.open('dd-overlay', 1); r.onupgradeneeded = () => r.result.createObjectStore('caps', { keyPath: 'key' }); r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error); })); },
    async tx(mode, fn) { try { const db = await this.open(); return await new Promise((ok, no) => { const t = db.transaction('caps', mode); const rq = fn(t.objectStore('caps')); t.oncomplete = () => ok(rq && rq.result); t.onerror = () => no(t.error); }); } catch (e) { return null; } },
    put(v) { return this.tx('readwrite', st => st.put(v)); }, async clearCaps() { const rows = (await this.all()) || []; for (const r of rows) if (r.key !== 'placeholder') await this.del(r.key); }, del(k) { return this.tx('readwrite', st => st.delete(k)); }, clear() { return this.tx('readwrite', st => st.clear()); }, all() { return this.tx('readonly', st => st.getAll()); } };
  function persistCap(key, cv, info, thumb) { try { cv.toBlob(blob => { if (!blob) return; const rest = Object.assign({}, info); ['src', 'calls', 'top', 'bottom', 'say'].forEach(k => delete rest[k]); DB.put({ key, blob, info: rest, thumb: thumb || null, t: Date.now() }); }, 'image/jpeg', 0.9); } catch (e) { /* 저장 실패는 무시 (메모리에는 남아 있음) */ } }
  // 저장해 둔 캡처와 읽은 내용을 ZIP 한 개로 내려받는다 (압축 없이 묶기만 함)
  function zipStore(files) {
    const tbl = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; tbl[n] = c >>> 0; }
    const crc = u => { let c = 0xFFFFFFFF; for (let i = 0; i < u.length; i++) c = tbl[(c ^ u[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
    const enc = new TextEncoder(); const parts = [], cen = []; let off = 0;
    files.forEach(f => { const name = enc.encode(f.name), d = f.data, c = crc(d); const h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true); h.setUint32(14, c, true); h.setUint32(18, d.length, true); h.setUint32(22, d.length, true); h.setUint16(26, name.length, true);
      parts.push(new Uint8Array(h.buffer), name, d);
      const e = new DataView(new ArrayBuffer(46)); e.setUint32(0, 0x02014b50, true); e.setUint16(4, 20, true); e.setUint16(6, 20, true); e.setUint16(8, 0x0800, true); e.setUint32(16, c, true); e.setUint32(20, d.length, true); e.setUint32(24, d.length, true); e.setUint16(28, name.length, true); e.setUint32(42, off, true);
      cen.push(new Uint8Array(e.buffer), name); off += 30 + name.length + d.length; });
    const csize = cen.reduce((n, u) => n + u.length, 0); const end = new DataView(new ArrayBuffer(22)); end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true); end.setUint32(12, csize, true); end.setUint32(16, off, true);
    return new Blob(parts.concat(cen, [new Uint8Array(end.buffer)]), { type: 'application/zip' });
  }
  async function exportCaps() {
    const rows = ((await DB.all()) || []).filter(r => r.key !== 'placeholder'); if (!rows.length) { alert('저장된 캡처가 없습니다. 먼저 화면을 캡처하세요.'); return; }
    const files = []; const meta = { exported: new Date().toISOString(), page: location.href.split('#')[0], session, context: ctx, bag: run.inv, zones, learned: aliases, termOverrides: overrides, captures: [] };
    for (const r of rows) { const name = r.key.replace(':', '-').replace(/[^\w가-힣-]/g, '_') + '.jpg'; files.push({ name, data: new Uint8Array(await r.blob.arrayBuffer()) }); const i = r.info || {};
      meta.captures.push({ file: name, key: r.key, time: new Date(r.t).toISOString(), screen: i.screen, dungeon: i.dg, length: i.len, hero: i.hero, curio: i.curio, boss: i.boss, guessedDungeon: !!i.guess, pickedSkills: i.picked || null, quirks: (i.quirks || []).map(q => ({ text: q.t, box: q.b })), lines: ((i.det || {}).lines || []).map(l => l.t) }); }
    files.push({ name: 'session.json', data: new TextEncoder().encode(JSON.stringify(meta, (k, v) => k === '_read' ? undefined : v, 1)) });
    const blob = zipStore(files); const u = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = u; a.download = 'dd-captures-' + new Date().toISOString().slice(0, 16).replace(/[:T]/g, '') + '.zip'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000);
    OCR.status = '캡처 ' + rows.length + '장을 내보냈습니다.'; dock();
  }
  async function restoreCaps() {
    const rows = (await DB.all()) || []; if (!rows.length) return; rows.sort((a, b) => a.t - b.t); let last = null;
    for (const r of rows) { try { const bm = await createImageBitmap(r.blob); if (r.key === 'placeholder') { const pc = document.createElement('canvas'); pc.width = bm.width; pc.height = bm.height; pc.getContext('2d').drawImage(bm, 0, 0); HUD.placeholder = pc; continue; } const cv = document.createElement('canvas'); cv.width = bm.width; cv.height = bm.height; cv.getContext('2d').drawImage(bm, 0, 0); const info = r.info; info.src = cv;
      if (r.key.startsWith('stage:')) HUD.cache[r.key.slice(6)] = { cv, info }; else { const h = r.key.slice(5); info.cachedAs = h; HUD.heroCache[h] = { cv, info, thumb: r.thumb }; } last = { cv, info }; } catch (e) { /* 깨진 항목은 건너뜀 */ } }
    if (last && !OCR.last) { OCR.last = last.cv; HUD.info = last.info; hudBuild(); }
    if (parseHash().view === 'hud') render(true);
  }
  // ---- 원정 세션: 화면을 넘길 때마다 쌓이는 맥락 (던전·길이·확인한 영웅·만난 기물) ----
  const STAGES = [['map', '원정 선택'], ['hero', '영웅 확인'], ['provision', '보급'], ['dungeon', '탐험']];
  let session = store.get('dd.session', { heroes: [], curios: [], prov: false });
  const saveSession = () => store.set('dd.session', session);
  function stageDone(s) { return s === 'map' ? !!ctx.dg : s === 'hero' ? session.heroes.length > 0 : s === 'provision' ? session.prov : session.curios.length > 0; }
  function partyFromHeroes(hs) {   // 확인한 영웅을 권장 자리에 앉혀 본다 (앞자리부터 채움)
    const slots = [null, null, null, null]; const left = hs.slice(0, 4);
    [1, 2, 3, 4].forEach(pos => { let k = left.findIndex(h => HERO_GUIDE[h].pos[0] === pos); if (k < 0) k = left.findIndex(h => HERO_GUIDE[h].pos.includes(pos)); if (k >= 0) { slots[4 - pos] = left[k]; left.splice(k, 1); } });
    left.forEach(h => { const i = slots.indexOf(null); if (i >= 0) slots[i] = h; }); return slots;
  }
  function checkHeroes(hs, dg) {   // 편성기의 점검 규칙을 그대로 빌려 쓴다
    const keep = bld; bld = { slots: partyFromHeroes(hs).map((h, i) => h ? { hero: h, skills: defaultSkills(h, 4 - i) } : null), active: 0, dg: dg || '' };
    const A = analyze(); bld = keep; return { A, slots: partyFromHeroes(hs) };
  }
  function invBanner(c) {   // 가방 수량 기준 안내 (원정 진행 화면과 같은 규칙)
    const v = verdict(c); if (!v.item) return '';
    const opts = [v.item].concat(v.also || []).filter(i => PROV[ITEM_EN[i]]); const have = opts.find(i => (run.inv[ITEM_EN[i]] || 0) > 0);
    if (!opts.length) return ''; if (have) return '<div class="note good"><b>' + itemT(have) + '</b> 보유 ' + run.inv[ITEM_EN[have]] + '개 <button class="chip sm" data-ruse="' + esc(ITEM_EN[have]) + '">사용함 (−1)</button></div>';
    return '<div class="note warn"><b>' + itemT(v.item) + '</b>이(가) 가방에 없습니다.</div>';
  }
  // 분석 결과 → 캡처 위 표시(calls) + 위/아래 패널 + 캐릭터 대사
  function hudBuild() {
    const I = HUD.info; if (!I) return; I.calls = []; I.ask = false; I.top = ''; I.bottom = ''; const zs = zones[I.screen] || []; const zone = role => zs.find(z => z.role === role);
    const LEN = ['짧은', '중간', '긴'];
    if (!I.screen) { I.say = '어이쿠, 이 늙은이 눈이 침침해서 말입니다, 히히… 무슨 화면인지 통 모르겠습니다. 주인님께서 친히 위에서 골라 주시지요.'; return; }
    if (I.screen === 'hero') {
      const h = I.hero; if (!h) { I.ask = 'hero'; I.say = '흐음, 뉘신지 알아볼 수가 없군요. 어차피 오래 못 볼 얼굴들이라 그런가… 크흠, 누구인지 골라 주시지요.'; I.top = (I.src ? heroFix(I, true) : '<p class="dim">영웅 정보 화면을 찍으면 여기에 요약이 나옵니다.</p>'); I.bottom = heroRoster(); return; }
      if (I.src) {   // 이 캡처를 이 영웅의 것으로 기억한다. 영웅을 고쳐 고르면 앞서 잘못 기억한 것은 지운다
        if (I.cachedAs && I.cachedAs !== h) { DB.del('hero:' + I.cachedAs); delete HUD.heroCache[I.cachedAs]; session.heroes = session.heroes.filter(x => x !== I.cachedAs); }
        if (I.cachedAs !== h || !HUD.heroCache[h]) { let thumb = null; const zp = zone('portrait'); if (zp) { try { const tc = document.createElement('canvas'); tc.width = 88; tc.height = 100; tc.getContext('2d').drawImage(I.src, zp.x * I.src.width, zp.y * I.src.height, zp.w * I.src.width, zp.h * I.src.height, 0, 0, 88, 100); thumb = tc.toDataURL('image/jpeg', 0.85); } catch (e) { /* 무시 */ } }
          HUD.heroCache[h] = { cv: I.src, info: I, thumb }; I.cachedAs = h; persistCap('hero:' + h, I.src, I, thumb); } }
      if (!session.heroes.includes(h)) { session.heroes.push(h); saveSession(); }
      const g = HERO_GUIDE[h], b = g.builds[0];
      I.top = '<div class="row"><h2 class="hudh">' + heroT(h) + '</h2><span class="tag gold">' + esc(g.role) + '</span>' + g.pos.map(p => '<span class="tag">' + p + '열</span>').join('') + '</div><p>' + esc(g.summary) + '</p>' + (I.src ? heroFix(I, false) : '');
      I.bottom = heroRoster() + '<div class="two"><div class="card"><h3>' + esc(b.name) + '</h3><div class="two" style="margin-top:6px"><div>' + b.skills.map(k => skillLine(h, k)).join('') + '</div><div>' + b.trinkets.map(trinketLine).join('') + thirdLine(h, b.trinkets) + '</div></div><p class="small dim">' + esc(b.note) + '</p></div><div class="card"><h3>추천 야영 기술</h3>' + campHTML(h) + '</div></div>' + quirkCard(I) + '<div class="card"><h3>운용 팁</h3>' + ul(g.tips) + '<a href="#/hero/' + encodeURIComponent(h) + '">→ 전체 스킬 표</a></div>';
      const zr = zone('skills'); const all7 = HERO_DATA[h].skills; let advice = '';
      if (zr && h !== 'Abomination' && all7.length === 7) { const add = [], drop = [];
        all7.forEach((k, i) => { const rec = b.skills.includes(k.en), on = I.picked ? I.picked[i] : null; const cellz = { x: zr.x + zr.w * i / 7, y: zr.y, w: zr.w / 7, h: zr.h };
          if (rec) { I.calls.push({ x: cellz.x + cellz.w / 2, y: cellz.y, kind: 'badge', small: true, tone: on === false ? 'ok' : 'use', title: on === false ? '넣기' : '추천', cell: cellz }); if (on === false) add.push(koOf(k.en, k.ko)); }
          else if (on) { I.calls.push({ x: cellz.x + cellz.w / 2, y: cellz.y, kind: 'badge', small: true, tone: 'off', title: '빼기' }); drop.push(koOf(k.en, k.ko)); } });
        if (I.picked) advice = add.length || drop.length ? ' 지금 고르신 기술 중 ' + (drop.length ? drop.join(', ') + '은(는) 빼고 ' : '') + (add.length ? add.join(', ') + '을(를) 넣으시지요.' : '다른 걸 넣으시지요.') : ' 기술은 제가 권해 드릴 것과 똑같이 고르셨군요. 이럴 때도 있어야지요, 히히.'; }
      else I.calls.push({ x: 0.5, y: 0.3, kind: 'card', tone: 'ok', title: '권장 기술', lines: [b.skills.map(k => koOf(k, (SKILL[h + '|' + k] || {}).ko)).join(' · ')] });
      I.advice = advice;
      { const tz = zone('trinkets') || TRINKET_ZONE; const tri = b.trinkets.concat(thirdTrinket(h, b.trinkets) || []).filter(n => TRK[n]).slice(0, 3);   // 장신구 칸마다 상자 + 그림 + 이름 (설명은 마우스를 올리면)
        tri.forEach((n, k) => I.calls.push({ kind: 'tslot', k, name: n, cell: { x: tz.x + tz.w * k / 3, y: tz.y, w: tz.w / 3, h: tz.h } })); }
      (I.quirks || []).forEach((q, k) => { const m = matchQuirk(q.t); if (m && !m.none) I.calls.push({ kind: 'qbox', q: m, cell: q.b }); });
      { const cz = zone('camp') || CAMP_ZONE; const cp = typeof CAMP !== 'undefined' && CAMP[h];   // 추천 야영 기술 칸에 상자 + 이름 (칸 순서는 공용 3개 다음 전용 4개로 가정)
        if (cp && cp.skills.length === 7) cp.rec.forEach((n, k) => { const idx = cp.skills.findIndex(x => x.en === n); if (idx >= 0) I.calls.push({ kind: 'cslot', k, camp: cp.skills[idx], cell: { x: cz.x + cz.w * idx / 7, y: cz.y, w: cz.w / 7, h: cz.h } }); }); }
      I.say = heroKo(h) + '이옵니다, 주인님. ' + g.pos.join('·') + '열에 세워 두시지요. 이번에는 좀 오래 버텨 주면 좋으련만… 히히.' + (I.advice || '') + (session.heroes.length >= 4 ? ' 넷을 다 보셨으니 일행 점검을 아래에 적어 두었습니다.' : ' 일행을 한 명씩 보여 주시면 제가 짝을 맞춰 보지요.'); return;
    }
    if (I.screen === 'dungeon') {
      const c = I.curio && CURIOS.find(x => x.en === I.curio);
      const inv = '<div class="invline">' + RUN_ITEMS.map(k => { const p = PROV[k], n = run.inv[k] || 0; return '<span class="iv' + (n ? '' : ' zero') + '">' + pic(p.img, 0, 'ico sm') + '<button data-rinv="' + esc(k) + '" data-d="-1" aria-label="' + esc(p.ko) + ' 줄이기">−</button><b>' + n + '</b><button data-rinv="' + esc(k) + '" data-d="1" aria-label="' + esc(p.ko) + ' 늘리기">+</button></span>'; }).join('') + '</div>';
      if (!c) { I.say = '이름이 보이질 않는군요, 주인님. 마우스를 올려 이름을 띄우신 뒤 다시 부르시든가… 귀찮으시면 아래에서 직접 고르시지요, 히히.'; I.bottom = inv + '<div class="cgrid">' + CURIOS.filter(x => x.dg === (ctx.dg || run.dg) || x.dg === 'all').map(x => '<button class="ctile" data-hcurio="' + esc(x.en) + '"><span class="cimg">' + pic(x.img, 160, '') + '</span><span class="cname">' + esc(koOf(x.en, x.ko)) + '</span></button>').join('') + '</div>'; return; }
      if (I.logged !== c.en) { I.logged = c.en; session.curios.push(c.en); if (session.curios.length > 30) session.curios.shift(); saveSession(); }
      const v = verdict(c); const act = v.item ? itemT2(v.item) + ' 사용' : v.text; const b = zone('info') || zone('curio') || findBox(I.det, wordsOf(c.en.replace(/\s*\(.*\)/, ''), c.ko));
      I.calls.push({ x: b ? b.x : 0.4, y: b ? b.y + (b.h || 0) + 0.02 : 0.3, kind: 'card', tone: v.cls, title: koOf(c.en, c.ko), lines: [act], ax: b ? b.x + (b.w || 0) / 2 : null, ay: b ? b.y + (b.h || 0) / 2 : null });
      I.top = '<div class="row"><h2 class="hudh">' + T(c.en, c.ko) + '</h2><span class="verdict ' + v.cls + '">' + esc(act) + '</span></div>'; I.bottom = invBanner(c) + inv + curioCard(c) + (session.curios.length > 1 ? '<p class="small dim">이번 원정에서 만난 기물 ' + session.curios.length + '개</p>' : '');
      I.say = koOf(c.en, c.ko) + '이옵니다, 주인님. ' + (v.item ? itemT2(v.item) + '을(를) 쓰시지요.' + (v.handBad ? ' 맨손으로 덥석 만지셨다간… 뭐, 저야 구경거리가 생겨 좋습니다만. 히히.' : ' 설마 그걸 안 챙겨 오신 건 아니겠지요?') : v.cls === 'no' ? '손대지 마시지요. 물론 주인님께서 제 말을 들으실 분은 아니지만… 히히히.' : v.cls === 'gamble' ? '운에 맡기는 물건이옵니다. 주인님의 운이야 제가 익히 알지요… 크흠, 알아서 하십시오.' : '맨손으로 뒤지셔도 됩니다. 이번만큼은 손가락이 무사할 겁니다, 아마도요.');
      if (c.dg !== 'all') { ctx.dg = c.dg; store.set('dd.ctx', ctx); } return;
    }
    if (I.screen === 'map') DUNGEONS.forEach(d => { const b = findBox(I.det, wordsOf(d.en, d.ko, d.alt).concat(d.id === 'courtyard' ? ['courtyard'] : [])) || zone('tag:' + d.id); if (!b) return;
      I.calls.push({ x: Math.max(0.28, b.x + b.w - 0.13), y: b.y - 0.04, kind: 'tag', dg: d.id, on: I.dg === d.id, title: koOf(d.en, d.ko), sub: DG_SHORT[d.id] }); });
    const dg = I.dg || (I.screen === 'provision' ? ctx.dg : null); const len = I.len != null ? I.len : (ctx.len != null ? ctx.len : 0);
    if (!dg || !DG[dg]) { I.ask = 'dg'; I.say = I.screen === 'map' ? '지도에서 어디를 찍으셨는지 이 늙은이가 무슨 수로 압니까, 히히. 이름표나 위의 단추를 눌러 일러 주시지요.' : '그래서 이번엔 어디로 영웅들을 보내… 아니, 떠나시렵니까, 주인님?'; I.top = '<p class="dim">던전을 고르면 여기에 요약이 나옵니다.</p>'; return; }
    const d = DG[dg]; ctx = { dg, len }; store.set('dd.ctx', ctx); I.dg = dg; I.len = len; bld.dg = dg;
    const tags = '<div class="chips">' + d.dmg.good.map(x => '<span class="tag good">' + esc(x) + '</span>').join('') + d.dmg.bad.map(x => '<span class="tag bad">✕ ' + esc(x) + '</span>').join('') + '</div>';
    const qty = k => (d.provisions[k] || [0, 0, 0])[len] || (k === 'Laudanum' ? [0, 1, 2][len] : 0);
    if (I.screen === 'provision') {
      PROV9.forEach(k => { const n = qty(k); const z = zone('item:' + k); if (z) I.calls.push({ x: z.x + z.w / 2, y: z.y + z.h + 0.038, below: true, kind: 'badge', tone: n ? 'use' : 'off', title: n ? '×' + n : '–', cell: z }); });
      I.top = '<div class="row"><h2 class="hudh">' + T(d.en, d.ko) + ' · ' + LEN[len] + ' 원정 보급품</h2></div><div class="provrow">' + PROV9.map(k => { const n = qty(k); const p = PROV[k]; return '<span class="pv' + (n ? '' : ' zero') + '">' + pic(p.img, 0, 'ico') + '<b>' + (n ? '×' + n : '–') + '</b><small>' + esc(koOf(p.en, p.ko)) + '</small></span>'; }).join('') + '</div>';
      I.bottom = '<div class="row" style="margin-bottom:10px"><button class="chip' + (session.prov ? '' : ' on') + '" data-hud="fillbag">' + (session.prov ? '가방 수량 다시 맞추기' : '이 수량으로 가방 기록하기') + '</button><span class="small dim">기록해 두면 탐험 중 기물 안내가 "지금 가진 것" 기준으로 바뀝니다.</span></div><div class="two"><div class="card"><h3>챙길 이유</h3>' + ul(d.tips) + '</div><div class="card"><h3>먼저 잡을 적</h3>' + ul(d.threats) + '</div></div>';
      I.say = koOf(d.en, d.ko) + ', ' + LEN[len] + ' 원정이시라… 용감도 하셔라, 히히. 칸마다 수량을 적어 두었으니 금화 아끼지 마시지요. ' + (DG_BUTLER[dg] || ''); return;
    }
    const party = PARTIES.find(p => p.id === d.parties[0]);
    I.top = '<div class="row"><h2 class="hudh">' + T(d.en, d.ko) + (I.len != null ? ' · ' + LEN[len] + ' 원정' : '') + '</h2></div>' + tags + '<div class="small dim">추천 영웅</div><div class="chips">' + heroChips(d.heroes.good, 'good') + '</div>';
    const boss = I.boss && BOSSES.find(x => x.id === I.boss && x.group === dg);
    if (boss) I.top += '<div class="row"><a class="tag red" href="#/boss/' + boss.id + '">보스 원정: ' + esc(koOf(boss.en, boss.ko)) + ' — 공략 보기</a></div>';
    if (I.guess) I.top += '<div class="small dim">지도의 붉은 표식 위치로 짐작했습니다. 틀리면 위에서 고쳐 주세요.</div>';
    I.bottom = (boss ? '<div class="card"><h3>' + esc(koOf(boss.en, boss.ko)) + ' 공략 요점</h3><p>' + esc(boss.summary || '') + '</p>' + ul((boss.strat || []).slice(0, 4)) + (boss.party && boss.party.slots ? lineupHTML(boss.party.slots) : '') + '</div>' : '') + (party && !boss ? partyCard(party, false) : '') + '<p class="small"><a href="#/parties?tag=' + dg + '">→ 다른 추천 파티</a> · <a href="#/plan/' + dg + '/' + len + '">→ 원정 준비</a></p>';
    I.say = koOf(d.en, d.ko) + '(으)로 가시겠다고요? 히히… 훌륭한 선택이십니다, 주인님. ' + (DG_BUTLER[dg] || '') + ' 데려갈 일행은 아래에 펼쳐 두었습니다. 몇이나 돌아올지 내기라도 하시렵니까?';
    if (boss) I.say = koOf(boss.en, boss.ko) + '을(를) 잡으러 가신다고요? 히히히… 장한 결심이십니다, 주인님. ' + (DG_BUTLER[dg] || '') + ' 그놈 상대하는 요령은 아래에 적어 두었으니, 읽고나 가시지요.';
  }
  // 찍어 둔 영웅의 캡처를 불러온다 (없으면 추천 정보만)
  function showHero(h) { const c = HUD.heroCache[h];
    if (c) { OCR.last = c.cv; HUD.info = c.info; HUD.info.hero = h; } else HUD.info = { screen: 'hero', hero: h, dg: null, len: null, det: { lines: [], words: [] } };
    hudBuild(); render(true); }
  // 게임 화면 아래 가운데의 일행 4칸 (영문·한글 UI 공통 위치). 화면별 영역에 'party' 가 있으면 그것을 쓴다
  const PARTY_ZONE = { x: 0.404, y: 0.823, w: 0.19, h: 0.074 };
  // 영웅 정보 화면의 장신구 칸 (영역 편집에 '장신구 칸'을 따로 두면 그것을 쓴다)
  const TRINKET_ZONE = { x: 0.31, y: 0.675, w: 0.14, h: 0.1 };
  // 영웅 정보 화면의 야영 기술 7칸 (영역 편집에 '야영 기술 7칸'을 따로 두면 그것을 쓴다)
  // 영웅 정보 화면의 기벽 목록 (긍정·부정 두 단 전체). 영역 편집에 '기벽 목록'을 따로 두면 그것을 쓴다
  const QUIRK_ZONE = { x: 0.185, y: 0.275, w: 0.275, h: 0.165 };
  // 꼭 고정할 기벽 / 꼭 지울 기벽: 마을 탭의 목록에 다른 한글 번역 후보를 붙여 찾는다
  const QUIRK_ALT = { 'Quick Reflexes': ['날쌘 반사신경', '빠른 반응'], 'On Guard': ['경계', '방심하지 않음', '경계 중'], 'Quickdraw': ['빠른 발도', '빨리 뽑기', '속사수'], 'Natural Swing': ['타고난 휘두르기', '천부적 스윙', '자연스러운 스윙'], 'Precise Striker': ['정밀한 타격가', '정확한 타격', '정밀 타격가'], 'Eagle Eye': ['독수리 눈', '독수리의 눈'], 'Slugger': ['거포', '강타'], 'Unerring': ['틀림없음', '빈틈없음', '정확무오'], 'Tough': ['강인함', '터프함', '억셈'], 'Hard Skinned': ['질긴 피부', '두꺼운 피부', '강한 피부'], 'Steady': ['흔들림 없음', '안정됨', '꾸준함'], 'Unyielding': ['굴하지 않음', '불굴의 의지'],
    'Kleptomaniac': ['도벽광', '절도광', '도벽증'], 'Curious': ['호기심 많음', '호기심쟁이'], 'Compulsive': ['강박증', '충동적', '강박적'], 'Hylomania': ['물질 집착', '물건 집착', '물질광'], 'Dark Temptation': ['어두운 유혹', '암흑의 유혹'], 'Necromania': ['시체 집착', '사체 애호', '시체광'], 'The Yips': ['손 떨림', '입스 증후군'], 'Off Guard': ['무방비', '허를 찔림'], 'Nervous': ['긴장', '불안', '초조함'], 'Fragile': ['연약함', '깨지기 쉬움', '약골'], 'Weak Grip on Life': ['삶에 대한 약한 집착', '약한 삶의 의지', '희미한 생명줄'], 'Claustrophobia': ['폐쇄공포증'] };
  const QUIRKS = typeof TOWN !== 'undefined' && TOWN.quirks ? TOWN.quirks.lock.map(q => Object.assign({ kind: 'lock' }, q)).concat(TOWN.quirks.remove.map(q => Object.assign({ kind: 'remove' }, q))) : [];
  function matchQuirk(text) { const n = normT(text); if (n.length < 2) return null; const al = aliases[n]; if (al && al.startsWith('quirk:')) return al === 'quirk:-' ? { none: true } : (QUIRKS.find(q => q.en === al.slice(6)) || null);
    return QUIRKS.find(q => [q.en, q.ko, overrides[q.en]].concat(q.alt || [], QUIRK_ALT[q.en] || []).filter(Boolean).map(normT).some(w => n === w || (w.length >= 3 && n.includes(w)) || (w.length >= 4 && Math.abs(n.length - w.length) <= 1 && lev(n, w) <= 1))) || null; }
  // 기벽 목록을 줄 단위로 읽는다. 한 줄에 긍정·부정 기벽이 나란히 있으면 낱말 사이가 넓은 곳에서 나눈다
  async function readQuirkLines(src, z, lang) {
    const cv = cropCanvas(src, z); const data = lang ? await recogWith(cv, lang, 1) : (await (await ensureWorker()).recognize(cv)).data; const out = [];
    (data.lines || []).forEach(l => { const ws = (l.words || []).filter(x => normT(x.text).length); if (!ws.length) return; const lh = l.bbox.y1 - l.bbox.y0; let seg = [ws[0]];
      const flush = () => { let t = seg.map(x => x.text).join(' ').replace(/(\s+[A-Za-z0-9*×xX>\]\[|\\/~.,'"-]{1,2})+\s*$/, '').trim(); if (!/[가-힣]{2}/.test(t) && !/[A-Za-z]{4}/.test(t)) return; if (normT(t).length >= 2 && /[가-힣a-z]{2}/i.test(t)) { const x0 = seg[0].bbox.x0, x1 = seg[seg.length - 1].bbox.x1, y0 = Math.min.apply(null, seg.map(x => x.bbox.y0)), y1 = Math.max.apply(null, seg.map(x => x.bbox.y1)); out.push({ t, b: { x: z.x + z.w * x0 / cv.width, y: z.y + z.h * y0 / cv.height, w: z.w * (x1 - x0) / cv.width, h: z.h * (y1 - y0) / cv.height } }); } };
      for (let i = 1; i < ws.length; i++) { if (ws[i].bbox.x0 - ws[i - 1].bbox.x1 > lh * 1.6) { flush(); seg = []; } seg.push(ws[i]); } flush(); });
    return out.slice(0, 14);
  }
  const CAMP_ZONE = { x: 0.4835, y: 0.441, w: 0.2915, h: 0.069 };
  function quirkCard(I) { const qs = I.quirks || []; if (!qs.length) return '';
    const opts = '<option value="">무슨 기벽인지 지정…</option><option value="quirk:-">고정·제거 대상 아님</option><optgroup label="꼭 고정할 기벽">' + QUIRKS.filter(q => q.kind === 'lock').map(q => '<option value="quirk:' + esc(q.en) + '">' + esc(q.ko + ' (' + q.en + ')') + '</option>').join('') + '</optgroup><optgroup label="꼭 지울 기벽">' + QUIRKS.filter(q => q.kind === 'remove').map(q => '<option value="quirk:' + esc(q.en) + '">' + esc(q.ko + ' (' + q.en + ')') + '</option>').join('') + '</optgroup>';
    return '<div class="card"><h3>기벽</h3>' + qs.map((q, i) => { const m = matchQuirk(q.t); return '<div class="qrow"><span>' + esc(q.t) + '</span>' + (m && !m.none ? '<span class="tag ' + (m.kind === 'lock' ? 'good' : 'bad') + '">' + (m.kind === 'lock' ? '고정 추천' : '제거 추천') + ' · ' + esc(m.en) + '</span><span class="small dim">' + esc(m.why) + '</span>' : m && m.none ? '<span class="small dim">대상 아님</span>' : '<select class="field" data-qteach="' + i + '">' + opts + '</select>') + '</div>'; }).join('') + '<p class="small dim">게임의 한글 이름이 이 가이드와 다르면 자동으로 못 찾습니다. 한 번 지정해 두면 다음부터는 그 이름으로 찾습니다.</p></div>'; }
  function heroFix(I, ask) { return '<label class="fixhero' + (ask ? ' ask' : '') + '"><span>' + (ask ? '이 캡처의 영웅을 골라 주세요' : '영웅이 다르게 읽혔으면 고치기') + '</span><select class="field" data-hfix="1"><option value="">' + (ask ? '영웅 선택…' : '이 캡처의 영웅 바꾸기…') + '</option>' + Object.keys(HERO_GUIDE).map(h => '<option value="' + esc(h) + '"' + (I.hero === h ? ' disabled' : '') + '>' + esc(heroKo(h)) + '</option>').join('') + '</select></label>'; }
  function heroRoster() {   // 이번 원정에서 확인한 영웅: 앞의 4명은 일행으로 점검, 나머지는 옆에 후보로 둔다. 누르면 그 영웅을 찍어 둔 캡처가 나온다
    const hs = session.heroes; if (!hs.length) return '<p class="small dim">영웅 정보 화면을 한 명씩 캡처하면 이번 원정의 일행으로 모아 점검합니다.</p>';
    const party = hs.slice(0, 4), extra = hs.slice(4); const { A, slots } = checkHeroes(party, ctx.dg); const cur = HUD.info && HUD.info.hero;
    const tile = (h, label) => { const c = HUD.heroCache[h]; return '<div class="rs' + (h === cur ? ' on' : '') + (c ? ' has' : '') + '" data-hroster="' + esc(h) + '" title="' + (c ? '찍어 둔 캡처 보기' : '캡처 없음 — 추천 정보만 보기') + '"><button class="rx" data-hrm="' + esc(h) + '" title="목록에서 빼기">✕</button><span class="port">' + (c && c.thumb ? '<img src="' + c.thumb + '" alt="">' : pic(HERO_DATA[h].img, 120, '')) + '</span><b>' + esc(heroKo(h)) + '</b><small>' + label + '</small></div>'; };
    let o = '<div class="card roster"><div class="row"><h3>이번 원정 영웅 (' + hs.length + '명)</h3><button class="chip sm" data-hud="tobuilder">편성기에서 다듬기</button><button class="chip sm" data-hud="clearheroes">비우기</button></div><div class="rline">' + slots.map((h, i) => h ? tile(h, (4 - i) + '열') : '<div class="rs empty"><span class="port"></span><b class="dim">?</b><small>' + (4 - i) + '열</small></div>').join('') + (extra.length ? '<span class="rsep"></span>' + extra.map(h => tile(h, '후보')).join('') : '') + '</div>';
    if (party.length >= 2) o += A.warn.concat(party.length >= 4 ? A.notes : []).slice(0, 4).map(x => '<div class="chk ' + (A.warn.includes(x) ? 'bad' : 'mid') + '">' + (A.warn.includes(x) ? '✕ ' : '△ ') + esc(x) + '</div>').join('') + (party.length >= 4 && !A.warn.length ? '<div class="chk ok">✓ 큰 문제는 보이지 않습니다.</div>' : '');
    return o + '</div>';
  }

  V.hud = function () {
    const I = HUD.info; if (I && I.screen) hudBuild();
    const scr = (I && I.screen) || (HUD.force || null); const es = scr || 'provision';
    let o = '<div class="hudfull' + (HUD.edit ? ' editing' : '') + '"><div class="hudbar"><a class="chip sm" href="#/">← 닫기</a><span class="sep"></span><div class="steps">' + STAGES.map(([v, l], i) => '<button class="step' + (scr === v ? ' cur' : '') + (stageDone(v) ? ' done' : '') + (HUD.cache[v] ? ' has' : '') + (HUD.force === v ? ' pin' : '') + '" data-hscreen="' + v + '" title="' + (HUD.cache[v] ? '이 단계에서 찍어 둔 캡처 보기' : '지금 캡처를 이 화면으로 분석') + '"><i>' + (stageDone(v) ? '✓' : i + 1) + '</i>' + l + '</button>').join('<span class="stepline"></span>') + '</div><span class="sep"></span><button class="chip sm" data-hud="rescan">다시 분석</button><button class="chip sm' + (HUD.edit ? ' on' : '') + '" data-hud="edit">영역 편집</button><button class="chip sm" data-hud="newrun" title="이번 원정의 캡처와 기록을 모두 지우고 다음 원정을 시작합니다">탐험 완료</button>' + (OCR.last ? '<button class="chip sm" data-hud="setph" title="지금 보이는 그림을 캡처가 없을 때의 대기 화면으로 씁니다 (이 브라우저에만 저장)">대기 화면으로 지정</button>' : '') + '<button class="chip sm" data-hud="exportcaps" title="저장해 둔 캡처와 읽은 내용을 ZIP 파일로 내려받습니다">캡처 내보내기</button><button class="chip sm" data-hud="fs">전체 화면</button></div>';
    if (I && (scr === 'map' || scr === 'provision')) o += '<div class="hudbar">' + (I.ask === 'dg' ? '<b class="askb">던전 선택 ▸</b>' : '') + DUNGEONS.map(d => '<button class="chip sm' + (I.dg === d.id ? ' on' : '') + '" data-hdg="' + d.id + '">' + esc(koOf(d.en, d.ko)) + '</button>').join('') + '<span class="sep"></span>' + ['짧은', '중간', '긴'].map((l, i) => '<button class="chip sm' + (I.len === i ? ' on' : '') + '" data-hlen="' + i + '">' + l + '</button>').join('') + '</div>';
    if (scr === 'hero') o += '<div class="hudbar"><span class="small dim">이번 원정 영웅</span>' + (session.heroes.length ? session.heroes.map((h, k) => '<button class="chip sm' + (I && I.hero === h ? ' on' : '') + '" data-hroster="' + esc(h) + '" title="' + (HUD.heroCache[h] ? '찍어 둔 캡처 보기' : '캡처 없음') + '">' + (k < 4 ? '' : '<span class="dim">후보 </span>') + esc(heroKo(h)) + '</button>').join('') : '<span class="small dim">아직 없습니다. 영웅 정보 화면을 찍으면 여기에 쌓입니다.</span>') + '</div>';
    if (HUD.edit) o += '<div class="hudbar"><b>' + (STAGES.find(x => x[0] === es) || [0, ''])[1] + ' 화면 영역</b><select class="field" id="hrole">' + rolesOf(es).map(([v, l]) => '<option value="' + v + '">' + esc(l) + '</option>').join('') + '</select><button class="chip sm on" data-hud="addzone">추가</button><button class="chip sm" data-hud="delzone">선택 삭제</button><button class="chip sm" data-hud="reset">기본값</button><button class="chip sm" data-hud="export">내보내기</button><button class="chip sm" data-hud="import">가져오기</button><span class="small dim">끌어서 옮기고 모서리로 크기 조절 · 점선 = 글자 읽는 곳</span></div>';
    o += '<div class="hudpanel top">' + (I && I.top && scr ? '<div class="eyebrow">' + ({ map: '원정 선택 화면', provision: '보급품 구매 화면', hero: '영웅 정보 화면', dungeon: '탐험 중' }[scr] || '') + (ctx.dg && scr !== 'map' && DG[ctx.dg] ? ' · ' + esc(koOf(DG[ctx.dg].en, DG[ctx.dg].ko)) : '') + '</div>' : '') + ((I && I.top) || (OCR.last ? '' : '<p class="dim">캡처를 기다리는 중입니다. 오른쪽 아래 <b>화면 인식</b>에서 게임 창을 연결한 뒤 단축키를 누르거나, 스크린샷을 <b>Ctrl+V</b>로 붙여 넣으세요.' + (HUD.placeholder ? '' : ' 원하는 그림을 붙여 넣고 <b>대기 화면으로 지정</b>을 누르면 그 그림이 여기에 걸립니다.') + '</p>')) + '</div>';
    o += '<div class="hudscene" id="hudscene"><div class="hud3d' + (HUD.slide ? (HUD.slide > 0 ? ' slideL' : ' slideR') : HUD.fresh ? ' enter' : '') + '" id="hud3d"><div id="hudstage"></div><div id="hudcalls"></div><div id="hudzoom" hidden></div></div><div class="mwrap"><span class="mshadow"></span><div class="mimg" tabindex="0" data-hud="mascot" title="눌러서 내 그림으로 바꾸기 (이 브라우저에만 저장)">' + (store.get('dd.mascot', null) ? '<img src="' + store.get('dd.mascot', '') + '" alt="">' : MASCOT_SVG) + '</div></div></div>';
    o += '<div class="hudpanel bottom"><div class="mascot"><div class="mtools"><button class="chip sm' + (HUD.pickM ? ' on' : '') + '" data-hud="pickm">' + (HUD.pickM ? '캡처 위를 드래그하세요' : '캡처에서 따오기') + '</button></div><div class="bubble" id="hudsay">' + esc((I && I.say) || '오셨습니까, 주인님. 화면을 보여 주시면 이 늙은이가 필요한 것만 짚어 드리지요. 히히…') + '</div></div>' + ((I && I.bottom) || (scr === 'hero' ? heroRoster() : '')) + '</div></div>';
    return o;
  };
  // 안내 캐릭터: 그림 높이의 1/3쯤은 캡처에 걸치고, 발끝은 말풍선 줄의 아래쪽 끝에 맞춘다 (그림 비율이 달라도 아래 내용을 덮지 않게)
  function placeMascot() { const mw = $('.hudscene .mwrap'), row = $('.hudpanel.bottom .mascot'), sc = $('#hudscene'); if (!mw || !row || !sc) return;
    const h = mw.getBoundingClientRect().height; if (!h) return; row.style.minHeight = Math.round(h * 0.66) + 'px';
    const d = row.getBoundingClientRect().bottom - sc.getBoundingClientRect().bottom; mw.style.bottom = '0px'; mw.style.transform = 'translateY(' + Math.round(d) + 'px)'; }
  async function hudMount() {
    const el = $('#hudstage'); if (!el) return;
    const base = new URL('vendor/', location.href.split('#')[0]).href;
    try { if (HUD.edit) { if (!window.Konva) await loadScript(base + 'konva/konva.min.js'); } else if (!window.PIXI) await loadScript(base + 'pixi/pixi.min.js'); } catch (e) { /* 아래에서 대체 표시 */ }
    if (!HUD.warm) { HUD.warm = true; const lg = store.get('dd.lang', 'kor'); poolWorker(lg, 0).catch(() => {}); poolWorker(lg, 1).catch(() => {}); }
    const sc = $('#hudscene'); if (!sc || !$('#hudstage')) return; const src = OCR.last || HUD.placeholder; const ar = src ? src.height / src.width : 9 / 16;
    let W = window.innerWidth, H = W * ar; const maxH = window.innerHeight * (window.innerHeight > window.innerWidth ? 0.5 : 0.6); if (H > maxH) { H = maxH; W = H / ar; } W = Math.round(W); H = Math.round(H);
    const d3 = $('#hud3d'); d3.style.width = W + 'px'; d3.style.height = H + 'px';
    if (HUD.stage) { HUD.stage.destroy(); HUD.stage = null; } if (HUD.app && (HUD.edit || HUD.appW !== W || HUD.appH !== H)) { try { HUD.app.destroy(true, { children: true }); } catch (e) { /* 무시 */ } HUD.app = null; }
    if (HUD.edit && window.Konva) { HUD.stage = new Konva.Stage({ container: 'hudstage', width: W, height: H }); HUD.layer = new Konva.Layer(); HUD.stage.add(HUD.layer); hudDraw(); }
    else { let ok = false; if (window.PIXI) { try { pixiScene(W, H); ok = true; } catch (e) { ok = false; } } if (!ok) domScene(W, H); else { const hc = $('#hudcalls'); if (hc) hc.innerHTML = tslotHTML(); applyZoom(); } }
    const say = $('#hudsay'); clearInterval(HUD.typer);
    if (say && (HUD.fresh || HUD.popin)) { const full = say.textContent; let n = 0; say.style.minHeight = say.offsetHeight + 'px'; say.textContent = ''; HUD.typer = setInterval(() => { n += 2; say.textContent = full.slice(0, n); if (n >= full.length) clearInterval(HUD.typer); }, 16); }
    HUD.fresh = false; HUD.slide = 0; HUD.popin = false;
    placeMascot(); const mi = $('.hudscene .mimg img'); if (mi && !mi.complete) mi.addEventListener('load', placeMascot, { once: true });
  }
  function tslotHTML() { const I = HUD.info; if (!I || !I.calls) return '';
    const camp = I.calls.filter(c => c.kind === 'cslot').sort((a, b) => a.cell.x - b.cell.x).map((c, n) => { const z = c.cell, k = c.camp;
      return '<div class="tslot cslot' + (n % 2 ? ' up' : '') + '" style="left:' + (z.x * 100 + z.w * 4).toFixed(2) + '%;top:' + (z.y * 100).toFixed(2) + '%;width:' + (z.w * 92).toFixed(2) + '%;height:' + (z.h * 100).toFixed(2) + '%"><span class="tname">' + esc(koOf(k.en, k.ko)) + '</span><span class="ttip"><b>' + esc(koOf(k.en, k.ko)) + ' <small>' + esc(k.en) + '</small></b><i>시간 ' + k.cost + ' · ' + esc(k.target) + '</i>' + esc(k.fx) + '</span></div>'; }).join('');
    const qb = I.calls.filter(c => c.kind === 'qbox').map(c => { const z = c.cell, q = c.q; const lock = q.kind === 'lock';
      return '<div class="tslot qbox ' + q.kind + '" style="left:' + (z.x * 100 - 0.4).toFixed(2) + '%;top:' + (z.y * 100 - 0.5).toFixed(2) + '%;width:' + (z.w * 100 + 0.8).toFixed(2) + '%;height:' + (z.h * 100 + 1).toFixed(2) + '%"><span class="qtag">' + (lock ? '고정' : '제거') + '</span><span class="ttip"><b>' + esc(koOf(q.en, q.ko)) + ' <small>' + esc(q.en) + '</small></b><i>' + (lock ? '요양원에서 고정할 만한 기벽' : '요양원에서 먼저 지울 기벽') + '</i>' + esc(q.why) + '</span></div>'; }).join('');
    return qb + camp + I.calls.filter(c => c.kind === 'tslot').map(c => { const t = TRK[c.name]; const z = c.cell;
      return '<div class="tslot' + (c.k === 1 ? ' up' : '') + '" style="left:' + (z.x * 100 + z.w * 4).toFixed(2) + '%;top:' + (z.y * 100).toFixed(2) + '%;width:' + (z.w * 92).toFixed(2) + '%;height:' + (z.h * 100).toFixed(2) + '%">' + pic(t.img, 0, '') + '<span class="tname">' + esc(koOf(t.en, t.ko)) + '</span><span class="ttip"><b>' + esc(koOf(t.en, t.ko)) + (t.ko ? ' <small>' + esc(t.en) + '</small>' : '') + '</b>' + (c.k === 2 ? '<i>3번째 칸 (모드)</i>' : '') + t.fx.map(esc).join('<br>') + '</span></div>'; }).join(''); }
  // WebGL을 쓸 수 없을 때의 대체 표시 (캡처 그림 + HTML 표시)
  function domScene(W, H) {
    const host = $('#hudstage'); host.innerHTML = ''; if (OCR.last || HUD.placeholder) { const c = document.createElement('canvas'); c.width = W; c.height = H; c.getContext('2d').drawImage(OCR.last || HUD.placeholder, 0, 0, W, H); host.appendChild(c); }
    const I = HUD.info; if (!I) return;
    $('#hudcalls').innerHTML = tslotHTML() + I.calls.filter(c => c.kind !== 'tslot' && c.kind !== 'cslot' && c.kind !== 'qbox').map(c => c.kind === 'badge' ? '<div class="call badge center ' + c.tone + '" style="left:' + c.x * 100 + '%;top:' + c.y * 100 + '%">' + esc(c.title) + '</div>' : c.kind === 'tag' ? '<div class="call tagc' + (c.on ? ' on' : '') + '" data-hdg="' + c.dg + '" style="left:' + c.x * 100 + '%;top:' + c.y * 100 + '%"><b>' + esc(c.title) + '</b> ' + esc(c.sub) + '</div>' : '<div class="call card ' + c.tone + '" style="left:' + c.x * 100 + '%;top:' + c.y * 100 + '%"><b>' + esc(c.title) + '</b><br>' + c.lines.map(esc).join('<br>') + '</div>').join('');
  }
  // 캔버스 장면 (PixiJS, WebGL): 캡처 + 강조 칸 + 떠 있는 표시 + 불티. 마우스를 따라 층마다 다르게 움직여 깊이감을 준다.
  function pixiScene(W, H) {
    const host = $('#hudstage'); host.innerHTML = ''; const P = window.PIXI; const I = HUD.info, src = OCR.last || HUD.placeholder; const waiting = !OCR.last;
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let app = HUD.app; const intro = HUD.fresh || HUD.popin || !app;
    if (!app) { app = new P.Application({ width: W, height: H, backgroundAlpha: 0, antialias: true, resolution: Math.min(2, window.devicePixelRatio || 1), autoDensity: true }); HUD.app = app; HUD.appW = W; HUD.appH = H; }
    else { if (HUD.tick) app.ticker.remove(HUD.tick); app.stage.removeChildren().forEach(c => c.destroy({ children: true })); }
    host.appendChild(app.view);
    const bgL = new P.Container(), fxL = new P.Container(), callL = new P.Container(); app.stage.addChild(bgL, fxL, callL);
    if (HUD.fresh || !HUD.zoom) HUD.zoom = { s: 1, x: 0, y: 0 }; applyZoom();
    if (src) { const sp = new P.Sprite(P.Texture.from(src)); sp.width = W; sp.height = H; bgL.addChild(sp); }   // 배경은 정확한 크기로 고정 (칸 표시와 어긋나지 않게)
    bgL.addChild(new P.Graphics().beginFill(0x000000, src && !waiting ? (I && I.pending ? 0.12 : 0.34) : 0).drawRect(-W * 0.05, -H * 0.05, W * 1.1, H * 1.1).endFill());
    const F = Math.max(11, Math.round(W / 88)); const font = 'Pretendard, "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif';
    const TONEC = { use: 0x6fae5c, ok: 0xd6a64a, no: 0xd0584a, gamble: 0xa98bd0, off: 0x5c5248 };
    const txt = (s, size, fill, bold, wrap) => new P.Text(s, { fontFamily: font, fontSize: size, fill, fontWeight: bold ? '800' : '500', wordWrap: !!wrap, wordWrapWidth: wrap || 0, breakWords: true, lineHeight: Math.round(size * 1.4) });
    const items = [], pulses = []; let bi = 0;
    (I ? I.calls : []).forEach((c, i) => {
      if (c.kind === 'tslot' || c.kind === 'cslot' || c.kind === 'qbox') return;
      const g = new P.Container(); const col = TONEC[c.tone] || 0xd6a64a; let w, h; const bg = new P.Graphics(); g.addChild(bg);
      if (c.kind === 'badge') {
        const t = txt(c.title, F * (c.small ? 0.95 : 1.55), c.tone === 'off' ? 0xb8b0a3 : 0xeaf6e4, true); const px = F * 0.55, py = F * 0.12; w = t.width + px * 2; h = t.height + py * 2; t.position.set(px, py); g.addChild(t);
        bg.lineStyle(2, col, 1).beginFill(c.tone === 'off' ? 0x161310 : 0x11160f, 0.96).drawRoundedRect(0, 0, w, h, F * 0.5).endFill(); g.cx = c.x * W; g.cy = c.below ? c.y * H + h / 2 : c.y * H - h * 0.15;
        // 칸이 좁아 옆 배지와 겹치면: 두 칸 너비 안에 들어가게 줄이고 한 칸씩 엇갈려 아래로 내린다
        if (c.cell) { const pitch = c.cell.w * W * 1.04; if (w > pitch * 0.94) { g.bs = Math.min(1, pitch * 2 * 0.92 / w); const col = I.calls.filter(o => o.cell && o.kind === 'badge' && o.cell.x < c.cell.x - 1e-6).length; if (col % 2) g.cy += (c.below ? 1 : -1) * (h * g.bs + 3); } bi++; }
        if (c.cell && c.tone !== 'off') { const gx = c.cell.w * W * 0.035; const r = new P.Graphics().lineStyle(2, col, 0.9).drawRoundedRect(c.cell.x * W + gx, c.cell.y * H, c.cell.w * W - gx * 2, c.cell.h * H, 4); fxL.addChild(r); pulses.push({ r, ph: i * 0.6 }); }
      } else if (c.kind === 'tag') {
        const t = txt(c.title, F * 0.95, 0xe9e1d3, true), s = txt(c.sub, F * 0.9, c.on ? 0xe9e1d3 : 0xa79b89, false); const px = F * 0.5, py = F * 0.15; t.position.set(px, py); s.position.set(px + t.width + F * 0.45, py + (t.height - s.height) / 2); g.addChild(t, s); w = s.x + s.width + px; h = t.height + py * 2;
        bg.lineStyle(c.on ? 2 : 1, c.on ? 0xd6a64a : 0x4a3d31, 1).beginFill(c.on ? 0x2a1f10 : 0x14100e, 0.94).drawRoundedRect(0, 0, w, h, F * 0.4).endFill(); g.cx = c.x * W + w / 2; g.cy = c.y * H + h / 2;
        g.eventMode = 'static'; g.cursor = 'pointer'; g.on('pointertap', () => { I.dg = c.dg; ctx.dg = c.dg; hudBuild(); render(true); });
      } else {
        const cw = Math.min(W * 0.36, F * 28); const t = txt(c.title, F * 1.15, col, true, cw), b = txt(c.lines.join('\n'), F * 1.0, 0xe9e1d3, false, cw); const p = F * 0.7; t.position.set(p, p * 0.8); b.position.set(p, t.y + t.height + F * 0.2); g.addChild(t, b); w = Math.max(t.width, b.width) + p * 2; h = b.y + b.height + p * 0.8;
        bg.lineStyle(1.5, 0x57483a, 1).beginFill(0x14100e, 0.96).drawRoundedRect(0, 0, w, h, F * 0.55).endFill(); g.cx = Math.min(W - w / 2 - 6, Math.max(w / 2 + 6, c.x * W + w / 2)); g.cy = Math.min(H - h / 2 - 6, Math.max(h / 2 + 6, c.above ? c.y * H - h / 2 - 8 : c.y * H + h / 2));
        if (c.cell) { const r = new P.Graphics().lineStyle(2, col, 0.9).drawRoundedRect(c.cell.x * W, c.cell.y * H, c.cell.w * W, c.cell.h * H, 4); fxL.addChild(r); pulses.push({ r, ph: i * 0.6 }); }
        if (c.ax != null) { const ln = new P.Graphics().lineStyle(2, col, 0.85).moveTo(c.ax * W, c.ay * H).lineTo(g.cx, c.above ? g.cy + h / 2 : g.cy - h / 2).beginFill(col).drawCircle(c.ax * W, c.ay * H, 4).endFill(); fxL.addChild(ln); }
      }
      g.bs = g.bs || 1; g.scale.set(g.bs); g.pivot.set(w / 2, h / 2); g.position.set(g.cx, g.cy); g.alpha = still || !intro ? 1 : 0; callL.addChild(g); items.push({ g, d: intro ? i * 0.045 : -1, ph: i * 1.3 });
    });
    if (I && ['map', 'hero', 'provision'].includes(I.screen) && session.heroes.length && src && !waiting) {
      const pz = (zones[I.screen] || []).find(z => z.role === 'party') || PARTY_ZONE; const cw = pz.w / 4;
      const mk = (h, x, extra) => { const g = new P.Container(); const w = cw * W * 0.9, hh = pz.h * H; const cur = h === I.hero && I.screen === 'hero'; const r = new P.Graphics();
        if (extra) { r.lineStyle(1.5, cur ? 0xd6a64a : 0x6d5420, 1).beginFill(0x14100e, 0.96).drawRoundedRect(0, 0, w, hh, 4).endFill(); g.addChild(r); const c = HUD.heroCache[h]; if (c && c.thumb) { const sp = P.Sprite.from(c.thumb); sp.width = w - 4; sp.height = hh - 4; sp.position.set(2, 2); g.addChild(sp); } }
        else { r.lineStyle(2, cur ? 0xd6a64a : 0x8a6a26, cur ? 1 : 0.75).beginFill(0xffffff, 0.001).drawRoundedRect(0, 0, w, hh, 4).endFill(); g.addChild(r); }
        const t = txt(heroKo(h), F * 0.78, cur ? 0xd6a64a : 0xe9e1d3, true); const tb = new P.Graphics().beginFill(0x14100e, 0.92).drawRoundedRect(0, 0, t.width + 8, t.height + 2, 3).endFill(); const lab = new P.Container(); t.position.set(4, 1); lab.addChild(tb, t); const ls = Math.min(1, (w + 2) / (t.width + 8)); lab.scale.set(ls); lab.position.set((w - (t.width + 8) * ls) / 2, -(t.height + 2) * ls - 3); g.addChild(lab);
        g.position.set(x * W + cw * W * 0.05, pz.y * H); g.eventMode = 'static'; g.cursor = 'pointer'; g.on('pointertap', () => showHero(h)); callL.addChild(g); };
      session.heroes.slice(0, 4).forEach((h, i) => mk(h, pz.x + cw * i, false));
      session.heroes.slice(4).forEach((h, k) => { const n = Math.floor(k / 2); mk(h, k % 2 === 0 ? pz.x + pz.w + 0.004 + cw * n : pz.x - 0.004 - cw * (n + 1), true); });
    }
    const embers = []; if (!still && src) for (let k = 0; k < 34; k++) { const e = new P.Graphics().beginFill(0xffa040).drawCircle(0, 0, 1 + Math.random() * 1.6).endFill(); e.blendMode = P.BLEND_MODES.ADD; fxL.addChild(e); embers.push({ e, x: Math.random() * W, y: Math.random() * H, v: 8 + Math.random() * 22, sw: Math.random() * 6, life: Math.random() }); }
    HUD.par = HUD.par || { x: 0, y: 0 }; const cur = HUD.cur = HUD.cur || { x: 0, y: 0 }; let t = 0;
    if (still) return;
    HUD.tick = () => { const dt = app.ticker.deltaMS / 1000; t += dt;
      cur.x += (HUD.par.x - cur.x) * 0.12; cur.y += (HUD.par.y - cur.y) * 0.12; callL.position.set(cur.x * 14, cur.y * 9);   // 떠 있는 표시만 움직인다. 배경과 칸 테두리는 고정
      items.forEach(o => { const p = Math.min(1, Math.max(0, (t - o.d) / 0.3)); const e = 1 - Math.pow(1 - p, 3); o.g.alpha = e; o.g.scale.set((1.25 - 0.25 * e) * o.g.bs); o.g.y = o.g.cy + Math.sin(t * 1.4 + o.ph) * 1.5 + (1 - e) * 12; });
      pulses.forEach(o => { o.r.alpha = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * 2.4 + o.ph)); });
      embers.forEach(o => { o.life += dt * 0.12; if (o.life > 1) { o.life = 0; o.x = Math.random() * W; o.y = H + 4; } o.y -= o.v * dt; o.e.position.set(o.x + Math.sin(t + o.sw) * 8, o.y); o.e.alpha = Math.sin(o.life * Math.PI) * 0.7; if (o.y < -6) { o.y = H + 4; o.life = 0; } });
    }; app.ticker.add(HUD.tick);
  }
  function hudDraw() {
    const st = HUD.stage, L = HUD.layer; if (!st) return; L.destroyChildren(); const W = st.width(), H = st.height(); const src = OCR.last; const F = Math.max(11, Math.round(W / 90));
    if (src) L.add(new Konva.Image({ image: src, width: W, height: H })); else L.add(new Konva.Rect({ width: W, height: H, fill: '#15110f' }));
    L.add(new Konva.Rect({ width: W, height: H, fill: '#000', opacity: src ? (HUD.edit ? 0.1 : 0.3) : 0, listening: false }));
    if (HUD.edit) {
      const I = HUD.info; const scr = (I && I.screen) || (HUD.force || 'provision'); HUD.tr = new Konva.Transformer({ rotateEnabled: false, keepRatio: false, borderStroke: '#d6a64a', anchorStroke: '#d6a64a', anchorSize: 9 });
      (zones[scr] || []).forEach((z, i) => { const read = READ_ROLES.includes(z.role);
        const g = new Konva.Group({ x: z.x * W, y: z.y * H, draggable: true }); const r = new Konva.Rect({ width: z.w * W, height: z.h * H, stroke: read ? '#7fd6d0' : '#d6a64a', strokeWidth: 2, dash: read ? [6, 4] : [], fill: read ? 'rgba(127,214,208,.12)' : 'rgba(214,166,74,.16)' });
        const t = new Konva.Text({ text: roleLabel(scr, z.role).replace(' 읽는 곳', '').replace(' 이름표 자리', '').replace(' 칸', '') + (z._read ? '\n' + z._read.slice(0, 26) : ''), fontSize: F * 0.8, fill: '#fff', padding: 2, listening: false, shadowColor: '#000', shadowBlur: 3, shadowOpacity: 1, y: read && z.role === 'len' ? z.h * H : 0 });
        g.add(r); g.add(t); L.add(g);
        const commit = () => { z.x = g.x() / W; z.y = g.y() / H; z.w = r.width() * r.scaleX() / W; z.h = r.height() * r.scaleY() / H; r.width(r.width() * r.scaleX()); r.height(r.height() * r.scaleY()); r.scale({ x: 1, y: 1 }); saveZones(); };
        g.on('dragend', commit); r.on('transformend', () => { g.x(g.x() + r.x()); g.y(g.y() + r.y()); r.position({ x: 0, y: 0 }); commit(); });
        g.on('mousedown touchstart', () => { HUD.sel = i; HUD.tr.nodes([r]); L.batchDraw(); }); if (HUD.sel === i) HUD.tr.nodes([r]); });
      L.add(HUD.tr);
    }
    L.draw();
  }
  let mdrag = null;
  document.addEventListener('pointerdown', e => { if (!HUD.pickM) return; const d3 = e.target.closest && e.target.closest('#hud3d'); if (!d3) return; e.preventDefault(); const b = d3.getBoundingClientRect(); const box = document.createElement('div'); box.className = 'mpick'; d3.appendChild(box); mdrag = { b, x0: (e.clientX - b.left) / b.width, y0: (e.clientY - b.top) / b.height, box }; });
  document.addEventListener('pointermove', e => { if (!mdrag) return; const cl = v => Math.min(1, Math.max(0, v)); const x = cl((e.clientX - mdrag.b.left) / mdrag.b.width), y = cl((e.clientY - mdrag.b.top) / mdrag.b.height); mdrag.r = { x: Math.min(x, mdrag.x0), y: Math.min(y, mdrag.y0), w: Math.abs(x - mdrag.x0), h: Math.abs(y - mdrag.y0) }; mdrag.box.style.cssText = 'left:' + mdrag.r.x * 100 + '%;top:' + mdrag.r.y * 100 + '%;width:' + mdrag.r.w * 100 + '%;height:' + mdrag.r.h * 100 + '%'; });
  document.addEventListener('pointerup', () => { if (!mdrag) return; const r = mdrag.r; mdrag.box.remove(); mdrag = null; if (!r || r.w < 0.02 || r.h < 0.02 || !OCR.last) return; const src = OCR.last; const sw = r.w * src.width, sh = r.h * src.height; const sc = Math.min(3, 480 / Math.max(sw, sh)); const cv = document.createElement('canvas'); cv.width = Math.round(sw * sc); cv.height = Math.round(sh * sc); const c = cv.getContext('2d'); c.imageSmoothingQuality = 'high'; c.drawImage(src, r.x * src.width, r.y * src.height, sw, sh, 0, 0, cv.width, cv.height); store.set('dd.mascot', cv.toDataURL('image/png')); HUD.pickM = false; render(true); });
  // 확대/축소: 휠로 마우스 위치를 중심으로 확대, 끌어서 이동, 더블클릭으로 원래대로
  function applyZoom() { const app = HUD.app, z = HUD.zoom; if (!app || !z) return; const W = HUD.appW, H = HUD.appH;
    z.s = Math.min(6, Math.max(1, z.s)); if (z.s === 1) { z.x = 0; z.y = 0; } z.x = Math.min(0, Math.max(W - W * z.s, z.x)); z.y = Math.min(0, Math.max(H - H * z.s, z.y));
    app.stage.scale.set(z.s); app.stage.position.set(z.x, z.y); const hc = $('#hudcalls'); if (hc) { hc.style.transformOrigin = '0 0'; hc.style.transform = z.s === 1 ? '' : 'translate(' + z.x + 'px,' + z.y + 'px) scale(' + z.s + ')'; } const el = $('#hudzoom'); if (el) { el.hidden = z.s === 1; el.textContent = z.s.toFixed(1) + '× · 끌어서 이동 · 더블클릭으로 원래대로'; }
    const d3 = $('#hud3d'); if (d3) d3.classList.toggle('zoomed', z.s > 1); }
  document.addEventListener('wheel', e => { const sc = e.target.closest && e.target.closest('#hud3d'); if (!sc || HUD.edit || !HUD.app || !HUD.zoom) return; e.preventDefault();
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5 && HUD.zoom.s <= 1) { wheelX += e.deltaX; if (Math.abs(wheelX) > 90 && Date.now() - wheelAt > 600) { wheelAt = Date.now(); goStage(wheelX > 0 ? 1 : -1); wheelX = 0; } return; }
    const b = sc.getBoundingClientRect(); const px = (e.clientX - b.left) * HUD.appW / b.width, py = (e.clientY - b.top) * HUD.appH / b.height; const z = HUD.zoom; const ns = Math.min(6, Math.max(1, z.s * Math.exp(-e.deltaY * 0.0016)));
    z.x = px - (px - z.x) * ns / z.s; z.y = py - (py - z.y) * ns / z.s; z.s = ns; applyZoom(); }, { passive: false });
  let zdrag = null;
  document.addEventListener('pointerdown', e => { const sc = e.target.closest && e.target.closest('#hud3d'); if (!sc || HUD.edit || HUD.pickM || !HUD.zoom || HUD.zoom.s <= 1) return; zdrag = { x: e.clientX, y: e.clientY, zx: HUD.zoom.x, zy: HUD.zoom.y, k: HUD.appW / sc.getBoundingClientRect().width }; });
  document.addEventListener('pointermove', e => { if (!zdrag) return; HUD.zoom.x = zdrag.zx + (e.clientX - zdrag.x) * zdrag.k; HUD.zoom.y = zdrag.zy + (e.clientY - zdrag.y) * zdrag.k; applyZoom(); });
  document.addEventListener('pointerup', () => { zdrag = null; });
  document.addEventListener('dblclick', e => { if (e.target.closest && e.target.closest('#hud3d') && HUD.zoom && !HUD.edit) { HUD.zoom = { s: 1, x: 0, y: 0 }; applyZoom(); } });
  // 좌우로 넘기기: 캡처를 옆으로 끌거나(스와이프), 방향키, 트랙패드 좌우 스크롤로 찍어 둔 단계 사이를 오간다
  function goStage(dir) {
    const order = STAGES.map(x => x[0]); const I = HUD.info; let i = I && I.screen ? order.indexOf(I.screen) : (dir > 0 ? -1 : order.length);
    for (i += dir; i >= 0 && i < order.length; i += dir) if (HUD.cache[order[i]]) { HUD.slide = dir; const b = $('.step[data-hscreen="' + order[i] + '"]'); if (b) b.click(); return true; }
    const d3 = $('#hud3d'); if (d3) { d3.classList.remove('bump'); void d3.offsetWidth; d3.style.setProperty('--bump', (dir > 0 ? -1 : 1) * 14 + 'px'); d3.classList.add('bump'); } return false;   // 그쪽에는 찍어 둔 캡처가 없음
  }
  let sw = null, wheelX = 0, wheelAt = 0;
  document.addEventListener('pointerdown', e => { const d3 = e.target.closest && e.target.closest('#hud3d'); if (!d3 || HUD.edit || HUD.pickM || (HUD.zoom && HUD.zoom.s > 1) || e.button) return; sw = { x: e.clientX, y: e.clientY, d3 }; });
  document.addEventListener('pointermove', e => { if (!sw) return; const dx = e.clientX - sw.x; if (Math.abs(dx) > 12) sw.d3.style.translate = (dx * 0.45).toFixed(0) + 'px 0'; });
  document.addEventListener('pointerup', e => { if (!sw) return; const dx = e.clientX - sw.x, dy = e.clientY - sw.y, d3 = sw.d3; sw = null; d3.style.translate = ''; if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) goStage(dx < 0 ? 1 : -1); });
  document.addEventListener('pointercancel', () => { if (sw) { sw.d3.style.translate = ''; sw = null; } });
  document.addEventListener('keydown', e => { if (parseHash().view !== 'hud' || HUD.edit || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return; if (e.key === 'ArrowRight') { e.preventDefault(); goStage(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); goStage(-1); } });
  // 3D 기울임: 마우스를 따라 캡처 판이 기울고 말풍선은 앞으로 떠 보인다
  document.addEventListener('pointermove', e => { const s = e.target.closest && e.target.closest('#hudscene'); const d3 = $('#hud3d'); if (!d3 || HUD.edit || HUD.pickM || (HUD.zoom && HUD.zoom.s > 1)) { if (d3 && (HUD.pickM || (HUD.zoom && HUD.zoom.s > 1))) { d3.style.transform = 'none'; HUD.par = { x: 0, y: 0 }; } return; } if (!s) { d3.style.transform = ''; HUD.par = { x: 0, y: 0 }; return; }
    const b = d3.getBoundingClientRect(); const x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5; HUD.par = { x, y }; d3.classList.remove('enter'); d3.style.transform = 'rotateX(' + (-y * 9).toFixed(2) + 'deg) rotateY(' + (x * 12).toFixed(2) + 'deg)'; });
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-hrm],[data-hroster],[data-hscreen],[data-hud],[data-hdg],[data-hlen],[data-hhero],[data-hcurio]'); if (!t) return; const d = t.dataset; const I = HUD.info;
    const scr = (I && I.screen) || (HUD.force || 'provision');
    if (d.hscreen != null) { HUD.sel = null; const c = HUD.cache[d.hscreen];
      if (c) { OCR.last = c.cv; HUD.info = c.info; HUD.force = null; HUD.fresh = true; hudBuild(); }   // 이전에 찍어 둔 그 단계의 캡처와 분석 결과를 그대로 보여 준다 (다시 읽지 않음)
      else { HUD.force = d.hscreen; HUD.pin = d.hscreen; if (OCR.last) { hudRun(); return; } HUD.info = { screen: HUD.force, dg: null, len: null, det: { lines: [], words: [] } }; hudBuild(); } }
    else if (d.hdg != null && I) { I.dg = d.hdg; ctx.dg = d.hdg; hudBuild(); }
    else if (d.hlen != null && I) { I.len = +d.hlen; ctx.len = I.len; hudBuild(); }
    else if (d.hhero != null && I) { I.hero = d.hhero; hudBuild(); }
    else if (d.hrm != null) { e.stopPropagation(); session.heroes = session.heroes.filter(x => x !== d.hrm); delete HUD.heroCache[d.hrm]; DB.del('hero:' + d.hrm); saveSession(); if (I && I.hero === d.hrm) { I.hero = null; I.cachedAs = null; I.src = null; } }
    else if (d.hroster != null) { showHero(d.hroster); return; }
    else if (d.hcurio != null && I) { I.curio = d.hcurio; hudBuild(); }
    else if (d.hud === 'rescan') { hudRun(); return; }
    else if (d.hud === 'exportcaps') { exportCaps(); return; }
    else if (d.hud === 'setph') { if (!OCR.last) return; HUD.placeholder = OCR.last; OCR.last.toBlob(b => { if (b) DB.put({ key: 'placeholder', blob: b, t: Date.now() }); }, 'image/jpeg', 0.9); OCR.status = '대기 화면으로 지정했습니다.'; dock(); return; }
    else if (d.hud === 'fs') { if (document.fullscreenElement) document.exitFullscreen(); else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {}); return; }
    else if (d.hud === 'edit') { HUD.edit = !HUD.edit; HUD.sel = null; }
    else if (d.hud === 'newrun') { if (!confirm('탐험을 마치셨나요? 이번 원정의 캡처와 기록(던전, 영웅, 가방, 만난 기물)을 모두 지우고 다음 원정을 시작합니다.')) return; DB.clearCaps(); HUD.heroCache = {}; OCR.last = null; OCR.thumb = null; run.inv = {}; saveRun(); session = { heroes: [], curios: [], prov: false }; saveSession(); ctx = { dg: null, len: null }; store.set('dd.ctx', ctx); HUD.info = null; HUD.force = null; HUD.pin = null; HUD.cache = {}; }
    else if (d.hud === 'fillbag' && I && I.dg) { const dgd = DG[I.dg]; run.dg = I.dg; run.inv = {}; PROV9.forEach(k => { run.inv[k] = (dgd.provisions[k] || [0, 0, 0])[I.len || 0] || (k === 'Laudanum' ? [0, 1, 2][I.len || 0] : 0); }); saveRun(); session.prov = true; saveSession(); }
    else if (d.hud === 'clearheroes') { Object.keys(HUD.heroCache).forEach(h => DB.del('hero:' + h)); session.heroes = []; HUD.heroCache = {}; saveSession(); }
    else if (d.hud === 'tobuilder') { const sl = partyFromHeroes(session.heroes); bld = { slots: sl.map((h, i) => h ? { hero: h, skills: defaultSkills(h, 4 - i) } : null), active: Math.max(0, sl.indexOf(null)), dg: ctx.dg || '' }; saveBld(); location.hash = '#/builder'; return; }
    else if (d.hud === 'pickm') { if (!OCR.last) { alert('먼저 화면을 캡처하세요.'); return; } HUD.pickM = !HUD.pickM; HUD.edit = false; }
    else if (d.hud === 'mascot') { if (store.get('dd.mascot', null) && confirm('기본 캐릭터로 되돌릴까요? (취소를 누르면 다른 그림을 고릅니다)')) { store.set('dd.mascot', null); render(true); return; }
      const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*'; inp.onchange = () => { const f = inp.files[0]; if (!f) return; const img = new Image(); img.onload = () => { const sc = Math.min(1, 480 / Math.max(img.naturalWidth, img.naturalHeight)); const cv = document.createElement('canvas'); cv.width = Math.round(img.naturalWidth * sc); cv.height = Math.round(img.naturalHeight * sc); cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height); store.set('dd.mascot', cv.toDataURL('image/png')); render(true); }; img.src = URL.createObjectURL(f); }; inp.click(); return; }
    else if (d.hud === 'addzone') { const role = $('#hrole').value; zones[scr] = zones[scr] || []; zones[scr].push({ role, x: 0.42, y: 0.42, w: role.startsWith('item:') ? 0.045 : 0.16, h: role.startsWith('item:') ? 0.13 : 0.05 }); HUD.sel = zones[scr].length - 1; saveZones(); }
    else if (d.hud === 'delzone') { if (HUD.sel != null && zones[scr]) { zones[scr].splice(HUD.sel, 1); HUD.sel = null; saveZones(); } }
    else if (d.hud === 'reset') { if (!confirm('이 화면의 영역을 기본값으로 되돌릴까요?')) return; zones[scr] = JSON.parse(JSON.stringify(DEFAULT_ZONES[scr] || [])); saveZones(); }
    else if (d.hud === 'export') { prompt('영역 정보입니다. 복사해 보관하거나 공유하세요.', JSON.stringify(zones, (k, v) => k === '_read' ? undefined : (typeof v === 'number' ? Math.round(v * 10000) / 10000 : v))); return; }
    else if (d.hud === 'import') { const s = prompt('내보낸 영역 정보를 붙여 넣으세요.'); if (!s) return; try { const o = JSON.parse(s); if (o && typeof o === 'object') { zones = Object.assign(JSON.parse(JSON.stringify(DEFAULT_ZONES)), o); saveZones(); } } catch (err) { alert('형식이 올바르지 않습니다.'); return; } }
    render(true);
  });
  async function hudRun() { if (HUD.busy || !OCR.last) { render(true); return; } HUD.busy = true; OCR.status = '분석 중…'; dock(); try { await hudAnalyze(); OCR.status = '오버레이 갱신됨'; } catch (e) { OCR.status = '분석 실패: ' + e.message; } HUD.busy = false; dock(); render(true); }
  window.addEventListener('resize', () => { if (parseHash().view === 'hud') hudMount(); });

  // ================= 라우터 =================
  function parseHash() {
    const h = location.hash.replace(/^#\/?/, ''); const [path, qs] = h.split('?');
    const parts = path.split('/').filter(Boolean); const q = {};
    (qs || '').split('&').filter(Boolean).forEach(kv => { const i = kv.indexOf('='); q[decodeURIComponent(i < 0 ? kv : kv.slice(0, i))] = i < 0 ? '' : decodeURIComponent(kv.slice(i + 1)); });
    return { view: parts[0] || 'home', args: parts.slice(1), q };
  }
  function setQuery(patch, keepScroll) {
    const r = parseHash(); Object.assign(r.q, patch);
    const qs = Object.keys(r.q).filter(k => r.q[k] !== '' && r.q[k] != null).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(r.q[k])).join('&');
    const nh = '#/' + [r.view].concat(r.args).join('/') + (qs ? '?' + qs : '');
    if (keepScroll) { history.replaceState(null, '', nh); render(true); } else location.hash = nh;
  }
  let lastView = '';
  function render(keep) {
    const r = parseHash(); const fn = V[r.view] || V.home;
    const app = $('#app'); const act = document.activeElement; const fid = act && act.id; const pos = act && act.selectionStart;
    app.innerHTML = fn(r.args, r.q);
    $$('#nav a').forEach(a => a.classList.toggle('on', a.dataset.k === r.view || (a.dataset.k === 'heroes' && r.view === 'hero') || (a.dataset.k === 'bosses' && r.view === 'boss')));
    if (fid && $('#' + fid, app)) { const el = $('#' + fid, app); el.focus(); try { el.setSelectionRange(pos, pos); } catch (e) { /* 무시 */ } }
    const key = r.view + '/' + r.args.join('/');
    if (!keep && key !== lastView) window.scrollTo(0, 0);
    lastView = key;
    if (r.view === 'hud') hudMount();
    if (r.view === 'parties' && r.q.id) { const el = $('#party-' + r.q.id); if (el) el.scrollIntoView({ block: 'start' }); }
    $('#modeBtn').textContent = { both: '한/영', ko: '한글', en: 'ENG' }[mode];
    document.title = (app.querySelector('h1') ? app.querySelector('h1').textContent.replace(/\s+/g, ' ').trim() + ' · ' : '') + '다키스트 던전 공략 수첩';
  }
  window.addEventListener('hashchange', () => render(false));

  // ================= 이벤트 위임 =================
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-len],[data-cdg],[data-ptag],[data-ttab],[data-ekind],[data-mode],[data-gcat],#wkreset,#glreset,#glexport,#glimport');
    if (!t) return;
    const d = t.dataset; const r = parseHash();
    if (d.len != null) { history.replaceState(null, '', '#/plan/' + (r.args[0] || 'ruins') + '/' + d.len); render(true); }
    else if (d.cdg != null) { location.hash = '#/curios/' + d.cdg + (r.q.item ? '?item=1' : ''); }
    else if (d.ptag != null) setQuery({ tag: d.ptag === 'all' ? '' : d.ptag, id: '' }, true);
    else if (d.ttab != null) location.hash = '#/town/' + d.ttab;
    else if (d.ekind != null) setQuery({ kind: d.ekind === 'all' ? '' : d.ekind }, true);
    else if (d.gcat != null) setQuery({ cat: d.gcat === '전체' ? '' : d.gcat }, true);
    else if (d.mode != null) { mode = d.mode; store.set('dd.mode', mode); render(true); }
    else if (t.id === 'wkreset') { e.preventDefault(); weekly = {}; store.set('dd.weekly', weekly); render(true); }
    else if (t.id === 'glreset') { e.preventDefault(); if (confirm('저장한 내 게임 용어를 모두 지울까요?')) { overrides = {}; store.set('dd.terms', overrides); render(true); } }
    else if (t.id === 'glexport') { e.preventDefault(); prompt('아래 내용을 복사해 보관하세요.', JSON.stringify(overrides)); }
    else if (t.id === 'glimport') { e.preventDefault(); const s = prompt('내보내기로 복사해 둔 내용을 붙여 넣으세요.'); if (s) { try { const o = JSON.parse(s); if (o && typeof o === 'object') { Object.keys(o).forEach(k => { if (typeof o[k] === 'string') overrides[k] = o[k]; }); store.set('dd.terms', overrides); render(true); } } catch (err) { alert('형식이 올바르지 않습니다.'); } } }
  });
  let deb;
  document.addEventListener('input', e => {
    const t = e.target; const map = { curioq: 'q', evq: 'q', trq: 'q', glq: 'q' };
    if (map[t.id]) { clearTimeout(deb); deb = setTimeout(() => setQuery({ q: t.value.trim() }, true), 180); }
  });
  document.addEventListener('change', e => {
    const t = e.target;
    if (t.id === 'curioitem') setQuery({ item: t.checked ? '1' : '' }, true);
    else if (t.id === 'trcls') setQuery({ cls: t.value === 'all' ? '' : t.value }, true);
    else if (t.classList.contains('provck')) t.closest('label').classList.toggle('done', t.checked);
    else if (t.dataset.wk != null) { weekly[t.dataset.wk] = t.checked; store.set('dd.weekly', weekly); t.closest('label').classList.toggle('done', t.checked); }
    else if (t.dataset.term != null) { const v = t.value.trim(); if (v) overrides[t.dataset.term] = v; else delete overrides[t.dataset.term]; store.set('dd.terms', overrides); t.classList.toggle('changed', !!v); }
  });
  $('#modeBtn').addEventListener('click', () => { mode = { both: 'ko', ko: 'en', en: 'both' }[mode]; store.set('dd.mode', mode); render(true); });

  // ================= 통합 검색 =================
  const qi = $('#q'), qr = $('#qres');
  function search(s) {
    s = s.trim().toLowerCase(); if (!s) { qr.hidden = true; return; }
    const out = []; const seen = {};
    TERMS.concat(SEARCH_EXTRA).forEach(t => {
      const name = (t.en + ' ' + (t.noko ? '' : t.ko) + ' ' + t.alt.join(' ') + ' ' + (overrides[t.en] || '')).toLowerCase();
      let sc = -1; const i = name.indexOf(s);
      if (i === 0) sc = 0; else if (i > 0) sc = 1; else if (t.noko && t.ko.toLowerCase().includes(s)) sc = 3;
      if (sc < 0 || seen[t.cat + t.en]) return; seen[t.cat + t.en] = 1;
      out.push({ t, sc: sc + (t.cat === '스킬' || t.cat === '장신구' ? 0.5 : 0) });
    });
    out.sort((a, b) => a.sc - b.sc);
    qr.innerHTML = out.slice(0, 30).map(x => '<a href="' + x.t.href + '"><span>' + (x.t.noko ? esc(x.t.en) + '<span class="en">' + esc(x.t.ko.slice(0, 40)) + '</span>' : T(x.t.en, x.t.ko)) + '</span><span class="tag">' + esc(x.t.cat) + '</span></a>').join('') || '<a><span class="dim">결과 없음 — 영문명으로도 검색해 보세요</span></a>';
    qr.hidden = false;
  }
  qi.addEventListener('input', () => search(qi.value));
  qi.addEventListener('focus', () => search(qi.value));
  qi.addEventListener('keydown', e => { if (e.key === 'Enter') { const a = $('a[href]', qr); if (a) { location.hash = a.getAttribute('href'); qr.hidden = true; qi.blur(); } } else if (e.key === 'Escape') { qr.hidden = true; qi.blur(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.search')) qr.hidden = true; else if (e.target.closest('.qres a')) { qr.hidden = true; qi.value = ''; } });
  document.addEventListener('keydown', e => { if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); qi.focus(); } });

  render(false);
  restoreCaps();
})();
