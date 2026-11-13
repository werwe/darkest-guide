// 마을(Hamlet)·마을 이벤트 데이터. 수치 출처: Darkest Dungeon Wiki (darkestdungeon.wiki.gg). 문장은 직접 작성.
const TOWN = {
  buildings: [
    { id:"stagecoach", en:"Stage Coach", ko:"역마차", alt:["스테이지코치","역마차 정류장","마차"],
      img:"Stage coach.icon.png",
      what:"매주 새 영웅을 무료로 영입하는 곳. 업그레이드하면 주간 후보 수, 영웅 명부 크기, 신병의 시작 레벨이 늘어난다.",
      upgrades:[
        { name:"역마차 연결망 (Stage Coach Network)", effect:"매주 영입 후보를 3→4→5→6→7명으로 늘린다(5단계). 다음 원정에서 돌아온 뒤부터 적용.", heirloom:"증서 + 문장", prio:"높음", why:"후보가 많아야 원하는 직업과 좋은 기벽을 가진 영웅을 골라 받을 수 있다." },
        { name:"영웅 병영 (Hero Barracks)", effect:"명부 크기를 12→16→20→24→28명으로 늘린다(광휘 모드는 상한이 조금 더 높고, DLC 영웅을 켜면 종류당 +1).", heirloom:"증서 + 문장", prio:"높음", why:"스트레스 휴식 로테이션과 던전별 전문 파티를 돌리려면 인원이 필요하다." },
        { name:"숙련된 신병 (Experienced Recruits)", effect:"레벨 1(18.75%)·2(12.5%)·3(6.25%) 신병이 나올 확률이 생긴다. 레벨이 있는 신병은 장비·스킬이 그 레벨만큼 올라 있다. 단계별로 길드·대장간의 같은 등급 업그레이드가 선행 조건.", heirloom:"흉상 + 문장", prio:"중간", why:"중반 이후 전멸 복구와 고레벨 충원 비용을 크게 줄여 주지만 초반에는 선행 조건 때문에 올릴 수 없다." }
      ],
      tips:[
        "첫 원정(The Old Road) 직후 연결망을 최소 2단계까지 올려 두면 초반 명부가 빨리 찬다.",
        "영입은 무료이므로 기벽이 나쁜 영웅은 미련 없이 해고하고 새로 받는 편이 요양원 비용보다 싸다.",
        "시작 영웅 성전사(Crusader)는 Kleptomaniac 기벽을 달고 있으니 대체할 전열 영웅을 일찍 확보한다.",
        "레벨 1 이상 신병은 전투 스킬이 전부 열려 있고 야영 스킬도 하나 더 열려 있다."
      ] },
    { id:"guild", en:"Guild", ko:"길드", alt:["조합","훈련소"],
      img:"Guild.icon.png",
      what:"영웅의 전투 스킬을 새로 배우거나 등급을 올리는 곳.",
      upgrades:[
        { name:"교관 숙련 (Instructor Mastery)", effect:"스킬 등급 상한을 2→3→4→5로 올린다(4단계). 영웅 결의 레벨 1·2·3·5가 각각 필요.", heirloom:"초상화 + 문장", prio:"높음", why:"스킬 등급은 명중·피해·치유량에 직결되어 숙련·챔피언 던전의 최소 조건이다." },
        { name:"훈련 체계 (Training Regimen)", effect:"스킬 훈련 비용을 단계당 10%씩, 최대 50% 줄인다(5단계).", heirloom:"초상화 + 문장", prio:"중간", why:"영웅 수가 늘수록 절약액이 커지지만 상한 해금보다 급하지는 않다." }
      ],
      tips:[
        "쓰는 스킬 4개만 올린다. 스킬 해금은 기본 1000골드, 등급 2~5는 250/750/1250/2500골드라 전부 올리면 낭비가 크다.",
        "영웅 결의 레벨이 오르면 그 주에 주력 스킬부터 등급을 맞춘다. 치유·기절 스킬은 등급 차이가 체감이 크다."
      ] },
    { id:"blacksmith", en:"Blacksmith", ko:"대장간", alt:["대장장이","블랙스미스"],
      img:"Blacksmith.icon.png",
      what:"무기(피해·치명타·속도)와 갑옷(최대 HP·회피)을 강화하는 곳.",
      upgrades:[
        { name:"무기 제작 (Weaponsmithing)", effect:"무기 등급 상한을 2→3→4→5로 올린다. 영웅 결의 레벨 1·2·3·5 필요.", heirloom:"증서 + 문장", prio:"높음", why:"피해량이 올라야 전투가 짧아지고 그만큼 받는 피해와 스트레스가 줄어든다." },
        { name:"갑옷 제작 (Armorsmithing)", effect:"갑옷 등급 상한을 2→3→4→5로 올린다. 영웅 결의 레벨 1·2·3·5 필요.", heirloom:"증서 + 문장", prio:"높음", why:"최대 HP와 회피가 올라 죽음의 문턱(Death's Door)에 가는 횟수가 줄어든다." },
        { name:"용광로 (Furnace)", effect:"무기·갑옷 강화 비용을 단계당 10%씩, 최대 50% 줄인다(5단계).", heirloom:"증서 + 문장", prio:"높음", why:"장비 강화는 마을 지출 중 가장 큰 항목이라 일찍 올릴수록 누적 절약이 크다." }
      ],
      tips:[
        "등급 5 장비는 가장 어두운(Darkest) 난이도 기준 기본 6000골드다. 용광로를 끝까지 올리면 3000골드로 내려간다.",
        "Weapon Tinker / Armor Tinker 기벽이 있으면 해당 강화 비용이 20% 더 싸다.",
        "해만(Cove)의 수집(Gathering) 퀘스트를 끝내면 무기 1회 무료 강화 이벤트(Lost and Found)가 뜬다. 가장 비싼 등급에 쓴다."
      ] },
    { id:"sanitarium", en:"Sanitarium", ko:"요양원", alt:["요양소","정신병원","새니테리움"],
      img:"Sanitarium.icon.png",
      what:"기벽(Quirk)을 제거하거나 긍정 기벽을 고정하고, 질병을 치료하는 곳. 4주차에 열린다.",
      upgrades:[
        { name:"치료 서고 (Treatment Library)", effect:"기벽 치료(제거·고정) 비용을 단계당 10%씩, 최대 50% 줄인다(5단계).", heirloom:"흉상 + 문장", prio:"중간", why:"긍정 기벽 고정은 견습 기준 7500골드로 비싸서, 본격적으로 고정을 시작하기 전에 올려 두면 이득이다." },
        { name:"의료 기구 (Medical Devices)", effect:"1·3·5단계는 질병 치료비 13% 감소, 2·4단계는 한 번에 질병을 추가로 치료할 확률 증가.", heirloom:"흉상 + 문장", prio:"낮음", why:"질병 치료비는 원래 싸다(견습 750골드)." },
        { name:"환자 병실 (Patient Cells)", effect:"질병 병동과 기벽 병동 슬롯을 번갈아 늘려 각각 최대 3칸으로 만든다(4단계).", heirloom:"흉상 + 문장", prio:"중간", why:"기본은 병동마다 1칸뿐이라 치료 대기열이 금방 밀린다." }
      ],
      tips:[
        "한 번 입원으로 부정 기벽 1개 제거와 긍정 기벽 1개 고정(또는 제거)을 동시에 할 수 있다. 비용은 둘의 합.",
        "부정 기벽은 원정을 마칠 때마다 25% 확률로 고정되고, 고정된 부정 기벽 제거비는 견습 기준 1500→5000골드로 뛴다. 위험한 기벽은 생긴 주에 지운다.",
        "긍정 기벽은 영웅당 3개까지 고정할 수 있다.",
        "질병 치료와 기벽 치료는 같은 주에 한 영웅에게 동시에 할 수 없다."
      ] },
    { id:"tavern", en:"Tavern", ko:"선술집", alt:["주점","여관","태번"],
      img:"Tavern.icon.png",
      what:"골드를 내고 영웅을 한 주 쉬게 해 스트레스를 줄이는 곳. 술집·도박장·사창가 세 가지 활동이 있다.",
      upgrades:[
        { name:"술집 (Bar)", effect:"기본 스트레스 45 회복(견습 1000골드). 6단계에 걸쳐 회복량 56→70, 비용 15%씩 2회 감소, 슬롯 2→3칸.", heirloom:"초상화 + 문장", prio:"중간", why:"가장 싸지만 부작용 종류가 많다. 슬롯 확장까지만 올려도 충분하다." },
        { name:"도박장 (Gambling Hall)", effect:"기본 스트레스 55 회복(견습 1250골드). 업그레이드 시 69→86.", heirloom:"초상화 + 문장", prio:"낮음", why:"골드나 장신구를 잃을 수 있어 주력으로 쓰기 어렵다." },
        { name:"사창가 (Brothel)", effect:"기본 스트레스 65 회복(견습 1500골드). 업그레이드 시 81→100.", heirloom:"초상화 + 문장", prio:"중간", why:"회복량이 가장 커서 스트레스가 한계에 가까운 영웅을 한 번에 비울 수 있다." }
      ],
      tips:[
        "모든 활동은 37.5% 확률로 부작용(긍정 또는 부정)이 붙는다. 결근, 골드 손실, 새 기벽이 대표적이다.",
        "도박장에 보내기 전에 장신구를 반드시 벗긴다. 착용 중인 장신구가 있으면 잃을 때 그것부터 사라진다.",
        "붕괴(Affliction) 상태도 선술집이나 수도원에서 한 주 쉬면 함께 사라진다.",
        "진홍빛 저주(Crimson Curse)에 걸린 영웅을 넣으면 같은 시설의 다른 영웅에게 옮길 수 있다."
      ] },
    { id:"abbey", en:"Abbey", ko:"수도원", alt:["사원","수도회","애비"],
      img:"Abbey.icon.png",
      what:"선술집과 같은 방식의 스트레스 해소 시설. 회랑·익랑·참회실 세 가지 활동이 있다.",
      upgrades:[
        { name:"회랑 (Cloister) - 명상", effect:"기본 스트레스 45 회복(견습 1000골드). 6단계에 걸쳐 회복량 56→70, 비용 15%씩 2회 감소, 슬롯 2→3칸.", heirloom:"흉상 + 문장", prio:"중간", why:"싸고 골드를 잃는 부작용이 없어 가벼운 스트레스 처리에 좋다." },
        { name:"익랑 (Transept) - 기도", effect:"기본 스트레스 55 회복(견습 1250골드). 업그레이드 시 69→86.", heirloom:"흉상 + 문장", prio:"중간", why:"회복량과 비용의 균형이 좋고 장신구를 선물받는 긍정 효과도 있다." },
        { name:"참회실 (Penance Hall) - 고행", effect:"기본 스트레스 65 회복(견습 1500골드). 업그레이드 시 81→100.", heirloom:"흉상 + 문장", prio:"낮음", why:"회복량은 최대지만 흉상은 요양원과 겹쳐서 사창가 쪽을 먼저 올리는 편이 가보 배분이 편하다." }
      ],
      tips:[
        "수도원 부작용에는 장신구 분실이 없다. 골드 손실도 기도의 기부(1000골드) 한 가지뿐이다.",
        "고행에는 다음 원정까지 피해 +20%가 붙는 긍정 효과와 출혈 저항 -25%가 붙는 부정 효과가 있다.",
        "퀘스트 'Reclaim Relics of the Light'(폐허)를 끝내면 수도원 전체가 무료가 되는 이벤트(All Saints Day)가 뜬다."
      ] },
    { id:"survivalist", en:"Survivalist", ko:"생존술사", alt:["생존 전문가","생존주의자","야영 교관"],
      img:"Camping trainer.icon.png",
      what:"영웅에게 야영 스킬을 가르치는 곳. 어느 지역이든 첫 보스가 등장하는 단계가 되면 열린다.",
      upgrades:[
        { name:"모닥불 (Bonfire)", effect:"야영 스킬 학습 비용(기본 1750골드)을 단계당 10%씩 줄여 최대 875골드로 만든다(5단계).", heirloom:"문장", prio:"낮음", why:"영웅당 필요한 야영 스킬은 한두 개라 총 지출이 작다." }
      ],
      tips:[
        "영웅은 야영 스킬 3개로 시작하며 4개까지 장착할 수 있다. 장착 스킬은 원정 중에도 바꿀 수 있다.",
        "야습 방지 스킬(Zealous Vigil, Bandit's Sense, Hound's Watch 등)과 직업 고유 강화 스킬부터 배운다.",
        "문장만 쓰는 시설이라 문장이 남을 때 조금씩 올리면 된다."
      ] },
    { id:"nomad", en:"Nomad Wagon", ko:"유랑 마차", alt:["유목민 마차","방랑자의 마차","노마드 왜건"],
      img:"Nomad wagon.icon.png",
      what:"매주 바뀌는 장신구(Trinket)를 골드로 파는 상점. The Color of Madness DLC에서는 혜성 파편으로 수정 장신구를 파는 보석상(Jeweler)도 이곳에 있다.",
      upgrades:[
        { name:"마차 크기 (Wagon Size)", effect:"진열 장신구 수를 4→6→8→12개로 늘린다(4단계).", heirloom:"문장", prio:"낮음", why:"원하는 장신구가 뜰 확률은 오르지만 가격이 비싸 자주 사지 못한다." },
        { name:"상인 연결망 (Merchant Network)", effect:"장신구 가격을 단계당 10%씩, 최대 50% 줄인다(5단계).", heirloom:"문장", prio:"낮음", why:"희귀 등급은 기본 15000골드, 매우 희귀는 25000골드라 할인 없이는 사기 어렵다." }
      ],
      tips:[
        "진열 확률은 흔한 등급 쪽에 몰려 있다(매우 희귀 6%, 희귀 11%). 초반 골드는 장비와 스킬에 먼저 쓴다.",
        "Nomad New Year 이벤트 주에는 전 품목이 50% 할인된다. 골드가 넉넉하면 이때 핵심 장신구를 산다.",
        "후반에 골드가 남기 시작하면 문장을 몰아 넣어 할인을 끝까지 올린다."
      ] },
    { id:"memoirs", en:"Ancestor's Memoirs", ko:"선조의 회고록", alt:["선조의 조각상","조상의 회고록","석상"],
      img:"Statue.icon.png",
      what:"마을 광장의 조각상. 보스를 잡아 해금한 선조의 회고와 주운 일지 쪽지, 컷신을 다시 볼 수 있다.",
      upgrades:[],
      tips:[
        "게임 진행에 영향을 주는 기능은 없다. 업그레이드도 없다.",
        "마을 이벤트가 있는 주에는 화면 아래 바로가기로 공지를 다시 열어 볼 수 있다."
      ] },
    { id:"graveyard", en:"Graveyard", ko:"묘지", alt:["공동묘지","무덤"],
      img:"Graveyard.icon.png",
      what:"전사한 영웅의 이름, 레벨, 직업, 사망 경위가 기록되는 곳.",
      upgrades:[],
      tips:[
        "묘지에 3명 이상 묻혀 있으면 From Beyond 이벤트가 뜰 수 있고, 무작위 3명 중 1명을 되살릴 수 있다.",
        "부활한 영웅은 결의 레벨과 기벽은 유지하지만 스킬과 장비 등급이 초기화된다. 명부에 빈자리가 있어야 받을 수 있다."
      ] }
  ],

  priority: [
    { step:1, title:"역마차 연결망과 병영", detail:"첫 주에 연결망을 2단계까지 올리고, 이어서 병영을 넓혀 명부를 16명 이상으로 만든다. 인원이 있어야 스트레스 받은 영웅을 쉬게 하면서 원정을 계속 돌릴 수 있다." },
    { step:2, title:"대장간·길드 등급 2 해금", detail:"무기·갑옷 제작과 교관 숙련 1단계는 가보가 적게 든다(증서 8+문장 8, 초상화 6+문장 14). 주력 영웅이 결의 레벨 1이 되기 전에 열어 둔다." },
    { step:3, title:"용광로 할인", detail:"장비 강화는 지출이 가장 큰 항목이므로 증서가 모이는 대로 용광로를 올린다. 삼림(Weald)을 자주 돌아 증서를 확보한다." },
    { step:4, title:"스트레스 시설 슬롯 확장", detail:"자주 쓰는 활동 한두 개만 3단계(슬롯 2칸)까지 올린다. 여러 활동을 고르게 올리는 것보다 한 곳을 집중하는 편이 싸다." },
    { step:5, title:"등급 3 해금 (숙련 던전 대비)", detail:"영웅들이 결의 레벨 2~3에 닿기 전에 대장간과 길드를 등급 3까지 연다. 숙련(Veteran) 던전은 장비·스킬 등급 3이 사실상 기준이다." },
    { step:6, title:"요양원 병실과 치료 서고", detail:"주력 영웅이 정해지면 환자 병실을 늘리고 치료 서고로 비용을 낮춘 뒤 긍정 기벽을 고정하기 시작한다." },
    { step:7, title:"등급 4~5 해금 (챔피언 던전 대비)", detail:"결의 레벨 3과 5에서 열리는 등급 4·5는 가보가 가장 많이 든다(대장간 등급 5는 증서 44+문장 49). 챔피언(Champion) 던전에 들어가기 전에 무기·갑옷·스킬을 모두 맞춘다." },
    { step:8, title:"숙련된 신병과 훈련 체계", detail:"길드와 대장간 등급이 열린 뒤 숙련된 신병을 올려 고레벨 충원을 쉽게 하고, 남는 초상화로 훈련 체계 할인을 채운다." },
    { step:9, title:"유랑 마차·생존술사 마무리", detail:"문장만 쓰는 두 시설은 마지막에 올린다. 후반에 골드가 남으면 유랑 마차 할인으로 부족한 장신구를 채운다." }
  ],

  weekly: [
    "마을 이벤트 공지를 먼저 확인한다. 무료·할인 시설이 있으면 그 주 계획을 거기에 맞춘다.",
    "스트레스가 높거나 붕괴(Affliction) 상태인 영웅을 선술집이나 수도원에 넣는다. 스트레스가 낮은 영웅은 그냥 대기시켜도 매주 5씩 줄어든다.",
    "위험한 부정 기벽(강제 상호작용 계열 등)을 얻은 영웅을 요양원 기벽 병동에 넣는다. 고정되기 전이 훨씬 싸다.",
    "질병에 걸린 영웅을 요양원 질병 병동에 넣는다. 치료 주에는 기벽 치료를 같이 할 수 없으니 급한 쪽부터 처리한다.",
    "역마차에서 신병을 확인한다. 필요한 직업이거나 긍정 기벽이 좋으면 영입하고, 명부가 차면 기벽이 나쁜 저레벨 영웅을 해고한다.",
    "결의 레벨이 오른 영웅의 무기·갑옷을 대장간에서, 사용하는 스킬 4개를 길드에서 올린다.",
    "모은 가보로 건물 업그레이드를 한다. 부족한 종류는 교환할 수 있지만 손해가 크므로 급할 때만 쓴다.",
    "유랑 마차 진열품을 훑어보고, 골드가 남을 때만 핵심 장신구를 산다.",
    "다음 원정 던전에 맞춰 파티·장신구·야영 스킬을 정하고, 던전에 맞는 보급품을 산다.",
    "이번 주에 쉬는 영웅과 다음 주에 나갈 영웅을 미리 정해 로테이션이 끊기지 않게 한다."
  ],

  stress: [
    "회복량은 활동 등급으로 정해진다. 술집·명상 45, 도박·기도 55, 사창가·고행 65가 기본이고 업그레이드 두 번으로 70/86/100까지 오른다. 스트레스가 40 안팎이면 싼 활동으로 충분하다.",
    "비용은 영웅 레벨에 따라 오른다. 술집·명상 기준 견습 1000, 숙련 1400, 챔피언 1800골드다.",
    "모든 활동에 37.5% 확률로 부작용이 붙는다. 한두 주 실종되거나 같은 시설에 한 주 더 머무는 결과가 흔하므로, 다음 주에 꼭 써야 하는 영웅은 부작용이 적은 활동에 넣는다.",
    "골드·장신구 손실은 선술집에만 있다(술집 500골드, 도박 1000골드, 사창가 750골드, 장신구 분실). 수도원은 기도의 기부 1000골드뿐이다. 선술집에 보낼 때는 장신구를 벗긴다.",
    "기벽이 이용을 막는 경우가 있다. Resolution은 술집, Known Cheat는 도박장, Deviant Tastes는 사창가, Unquiet Mind는 명상, Witness는 기도, Faithless는 기도와 고행을 쓸 수 없다.",
    "반대로 Tippler, Gambler, Love Interest, Enlightened, God Fearing, Flagellant(기벽)는 해당 활동 하나만 쓰게 만든다. '이것만 가능'과 '이것 불가'가 겹치면 마을에서 스트레스를 풀 수 없으니 요양원에서 하나를 지운다.",
    "쉬는 영웅은 매주 스트레스가 5씩 줄어든다. 인형 극장(Puppet Theater) 구역을 지으면 15로 늘어난다."
  ],

  quirks: {
    lock: [
      { en:"Quick Reflexes", ko:"빠른 반사신경", why:"속도 +2가 조건 없이 항상 적용된다. 어떤 직업에도 쓸모 있다." },
      { en:"On Guard", ko:"경계 태세", why:"첫 턴에 속도 +4와 회피 +5. 첫 턴 선공이 중요한 기절·치유 담당에게 특히 좋다." },
      { en:"Quickdraw", ko:"속사", why:"첫 턴 속도 +4. On Guard와 겹치면 첫 턴을 거의 확실히 먼저 잡는다." },
      { en:"Natural Swing", ko:"타고난 스윙", why:"명중 +5가 조건 없이 붙는다. 빗나감은 피해 손실과 스트레스로 이어지므로 가치가 높다." },
      { en:"Precise Striker", ko:"정밀 타격", why:"근접 치명타 +5%. 치명타는 아군 스트레스도 줄여 주므로 근접 딜러에게 고정한다." },
      { en:"Eagle Eye", ko:"매의 눈", why:"원거리 치명타 +5%. 석궁사수, 노상강도, 도굴꾼 같은 원거리 딜러용." },
      { en:"Slugger", ko:"강타자", why:"근접 피해 +10%. 근접 딜러의 기본 화력을 올린다." },
      { en:"Unerring", ko:"백발백중", why:"원거리 피해 +10%. 원거리 딜러의 기본 화력을 올린다." },
      { en:"Tough", ko:"튼튼함", why:"최대 HP +10%. 전열 탱커와 HP가 낮은 후열 모두에게 유효하다." },
      { en:"Hard Skinned", ko:"단단한 피부", why:"방어(PROT) +10%. 전열 영웅이 받는 피해를 꾸준히 줄여 준다." },
      { en:"Steady", ko:"침착함", why:"받는 스트레스 -10%. 장기 원정과 가장 어두운 던전에서 체감이 크다." },
      { en:"Unyielding", ko:"불굴", why:"죽음의 일격(Deathblow) 저항 +10%. 죽음의 문턱에서 버틸 확률이 오른다." }
    ],
    remove: [
      { en:"Kleptomaniac", ko:"도벽", why:"보물 계열 기물(Curio)을 35% 확률로 멋대로 열고 전리품을 빼돌린다." },
      { en:"Curious", ko:"호기심", why:"종류를 가리지 않고 모든 기물을 20% 확률로 멋대로 건드린다. 보급품을 써서 안전하게 여는 선택을 빼앗긴다." },
      { en:"Compulsive", ko:"강박", why:"Curious와 마찬가지로 모든 기물을 20% 확률로 강제 상호작용한다." },
      { en:"Hylomania", ko:"물욕", why:"보물 계열 기물을 40% 확률로 멋대로 연다(Plutomania도 같은 효과). 보급품을 써서 여는 선택을 할 수 없게 된다." },
      { en:"Dark Temptation", ko:"어둠의 유혹", why:"불경 계열 기물을 40% 확률로 건드린다(Demonomania도 같은 효과). 보급품 없이 맨손으로 건드리므로 불이익을 그대로 받는다." },
      { en:"Necromania", ko:"시체 애호", why:"시체 계열 기물을 40% 확률로 건드린다. 보급품 없이 열기 때문에 다치거나 질병에 걸리기 쉽다." },
      { en:"The Yips", ko:"입스", why:"명중 -5가 항상 적용된다. 딜러와 기절 담당에게 치명적이다." },
      { en:"Off Guard", ko:"방심", why:"첫 턴 속도 -4, 회피 -5. 첫 턴에 치유나 기절을 넣어야 하는 영웅의 역할을 망친다." },
      { en:"Nervous", ko:"신경과민", why:"받는 스트레스 +10%가 모든 던전에서 적용된다." },
      { en:"Fragile", ko:"허약", why:"최대 HP -10%. 죽음의 문턱에 가는 빈도가 눈에 띄게 늘어난다." },
      { en:"Weak Grip on Life", ko:"약한 생명줄", why:"죽음의 일격 저항 -10%. 영웅을 잃을 확률을 직접 올린다." },
      { en:"Claustrophobia", ko:"폐소공포증", why:"복도에서 받는 스트레스 +20%. 던전 이동 대부분이 복도라 사실상 상시 불이익이다." }
    ]
  },

  heirlooms: [
    { en:"Bust", ko:"흉상", img:"Bust.png", from:"폐허(Ruins)", use:"수도원, 요양원, 역마차의 숙련된 신병. 던전에서 6개까지 겹친다. 교환 시 증서와 3:2, 문장으로는 2개당 3개." },
    { en:"Portrait", ko:"초상화", img:"Portrait.png", from:"사육장(Warrens)", use:"길드, 선술집. 교환 가치가 가장 높지만(초상화 1개 = 문장 3개) 한 칸에 3개만 겹친다." },
    { en:"Deed", ko:"증서", img:"Deed.png", from:"삼림(Weald)", use:"대장간, 역마차의 연결망·병영. 던전에서 6개까지 겹친다. 초반에 가장 많이 필요하다." },
    { en:"Crest", ko:"문장", img:"Crest.png", from:"해만(Cove)", use:"모든 건물 업그레이드에 공통으로 들어가고 유랑 마차·생존술사는 문장만 쓴다. 12개까지 겹치지만 교환 가치는 가장 낮다(3개당 흉상·증서 1개, 6개당 초상화 1개)." },
    { en:"Blueprint", ko:"설계도", img:"Blueprint.png", from:"마을 이벤트 Cornerstone으로 1장, 이후 숙련·챔피언 등급 원정 보스", use:"구역(District) 건설에 1장씩 필요. 견습 보스와 미니 보스(The Collector, Shambler, Fanatic)는 떨어뜨리지 않는다." },
    { en:"Comet Shard", ko:"혜성 파편", img:"Shard.png", from:"농장(Farmstead)의 기물과 끝없는 수확 보스, 방랑 보스 Thing from the Stars", use:"보석상의 수정 장신구, CoM 구역 건설. 가보로 바꿀 수 있지만(문장 3:2, 흉상·증서 3:1, 초상화 6:1) 가보를 파편으로 바꿀 수는 없다." }
  ],

  districts: [
    { en:"Bank", ko:"은행", dlc:"CC", cost:"15000골드(광휘 0) + 초상화 50 + 설계도 1", effect:"보유 골드에 매주 5% 이자가 붙는다.", prio:"높음", note:"일찍 지을수록 누적 이득이 커서 첫 설계도 후보로 가장 많이 꼽힌다. 다만 15000골드를 내고도 저축이 남아 있어야 의미가 있다." },
    { en:"Granary", ko:"곡물 창고", dlc:"CC", cost:"2500골드(광휘 0) + 흉상 60 + 설계도 1", effect:"음식을 먹을 때 치유 +15%, 매주 무료 음식 4~10개(보급 화면에서 추가 지급, 비축 불가).", prio:"중간", note:"싸고 매 원정 보급비를 줄여 준다. 골드가 빠듯한 초반의 첫 구역으로 무난하다." },
    { en:"Puppet Theater", ko:"인형 극장", dlc:"CC", cost:"5000골드(광휘 1000) + 문장 200 + 설계도 1", effect:"대기 중인 영웅의 주간 스트레스 회복이 5에서 15로 늘어난다.", prio:"중간", note:"명부가 클수록 스트레스 시설 지출을 줄여 준다. 문장 200개가 부담이라 두 번째 이후로 추천." },
    { en:"Cartographer's Camp", ko:"지도 제작자의 야영지", dlc:"CC", cost:"5000골드(광휘 1000) + 문장 300 + 설계도 1", effect:"밝기 단계별 보상 강화: 전리품 증가, 치명타 +1%, 정찰 +2.5%, 적 기습 +5%, 아군 피습 -5%, 가장 밝은 단계에서 회피 추가. 안뜰과 농장에서는 적용되지 않는다.", prio:"중간", note:"횃불을 밝게 유지하는 플레이라면 모든 파티가 혜택을 받는다. 문장 300개가 필요해 후순위." },
    { en:"Sanguine Vintners", ko:"핏빛 양조장", dlc:"CC", cost:"흉상 80 + 설계도 1", effect:"매주 혈액(The Blood) 2병을 생산한다.", prio:"중간", note:"진홍빛 저주에 걸린 영웅이 많아 혈액이 부족할 때만 가치가 있다. 저주를 관리하고 있다면 건너뛴다." },
    { en:"The Red Hook", ko:"붉은 갈고리 기념비", dlc:"CC", cost:"50000골드(광휘 25000) + 문장 750 + 설계도 1", effect:"게임상 효과 없음(기념물).", prio:"낮음", note:"마을 완전 복구 목표가 아니라면 지을 이유가 없다. 가장 마지막에 짓는다." },
    { en:"House of the Yellow Hand", ko:"노란 손의 집", dlc:"CC", cost:"5000골드(광휘 1000) + 초상화 100 + 설계도 1", effect:"현상금 사냥꾼, 도굴꾼, 노상강도: 치명타 +4%, 정찰 +5%.", prio:"중간", note:"세 직업을 주력으로 쓰면 효율이 좋지만 초상화 100개는 길드·선술집과 경쟁한다." },
    { en:"Altar of Light", ko:"빛의 제단", dlc:"CC", cost:"5000골드(광휘 100) + 증서 200 + 설계도 1", effect:"성전사, 성녀, 고행자: 기절 저항 +10%, 치유 스킬 +10%.", prio:"중간", note:"성녀를 주 치유사로 쓰면 체감이 있다. 증서 200개는 대장간을 다 올린 뒤에 여유가 생긴다." },
    { en:"Training Ring", ko:"훈련장", dlc:"CC", cost:"5000골드(광휘 1000) + 문장 300 + 설계도 1", effect:"석궁사수, 사냥개 조련사, 중보병, 방패 파괴자, 머스킷 사수: 명중 +4, 최대 HP +10%.", prio:"중간", note:"적용 직업이 가장 많은 직업 구역이다. 해당 직업 위주 명부라면 직업 구역 중 먼저 짓는다." },
    { en:"Athenaeum", ko:"학술원", dlc:"CC", cost:"2500골드(광휘 1000) + 증서 110 + 설계도 1", effect:"골동품상, 신비학자, 역병 의사: 중독 스킬 확률 +15%, 약화 스킬 확률 +15%, 지식 계열 기물과 상호작용 시 스트레스 15 회복.", prio:"중간", note:"역병 의사와 신비학자를 자주 쓰면 값에 비해 효과가 좋다." },
    { en:"Performance Hall", ko:"공연장", dlc:"CC", cost:"2500골드(광휘 500) + 문장 75 + 설계도 1", effect:"광대: 받는 스트레스 -10%, 속도 +2, Finale 피해 +20%.", prio:"낮음", note:"가보는 가장 적게 들지만 한 직업 전용이다. 설계도가 남을 때 짓는다." },
    { en:"Outsiders Bonfire", ko:"이방인의 모닥불", dlc:"CC", cost:"1000골드(광휘도 동일) + 문장 300 + 설계도 1", effect:"파티에 흉물, 야만인, 나병 환자, 도망자(Runaway) 중 한 명이라도 있으면 야영 휴식 포인트 +2(중복 없음).", prio:"중간", note:"휴식 포인트가 12에서 14로 늘어 야영 스킬을 하나 더 쓸 수 있다. 긴 원정을 자주 가면 유용하다." },
    { en:"Académie Duello", ko:"결투 아카데미", dlc:"FE", cost:"문장 300 + 증서 25 + 설계도 1", effect:"반격(Riposte) 명중 +10, 회피 +3, 결투가(Duelist) 속도 +1.", prio:"낮음", note:"반격 스킬을 쓰는 영웅 위주로 파티를 짤 때만 고려한다." },
    { en:"Archaeological Base Camp", ko:"고고학 베이스캠프", dlc:"FE", cost:"15000골드 + 흉상 90 + 설계도 1", effect:"매주 가보 한 종류를 무작위 수량으로 받는다(문장 12/18/24, 초상화 3/4/6, 증서·흉상 6/9/12 중 하나).", prio:"중간", note:"일찍 지으면 건물 업그레이드가 빨라진다. 은행과 같은 골드 비용이라 둘 중 하나를 먼저 고른다." },
    { en:"Craftworks", ko:"공방", dlc:"FE", cost:"흉상 75 + 초상화 25 + 설계도 1", effect:"매주 무작위 장신구 1개를 받는다(일반 30%, 고급 37%, 희귀 20%, 매우 희귀 10%, 선조 3%).", prio:"중간", note:"골드가 들지 않고, 필요 없는 장신구는 팔아 수입으로 돌릴 수 있다." },
    { en:"The Mill", ko:"방앗간", dlc:"CoM", cost:"기억(Memory) 10", effect:"던전에서 무작위 허기 판정이 더 이상 발생하지 않는다.", prio:"높음", note:"음식 구매량을 크게 줄일 수 있다. 기억은 The Sleeper와 드물게 Thing from the Stars가 떨어뜨리므로 농장 진행 후반에나 가능하다." },
    { en:"Geological Studyhall", ko:"지질 연구실", dlc:"CoM", cost:"혜성 파편 125", effect:"보석류의 인벤토리 겹침 한도 +1.", prio:"낮음", note:"원정당 수입이 조금 늘 뿐이다. 파편이 남을 때 짓는다." },
    { en:"Tainted Well", ko:"오염된 우물", dlc:"CoM", cost:"혜성 파편 99", effect:"성수의 저항 강화가 +33%에서 +45%로 오르고, 아편 팅크에 받는 스트레스 -40% 효과가 추가된다.", prio:"중간", note:"아편 팅크가 싼 스트레스 방어 수단이 된다. 파편 구역 중 먼저 지을 만하다." },
    { en:"Miasmal Orchard", ko:"독기 과수원", dlc:"CoM", cost:"혜성 파편 99", effect:"약초에 질병 저항 +25%, 해독제에 중독 저항 +33% 효과가 추가된다.", prio:"낮음", note:"사육장과 삼림처럼 질병·중독이 잦은 던전에서 보조적으로 쓰인다." }
  ],

  districtTips: [
    "첫 설계도는 마을 이벤트 Cornerstone으로 받는다. 같은 주에 다른 이벤트가 걸리면 다음 주로 밀리므로, 그 직전 주에는 완료 시 확정 이벤트가 붙는 퀘스트를 피한다.",
    "두 번째 설계도는 숙련 이상 보스를 잡아야 나오므로 한참 뒤다. 첫 설계도는 은행(골드 여유가 있을 때)이나 곡물 창고(가보·골드가 빠듯할 때)처럼 모든 파티에 이득이 되는 곳에 쓴다.",
    "직업 전용 구역은 그 직업을 실제 주력으로 쓰는지 확인한 뒤 짓는다. 적용 직업 수가 많은 훈련장이 범용성이 가장 높다.",
    "구역은 가보를 100~300개씩 요구한다. 기본 건물의 대장간·길드 등급 해금이 끝나기 전에 가보를 구역에 쏟지 않는다."
  ],

  camping: [
    "장작(Firewood)은 살 수 없고 원정 길이에 따라 지급된다(짧음 0, 보통 1, 김 2). 깨끗이 정리한 방에서만 야영할 수 있고, 입구 방은 안 된다.",
    "식사는 4인 기준 음식 0개(HP -20%, 스트레스 +15), 2개(효과 없음), 4개(HP +10%), 8개(HP +25%, 스트레스 -10) 중에서 고른다. 야영용으로 음식 8개를 따로 남겨 둔다.",
    "휴식 포인트는 기본 12다. 야습 방지 → 스트레스 회복 → 전투 강화 순서로 쓰는 것이 기본이다.",
    "야영 후 33% 확률로 야습이 일어난다. Zealous Vigil(성전사), Bandit's Sense(노상강도), Hound's Watch(사냥개 조련사), Unspeakable Commune(신비학자) 같은 스킬 하나로 완전히 막을 수 있다.",
    "야영 강화 효과는 전투 4회 동안 유지된다. 보스 퀘스트라면 장작 하나를 보스 방 직전에 써서 치유와 강화를 받은 채 들어간다.",
    "야영을 마치면 밝기가 100으로 돌아온다. 횃불이 떨어져 갈 때 야영 시점을 맞추면 횃불을 아낄 수 있다.",
    "공용 스킬 Encourage(스트레스 -15)와 Wound Care(HP 15% 회복, 출혈·중독 제거)는 2포인트짜리로, 남는 포인트를 채우기에 좋다. 둘 다 자기 자신에게는 쓸 수 없다."
  ]
};

