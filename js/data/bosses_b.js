// DLC(안뜰·농장) 및 가장 어두운 던전 보스 공략 데이터.
// 수치 출처: Darkest Dungeon Wiki (darkestdungeon.wiki.gg). 공략 문장은 직접 작성.
// party.slots 는 4열(맨 뒤) → 1열(맨 앞) 순서.
const BOSSES_B = [
  // ───────────────────────── 안뜰 (Crimson Court) ─────────────────────────
  {
    id: "crocodilian",
    en: "Crocodilian", ko: "악어", alt: ["크로커딜리언", "악어 괴물", "크로코딜리안"],
    group: "courtyard",
    quest: "Burn the Hives 를 비롯한 안뜰(Courtyard) 주요 원정 전반 — 지도에 해골 표시가 뜨지 않는 준보스",
    img: "Crocodilian.png",
    type: "흡혈귀(Bloodsucker)", size: 1,
    hp: [109, 164, 223],
    res: { stun: [50, 70, 90], blight: [80, 100, 120], bleed: [50, 70, 90], debuff: [75, 95, 115], move: [35, 55, 75] },
    summary: "라운드당 2회 행동. 가운데 열에서 잠수(Submerge)한 뒤 쓰는 Apex Predator 한 방이 핵심 위협이라, 1열이나 4열로 계속 밀고 당겨 잠수 자체를 막는 싸움이다.",
    prep: [
      "원정 미리보기와 미니맵에 표시되지 않으므로, 안뜰 원정은 항상 이 전투를 치를 수 있는 파티로 출발한다. 견습 난이도 첫 원정에서도 나온다.",
      "안뜰은 밝기가 '핏빛(Bloodlight)'으로 고정되어 스트레스가 더 쌓이고 출혈 저항이 낮아진다. 붕대(Bandage)를 넉넉히 챙길 것.",
      "횃불(Torch)은 밝기 대신 그 전투 동안 파티 명중 +3 을 준다. 회피가 오른 악어를 상대할 때 써먹을 수 있다.",
      "이동(Move)과 기절(Stun) 수단을 한 명에게만 맡기지 말고 2~3명에게 나눠 들린다. 행동 순서가 꼬이면 한 명만으로는 제때 끊지 못한다."
    ],
    mech: [
      "첫 라운드는 항상 Swarming Corruption(파티 전체 피해 + 명중 약화 + 스트레스) 후 Lurking Fear(가운데 열로 이동, 피해·방어 강화)를 쓴다. 이후는 무작위.",
      "Teeth Rake: 1~3열에 있을 때 사용. 우리 2~4열 한 명에게 피해 + 출혈 + 앞으로 끌어당김(견습·숙련 2칸, 챔피언 3칸).",
      "Submerge: 2~3열에 있을 때만 사용. 체력을 회복하고 회피가 크게 오른다(+35/+45/+55). 챔피언에서는 출혈·중독까지 지운다.",
      "Apex Predator: Submerge 뒤에만 사용 가능. 명중·치명타가 매우 높고 여러 명을 동시에 때려 죽음의 문턱으로 보낸다.",
      "양옆의 식물(Bulrush, Cattail)은 행동하지 않지만 사실상 무적인 자리 채우기라, 빈칸을 만들어 위치를 고정하는 방법은 통하지 않는다.",
      "약화·중독 저항은 높고, 출혈·기절·이동 저항은 상대적으로 낮다."
    ],
    strat: [
      "목표는 악어를 1열 또는 4열에 묶어 두는 것. 가운데(2~3열)에 있으면 즉시 2칸 이동기로 밀거나 당긴다(Uppercut, Come Hither, Daemon's Pull 등).",
      "이동이 실패했거나 이미 가운데에 섰다면 기절로 그 행동을 날린다. 느린 영웅의 라운드 막바지 기절은 다음 라운드에 다시 옮길 시간을 벌어 준다.",
      "Submerge 를 허용했다면 회피가 올라 공격이 빗나가기 쉽다. 그 라운드는 회복과 보호(Guard)로 Apex Predator 를 받아낼 준비를 한다.",
      "1열과 4열 양쪽을 모두 때릴 수 있게 편성한다. 한쪽만 칠 수 있으면 악어가 반대편에 있을 때 손이 논다.",
      "Teeth Rake 로 진형이 계속 끌려 나오므로, 어느 열에서도 제 역할을 하는 영웅이 유리하다. 위치 의존이 큰 후열 영웅은 보호로 고정한다.",
      "출혈로 죽음의 문턱에 선 아군은 즉시 치유하거나 붕대로 출혈을 제거한다."
    ],
    bring: [
      "붕대(Bandage): Teeth Rake 의 출혈 대응. 안뜰 전반에서 계속 쓰인다.",
      "횃불(Torch): 전투 중 사용하면 파티 명중 +3. Swarming Corruption 의 명중 약화를 일부 상쇄한다.",
      "혈액(The Blood): 핏빛 저주(Crimson Curse)에 걸린 영웅 관리용. 안뜰 원정의 필수품.",
      "성수(Holy Water): 저항 보강 겸 Damned Fountain 상호작용용."
    ],
    good: ["Bounty Hunter", "Occultist", "Plague Doctor", "Houndmaster", "Crusader", "Shieldbreaker", "Flagellant"],
    bad: ["Arbalest"],
    goodWhy: "2칸 이동기와 기절을 가진 영웅, 그리고 끌려 나와도 싸울 수 있는 영웅이 좋다. 석궁사수는 1열을 못 쏘고 끌려 나오면 기술 대부분이 막힌다.",
    party: {
      name: "밀고 당기기 파티",
      slots: [
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Plague Grenade", "Disorienting Blast", "Battlefield Medicine"], trinkets: ["Blasphemous Vial", "Dazzling Mirror"] },
        { hero: "Occultist", skills: ["Wyrd Reconstruction", "Daemon's Pull", "Sacrifical Stab", "Weakening Curse"], trinkets: ["Cursed Incense"] },
        { hero: "Bounty Hunter", skills: ["Collect Bounty", "Uppercut", "Come Hither", "Mark for Death"], trinkets: ["Unmovable Helmet"] },
        { hero: "Crusader", skills: ["Smite", "Stunning Blow", "Battle Heal", "Inspiring Cry"], trinkets: ["Paralyzer's Crest"] }
      ],
      note: "악어가 2~3열에 서면 현상금 사냥꾼의 Uppercut(뒤로 밀기)·Come Hither(앞으로 당기기)와 신비학자의 Daemon's Pull 로 양 끝에 보낸다. 실패하면 역병 의사의 Disorienting Blast 나 성전사의 Stunning Blow 로 행동을 끊는다. 역병 의사는 Battlefield Medicine 으로 출혈을 지운다."
    },
    altParty: {
      name: "보호 + 끌어오기 파티 (방패 파괴자 포함)",
      slots: [
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Plague Grenade", "Disorienting Blast", "Battlefield Medicine"], trinkets: ["Blasphemous Vial", "Dazzling Mirror"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Guard Dog", "Cry Havoc", "Target Whistle"], trinkets: ["Protective Collar"] },
        { hero: "Occultist", skills: ["Hands from the Abyss", "Daemon's Pull", "Wyrd Reconstruction", "Sacrifical Stab"], trinkets: ["Demon's Cauldron"] },
        { hero: "Shieldbreaker", skills: ["Pierce", "Puncture", "Adder's Kiss", "Serpent Sway"], trinkets: ["Dancer's Footwraps"] }
      ],
      note: "사냥개 조련사가 Guard Dog 로 역병 의사를 보호해 끌려 나오지 않게 한다. 방패 파괴자의 Puncture 는 어느 열에서든 악어를 앞으로 당기고, 신비학자는 Hands from the Abyss 기절과 Daemon's Pull 로 보조한다."
    },
    reward: "처치 시 세트 장신구(방패 파괴자 전용 제외) 1개 확정 드랍. Endless Harvest 에 나오는 개체는 전리품이 없다."
  },
  {
    id: "baron",
    en: "Baron", ko: "남작", alt: ["바론", "배런"],
    group: "courtyard",
    quest: "Morbid Entertainment — 숙련(Lv3) 에픽 길이 안뜰 원정의 최종 보스",
    img: "Baron.png",
    type: "흡혈귀(Bloodsucker)", size: 1,
    hp: [233],
    res: { stun: [87], blight: [85], bleed: [55], debuff: [60], move: [85] },
    summary: "알 4개 중 하나에 숨어 3막에 걸쳐 싸우는 보스. 알이 하나라도 남아 있으면 치유 스킬을 쓸 수 없고, 정체를 드러낸 뒤에는 라운드당 3회 행동한다.",
    prep: [
      "에픽 원정은 입장·재입장마다 초대장(Invitation) 1장을 쓴다. 대신 스트레스 벌점 없이 떠났다가 같은 자리에서 이어갈 수 있다(1주 경과).",
      "장작이 지급되지 않는다. 삽(Shovel)으로 Wine Crate 를 열어 장작을 구해야 야영할 수 있다.",
      "지도가 처음부터 보이지 않고 방에 들어가야 주변이 드러난다. 혈액(The Blood)·붕대·음식을 넉넉히 챙기고, 만능 열쇠는 상자 속 장신구를 일반 전리품으로 바꿔 버리므로 가져가지 않는다.",
      "보스전 중 치유가 막히므로 회피(DODGE)와 반격(Riposte) 위주로 편성한다. 보스 직전에 야영해 체력·스트레스를 채우고 강화를 걸어 둘 것.",
      "핏빛(Bloodlight)은 밝기 100 으로 취급된다. 밝을 때 발동하는 장신구(Camouflage Cloak, Sun Cloak 등)가 항상 켜진다."
    ],
    mech: [
      "The Show Begins: 시작하자마자 알(Pulsating Egg)을 하나 더 만들고 그중 하나에 숨은 뒤 위치를 섞는다. 알은 피해를 주는 공격 한 번이면 깨지고, 안에서 Sycophant·Supplicant 또는 남작이 나온다.",
      "알이 하나라도 있으면 파티는 치유 스킬을 사용할 수 없다. 흉물의 Transform 도 치유로 취급되어 막힌다.",
      "남작이 숨어 있는 동안 한 라운드라도 알을 깨지 않으면 Guests of Honor 로 모든 알이 한꺼번에 터진다.",
      "알을 깬 공격은 안의 적에게 피해·표식을 주지 못하지만 출혈·중독·이동·기절은 걸릴 수 있다. 나온 적은 그 라운드에는 행동하지 않는다.",
      "남작 체력이 66% 이하(153)로 라운드를 시작하면 The Second Act, 33% 이하(76)면 The Third Act: 기존 적을 모두 치우고 알 4개를 새로 깔아 다시 숨는다. 2막에는 Esquire, 3막에는 Chevalier 가 섞인다.",
      "주요 공격: Crowd Pleaser(파티 전체, 뒷열일수록 피해 감소), Necessary Discipline(2~4열 대상, 출혈 + 스트레스 +20 + 1칸 당김), The Thirst(자가 회복)."
    ],
    strat: [
      "알만 있는 첫 라운드는 안전하다. Bolster, Battle Ballad, Tracking Shot 같은 준비 스킬을 쓰고, 마지막 순번 영웅이 알 하나만 깬다.",
      "매 라운드 알을 정확히 하나씩은 깬다. 약한 공격이나 광역기로 여러 개가 한꺼번에 깨지지 않게 주의한다.",
      "남작이 나오면 전원 집중 공격. 3회 행동 탓에 출혈이 한 라운드 안에 전부 터지므로 출혈(저항 55%) 효율이 매우 높다.",
      "Crowd Pleaser 는 전원을 때리므로 반격 중인 영웅이 여럿이면 한 번에 여러 번 되받아친다. 약화·표식은 금방 풀려 효율이 낮다.",
      "막 전환 체력(153 / 76)에 가까워지면, 남은 알을 모두 깨서 치유가 풀린 틈에 회복하고 넘어갈지 판단한다. 다만 알에서 나온 적들의 화력이 회복량을 넘을 수 있다.",
      "막이 바뀌면 남작에게 걸린 상태 이상은 모두 사라진다. 전환 직전에 지속 피해를 새로 거는 것은 낭비다."
    ],
    bring: [
      "혈액(The Blood): 저주에 걸린 영웅 유지용. 긴 에픽 원정이라 많이 필요하다.",
      "붕대(Bandage): Necessary Discipline 의 출혈 4 대응. 치유가 막힌 상황에서 유일한 대처 수단이 된다.",
      "삽(Shovel): Wine Crate 에서 장작 확보, 무너진 기둥 제거.",
      "음식(Food): 긴 지도에서의 허기 판정과 야영용. 치유가 막혔을 때 전투 밖 회복 수단이기도 하다.",
      "횃불(Torch) 한 묶음: 전투 중 명중 +3, 안개 장애물 제거와 일부 골동품 상호작용."
    ],
    good: ["Highwayman", "Man-at-Arms", "Jester", "Antiquarian", "Grave Robber", "Houndmaster", "Flagellant"],
    bad: ["Vestal", "Occultist", "Arbalest", "Abomination", "Shieldbreaker"],
    goodWhy: "치유가 봉쇄되므로 회피로 덜 맞고 반격·출혈로 빨리 끝내는 영웅이 좋다. 전담 치유사는 알이 있는 동안 할 일이 없고, 표식·약화 의존 영웅은 3회 행동 때문에 효과가 금방 풀린다.",
    party: {
      name: "회피 + 반격 파티",
      slots: [
        { hero: "Jester", skills: ["Battle Ballad", "Inspiring Tune", "Solo", "Dirk Stab"], trinkets: ["Bright Tambourine"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Hound's Harry", "Cry Havoc", "Guard Dog"], trinkets: ["Protective Collar"] },
        { hero: "Highwayman", skills: ["Duelist's Advance", "Wicked Slice", "Pistol Shot", "Open Vein"], trinkets: ["Sharpening Sheath", "Camouflage Cloak"] },
        { hero: "Man-at-Arms", skills: ["Retribution", "Crush", "Bolster", "Defender"], trinkets: ["Sun Cloak"] }
      ],
      note: "1라운드에 Bolster 와 Battle Ballad 를 깔고 알을 하나씩 깬다. 남작이 나오면 노상강도의 Duelist's Advance 와 중보병의 Retribution 으로 반격을 켜 Crowd Pleaser 를 되받아치고, 사냥개 조련사와 노상강도가 출혈을 쌓는다. 전담 치유사가 없으니 원정 중 회복은 음식과 야영에 의존한다."
    },
    altParty: {
      name: "회피 지원 + 고행자 파티",
      slots: [
        { hero: "Antiquarian", skills: ["Invigorating Vapours", "Fortifying Vapours", "Festering Vapours", "Nervous Stab"], trinkets: ["Candle of Life", "Bag of Marbles"] },
        { hero: "Jester", skills: ["Battle Ballad", "Harvest", "Slice Off", "Inspiring Tune"], trinkets: ["Bloody Dice"] },
        { hero: "Highwayman", skills: ["Duelist's Advance", "Wicked Slice", "Pistol Shot", "Open Vein"], trinkets: ["Sharpening Sheath"] },
        { hero: "Flagellant", skills: ["Punish", "Exsanguinate", "Redeem", "Reclaim"], trinkets: ["Punishment's Hood"] }
      ],
      note: "골동품상의 Invigorating Vapours 로 파티 회피를 올려 피해 자체를 줄인다. 고행자는 출혈 딜러이면서, 알을 모두 깬 짧은 틈에 Redeem 으로 크게 회복시킬 수 있다."
    },
    reward: "처치 시 설계도(Blueprint) 1장과 세트 장신구 1개, 남작 전용 트로피 장신구. 다음 에픽 원정용 초대장도 받는다."
  },
  {
    id: "viscount",
    en: "Viscount", ko: "자작", alt: ["바이카운트", "비스카운트"],
    group: "courtyard",
    quest: "Served Cold — 챔피언(Lv5) 에픽 길이 안뜰 원정의 최종 보스",
    img: "Viscount.png",
    type: "흡혈귀(Bloodsucker)", size: 1,
    hp: [127],
    res: { stun: [50], blight: [90], bleed: [65], debuff: [65], move: [90] },
    summary: "매 라운드 첫 행동으로 매달린 시체를 먹고 자신을 강화하는 3회 행동 보스. 체력과 기절 저항이 낮아, 기절로 묶고 본체만 집중 공격하면 빨리 끝난다.",
    prep: [
      "보스보다 가는 길이 더 험하다. Chevalier 를 비롯한 안뜰 적은 대체로 기절 저항이 낮으니, 빠른 후열 기절(Blinding Gas 등)을 꼭 넣는다.",
      "방어(PROT)가 높은 Chevalier 대비로 출혈, 방어를 깎는 표식(Target Whistle), 방어 무시 공격 중 하나는 준비한다.",
      "에픽 원정 공통: 입장·재입장마다 초대장(Invitation) 1장, 장작은 Wine Crate 에서 삽으로 확보, 지도는 진행하며 드러난다.",
      "파티 대부분이 핏빛 저주(Crimson Curse)에 걸린다고 보고 혈액(The Blood)을 충분히 챙긴다. 지도상의 Crocodilian 은 선택 사항이다.",
      "붉은 자물쇠 문 바로 다음 방이 보스 방이다."
    ],
    mech: [
      "자작 외 나머지 세 칸은 시체 3종(Emaciated Body / Body / Bloodstuffed Body)이 차지한다. 시체는 행동하지 않는다.",
      "Miserly Morsel(가장 마른 시체): 회복 10, 치명타 +5%, 피해 -25%.",
      "Square Meal(중간 시체): 회복 35, 회피 +25·명중 +20·속도 +6.",
      "Ravenous Feast(가장 큰 시체): 회복 50, 피해 +50% 대신 회피 -25·명중 -20·속도 -4, 추가로 행동 2회를 소모한다.",
      "시체를 먹으면 자신의 출혈·중독이 지워지고, 대신 그 시체에 걸려 있던 출혈·중독을 넘겨받는다.",
      "공격: Hungry Eyes(스트레스 +15, 반격 태세 + 위치 섞기), Refined Pairing(출혈 3, 60% 확률로 대상 추가), Served Rare(1~2열을 3칸 뒤로 밀기)."
    ],
    strat: [
      "시체는 무시하고 자작만 친다. 체력이 127 뿐이라 화력만 충분하면 2~3 라운드 안에 끝난다.",
      "기절 저항이 50%라 Dazzling Mirror 를 낀 영웅은 거의 확정으로 기절시킨다. 강화는 3턴만 유지되므로, 한 번 기절시키면 강화 효과를 대부분 낭비시킬 수 있다.",
      "Hungry Eyes 로 반격 태세가 켜지면 기절로 끊거나, 반격을 유발하지 않는 Disorienting Blast 같은 기술로 대응한다.",
      "자작은 뒷열로 이동하고 Served Rare 는 아군 앞열을 뒤로 민다. 어느 열에서나 어느 열이든 때릴 수 있는 영웅 위주로 구성한다.",
      "Ravenous Feast 를 먹은 라운드는 회피가 떨어지고 행동도 줄어드는 폭딜 기회다. 다음 라운드 초에 기절을 넣어 피해 강화를 무력화한다.",
      "저주에 걸린 영웅은 피의 갈망(Bloodlust) 상태에서 혈액을 한 병 더 마시면 3라운드 동안 피해 +50%·속도 +4 를 얻는다(스트레스를 크게 받음). 보스 시작 시 쓰면 속전속결에 좋다."
    ],
    bring: [
      "혈액(The Blood): 저주 관리 및 보스전 피해 강화용.",
      "붕대(Bandage): Refined Pairing 과 Chevalier 의 출혈 대응.",
      "삽(Shovel): Wine Crate 장작, 장애물 제거.",
      "성수(Holy Water): Damned Fountain 에서 스트레스 회복.",
      "횃불(Torch) 한 묶음: 전투 중 명중 +3."
    ],
    good: ["Plague Doctor", "Occultist", "Houndmaster", "Highwayman", "Jester", "Shieldbreaker", "Antiquarian"],
    bad: ["Vestal", "Man-at-Arms"],
    goodWhy: "던전을 뚫는 데 강한 기절·출혈 영웅이 그대로 보스에게도 통한다. 성녀는 속도와 기절이 아쉽고, 중보병은 화력이 부족해 긴 던전 구간에서 손해다(보스 방 자체에서는 둘 다 무난).",
    party: {
      name: "기절 연쇄 파티",
      slots: [
        { hero: "Plague Doctor", skills: ["Blinding Gas", "Disorienting Blast", "Noxious Blast", "Battlefield Medicine"], trinkets: ["Blasphemous Vial", "Dazzling Mirror"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Target Whistle", "Cry Havoc", "Guard Dog"], trinkets: ["Agility Whistle"] },
        { hero: "Occultist", skills: ["Hands from the Abyss", "Wyrd Reconstruction", "Sacrifical Stab", "Weakening Curse"], trinkets: ["Demon's Cauldron"] },
        { hero: "Hellion", skills: ["Wicked Hack", "Iron Swan", "If It Bleeds", "Adrenaline Rush"], trinkets: ["Mercurial Salve", "Heaven's Hairpin"] }
      ],
      note: "던전에서는 역병 의사의 Blinding Gas 로 뒷열(주로 Chevalier)을 묶고 Target Whistle 로 방어를 깎는다. 보스전은 신비학자의 Hands from the Abyss 와 역병 의사의 Disorienting Blast 를 번갈아 넣어 행동을 지우고, 야만인과 사냥개 조련사가 본체를 친다. 야만인은 Iron Swan 으로 4열까지 닿는다."
    },
    altParty: {
      name: "전열 자유 화력 파티 (방패 파괴자 포함)",
      slots: [
        { hero: "Jester", skills: ["Battle Ballad", "Inspiring Tune", "Solo", "Dirk Stab"], trinkets: ["Bright Tambourine"] },
        { hero: "Occultist", skills: ["Wyrd Reconstruction", "Weakening Curse", "Sacrifical Stab", "Vulnerability Hex"], trinkets: ["Dazzling Mirror"] },
        { hero: "Shieldbreaker", skills: ["Pierce", "Puncture", "Captivate", "Expose"], trinkets: ["Mercurial Salve"] },
        { hero: "Highwayman", skills: ["Wicked Slice", "Point Blank Shot", "Open Vein", "Tracking Shot"], trinkets: ["Sharpening Sheath"] }
      ],
      note: "광대의 Battle Ballad 로 속도·명중·치명타를 올리고 방패 파괴자와 노상강도가 어느 열이든 따라가며 친다. 방패 파괴자의 Pierce 는 Chevalier 의 방어를 무시해 던전 구간에서도 강하다."
    },
    reward: "자작 전용 트로피 장신구. 다음 에픽 원정(A Bewitching Predator)용 초대장을 받는다."
  },
  {
    id: "countess",
    en: "Countess", ko: "여백작", alt: ["백작 부인", "카운테스", "백작부인"],
    group: "courtyard",
    quest: "A Bewitching Predator — 레벨 6 에픽 길이 안뜰 원정의 최종 보스",
    img: "Countess.png",
    type: "흡혈귀(Bloodsucker)", size: 4,
    hp: [400],
    res: { stun: [140], blight: [110], bleed: [90], debuff: [120], move: [220] },
    summary: "체력 400 에 세 가지 형태(Thirsty → Flushed → Bloodlust)를 오가는 안뜰 최종 보스. 위치 섞기와 기생 알, 높은 방어를 버티며 출혈·방어 무시 공격으로 깎는 장기전이다. (저항 수치는 Thirsty 형태 기준)",
    prep: [
      "지도 중앙이 보스 방이다. 서쪽으로 내려가 노란 열쇠 → 노란 문 → 붉은 열쇠 → 붉은 문 순서로 진행하면 보스까지 직선이다.",
      "보스 방 근처에는 Wine Crate 가 멀다. 장작을 아껴 두었다가 보스 직전에 야영해 강화를 걸고 들어간다.",
      "Stumble 로 매 턴 위치가 섞인다. 어느 열에서든 쓸 기술이 있는 영웅을 고르거나 Heavy Boots 같은 이동 저항 장신구를 챙긴다.",
      "Bloodlust 형태는 뒷열을 기절시킨다. 치유사에게 Stun Amulet 등 기절 저항 장신구를 준다.",
      "에픽 원정 공통: 초대장(Invitation) 1장 소모, 혈액(The Blood)·붕대·해독제를 충분히."
    ],
    mech: [
      "Thirsty(시작 형태, 3회 행동, 방어 30%): Disrobe(단일 피해), Sway With Me(전체 Stumble + 중독 6 + 스트레스 +25), Love Letter(기생 알 주입).",
      "기생 알(Parasite Egg): 알을 받은 영웅이 '공격'할 때마다 턴 종료 시 피해(4→6→8)를 입고, 25%→50%→95%→100% 확률로 부화한다. 부화하면 큰 피해(15~24)와 속도·명중 약화를 받고, 여백작은 속도 +3·방어 +15% 를 얻는다. 치유·강화·이동으로는 진행되지 않는다.",
      "Flushed(1회 행동, 방어 10%): 체력 피해를 주지 못하는 가장 약한 형태. 전환 시 출혈·중독이 지워지지만 기절·출혈·중독·약화 저항이 40%씩 떨어진다.",
      "Metamorphosis: Bloodlust 로 전환하며 파티에 공포(Horror)를 걸고 자신의 출혈·중독을 지운다.",
      "Bloodlust(4회 행동, 방어 40%): Indecent Proposal(전체 피해 + 출혈 3), The Thirst(자가 회복 20), Throes of Ecstasy(3~4열 기절). 이후 Courtship Renewed 로 Thirsty 로 돌아간다."
    ],
    strat: [
      "첫 턴에 Bolster 등 회피·스트레스 강화를 깔고, 야영 강화(Tactics)가 있으면 겹친다. 공격을 피하면 알과 지속 피해 자체를 덜 받는다.",
      "알을 받은 영웅이 치유사라면 공격하지 않고 치유만 하면 알이 영원히 부화하지 않는다. 딜러가 받았다면 부화 피해를 견딜 체력인지 확인하고 공격한다. 죽음의 문턱에서는 알 피해로도 죽을 수 있다.",
      "방어가 높고 행동 횟수가 많으므로 출혈(저항 90%, Bloodlust 는 80%)과 방어 무시 공격이 주력이다.",
      "Flushed 형태는 기절 저항이 떨어지는 유일한 구간이다. 여기서 기절을 넣어 Bloodlust 진입을 늦추고 지속 피해를 최대한 쌓는다.",
      "Bloodlust 구간은 치유에 집중한다. 전체 공격과 출혈이 겹치니 Divine Comfort 와 붕대로 버티고, 딜은 여유가 있을 때만 넣는다.",
      "Stumble 로 밀려난 영웅은 이동을 겸하는 공격으로 제자리를 찾는다. 명중 약화는 행동 횟수가 많아 금방 풀리니 큰 기대를 하지 않는다."
    ],
    bring: [
      "붕대(Bandage): Bloodlust 형태의 전체 출혈 대응.",
      "해독제(Antivenom): Sway With Me 의 중독 6 대응.",
      "혈액(The Blood): 저주 관리. 보스전 중 갈망 단계로 떨어지지 않게 한다.",
      "성수(Holy Water): 저항 보강.",
      "삽(Shovel): Wine Crate 에서 야영용 장작 확보."
    ],
    good: ["Vestal", "Man-at-Arms", "Hellion", "Plague Doctor", "Antiquarian", "Flagellant", "Shieldbreaker"],
    bad: ["Leper", "Arbalest"],
    goodWhy: "안정적인 치유, 회피 강화, 큰 출혈이나 방어 무시 피해가 핵심이다. 나병 환자와 석궁사수는 Stumble 로 열이 바뀌면 제자리로 돌아가는 데 턴을 써야 한다.",
    party: {
      name: "버티기 + 출혈 파티",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Stun Amulet", "Sacred Scroll"] },
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Incision", "Blinding Gas", "Battlefield Medicine"], trinkets: ["Blasphemous Vial"] },
        { hero: "Man-at-Arms", skills: ["Bolster", "Defender", "Rampart", "Crush"], trinkets: ["Dazzling Mirror", "Rampart Shield"] },
        { hero: "Hellion", skills: ["Wicked Hack", "If It Bleeds", "Bleed Out", "Adrenaline Rush"], trinkets: ["Heavy Boots", "Bleeding Pendant"] }
      ],
      note: "중보병이 Bolster 를 깐 뒤 Defender 로 성녀를 보호해 열과 치유를 지킨다. Flushed 형태가 되면 중보병의 Rampart 와 역병 의사의 Blinding Gas 로 기절을 노리고, 그동안 야만인과 역병 의사가 지속 피해를 쌓는다. 야만인은 Adrenaline Rush 로 자신의 출혈·중독을 털어낸다."
    },
    altParty: {
      name: "고행자 출혈 파티",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Stun Amulet", "Tome of Holy Healing"] },
        { hero: "Man-at-Arms", skills: ["Bolster", "Defender", "Rampart", "Command"], trinkets: ["Dazzling Mirror"] },
        { hero: "Hellion", skills: ["Wicked Hack", "If It Bleeds", "Breakthrough", "Adrenaline Rush"], trinkets: ["Bleeding Pendant"] },
        { hero: "Flagellant", skills: ["Punish", "Exsanguinate", "Redeem", "Reclaim"], trinkets: ["Punishment's Hood", "Suffering's Collar"] }
      ],
      note: "위키에서 고난도 모드용으로 소개하는 구성. 여백작이 네 칸을 모두 차지하므로 고행자는 Rain of Sorrows 대신 Exsanguinate 와 Redeem 을 함께 든다. 중보병은 Bolster 후 성녀를 보호하고 Flushed 구간에 기절을 넣는다."
    },
    reward: "여백작 전용 트로피 장신구, 보스 방 상자의 녹색 열쇠. 마을 귀환 시 저주에 걸린 모든 영웅이 치료되고, 이후 요양원에서 저주를 일반 질병처럼 치료할 수 있으며 침식도(Infestation)가 사라진다. 반복 원정(Garden Guardian)이 열린다."
  },
  {
    id: "garden-guardian",
    en: "Garden Guardian", ko: "정원 수호자", alt: ["정원의 수호자", "가든 가디언", "정원 파수꾼"],
    group: "courtyard",
    quest: "Slay the Garden Guardian — 여백작 처치 후 열리는 반복 가능 안뜰 원정 (무작위 생성 지도)",
    img: "Garden Guardian.png",
    type: "석상(Stonework)/이형(Eldritch)", size: 2,
    hp: [246],
    res: { stun: [240], blight: [240], bleed: [240], debuff: [240], move: [240] },
    summary: "본체(2~3열)·방패(1열)·창(4열) 세 부위로 된 석상. 모든 상태 이상에 사실상 면역이고 방어가 높다. 방패를 부수면 본체가 깨어나므로 '방패는 살려 둔 채' 본체를 깎는 것이 핵심이다.",
    prep: [
      "다른 안뜰 보스 원정과 달리 지도가 무작위로 생성되고 길이가 짧은 편이라 초대장 없이 반복할 수 있다.",
      "출혈·중독·기절·약화·이동이 전부 통하지 않는다. 순수 피해, 방어 무시, 표식 연계로 편성한다.",
      "Sculptor's Tools(석상 상대 피해 +40%)가 있으면 반드시 주력 딜러에게 장착한다.",
      "Plummeting Doom 이 앞열을 기절시키고 2칸 밀어낸다. 열을 가리지 않는 영웅이나 보호(Guard)로 대비한다."
    ],
    mech: [
      "Stone Shield(1열, 체력 72): 화면에 있는 동안 본체를 자동으로 보호(Guard)한다. Skyward Shield 로 날아오르면 대상 지정이 불가능해지고 보호도 풀린다.",
      "Plummeting Doom: 방패가 돌아오며 1~2열(40% 확률로 대상 추가)에 큰 피해 + 기절 + 2칸 밀기.",
      "Blood Fount(4열, 체력 62): Feed the Soil 로 영웅 2명에게 피해 + 출혈 2 + 스트레스 +10.",
      "본체(체력 246)는 방패가 살아 있는 동안 아무 행동도 하지 않는다.",
      "방패가 파괴되면 본체가 매 라운드 시작에 Annihilating Glare(파티 전체 큰 피해 + 스트레스), 라운드 끝에 Hatred Beyond Time(피해·명중·치명타 영구 강화)을 쓴다.",
      "본체를 처치하면 방패와 창도 함께 죽는다. 본체의 회피는 0 이다."
    ],
    strat: [
      "방패는 절대 죽이지 않는다. 방패가 화면에 있을 때 본체를 치면 피해가 방패로 넘어가므로 그 턴에는 본체 공격을 멈춘다.",
      "방패가 있는 턴에는 Blood Fount 를 먼저 부순다. 체력이 낮고 적 피해량의 절반 가까이와 스트레스를 담당한다.",
      "방패가 날아오른 턴에 본체에 화력을 집중한다. 표식과 강화는 방패가 있는 턴에 미리 걸어 둔다.",
      "방패가 있는 턴의 남는 행동은 치유, 스트레스 회복, 자기 강화(Adrenaline Rush, Command 등)에 쓴다.",
      "방패 파괴자의 Puncture 는 보호를 벗겨 방패가 있어도 본체를 칠 수 있게 한다. 광대의 Dirk Stab 은 보호를 무시한다.",
      "밀려난 앞열은 이동을 겸하는 공격으로 복귀하고, 기절은 Rallying Flare 등으로 풀어 준다."
    ],
    bring: [
      "붕대(Bandage): Feed the Soil 의 출혈 대응.",
      "혈액(The Blood): 저주 걸린 영웅 유지용.",
      "횃불(Torch) 약간: 전투 중 명중 +3 및 골동품 상호작용용.",
      "삽(Shovel): 장애물 제거와 골동품 상호작용."
    ],
    good: ["Shieldbreaker", "Grave Robber", "Crusader", "Arbalest", "Houndmaster", "Man-at-Arms", "Highwayman"],
    bad: ["Plague Doctor", "Flagellant"],
    goodWhy: "방어 무시·표식·높은 단일 피해와 밀려나도 싸울 수 있는 기동성이 중요하다. 역병 의사와 고행자는 주력인 중독·출혈이 통하지 않아 보스전에서는 지원만 하게 된다.",
    party: {
      name: "표식 화력 파티",
      slots: [
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Battlefield Bandage", "Rallying Flare"], trinkets: ["Sculptor's Tools", "Bull's Eye Bandana"] },
        { hero: "Occultist", skills: ["Vulnerability Hex", "Wyrd Reconstruction", "Abyssal Artillery", "Sacrifical Stab"], trinkets: ["Sacrifical Cauldron"] },
        { hero: "Highwayman", skills: ["Pistol Shot", "Wicked Slice", "Duelist's Advance", "Tracking Shot"], trinkets: ["Gunslinger's Buckle"] },
        { hero: "Crusader", skills: ["Smite", "Battle Heal", "Inspiring Cry", "Bulwark of Faith"], trinkets: ["Knight's Crest"] }
      ],
      note: "방패가 있는 턴에는 석궁사수와 노상강도가 4열의 Blood Fount 를 쏘고, 나머지는 표식·치유·스트레스 회복을 한다. 방패가 날아오르면 표식이 걸린 본체에 Sniper Shot 과 Smite 를 몰아넣는다. 성전사가 밀려날 것에 대비해 Holy Lance 로 교체해 두는 것도 방법이다."
    },
    altParty: {
      name: "보호 해제 파티 (방패 파괴자 포함)",
      slots: [
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Battlefield Bandage", "Rallying Flare"], trinkets: ["Bull's Eye Bandana"] },
        { hero: "Houndmaster", skills: ["Target Whistle", "Hound's Rush", "Cry Havoc", "Guard Dog"], trinkets: ["Protective Collar"] },
        { hero: "Shieldbreaker", skills: ["Puncture", "Pierce", "Expose", "Serpent Sway"], trinkets: ["Sculptor's Tools", "Fanged Spear Tip"] },
        { hero: "Man-at-Arms", skills: ["Crush", "Command", "Defender", "Bolster"], trinkets: ["Heavy Boots"] }
      ],
      note: "속도가 빠른 방패 파괴자가 라운드 초에 Puncture 로 방패의 보호를 벗기면 그 라운드에도 전원이 본체를 칠 수 있다. Pierce 는 방어를 무시한다. 중보병은 Command 로 화력을 올리고 Defender 로 앞열이 밀려나지 않게 받아낸다."
    },
    reward: "원정 보상과 보스 처치로 세트 장신구(방패 파괴자 전용 제외) 최대 2개. 세트 장신구를 모두 모은 뒤에는 무작위 매우 희귀(Very Rare) 장신구로 바뀐다."
  },

  // ───────────────────────── 농장 (Color of Madness) ─────────────────────────
  {
    id: "miller",
    en: "Miller", ko: "방앗간 주인", alt: ["방앗간지기", "밀러", "제분업자"],
    group: "farmstead",
    quest: "농장(Farmstead) 숙련 원정의 보스 — 처치해야 Endless Harvest 가 열리며, Endless Harvest 에서는 2번째 웨이브 그룹의 보스로 항상 등장",
    img: "TheMiller.png",
    type: "가련한 영혼(Poor Soul)", size: 2,
    hp: [95, 143, 181],
    res: { stun: [75], blight: [40], bleed: [200], debuff: [40], move: [50] },
    summary: "방어 20% 에 라운드당 2회 행동. 파티 전체를 베는 The Reaping 을 연속으로 쓰는 것이 가장 위험하다. 출혈은 사실상 면역이고 중독에 약하다.",
    prep: [
      "농장은 탐험 없이 전투(웨이브)만 이어진다. 한 웨이브는 적을 약 10마리 잡으면 끝나고, 보스 전까지 웨이브를 버틸 지속력이 필요하다.",
      "장작이 지급되지 않는다. Miller's Hearth 가 나올 때만 야영할 수 있으며 음식이 필요하다. 횃불과 삽은 필요 없다.",
      "숙련 원정에서는 영웅이 실제로 죽는다(Endless Harvest 에서만 일시 실종 처리). 대신 농장에서는 도주해도 불이익이 없다.",
      "횟수 제한 스킬(Bolster 등)은 웨이브 그룹이 끝나야 충전된다. 보스전에 쓸 것은 아껴 둔다.",
      "보스 전에 Mildred 골동품에서 Mildred's Locket 을 얻을 수 있다. 얻으면 앞열 딜러에게 즉시 장착한다."
    ],
    mech: [
      "The Reaping: 파티 전체 공격. 앞열일수록 피해가 크다. 유일하게 재사용 대기가 없어, 다른 기술이 모두 대기 중이면 한 라운드에 두 번 쓴다.",
      "The Master Beckons: Scarecrow, Farmhand, Sleeper's Herald 중 하나를 소환한다. 소환된 적은 그 라운드에 바로 행동한다.",
      "Winter's Breath: Farmhand 를 Frozen Farmhand(방어 35%, 중독 저항 0%)로 바꾼다. 살아 있는 동안 방앗간 주인을 보호(Guard)하고 영웅의 보호 스킬을 봉인하며, Hollow Keening 으로 스트레스와 공포를 준다.",
      "The Harvest: 스트레스 50 초과 영웅이 있고 자신의 체력이 70% 미만일 때만 사용. 체력을 회복하고 2라운드 동안 방어 +15%.",
      "Mildred's Locket 장착 시: 착용자는 The Reaping 피해를 받지 않고 방앗간 주인에게 피해 +40%. 보스는 Immortal Beloved 로 스스로 방어를 20% 깎는다(3라운드)."
    ],
    strat: [
      "중독(저항 40%)이 주력이다. 2회 행동이라 중독이 빨리 터지고 방어도 무시한다. 출혈 기술은 쓰지 않는다.",
      "Frozen Farmhand 가 보호를 걸면 본체 공격이 막힌다. 체력이 낮으니 중독이나 집중 공격으로 바로 정리한다.",
      "소환물을 잡으면 보스가 다시 소환하느라 행동을 쓰므로 The Reaping 횟수가 줄어든다. 다만 소환 대기 시간이 길어 결국 The Reaping 연타는 온다.",
      "체력이 낮은 영웅(광대, 신비학자 등)은 The Reaping 두 방에 위험해진다. 전체 치유를 아끼지 말고 미리 채워 둔다.",
      "Mildred's Locket 착용자는 가장 피해를 많이 받는 1열에 세운다. 피해 면역과 +40% 화력을 동시에 살린다.",
      "The Reaping 이 전원을 때리므로 반격(Riposte) 영웅을 둘 세우면 매 번 되받아쳐 빠르게 깎는다."
    ],
    bring: [
      "음식(Food): Miller's Hearth 야영과 전투 사이 회복용.",
      "만능 열쇠(Skeleton Key): Stockpile 골동품에서 보급품을 더 얻는다.",
      "약초·붕대·해독제: 웨이브에 섞여 나오는 다른 지역 적의 상태 이상 대응.",
      "성수(Holy Water): 저항 보강."
    ],
    good: ["Plague Doctor", "Vestal", "Highwayman", "Man-at-Arms", "Bounty Hunter", "Occultist", "Shieldbreaker"],
    bad: ["Flagellant"],
    goodWhy: "중독 딜러, 전체 치유사, The Reaping 을 되받아치는 반격 영웅이 잘 맞는다. 고행자는 출혈이 통하지 않고 횟수 제한 스킬 의존이 커서 농장과 궁합이 나쁘다.",
    party: {
      name: "중독 + 반격 파티",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Sacred Scroll", "Tome of Holy Healing"] },
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Plague Grenade", "Blinding Gas", "Battlefield Medicine"], trinkets: ["Poisoned Herb"] },
        { hero: "Highwayman", skills: ["Duelist's Advance", "Wicked Slice", "Pistol Shot", "Grapeshot Blast"], trinkets: ["Stalwart Buckle"] },
        { hero: "Man-at-Arms", skills: ["Retribution", "Crush", "Bolster", "Rampart"], trinkets: ["Mildred's Locket"] }
      ],
      note: "중보병과 노상강도가 반격을 켜고 The Reaping 을 되받아친다. 역병 의사는 본체와 Frozen Farmhand 에 중독을 걸고, 성녀는 Divine Comfort 로 전체 피해를 메운다. Mildred's Locket 은 원정 도중 얻었을 때 1열 영웅에게 끼운다(못 얻었다면 Longevity Eyepatch 등으로 대체)."
    },
    altParty: {
      name: "제어 + 표식 파티",
      slots: [
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Suppressing Fire", "Battlefield Bandage"], trinkets: ["Bull's Eye Bandana"] },
        { hero: "Jester", skills: ["Battle Ballad", "Inspiring Tune", "Slice Off", "Harvest"], trinkets: ["Bright Tambourine"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Blackjack", "Target Whistle", "Hound's Harry"], trinkets: ["Cudgel Weight"] },
        { hero: "Occultist", skills: ["Hands from the Abyss", "Sacrifical Stab", "Wyrd Reconstruction", "Weakening Curse"], trinkets: ["Demon's Cauldron"] }
      ],
      note: "위키에서 숙련 원정용으로 소개하는 안정 구성. 웨이브에서는 라운드당 우선순위 적 하나만 잡고 나머지는 기절·약화로 묶어 증원과 수정 괴물 생성을 줄인다. 보스전은 Target Whistle 로 방어를 깎고 Sniper Shot 으로 마무리한다."
    },
    reward: "숙련 원정에서 처치하면 Endless Harvest 가 해금된다. 전용 장신구 Mildred's Locket 은 보스가 아니라 전투 전 Mildred 골동품에서 얻는다."
  },
  {
    id: "fracture",
    en: "Fracture", ko: "균열", alt: ["프랙처", "파편", "결정 첨탑"],
    group: "farmstead",
    quest: "Endless Harvest 3번째 웨이브 그룹의 보스 (The Sleeper 의 1단계) — 이후 웨이브 그룹에서도 무작위로 재등장",
    img: "Spireidle.png",
    type: "껍데기(Husk)", size: 1,
    hp: [115],
    res: { stun: [140], blight: [100], bleed: [240], debuff: [90], move: [140] },
    summary: "직접 공격은 거의 하지 않고 라운드당 3회 행동으로 Focus Point 를 만들어 자폭 괴물로 키운다. 체력이 20% 아래로 내려가면 쉬는 시간 없이 The Sleeper 로 변신한다.",
    prep: [
      "The Sleeper 전까지 한 번에 이어지는 연전이다. 두 전투를 모두 버틸 체력·스트레스 여유를 남기고 들어간다.",
      "Endless Harvest 는 챔피언 난이도이며 마을 시간이 흐르지 않는다. 죽은 영웅은 일시 실종 처리되어 1~2주 뒤 돌아오지만, 전멸하면 장신구와 소지품을 잃는다.",
      "횃불과 삽은 필요 없다. 음식과 만능 열쇠, 전투용 보급품 위주로 챙긴다.",
      "출혈은 통하지 않는다. 중독과 높은 단일 피해 위주로 스킬을 맞춘다."
    ],
    mech: [
      "Seeds of Despair: 전투 시작 시 Focus Point 3개 소환. 이후 Vile Focusing 으로 라운드당 1개씩 다시 만든다. 소환 위치는 1열이다.",
      "Befouling Tint → Ceaseless Expansion: Focus Point → Unfinished Aberration → Finished Aberration(체력 30, 방어 20%) 순으로 성장시킨다. 성장할 때마다 체력이 전부 회복된다(출혈·중독은 유지).",
      "Finished Aberration 은 Eternal Blossom 으로 자폭해 파티 전체를 때린다. 색에 따라 검정=공포 + 받는 치유 -75%, 보라=전체 기절, 빨강=준 피해만큼 Fracture 회복, 초록=중독 5.",
      "파랑(Adamantite)은 자폭하지 않고 Fracture 를 보호(Guard)한다. 방어 5% 에 저항도 낮다.",
      "Slow the Sands: 소환물이 2개 이상일 때 가끔 쓰는 약한 전체 공격(속도 약화 + 기절 시도).",
      "Blooming Chaos: 체력 20% 미만에서 다른 적을 모두 없애고 The Sleeper 로 변신한다."
    ],
    strat: [
      "한 턴에 확실히 죽일 수 없는 소환물은 건드리지 않는다. 성장하면서 체력이 다시 차기 때문에 어중간한 피해는 낭비다.",
      "제거 1순위는 보라(전체 기절), 2순위는 빨강(보스 회복)이다. 파랑이 서면 보호 때문에 본체를 못 치니 바로 정리한다.",
      "앞열 딜러는 1열에 나오는 소환물을 한 방에 부수고, 뒷열은 본체에 중독과 원거리 피해를 넣는다. 3회 행동이라 중독이 한 라운드에 전부 터진다.",
      "라운드당 2개씩 소환물을 치우면 보스가 새로 만드는 속도(라운드당 1개)를 앞질러 본체를 칠 틈이 계속 생긴다.",
      "체력 20% 선을 넘기기 전에 치유와 스트레스 회복을 마친다. 변신 직후 바로 The Sleeper 의 전체 공격이 시작된다.",
      "가능하면 20% 직전에서 멈췄다가 큰 한 방으로 넘겨, 표식과 강화가 살아 있는 상태로 The Sleeper 를 맞는다."
    ],
    bring: [
      "해독제(Antivenom): 초록 괴물과 The Sleeper 의 중독 대응.",
      "성수(Holy Water): 이어지는 The Sleeper 전의 중독 저항 보강용.",
      "음식(Food): Miller's Hearth 야영용.",
      "만능 열쇠(Skeleton Key): Stockpile 에서 보급품 추가 확보."
    ],
    good: ["Plague Doctor", "Hellion", "Leper", "Bounty Hunter", "Vestal", "Houndmaster", "Shieldbreaker"],
    bad: ["Flagellant"],
    goodWhy: "앞열은 소환물을 한 방에 부술 고화력 근접, 뒷열은 본체에 중독을 거는 역병 의사가 가장 효율적이다. 고행자는 출혈 면역과 횟수 제한 스킬 문제로 맞지 않는다.",
    party: {
      name: "소환물 정리 + 중독 파티",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Sacred Scroll", "Tome of Holy Healing"] },
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Plague Grenade", "Blinding Gas", "Battlefield Medicine"], trinkets: ["Poisoned Herb"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Target Whistle", "Blackjack", "Guard Dog"], trinkets: ["Protective Collar"] },
        { hero: "Bounty Hunter", skills: ["Collect Bounty", "Mark for Death", "Uppercut", "Finish Him"], trinkets: ["Wounding Helmet", "Hunter's Talons"] }
      ],
      note: "현상금 사냥꾼과 사냥개 조련사가 1열의 소환물을 부수고, 역병 의사는 본체 위치에 맞춰 Noxious Blast(앞)·Plague Grenade(뒤)로 중독을 건다. 같은 파티로 The Sleeper 까지 이어 싸우므로 Target Whistle 과 Collect Bounty 연계는 2단계를 위해 준비해 둔다."
    },
    altParty: {
      name: "한 방 화력 파티 (방패 파괴자 포함)",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Sacred Scroll"] },
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Plague Grenade", "Blinding Gas", "Battlefield Medicine"], trinkets: ["Poisoned Herb"] },
        { hero: "Shieldbreaker", skills: ["Pierce", "Puncture", "Captivate", "Expose"], trinkets: ["Venomous Vial"] },
        { hero: "Leper", skills: ["Chop", "Hew", "Withstand", "Solemnity"], trinkets: ["Fortunate Armlet", "Redemption Armlet"] }
      ],
      note: "나병 환자의 Chop 이 1열 소환물을 한 방에 지우고, 방패 파괴자는 Pierce 로 본체의 방어를 무시하거나 Captivate 로 중독을 건다. The Sleeper 로 넘어가도 Pierce 와 중독이 그대로 통한다."
    },
    reward: "단독 보상 없음 — 처치 대신 The Sleeper 로 변신하며 전투가 이어진다."
  },
  {
    id: "sleeper",
    en: "Sleeper", ko: "잠자는 자", alt: ["슬리퍼", "잠든 자", "수면자", "The Sleeper"],
    group: "farmstead",
    quest: "Endless Harvest 3번째 웨이브 그룹 — Fracture 의 체력이 20% 아래로 내려가면 변신해 나오는 2단계",
    img: "Sleeperidle.png",
    type: "껍데기(Husk)", size: 4,
    hp: [225],
    res: { stun: [140], blight: [70], bleed: [140], debuff: [100], move: [240] },
    summary: "방어 30%, 라운드당 1회 행동. 두 기술 모두 파티 전체에 큰 피해와 스트레스를 주므로, 몇 라운드 안에 끝내는 단일 대상 폭딜 싸움이다.",
    prep: [
      "Fracture 전투에서 쉬지 않고 이어진다. 변신 전에 체력과 스트레스를 최대한 정리해 둔다.",
      "성수(Holy Water)로 중독 저항을 올려 두면 The Sleeper Stirs 의 중독으로 죽음의 문턱에서 쓰러질 위험이 크게 준다.",
      "방어를 깎는 표식(Target Whistle, -30%)과 표식 연계 딜러를 준비한다. 야영이 가능했다면 Planned Takedown 같은 피해 강화 야영 스킬을 걸어 둔다.",
      "명중이 높아 회피 위주 파티는 효과가 떨어진다. 체력과 치유량으로 버틴다.",
      "Endless Harvest 에서는 죽음이 일시적이고 도주에 불이익이 없다. 가망이 없으면 전멸 전에 빠진다(전멸 시 장신구·소지품 손실)."
    ],
    mech: [
      "The Sleeper Awakens: 파티 전체 14~22 피해 + 스트레스 +20. 명중이 특히 높다.",
      "The Sleeper Stirs: 파티 전체 6~14 피해 + 중독 4(5라운드) + 공포(Horror) 3(5라운드).",
      "매 턴 두 기술 중 하나를 같은 확률로 쓴다. 전체 공격뿐이라 보호(Guard)로 막을 수 없다.",
      "네 칸을 모두 차지하므로 모든 영웅이 사거리 걱정 없이 때릴 수 있다.",
      "출혈 저항은 높고(140%) 중독 저항은 낮다(70%). 기절은 한 번 걸리면 저항이 올라 연속으로는 어렵다.",
      "Endless Harvest 한 번의 도전에서 처음 잡은 Sleeper 는 가보 Memory 를 반드시 떨어뜨린다."
    ],
    strat: [
      "첫 턴에 Target Whistle 로 방어 30% 를 지운다. 약화 확률이 매우 높아 저항 100% 를 뚫고 잘 들어간다.",
      "표식이 걸린 동안 Collect Bounty, Sniper Shot 같은 표식 연계기를 몰아넣는다. 1회 행동이라 표식이 오래 유지된다.",
      "성녀는 매 턴 Divine Comfort 로 전체 치유를 돌린다. 보스가 라운드당 한 번만 행동하므로 전원이 문턱에서 벗어나 있으면 즉사 위험이 거의 없다.",
      "중독은 보조 수단으로만 쓴다. 지속 피해만으로는 파티가 버티는 시간 안에 끝내기 어렵다.",
      "장신구로 확률을 올린 기절(Hands from the Abyss + Demon's Cauldron 등)이 한 번 들어가면 한 라운드를 통째로 번다. 그 틈에 치유와 폭딜을 겹친다.",
      "스트레스가 빠르게 쌓여 붕괴(Affliction)가 나면 급격히 무너진다. 길게 끌지 말고 화력을 먼저 쏟는다."
    ],
    bring: [
      "성수(Holy Water): 중독 저항 강화. 이 전투에서 가장 값진 보급품.",
      "해독제(Antivenom): The Sleeper Stirs 의 중독 제거.",
      "음식(Food): 전투 전 Miller's Hearth 야영용.",
      "아편 팅크(Laudanum): 공포(Horror) 제거로 스트레스 누적 억제."
    ],
    good: ["Houndmaster", "Bounty Hunter", "Arbalest", "Vestal", "Occultist", "Plague Doctor", "Shieldbreaker"],
    bad: ["Antiquarian", "Flagellant"],
    goodWhy: "Target Whistle 로 방어를 지우고 표식 딜러가 몰아치는 구성이 가장 빠르다. 회피 지원 위주의 골동품상은 높은 명중 앞에서 효과가 적고, 출혈 저항이 높아 고행자도 힘을 못 쓴다.",
    party: {
      name: "표식 폭딜 파티",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Sacred Scroll", "Tome of Holy Healing"] },
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Battlefield Bandage", "Suppressing Fire"], trinkets: ["Wrathful Bandana"] },
        { hero: "Houndmaster", skills: ["Target Whistle", "Hound's Rush", "Blackjack", "Guard Dog"], trinkets: ["Protective Collar"] },
        { hero: "Bounty Hunter", skills: ["Collect Bounty", "Mark for Death", "Uppercut", "Finish Him"], trinkets: ["Wounding Helmet", "Hunter's Talons"] }
      ],
      note: "사냥개 조련사가 Target Whistle 로 방어를 지우면 석궁사수와 현상금 사냥꾼이 표식 추가 피해로 몰아친다. 성녀는 Divine Comfort 만 돌려도 충분하다. Blackjack·Uppercut 기절은 앞선 웨이브에서 적을 묶는 용도로 쓴다. Wrathful Bandana 는 석궁사수가 4열에 설 때만 피해 보너스가 붙으니 열이 바뀌면 다른 장신구로 바꾼다."
    },
    altParty: {
      name: "중독 병행 파티",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Sacred Scroll", "Tome of Holy Healing"] },
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Plague Grenade", "Blinding Gas", "Battlefield Medicine"], trinkets: ["Poisoned Herb"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Target Whistle", "Blackjack", "Guard Dog"], trinkets: ["Protective Collar"] },
        { hero: "Bounty Hunter", skills: ["Collect Bounty", "Mark for Death", "Uppercut", "Finish Him"], trinkets: ["Wounding Helmet", "Hunter's Talons"] }
      ],
      note: "Fracture 단계를 더 편하게 넘기는 구성. 역병 의사가 Fracture 에 중독을 쌓고, The Sleeper 로 넘어가면 Battlefield Medicine 으로 아군 중독을 지우며 Noxious Blast 를 계속 건다. 화력은 표식 + Collect Bounty 가 책임진다."
    },
    reward: "한 번의 Endless Harvest 도전에서 처음 처치한 Sleeper 는 가보 Memory 를 확정 드랍한다(구역 건물 The Mill 건설 재료)."
  },

  // ───────────────────────── 가장 어두운 던전 ─────────────────────────
  {
    id: "shuffling-horror",
    en: "Shuffling Horror", ko: "뒤섞는 공포", alt: ["셔플링 호러", "비척대는 공포", "뒤섞이는 공포", "꿈틀대는 공포"],
    group: "darkest",
    quest: "We Are the Flame — 가장 어두운 던전(Darkest Dungeon) 1차 원정 (중간 길이). 목표: Shuffling Horror 처치",
    img: "Shuffling-horror-optmized.gif",
    type: "이형(Eldritch)", size: 3,
    hp: [162],
    res: { stun: [147.5], blight: [107.5], bleed: [67.5], debuff: [87.5], move: [98] },
    summary: "Shambler 의 강화판. 방어 33% 에 라운드당 2회 행동하며 출혈 공격과 파티 섞기를 번갈아 쓴다. 함께 나오는 Cultist Priest 는 죽이지 말고 기절로 묶어 두는 것이 정석이다. (최고 난이도 모드 체력 195)",
    prep: [
      "지도와 전투가 고정되어 있고 오른쪽으로만 가면 보스에 닿는다. 함정·장애물·야간 습격이 없으니 삽과 만능 열쇠는 가져가지 않는다.",
      "이 원정의 적은 중독을 쓰지 않는다. 해독제 대신 붕대를 넉넉히 챙기고, 스트레스 치유 영웅을 최소 한 명 넣는다.",
      "전투에서 전리품이 나오지 않으므로 인벤토리를 음식·횃불·붕대·성수로 가득 채운다. 아편 팅크는 쓸 일이 없다.",
      "가장 어두운 던전에서 후퇴하면 무작위 영웅 한 명이 죽는다. 후퇴가 불가피하면 장신구를 먼저 벗긴다.",
      "원정을 완수한 영웅은 (Radiant 난이도 제외) 다시 가장 어두운 던전에 들어가지 않는다. 네 번의 원정에 쓸 영웅 배분을 미리 정한다."
    ],
    mech: [
      "Lacerate: 영웅 2명에게 피해 + 출혈 4.",
      "Undulations: 파티 전체 위치 섞기(140%).",
      "Priest 가 살아 있는 동안은 두 기술을 번갈아 쓰는 예측 가능한 패턴(출혈 → 섞기 반복)이다.",
      "Echoing Disassembly: 동료가 없으면 사용. 파티 전체 스트레스 +15, 횃불 -25, Cultist Priest 또는 Defensive Growth 소환. 소환 후에도 격턴으로 반복할 수 있다.",
      "2회 행동이라 약화·기절 효율은 낮고 출혈(저항 67.5%)은 라운드에 두 번 터진다.",
      "보스를 죽여도 남은 적을 정리해야 전투가 끝난다. 다만 보스만 죽였다면 이후 전멸하더라도 원정은 완수로 인정된다."
    ],
    strat: [
      "Cultist Priest 는 죽이지 않는다. 죽이면 스트레스 전체 공격과 함께 다시 소환될 뿐이다. 격턴으로 기절시켜 무력화한다.",
      "화력은 전부 보스에게. 출혈을 겹치고, 느린 보스라 방어를 깎는 표식도 효과를 볼 시간이 충분하다.",
      "섞인 뒤에는 이동을 겸하는 공격(Dirk Stab, Duelist's Advance, Breakthrough, Holy Lance 등)으로 제자리를 찾는다. 순수 이동에 턴을 쓰지 않는다.",
      "광역기와 반격이 Priest 를 실수로 죽이지 않게 Priest 체력을 확인한다. 반격 파티는 보스의 전체 공격을 되받아쳐 빠르게 깎지만 이 사고가 잦다.",
      "출혈 4 가 누적되면 금방 죽음의 문턱이다. 붕대와 출혈 제거 스킬을 아끼지 않는다.",
      "가는 길에 Rapturous Cultist 만 남은 전투는 치유 기회다. 다만 너무 오래 끌면 증원이 온다."
    ],
    bring: [
      "붕대(Bandage): Lacerate 와 Priest 의 출혈 대응. 최우선.",
      "음식(Food)·횃불(Torch): 인벤토리가 허락하는 만큼.",
      "성수(Holy Water): 보스전 전에 출혈 저항 보강.",
      "약초(Medicinal Herbs): 약화 제거용 소량."
    ],
    good: ["Jester", "Highwayman", "Hellion", "Occultist", "Grave Robber", "Man-at-Arms", "Bounty Hunter"],
    bad: ["Leper", "Arbalest", "Vestal"],
    goodWhy: "어느 열에 떨어져도 싸울 수 있거나 공격하면서 자리를 되찾는 영웅이 좋다. 나병 환자·석궁사수는 열이 바뀌면 기술이 막히고, 성녀는 앞열로 밀리면 치유를 못 한다(그래도 안정적 치유가 필요하면 앞열용 스킬을 하나 넣어 데려갈 수 있다).",
    party: {
      name: "열 자유 출혈 파티",
      slots: [
        { hero: "Jester", skills: ["Battle Ballad", "Inspiring Tune", "Dirk Stab", "Solo"], trinkets: ["Dark Tambourine", "Bloody Dice"] },
        { hero: "Occultist", skills: ["Wyrd Reconstruction", "Vulnerability Hex", "Sacrifical Stab", "Weakening Curse"], trinkets: ["Eldritch Killing Incense", "Sacrifical Cauldron"] },
        { hero: "Bounty Hunter", skills: ["Collect Bounty", "Flashbang", "Mark for Death", "Finish Him"], trinkets: ["Hunter's Talons"] },
        { hero: "Hellion", skills: ["Wicked Hack", "If It Bleeds", "Bleed Out", "Adrenaline Rush"], trinkets: ["Bleeding Pendant", "Blood Charm"] }
      ],
      note: "현상금 사냥꾼이 Flashbang 으로 뒤쪽의 Priest 를 격턴으로 기절시키고, 표식을 건 보스에게 Collect Bounty 와 야만인의 출혈기를 집중한다. 신비학자는 어느 열에서든 치유가 가능하고 이형(Eldritch) 추가 피해도 있다. 섞였을 때는 광대의 Dirk Stab 으로 자리를 조정한다."
    },
    altParty: {
      name: "반격 파티",
      slots: [
        { hero: "Plague Doctor", skills: ["Blinding Gas", "Battlefield Medicine", "Noxious Blast", "Disorienting Blast"], trinkets: ["Blasphemous Vial", "Stun Amulet"] },
        { hero: "Jester", skills: ["Battle Ballad", "Inspiring Tune", "Dirk Stab", "Harvest"], trinkets: ["Dark Tambourine"] },
        { hero: "Highwayman", skills: ["Duelist's Advance", "Wicked Slice", "Pistol Shot", "Open Vein"], trinkets: ["Sharpening Sheath"] },
        { hero: "Man-at-Arms", skills: ["Retribution", "Crush", "Bolster", "Defender"], trinkets: ["Longevity Eyepatch"] }
      ],
      note: "노상강도와 중보병이 반격을 켜면 보스의 전체 공격마다 두 번씩 되받아친다. 역병 의사는 Blinding Gas 로 Priest 를 묶고 Battlefield Medicine 으로 출혈을 지운다. 역병 의사가 앞으로 밀리면 주력기를 못 쓰므로 최우선으로 뒤로 돌려보낸다."
    },
    reward: "원정 완수 시 다음 원정의 핵심 장신구 Talisman of the Flame 3개를 얻는다. 보스가 Shambler 계열 Ancestor 장신구를 떨어뜨릴 수 있고(이미 모두 가졌다면 없음), 지도상의 상자 하나에 Ancestor 장신구가 들어 있다. 완수하면 마을의 모든 영웅 스트레스가 사라진다."
  },
  {
    id: "templar-impaler",
    en: "Templar Impaler", ko: "꿰뚫는 기사단원", alt: ["템플러 임페일러", "성당기사 꼬챙이꾼", "기사단 관통자", "템플러 워로드", "Templar Warlord", "기사단 전쟁군주"],
    group: "darkest",
    quest: "Lighting the Way — 가장 어두운 던전 2차 원정 (긴 길이, 야영 2회). 목표: 제단(Iron Crown) 3곳 활성화. 각 제단을 Templar Impaler / Templar Warlord 가 지킨다",
    img: "Templar_Impaler.png",
    type: "이형(Eldritch)/야수(Beast)", size: 2,
    hp: [137],
    res: { stun: [97.5], blight: [97.5], bleed: [67.5], debuff: [67.5], move: [73] },
    summary: "게임에서 가장 어렵다고 꼽히는 원정의 준보스 한 쌍. 라운드당 2회 행동 중 한 번은 거의 항상 Revelation(16~26 피해 + 스트레스 +40)이며, Talisman of the Flame 없이는 버티기 어렵다. (수치는 Impaler 기준, Warlord 는 체력 105)",
    prep: [
      "1차 원정에서 얻은 Talisman of the Flame 3개를 전부 장착한다. 착용자는 Revelation 의 피해가 0 이 되고 스트레스도 약 8 로 줄어든다.",
      "부적이 3개뿐이라 한 명은 무방비다. 그 영웅은 부적을 낀 중보병이나 사냥개 조련사가 보호(Guard)한다. 부적 착용자는 나머지 장신구 칸이 하나뿐이니 신중히 고른다.",
      "제단은 시작 방에서 뻗은 세 갈래 길 끝에 있다. 왼쪽 = Impaler + Polyp 2, 위쪽 = Warlord + Flesh Hound 2, 오른쪽 = Impaler + Warlord 동시.",
      "야영 2회로 준보스전 3번을 치른다. 왼쪽과 오른쪽 제단은 한 번의 야영 강화로 연달아 치를 수 있는 거리이므로, 장작 하나는 마지막 제단을 위해 남긴다.",
      "제단을 활성화하지 않고 방을 나가면 다시 상호작용하지 못하는 버그가 보고되어 있다. 전투 직후 반드시 제단부터 켠다."
    ],
    mech: [
      "Revelation: 단일 대상 16~26 피해 + 스트레스 +40. 두 Templar 모두 2회 행동 중 한 번은 대체로 이것을 쓴다.",
      "Impaler — Stinger Stab: 1~2열에 있을 때만 사용. 우리 1~3열 한 명에게 9~20 피해 + 중독 10.",
      "Impaler — Body Slam: 1~3열 대상 피해 + 2칸 밀기 + 기절, 자신은 1칸 전진. Torment: 1~2열 동시 타격.",
      "Warlord — Stinger Shot: 3~4열에서 사용. 2~4열 한 명에게 중독 6 + 피해 -33% 약화. Doomsday: 파티 전체 피해 + 중독 4.",
      "Impaler 는 이동 저항이 73% 로 낮은 편이라 뒷열로 밀어내면 Stinger Stab 을 봉쇄할 수 있다.",
      "함께 나오는 Polyp·Flesh Hound 는 아군 위치를 자주 섞는다. Templar 는 이들을 다시 소환하지 않는다."
    ],
    strat: [
      "첫 턴에 무방비 영웅에게 보호를 건다. 보호자가 부적을 끼고 있으면 대신 맞은 Revelation 이 피해 0 이 된다.",
      "잡몹이 있는 방(왼쪽·위쪽)은 Polyp·Flesh Hound 부터 처리해 진형 붕괴를 막은 뒤 Templar 를 친다.",
      "쌍둥이 방(오른쪽)은 체력이 낮은 Warlord 를 먼저 잡는다. 파티가 멀쩡한 첫 번째나, 다른 두 곳을 끝낸 마지막에 도전한다.",
      "Revelation 을 쓴 직후 기절을 넣으면 남은 한 번의 행동이 사라져 그 라운드 피해가 거의 없어진다.",
      "출혈(저항 67.5%)이 중독(97.5%)보다 훨씬 잘 걸린다. 2회 행동이라 출혈 효율도 높다.",
      "보호자는 Revelation 을 대신 맞을 때마다 스트레스를 받는다. 스트레스 치유 영웅을 꼭 넣고, Rapturous Cultist 둘만 남은 전투에서 체력을 채운다.",
      "제단을 켠 뒤에는 온 길로 되돌아가 시작 방을 거친다. 불필요한 전투와 횃불 소모를 줄인다."
    ],
    bring: [
      "해독제(Antivenom): Stinger Stab(중독 10)·Stinger Shot·Doomsday 대응. 많이 챙긴다.",
      "성수(Holy Water): 준보스전 직전에 사용해 중독 저항을 올린다.",
      "붕대(Bandage): 일반 적의 출혈 대응.",
      "음식(Food)·횃불(Torch): 긴 원정이라 가득 채운다. 삽·열쇠·아편 팅크는 불필요."
    ],
    good: ["Man-at-Arms", "Houndmaster", "Vestal", "Occultist", "Flagellant", "Bounty Hunter", "Jester"],
    bad: [],
    goodWhy: "오래 유지되는 보호 스킬을 가진 중보병·사냥개 조련사가 사실상 필수이고, 큰 피해를 메울 안정적 치유사가 필요하다. 신비학자는 이형(Eldritch) 추가 피해와 강한 단일 치유가 좋다.",
    party: {
      name: "중보병 보호 파티",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Talisman of the Flame", "Sacred Scroll"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Target Whistle", "Cry Havoc", "Hound's Harry"], trinkets: ["Talisman of the Flame", "Beast Slayer's Ring"] },
        { hero: "Hellion", skills: ["Wicked Hack", "If It Bleeds", "Barbaric YAWP!", "Adrenaline Rush"], trinkets: ["Martyr's Seal", "Bleeding Pendant"] },
        { hero: "Man-at-Arms", skills: ["Defender", "Bolster", "Crush", "Rampart"], trinkets: ["Talisman of the Flame", "Rampart Shield"] }
      ],
      note: "부적이 없는 야만인을 중보병이 Defender 로 계속 보호하고, 야만인은 장신구 두 칸을 모두 화력에 쓴다. 사냥개 조련사는 야수(Beast) 추가 피해와 출혈로 딜을 보태고 전투 사이에 Cry Havoc 으로 스트레스를 낮춘다. Revelation 직후 Rampart 나 Barbaric YAWP! 로 기절을 노린다."
    },
    altParty: {
      name: "사냥개 조련사 보호 파티",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Talisman of the Flame", "Tome of Holy Healing"] },
        { hero: "Occultist", skills: ["Wyrd Reconstruction", "Vulnerability Hex", "Sacrifical Stab", "Weakening Curse"], trinkets: ["Talisman of the Flame", "Eldritch Killing Incense"] },
        { hero: "Houndmaster", skills: ["Guard Dog", "Hound's Rush", "Target Whistle", "Blackjack"], trinkets: ["Talisman of the Flame", "Protective Collar"] },
        { hero: "Bounty Hunter", skills: ["Collect Bounty", "Mark for Death", "Uppercut", "Finish Him"], trinkets: ["Wounding Helmet", "Hunter's Talons"] }
      ],
      note: "사냥개 조련사가 Guard Dog 로 부적 없는 현상금 사냥꾼을 보호한다. 현상금 사냥꾼의 Uppercut 은 Impaler 를 뒤로 밀어 Stinger Stab 을 막고, 표식이 걸린 대상에게 Collect Bounty 로 큰 피해를 준다. 신비학자가 보호자에게 큰 치유를 넣어 준다."
    },
    reward: "제단 3곳을 모두 활성화하면 원정 완수 — 3차 원정이 열리고 마을의 모든 영웅 스트레스가 사라진다. 지도상의 상자 하나에 Ancestor 장신구가 들어 있다."
  },
  {
    id: "mammoth-cyst",
    en: "Mammoth Cyst", ko: "거대 낭종", alt: ["매머드 시스트", "거대한 포낭", "맘모스 낭종", "매머드 낭포", "White Cell Stalk", "백혈구 줄기"],
    group: "darkest",
    quest: "Belly of the Beast — 가장 어두운 던전 3차 원정 (매우 긴 길이, 야영 4회). 목표: 지도 중앙의 Locus Beacon 활성화. 그 앞을 Mammoth Cyst 가 지킨다",
    img: "Mammoth_Cyst.png",
    type: "이형(Eldritch)/야수(Beast)", size: 3,
    hp: [158],
    res: { stun: [97.5], blight: [87.5], bleed: [67.5], debuff: [67.5], move: [73] },
    summary: "방어 25%, 라운드당 2회 행동의 준보스. 본체보다 함께 나오는 White Cell Stalk 의 Teleport 가 문제다. 맞으면 파티가 지도 가장자리의 막다른 방으로 날아가 먼 길을 되돌아와야 한다.",
    prep: [
      "난이도보다 길이가 문제인 원정이다. 장작 4개와 음식이 인벤토리를 크게 차지하므로 보급품 우선순위를 미리 정한다. 넷 모두 Fasting Seal 을 끼워 음식을 아예 빼는 방법도 있다.",
      "이 원정은 출혈보다 중독이 훨씬 위협적이다. 해독제와, Bulging Gaze 의 피해 약화를 지울 약초를 챙긴다.",
      "Cyst + Stalk 조합은 지도 여러 곳에 있지만 목표 지점(시작점에서 오른쪽 아래, 지도 중앙) 앞의 하나만 잡으면 된다. 나머지는 가능한 한 피한다.",
      "야수(Beast) 유형 적이 많아 사냥개 조련사가 강하다. 다만 개 간식이 인벤토리 칸을 쓴다는 점을 감안한다.",
      "길에서 만나는 Templar 는 Revelation 이 없고 1회 행동만 하는 약화판이라 부적이 필요 없다."
    ],
    mech: [
      "Bulging Gaze: 8~13 피해 + 스트레스 +15 + 피해 -20% 약화. Digestion: 8~17 피해 + 중독 8. 둘 다 25% 확률로 대상이 하나 추가되며 번갈아 쓴다.",
      "Revivify: 체력이 절반 아래로 내려가면 가끔 사용. 10~20 회복 + 피해 +25%.",
      "Summon: White Cell Stalk 이 죽을 때마다 다시 소환한다.",
      "White Cell Stalk(체력 25, 회피 높음, 기절 저항 72.5%) — Teleport: 첫 턴에는 쓰지 않고, 이후 라운드마다 사용 확률이 오른다(기본 4 + 라운드당 7). Stalk 를 죽이면 이 누적이 초기화된다.",
      "Stalk 는 Displace(아군 위치 섞기 + 속도 약화)와 Reconstitute(회복 8~18 + 방어·속도 강화)도 쓴다. 체력이 낮은 적이 있으면 회복을 우선한다.",
      "순간 이동을 당해도 전투는 초기화되지 않는다. 돌아오면 Cyst 와 Stalk 의 체력이 그대로다. 단, 탐험하지 않은 방으로 날아가면 그 방 전투에서는 후퇴할 수 없다."
    ],
    strat: [
      "매 라운드 Stalk 를 먼저 죽이거나 기절시킨다. 기절한 Stalk 는 Teleport 를 쓰지 못하고, 죽이면 확률 누적이 처음으로 돌아간다.",
      "Stalk 가 죽으면 Cyst 는 재소환을 우선한다. 이때 Cyst 를 기절시켜 행동 하나를 지우면 남은 한 번도 소환에 쓰게 되어 그 라운드 피해가 없다.",
      "Stalk 는 4열에 서므로 뒷열을 바로 칠 수 있는 기술(Iron Swan, Hound's Rush, Sniper Shot, Rain of Sorrows 등)을 반드시 준비한다.",
      "본체는 Target Whistle 같은 표식으로 방어를 깎고 출혈(저항 67.5%)을 겹쳐 천천히 깎는다. 3·4열 동시 공격기는 Cyst 와 Stalk 를 함께 때린다.",
      "Teleport 는 회피로 피하기 어렵다. 맞았다면 다른 Cyst 를 피해 중앙으로 돌아오고, 체력·스트레스가 문제면 그때 야영한다.",
      "전투가 길어질수록 Teleport 확률이 오른다. 방어 위주로 시간을 끄는 구성은 피한다."
    ],
    bring: [
      "해독제(Antivenom): Digestion 의 중독 8 대응. 최우선.",
      "약초(Medicinal Herbs): Bulging Gaze 의 피해 -20% 약화 제거.",
      "음식(Food)·장작: 야영 4회분. Fasting Seal 을 쓰면 음식 칸을 다른 보급품으로 돌릴 수 있다.",
      "횃불(Torch): 매우 긴 원정이라 가득 채운다.",
      "개 간식(Dog Treats): 사냥개 조련사가 있으면 목표 지점의 Cyst 전투에 사용."
    ],
    good: ["Plague Doctor", "Houndmaster", "Hellion", "Vestal", "Arbalest", "Occultist", "Flagellant"],
    bad: ["Leper", "Crusader", "Antiquarian"],
    goodWhy: "뒷열의 Stalk 를 바로 끊을 수 있는 영웅과 중독을 지우는 역병 의사가 핵심이다. 나병 환자·성전사는 Stalk 에 닿기 어렵고, 골동품상처럼 전투를 길게 끄는 구성은 Teleport 를 맞을 확률만 높인다.",
    party: {
      name: "Stalk 저격 파티",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Sacred Scroll", "Tome of Holy Healing"] },
        { hero: "Plague Doctor", skills: ["Blinding Gas", "Plague Grenade", "Battlefield Medicine", "Disorienting Blast"], trinkets: ["Blasphemous Vial"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Target Whistle", "Blackjack", "Hound's Harry"], trinkets: ["Beast Slayer's Ring", "Cudgel Weight"] },
        { hero: "Hellion", skills: ["Iron Swan", "Wicked Hack", "If It Bleeds", "Adrenaline Rush"], trinkets: ["Bleeding Pendant", "Double-Edged Pendant"] }
      ],
      note: "야만인의 Iron Swan 과 사냥개 조련사의 Hound's Rush 로 매 라운드 Stalk 를 먼저 지운다. 역병 의사의 Blinding Gas 는 Cyst 와 Stalk 를 한꺼번에 기절시킬 수 있고(횟수 제한), Plague Grenade 는 둘에게 동시에 중독을 건다. Cyst 가 재소환하려 할 때 Blackjack 으로 행동을 지운다."
    },
    altParty: {
      name: "표식 + 고행자 파티",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Sacred Scroll"] },
        { hero: "Arbalest", skills: ["Sniper Shot", "Sniper's Mark", "Battlefield Bandage", "Suppressing Fire"], trinkets: ["Bull's Eye Bandana"] },
        { hero: "Houndmaster", skills: ["Hound's Rush", "Target Whistle", "Blackjack", "Guard Dog"], trinkets: ["Beast Slayer's Ring"] },
        { hero: "Flagellant", skills: ["Rain of Sorrows", "Punish", "Redeem", "Reclaim"], trinkets: ["Punishment's Hood", "Eternity's Collar"] }
      ],
      note: "고행자의 Rain of Sorrows 가 3·4열을 함께 때려 Cyst 와 Stalk 에 동시에 출혈을 건다. 석궁사수는 Sniper Shot 으로 Stalk 를 저격하다가, Stalk 가 없을 때 표식이 걸린 Cyst 를 쏜다. 중독 제거 스킬이 없으니 해독제를 더 챙긴다."
    },
    reward: "Locus Beacon 을 활성화하면 원정 완수 — 최종 원정이 열리고 마을의 모든 영웅 스트레스가 사라진다. 지도상의 상자 하나에 Ancestor 장신구가 들어 있다."
  },
  {
    id: "heart-of-darkness",
    en: "Heart of Darkness", ko: "어둠의 심장", alt: ["하트 오브 다크니스", "암흑의 심장", "선조", "Ancestor", "최종 보스"],
    group: "darkest",
    quest: "Hell is in the Heart — 가장 어두운 던전 4차(최종) 원정 (짧은 길이). 복도 하나를 지나 4단계 연속 보스전(Ancestor 2단계 → Gestating Heart → Heart of Darkness)",
    img: "HoD.png",
    type: "우주적 존재(Cosmic)", size: 4,
    hp: [252],
    res: { stun: [87.5], blight: [47.5], bleed: [47.5], debuff: [67.5], move: [88] },
    summary: "네 단계가 쉬지 않고 이어지는 최종전. 마지막 단계는 체력이 2/3, 1/3 이하로 내려갈 때마다 플레이어가 고른 영웅 한 명을 즉사시키므로, 누구를 남길지 정해 두고 들어가는 싸움이다. (수치는 최종 단계 기준, 최고 난이도 모드 체력 303)",
    prep: [
      "이 원정은 후퇴할 수 없다. 허기 판정이 없고 횃불 표시도 사라지므로 음식과 횃불은 필요 없다. 치유·상태 이상 보급품으로만 채운다.",
      "횃불을 끌 수 없어 어둠 조건 장신구(Moon Ring 등)는 작동하지 않는다. 밝음 조건 장신구(Sun Ring 등)는 작동한다.",
      "네 열 모두를 때릴 수 있는 구성이 편하다. 2단계의 Ancestor 가 계속 자리를 옮기기 때문이다.",
      "마지막에 남길 두 명(스스로 버티며 딜할 수 있는 영웅)과 먼저 보낼 두 명(치유사·지원가)을 미리 정한다.",
      "사망자 수 제한이 있는 모드(Stygian/Bloodmoon)에서는 Come Unto Your Maker 의 희생도 사망으로 집계된다. 남은 여유가 적으면 인원을 줄여 들어가는 방법이 있다."
    ],
    mech: [
      "1단계 Ancestor(체력 5, 직접 피해 면역): Perfect Reflection 3체를 소환하고 이후 매 라운드 빈자리를 채운다. 가끔 섞여 나오는 Imperfect Reflection 을 죽일 때마다 본체가 1 피해를 받는다(5번 필요). 네 칸이 모두 찬 채로 그의 턴이 오면 Time Heals All 로 분신 전체를 회복시킨다.",
      "2단계 Ancestor(체력 252, 기절 저항 72.5%, 이동 저항 0%): 무적 장애물 Absolute Nothingness 3체 뒤에 선다. Refashion Them(2명, 출혈 5)·Unmake Them All(전체, 출혈 3)을 쓰며 스스로 위치를 섞고, Embrace Futility 로 한 명을 섞고 피해·속도·치명타를 약화시킨다.",
      "3단계 Gestating Heart(체력 189): 이 대상에게 스킬을 쓴 영웅은 체력 12 를 회복하고 높은 확률로 약한 중독에 걸린다. 본체는 약한 전체 중독(Dispersion)만 쓰다가 3라운드째에 최종 형태로 변한다. 직접 죽이면 초과 피해가 최종 단계로 이월된다.",
      "4단계 Heart of Darkness(1회 행동): Know This(스트레스 +22), Puncture(13~16 피해 + 출혈 5), Dissolution(13~16 피해 + 기절 + 중독 5). 같은 기술을 연속으로 쓰지 않는다.",
      "Come Unto Your Maker: 체력이 2/3 이하이고 생존자가 4명일 때, 그리고 1/3 이하이고 생존자가 3명일 때 발동한다. 플레이어가 고른 영웅이 체력·저항과 무관하게 즉사한다. 기절로도 막을 수 없고, 지속 피해로 선을 넘겨도 발동한다.",
      "한 번의 공격으로 두 선을 동시에 넘기고도 죽이지 못하면 연속으로 두 명을 잃는다."
    ],
    strat: [
      "1단계: 매 라운드 분신을 최소 하나는 죽인다. 방금 소환된 분신은 그 라운드에 행동하지 않으니, 많이 죽일수록 맞는 횟수가 준다. 분신은 기절 저항이 낮다.",
      "2단계: Ancestor 가 사거리 밖일 때 근접 영웅은 자기 치유·강화에 턴을 쓴다. 이동 저항이 0% 라 당기기 기술로 원하는 열에 끌어올 수 있고, 기절·출혈·중독이 모두 잘 걸린다.",
      "2단계 막바지에 Ancestor 를 기절시켜 놓고 체력과 스트레스를 정비한다. 다음 단계는 3라운드 제한이 있어 준비 시간이 짧다.",
      "3단계: 공격하면 체력이 차므로 전원이 Gestating Heart 를 때려 회복하고, 가능하면 3라운드 안에 죽여 최종 단계 체력을 깎아 둔다.",
      "4단계: 2/3 선(약 168)을 넘길 때는 희생시킬 영웅이 마지막 타격을 하게 해 손해를 줄인다. 첫 희생은 치유사·지원가, 끝까지 남길 것은 딜러 둘이다.",
      "1/3 선(약 84) 직전에서 강화와 약화를 쌓고 한 번에 몰아쳐, 두 번째 즉사 전에 끝내거나 그 직후 바로 마무리한다. 큰 한 방(Finale, 강화된 Chop 등)이 있으면 유리하다.",
      "Dissolution 은 기절·중독 저항이 낮은 영웅을, Puncture 는 출혈 저항이 낮은 영웅을 노린다. 끝까지 남길 영웅의 기절 저항을 챙긴다."
    ],
    bring: [
      "붕대(Bandage): 2단계와 최종 단계의 출혈 5 대응. 넉넉히.",
      "해독제(Antivenom): Gestating Heart 와 Dissolution 의 중독 대응.",
      "성수(Holy Water): 최종 단계 직전 생존 예정 영웅의 저항 보강.",
      "약초(Medicinal Herbs): Embrace Futility 의 피해·속도 약화 제거.",
      "음식·횃불·삽·만능 열쇠·아편 팅크는 필요 없다."
    ],
    good: ["Crusader", "Highwayman", "Hellion", "Leper", "Plague Doctor", "Vestal", "Jester"],
    bad: [],
    goodWhy: "마지막 두 명은 스스로 회복하거나 반격·고화력으로 빨리 끝낼 수 있는 성전사·노상강도·야만인·나병 환자가 좋다. 앞 단계를 받쳐 줄 치유사와 강화 지원가는 먼저 희생시킬 후보로 데려간다.",
    party: {
      name: "정석 파티 (성전사 + 노상강도 마무리)",
      slots: [
        { hero: "Vestal", skills: ["Divine Grace", "Divine Comfort", "Judgement", "Dazzling Light"], trinkets: ["Sacred Scroll", "Tome of Holy Healing"] },
        { hero: "Plague Doctor", skills: ["Noxious Blast", "Plague Grenade", "Blinding Gas", "Battlefield Medicine"], trinkets: ["Blasphemous Vial"] },
        { hero: "Highwayman", skills: ["Wicked Slice", "Pistol Shot", "Duelist's Advance", "Open Vein"], trinkets: ["Martyr's Seal", "Sharpening Sheath"] },
        { hero: "Crusader", skills: ["Smite", "Stunning Blow", "Battle Heal", "Inspiring Cry"], trinkets: ["Holy Orders", "Legendary Bracer"] }
      ],
      note: "1단계는 역병 의사의 Blinding Gas 로 분신을 묶고 하나씩 지운다. 2단계는 Pistol Shot 과 Plague Grenade 로 뒷열의 Ancestor 를 따라가고, 최종 단계는 낮은 저항(47.5%)에 출혈·중독을 건다. 즉사는 성녀 → 역병 의사 순으로 보내고, 성전사(치유·스트레스 회복)와 노상강도(반격·화력)가 마무리한다."
    },
    altParty: {
      name: "강화 폭딜 파티 (나병 환자 한 방)",
      slots: [
        { hero: "Plague Doctor", skills: ["Emboldening Vapours", "Plague Grenade", "Battlefield Medicine", "Blinding Gas"], trinkets: ["Blasphemous Vial"] },
        { hero: "Jester", skills: ["Battle Ballad", "Inspiring Tune", "Harvest", "Dirk Stab"], trinkets: ["Bright Tambourine"] },
        { hero: "Hellion", skills: ["Wicked Hack", "If It Bleeds", "Breakthrough", "Adrenaline Rush"], trinkets: ["Martyr's Seal", "Bleeding Pendant"] },
        { hero: "Leper", skills: ["Chop", "Hew", "Revenge", "Solemnity"], trinkets: ["Fortunate Armlet", "Legendary Bracer"] }
      ],
      note: "1/3 선 직전에서 멈춘 뒤 역병 의사의 Emboldening Vapours 와 나병 환자 자신의 Revenge 를 겹쳐 Chop 한 방으로 넘기는 구성. 2단계에서 Ancestor 가 뒤로 빠지면 나병 환자는 Solemnity 로 회복하거나 Revenge 를 쌓는다. 즉사는 광대·역병 의사부터 보내고 야만인과 나병 환자가 남는다."
    },
    reward: "처치 시 엔딩 — 게임 클리어. 복도 중간 비밀 방의 상자에 특수 아이템이 하나 있다."
  }
];
