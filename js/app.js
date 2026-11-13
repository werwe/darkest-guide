/* 다키스트 던전 공략 수첩 — 화면 로직 (빌드 없이 동작하는 단일 스크립트) */
(function () {
  'use strict';
  const WIKI = 'https://darkestdungeon.wiki.gg/images/';
  const BOSSES = [].concat(typeof BOSSES_A !== 'undefined' ? BOSSES_A : [], typeof BOSSES_B !== 'undefined' ? BOSSES_B : []);
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
  TRINKETS.forEach(t => SEARCH_EXTRA.push({ cat: '장신구', en: t.en, ko: t.fx.join(' / '), alt: [], href: '#/trinkets?q=' + encodeURIComponent(t.en), noko: true }));
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
    return '<div class="tk">' + pic(t.img, 0, '') + '<span><b>' + esc(t.en) + '</b><br>' + esc(t.fx.join(' · ')) + '</span></div>';
  }
  function slotHTML(s, pos) {
    const h = HERO_DATA[s.hero] || {};
    let o = '<div class="slot"><div class="slot-top"><div class="port">' + pic(h.img, 120, '') + '</div><div><div class="pos">' + pos + '열' + (pos === 1 ? ' · 맨 앞' : pos === 4 ? ' · 맨 뒤' : '') + '</div><a class="hn" href="#/hero/' + encodeURIComponent(s.hero) + '">' + heroT(s.hero) + '</a></div></div>';
    o += '<h5>스킬</h5>' + s.skills.map(k => skillLine(s.hero, k)).join('');
    if (s.trinkets && s.trinkets.length) o += '<h5>장신구</h5>' + s.trinkets.map(trinketLine).join('');
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
    o += '<h2>보급품 체크리스트</h2>' + chipRow(labels.map((l, i) => [String(i), l]), String(li), 'len');
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
    o += '<h2>추천 세팅</h2><div class="grid g2">' + g.builds.map(b => '<div class="card"><h3>' + esc(b.name) + '</h3><div class="two" style="margin-top:6px"><div><div class="small dim">스킬</div>' + b.skills.map(k => skillLine(h, k)).join('') + '</div><div><div class="small dim">장신구</div>' + b.trinkets.map(trinketLine).join('') + '</div></div><p class="small dim">' + esc(b.note) + '</p></div>').join('') + '</div>';
    o += '<h2>운용 팁</h2>' + ul(g.tips);
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
    return '<div class="card trk">' + pic(t.img, 0, '') + '<div><b class="rar-' + (t.rar || 'vc') + '">' + esc(t.en) + '</b><div class="small dim">' + esc(RAR[t.rar] || '특수') + (t.cls ? ' · ' + esc(heroKo(t.cls)) + ' 전용' : '') + (t.area ? ' · ' + esc(t.area) : '') + '</div><div class="small">' + t.fx.map(esc).join('<br>') + '</div></div></div>';
  }
  V.trinkets = function (args, q) {
    const kw = (q.q || '').toLowerCase(), cls = q.cls || 'all';
    const list = TRINKETS.filter(t => (cls === 'all' || (cls === 'common' ? !t.cls : t.cls === cls)) && (!kw || (t.en + ' ' + t.fx.join(' ') + ' ' + heroKo(t.cls || '')).toLowerCase().includes(kw)));
    let o = '<h1>장신구</h1><p class="lead">장신구 이름은 번역 차이가 커서 영문명과 아이콘으로 표기합니다. 효과로도 검색할 수 있습니다(예: "기절", "속도", "치유").</p>';
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
    o += ocrCard();
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

  // ================= 화면 인식 (게임 창 캡처 → 글자 읽기 → 기물 찾기) =================
  const OCR = { stream: null, video: null, worker: null, loading: false, busy: false, auto: false, timer: null, lines: [], status: '', thumb: null, pick: null, match: null, region: store.get('dd.ocrRegion', null) };
  let aliases = store.get('dd.ocrAlias', {});   // 인식된 글자(정규화) -> 기물 영문명
  const normT = s => String(s).toLowerCase().replace(/[^0-9a-z가-힣]/g, '');
  function lev(a, b) { const m = a.length, n = b.length; if (!m) return n; if (!n) return m; let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; } return prev[n]; }
  function matchCurio(lines) {
    const all = normT(lines.join(' ')); const nl = lines.map(normT).filter(x => x.length >= 2); let best = null;
    const consider = (en, score, how) => { const c = CURIOS.find(x => x.en === en); if (!c) return; if (c.dg === run.dg || c.dg === 'all') score += 0.5; if (!best || score > best.score) best = { en, score, how }; };
    nl.forEach(l => { if (aliases[l]) consider(aliases[l], 100, '저장된 내 용어'); });
    Object.keys(aliases).forEach(a => { if (a.length >= 3 && all.includes(a)) consider(aliases[a], 90, '저장된 내 용어'); });
    const seen = {};
    CURIOS.forEach(c => { if (seen[c.en]) return; seen[c.en] = 1;
      [c.ko, overrides[c.en], c.en.replace(/\s*\(.*\)/, '')].filter(Boolean).forEach(name => { const k = normT(name); if (k.length < 2) return;
        if (k.length >= 3 && all.includes(k)) consider(c.en, 10 + k.length, '이름 일치');
        else nl.forEach(l => { if (l === k) consider(c.en, 10 + k.length, '이름 일치'); else if (k.length >= 4 && Math.abs(l.length - k.length) <= 2) { const r = 1 - lev(l, k) / Math.max(l.length, k.length); if (r >= 0.75) consider(c.en, r * k.length, '비슷한 이름'); } });
      }); });
    return best;
  }
  function loadScript(src) { return new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => no(new Error('스크립트를 불러오지 못했습니다')); document.head.appendChild(s); }); }
  async function ensureWorker() {
    if (OCR.worker) return OCR.worker;
    const base = new URL('vendor/tesseract/', location.href.split('#')[0]).href;
    if (!window.Tesseract) await loadScript(base + 'tesseract.min.js');
    OCR.worker = await window.Tesseract.createWorker(['kor', 'eng'], 1, { workerPath: base + 'worker.min.js', corePath: base, langPath: base + 'lang', gzip: true });
    return OCR.worker;
  }
  async function recognizeCanvas(cv) {
    const w = await ensureWorker(); const { data } = await w.recognize(cv);
    return data.text.split('\n').map(x => x.trim()).filter(x => normT(x).length >= 2);
  }
  function grabFrame() {
    const v = OCR.video; if (!v || !v.videoWidth) return null;
    const W = v.videoWidth, H = v.videoHeight; const r = OCR.region || { x: 0, y: 0, w: 1, h: 1 };
    const sx = r.x * W, sy = r.y * H, sw = Math.max(8, r.w * W), sh = Math.max(8, r.h * H);
    const sc = sw < 1000 ? 2 : (sw > 1920 ? 1920 / sw : 1);
    const cv = document.createElement('canvas'); cv.width = Math.round(sw * sc); cv.height = Math.round(sh * sc);
    const cx = cv.getContext('2d'); cx.filter = 'grayscale(1) contrast(1.4)'; cx.drawImage(v, sx, sy, sw, sh, 0, 0, cv.width, cv.height);
    const t = document.createElement('canvas'); t.width = 480; t.height = Math.round(480 * H / W); t.getContext('2d').drawImage(v, 0, 0, t.width, t.height);
    try { OCR.thumb = t.toDataURL('image/jpeg', 0.6); } catch (e) { /* 무시 */ }
    return cv;
  }
  async function ocrConnect() {
    try {
      const s = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 5 }, audio: false });
      const v = document.createElement('video'); v.muted = true; v.srcObject = s; await v.play();
      OCR.stream = s; OCR.video = v; OCR.status = '게임 화면 연결됨. 처음 인식할 때 글자 인식 데이터(약 5MB)를 내려받습니다.';
      s.getVideoTracks()[0].addEventListener('ended', () => { ocrStop(); render(true); });
      setTimeout(() => { grabFrame(); render(true); }, 400);
    } catch (e) { OCR.status = '화면 공유가 취소되었거나 이 브라우저에서 지원되지 않습니다.'; }
    render(true);
  }
  function ocrStop() { if (OCR.stream) OCR.stream.getTracks().forEach(t => t.stop()); clearInterval(OCR.timer); OCR.stream = OCR.video = null; OCR.auto = false; OCR.status = '연결 해제됨'; }
  async function ocrScan(silent) {
    if (!OCR.stream) { OCR.status = '먼저 게임 화면을 연결하세요.'; render(true); return; }
    if (OCR.busy) return; OCR.busy = true;
    if (!silent) { OCR.status = '인식 중…'; render(true); }
    try {
      const cv = grabFrame(); if (!cv) throw new Error('화면을 아직 받지 못했습니다');
      const t0 = performance.now(); const lines = await recognizeCanvas(cv);
      const m = matchCurio(lines); OCR.lines = lines.slice(0, 14); OCR.match = m; OCR.pick = null;
      if (m) { const c = CURIOS.find(x => x.en === m.en); if (c.dg !== 'all' && c.dg !== run.dg) run.dg = c.dg; run.sel = m.en; saveRun(); OCR.status = '찾음: ' + koOf(c.en, c.ko) + ' (' + m.how + ', ' + Math.round(performance.now() - t0) + 'ms)'; }
      else OCR.status = lines.length ? '기물 이름을 찾지 못했습니다. 아래에서 기물 이름에 해당하는 글자를 누른 뒤 그림판에서 기물을 골라 주면 다음부터 자동으로 찾습니다.' : '글자를 읽지 못했습니다. 기물에 마우스를 올려 이름이 보이는 상태에서 다시 시도하세요.';
    } catch (e) { OCR.status = '인식 실패: ' + e.message + (location.protocol === 'file:' ? ' (파일로 직접 연 경우 동작하지 않습니다. 배포된 주소에서 사용하세요.)' : ''); }
    OCR.busy = false;
    if (!silent || OCR.match || parseHash().view === 'run') render(true);
  }
  function ocrCard() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) return '<div class="card small dim">화면 인식은 PC의 크롬 · 엣지 등 화면 공유를 지원하는 브라우저에서만 쓸 수 있습니다.</div>';
    const on = !!OCR.stream; const r = OCR.region;
    let o = '<div class="card ocr"><div class="row"><h3>화면 인식</h3>' + (on ? '<button class="chip sm on" data-ocr="scan">지금 인식 (F8)</button><button class="chip sm' + (OCR.auto ? ' on' : '') + '" data-ocr="auto">자동 인식 ' + (OCR.auto ? '켜짐' : '꺼짐') + '</button><button class="chip sm" data-ocr="stop">연결 해제</button>' : '<button class="chip sm on" data-ocr="connect">게임 화면 연결</button>') + '</div>';
    if (!on) o += '<p class="small dim">게임 창을 한 번 연결해 두면, 화면의 글자를 읽어 해당 기물을 바로 띄웁니다. 게임에서 기물에 마우스를 올려 이름이 보이는 상태에서 인식하세요. 화면은 이 컴퓨터 안에서만 처리되고 어디로도 전송되지 않습니다.</p>';
    if (OCR.status) o += '<div class="small" style="margin:6px 0">' + esc(OCR.status) + '</div>';
    if (on && OCR.thumb) o += '<div class="ocrprev" id="ocrprev"><img src="' + OCR.thumb + '" alt="" draggable="false">' + (r ? '<i style="left:' + r.x * 100 + '%;top:' + r.y * 100 + '%;width:' + r.w * 100 + '%;height:' + r.h * 100 + '%"></i>' : '') + '</div><div class="small dim">미리보기 위를 드래그하면 그 영역만 읽습니다(빠르고 정확해짐). ' + (r ? '<a href="#" data-ocr="noregion">영역 해제</a>' : '') + '</div>';
    if (OCR.lines.length) o += '<div class="small dim" style="margin-top:6px">읽은 글자' + (OCR.pick != null ? ' — <b style="color:var(--gold)">이제 그림판에서 이 글자에 해당하는 기물을 누르세요</b>' : ' (기물 이름이면 눌러서 등록)') + '</div><div class="chips" style="margin:4px 0">' + OCR.lines.map((l, i) => '<button class="chip sm' + (OCR.pick === i ? ' on' : '') + '" data-opick="' + i + '">' + esc(l.slice(0, 30)) + '</button>').join('') + '</div>';
    const na = Object.keys(aliases).length; if (na) o += '<div class="small dim">등록한 내 게임 기물 이름 ' + na + '개 · <a href="#" data-ocr="clearalias">모두 지우기</a></div>';
    return o + '</div>';
  }
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-ocr],[data-opick]'); if (!t) return; e.preventDefault(); const a = t.dataset.ocr;
    if (t.dataset.opick != null) { const i = +t.dataset.opick; OCR.pick = OCR.pick === i ? null : i; render(true); }
    else if (a === 'connect') ocrConnect();
    else if (a === 'scan') ocrScan(false);
    else if (a === 'stop') { ocrStop(); render(true); }
    else if (a === 'auto') { OCR.auto = !OCR.auto; clearInterval(OCR.timer); if (OCR.auto) { OCR.timer = setInterval(() => ocrScan(true), 2500); ocrScan(true); } render(true); }
    else if (a === 'noregion') { OCR.region = null; store.set('dd.ocrRegion', null); render(true); }
    else if (a === 'clearalias') { if (confirm('등록한 기물 이름을 모두 지울까요?')) { aliases = {}; store.set('dd.ocrAlias', aliases); render(true); } }
  });
  // 읽은 글자를 고른 상태에서 기물 그림을 누르면 그 글자를 해당 기물의 이름으로 등록 (캡처 단계에서 먼저 처리)
  document.addEventListener('click', e => { const t = e.target.closest('[data-rsel]'); if (!t || OCR.pick == null) return; const k = normT(OCR.lines[OCR.pick] || ''); if (k.length >= 2) { aliases[k] = t.dataset.rsel; store.set('dd.ocrAlias', aliases); OCR.status = '등록됨: "' + OCR.lines[OCR.pick] + '" → ' + t.dataset.rsel; } OCR.pick = null; }, true);
  document.addEventListener('keydown', e => { if (e.key === 'F8') { e.preventDefault(); if (parseHash().view !== 'run') location.hash = '#/run'; ocrScan(false); } });
  let drag = null;
  document.addEventListener('pointerdown', e => { const p = e.target.closest('#ocrprev'); if (!p) return; e.preventDefault(); const b = p.getBoundingClientRect(); drag = { b, x0: (e.clientX - b.left) / b.width, y0: (e.clientY - b.top) / b.height, el: p }; });
  document.addEventListener('pointermove', e => { if (!drag) return; const cl = v => Math.min(1, Math.max(0, v)); const x = cl((e.clientX - drag.b.left) / drag.b.width), y = cl((e.clientY - drag.b.top) / drag.b.height);
    drag.r = { x: Math.min(x, drag.x0), y: Math.min(y, drag.y0), w: Math.abs(x - drag.x0), h: Math.abs(y - drag.y0) }; let box = drag.el.querySelector('i'); if (!box) { box = document.createElement('i'); drag.el.appendChild(box); }
    box.style.cssText = 'left:' + drag.r.x * 100 + '%;top:' + drag.r.y * 100 + '%;width:' + drag.r.w * 100 + '%;height:' + drag.r.h * 100 + '%'; });
  document.addEventListener('pointerup', () => { if (!drag) return; const r = drag.r; drag = null; if (r && r.w > 0.03 && r.h > 0.02) { OCR.region = r; store.set('dd.ocrRegion', r); render(true); } });
  window.ddOcr = { recognizeCanvas, matchCurio };

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
})();