const EVENT_KO = {
  // ── 다음 원정 관련 (Events about Next Quest) ──
  "Bumper Crop": { ko:"풍작", dlc:null, kind:"good", eff:"이번 주 보급품 비용 -100% (전부 무료).", tip:"가장 길고 어려운 원정을 골라 보급품을 인벤토리 한도까지 채워 간다." },
  "Fresh Air in the Tunnels": { ko:"터널에 부는 맑은 바람", dlc:null, kind:"good", eff:"다음 원정이 사육장(Warrens)이면 결의 경험치 +33%, 피해 +15%.", tip:"사육장 보스나 긴 원정을 이번 주에 처리한다." },
  "Gentle Tide": { ko:"잔잔한 물결", dlc:null, kind:"good", eff:"다음 원정이 해만(Cove)이면 결의 경험치 +33%, 피해 +15%.", tip:"해만 보스나 긴 원정을 이번 주에 처리한다." },
  "Helping Hand": { ko:"도움의 손길", dlc:null, kind:"good", eff:"다음 원정에 한해 레벨 제한이 사라진다.", tip:"고레벨 영웅을 저레벨 원정에 보내 안전하게 가보를 모으거나 신병을 끼워 키운다." },
  "Silence in The Crypts": { ko:"지하 묘지의 정적", dlc:null, kind:"good", eff:"다음 원정이 폐허(Ruins)이면 결의 경험치 +33%, 피해 +15%.", tip:"폐허 보스나 긴 원정을 이번 주에 처리한다." },
  "Sunshine in the Thicket": { ko:"덤불 속 햇살", dlc:null, kind:"good", eff:"다음 원정이 삼림(Weald)이면 결의 경험치 +33%, 피해 +15%.", tip:"삼림 보스나 긴 원정을 이번 주에 처리한다." },
  "Supply Run": { ko:"보급 수송", dlc:null, kind:"good", eff:"이번 주 보급품 비용 -50%.", tip:"보급품이 많이 드는 긴 원정을 이번 주에 간다." },
  "Valiant Spirit": { ko:"용맹한 기개", dlc:null, kind:"good", eff:"다음 원정에서 미덕(Virtue) 확률 +15%.", tip:"스트레스 부담이 큰 보스전이나 긴 원정에 맞춰 쓴다." },
  "In Radiance": { ko:"광휘 속에서", dlc:"CC", kind:"good", eff:"이번 주에는 횃불 밝기가 훨씬 느리게 줄어든다.", tip:"횃불을 적게 사고 긴 원정을 밝은 상태로 돈다." },
  "The Lights": { ko:"빛무리", dlc:"CoM", kind:"good", eff:"이번 주에 얻는 혜성 파편이 2배.", tip:"농장(Farmstead) 끝없는 수확을 이번 주에 돈다." },
  "Tangible Legacy": { ko:"손에 잡히는 유산", dlc:"FE", kind:"good", eff:"이번 주에 얻는 가보가 전부 2배.", tip:"가보 보상이 큰 긴 원정을 고르고 인벤토리를 가보 위주로 채운다." },
  "Lost Shipment": { ko:"분실된 화물", dlc:null, kind:"bad", eff:"이번 주 보급품 구매 가능 수량 -50%.", tip:"짧은 원정을 고르거나 보급품 의존도가 낮은 파티로 나간다." },
  "The Dark is Rising": { ko:"짙어지는 어둠", dlc:null, kind:"bad", eff:"다음 원정에서 미덕 확률 -15%.", tip:"스트레스 관리가 쉬운 짧은 원정을 고르고 스트레스 회복 담당을 넣는다." },

  // ── 마을 활동 관련 (Events about Town Activities) ──
  "A Job Well Done": { ko:"잘 해낸 일", dlc:null, kind:"good", eff:"갑옷 강화 1회 무료.", tip:"가장 높은 등급의 갑옷 강화에 쓴다." },
  "Lost and Found": { ko:"분실물 회수", dlc:null, kind:"good", eff:"무기 강화 1회 무료. 해만의 수집(Gathering) 퀘스트를 완료하면 발생한다.", tip:"가장 높은 등급의 무기 강화에 쓴다." },
  "Caregivers Convention": { ko:"간병인 총회", dlc:null, kind:"good", eff:"요양원 치료가 무료.", tip:"가장 비싼 치료인 긍정 기벽 고정과 고정된 부정 기벽 제거를 병동 칸 수만큼 넣는다." },
  "Medical Breakthrough": { ko:"의학적 돌파구", dlc:null, kind:"good", eff:"요양원 질병 치료(Medical Devices)가 무료.", tip:"질병에 걸린 영웅을 질병 병동 칸 수만큼 넣는다." },
  "Nomad New Year": { ko:"유랑민의 새해", dlc:null, kind:"good", eff:"유랑 마차의 장신구 50% 할인.", tip:"골드가 있으면 희귀 이상 핵심 장신구를 이때 산다." },
  "Labour Force": { ko:"일손 지원", dlc:null, kind:"good", eff:"건물 업그레이드 1회 무료.", tip:"가보가 가장 많이 드는 업그레이드(대장간·길드 등급 해금 등)에 쓴다." },
  "Absent Abbot": { ko:"자리 비운 수도원장", dlc:null, kind:"neutral", eff:"수도원 기도(Transept) 이용 불가, 명상과 고행 비용 -50%.", tip:"수도원의 나머지 두 활동을 반값에 쓴다." },
  "All Saints Day": { ko:"만성절", dlc:null, kind:"good", eff:"수도원의 명상·기도·고행이 전부 무료. 폐허의 'Reclaim Relics of the Light' 퀘스트 완료 후 발생한다.", tip:"스트레스가 있는 영웅을 수도원 칸 수만큼 넣는다." },
  "Cell Cleaning": { ko:"독방 청소", dlc:null, kind:"neutral", eff:"수도원 고행(Penance Hall) 이용 불가, 명상과 기도 비용 -50%.", tip:"명상과 기도를 반값에 쓴다." },
  "Noisy Repairs": { ko:"시끄러운 보수 공사", dlc:null, kind:"neutral", eff:"수도원 명상(Cloister) 이용 불가, 기도와 고행 비용 -50%.", tip:"회복량이 큰 기도와 고행을 반값에 쓴다." },
  "Daylight Robbery": { ko:"백주의 강도", dlc:null, kind:"neutral", eff:"선술집 도박장 이용 불가, 술집과 사창가 비용 -50%.", tip:"술집과 사창가를 반값에 쓴다." },
  "Empty Kegs": { ko:"바닥난 술통", dlc:null, kind:"neutral", eff:"선술집 술집 이용 불가, 도박장과 사창가 비용 -50%.", tip:"회복량이 큰 사창가를 반값에 쓴다." },
  "Laundry Day": { ko:"빨래하는 날", dlc:null, kind:"neutral", eff:"선술집 사창가 이용 불가, 도박장과 술집 비용 -50%.", tip:"술집을 반값에 쓴다. 도박장은 장신구를 벗기고 보낸다." },
  "Mardis Gras": { ko:"마르디 그라", dlc:null, kind:"good", eff:"선술집의 술집·도박장·사창가가 전부 무료.", tip:"스트레스가 있는 영웅을 선술집 칸 수만큼 넣는다." },
  "A Ray of Sunlight": { ko:"한 줄기 햇살", dlc:null, kind:"good", eff:"모든 스트레스 해소 활동의 회복량 +33%(소수점 버림).", tip:"스트레스가 가장 높은 영웅들을 이번 주에 몰아서 쉬게 한다." },
  "Town Fair": { ko:"마을 축제", dlc:null, kind:"good", eff:"모든 스트레스 해소 활동과 요양원이 무료.", tip:"요양원 기벽 병동(가장 비싼 치료)부터 채우고 남은 영웅은 스트레스 시설에 넣는다." },
  "One Good Week": { ko:"모처럼 좋은 한 주", dlc:null, kind:"good", eff:"대기 중인 영웅의 주간 스트레스 회복 +200%(시설에 넣은 영웅에게는 적용되지 않음).", tip:"스트레스가 애매하게 쌓인 영웅은 시설에 넣지 말고 그냥 쉬게 둔다." },
  "Outdoor Enthusiasts": { ko:"야외 활동 애호가들", dlc:"FE", kind:"good", eff:"야영 스킬 학습 2회 무료.", tip:"주력 영웅에게 야습 방지나 강화 계열 야영 스킬을 가르친다." },
  "A Bargain for Twice the Price": { ko:"두 배 값의 흥정", dlc:"FE", kind:"good", eff:"장신구 판매가 2배.", tip:"쓰지 않는 중복·저등급 장신구를 이번 주에 정리한다." },
  "Wellness Program": { ko:"건강 증진 프로그램", dlc:"FE", kind:"good", eff:"대기 중인 영웅 전원이 부정 기벽 1개씩 제거된다.", tip:"부정 기벽이 많은 영웅은 원정과 시설에서 빼고 대기시킨다." },
  "Twinkle in Her Eye": { ko:"그녀의 눈빛", dlc:"FE", kind:"good", eff:"처음 사는 장신구 1개 80% 할인.", tip:"진열품 중 가장 비싸고 쓸모 있는 장신구를 첫 구매로 고른다." },
  "The Miserable Dark": { ko:"비참한 어둠", dlc:null, kind:"bad", eff:"모든 스트레스 해소 활동의 효과가 감소한다.", tip:"급하지 않은 스트레스 치료는 다음 주로 미루고 대기 회복에 맡긴다." },

  // ── 영웅·결의 경험치 관련 (Events about Heroes and Resolve XP) ──
  "A Day Long Awaited": { ko:"오래 기다린 날", dlc:null, kind:"good", eff:"이번 주 역마차 영입 후보 +6명.", tip:"명부 자리를 비워 두고 직업과 기벽을 골라 영입한다." },
  "A Gibbous Moon": { ko:"부푼 달", dlc:null, kind:"good", eff:"대기 중인 흉물(Abomination)의 결의 레벨 +1.", tip:"키우려는 흉물을 이번 주 원정과 시설에서 빼 둔다." },
  "Antique Roadshow": { ko:"골동품 순회전", dlc:null, kind:"good", eff:"골동품상(Antiquarian) 2명을 명부에 추가할 수 있다.", tip:"골드 수급용 골동품상이 없으면 한 명 받는다." },
  "Archery Tournament": { ko:"궁술 대회", dlc:null, kind:"good", eff:"대기 중인 석궁사수(Arbalest)와 머스킷 사수(Musketeer)의 결의 레벨 +1.", tip:"키우려는 석궁사수·머스킷 사수를 대기시킨다." },
  "Call of the Crusade": { ko:"성전의 부름", dlc:null, kind:"good", eff:"성전사(Crusader) 2명을 명부에 추가할 수 있다.", tip:"전열 영웅이 부족하면 받는다." },
  "Eat the Rich": { ko:"부자를 털어라", dlc:null, kind:"good", eff:"대기 중인 도굴꾼(Grave Robber)의 결의 레벨 +1.", tip:"키우려는 도굴꾼을 대기시킨다." },
  "Holy Gathering": { ko:"성스러운 모임", dlc:null, kind:"good", eff:"성녀(Vestal) 2명을 명부에 추가할 수 있다.", tip:"치유사는 여러 명 필요하므로 자리가 있으면 받는다." },
  "Idle Busking": { ko:"한가한 길거리 공연", dlc:null, kind:"good", eff:"대기 중인 광대(Jester)의 결의 레벨 +1.", tip:"키우려는 광대를 대기시킨다." },
  "Laying Low": { ko:"잠복", dlc:null, kind:"good", eff:"대기 중인 노상강도(Highwayman)의 결의 레벨 +1.", tip:"키우려는 노상강도를 대기시킨다." },
  "Leper Colony": { ko:"나병 환자 수용소", dlc:null, kind:"good", eff:"나병 환자(Leper) 2명을 명부에 추가할 수 있다.", tip:"전열 딜러가 부족하면 받는다." },
  "Militia Training": { ko:"민병대 훈련", dlc:null, kind:"good", eff:"대기 중인 중보병(Man-at-Arms)의 결의 레벨 +1.", tip:"키우려는 중보병을 대기시킨다." },
  "Rats Among Us": { ko:"우리 곁의 쥐 떼", dlc:null, kind:"good", eff:"대기 중인 사냥개 조련사(Houndmaster)의 결의 레벨 +1.", tip:"키우려는 사냥개 조련사를 대기시킨다." },
  "Revelry": { ko:"흥청망청", dlc:null, kind:"good", eff:"야만인(Hellion) 2명을 명부에 추가할 수 있다.", tip:"전열 딜러가 부족하면 받는다." },
  "Rumour of Riches": { ko:"재물의 소문", dlc:null, kind:"good", eff:"현상금 사냥꾼(Bounty Hunter) 2명을 명부에 추가할 수 있다.", tip:"표식·기절 담당이 없으면 받는다." },
  "The Plague": { ko:"역병", dlc:null, kind:"good", eff:"대기 중인 역병 의사(Plague Doctor)의 결의 레벨 +1.", tip:"키우려는 역병 의사를 대기시킨다." },
  "Wyrd Council": { ko:"기이한 회합", dlc:null, kind:"good", eff:"신비학자(Occultist) 2명을 명부에 추가할 수 있다.", tip:"보조 치유사가 부족하면 받는다." },
  "Blood Pilgrimage": { ko:"피의 순례", dlc:"CC", kind:"good", eff:"고행자(Flagellant) 2명을 명부에 추가할 수 있다.", tip:"고행자가 없으면 받는다." },
  "Blood Scourge": { ko:"피의 채찍", dlc:"CC", kind:"good", eff:"고행자가 역마차에 등장하기 시작하고, 1명을 명부에 추가할 수 있다. 5주차에 한 번만 발생.", tip:"명부에 빈자리를 만들어 두고 받는다." },
  "A Desert Wind": { ko:"사막의 바람", dlc:"SB", kind:"good", eff:"방패 파괴자(Shieldbreaker) 1명을 명부에 추가할 수 있다. 3주차 이후 한 번만 발생.", tip:"초반 전력에 큰 도움이 되므로 바로 받는다." },
  "The Adder's Kiss": { ko:"독사의 입맞춤", dlc:"SB", kind:"good", eff:"방패 파괴자 2명을 명부에 추가할 수 있다.", tip:"방패 파괴자가 더 필요할 때만 받는다." },
  "Experienced Hero for Hire": { ko:"노련한 용병", dlc:"CoM", kind:"good", eff:"혜성 파편 20개로 결의 레벨 6 영웅을 영입할 수 있다. 스킬·장비가 최대 등급이고 Twilight Dreamer 기벽을 가진다.", tip:"챔피언 던전이나 가장 어두운 던전용 인원이 모자라면 파편을 쓴다." },
  "The Fire's Edge": { ko:"불의 가장자리", dlc:"FE", kind:"good", eff:"결투가(Duelist) 1명과 도망자(Runaway) 1명을 명부에 추가할 수 있다. 5주차 이후 한 번만 발생.", tip:"명부에 두 자리를 비워 두고 받는다." },
  "Organized Militia": { ko:"조직된 민병대", dlc:"FE", kind:"good", eff:"대기 중인 결투가(Duelist)의 결의 레벨 +1.", tip:"키우려는 결투가를 대기시킨다." },
  "Ashes to Ashes": { ko:"재는 재로", dlc:"FE", kind:"good", eff:"도망자(Runaway) 2명을 명부에 추가할 수 있다.", tip:"도망자가 더 필요할 때만 받는다." },

  // ── 특수 이벤트 (Special Events) ──
  "A Thief in the Night": { ko:"한밤의 도둑", dlc:null, kind:"quest", eff:"Shrieker가 장신구 8개를 훔쳐 간다. 발생하는 특수 퀘스트에서 Shrieker와 싸우고 살아서 귀환하면 장신구를 보상으로 돌려받는다.", tip:"그 주에 반드시 퀘스트에 가서 귀환한다." },
  "Brigand Incursion": { ko:"산적 습격", dlc:null, kind:"quest", eff:"특수 퀘스트 Wolves at the Door(레벨 6) 발생. 산적 두목 Vvulf와 싸운다. 지도에 선조의 배낭이 최대 3개 있다.", tip:"챔피언급 파티로 방어·기절 대비를 갖춰 나간다." },
  "From Beyond": { ko:"저 너머에서", dlc:null, kind:"good", eff:"묘지의 영웅 중 무작위 3명 가운데 1명을 골라 부활시킨다. 결의 레벨은 유지되지만 스킬·무기·갑옷 등급은 사라진다.", tip:"가장 레벨이 높고 기벽이 좋았던 영웅을 고른다. 명부에 빈자리가 필요하다." },
  "Shrieker's Prize": { ko:"비명새의 전리품", dlc:null, kind:"quest", eff:"삼림에 특수 퀘스트 Shrieker's Prize 발생. Shrieker와 싸워 그가 모아 둔 보물을 노린다.", tip:"좋은 장신구를 얻을 기회이므로 그 주에 다녀온다." },
  "A Maddening Whine": { ko:"미칠 듯한 날갯소리", dlc:"CC", kind:"quest", eff:"안뜰(Courtyard)에 퀘스트 Burn the Hives 발생. 3주차에 한 번만 뜨며, 스트레스 해소 시설 효과가 30% 감소한다.", tip:"퀘스트를 빨리 끝내 후속 불이익 이벤트가 반복되지 않게 한다." },
  "A Veil Lifted": { ko:"걷힌 장막", dlc:"CC", kind:"good", eff:"진홍빛 저주에 걸린 모든 영웅의 저주가 풀린다. Baron, Viscount, Countess를 처치한 뒤 발생.", tip:"혈액 재고를 아끼고 저주 때문에 묶여 있던 영웅을 다시 쓴다." },
  "Heresy in the Blood": { ko:"피 속의 이단", dlc:"CC", kind:"bad", eff:"다음 원정 파티에 진홍빛 저주 영웅이 2명 이상이면 The Fanatic이 등장할 수 있다(2~3명 20%, 4명 75%).", tip:"저주 걸린 영웅을 1명 이하로 편성한다." },
  "The Town is Abuzz!": { ko:"웅성거리는 마을", dlc:"CC", kind:"bad", eff:"스트레스 해소 시설 효과 10% 감소. Burn the Hives 퀘스트를 끝낼 때까지 반복된다.", tip:"Burn the Hives를 완료해 이벤트를 끊는다." },
  "Cornerstone": { ko:"주춧돌", dlc:"CC", kind:"good", eff:"설계도(Blueprint) 1장 획득. 7~10주차 사이에 한 번만 발생.", tip:"첫 구역을 어디에 지을지 미리 정하고 필요한 골드와 가보를 모아 둔다." },
  "Crystaline Focii": { ko:"수정 초점", dlc:"CoM", kind:"good", eff:"혜성 파편 30개를 내면 명부의 모든 영웅이 스트레스 50 회복.", tip:"여러 영웅의 스트레스가 높을 때만 지불한다." },
  "Shard Harvest": { ko:"파편 수확", dlc:"CoM", kind:"good", eff:"혜성 파편 +25.", tip:"보석상 장신구나 파편 구역 건설에 보탠다." },
  "They Made a Tonic": { ko:"그들이 만든 강장제", dlc:"CoM", kind:"good", eff:"혜성 파편 30개를 내면 명부의 모든 영웅이 질병 1개씩 치료된다. 진홍빛 저주에도 적용.", tip:"저주나 질병에 걸린 영웅이 여럿일 때 지불한다." }
};

