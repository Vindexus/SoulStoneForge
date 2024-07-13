import {bgWhite, black, bold, cyan, gray, red, underline} from "next/dist/lib/picocolors";
import forge from "@/soulstones/forge";
import {clrRarity, oxfordJoin, rarityToCommonality} from "@/soulstones/helpers";
import SoulStone from "@/soulstones/stone.class";
import {RARITIES} from "@/soulstones/types";

export function logWelcomeMsg () {
	console.log(`=======================================`)
	console.log(`Welcome to the ${bgWhite(black('Soul Stone Forge!'))}`)
	console.log(`=======================================`)
}

export function logModCount () {
	const usedCount = forge.usedModCounts
	for (const rarity of RARITIES) {
		const num = forge.modTotals[rarity] || 0
		const remaining = num - (usedCount[rarity] || 0)
		console.log(`There ${remaining === 1 ? 'is' : 'are'} ${clrRarity(rarity, remaining + ' ' + rarity)} mod${num === 1 ? '' : 's'} remaining of ${num} total`)
	}
}

export function logStonesCount () {
	const num = forge.stones.length
	console.log(`There ${num === 1 ? 'is' : 'are'} ${(num === 0 ? red : cyan)(num.toString())} registered Soulstone${num === 1 ? '' : 's'} ${gray('"npm run list" to view')}`)
}

export function logUsedMods () {
	const usedMods = forge.usedMods
	const sorted = usedMods.sort((a, b) => {
		return rarityToCommonality(b.rarity) - rarityToCommonality(a.rarity)
	})
	console.log(`Used mods: ${oxfordJoin(sorted.map((mod) => {
		return clrRarity(mod.rarity, mod.title)
	}))}`)
}


export function logStone (stone: SoulStone) {
	console.log(gray('`'.repeat(60)))

	function indented (str: string) {
		return console.log('  ' + str)
	}

	if (stone.name) {
		console.log(underline(bold(stone.name)))
	}
	else {
		console.log(underline(gray('Unnamed Soul Stone')))
	}
	indented(gray('ID: ' + stone.id))
	indented(gray('Created: ' + stone.createdAt.toLocaleTimeString('en-CA', {year: 'numeric', month: 'long', day: 'numeric'})))
	indented(gray('Player: ') + (stone.player ? bold(stone.player) : gray('None')))
	for (const mod of stone.mods) {
		indented(clrRarity(mod.rarity, '----'))
		indented(clrRarity(mod.rarity, `${mod.title} (${mod.rarity})`))
		indented(mod.description)
	}
	console.log(gray('.'.repeat(60)))
}
