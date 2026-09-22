export type LocaleText = { th: string; en: string };

export type CharacterRole = "blast" | "combat" | "speed" | "universal";
export type CharacterType = "hero" | "villain" | "antihero";
export type CharacterTier = "S" | "A" | "B" | "C";

export type Character = {
  id: string;
  name: LocaleText;
  role: CharacterRole;
  type: CharacterType;
  tier: CharacterTier;
  summary: LocaleText;
  skills: LocaleText[];
};

export const roleLabels: Record<CharacterRole, LocaleText> = {
  blast: { th: "บลาสต์", en: "Blast" },
  combat: { th: "คอมแบต", en: "Combat" },
  speed: { th: "สปีด", en: "Speed" },
  universal: { th: "ยูนิเวอร์แซล", en: "Universal" },
};

export const typeLabels: Record<CharacterType, LocaleText> = {
  hero: { th: "ฮีโร่", en: "Hero" },
  villain: { th: "วายร้าย", en: "Villain" },
  antihero: { th: "แอนตี้ฮีโร่", en: "Anti-Hero" },
};

export const characters: Character[] = [
  {
    id: "iron-man",
    name: { th: "ไอรอนแมน", en: "Iron Man" },
    role: "blast",
    type: "hero",
    tier: "A",
    summary: {
      th: "บลาสเตอร์ระยะไกล ใช้สกิลต่อเนื่องกดดันศัตรูได้ดี",
      en: "Ranged blaster who pressures enemies with steady skill rotations.",
    },
    skills: [
      { th: "ยิงลำแสงจากเกราะ", en: "Armor beam barrage" },
      { th: "เสริมพลังเกราะชั่วคราว", en: "Temporary armor boost" },
      { th: "ระเบิดวงกว้าง", en: "Wide-area explosion" },
    ],
  },
  {
    id: "captain-america",
    name: { th: "กัปตันอเมริกา", en: "Captain America" },
    role: "combat",
    type: "hero",
    tier: "A",
    summary: {
      th: "แทงก์ใกล้ตัว ช่วยทีมด้วยโล่และการควบคุมสนาม",
      en: "Melee tank who shields allies and controls the frontline.",
    },
    skills: [
      { th: "ขว้างโล่โจมตี", en: "Shield throw" },
      { th: "ป้องกันความเสียหาย", en: "Damage mitigation" },
      { th: "เสริมพลังทีม", en: "Team buff" },
    ],
  },
  {
    id: "spider-man",
    name: { th: "สไปเดอร์แมน", en: "Spider-Man" },
    role: "speed",
    type: "hero",
    tier: "A",
    summary: {
      th: "ตัวเร็วคล่องตัว เหมาะกับโหมดที่ต้องการเคลื่อนที่และคอมโบ",
      en: "Agile speedster suited for modes that reward movement and combos.",
    },
    skills: [
      { th: "ยิงใยรัดศัตรู", en: "Web restraint" },
      { th: "โจมตีต่อเนื่องเร็ว", en: "Rapid strike chain" },
      { th: "หลบหลีกและโต้กลับ", en: "Dodge and counter" },
    ],
  },
  {
    id: "doctor-strange",
    name: { th: "ด็อกเตอร์สเตรนจ์", en: "Doctor Strange" },
    role: "universal",
    type: "hero",
    tier: "S",
    summary: {
      th: "ยูนิเวอร์แซลสายซัพพอร์ต/ดาเมจเวท ใช้ในหลายโหมดได้ยืดหยุ่น",
      en: "Flexible universal mage for support and damage across many modes.",
    },
    skills: [
      { th: "เปิดพอร์ทัลโจมตี", en: "Portal assault" },
      { th: "โล่เวทป้องกัน", en: "Mystic barrier" },
      { th: "ควบคุมเวลาสั้นๆ", en: "Brief time control" },
    ],
  },
  {
    id: "loki",
    name: { th: "โลคิ", en: "Loki" },
    role: "universal",
    type: "villain",
    tier: "A",
    summary: {
      th: "วายร้ายสายหลอกลวง เสริมพลังทีมและสร้างความปั่นป่วน",
      en: "Trickster villain who buffs allies and disrupts enemy formations.",
    },
    skills: [
      { th: "สร้างภาพลวงตา", en: "Illusion clones" },
      { th: "เสริมพลังพันธมิตร", en: "Ally empowerment" },
      { th: "ระเบิดเวทน้ำแข็ง", en: "Icy mystic blast" },
    ],
  },
  {
    id: "black-widow",
    name: { th: "แบล็ควิโดว์", en: "Black Widow" },
    role: "speed",
    type: "hero",
    tier: "B",
    summary: {
      th: "ตัวซัพพอร์ต/ดาเมจเร็ว เหมาะเป็นตัวเสริมในทีมเริ่มต้น",
      en: "Fast support/DPS option that fits well in beginner-friendly teams.",
    },
    skills: [
      { th: "โจมตีระยะไกลด้วยอาวุธ", en: "Ranged weapon assault" },
      { th: "สตันเป้าหมาย", en: "Target stun" },
      { th: "ลดเกราะศัตรู", en: "Armor shred" },
    ],
  },
  {
    id: "thor",
    name: { th: "ธอร์", en: "Thor" },
    role: "combat",
    type: "hero",
    tier: "A",
    summary: {
      th: "คอมแบตสายฟ้าใกล้ตัว ดาเมจหนักและคุมสนามได้ดี",
      en: "Lightning melee fighter with heavy hits and strong field control.",
    },
    skills: [
      { th: "ฟาดด้วยมโยลเนียร์", en: "Mjolnir smash" },
      { th: "เรียกสายฟ้าลงใส่ศัตรู", en: "Call down lightning" },
      { th: "พุ่งโจมตีทะลวงแถวหน้า", en: "Frontline charge" },
    ],
  },
  {
    id: "hulk",
    name: { th: "ฮัลค์", en: "Hulk" },
    role: "combat",
    type: "hero",
    tier: "B",
    summary: {
      th: "แทงก์เลือดหนา เหมาะเคลียร์ด่านและรับดาเมจแทนทีม",
      en: "High-HP tank for clearing stages and soaking damage for the team.",
    },
    skills: [
      { th: "ทุบพื้นสร้างคลื่นกระแทก", en: "Ground smash shockwave" },
      { th: "โกรธแล้วเพิ่มพลังโจมตี", en: "Rage attack boost" },
      { th: "ขว้างศัตรูออกไป", en: "Throw enemies aside" },
    ],
  },
  {
    id: "captain-marvel",
    name: { th: "กัปตันมาร์เวล", en: "Captain Marvel" },
    role: "blast",
    type: "hero",
    tier: "S",
    summary: {
      th: "บลาสเตอร์พลังสูง ใช้กดบอสและโหมด PvE ที่ต้องการดาเมจต่อเนื่อง",
      en: "High-power blaster for boss fights and sustained PvE damage.",
    },
    skills: [
      { th: "ยิงพลังโฟตอน", en: "Photon blast" },
      { th: "เข้าโหมด Binary", en: "Binary mode" },
      { th: "พุ่งชนทะลุแนวศัตรู", en: "Piercing energy charge" },
    ],
  },
  {
    id: "scarlet-witch",
    name: { th: "สการ์เล็ตวิทช์", en: "Scarlet Witch" },
    role: "blast",
    type: "hero",
    tier: "S",
    summary: {
      th: "บลาสต์สายChaos ดาเมจระเบิดและดีบัฟศัตรูเก่ง",
      en: "Chaos-magic blaster with strong burst damage and enemy debuffs.",
    },
    skills: [
      { th: "ยิงพลัง Chaos Magic", en: "Chaos Magic bolts" },
      { th: "บิดเบือนความจริงรอบตัว", en: "Reality distortion field" },
      { th: "ระเบิดพลังวงกว้าง", en: "Wide chaos detonation" },
    ],
  },
  {
    id: "vision",
    name: { th: "วิชั่น", en: "Vision" },
    role: "blast",
    type: "hero",
    tier: "A",
    summary: {
      th: "บลาสต์สายซัพพอร์ต มีเกราะและดาเมจระยะกลางที่เสถียร",
      en: "Support-leaning blaster with shielding and steady mid-range damage.",
    },
    skills: [
      { th: "ยิงลำแสงจากหน้าผาก", en: "Mind Stone beam" },
      { th: "เปลี่ยนความหนาแน่นร่างกาย", en: "Density shift" },
      { th: "สร้างโล่พลังงาน", en: "Energy barrier" },
    ],
  },
  {
    id: "black-panther",
    name: { th: "แบล็คแพนเธอร์", en: "Black Panther" },
    role: "combat",
    type: "hero",
    tier: "A",
    summary: {
      th: "คอมแบตคล่องตัว โจมตีเร็วและมีเกราะไวเบรเนียมช่วยอยู่รอด",
      en: "Agile combatant with fast strikes and Vibranium defense.",
    },
    skills: [
      { th: "กรงเล็บไวเบรเนียม", en: "Vibranium claw strikes" },
      { th: "ดูดซับแล้วสะท้อนดาเมจ", en: "Absorb and reflect damage" },
      { th: "พุ่งตะครุบเป้าหมาย", en: "Pounce on target" },
    ],
  },
  {
    id: "wolverine",
    name: { th: "วูล์ฟเวอรีน", en: "Wolverine" },
    role: "combat",
    type: "hero",
    tier: "A",
    summary: {
      th: "คอมแบตฟื้นเลือดเก่ง เหมาะด่านยาวและโหมดที่ต้องอยู่ได้นาน",
      en: "Self-healing combatant for long stages and endurance modes.",
    },
    skills: [
      { th: "ฟันด้วยกรงเล็บอะดาแมนเทียม", en: "Adamantium claw slash" },
      { th: "ฟื้นฟูพลังชีวิต", en: "Regenerate health" },
      { th: "บเซิร์กโจมตีต่อเนื่อง", en: "Berserk combo" },
    ],
  },
  {
    id: "storm",
    name: { th: "สตอร์ม", en: "Storm" },
    role: "blast",
    type: "hero",
    tier: "A",
    summary: {
      th: "บลาสต์สายอากาศ คุมกลุ่มด้วยสายฟ้าและพายุ",
      en: "Weather blaster who controls groups with lightning and storms.",
    },
    skills: [
      { th: "เรียกสายฟ้าใส่ศัตรู", en: "Lightning strike" },
      { th: "สร้างพายุลมแรง", en: "Gale force winds" },
      { th: "แช่แข็งพื้นที่กว้าง", en: "Area freeze" },
    ],
  },
  {
    id: "jean-grey",
    name: { th: "จีน เกรย์", en: "Jean Grey" },
    role: "blast",
    type: "hero",
    tier: "S",
    summary: {
      th: "บลาสต์พลังจิต/ไฟนิกซ์ ดาเมจสูงและมียูทิลิตี้ทีม",
      en: "Psychic/Phoenix blaster with high damage and team utility.",
    },
    skills: [
      { th: "โจมตีด้วยพลังจิต", en: "Telekinetic assault" },
      { th: "ปลดปล่อยเปลวไฟนิกซ์", en: "Phoenix flame burst" },
      { th: "ปกป้องพันธมิตรด้วยพลังจิต", en: "Psychic ally shield" },
    ],
  },
  {
    id: "magneto",
    name: { th: "แม็กนีโต", en: "Magneto" },
    role: "blast",
    type: "villain",
    tier: "S",
    summary: {
      th: "วายร้ายสายแม่เหล็ก ดาเมจวงกว้างและคุมสนามได้แข็ง",
      en: "Magnetic villain with strong AoE damage and battlefield control.",
    },
    skills: [
      { th: "ยิงเศษโลหะใส่ศัตรู", en: "Metal shard barrage" },
      { th: "สร้างสนามแม่เหล็กป้องกัน", en: "Magnetic force field" },
      { th: "ดึงและขว้างศัตรู", en: "Pull and hurl enemies" },
    ],
  },
  {
    id: "thanos",
    name: { th: "ธานอส", en: "Thanos" },
    role: "universal",
    type: "villain",
    tier: "S",
    summary: {
      th: "ยูนิเวอร์แซลสายแทงก์/ดาเมจหนัก ใช้กดเนื้อหาท้ายเกมได้ดี",
      en: "Heavy universal tank/DPS for late-game content pressure.",
    },
    skills: [
      { th: "ฟาดด้วยดาบคู่", en: "Twin blade smash" },
      { th: "ยิงลำแสงจากถุงมือ", en: "Gauntlet energy beam" },
      { th: "สร้างโล่พลังงานหนา", en: "Thick energy shield" },
    ],
  },
  {
    id: "doctor-doom",
    name: { th: "ด็อกเตอร์ดูม", en: "Doctor Doom" },
    role: "universal",
    type: "villain",
    tier: "S",
    summary: {
      th: "วายร้ายสายเวท/เทค มีทั้งดาเมจ ซัพพอร์ต และคุม",
      en: "Magic/tech villain covering damage, support, and control.",
    },
    skills: [
      { th: "ยิงพลังเวทจากถุงมือ", en: "Gauntlet mystic bolts" },
      { th: "เรียกเกราะเสริม", en: "Summon reinforced armor" },
      { th: "คำสาปลดพลังศัตรู", en: "Cursing debuff" },
    ],
  },
  {
    id: "deadpool",
    name: { th: "เดดพูล", en: "Deadpool" },
    role: "combat",
    type: "antihero",
    tier: "A",
    summary: {
      th: "แอนตี้ฮีโร่สายดาเมจใกล้ตัว ฟื้นตัวเก่งและเล่นสนุกในหลายโหมด",
      en: "Melee anti-hero with strong sustain and flexible mode coverage.",
    },
    skills: [
      { th: "ฟันดาบคู่ต่อเนื่อง", en: "Dual katanas flurry" },
      { th: "ยิงปืนระยะกลาง", en: "Mid-range gunfire" },
      { th: "ฟื้นเลือดระหว่างต่อสู้", en: "Combat regeneration" },
    ],
  },
  {
    id: "venom",
    name: { th: "วีนอม", en: "Venom" },
    role: "combat",
    type: "antihero",
    tier: "A",
    summary: {
      th: "คอมแบตซิมไบโอต เลือดหนาและโจมตีระยะใกล้รุนแรง",
      en: "Symbiote combatant with high HP and brutal close-range damage.",
    },
    skills: [
      { th: "เหวี่ยงเอ็นซิมไบโอต", en: "Symbiote tendril slam" },
      { th: "กัดและดูดพลัง", en: "Bite and drain" },
      { th: "เกราะซิมไบโอตหนาขึ้น", en: "Thickened symbiote armor" },
    ],
  },
  {
    id: "ghost-rider",
    name: { th: "โกสต์ไรเดอร์", en: "Ghost Rider" },
    role: "universal",
    type: "antihero",
    tier: "A",
    summary: {
      th: "ยูนิเวอร์แซลสายไฟนรก มีดาเมจ DoT และยูทิลิตี้แรง",
      en: "Hellfire universal with DoT damage and strong utility tools.",
    },
    skills: [
      { th: "โซ่ไฟนรก", en: "Hellfire chain" },
      { th: "เพนนิชด้วยสายตา", en: "Penance stare" },
      { th: "พุ่งชนด้วยมอเตอร์ไซค์", en: "Motorcycle charge" },
    ],
  },
  {
    id: "hawkeye",
    name: { th: "ฮอว์คอาย", en: "Hawkeye" },
    role: "speed",
    type: "hero",
    tier: "B",
    summary: {
      th: "สปีดสายธนู เหมาะทีมเริ่มต้นและโหมดที่ต้องการดาเมจระยะไกลเร็ว",
      en: "Bow speedster for starter teams and fast ranged pressure.",
    },
    skills: [
      { th: "ยิงธนูต่อเนื่อง", en: "Rapid arrow volley" },
      { th: "ธนูระเบิด", en: "Explosive arrow" },
      { th: "ธนูไฟฟ้าสตัน", en: "Shock arrow stun" },
    ],
  },
  {
    id: "quicksilver",
    name: { th: "ควิกซิลเวอร์", en: "Quicksilver" },
    role: "speed",
    type: "hero",
    tier: "A",
    summary: {
      th: "สปีดสายความเร็วสูง เหมาะโหมดที่เน้นเคลื่อนที่และคอมโบเร็ว",
      en: "High-speed fighter for mobility-heavy modes and fast combos.",
    },
    skills: [
      { th: "วิ่งโจมตีหลายเป้า", en: "Multi-target speed rush" },
      { th: "สร้างภาพซ้อนหลบดาเมจ", en: "Afterimage evasion" },
      { th: "หมัดเร็วต่อเนื่อง", en: "Rapid punch chain" },
    ],
  },
  {
    id: "winter-soldier",
    name: { th: "วินเทอร์โซลเจอร์", en: "Winter Soldier" },
    role: "combat",
    type: "antihero",
    tier: "A",
    summary: {
      th: "คอมแบตสายปืน/แขนกล ดาเมจเน้นเป้าเดียวได้ดี",
      en: "Gun-and-cyber-arm combatant strong at single-target damage.",
    },
    skills: [
      { th: "ยิงปืนกลต่อเนื่อง", en: "Assault rifle burst" },
      { th: "ฟาดด้วยแขนโลหะ", en: "Metal arm smash" },
      { th: "ขว้างระเบิดมือ", en: "Grenade toss" },
    ],
  },
  {
    id: "war-machine",
    name: { th: "วอร์แมชชีน", en: "War Machine" },
    role: "blast",
    type: "hero",
    tier: "B",
    summary: {
      th: "บลาสต์สายอาวุธหนัก เคลียร์กลุ่มและซัพพอร์ตไอรอนแมนได้ดี",
      en: "Heavy-weapon blaster for group clear and Iron Man team synergy.",
    },
    skills: [
      { th: "ยิงมิสไซล์วงกว้าง", en: "Wide missile barrage" },
      { th: "ยิงปืนกลไหล่", en: "Shoulder minigun fire" },
      { th: "ระเบิดพื้นใกล้ตัว", en: "Close-range ground blast" },
    ],
  },
  {
    id: "ultron",
    name: { th: "อัลตรอน", en: "Ultron" },
    role: "blast",
    type: "villain",
    tier: "A",
    summary: {
      th: "วายร้ายสายหุ่นยนต์ ดาเมจระยะไกลและมีมินเนี่ยนช่วยกดดัน",
      en: "Robotic villain with ranged damage and minion pressure.",
    },
    skills: [
      { th: "ยิงเลเซอร์จากร่าง", en: "Body laser fire" },
      { th: "เรียกโดรนอัลตรอน", en: "Summon Ultron drones" },
      { th: "โล่พลังงานหุ่นยนต์", en: "Robotic energy shield" },
    ],
  },
  {
    id: "green-goblin",
    name: { th: "กรีนก็อบลิน", en: "Green Goblin" },
    role: "speed",
    type: "villain",
    tier: "B",
    summary: {
      th: "สปีดวายร้ายสายระเบิด เคลื่อนที่เร็วและกวนสนามเก่ง",
      en: "Bomb-focused speed villain with high mobility and disruption.",
    },
    skills: [
      { th: "ขว้างฟักทองระเบิด", en: "Pumpkin bomb throw" },
      { th: "พุ่งชนด้วยแกลร์เดอร์", en: "Glider dive attack" },
      { th: "ควันพิษลดการมองเห็น", en: "Toxic smoke screen" },
    ],
  },
  {
    id: "luna-snow",
    name: { th: "ลูนา สโนว์", en: "Luna Snow" },
    role: "blast",
    type: "hero",
    tier: "S",
    summary: {
      th: "บลาสต์สายน้ำแข็ง/ซัพพอร์ต ใช้บัฟทีมและคุมศัตรูได้ดี",
      en: "Ice blaster/support who buffs allies and controls enemies well.",
    },
    skills: [
      { th: "ยิงพลังน้ำแข็ง", en: "Ice energy shot" },
      { th: "เสริมพลังพันธมิตร", en: "Ally performance boost" },
      { th: "แช่แข็งเป้าหมาย", en: "Freeze target" },
    ],
  },
  {
    id: "sharon-rogers",
    name: { th: "ชารอน โรเจอร์ส", en: "Sharon Rogers" },
    role: "blast",
    type: "hero",
    tier: "A",
    summary: {
      th: "บลาสต์สายโล่/ปืน บาลานซ์ระหว่างดาเมจกับอยู่รอด",
      en: "Shield-and-gun blaster balanced between damage and survivability.",
    },
    skills: [
      { th: "ยิงจากโล่พลังงาน", en: "Energy shield shots" },
      { th: "กางโล่ป้องกัน", en: "Raise defensive shield" },
      { th: "ระเบิดพลังงานวงกว้าง", en: "Wide energy blast" },
    ],
  },
  {
    id: "shang-chi",
    name: { th: "ซาง-ชิ", en: "Shang-Chi" },
    role: "combat",
    type: "hero",
    tier: "A",
    summary: {
      th: "คอมแบตสายศิลปะต่อสู้ คอมโบลื่นและมีเกราะเท็นริงส์ช่วย",
      en: "Martial-arts combatant with smooth combos and Ten Rings tools.",
    },
    skills: [
      { th: "หมัดต่อเนื่องเร็ว", en: "Rapid punch combo" },
      { th: "ใช้วงแหวนเท็นริงส์โจมตี", en: "Ten Rings strike" },
      { th: "เกราะวงแหวนป้องกัน", en: "Rings defensive guard" },
    ],
  },
  {
    id: "ms-marvel",
    name: { th: "มิส มาร์เวล", en: "Ms. Marvel" },
    role: "combat",
    type: "hero",
    tier: "B",
    summary: {
      th: "คอมแบตยืดร่างได้ เหมาะทีมเริ่มต้นและโหมดสตอรี่",
      en: "Stretchy combatant that fits starter teams and story modes.",
    },
    skills: [
      { th: "ยืดแขนฟาดศัตรู", en: "Elongated arm slam" },
      { th: "ขยายร่างกายรับดาเมจ", en: "Enlarge to soak hits" },
      { th: "เหวี่ยงศัตรูออกไป", en: "Swing enemies away" },
    ],
  },
  {
    id: "psylocke",
    name: { th: "ไซล็อค", en: "Psylocke" },
    role: "speed",
    type: "hero",
    tier: "A",
    summary: {
      th: "สปีดสายดาบจิต เน้นดาเมจเร็วและทะลุแนวป้องกัน",
      en: "Psychic-blade speedster focused on fast, piercing damage.",
    },
    skills: [
      { th: "ฟันด้วยดาบพลังจิต", en: "Psychic blade slash" },
      { th: "วาร์ปเข้าใกล้เป้า", en: "Blink to target" },
      { th: "ระเบิดพลังจิตระยะใกล้", en: "Close psychic burst" },
    ],
  },
  {
    id: "domino",
    name: { th: "โดมิโน", en: "Domino" },
    role: "speed",
    type: "hero",
    tier: "A",
    summary: {
      th: "สปีดสายโชค ซัพพอร์ตทีมด้วยบัฟและดาเมจระยะกลาง",
      en: "Luck-based speedster who supports with buffs and mid-range damage.",
    },
    skills: [
      { th: "ยิงอาวุธต่อเนื่อง", en: "Weapon spray" },
      { th: "เสริมพลังโชคให้ทีม", en: "Team luck buff" },
      { th: "วางกับดักระเบิด", en: "Set explosive traps" },
    ],
  },
  {
    id: "cable",
    name: { th: "เคเบิล", en: "Cable" },
    role: "blast",
    type: "hero",
    tier: "A",
    summary: {
      th: "บลาสต์สายปืน/พลังจิต ดาเมจเป้าเดียวและยูทิลิตี้ครบ",
      en: "Gun/psychic blaster with solid single-target damage and utility.",
    },
    skills: [
      { th: "ยิงปืนหนักต่อเนื่อง", en: "Heavy rifle fire" },
      { th: "โจมตีด้วยพลังจิต", en: "Telekinetic strike" },
      { th: "เกราะเทคซ่อมแซมตัวเอง", en: "Self-repair tech armor" },
    ],
  },
  {
    id: "moon-knight",
    name: { th: "มูนไนท์", en: "Moon Knight" },
    role: "combat",
    type: "antihero",
    tier: "B",
    summary: {
      th: "คอมแบตสายครีเซนต์ดาร์ต เล่นง่ายและเหมาะเนื้อหาทั่วไป",
      en: "Crescent-dart combatant who is easy to play in general content.",
    },
    skills: [
      { th: "ขว้างครีเซนต์ดาร์ต", en: "Crescent dart throw" },
      { th: "โจมตีระยะใกล้ต่อเนื่อง", en: "Close-range flurry" },
      { th: "เกราะผ้าคลุมลดดาเมจ", en: "Cloak damage reduction" },
    ],
  },
  {
    id: "wong",
    name: { th: "วอง", en: "Wong" },
    role: "universal",
    type: "hero",
    tier: "B",
    summary: {
      th: "ยูนิเวอร์แซลสายซัพพอร์ตเวท ช่วยทีมด้วยบัฟและพอร์ทัล",
      en: "Mystic support universal who helps teams with buffs and portals.",
    },
    skills: [
      { th: "เปิดพอร์ทัลโจมตี", en: "Portal strike" },
      { th: "เสริมพลังเวทให้ทีม", en: "Team mystic buff" },
      { th: "โล่เวทป้องกัน", en: "Mystic ward" },
    ],
  },
];

export function getCharacter(id: string) {
  return characters.find((character) => character.id === id);
}

export function tText(text: LocaleText, locale: string) {
  return locale === "th" ? text.th : text.en;
}
