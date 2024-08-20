import {cyan, green, purple, yellow} from "next/dist/lib/picocolors";
import {Mod, Rarity, RarityCounts} from "@/soulstones/types";
import seedrandom from 'seedrandom'

export function getRandomInt (min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomItem<T> (items: T[]): T {
	return items[getRandomInt(0, items.length - 1)]!
}

export function getRandomItemSeeded<T> (items: T[], seed: string): T {
	const rng = seedrandom(seed)
	return items[Math.floor(rng() * items.length)]!
}

export function slugify (str: string) : string {
	return str.toLowerCase().replace(/[\\'\\"\\:]/g, '').replace(/[^A-Z]/gi, '-')
}

export function rarityListToCounts (rarities: Rarity[]) : RarityCounts {
	const counts: RarityCounts = {}
	for (const rarity of rarities) {
		counts[rarity] = counts[rarity] ? counts[rarity] + 1 : 1
	}
	return counts
}

export function pluralizeRarity (rarity: Rarity, count: number) : string {
	if (rarity === 'legendary') {
		return count === 1 ? rarity : 'legendaries'
	}
	return count === 1 ? rarity : rarity + 's'
}

export function rarityCountClrd (entry: [Rarity, number]) : string {
	const [rarity, count] = entry
	return clrRarity(rarity as Rarity, `${count} ${rarity} mod${count === 1 ? '' : 's'}`)
}

export function rarityCountToOxfordList (counts: RarityCounts) : string {
	const parts :string[] = []
	for (const entry of Object.entries(counts)) {
		parts.push(rarityCountClrd(entry as [Rarity, number]))
	}
	return oxfordJoin(parts)
}

export function clrRarity (rarity: Rarity, str: number | string | undefined | null | Date) : string {
	if (rarity === 'common') {
		return cyan(`${str}`)
	}
	if (rarity === 'rare') {
		return green(`${str}`)
	}
	if (rarity === 'epic') {
		return purple(`${str}`)
	}
	return yellow(`${str}`)
}

export function oxfordJoin (list: (string | number)[], ending: string = 'and') : string {
	if (list.length === 0) {
		return '[empty list]'
	}
	const copy = [...list]
	const last = copy.pop()
	if (copy.length === 0) {
		if (!last) {
			throw new Error('last element is undefined')
		}
		return last.toString()
	}
	let str = copy.join(', ')
	if (last) {
		str += ', ' + ending + ' ' + last
	}
	return str
}

export function getRandomStonePrefix () {
	return getRandomItem(`Curious
Enigmatic
Arcane
Cryptic
Veiled
Obscure
Elusive
Mystic
Veiled`.split('\n'))
}

export function getRandomStoneNoun () {
	return getRandomItem([
		'Bead',
		'Charm',
		'Crystal',
		'Curio',
		'Echo',
		'Essence',
		'Focus',
		'Gem',
		'Icon',
		'Idol',
		'Ingot',
		'Jewel',
		'Legacy',
		'Memory',
		'Orb',
		'Rune',
		'Shard',
		'Spirit',
		'Stone',
		'Vessel',
		'Whisper',
	])
}

export function modsToStoneName (mods: Mod[]) : string {
	if (mods.length === 1) {
		return getRandomStoneNoun() + ' of ' + mods[0].title
	}
	const before = mods[0].title
	let after = mods[1].title

	if (mods.length > 2) {
		after += ' and ' + mods[2].title
	}

	return `${before} ${getRandomStoneNoun()} of ${after}`
}

export function rarityToCommonality (rarity: Rarity) : number {
	if (rarity === 'common') {
		return 1
	}
	if (rarity === 'rare') {
		return 2
	}
	if (rarity === 'epic') {
		return 3
	}
	return 4

}

export function sortModsRarest (mods: Mod[]) {
	return mods.sort((a, b) => {
		return rarityToCommonality(a.rarity)  > rarityToCommonality(b.rarity) ? -1 : 1
	})
}
