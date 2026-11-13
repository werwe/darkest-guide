// 보스 공략 데이터 A (폐허·삼림·해만·사육장 보스, 방랑 보스, 이벤트 보스)
// 수치 출처: Darkest Dungeon Wiki (darkestdungeon.wiki.gg). 공략 문장은 직접 작성.
// hp / res 배열 순서: [견습, 숙련, 챔피언]. null = 위키에서 난이도별 값을 확인하지 못함.
// party.slots 순서: 4열(맨 뒤) → 1열(맨 앞)
const BOSSES_A = [
  {
    id: "necromancer",
    en: "Necromancer", ko: "강령술사", alt: ["네크로맨서", "사령술사", "강령술사 군주"],
    group: "ruins",
    img: "Necromancer_attack_ranged.png",
    type: "불경/이형", size: 1,
    variants: ["Necromancer Apprentice (견습)", "Necromancer (숙련)", "Necromancer Lord (챔피언)"],
    hp: [105, 158, 215],
    res: { stun: [75, null, null], blight: [20, null, null], bleed: [20, null, null], debuff: [40, null, null], move: [25, null, null] },
    summary: "공격할 때마다 해골을 앞에 세우고 한 칸씩 뒤로 물러나는 보스. 후열 화력이 충분한지 묻는 입문 시험이다.",
    mech: [
      "1열에서 시작해, 공격을 한 번 할 때마다 1열에 해골 하나를 소환하고 자신은 한 칸 뒤로 물러난다. 공격이 빗나가도 소환은 이루어진다.",
      "해골은 최대 3마리까지만 유지된다. 강령술사가 기절(Stun) 상태면 소환하지 못한다.",
      "The Flesh Is Willing 은 아군 1·2열, The Clawing Dead 는 3·4열을 동시에 때리고, Six Feet Under 는 피해 없이 파티 전원에게 스트레스 15를 준다.",
      "스킬 선택과 대상에 가중치가 없어 사실상 무작위로 행동한다.",
      "숙련부터는 Bone Defender, 챔피언에서는 Bone Captain 도 섞여 나온다. Bone Defender 는 강령술사를 보호(Guard)할 수 있다.",
      "소환된 해골은 강령술사가 죽으면 함께 쓰러진다."
    ],
    strat: [
      "해골은 무시하고 본체만 친다. 2~3턴이면 3·4열로 빠지므로 파티 전원이 3·4열을 때릴 수 있어야 한다.",
      "기절 저항만 높고 중독(Blight)·출혈(Bleed) 저항은 낮다. 다만 폐허 일반 적은 출혈이 잘 안 먹히므로 지속 피해는 중독 위주로 준비할 것.",
      "행동이 라운드당 1회뿐이라 표식(Mark)과 약화(Debuff)가 오래 유지된다. 표식 + Sniper Shot / Hound's Rush 조합이 잘 통한다.",
      "이동 저항이 낮아 앞으로 끌어올 수 있지만, 다음 공격 때 다시 뒤로 가므로 끌기에만 의존하지 말 것.",
      "숙련 이상에서 Bone Defender 가 본체를 보호하면 Defender 를 기절시켜 보호를 끊고 본체를 친다.",
      "해골을 하나씩 정리하려 들면 끝없이 다시 나와 손해다. 전열 전용 딜러만으로 파티를 짜는 것이 가장 흔한 실수."
    ],
    bring: [
      "음식 넉넉히 — 보스 방까지의 길이와 야영에 맞춰 준비",
      "성수(Holy Water) 2~3 — 폐허 길목의 골동품(Curio) 활용과 저항 보강용",
      "만능 열쇠(Skeleton Key) 2, 삽(Shovel) 2 — 길목 보물·장애물용",
      "횃불(Torch) 넉넉히 — 스트레스 공격이 있으니 밝기를 높게 유지"
    ],
    good: ["Arbalest", "Plague Doctor", "Hellion", "Highwayman", "Grave Robber", "Houndmaster", "Occultist"],
    bad: ["Leper"],
    goodWhy: "본체가 금방 3·4열로 빠지기 때문에 어느 열에서든 후열을 때릴 수 있는 영웅이 좋다. 나병 환자(Leper)는 후열에 손이 닿지 않아 해골 정리 역할밖에 못 한다.",
    party: {
      name: "후열 집중 화력",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Chirurgeon's Charm"] },
        { hero: "Plague Doctor", skills: ["Plague Grenade", "Noxious Blast", "Battlefield Medicine", "Blinding Gas"], trinkets: ["Blight Stone", "Rotgut Censer"] },
        { hero: "Highwayman", skills: ["Pistol Shot", "Wicked Slice", "Duelist's Advance", "Grapeshot Blast"], trinkets: ["Flashfire Gunpowder"] },
        { hero: "Hellion", skills: ["Iron Swan", "If It Bleeds", "Wicked Hack", "Barbaric YAWP!"], trinkets: ["Warrior's Cap"] }
      ],
      note: "보스가 1·2열에 있을 때는 Wicked Hack·Noxious Blast 로, 3열 이후로 빠지면 Iron Swan·Pistol Shot·Plague Grenade·Judgement 로 전환한다. 치유는 Divine Comfort 로 광역 피해만 메우고 나머지 턴은 전부 공격에 쓴다."
    },
    altParty: {
      name: "대체 파티 (표식 조합)",
      slots: [
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Battlefield Bandage", "Suppressing Fire"], trinkets: ["Vengeful Greaves"] },
        { hero: "Occultist", skills: ["Wyrd Reconstruction", "Vulnerability Hex", "Abyssal Artillery", "Weakening Curse"], trinkets: ["Eldritch Killing Incense"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Target Whistle", "Guard Dog", "Lick Wounds"], trinkets: ["Agility Whistle"] },
        { hero: "Crusader", skills: ["Smite", "Stunning Blow", "Battle Heal", "Zealous Accusation"], trinkets: ["Knight's Crest"] }
      ],
      note: "Vulnerability Hex 나 Target Whistle 로 본체에 표식을 걸고 Sniper Shot 과 Hound's Rush 로 몰아친다. 성전사는 앞에 쌓이는 해골(불경)을 정리하면서 급할 때 Battle Heal 로 보조한다."
    },
    reward: "챔피언 퀘스트 클리어 시 트로피 장신구 Necromancer's Collar (불경 상대 피해 +20%, 치명타 +8%)"
  },

  {
    id: "prophet",
    en: "Prophet", ko: "예언자", alt: ["선지자", "횡설수설하는 예언자"],
    group: "ruins",
    img: "Prophet_Sprite.png",
    type: "불경", size: 1,
    variants: ["Sonorous Prophet (견습)", "Fulminating Prophet (숙련)", "Gibbering Prophet (챔피언)"],
    hp: [105, 158, 215],
    res: { stun: [100, 120, 140], blight: [0, 20, 40], bleed: [0, 20, 40], debuff: [20, 40, 60], move: [300, 320, 340] },
    summary: "4열에 숨어 라운드 시작에 낙석 위치를 예고하고 라운드 끝에 떨어뜨리는 보스. 예고된 열의 피해를 어떻게 흘릴지가 전부다.",
    mech: [
      "예언자는 4열에 고정되고 1~3열은 나무 의자(Pew)가 막고 있다. 끌어올 수 없다(이동 저항 300% 이상).",
      "라운드 시작에 무료 행동 Prognostication 으로 영웅이 아니라 '열' 한두 곳에 표시를 남기고, 라운드 끝에 Rubble of Ruin 으로 그 열을 내리친다(견습 11~23, 챔피언 21~42 피해).",
      "그 사이 일반 행동 1회로 Eye On You(기절 + 스트레스 11) 또는 Fulminate(파티 전체 중독)를 쓴다.",
      "스트레스 50을 넘긴 영웅이 있으면 숙련·챔피언에서 Eye On You 를 쓸 확률이 2~3배로 뛴다.",
      "의자를 부수면 전투 후 추가 보상(Consecrated Pew)이 나오며 셋 다 부수면 최대 7,500골드 상당이다. 예언자를 먼저 잡으면 남은 의자와 보상은 사라진다."
    ],
    strat: [
      "기본은 4열 저격이다. 3명 이상이 4열을 때릴 수 있게 짜고, 중독·출혈 저항이 낮으니 지속 피해도 잘 들어간다.",
      "행동이 라운드당 1회라 약화가 매우 강하다. Intimidate 와 Weakening Curse 를 겹쳐 피해를 깎고 Suppressing Fire 로 명중·치명타를 낮추면 낙석이 거의 아프지 않다.",
      "보호(Guard) 전략도 된다. 중보병(Man-at-Arms)이 Defender 로 표시된 열의 영웅을 감싸면 된다. 단, 보호하는 쪽과 받는 쪽 열이 둘 다 표시되면 둘 다 맞는다.",
      "기절당할 영웅이 매 라운드 나오므로 한 명에게 치유·딜을 몰아두지 말 것. Rallying Flare 로 기절을 풀 수 있다.",
      "의자 보상을 노린다면 셋을 모두 빈사로 만든 뒤 한꺼번에 부순다. 먼저 부수면 예언자가 앞으로 당겨져 후열 대상 스킬이 빗나가기 시작한다.",
      "낙석 직후 중독 틱으로 죽는 사고가 가장 흔하다. 체력이 낮은 영웅은 낙석 전에 미리 채워둘 것."
    ],
    bring: [
      "해독제(Antivenom) 3~4 — Fulminate 가 파티 전체에 중독을 건다",
      "성수(Holy Water) 3 — 저항을 올려 기절·중독을 버틴다",
      "음식 넉넉히 — 전투 전 체력을 가득 채우고 들어갈 것",
      "횃불 넉넉히 — 스트레스 50을 넘기면 기절 공격 빈도가 늘어난다"
    ],
    good: ["Arbalest", "Occultist", "Leper", "Houndmaster", "Hellion", "Man-at-Arms", "Crusader"],
    bad: ["Flagellant"],
    goodWhy: "4열을 때리는 영웅과 보스 피해를 깎는 약화 담당이 핵심이다. 고행자(Flagellant)는 폐허 원정 자체와 상성이 나빠 추천하지 않는다.",
    party: {
      name: "약화 고정 파티",
      slots: [
        { hero: "Arbalest", skills: ["Sniper Shot", "Suppressing Fire", "Battlefield Bandage", "Rallying Flare"], trinkets: ["Vengeful Greaves"] },
        { hero: "Occultist", skills: ["Wyrd Reconstruction", "Weakening Curse", "Vulnerability Hex", "Abyssal Artillery"], trinkets: ["Cursed Incense"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Target Whistle", "Guard Dog", "Lick Wounds"], trinkets: ["Agility Whistle"] },
        { hero: "Leper", skills: ["Intimidate", "Withstand", "Solemnity", "Hew"], trinkets: ["Immunity Mask"] }
      ],
      note: "첫 두 라운드는 Intimidate·Weakening Curse·Suppressing Fire 를 겹쳐 낙석을 무력화하고, 이후 표식을 건 뒤 Sniper Shot 과 Hound's Rush 로 4열을 깎는다. 나병 환자는 약화를 유지하면서 남는 턴에 Hew 로 의자를 긁어 둔다."
    },
    altParty: {
      name: "대체 파티 (4열 속공)",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Chirurgeon's Charm"] },
        { hero: "Grave Robber", skills: ["Thrown Dagger", "Poison Dart", "Flashing Daggers", "Toxin Trickery"], trinkets: ["Quickening Satchel"] },
        { hero: "Highwayman", skills: ["Pistol Shot", "Tracking Shot", "Wicked Slice", "Open Vein"], trinkets: ["Flashfire Gunpowder"] },
        { hero: "Hellion", skills: ["Iron Swan", "If It Bleeds", "Wicked Hack", "Adrenaline Rush"], trinkets: ["Warrior's Cap"] }
      ],
      note: "약화 담당이 없을 때는 버티기보다 빨리 끝낸다. Iron Swan·Pistol Shot·Thrown Dagger·Poison Dart 를 전부 4열에 꽂고, 성녀는 표시된 열의 영웅을 미리 채워 둔다."
    },
    reward: "챔피언 퀘스트 클리어 시 트로피 장신구 Prophet's Eye (4열에서 명중 +15, 속도 +3, 받는 스트레스 -15%). 의자를 부수면 Consecrated Pew 추가 보상"
  },

  {
    id: "hag",
    en: "Hag", ko: "마녀", alt: ["노파", "해그", "쭈그렁 마녀"],
    group: "weald",
    img: "Hag_Sprite.png",
    type: "인간", size: 2,
    variants: ["Wizened Hag (견습)", "Hag (숙련)", "Hag Witch (챔피언)"],
    hp: [66, 99, 135],
    res: { stun: [100, 120, 140], blight: [60, 80, 100], bleed: [20, 40, 60], debuff: [40, 60, 80], move: [200, 220, 240] },
    summary: "영웅 한 명을 솥에 넣고 삶는 보스. 사실상 3명으로 3·4열의 마녀를 얼마나 빨리 녹이느냐의 싸움이다.",
    mech: [
      "마녀는 3·4열, 솥(Cauldron)은 1·2열을 차지하며 둘 다 움직이지 않는다. 마녀는 라운드당 2회 행동한다.",
      "첫 행동으로 Into The Pot! 을 써 영웅 하나를 솥에 넣는다. 솥 안의 영웅은 아무것도 못 하고, 아군이든 마녀든 누가 행동할 때마다 최대 체력의 8.75%씩 잃는다.",
      "솥 속 영웅이 체력 0이 되면 죽지 않고 죽음의 문턱(Death's Door) 상태로 1열에 쏟아져 나온다. 솥의 체력을 0으로 만들어도 꺼낼 수 있지만 마녀가 곧 다른 영웅을 넣는다.",
      "영웅이 솥에 있는 동안 마녀는 Meat Tenderizer(파티 전체 피해), Season to Perfection(명중 -10·피해 -25% 약화 + 스트레스), Taste the Stew(스트레스 + 자가 치유)를 쓴다.",
      "솥에 영웅이 있는 채로 후퇴하면 그 영웅은 사망 처리된다. 마녀를 잡으면 솥 속 영웅은 즉시 풀려난다."
    ],
    strat: [
      "솥은 건드리지 말고 마녀만 친다. 3·4열을 때리는 스킬을 가진 딜러가 최소 3명 필요하다.",
      "누가 잡혀갈지 모르고, 잡혀가면 뒤 영웅들이 한 칸씩 앞으로 당겨진다. 한 칸 밀려도 공격 스킬이 살아 있는 영웅 위주로 짤 것.",
      "출혈 저항이 낮고 2회 행동이라 출혈이 빨리 돈다. 반대로 중독 저항은 높아 역병 의사(Plague Doctor)는 힘을 못 쓴다.",
      "첫 라운드에 If It Bleeds 로 출혈을 걸고 이후에는 Iron Swan 같은 직접 피해로 넘어가는 식으로 2~3라운드 안에 끝내는 것을 목표로 한다.",
      "솥에서 쏟아져 나온 영웅은 죽음의 문턱 상태인데 Meat Tenderizer 가 전체 공격이라 곧바로 위험하다. 치유 한 턴은 항상 남겨 둘 것.",
      "주력 딜러가 잡혀 화력이 크게 꺾일 때만 솥을 쳐서 꺼낸다. 그 외에 솥을 치는 것은 턴 낭비다."
    ],
    bring: [
      "음식 넉넉히 — 전투 직전 전원 체력을 가득 채울 것 (솥 피해가 최대 체력 비례)",
      "붕대(Bandage) 2~3, 해독제(Antivenom) 2~3 — 삼림 길목의 출혈·중독 대비",
      "개 간식(Dog Treats) 1~2 — 사냥개 조련사(Houndmaster)를 데려간다면 보스전 화력용",
      "삽(Shovel) 3 — 삼림은 길을 막는 장애물이 잦다"
    ],
    good: ["Hellion", "Highwayman", "Houndmaster", "Abomination", "Arbalest", "Occultist"],
    bad: ["Vestal", "Plague Doctor", "Crusader", "Antiquarian"],
    goodWhy: "밀려나도 3·4열을 계속 때릴 수 있는 고화력 영웅이 좋다. 성녀(Vestal)는 1열로 쏟아지면 치유를 못 쓰고, 역병 의사는 중독이 막히며, 성전사(Crusader)는 Holy Lance 한 번 쓰면 끝이다.",
    party: {
      name: "출혈 + 표식 속공",
      slots: [
        { hero: "Occultist", skills: ["Wyrd Reconstruction", "Vulnerability Hex", "Abyssal Artillery", "Weakening Curse"], trinkets: ["Sacrifical Cauldron"] },
        { hero: "Highwayman", skills: ["Pistol Shot", "Duelist's Advance", "Tracking Shot", "Grapeshot Blast"], trinkets: ["Flashfire Gunpowder"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Target Whistle", "Guard Dog", "Lick Wounds"], trinkets: ["Agility Whistle"] },
        { hero: "Hellion", skills: ["If It Bleeds", "Iron Swan", "Wicked Hack", "Adrenaline Rush"], trinkets: ["Bleeding Pendant", "Warrior's Cap"] }
      ],
      note: "누가 잡혀가도 나머지 셋이 마녀를 때릴 수 있는 구성이다. 표식을 걸고 Hound's Rush·Pistol Shot 을 집중하며, 신비학자는 쏟아져 나온 영웅을 Wyrd Reconstruction 으로 살리는 데 턴을 아껴 둔다."
    },
    altParty: {
      name: "대체 파티 (표식 저격)",
      slots: [
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Battlefield Bandage", "Blindfire"], trinkets: ["Vengeful Greaves"] },
        { hero: "Bounty Hunter", skills: ["Finish Him", "Mark for Death", "Caltrops", "Flashbang"], trinkets: ["Agility Talon"] },
        { hero: "Grave Robber", skills: ["Thrown Dagger", "Flashing Daggers", "Poison Dart", "Shadow Fade"], trinkets: ["Quickening Satchel"] },
        { hero: "Abomination", skills: ["Transform", "Rage", "Slam", "Absolution"], trinkets: ["Lock of Fury"] }
      ],
      note: "Mark for Death 후 Sniper Shot·Finish Him 으로 터뜨리고, 흉물은 변신해 Rage 로 3열의 마녀를 직접 친다. 석궁사수가 앞으로 밀리면 Blindfire 로 버티다가 한 턴 써서 뒤로 돌아간다."
    },
    reward: "챔피언 퀘스트 클리어 시 트로피 장신구 Hag's Ladle (중독 부여 확률 +30%, 중독 저항 +40%, 질병 저항 +40%)"
  },

  {
    id: "brigand-pounder",
    en: "Brigand Pounder", ko: "산적 대포", alt: ["브리건드 파운더", "도적 대포", "8/12/16 파운더"],
    group: "weald",
    img: "Brigand_Pounder_SP.png",
    type: "철제(Ironwork)", size: 1,
    variants: ["Brigand 8 Pounder (견습)", "Brigand 12 Pounder (숙련)", "Brigand 16 Pounder (챔피언)"],
    hp: [76, 114, 156],
    res: { stun: [200, 220, 245], blight: [200, 220, 245], bleed: [200, 220, 245], debuff: [200, 220, 245], move: [100, 120, 145] },
    summary: "대포 자체는 행동하지 않는다. 불 붙이는 산적(Matchman)을 매 라운드 죽이거나 기절시키지 못하면 파티 전체가 포격을 맞는다.",
    mech: [
      "대포는 2열에 놓이고 나머지 세 칸은 산적들이 채운다. 대포에는 방어(PROT) 20~25%가 있고 기절·출혈·중독·약화가 전혀 통하지 않는다.",
      "대포는 라운드 시작마다 자동 행동 Reinforcements! 로 Matchman 이 없으면 반드시 다시 부르고, 자리가 있으면 일반 산적도 추가한다(종류별 1명 제한).",
      "Matchman 이 Fire in the Hole! 을 쓰면 대포가 즉시 발사한다. BOOOOOOOM! 은 파티 전체에 견습 9~27, 챔피언 17~50 피해와 스트레스 15, MISFIRE! 는 피해 없이 스트레스를 10 낮춰 준다.",
      "발사 확률은 견습 65% / 숙련 70% / 챔피언 75% 이다.",
      "Matchman 은 체력이 8/12/16 뿐이지만 회피가 높고(챔피언 35%), 속도가 매우 낮아 거의 항상 아군 전원보다 늦게 행동한다."
    ],
    strat: [
      "매 라운드 최우선은 Matchman 처리다. 그가 행동하기 전에 죽이거나 기절시키면 그 라운드는 포격이 없다.",
      "Matchman 은 주로 맨 뒤에 서므로 4열을 때릴 수 있는 영웅이 2명 이상, 4열 기절기(Flashbang 또는 Disorienting Blast)가 하나 있으면 안정적이다.",
      "빗나감 한 번이 전멸로 이어질 수 있다. Matchman 담당에게는 명중 장신구를 달고, 첫 타가 빗나갔을 때 받쳐 줄 두 번째 영웅을 남겨 둘 것.",
      "기절은 효율이 좋다. 한 라운드를 통째로 벌어 주므로 그 사이 남는 턴으로 대포와 다른 산적을 친다.",
      "일반 산적은 Cutthroat → Fusilier 순으로 정리한다. Bloodletter 는 살려 두면 그 자리에 더 위험한 산적이 새로 나오지 않는다.",
      "대포는 지속 피해가 안 통하니 직접 피해로만 깎아야 한다. Matchman 에 턴을 너무 쓰면 장기전이 되어 산적에게 말라 죽는다."
    ],
    bring: [
      "붕대(Bandage) 4 — 산적들의 출혈 공격이 계속 들어온다",
      "음식 넉넉히 — 포격 한 방에 대비해 전투 전 체력을 가득 채울 것",
      "약초(Medicinal Herbs) 1~2 — 약화 해제와 길목 골동품용",
      "삽(Shovel) 3 — 삼림 장애물용"
    ],
    good: ["Arbalest", "Bounty Hunter", "Hellion", "Crusader", "Houndmaster", "Plague Doctor", "Grave Robber"],
    bad: [],
    goodWhy: "4열의 Matchman 을 한 방에 잡거나 기절시킬 수 있는 영웅이 핵심이다. 위키 기준으로 특별히 못 쓰는 영웅은 없고, Matchman 대책 유무가 파티의 성패를 가른다.",
    party: {
      name: "Matchman 전담 + 대포 철거",
      slots: [
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Suppressing Fire", "Battlefield Bandage"], trinkets: ["Bull's Eye Bandana"] },
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Chirurgeon's Charm"] },
        { hero: "Bounty Hunter", skills: ["Flashbang", "Collect Bounty", "Mark for Death", "Finish Him"], trinkets: ["Stun Stone"] },
        { hero: "Hellion", skills: ["Iron Swan", "Wicked Hack", "If It Bleeds", "Barbaric YAWP!"], trinkets: ["Warrior's Cap", "Reckless Charm"] }
      ],
      note: "야만인의 Iron Swan 이 Matchman 1순위, 빗나가면 석궁사수의 Sniper Shot 이 마무리한다. 둘 다 불안한 라운드에는 Flashbang 으로 기절시키고, 여유 턴에는 Wicked Hack·Collect Bounty 로 2열의 대포를 친다."
    },
    altParty: {
      name: "대체 파티 (기절 위주)",
      slots: [
        { hero: "Plague Doctor", skills: ["Disorienting Blast", "Blinding Gas", "Plague Grenade", "Battlefield Medicine"], trinkets: ["Witch's Vial"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Target Whistle", "Cry Havoc", "Guard Dog"], trinkets: ["Reckless Charm"] },
        { hero: "Highwayman", skills: ["Pistol Shot", "Wicked Slice", "Grapeshot Blast", "Duelist's Advance"], trinkets: ["Flashfire Gunpowder"] },
        { hero: "Crusader", skills: ["Smite", "Zealous Accusation", "Stunning Blow", "Battle Heal"], trinkets: ["Knight's Crest"] }
      ],
      note: "역병 의사가 Disorienting Blast·Blinding Gas 로 Matchman 을 묶고(Blinding Gas 는 사용 횟수 제한이 있다), 그 사이 Hound's Rush·Pistol Shot 으로 처리한다. 치유가 얇으므로 포격을 한 번이라도 맞으면 다음 라운드는 회복에 쓴다."
    },
    reward: "챔피언 퀘스트 클리어 시 트로피 장신구 Fuseman's Matchstick (속도 +2, 원거리 스킬 피해 +10%, 원거리 치명타 +6%)"
  },

  {
    id: "siren",
    en: "Siren", ko: "세이렌", alt: ["사이렌", "인어", "매혹하는 세이렌"],
    group: "cove",
    img: "Siren_Upright.png",
    type: "이형", size: 2,
    variants: ["Siren (견습)", "Alluring Siren (숙련)", "Beguiling Siren (챔피언)"],
    hp: [119, 179, 244],
    res: { stun: [50, 75, 100], blight: [40, 60, 80], bleed: [60, 80, 100], debuff: [40, 60, 80], move: [25, 45, 65] },
    summary: "아군 한 명을 매혹해 적으로 돌리는 보스. 본체는 약하니, 매혹당해도 위험하지 않은 스킬 구성을 미리 짜 두는 것이 핵심이다.",
    mech: [
      "라운드당 2회 행동한다. 매혹된 영웅이 없으면 첫 행동은 반드시 Song of Desire 로, 영웅 하나를 보통 2라운드 동안 적으로 만든다.",
      "매혹된 영웅은 현재 장착한 스킬만 쓰고 자기 턴마다 스트레스 10을 받는다. 풀려나면 항상 아군 4열로 돌아온다.",
      "Song of Desire 는 약화 저항이 가장 낮은 영웅을 75% 확률로 노리고, 약화 저항이 단독으로 가장 높은 영웅은 대상에서 제외한다. 은신 중인 영웅도 맞는다.",
      "노래는 일반 공격처럼 회피할 수 있고, 맞더라도 30% 확률로 저항한다. 보호(Guard)받는 영웅은 매혹되지 않는다.",
      "두 번째 행동은 Pressure Crash(전체 스트레스 10), Devour(전체 출혈), High Tide(해만 몬스터 소환) 중 하나다. 매혹에 실패하면 소환 확률이 2배가 된다.",
      "매혹된 영웅이 있는 상태로 후퇴하면 그 영웅은 사망한다. 매혹된 영웅에게 치명타를 맞히면 즉시 돌아오지만 본인과 파티가 스트레스를 받는다."
    ],
    strat: [
      "전투 전에 스킬을 점검한다. 매혹당했을 때 아군을 크게 다치게 하거나 세이렌을 치유·강화할 스킬은 빼 둘 것(예: Point Blank Shot, Finale, 비율 치유기).",
      "3명으로 싸우는 것을 전제로, 4열로 돌아와도 바로 쓸 스킬이 있는 영웅 위주로 짠다.",
      "약화 저항으로 대상을 조종할 수 있다. 매혹당해도 무해한 영웅의 약화 저항을 가장 낮게 두고, 지켜야 할 영웅에게는 성수(Holy Water)를 써서 저항을 올린다.",
      "회피·방어 없이 체력만 많은 보스다. 중독 저항이 낮고 2회 행동이라 중독이 매우 잘 돈다. 출혈은 저항이 높아 비효율적이다.",
      "표식·약화는 2회 행동 때문에 금방 풀리니 매 라운드 다시 걸어야 한다. 광역기는 매혹된 아군까지 때릴 수 있으니 주의.",
      "매혹된 영웅이나 소환된 Pelagic Guardian 이 세이렌을 보호하면 기절로 끊는다. 소환수보다 세이렌 본체를 먼저 잡는 것이 낫다."
    ],
    bring: [
      "성수(Holy Water) 3~4 — 약화 저항을 올려 매혹 대상을 조절",
      "붕대(Bandage) 3~4 — Devour 의 전체 출혈과 해만 일반 적 대비",
      "약초(Medicinal Herbs) 2 — 해만 골동품과 약화 해제용",
      "삽(Shovel) 3~4 — 해만은 장애물(조개 더미)이 많다",
      "음식·횃불 넉넉히"
    ],
    good: ["Plague Doctor", "Arbalest", "Houndmaster", "Occultist", "Antiquarian", "Man-at-Arms"],
    bad: ["Hellion", "Jester", "Abomination", "Flagellant"],
    goodWhy: "매혹당해도 아군에게 큰 피해를 못 주고, 4열로 돌아와도 제 역할을 하는 영웅이 좋다. 야만인·광대·흉물은 매혹되면 아군을 순식간에 죽음의 문턱으로 보내고, 고행자의 비율 치유는 세이렌 체력을 크게 되돌린다.",
    party: {
      name: "중독 + 표식 안정 파티",
      slots: [
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Battlefield Bandage", "Blindfire"], trinkets: ["Vengeful Greaves"] },
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Plague Grenade", "Battlefield Medicine", "Disorienting Blast"], trinkets: ["Blight Stone", "Rotgut Censer"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Target Whistle", "Guard Dog", "Blackjack"], trinkets: ["Agility Whistle"] },
        { hero: "Man-at-Arms", skills: ["Crush", "Rampart", "Defender", "Bolster"], trinkets: ["Debuff Charm"] }
      ],
      note: "역병 의사가 매 라운드 중독을 쌓고, 조련사가 표식을 걸면 석궁사수가 저격한다. 중보병은 Defender 로 역병 의사를 감싸 매혹을 막고, 반격기 Retribution 은 일부러 빼 둔다(매혹된 아군이 맞고 큰 피해를 입는다)."
    },
    altParty: {
      name: "대체 파티 (핵심 영웅이 없을 때)",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Debuff Charm"] },
        { hero: "Occultist", skills: ["Vulnerability Hex", "Sacrifical Stab", "Abyssal Artillery", "Weakening Curse"], trinkets: ["Eldritch Killing Incense"] },
        { hero: "Bounty Hunter", skills: ["Collect Bounty", "Mark for Death", "Flashbang", "Finish Him"], trinkets: ["Agility Talon"] },
        { hero: "Crusader", skills: ["Smite", "Stunning Blow", "Battle Heal", "Inspiring Cry"], trinkets: ["Knight's Crest"] }
      ],
      note: "표식 후 Collect Bounty 로 큰 피해를 넣는 구성이다. 신비학자는 매혹되면 세이렌을 치유할 수 있으니 Wyrd Reconstruction 을 빼고 성녀에게 치유를 맡긴다. Flashbang 은 피해 없이 매혹된 아군을 멈춰 세울 때 쓴다."
    },
    reward: "챔피언 퀘스트 클리어 시 트로피 장신구 Siren's Conch (약화 저항 +50%, 받는 스트레스 -20%)"
  },

  {
    id: "drowned-crew",
    en: "Drowned Crew", ko: "익사한 선원들", alt: ["수몰된 선원들", "가라앉은 선원들", "드라운드 크루"],
    group: "cove",
    img: "Drowned_Crew.png",
    type: "불경", size: 3,
    variants: ["Sodden Crew (견습)", "Sunken Crew (숙련)", "Drowned Crew (챔피언)"],
    hp: [100, 150, 205],
    res: { stun: [50, 70, 90], blight: [20, 40, 60], bleed: [60, 80, 100], debuff: [20, 40, 60], move: [200, 220, 240] },
    summary: "닻잡이(Anchorman)가 1열 영웅을 닻으로 묶으면 누가 행동하든 선원들이 회복한다. 닻잡이를 얼마나 빨리 처리하느냐가 승부다.",
    mech: [
      "선원 셋은 세 칸을 차지하는 하나의 적이다. 라운드 시작마다 무료 행동 All Hands on Deck! 으로 2~4열 영웅 하나를 1열로 끌어오고 Drowned Anchorman 을 소환한다.",
      "Anchorman 의 유일한 스킬 Heave to! 가 맞으면 1열 영웅이 닻에 묶인다. 묶인 영웅은 공격은 할 수 있지만 이동할 수 없다.",
      "묶여 있는 동안 아군·적 누구든 행동할 때마다 묶인 영웅은 스트레스 6을 받고 선원들은 최대 체력의 2.5/3/3.5%를 회복한다.",
      "닻은 Anchorman 을 죽이거나, 묶인 영웅의 스트레스가 100 또는 200에 닿으면 풀린다. Anchorman 을 기절시키는 것으로는 이미 걸린 닻이 풀리지 않는다.",
      "Anchorman 은 등장 시 방어·출혈/중독 저항 +50%, 기절 저항 +25% 버프를 갖고 있고, 닻을 거는 데 성공하면 이 버프가 선원들에게 넘어가며 자신은 체력을 전부 회복한다.",
      "Heave to! 는 회피할 수 있다. 묶인 영웅이 있는 채로 후퇴하면 그 영웅은 사망한다."
    ],
    strat: [
      "Anchorman 은 매우 느려 보통 라운드 마지막에 행동한다. 그 전에 기절시키거나, 닻이 걸렸다면 다음 라운드 첫 턴에 빠른 딜러로 즉시 죽인다.",
      "Anchorman 은 버프 때문에 기절 저항이 높다(챔피언 95%). 기절로 막으려면 기절 확률 장신구가 필수다.",
      "닻이 걸리기 전 Anchorman 에게 준 피해는 닻 성공 시 전부 회복되니, 어중간하게 깎지 말고 '기절' 또는 '닻이 걸린 뒤 한 번에 처치' 중 하나로 정할 것.",
      "매 라운드 누군가 1열로 끌려오므로 어느 열에서든 쓸 스킬이 있는 영웅으로 짠다. 3·4열 전용 영웅은 끌려오면 한 턴을 날린다.",
      "선원 본체는 회피·방어가 낮고 중독에 약하다. Anchorman 만 통제되면 금방 쓰러진다. 출혈은 저항이 높아 비효율적.",
      "회피가 높은 영웅을 1열에 세워 Heave to! 자체를 흘리는 방법도 있다."
    ],
    bring: [
      "붕대(Bandage) 3~4 — Boarding Clutch 출혈과 해만 일반 적 대비",
      "성수(Holy Water) 2~3 — 약화 저항 보강 및 해만 골동품용",
      "약초(Medicinal Herbs) 2 — Mutiny 의 피해 감소 약화 해제",
      "삽(Shovel) 3~4, 음식·횃불 넉넉히"
    ],
    good: ["Highwayman", "Grave Robber", "Crusader", "Occultist", "Plague Doctor", "Bounty Hunter", "Houndmaster"],
    bad: ["Vestal", "Flagellant"],
    goodWhy: "빠르고 1열 순간 화력이 좋거나, 강한 기절기를 가졌거나, 끌려와도 제 역할을 하는 영웅이 좋다. 성녀는 끌려오면 거의 아무것도 못 하고 기절도 약하며, 고행자의 출혈은 해만 적에게 잘 막힌다.",
    party: {
      name: "Anchorman 즉시 처리",
      slots: [
        { hero: "Occultist", skills: ["Wyrd Reconstruction", "Vulnerability Hex", "Abyssal Artillery", "Weakening Curse"], trinkets: ["Evasion Incense"] },
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Plague Grenade", "Battlefield Medicine", "Emboldening Vapours"], trinkets: ["Blight Stone", "Rotgut Censer"] },
        { hero: "Highwayman", skills: ["Wicked Slice", "Pistol Shot", "Duelist's Advance", "Grapeshot Blast"], trinkets: ["Stalwart Buckle"] },
        { hero: "Crusader", skills: ["Smite", "Stunning Blow", "Battle Heal", "Inspiring Cry"], trinkets: ["Paralyzer's Crest"] }
      ],
      note: "성전사가 Stunning Blow 로 Anchorman 을 묶거나 Smite 로 치고, 노상강도가 Wicked Slice 로 마무리한다. 역병 의사는 선원들에게 중독을 쌓고, 신비학자가 1열로 끌려오면 Hands from the Abyss 로 바꿔 끼워 둔 구성도 고려할 만하다."
    },
    altParty: {
      name: "대체 파티 (핵심 영웅이 없을 때)",
      slots: [
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Plague Grenade", "Blinding Gas", "Battlefield Medicine"], trinkets: ["Blight Stone"] },
        { hero: "Bounty Hunter", skills: ["Collect Bounty", "Mark for Death", "Finish Him", "Come Hither"], trinkets: ["Agility Talon"] },
        { hero: "Grave Robber", skills: ["Pick to the Face", "Thrown Dagger", "Poison Dart", "Shadow Fade"], trinkets: ["Quickening Satchel"] },
        { hero: "Man-at-Arms", skills: ["Crush", "Rampart", "Defender", "Bolster"], trinkets: ["Stun Stone"] }
      ],
      note: "속도가 빠른 도굴꾼이 라운드 첫 턴에 Anchorman 을 찌르고 현상금 사냥꾼이 Collect Bounty 로 끝낸다. 중보병은 Rampart 로 기절을 노리고, 끌려온 영웅은 한 턴 써서 자리로 돌아가기보다 그 자리에서 쓸 수 있는 스킬을 먼저 쓴다."
    },
    reward: "챔피언 퀘스트 클리어 시 트로피 장신구 Crew's Bell (이동 저항 +50%, 받는 치유량 +20%)"
  },

  {
    id: "swine-prince",
    en: "Swine Prince", ko: "돼지 왕자", alt: ["스와인 프린스", "돼지 왕", "돼지 신", "윌버"],
    group: "warrens",
    img: "Swine_Prince_Sprite.png",
    type: "야수", size: 3,
    variants: ["Swine Prince (견습)", "Swine King (숙련)", "Swine God (챔피언)"],
    hp: [132, 198, 271],
    res: { stun: [100, 120, 140], blight: [0, 20, 40], bleed: [0, 20, 40], debuff: [20, 40, 60], move: [100, 120, 140] },
    summary: "작은 돼지 Wilbur 가 표식을 찍으면 왕자가 그 영웅을 박살 낸다. Wilbur 는 절대 때리지 말고 왕자만 잡는다.",
    mech: [
      "왕자가 1~3열, Wilbur 가 4열을 차지한다.",
      "Wilbur 는 End This One / End These Two 로 영웅 한두 명에게 표식(Mark)을 찍고, 왕자는 표식 대상에게 피해가 2배인 Obliterate Body / Obliterate Masses 를 쓴다. 표식이 없으면 훨씬 약한 Wild Flailing 을 쓴다.",
      "Wilbur 에게 피해를 주는 공격을 하면 왕자가 즉시 Enraged Destruction(파티 전체 피해 + 기절)으로 보복한다. 이 보복은 왕자가 기절 상태여도 나간다.",
      "Wilbur 가 죽으면 왕자는 매 라운드 Enraged Destruction 을 쓴다.",
      "숙련·챔피언에서는 Wilbur 가 라운드 시작마다 무료 행동 Bit 'o Squeal 로 영웅을 기절시킨다.",
      "왕자를 잡으면 퀘스트는 완료된다. 남은 Wilbur 는 전체 기절기 Squeal 만 쓰며, 잡지 않고 떠나도 보상은 받는다."
    ],
    strat: [
      "4열을 건드리는 스킬은 전부 빼고 간다(Iron Swan, Plague Grenade, Abyssal Artillery, Hound's Harry, 반격기 등). 실수 한 번이 전체 기절로 돌아온다.",
      "정석은 약화다. Intimidate 와 Weakening Curse 를 겹치면 왕자의 피해를 0 가까이 떨어뜨릴 수 있다.",
      "석궁사수(Arbalest)의 Rallying Flare 는 아군의 표식과 기절을 지운다. 단 자기 자신의 표식은 못 지우니, 석궁사수가 찍히면 보호(Guard)나 치유로 받쳐 줄 것.",
      "피해를 주지 않는 기절기(Flashbang, Blinding Gas, Disorienting Blast)는 Wilbur 에게 써도 보복이 없다. 표식을 한 라운드 막는 용도로 유용하다.",
      "왕자는 체력이 매우 많지만 방어가 없고 출혈·중독 저항이 낮다. 피해만 억제하면 지속 피해와 표식 딜로 무난히 잡힌다.",
      "왕자를 잡은 뒤에야 Wilbur 를 친다. 순서를 바꾸면 매 라운드 전체 공격을 맞는다."
    ],
    bring: [
      "음식 넉넉히 — 사육장은 길고, 전투 전 체력을 가득 채워야 한다",
      "붕대(Bandage) 2~3, 해독제(Antivenom) 2 — 사육장 일반 적 대비",
      "약초(Medicinal Herbs) 3 — 사육장 골동품 정화와 질병 예방",
      "개 간식(Dog Treats) 1~2 — 조련사를 데려간다면 보스전 화력용",
      "삽(Shovel) 2~3"
    ],
    good: ["Arbalest", "Leper", "Occultist", "Houndmaster", "Bounty Hunter", "Hellion", "Abomination"],
    bad: ["Antiquarian"],
    goodWhy: "표식을 지우는 석궁사수와 피해를 깎는 나병 환자·신비학자가 정석 조합이고, 나머지 한 자리는 야수 상대 보너스가 있는 조련사 같은 딜러가 좋다. 골동품상은 화력이 없고 회피 버프도 왕자의 높은 명중 앞에서 효과가 작다.",
    party: {
      name: "표식 해제 + 약화",
      slots: [
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Rallying Flare", "Battlefield Bandage"], trinkets: ["Vengeful Greaves"] },
        { hero: "Occultist", skills: ["Wyrd Reconstruction", "Weakening Curse", "Vulnerability Hex", "Sacrifical Stab"], trinkets: ["Cursed Incense"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Target Whistle", "Guard Dog", "Lick Wounds"], trinkets: ["Agility Whistle"] },
        { hero: "Leper", skills: ["Chop", "Intimidate", "Withstand", "Solemnity"], trinkets: ["Immunity Mask"] }
      ],
      note: "첫 라운드에 Intimidate 와 Weakening Curse 로 피해를 깎고, 표식이 찍히면 Rallying Flare 로 지운다. 이후 왕자에게 표식을 걸고 Sniper Shot·Hound's Rush·Chop 으로 깎는다. Sniper Shot 과 Hound's Rush 의 대상이 4열(Wilbur)이 아닌지 매번 확인할 것."
    },
    altParty: {
      name: "대체 파티 (핵심 영웅이 없을 때)",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Chirurgeon's Charm"] },
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Blinding Gas", "Battlefield Medicine", "Emboldening Vapours"], trinkets: ["Blight Stone"] },
        { hero: "Bounty Hunter", skills: ["Collect Bounty", "Mark for Death", "Finish Him", "Flashbang"], trinkets: ["Beast Slayer's Ring"] },
        { hero: "Hellion", skills: ["Wicked Hack", "Bleed Out", "If It Bleeds", "Adrenaline Rush"], trinkets: ["Bleeding Pendant"] }
      ],
      note: "피해를 못 깎는 대신 Flashbang 과 Blinding Gas 로 Wilbur 를 재워 표식을 줄이고 성녀가 받아낸다. 왕자에게 출혈·중독을 겹친 뒤 Mark for Death + Collect Bounty 로 마무리한다."
    },
    reward: "챔피언 퀘스트 클리어 시 트로피 장신구 Wilbur's Flag (기절 저항 +50%, 회피 +10)"
  },

  {
    id: "flesh",
    en: "Flesh", ko: "살덩이", alt: ["육괴", "형체 없는 살덩이", "플레시"],
    group: "warrens",
    img: "Flesh_Head.png",
    type: "이형", size: 4,
    variants: ["Inchoate Flesh (견습)", "Unstable Flesh (숙련)", "Formless Flesh (챔피언)"],
    hp: [100, 152, 204],
    res: { move: [200, 220, 240] },   // 나머지 저항은 부위마다 다르다 (mech 참고)
    summary: "네 칸을 채운 부위가 매 라운드 무작위로 바뀌고 체력은 하나로 공유한다. 방어가 높으니 지속 피해와 광역기로 녹인다.",
    mech: [
      "네 열 모두를 부위가 차지하고 라운드가 바뀔 때마다 무작위로 변형한다. 같은 부위가 여러 개 나올 수도 있다. 부위마다 라운드당 1회 행동하며 체력은 전부 공유한다.",
      "Head(머리): 방어 50~70%. Maws of Life 로 아군 1·2열에 가장 큰 피해와 출혈을 준다.",
      "Bone(뼈): 방어 70~90%로 가장 단단하고 가장 느리다. Bone Zephyr 로 아무 열이나 기절시킨다. 중독에 약하다.",
      "Heart(심장): 방어 0%, 저항도 거의 없다. 가장 빠르며 Sanguine Stroke 로 1열 부위를 치유한다.",
      "Butt(엉덩이): 방어 30~50%. Undulating Invasion 으로 아군 3·4열에 큰 피해와 중독을 주고 치명타 확률이 가장 높다.",
      "모든 부위는 이동 효과가 사실상 통하지 않는다."
    ],
    strat: [
      "체력이 공유되므로 어느 부위를 치든 같다. 방어를 무시하는 출혈·중독을 여러 부위에 동시에 거는 광역기가 가장 효율적이다(Hound's Harry, Plague Grenade, Beast's Bile 등).",
      "직접 피해를 쓸 때는 방어 0%인 Heart 를 노린다. Heart 가 닿는 열에 없으면 Target Whistle 같은 방어 감소 약화를 먼저 건다.",
      "Head 와 Butt 의 치명타 한 방에 죽음의 문턱까지 갈 수 있고, 뒤따르는 출혈·중독 틱이 마무리를 짓는다. 지속 피해는 걸리는 즉시 해제할 것.",
      "기절 해제 수단(Rallying Flare)이나 기절 저항 장신구가 있으면 Bone 으로 인한 턴 손실이 줄어든다.",
      "성녀·신비학자의 치유로는 피해량을 따라가지 못한다. 치유 전담보다 공격하면서 응급 처치가 되는 영웅이 낫다.",
      "후열이 약한 파티는 Butt 가 여럿 뜨는 라운드에 무너진다. 3·4열에도 체력이 넉넉한 영웅을 세울 것."
    ],
    bring: [
      "붕대(Bandage) 4 — Maws of Life 출혈",
      "해독제(Antivenom) 4 — Undulating Invasion 중독",
      "음식 넉넉히 — 전투 전 체력을 가득 채울 것",
      "약초(Medicinal Herbs) 3 — 사육장 골동품과 질병 대비",
      "개 간식(Dog Treats) 1~2 — 조련사 동행 시"
    ],
    good: ["Plague Doctor", "Houndmaster", "Arbalest", "Leper", "Abomination", "Flagellant", "Shieldbreaker"],
    bad: ["Vestal", "Occultist"],
    goodWhy: "여러 부위에 지속 피해를 한 번에 거는 영웅과 방어를 무시·감소시키는 영웅이 좋다. 성녀는 화력이 없고 치유가 피해를 못 따라가며, 신비학자는 체력이 낮고 약화·기절이 이 전투에서 쓸모가 적다.",
    party: {
      name: "광역 지속 피해",
      slots: [
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Battlefield Bandage", "Rallying Flare"], trinkets: ["Vengeful Greaves"] },
        { hero: "Plague Doctor", skills: ["Plague Grenade", "Noxious Blast", "Battlefield Medicine", "Blinding Gas"], trinkets: ["Blight Stone", "Rotgut Censer"] },
        { hero: "Houndmaster", skills: ["Hound's Harry", "Target Whistle", "Hound's Rush", "Guard Dog"], trinkets: ["Bleed Stone"] },
        { hero: "Leper", skills: ["Chop", "Hew", "Revenge", "Solemnity"], trinkets: ["Fortunate Armlet"] }
      ],
      note: "매 라운드 Hound's Harry 와 Plague Grenade·Noxious Blast 로 출혈·중독을 겹친다. Target Whistle 로 방어를 깎은 부위나 Heart 에는 Sniper Shot 과 Chop 을 꽂고, 출혈·중독·기절은 Battlefield Medicine 과 Rallying Flare 로 바로 푼다."
    },
    altParty: {
      name: "대체 파티 (핵심 영웅이 없을 때)",
      slots: [
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Battlefield Bandage", "Rallying Flare"], trinkets: ["Vengeful Greaves"] },
        { hero: "Bounty Hunter", skills: ["Mark for Death", "Collect Bounty", "Finish Him", "Caltrops"], trinkets: ["Agility Talon"] },
        { hero: "Abomination", skills: ["Beast's Bile", "Manacles", "Transform", "Rage"], trinkets: ["Padlock of Transference"] },
        { hero: "Crusader", skills: ["Smite", "Zealous Accusation", "Battle Heal", "Stunning Blow"], trinkets: ["Knight's Crest"] }
      ],
      note: "Mark for Death 로 방어를 깎은 부위를 Sniper Shot·Collect Bounty 로 치고, 흉물은 Beast's Bile 로 2·3열에 중독을 건다. 위험할 때는 변신해 자가 회복하면서 Rage 로 앞쪽의 Heart 를 노린다."
    },
    reward: "챔피언 퀘스트 클리어 시 트로피 장신구 Flesh's Heart (출혈 저항 +50%, 최대 체력 +15%)"
  },

  {
    id: "shambler",
    en: "Shambler", ko: "섐블러", alt: ["비틀거리는 자", "어기적거리는 것", "셈블러", "비척이"],
    group: "wandering",
    img: "Shambler.png",
    type: "이형", size: 2,
    variants: ["Shambler (견습)", "Grotesque Shambler (숙련)", "Abhorrent Shambler (챔피언)"],
    hp: [77, 116, 158],
    res: { stun: [100, null, null], blight: [40, null, null], bleed: [40, null, null], debuff: [40, null, null], move: [50, null, null] },
    summary: "완전한 어둠 속에서 나타나 파티를 뒤섞고 촉수를 끝없이 불러내는 방랑 보스. 본체보다 촉수 관리가 더 중요하다.",
    how: "밝기 0으로 이동 중일 때 복도 전투가 섐블러로 바뀔 수 있다(견습 1% / 숙련 8% / 챔피언 12%). 또는 복도의 Shambler's Altar 에 횃불(Torch)을 쓰면 직접 소환된다(밝기가 0이 된다).",
    mech: [
      "섐블러가 살아 있는 동안 밝기는 0으로 고정되어 횃불이나 스킬로 올릴 수 없다. 적의 피해·치명타·명중이 오르고 아군이 받는 스트레스도 크게 늘어난다.",
      "전투는 항상 기습으로 시작해 아군 대열이 뒤섞인다.",
      "Obdurous Advancement(전체 출혈)와 Undulating Withdrawal(전체 중독)은 쓸 때마다 Shambler Tentacle 2마리를 소환한다. 공격이 빗나가도 소환된다.",
      "촉수는 Clapperclaw 로 한 명에게 피해와 스트레스 10을 주고, 맞힐 때마다 스스로 명중 +20, 치명타 +5%, 피해 +50%, 속도 +3, 방어 +25% 버프를 쌓는다. 표식이 있는 영웅을 우선 노린다.",
      "촉수가 하나라도 살아 있으면 Stentorious Lament(전체 스트레스 + 대열 뒤섞기)를 쓸 수 있다.",
      "본체를 잡아도 촉수는 사라지지 않는다. 남은 촉수까지 정리해야 전투가 끝난다."
    ],
    strat: [
      "퀘스트 목표를 먼저 끝낸 뒤에 소환한다. 전투 후 파티 상태가 크게 나빠지는 경우가 많다.",
      "어차피 섞이므로 소환 전에 대열을 일부러 가장 나쁜 순서로 바꿔 두면 섞였을 때 손해를 덜 본다. 어느 열에서든 싸울 수 있는 영웅 위주로 짤 것.",
      "보통 한 라운드는 촉수 → 아군 → 섐블러 순으로 돈다. 촉수를 직접 피해로 죽이면 같은 라운드에 다시 소환되지만, 출혈·중독으로 죽게 두면 다음 라운드 시작에 죽어 한 턴을 벌 수 있다.",
      "첫 라운드에 본체를 기절시키면 촉수 2마리의 소환을 막는다. 저항이 높으므로 기절·출혈·중독 모두 확률 장신구를 달아야 믿을 만하다.",
      "반격(Riposte)이 매우 강하다. 섐블러의 공격이 전부 전체 공격이라 매번 발동한다.",
      "촉수는 버프가 쌓이기 전에 잡는다. Rake·Hew 같은 광역기는 갓 소환된 촉수를 한 번에 정리하기 좋고, 3번쯤 버프를 쌓은 촉수는 방어가 높아져 처리하기 매우 어렵다.",
      "죽음의 문턱에서 전체 출혈·중독으로 죽는 패턴이 가장 흔하다. 붕대·해독제를 아끼지 말 것."
    ],
    bring: [
      "붕대(Bandage) 3~4 — 전체 출혈 대응",
      "해독제(Antivenom) 3~4 — 전체 중독 대응",
      "성수(Holy Water) 2~3 — 저항 보강",
      "횃불(Torch) 여분 1 — 제단 소환용, 그리고 전투가 끝난 뒤 밝기를 다시 올릴 용도"
    ],
    good: ["Abomination", "Crusader", "Highwayman", "Plague Doctor", "Occultist", "Houndmaster", "Man-at-Arms"],
    bad: ["Leper", "Vestal"],
    goodWhy: "대열이 섞여도 싸울 수 있고 기절·지속 피해·반격을 가진 영웅이 좋다. 나병 환자는 뒤로 밀리면 아무것도 못 하고, 성녀는 화력이 낮고 기절도 잘 안 들어가 피해 자체를 줄이는 데 도움이 못 된다.",
    party: {
      name: "열 무관 대응 파티",
      slots: [
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Plague Grenade", "Battlefield Medicine", "Disorienting Blast"], trinkets: ["Blight Stone", "Witch's Vial"] },
        { hero: "Occultist", skills: ["Wyrd Reconstruction", "Sacrifical Stab", "Vulnerability Hex", "Weakening Curse"], trinkets: ["Eldritch Killing Incense"] },
        { hero: "Highwayman", skills: ["Duelist's Advance", "Wicked Slice", "Pistol Shot", "Open Vein"], trinkets: ["Stalwart Buckle"] },
        { hero: "Crusader", skills: ["Smite", "Stunning Blow", "Battle Heal", "Inspiring Cry"], trinkets: ["Paralyzer's Crest"] }
      ],
      note: "노상강도는 Duelist's Advance 로 반격을 켜 두고, 역병 의사는 갓 소환된 촉수에 중독을 걸어 다음 라운드에 죽게 한다. 성전사는 느린 속도를 살려 섐블러 뒤에 행동하며 새 촉수를 Stunning Blow 로 묶는다. 뒤로 밀리는 것이 걱정되면 Inspiring Cry 대신 Holy Lance 를 넣는다."
    },
    altParty: {
      name: "대체 파티 (표식 폭딜)",
      slots: [
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Battlefield Bandage", "Blindfire"], trinkets: ["Vengeful Greaves"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Target Whistle", "Hound's Harry", "Guard Dog"], trinkets: ["Bleed Stone"] },
        { hero: "Abomination", skills: ["Transform", "Rake", "Rage", "Manacles"], trinkets: ["Lock of Fury"] },
        { hero: "Man-at-Arms", skills: ["Crush", "Rampart", "Retribution", "Bolster"], trinkets: ["Stun Stone"] }
      ],
      note: "흉물이 야수 형태의 Rake 로 촉수를 혼자 정리하는 동안, 나머지는 Target Whistle 로 방어를 깎고 표식을 건 본체에 Sniper Shot·Hound's Rush 를 몰아넣는다. 중보병은 Retribution 으로 반격을 유지한다."
    },
    reward: "선조(Ancestor's) 장신구 5종 중 하나 (Ancestor's Bottle / Candle / Map / Scroll / Tentacle Idol). 난이도와 무관하게 드롭되며, 전부 모은 뒤에는 보석을 준다"
  },

  {
    id: "the-collector",
    en: "The Collector", ko: "수집가", alt: ["컬렉터", "수집자", "더 콜렉터"],
    group: "wandering",
    img: "The_Collector.png",
    type: "인간/이형", size: 1,
    variants: ["The Collector (견습)", "The Collector (숙련)", "The Collector (챔피언)"],
    hp: [70, 98, 137],
    res: { stun: [50, null, null], blight: [20, null, null], bleed: [20, null, null], debuff: [20, null, null], move: [25, null, null] },
    summary: "수집한 머리(Collected)를 불러내 싸우게 하는 방랑 보스. 본체는 약하지만 Collected Highwayman 의 한 방이 매우 아프다.",
    how: "소지품 칸이 13칸 이상(약 79%) 차 있을 때 복도 전투로 낮은 확률(난이도별 3% / 4% / 5%)로 등장한다.",
    mech: [
      "첫 턴에 거의 반드시 Collect Call 로 Collected 3마리를 소환한다. Collected Highwayman 은 최대 2마리, Vestal 과 Man-at-Arms 는 각 1마리까지다.",
      "Collected Highwayman 의 Headhunt 는 어느 열이든 큰 피해(챔피언 10~20)와 출혈을 주고 치명타도 잦다. 표식이 있는 영웅을 3배 더 자주 노린다.",
      "Collected Man-at-Arms 는 Head Games 로 수집가나 Highwayman 을 보호(Guard)하고, Head Knocker 로 기절을 건다.",
      "Collected Vestal 은 Headache(명중 +10, 치명타 +10%, 피해 +50% 버프)와 Headstrong(치유)을 주로 수집가와 Highwayman 에게 쓴다.",
      "수집가 본인은 Show Collection(1·2열 스트레스)과 Life Steal(3·4열 피해 + 출혈 + 표식, 자가 치유)을 쓴다. Collected 가 줄어들수록 Collect Call 을 다시 쓸 확률이 올라간다.",
      "수집가가 죽으면 Collected 도 전부 사라진다."
    ],
    strat: [
      "소환수를 계속 부르며 4열로 밀려나므로 후열 화력이 필요하다. 이동 저항이 낮아 끌어오는 것도 방법이다.",
      "첫 턴에 수집가가 행동하기 전에 기절시키면 소환이 한 턴 늦어져 전투가 크게 쉬워진다. 기절 저항이 보스치고 낮다.",
      "Collected Highwayman 이 나오면 즉시 기절시키거나 죽인다. Headhunt 치명타 + 출혈 한 틱을 버티려면 영웅 체력이 견습 20 / 숙련 26 / 챔피언 34 이상이어야 안전하다.",
      "Life Steal 로 표식이 찍힌 후열 영웅은 Headhunt 의 표적이 된다. 그 영웅 체력을 우선 채워 둘 것.",
      "Man-at-Arms 가 보호를 걸면 그를 기절시켜 끊는다. Vestal 의 버프가 Highwayman 에게 들어갔다면 그 Highwayman 을 최우선으로 처리한다.",
      "언제 나올지 몰라 대비가 어렵다. 체력·스트레스가 나쁜 상태에서 만났다면 후퇴도 고려한다."
    ],
    bring: [
      "붕대(Bandage) 2~3 — Headhunt 와 Life Steal 의 출혈",
      "음식 여유분 — 만나기 전 평소 체력을 높게 유지하는 것이 최선의 대비",
      "소지품을 13칸 미만으로 유지하면 등장 자체를 피할 수 있다"
    ],
    good: ["Plague Doctor", "Hellion", "Highwayman", "Arbalest", "Occultist", "Bounty Hunter", "Houndmaster"],
    bad: [],
    goodWhy: "후열을 때릴 수 있는 딜러와 기절기를 가진 영웅이 있으면 어떤 파티로도 잡을 수 있다. 후열 화력과 기절이 모두 없는 파티만 고전한다.",
    party: {
      name: "범용 균형 파티",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Chirurgeon's Charm"] },
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Plague Grenade", "Blinding Gas", "Battlefield Medicine"], trinkets: ["Witch's Vial", "Blight Stone"] },
        { hero: "Highwayman", skills: ["Pistol Shot", "Wicked Slice", "Duelist's Advance", "Grapeshot Blast"], trinkets: ["Flashfire Gunpowder"] },
        { hero: "Hellion", skills: ["Wicked Hack", "Iron Swan", "Barbaric YAWP!", "If It Bleeds"], trinkets: ["Warrior's Cap"] }
      ],
      note: "수집가가 뒤로 빠지면 Blinding Gas 로 후열을, Barbaric YAWP! 로 전열의 Collected 를 묶는다. Highwayman 머리부터 정리한 뒤 Iron Swan·Pistol Shot·Plague Grenade·Judgement 로 4열의 본체를 집중 공격한다."
    },
    altParty: {
      name: "대체 파티 (끌어오기)",
      slots: [
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Battlefield Bandage", "Suppressing Fire"], trinkets: ["Vengeful Greaves"] },
        { hero: "Occultist", skills: ["Wyrd Reconstruction", "Daemon's Pull", "Vulnerability Hex", "Abyssal Artillery"], trinkets: ["Cursed Incense"] },
        { hero: "Bounty Hunter", skills: ["Collect Bounty", "Come Hither", "Flashbang", "Mark for Death"], trinkets: ["Stun Stone"] },
        { hero: "Crusader", skills: ["Smite", "Stunning Blow", "Zealous Accusation", "Battle Heal"], trinkets: ["Knight's Crest"] }
      ],
      note: "Daemon's Pull 이나 Come Hither 로 수집가를 앞으로 끌어내 Smite·Collect Bounty 로 친다. Flashbang 은 뒤쪽의 Collected Highwayman 을 재우는 데 쓴다."
    },
    reward: "3/4 확률로 Puzzling Trapezohedron(3,500골드 상당), 1/4 확률로 머리 장신구 하나 (Dismas' Head / Barristan's Head / Junia's Head, 각 1개만 획득 가능)"
  },

  {
    id: "fanatic",
    en: "Fanatic", ko: "광신도", alt: ["광신자", "퍼내틱", "흡혈귀 사냥꾼"],
    group: "wandering",
    img: "Fanatic_Stand.png",
    type: "인간", size: 2,
    variants: ["Fanatic (견습)", "Fanatic (숙련)", "Fanatic (챔피언)"],
    hp: [99, 149, 203],
    res: { stun: [45, 65, 85], blight: [80, 100, 120], bleed: [45, 65, 85], debuff: [35, 55, 75], move: [55, 75, 95] },
    summary: "진홍빛 저주에 걸린 영웅을 쫓아오는 Crimson Court DLC 방랑 보스. 라운드당 3회 행동하며 영웅을 화형대에 묶는다.",
    how: "Crimson Court DLC 전용. 감염 수준(Infestation)이 중간 이상이 되어 마을 이벤트로 등장이 예고된 뒤, 진홍빛 저주(Crimson Curse)에 걸린 영웅이 2명 이상인 파티를 던전에 보내면 확률적으로 나타난다(2~3명: 중간 20% / 높음 33%, 4명: 75%). 등장이 확정되면 던전 로딩 화면이 광신도 전용 화면으로 바뀐다. 보스 퀘스트·안뜰(Courtyard)·가장 어두운 던전에는 나오지 않는다.",
    mech: [
      "항상 기습으로 시작해 대열이 뒤섞인다. 광신도 옆 두 칸은 화형대(Pyre)가 차지한다.",
      "라운드당 3회 행동하고, 방어 15%가 있다. 스킬을 쓸 때마다 앞뒤로 크게 이동한다.",
      "Sentence Rendered 가 맞으면 영웅이 화형대에 묶여 지속 피해를 받고, 죽음의 문턱에 이르면 1열로 풀려난다. 이 스킬은 회피할 수 있고, 빗나가면 그 라운드에는 다시 시도하지 않는다.",
      "화형대는 한 번 깎인 체력이 회복되지 않는다. 화형대를 부수면 화형은 사라지지만 매 라운드 첫 행동이 Fury of the Righteous(파티 전체 피해 + 스트레스, 앞 열일수록 큰 피해)로 바뀐다.",
      "Holy Stake(출혈 + 속도 감소, 표식·저주 대상에게 추가 피해), Brand the Tainted(표식 + 공포), Strike the Heretic(기절 + 밀치기 + 스트레스 15) 등을 섞어 쓴다.",
      "화형대에 영웅이 묶인 채 후퇴하면 그 영웅은 사망하고 장신구도 잃는다. 후퇴해도 다음 전투에서 다시 쫓아오며, 완전히 벗어나려면 퀘스트를 포기해야 한다."
    ],
    strat: [
      "3회 행동이라 지속 피해가 한 라운드에 세 번 돈다. 출혈이 가장 효율적이고, 중독은 저항이 높아 잘 안 걸린다.",
      "반대로 기절·약화·표식은 행동 횟수 때문에 금방 풀려 효율이 낮다.",
      "반격(Riposte)이 강하다. 행동이 많아 자주 발동하고, 화형대를 부순 뒤에는 전체 공격에 매번 반응한다.",
      "방어 15%를 무시하는 Pick to the Face 같은 관통기도 좋다.",
      "화형대를 둘지 부술지 먼저 정한다. 두는 경우 풀려난 영웅을 즉시 치유할 준비가, 부수는 경우 전체 피해와 스트레스를 버틸 준비가 필요하다.",
      "준비되지 않은 파티로 만났다면 퀘스트 포기가 손해를 줄이는 길이다. 저주 걸린 영웅을 한 파티에 2명 이상 넣지 않는 것이 가장 확실한 회피법."
    ],
    bring: [
      "붕대(Bandage) 3~4 — Holy Stake 의 강한 출혈",
      "음식 넉넉히 — 화형에서 풀려난 영웅 회복 및 전투 전 체력 유지",
      "성수(Holy Water) 2 — 저항 보강",
      "혈액(The Blood) — 저주 걸린 영웅을 데려간다면 필수 관리 물자"
    ],
    good: ["Highwayman", "Man-at-Arms", "Hellion", "Grave Robber", "Bounty Hunter", "Vestal", "Flagellant"],
    bad: ["Plague Doctor", "Occultist", "Arbalest", "Houndmaster"],
    goodWhy: "반격·출혈·방어 관통을 가진 영웅과 인간 상대 보너스가 있는 현상금 사냥꾼이 좋다. 역병 의사는 중독이 막히고, 신비학자·석궁사수·조련사는 약화·표식·기절이 3회 행동에 금방 풀려 제값을 못 한다.",
    party: {
      name: "출혈 + 반격",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Chirurgeon's Charm"] },
        { hero: "Grave Robber", skills: ["Lunge", "Pick to the Face", "Thrown Dagger", "Flashing Daggers"], trinkets: ["Quickening Satchel"] },
        { hero: "Highwayman", skills: ["Duelist's Advance", "Wicked Slice", "Pistol Shot", "Open Vein"], trinkets: ["Bleed Stone"] },
        { hero: "Hellion", skills: ["Wicked Hack", "If It Bleeds", "Iron Swan", "Bleed Out"], trinkets: ["Bleeding Pendant"] }
      ],
      note: "노상강도는 Duelist's Advance 로 반격을 유지하고, If It Bleeds·Open Vein 으로 출혈을 겹친다. 광신도가 앞으로 뛰어들면 Wicked Hack·Pick to the Face, 뒤로 빠지면 Iron Swan·Pistol Shot 으로 따라간다. 기습으로 성녀가 앞에 섰다면 첫 턴에 자리부터 되찾을 것."
    },
    altParty: {
      name: "대체 파티 (화형대 철거)",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Chirurgeon's Charm"] },
        { hero: "Bounty Hunter", skills: ["Collect Bounty", "Finish Him", "Come Hither", "Flashbang"], trinkets: ["Man Slayer's Ring"] },
        { hero: "Man-at-Arms", skills: ["Retribution", "Crush", "Defender", "Bolster"], trinkets: ["Longevity Eyepatch"] },
        { hero: "Leper", skills: ["Chop", "Hew", "Withstand", "Solemnity"], trinkets: ["Fortunate Armlet"] }
      ],
      note: "나병 환자의 높은 피해로 화형대를 먼저 부수고, 이후 전체 공격에는 중보병의 Retribution 반격으로 응수한다. 나병 환자가 기습으로 뒤에 밀리면 복귀에 턴이 드는 것이 약점이다."
    },
    reward: "진홍빛 저주 관련 장신구(Ancestor's Vintage, Coven Signet 등)와 보석. 저주를 즉시 치료하는 소모품 The Cure 를 떨어뜨리기도 한다"
  },

  {
    id: "thing-from-the-stars",
    en: "Thing From The Stars", ko: "별에서 온 것", alt: ["별에서 온 괴물", "별의 존재", "씽 프롬 더 스타즈"],
    group: "wandering",
    img: "The Thing.png",
    type: "이형", size: 2,
    variants: ["Thing from the Stars (견습)", "Thing from the Stars (숙련)", "Thing from the Stars (챔피언)"],
    hp: [106, 148, 191],
    res: { stun: [85, null, null], blight: [40, null, null], bleed: [33, null, null], debuff: [40, null, null], move: [25, null, null] },
    summary: "Color of Madness DLC 방랑 보스. 체력이 45% 아래로 떨어지면 방어 +80%를 얻으므로, 2페이즈를 지속 피해나 방어 감소로 넘기는 것이 관건이다.",
    how: "Color of Madness DLC 전용. 농장(Farmstead) 첫 원정을 마친 뒤부터 매주 한 지역을 배회하며, 출정 화면 지도에 아이콘으로 표시된다. 그 지역의 원정(보스 퀘스트 포함)에서 50% 확률로 복도 전투로 추가된다. 안뜰과 가장 어두운 던전에는 나오지 않는다.",
    mech: [
      "2라운드부터 매 라운드 시작에 무료 행동 Return to the Stars 를 쓴다: Crystalline Aberration 1마리 소환, 파티 전체 스트레스, 자신의 출혈·중독 해제, 자신에게 소량 피해.",
      "Return to the Stars 사용 시점에 체력이 45% 미만이면 전투가 끝날 때까지 방어 +80%, 속도 +6, 피해 +40%, 치명타 +13% 버프를 얻는다.",
      "그 뒤 라운드당 일반 행동 2회. Vorpal Strike 는 어느 열이든 큰 피해, Phase Gnaw 는 1·2열에 방어 관통 피해와 매우 강한 중독(견습 5, 챔피언 7)을 주고 질병 Sky Taint 를 옮길 수 있다.",
      "Paralysing Shard(기절), Weakening Shard(저항 -20%), Transfixing Shard(속도·피해 감소)는 모두 스트레스 11을 동반하며 한 라운드에 같은 것을 두 번 쓰지 않는다.",
      "기절 저항이 가장 낮은 영웅에게 Paralysing Shard 를, 스트레스가 높은 영웅에게 Phase Gnaw 를 우선 쓴다.",
      "Crystalline Aberration 은 살려 두면 자폭해 파티에 큰 피해와 스트레스를 준다."
    ],
    strat: [
      "2페이즈 대책이 없으면 싸우지 않는다. 지도에 표시된 지역을 피하거나, 정찰로 전투가 2개 겹친 복도를 발견하면 돌아가는 것이 안전하다.",
      "지속 피해는 방어를 무시한다. 다만 라운드 시작에 해제되므로 보스의 첫 행동보다 먼저 걸어야 2틱이 들어간다. 속도가 빠른 영웅이 맡을 것.",
      "방어 감소도 좋다. Target Whistle 은 약화 확률이 높고 지속이 길어 겹쳐 걸기 쉬우며 표식까지 붙는다.",
      "Pick to the Face 처럼 방어를 무시하는 공격도 2페이즈에서 유효하다. 다만 초반에는 피해량 자체가 낮은 편이다.",
      "매 라운드 한 턴은 Crystalline Aberration 처리에 써야 한다. 방치하면 자폭으로 손해가 훨씬 크다.",
      "고급 요령: 보스의 두 번째 행동 뒤에 기절을 넣으면 다음 라운드의 Return to the Stars 와 첫 행동이 모두 건너뛰어진다. 느린 영웅에게 높은 기절 확률을 실어야 가능하다.",
      "1·2열 영웅은 중독 저항과 체력이 높아야 한다. Phase Gnaw 의 중독을 방치하면 2~3틱 만에 죽음의 문턱에 닿는다."
    ],
    bring: [
      "해독제(Antivenom) 4 이상 — Phase Gnaw 의 중독이 게임 내 최고 수준",
      "성수(Holy Water) 3 — Weakening Shard 로 깎인 저항 보강",
      "약초(Medicinal Herbs) 2 — Transfixing Shard 약화 해제",
      "음식 넉넉히 — 전투 전 체력을 가득 채울 것"
    ],
    good: ["Plague Doctor", "Houndmaster", "Grave Robber", "Bounty Hunter", "Flagellant", "Shieldbreaker", "Arbalest"],
    bad: [],
    goodWhy: "빠른 지속 피해 영웅(역병 의사, 고행자), 방어를 깎는 조련사, 방어를 무시하는 도굴꾼·방패 파괴자가 2페이즈의 해답이다. 현상금 사냥꾼의 Caltrops 는 속도를 깎고 지속 피해를 키워 준다.",
    party: {
      name: "중독 + 방어 감소",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Chirurgeon's Charm"] },
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Plague Grenade", "Battlefield Medicine", "Disorienting Blast"], trinkets: ["Blight Stone", "Poisoned Herb"] },
        { hero: "Houndmaster", skills: ["Target Whistle", "Hound's Rush", "Hound's Harry", "Guard Dog"], trinkets: ["Debuff Stone"] },
        { hero: "Crusader", skills: ["Smite", "Stunning Blow", "Battle Heal", "Inspiring Cry"], trinkets: ["Blight Charm"] }
      ],
      note: "역병 의사가 매 라운드 가장 먼저 중독을 걸고, 조련사는 Target Whistle 을 두 번 겹친 뒤 Hound's Rush 로 친다. 성전사는 소환된 Crystalline Aberration 을 Smite 로 정리하고, 성녀는 스트레스가 쌓인 전열을 우선 살핀다."
    },
    altParty: {
      name: "대체 파티 (방어 관통)",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Chirurgeon's Charm"] },
        { hero: "Grave Robber", skills: ["Pick to the Face", "Thrown Dagger", "Poison Dart", "Lunge"], trinkets: ["Blighting Satchel"] },
        { hero: "Bounty Hunter", skills: ["Caltrops", "Collect Bounty", "Mark for Death", "Finish Him"], trinkets: ["Blight Charm"] },
        { hero: "Crusader", skills: ["Smite", "Stunning Blow", "Battle Heal", "Inspiring Cry"], trinkets: ["Blight Charm"] }
      ],
      note: "1페이즈는 Mark for Death + Collect Bounty 와 Lunge 로 빠르게 깎고, 2페이즈에 들어가면 도굴꾼이 Pick to the Face 와 Poison Dart 로 방어를 무시한다. Caltrops 로 보스 속도를 낮춰 아군이 먼저 행동하게 만든다."
    },
    reward: "혜성 파편(Comet Shard) 15 / 20 / 25개와 골드, 파티원 한 명에게 프리즘 기벽(Prismatic Quirk). 숙련(1/7)·챔피언(1/5) 확률로 전용 장신구(Thing's Mesmerizing Eye, Crystalline Fang, Phase Shifting Hide, Prismatic Heart Crystal 등)가 추가로 나온다"
  },

  {
    id: "shrieker",
    en: "Shrieker", ko: "비명새", alt: ["울부짖는 자", "슈리커", "절규하는 새", "까마귀"],
    group: "event",
    img: "The Shrieker.png",
    type: "이형/야수", size: 2,
    variants: ["Callous Shrieker (견습)", "Cretinous Shrieker (숙련)", "Horrid Shrieker (챔피언)"],
    hp: [75, 113, 154],
    res: { stun: [55, 75, 95], blight: [200, 220, 240], bleed: [55, 75, 95], debuff: [30, 50, 70], move: [55, 75, 95] },
    summary: "잃어버린 장신구를 물어 간 거대한 새. 잡을 필요 없이 4라운드만 버티면 퀘스트가 성공한다.",
    how: "잃어버린 장신구(전멸 등으로 분실)가 8개 이상 쌓이면 삼림(Weald)에 전용 원정이 생기고, 완료할 때마다 8개를 돌려받는다. 42주차 이후 마을 이벤트 'A Thief in the Night' 로 장신구 8개를 도둑맞았을 때, 15주차 이후 이벤트 'Shrieker's Prize'(그 주에만 유효, 항상 챔피언) 때도 원정이 열린다. 원정 난이도는 분실한 장신구의 최고 희귀도에 따라 정해진다.",
    mech: [
      "원정은 방 하나짜리이며 출발하자마자 전투가 시작된다. 비명새와 둥지(Shrieker's Nest)가 각각 두 칸씩 차지한다.",
      "회피가 매우 높고(견습 40%, 챔피언 62.5%) 한 라운드에 여러 번 행동한다. 중독은 사실상 면역이다.",
      "Peck(큰 피해 + 출혈), Caw(한 명에게 스트레스 20~25), Call the Murder(전체 스트레스 + 자신 속도 증가), Regurgitate(명중 -15 약화, 낮은 확률로 질병)를 쓰며, 스킬에 따라 둥지와 자리를 바꾼다.",
      "4라운드의 마지막 행동으로 Shrieking Flight 를 써 파티 전체에 스트레스 40 / 45 / 50 을 주고 날아간다. 그 순간 전투가 끝나고 퀘스트는 성공 처리된다.",
      "둥지는 행동하지 않는다. 비명새가 있는 동안 부수면 Trapezohedron 을 준다(견습 1, 숙련 1~3, 챔피언 3~5). 둥지는 출혈·중독에 면역이다."
    ],
    strat: [
      "목표는 '4라운드 생존'이다. 비명새를 잡아도 추가 보상은 없고 마지막 스트레스 공격을 피하는 이득뿐이다.",
      "돈이 목적이면 회피 0%인 둥지에 화력을 모은다. 비명새가 떠나면 둥지도 사라지므로 4라운드 안에 부숴야 한다.",
      "스트레스가 낮은 영웅으로 출발한다. 전투 중 스트레스와 마지막 Shrieking Flight 가 겹쳐 붕괴(Affliction)에 빠지기 쉽다.",
      "보호(Guard)로 집중 공격받는 영웅을 감싸고, 반격(Riposte)을 켜 두면 여러 번 행동하는 만큼 자주 발동한다.",
      "굳이 잡으려면 명중 버프·장신구가 필수다. 여러 번 행동해 약화가 금방 풀리므로 새의 회피를 깎기보다 아군 명중을 올리는 편이 쉽다.",
      "보급은 붕대·성수·약초 정도면 충분하다. 음식과 횃불에 돈을 쓸 필요가 없다."
    ],
    bring: [
      "붕대(Bandage) 2~3 — Peck 의 출혈",
      "성수(Holy Water) 2 — 저항 보강",
      "약초(Medicinal Herbs) 2 — Regurgitate 의 명중 약화 해제",
      "그 외 보급품은 불필요 (방 하나, 전투 한 번)"
    ],
    good: ["Man-at-Arms", "Leper", "Highwayman", "Arbalest", "Houndmaster", "Jester", "Antiquarian"],
    bad: ["Plague Doctor"],
    goodWhy: "튼튼하거나 아군을 보호할 수 있는 영웅, 반격을 가진 영웅, 스트레스를 풀어 주는 영웅이 좋다. 역병 의사는 비명새와 둥지 모두 중독이 통하지 않아 할 일이 없다.",
    party: {
      name: "4라운드 버티기 + 둥지 철거",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Chirurgeon's Charm"] },
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Battlefield Bandage", "Rallying Flare"], trinkets: ["Vengeful Greaves"] },
        { hero: "Highwayman", skills: ["Duelist's Advance", "Pistol Shot", "Wicked Slice", "Grapeshot Blast"], trinkets: ["Stalwart Buckle"] },
        { hero: "Man-at-Arms", skills: ["Defender", "Retribution", "Bolster", "Crush"], trinkets: ["Longevity Eyepatch"] }
      ],
      note: "중보병은 Bolster 로 회피를 올리고 체력이 낮은 영웅을 Defender 로 감싼다. 석궁사수와 노상강도는 빗나갈 일이 없는 둥지를 때려 보상을 챙기고, 반격은 덤으로 새를 깎는다. 4라운드가 끝나면 자동으로 성공이다."
    },
    altParty: {
      name: "대체 파티 (스트레스 관리형)",
      slots: [
        { hero: "Jester", skills: ["Battle Ballad", "Inspiring Tune", "Dirk Stab", "Solo"], trinkets: ["Lucky Dice"] },
        { hero: "Houndmaster", skills: ["Guard Dog", "Hound's Rush", "Target Whistle", "Cry Havoc"], trinkets: ["Agility Whistle"] },
        { hero: "Hellion", skills: ["Wicked Hack", "If It Bleeds", "Barbaric YAWP!", "Adrenaline Rush"], trinkets: ["Warrior's Cap"] },
        { hero: "Leper", skills: ["Chop", "Hew", "Withstand", "Solemnity"], trinkets: ["Healing Armlet"] }
      ],
      note: "치유 담당이 없는 대신 4라운드만 버티면 된다는 점을 이용한다. 광대의 Inspiring Tune 과 조련사의 Cry Havoc 으로 스트레스를 눌러 두고, 조련사는 Guard Dog 으로 광대를 지킨다. 전열 둘은 앞에 온 대상(새 또는 둥지)을 친다."
    },
    reward: "잃어버린 장신구 8개 회수, 까마귀 기벽(Corvid Quirk) 획득 기회. 'Shrieker's Prize' 이벤트 원정은 전용 장신구(Callous Talon, Distended Crowseye, Molted Tailfeather, Molted Wingfeather 등)를 준다. 둥지를 부수면 Trapezohedron 추가"
  },

  {
    id: "vvulf",
    en: "Vvulf", ko: "불프", alt: ["산적 두목 불프", "브리건드 불프", "울프", "뷜프"],
    group: "event",
    img: "Vvulf.png",
    type: "인간", size: 1,
    variants: ["Brigand Vvulf (챔피언 전용)"],
    hp: [null, null, 160],
    res: { stun: [null, null, 100], blight: [null, null, 75], bleed: [null, null, 75], debuff: [null, null, 60], move: [null, null, 300] },
    summary: "마을을 습격하는 산적 두목. 폭탄이 떨어질 열을 예고하므로 그 열의 영웅을 중보병이 보호해 주면 된다.",
    how: "40주차 이후, 레벨 5 영웅이 4명 이상일 때 마을 이벤트 'Brigand Incursion' 이 발생하면 퀘스트 'Wolves at the Door' 가 열린다(기본 12%, 다른 마을 이벤트가 일어날 때마다 +3%). 퀘스트를 무시하면 건물 업그레이드 3개가 파괴된다. 도전했다가 실패하는 경우에는 파괴되지 않는다.",
    mech: [
      "라운드당 2회 행동하고 회피 20%, 방어 0%. 주로 2~3열에 서며 이동시킬 수 없다(이동 저항 300%).",
      "폭탄 통(Barrel O' Bombs)이 있으면 라운드 시작에 무료 행동 Bombs Away 로 아군의 한 '열'에 폭탄을 놓고, 라운드 끝에 Time's Up! 으로 터뜨려 그 열의 영웅에게 23~45 피해를 준다. 이 폭발은 회피할 수 없다.",
      "폭발 전에 폭탄 통을 부수면 그 라운드의 폭탄은 무효가 된다. 다만 통은 죽지 않을 만큼 맞을 때마다 반격(Riposte)을 하고, 불프가 Get Them! 으로 곧 다시 꺼낸다.",
      "Get Them! 은 통과 Brigand Raider 를 소환하고 영웅 하나를 기절시킬 수 있다. 통이 없으면 매 턴 이 스킬을 쓴다.",
      "Tower Shield 로 부하를 보호(Guard)하면서 높은 확률로 Raider 를 추가 소환하고, Warcry 로 한두 명에게 스트레스를 준다.",
      "짧은 퀘스트라 야영이 없다. 지도 구조는 항상 같고 보스 방까지 전투가 여러 번 이어진다. 퀘스트를 포기하면 파티원 한 명이 죽는다."
    ],
    strat: [
      "중보병(Man-at-Arms)이 Defender 로 폭탄이 놓인 열의 영웅을 감싸는 것이 정석이다. 회피로는 폭탄을 피할 수 없어 사냥개 조련사의 보호는 효과가 떨어진다.",
      "폭탄 통은 반격 때문에 가급적 건드리지 않는다. 부술 생각이라면 강한 공격으로 한두 방에 끝낼 것.",
      "불프가 부하를 보호하면 그 부하를 공격한 것이 불프에게 들어간다. 불프가 뒤에 있어도 전열 딜러가 칠 수 있는 기회다.",
      "회피가 있으니 명중 장신구나 버프를 챙긴다. 출혈·중독 저항이 같아(75%) 어느 쪽이든 쓸 수 있지만 확률 장신구가 필요하다.",
      "보스보다 가는 길이 문제다. 야영이 없으므로 음식으로 전투 사이 체력을 채우고, 산적들의 출혈에 대비해 붕대를 최대로 들고 간다.",
      "양옆 곁방에는 선조 장신구가 있을 수 있지만 전투가 늘어난다. 불프를 잡은 뒤 여력이 있으면 들를 것.",
      "자신 없으면 도전하지 않는 것도 선택이다. 도중 포기 시 한 명을 잃으므로, 최정예로 가거나 아예 건물 피해를 감수한다."
    ],
    bring: [
      "붕대(Bandage) 최대치 — 산적들의 출혈이 끊임없이 들어온다",
      "음식 넉넉히 — 야영이 없어 전투 사이 회복 수단이 음식뿐이다",
      "삽(Shovel) 넉넉히 — 길목 장애물 대비",
      "횃불 넉넉히 — 스트레스 관리"
    ],
    good: ["Man-at-Arms", "Arbalest", "Bounty Hunter", "Hellion", "Leper", "Occultist", "Crusader"],
    bad: ["Antiquarian"],
    goodWhy: "중보병은 폭탄을 대신 맞아 주는 사실상 필수 영웅이고, 나머지는 체력이 높고 인간 상대 화력이 좋은 영웅으로 채운다. 골동품상은 회피 버프가 폭탄에 통하지 않고 화력도 낮다.",
    party: {
      name: "폭탄 받아내기",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Tome of Holy Healing"] },
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Battlefield Bandage", "Suppressing Fire"], trinkets: ["Bull's Eye Bandana"] },
        { hero: "Man-at-Arms", skills: ["Defender", "Crush", "Bolster", "Rampart"], trinkets: ["Heavy Boots", "Longevity Eyepatch"] },
        { hero: "Hellion", skills: ["Wicked Hack", "If It Bleeds", "Iron Swan", "Bleed Out"], trinkets: ["Bleeding Pendant", "Reckless Charm"] }
      ],
      note: "라운드 시작에 폭탄이 놓인 열을 확인하고 중보병이 그 영웅에게 Defender 를 건다(자기 열이면 그대로 맞는다). 석궁사수는 표식 후 Sniper Shot 으로 불프를 저격하고, 야만인은 2~3열의 불프를 If It Bleeds 로, 불프가 1열 부하를 보호하면 Bleed Out 으로 터뜨린다."
    },
    altParty: {
      name: "대체 파티 (중보병이 없을 때)",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Tome of Holy Healing"] },
        { hero: "Occultist", skills: ["Wyrd Reconstruction", "Weakening Curse", "Vulnerability Hex", "Sacrifical Stab"], trinkets: ["Cursed Incense"] },
        { hero: "Houndmaster", skills: ["Guard Dog", "Hound's Rush", "Target Whistle", "Lick Wounds"], trinkets: ["Protection Stone", "Health Stone"] },
        { hero: "Leper", skills: ["Chop", "Hew", "Withstand", "Solemnity"], trinkets: ["Fortunate Armlet"] }
      ],
      note: "조련사가 Guard Dog 으로 폭탄을 대신 맞되, 회피가 통하지 않으니 방어·체력 장신구를 달고 성녀가 곧바로 채워 준다. Weakening Curse 로 피해를 깎고, 나병 환자는 앞에 쌓이는 Raider 를 Hew 로 정리하며 보호받는 부하를 쳐서 불프에게 피해를 넘긴다."
    },
    reward: "퀘스트 완료 시 트로피 장신구 Vvulf's Tassle (표식 상대 피해 +20%·명중 +10, 크기 2 이상 적 상대 치명타 +5%)"
  }
];
