import {slugify} from "@/soulstones/helpers";
import {Mod, ModDef, Rarity} from "@/soulstones/types";

function defToMod (def: ModDef, rarity: Rarity) : Mod {
	const id = def.id || slugify(def.title)
	return {
		id: id,
		title: def.title,
		description: def.description,
		rarity,
	}
}

const fromSheet : ModDef[] = [
	{
		title: "Chef",
		rarity: "common"
	},
	{
		title: "Ear for Deceit", // (Rogue)",
		rarity: "common", id: "ear-for-deceit--rogue-", description: "You can hear lies!"
	},
	{
		title: "Steady Eye", // (Rogue)",
		rarity: "common"
	},
	{
		title: "Actor",
		rarity: "common"
	},
	{
		title: "Athlete",
		rarity: "common"
	},
	{
		title: "Dungeon Delver",
		rarity: "common"
	},
	{
		title: "Healer",
		rarity: "common"
	},
	{
		title: "Heavily Armored",
		rarity: "common"
	},
	{
		title: "Lightly Armored",
		rarity: "common"
	},
	{
		title: "Moderately Armored",
		rarity: "common"
	},
	{
		title: "Inspiring Leader",
		rarity: "common"
	},
	{
		title: "Tactical Wit", // (Wizard)",
		rarity: "common"
	},
	{
		title: "Observant",
		rarity: "common",
		description: `Quick to notice details of your environment, you gain the following benefits:
- Increase your Intelligence or Wisdom score by 1, to a maximum of 20.
- If you can see a creature's mouth while it is speaking a language you understand, you can interpret what it's saying by reading its lips.
- You have a +5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores.`
	},
	{
		title: "Resilient of each type",
		rarity: "common"
	},
	{
		title: "Skilled", // (3 random skills)",
		rarity: "common"
	},
	{
		title: "Tavern Brawler",
		rarity: "common"
	},
	{
		title: "Speech of the Woods", // (Druid)",
		rarity: "common"
	},
	{
		title: "Giant’s Power", // (Barbarian)",
		rarity: "common", description: "Become a Giant!"
	},
	{
		title: "Spirit Seeker", // (Barbarian)",
		rarity: "common"
	},
	{
		title: "Magic Awareness", // (Barbarian)",
		rarity: "common"
	},
	{
		title: "Warrior of the Gods", // (Barbarian)",
		rarity: "common"
	},
	{
		title: "Silver Tongue", // (Bard)",
		rarity: "common"
	},
	{
		title: "Guiding Whispers", // (Bard)",
		rarity: "common"
	},
	{
		title: "Words of Terror", // (Bard)",
		rarity: "common"
	},
	{
		title: "Spell Breaker", // (Cleric)",
		rarity: "common"
	},
	{
		title: "Circle of Mortality", // (Cleric)",
		rarity: "common"
	},
	{
		title: "Eyes of the Grave", // (Cleric)",
		rarity: "common"
	},
	{
		title: "Disciple of Life", // (Cleric)",
		rarity: "common"
	},
	{
		title: "Blessed Healer", // (Cleric)",
		rarity: "common"
	},
	{
		title: "Thunderous Strike", // (Cleric)",
		rarity: "common"
	},
	{
		title: "Vigilant Blessing", // (Cleric)",
		rarity: "common"
	},
	{
		title: "Student of War", // (Fighter)",
		rarity: "common"
	},
	{
		title: "Know Your Enemy", // (Fighter)",
		rarity: "common"
	},
	{
		title: "Remarkable Athlete", // (Fighter)",
		rarity: "common"
	},
	{
		title: "Slow Fall", // (Monk)",
		rarity: "common"
	},
	{
		title: "Stillness of Mind", // (Monk)",
		rarity: "common"
	},
	{
		title: "Purity of Body", // (Monk)",
		rarity: "common"
	},
	{
		title: "Divine Sense", // (Paladin)",
		rarity: "common"
	},
	{
		title: "Undying Sentinel", // (Paladin)",
		rarity: "common"
	},
	{
		title: "Divine Health", // (Paladin)",
		rarity: "common"
	},
	{
		title: "Divine Allegiance", // (Paladin)",
		rarity: "common"
	},
	{
		title: "Unyielding Saint", // (Paladin)",
		rarity: "common"
	},
	{
		title: "Aura of the Sentinel", // (Paladin)",
		rarity: "common"
	},
	{
		title: "Natural Explorer", // (Ranger)",
		rarity: "common"
	},
	{
		title: "Land’s Stride", // (Ranger)",
		rarity: "common"
	},
	{
		title: "Hide in Plain Sight", // (Ranger)",
		rarity: "common"
	},
	{
		title: "Umbral Sight", // (Ranger)",
		rarity: "common"
	},
	{
		title: "Detect Portal", // (Ranger)",
		rarity: "common"
	},
	{
		title: "Second Story Work", // (Rogue)",
		rarity: "common"
	},
	{
		title: "Supreme Sneak", // (Rogue)",
		rarity: "common"
	},
	{
		title: "Gift of the Sea", // (Warlock)",
		rarity: "common"
	},
	{
		title: "Oceanic Soul", // (Warlock)",
		description: "You have the soul of an Ocean!",
		rarity: "common"
	},
	{
		title: "Use Magic Device", // (Rogue)",
		rarity: "common",
		description: "You can use magic devices, like, super well.",
	},
	{
		title: "Undying Nature", // (Warlock)",
		rarity: "common"
	},
	{
		title: "Imposter", // (Rogue)",
		rarity: "common"
	},
	{
		title: "Temporal Awareness", // (Wizard)",
		rarity: "common"
	},
	{
		title: "Storm Guide", // (Sorcerer)",
		rarity: "common"
	},
	{
		title: "Improved Minor Illusion", // (Wizard)",
		rarity: "common"
	},
	{
		title: "Wind Speaker", // (Sorcerer)",
		rarity: "common"
	},
	{
		title: "Wizardly Quill", // (Wizard)",
		rarity: "common"
	},
	{
		title: "Malleable Illusions", // (Wizard)",
		rarity: "common"
	},
	{
		title: "Minor Alchemy", // (Wizard)",
		rarity: "common"
	},
	{
		title: "Telepathic Speech", // (Sorcerer)",
		rarity: "common"
	},
	{
		title: "Martial weapon proficiency",
		rarity: "common"
	},
	{
		title: "Tempestuous Magic", // (Sorcerer)",
		rarity: "rare"
	},
	{
		title: "Arcane Deflection", // (Wizard)",
		rarity: "rare"
	},
	{
		title: "Psychic Defenses", // (Sorcerer)",
		rarity: "rare"
	},
	{
		title: "Fey Presence", // (Warlock)",
		rarity: "rare",
		description: ''
	},
	{
		title: "Dread Ambusher", // (Ranger)",
		rarity: "rare"
	},
	{
		title: "Adjust Density", // (Wizard)",
		rarity: "rare"
	},
	{
		title: "Minor Conjuration", // (Wizard)",
		rarity: "rare"
	},
	{
		title: "Gravity Well", // (Wizard)",
		rarity: "rare"
	},
	{
		title: "Feral Senses", // (Ranger)",
		rarity: "rare"
	},
	{
		title: "Restore Balance", // (Sorcerer)",
		rarity: "rare"
	},
	{
		title: "Aura of Conquest", // (Paladin)",
		rarity: "rare"
	},
	{
		title: "Aura of Devotion", // (Paladin)",
		rarity: "rare"
	},
	{
		title: "Deflect Missile", // (Monk)",
		rarity: "rare"
	},
	{
		title: "Skulker",
		rarity: "rare"
	},
	{
		title: "Alert",
		rarity: "rare"
	},
	{
		title: "Momentary Stasis", // (Wizard)",
		rarity: "rare"
	},
	{
		title: "Unerring Eye", // (Rogue)",
		rarity: "rare"
	},
	{
		title: "Charger",
		rarity: "rare"
	},
	{
		title: "Defensive Duelist",
		rarity: "rare"
	},
	{
		title: "Durable",
		rarity: "rare"
	},
	{
		title: "Grappler",
		rarity: "rare"
	},
	{
		title: "Heavy Armor Master",
		rarity: "rare"
	},
	{
		title: "Medium Armor Master",
		rarity: "rare"
	},
	{
		title: "Martial Adept",
		rarity: "rare"
	},
	{
		title: "Metamagic Adept",
		rarity: "rare"
	},
	{
		title: "Indestructible Life", // (Warlock)",
		rarity: "rare"
	},
	{
		title: "Radiant Soul", // (Warlock)",
		rarity: "rare"
	},
	{
		title: "Celestial Resistance", // (Warlock)",
		rarity: "rare"
	},
	{
		title: "Mounted Combatant",
		rarity: "rare"
	},
	{
		title: "Poisoner",
		rarity: "rare"
	},
	{
		title: "Shield Master",
		rarity: "rare"
	},
	{
		title: "Arcane Ward", // (Wizard)",
		rarity: "rare"
	},
	{
		title: "Spell Sniper",
		rarity: "rare"
	},
	{
		title: "Telekinetic",
		rarity: "rare"
	},
	{
		title: "Master of Tactics", // (Rogue)",
		rarity: "rare"
	},
	{
		title: "Tipsy Sway", // (Monk)", // (ki is proficiency)",
		rarity: "rare"
	},
	{
		title: "Telepathic",
		rarity: "rare"
	},
	{
		title: "Nature’s Ward", // (Druid)",
		rarity: "rare"
	},
	{
		title: "Rage 1x per day", // (Barbarian)",
		rarity: "rare"
	},
	{
		title: "Danger Sense", // (Barbarian)",
		rarity: "rare"
	},
	{
		title: "Indomitable Might", // (Barbarian)",
		rarity: "rare"
	},
	{
		title: "Bardic Inspiration 1x per day", // (Bard)",
		rarity: "rare"
	},
	{
		title: "Song of Rest", // (Bard)",
		rarity: "rare"
	},
	{
		title: "Countercharm", // (Bard)",
		rarity: "rare"
	},
	{
		title: "Universal Speech", // (Bard)",
		rarity: "rare"
	},
	{
		title: "Turn Undead", // (Cleric) 1x / Destroy@5",
		rarity: "rare"
	},
	{
		title: "Favored by the Gods", // (Sorcerer)",
		rarity: "rare"
	},
	{
		title: "Empowered Healing", // (Sorcerer)",
		rarity: "rare"
	},
	{
		title: "Reaper", // (Cleric)",
		rarity: "rare"
	},
	{
		title: "Soul of the Forge", // (Cleric)",
		rarity: "rare"
	},
	{
		title: "Warding Flare", // (Cleric)",
		rarity: "rare"
	},
	{
		title: "Channel Divinity: Cloak of Shadows", // (Cleric)",
		rarity: "rare"
	},
	{
		title: "Eldritch Strike", // (Fighter)",
		rarity: "rare"
	},
	{
		title: "Unarmored Movement", // (Monk)",
		rarity: "rare"
	},
	{
		title: "Relentless Avenger", // (Paladin)",
		rarity: "rare"
	},
	{
		title: "Favored Enemy", // (Ranger)",
		rarity: "rare"
	},
	{
		title: "Hunter’s Sense", // (Ranger)",
		rarity: "rare"
	},
	{
		title: "Slayer’s Prey", // (Ranger)",
		rarity: "rare"
	},
	{
		title: "Awakened Mind", // (Warlock)",
		rarity: "rare"
	},
	{
		title: "The Third Eye", // (Wizard)",
		rarity: "rare"
	},
	{
		title: "Eyes of the Dark", // (Sorcerer)",
		rarity: "rare"
	},
	{
		title: "Fancy Footwork", // (Rogue)",
		rarity: "rare"
	},
	{
		title: "Ambush Master", // (Rogue)",
		rarity: "rare"
	},
	{
		title: "Moon Fire", // (Sorcerer)",
		rarity: "rare"
	},
	{
		title: "Steady Aim", // (Rogue)",
		rarity: "rare"
	},
	{
		title: "Sculpt Spells", // (Wizard)",
		rarity: "rare"
	},
	{
		title: "Thought Shield", // (Warlock)",
		rarity: "rare"
	},
	{
		title: "Inured to Undeath", // (Wizard)",
		rarity: "rare"
	},
	{
		title: "Sneak attack", // (Rogue)",
		rarity: "epic"
	},
	{
		title: "Draconic Resilience", // (Sorcerer)",
		rarity: "epic"
	},
	{
		title: "Entropic Ward", // (Warlock)",
		rarity: "epic"
	},
	{
		title: "Magical Ambush", // (Rogue)",
		rarity: "epic"
	},
	{
		title: "Grim Harvest", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Split Enchantment", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Alter Memories", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Panache", // (Rogue)",
		rarity: "epic"
	},
	{
		title: "Durable Summons", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Benign Transportation", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Master Duelist", // (Rogue)",
		rarity: "epic"
	},
	{
		title: "Potent Cantrip", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Durable Magic", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Shapechanger", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Violent Attraction", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Illusory Self", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Beguiling Defenses", // (Warlock)",
		rarity: "epic"
	},
	{
		title: "Dark Delirium", // (Warlock)",
		rarity: "epic"
	},
	{
		title: "Unearthly Recovery", // (Sorcerer)",
		rarity: "epic"
	},
	{
		title: "Vigilant Rebuke", // (Paladin)",
		rarity: "epic"
	},
	{
		title: "Dark One’s Blessing", // (Warlock)",
		rarity: "epic"
	},
	{
		title: "Fiendish Resilience", // (Warlock)",
		rarity: "epic"
	},
	{
		title: "Scornful Rebuke", // (Paladin)",
		rarity: "epic"
	},
	{
		title: "Trance of Order", // (Sorcerer)",
		rarity: "epic"
	},
	{
		title: "Tranquility", // (Monk)",
		rarity: "epic"
	},
	{
		title: "Hypnotic Gaze", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Skirmisher", // (Rogue)",
		rarity: "epic"
	},
	{
		title: "Heart of the Storm", // (Sorcerer)",
		rarity: "epic"
	},
	{
		title: "Arcane Abeyance", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Misty Escape", // (Warlock)",
		rarity: "epic"
	},
	{
		title: "Magic-User’s Nemesis", // (Ranger)",
		rarity: "epic"
	},
	{
		title: "Misdirection", // (Rogue)",
		rarity: "epic"
	},
	{
		title: "Monk Evasion",
		rarity: "epic"
	},
	{
		title: "Rogue Evasion",
		rarity: "epic"
	},
	{
		title: "Planar Warrior", // (Ranger)",
		rarity: "epic"
	},
	{
		title: "Ethereal Step", // (Ranger)",
		rarity: "epic"
	},
	{
		title: "Soul of Deceit", // (Rogue)",
		rarity: "epic"
	},
	{
		title: "Second Wind", // (Fighter)",
		rarity: "epic"
	},
	{
		title: "Crossbow Expert",
		rarity: "epic"
	},
	{
		title: "Crusher",
		rarity: "epic"
	},
	{
		title: "Piercer",
		rarity: "epic"
	},
	{
		title: "Aura of Hate", // (Paladin)",
		rarity: "epic"
	},
	{
		title: "Slasher",
		rarity: "epic"
	},
	{
		title: "Dual Wielder",
		rarity: "epic"
	},
	{
		title: "Uncanny Dodge", // (Rogue)",
		rarity: "epic"
	},
	{
		title: "Elemental Adept",
		rarity: "epic"
	},
	{
		title: "Fighting Initiate",
		rarity: "epic"
	},
	{
		title: "Mage Slayer",
		rarity: "epic"
	},
	{
		title: "Magic Initiate",
		rarity: "epic"
	},
	{
		title: "Mobile",
		rarity: "epic"
	},
	{
		title: "Polearm Master",
		rarity: "epic"
	},
	{
		title: "Distant Strike", // (Ranger)",
		rarity: "epic"
	},
	{
		title: "Savage Attacker",
		rarity: "epic"
	},
	{
		title: "Sentinel",
		rarity: "epic"
	},
	{
		title: "War Caster",
		rarity: "epic"
	},
	{
		title: "Touch of Death", // (Monk)",
		rarity: "epic"
	},
	{
		title: "Weapon Master",
		rarity: "epic"
	},
	{
		title: "Halo of Spores", // (Druid) - Fungal Infestation@6",
		rarity: "epic"
	},
	{
		title: "Barbarian Unarmored Defense",
		rarity: "epic"
	},
	{
		title: "Monk Unarmored Defense",
		rarity: "epic"
	},
	{
		title: "Reckless Attack", // (Barbarian)",
		rarity: "epic"
	},
	{
		title: "Movement Speed Increase",
		rarity: "epic"
	},
	{
		title: "Brutal Critical", // (Barbarian)",
		rarity: "epic"
	},
	{
		title: "Jack of All Trades", // (Bard)",
		rarity: "epic"
	},
	{
		title: "Enthralling Performance", // (Bard)",
		rarity: "epic"
	},
	{
		title: "Spirit Session", // (Bard)",
		rarity: "epic"
	},
	{
		title: "Blessed Strikes", // (Cleric)",
		rarity: "epic"
	},
	{
		title: "Sentinel at Death’s Door", // (Cleric)",
		rarity: "epic"
	},
	{
		title: "Dampen Elements", // (Cleric)",
		rarity: "epic"
	},
	{
		title: "Voice of Authority", // (Cleric)",
		rarity: "epic"
	},
	{
		title: "Wrath of the Storm", // (Cleric)",
		rarity: "epic"
	},
	{
		title: "Unwavering Mark", // (Fighter)",
		rarity: "epic"
	},
	{
		title: "Hold the Line", // (Fighter)",
		rarity: "epic"
	},
	{
		title: "Ferocious Charger", // (Fighter)",
		rarity: "epic"
	},
	{
		title: "Improved Critical", // (Fighter)",
		rarity: "epic"
	},
	{
		title: "Runic Shield", // (Fighter)",
		rarity: "epic"
	},
	{
		title: "Chronal Shift", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Fighting Spirit", // (Fighter)",
		rarity: "epic"
	},
	{
		title: "Rapid Strike", // (Fighter)",
		rarity: "epic"
	},
	{
		title: "Martial Arts", // (Monk)",
		rarity: "epic"
	},
	{
		title: "Opportunist", // (Monk)",
		rarity: "epic"
	},
	{
		title: "Aura of Warding", // (Paladin)",
		rarity: "epic"
	},
	{
		title: "Aura of Alacrity", // (Paladin)",
		rarity: "epic"
	},
	{
		title: "Purity of Spirit", // (Paladin)",
		rarity: "epic"
	},
	{
		title: "Protective Spirit", // (Paladin)",
		rarity: "epic"
	},
	{
		title: "Dreadful Strikes", // (Ranger)",
		rarity: "epic"
	},
	{
		title: "Shadowy Dodge", // (Ranger)",
		rarity: "epic"
	},
	{
		title: "Grave Touched", // (Warlock)",
		rarity: "epic"
	},
	{
		title: "Defy Death", // (Warlock)",
		rarity: "epic"
	},
	{
		title: "Cunning Action", // (Rogue)",
		rarity: "epic"
	},
	{
		title: "Command Undead", // (Wizard)",
		rarity: "epic"
	},
	{
		title: "Assassinate", // (Rogue)",
		rarity: "epic"
	},
	{
		title: "Action Surge", // (Fighter)",
		rarity: "legendary"
	},
	{
		title: "Divine Smite", // (Paladin)",
		rarity: "legendary"
	},
	{
		title: "Lay on Hands", // (Paladin)",
		rarity: "legendary"
	},
	{
		title: "Drake Companion", // (Ranger)",
		rarity: "legendary"
	},
	{
		title: "Shadow Step", // (Monk)",
		rarity: "legendary"
	},
	{
		title: "Shadow Walk", // (Sorcerer)",
		rarity: "legendary"
	},
	{
		title: "Dragon Wings", // (Sorcerer)",
		rarity: "legendary"
	},
	{
		title: "Convergent Future", // (Wizard)",
		rarity: "legendary"
	},
	{
		title: "Cloak of Shadows", // (Monk)",
		rarity: "legendary"
	},
	{
		title: "Primal Companion", // (Ranger)",
		rarity: "legendary"
	},
	{
		title: "Strength Before Death", // (Fighter)",
		rarity: "legendary"
	},
	{
		title: "Arcane Shot", // (Fighter)",
		rarity: "legendary"
	},
	{
		title: "Fey Touched",
		rarity: "legendary"
	},
	{
		title: "Shadow Touched",
		rarity: "legendary"
	},
	{
		title: "Great Weapon Master",
		rarity: "legendary"
	},
	{
		title: "Searing Vengeance", // (Warlock)",
		rarity: "legendary"
	},
	{
		title: "Keen Mind",
		rarity: "legendary"
	},
	{
		title: "Portent", // (Wizard)",
		rarity: "legendary"
	},
	{
		title: "Lucky",
		rarity: "legendary"
	},
	{
		title: "Sharpshooter",
		rarity: "legendary"
	},
	{
		title: "Tough",
		rarity: "legendary"
	},
	{
		title: "Wildshape 1x Per Day", // (Druid)",
		rarity: "legendary"
	},
	{
		title: "Starry Form 1x Per Day", // (Druid)",
		rarity: "legendary"
	},
	{
		title: "Summon Wildfire Spirit", // (Druid)",
		rarity: "legendary"
	},
	{
		title: "Extra Attack",
		rarity: "legendary"
	},
	{
		title: "Mantle of Majesty", // (Bard)",
		rarity: "legendary"
	},
	{
		title: "Mantle of Whispers", // (Bard)",
		rarity: "legendary"
	},
	{
		title: "Visions of the Past", // (Cleric)",
		rarity: "legendary"
	},
	{
		title: "War Magic", // (Fighter)",
		rarity: "legendary"
	},
	{
		title: "Giant Might", // (Fighter)",
		rarity: "legendary"
	},
	{
		title: "BG3 Fast Hands", // (BG3)",
		rarity: "legendary"
	},
	{
		title: "Thief’s Reflexes", // (Rogue)",
		rarity: "legendary"
	}
];


const rarityMods : Record<Rarity, Mod[]> = {
	common: [
		//...defsToMods(commonDefs, 'common'),
		//...defsToMods(textFileModDefs.common, 'common')
	],
	rare: [
		//...defsToMods(rareDefs, 'rare'),
		//...defsToMods(textFileModDefs.rare, 'rare')
	],
	epic: [
		//...defsToMods(epicDefs, 'epic'),
		//...defsToMods(textFileModDefs.epic, 'epic')
	],
	legendary: [
		//...defsToMods(legendaryDefs, 'legendary'),
		//...defsToMods(textFileModDefs.legendary, 'legendary')
	],
}

for (const def of fromSheet) {
	const mod = defToMod(def, def.rarity!)
	rarityMods[def.rarity!].push(mod)
}


const mods : Mod[] = [
	...rarityMods.common,
	...rarityMods.rare,
	...rarityMods.epic,
	...rarityMods.legendary,
]

// Check for any duplicate IDs
const idsSet = new Set<string>()
mods.forEach(mod => {
	if (idsSet.has(mod.id)) {
		throw new Error(`Duplicate mod id: ${mod.id}`)
	}
	idsSet.add(mod.id)
})

export default mods