// events.json 에서 이름이 깨져 있던 행. 원문(Town_Events) 에서 실제 이름을 확인한 것.
const EVENT_EXTRA = [
  { en:"A Job Well Done", sec:"Events about Town Activities", img:null, eff:"Free Upgrade: Armour x 1" },
  { en:"Caregivers Convention", sec:"Events about Town Activities", img:null, eff:"Sanitarium is Free" },
  { en:"Nomad New Year", sec:"Events about Town Activities", img:null, eff:"Trinkets discounted 50%" },
  { en:"Labour Force", sec:"Events about Town Activities", img:"Labour Force.png", eff:"Free Upgrade: Building x 1" },
  { en:"Absent Abbot", sec:"Events about Town Activities", img:null, eff:"Transept is Locked, ; Cloister costs change by -50%, ; Penance Hall costs by -50%" },
  { en:"Daylight Robbery", sec:"Events about Town Activities", img:null, eff:"Gambling Hall is Locked, ; Bar costs change by -50%, ; Brothel costs change by -50%" },
  { en:"A Ray of Sunlight", sec:"Events about Town Activities", img:null, eff:"All Stress Relief Activities More Effective ; (33% more stress healed, rounded down)" },
  { en:"The Miserable Dark", sec:"Events about Town Activities", img:null, eff:"All Stress Relief Activities Less Effective" }
];
