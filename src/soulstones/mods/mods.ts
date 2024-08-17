import commonDefs from '@/soulstones/mods/common/commons';
import rareDefs from '@/soulstones/mods/rare/rares';
import epicDefs from '@/soulstones/mods/epic/epics';
import legendaryDefs from '@/soulstones/mods/legendary/legendaries';
import {slugify} from "@/soulstones/helpers";
import {Mod, ModDef, Rarity} from "@/soulstones/types";
import path from "path";
import fs from "fs";
import {fileURLToPath} from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let ids : string[] = []
function defsToMods (defs: ModDef[], rarity: Rarity) : Mod[] {
	return defs.map(def => {
		const id = def.id || slugify(def.title)
		if (ids.includes(id)) {
			throw new Error(`Found duplicate mod id: ${id} (adding as ${rarity})`)
		}
		ids.push(id)
		return {
			id: id,
			title: def.title,
			description: def.description,
			rarity,
		}
	})
}


const chatGPT = {
	"common": [
		{"title": "Speed Boost", "description": "Your movement speed increases by 5 feet."},
		{"title": "Enhanced Vision", "description": "You gain darkvision out to a range of 60 feet."},
		{"title": "Steady Aim", "description": "Your ranged attacks deal an additional 1 damage."},
		{"title": "Lucky Strike", "description": "Once per day, you can reroll a failed attack roll."},
		{"title": "Quick Reflexes", "description": "You gain a +1 bonus to Dexterity saving throws."},
		{"title": "Enduring", "description": "You gain a +1 bonus to Constitution saving throws."},
		{"title": "Water Breathing", "description": "You can breathe underwater for up to 1 hour."},
		{"title": "Feather Fall", "description": "You fall at a rate of 60 feet per round and take no damage from falling."},
		{"title": "Protection", "description": "You gain a +1 bonus to Armor Class."},
		{"title": "Minor Healing", "description": "Once per day, you can heal yourself for 1d4 hit points."}
	],
	"rare": [
		{"title": "Spell Reversal", "description": "Once per day, you can cast Counterspell."},
		{"title": "Evasion", "description": "You gain advantage on Dexterity saving throws against effects that you can see."},
		{"title": "Frost Resistance", "description": "You have resistance to cold damage."},
		{"title": "Flame Tongue", "description": "Your weapon deals an extra 1d6 fire damage."},
		{"title": "Winged Boots", "description": "You gain a flying speed equal to your walking speed for up to 1 hour per day."},
		{"title": "Mind Shield", "description": "You are immune to being charmed or frightened."},
		{"title": "Regeneration", "description": "You regain 1 hit point at the start of your turn if you have at least 1 hit point."},
		{"title": "Spell Storing", "description": "Once per day, you can cast a 3rd-level spell without using a spell slot."},
		{"title": "Telepathy", "description": "You can communicate telepathically with any creature within 60 feet."},
		{"title": "Stone Skin", "description": "You gain resistance to non-magical bludgeoning, piercing, and slashing damage."}
	],
	"epic": [
		{"title": "Time Stop", "description": "Once per day, you can cast Time Stop."},
		{"title": "True Strike", "description": "Your attacks have a +2 bonus to hit and damage rolls."},
		{"title": "Dimensional Door", "description": "Once per day, you can cast Dimension Door."},
		{"title": "Dragon Scales", "description": "You gain resistance to a damage type of your choice (acid, cold, fire, lightning, or poison)."},
		{"title": "Mana Shield", "description": "You can use your reaction to gain a +5 bonus to AC until the start of your next turn."},
		{"title": "Elemental Burst", "description": "Your attacks deal an additional 2d6 elemental damage of your choice (acid, cold, fire, lightning, or thunder)."},
		{"title": "Life Drain", "description": "Your attacks heal you for half the damage dealt."},
		{"title": "Giant Strength", "description": "Your Strength score increases by 4, to a maximum of 24."},
		{"title": "Ethereal Step", "description": "Once per day, you can cast Etherealness."},
		{"title": "Battle Frenzy", "description": "You can make one additional attack when you take the Attack action on your turn."}
	],
	"legendary": [
		{"title": "Wish", "description": "Once per month, you can cast Wish."},
		{"title": "Invulnerability", "description": "Once per day, you can cast Invulnerability."},
		{"title": "Divine Shield", "description": "You are immune to all damage for 1 minute. This ability recharges at dawn."},
		{"title": "Phoenix Down", "description": "Once per week, you can return to life with full hit points if you die."},
		{"title": "Elder Wand", "description": "Your spell save DC and spell attack bonus each increase by 3."},
		{"title": "Planar Travel", "description": "Once per day, you can cast Plane Shift."},
		{"title": "Soul Reaver", "description": "Your attacks deal an additional 4d6 necrotic damage and you heal for the same amount."},
		{"title": "Eternal Youth", "description": "You stop aging and cannot be aged magically."},
		{"title": "Godslayer", "description": "Your attacks bypass all resistances and immunities."},
		{"title": "Reality Warp", "description": "Once per day, you can alter reality in a 1-mile radius."}
	]
}

const textFileModDefs : Record<Rarity, ModDef[]> = {
	common: [],
	rare: [],
	epic: [],
	legendary: [],
}

for (const [rarity, defs] of Object.entries(textFileModDefs)) {
	const dir = path.join(__dirname, rarity)
	const files = fs.readdirSync(dir)
	for (const file of files) {
		if (file.endsWith('.ts')) continue
		const filePath = path.join(dir, file)
		const contents = fs.readFileSync(filePath, 'utf-8')
		const id = file.replace('.txt', '')
		const lines = contents.split('\n').filter(x => !!x)
		const title = lines.shift()!
		console.log(`Loaded ${title} from ${filePath}`)
		defs.push({
			title,
			id,
			description: lines.join('\n'),
		})
	}
}

const rarityMods : Record<Rarity, Mod[]> = {
	common: [
		...defsToMods(chatGPT.common, 'common'),
		...defsToMods(commonDefs, 'common'),
		...defsToMods(textFileModDefs.common, 'common')
	],
	rare: [
		...defsToMods(chatGPT.rare, 'rare'),
		...defsToMods(rareDefs, 'rare'),
		...defsToMods(textFileModDefs.rare, 'rare')
	],
	epic: [
		...defsToMods(chatGPT.epic, 'epic'),
		...defsToMods(epicDefs, 'epic'),
		...defsToMods(textFileModDefs.epic, 'epic')
	],
	legendary: [
		...defsToMods(chatGPT.legendary, 'legendary'),
		...defsToMods(legendaryDefs, 'legendary'),
		...defsToMods(textFileModDefs.legendary, 'legendary')
	],
}


export default [
	...rarityMods.common,
	...rarityMods.rare,
	...rarityMods.epic,
	...rarityMods.legendary,
]
