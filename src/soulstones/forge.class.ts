import {
	getRandomItem, getRandomItemSeeded, getRandomStoneNoun, getRandomStonePrefix,
	modsToStoneName,
	rarityListToCounts,
	rarityToCommonality,
	slugify,
	sortModsRarest
} from "./helpers";
import SoulStone from "@/soulstones/stone.class";
import {getNumbersFromTextInput} from "../../bin/helpers";
import forge from "@/soulstones/forge";
import {Mod, Rarity, RarityCounts, StoneStored} from "@/soulstones/types";

export class SoulStoneForge {
	mods: Mod[] = []
	stones: SoulStone[] = []
	modTotals: RarityCounts = {}

	getModById (id: string) {
		return this.mods.find(x => x.id === id)
	}

	getRarityFromRoll (roll: number) {
		if (roll < 1 || roll > 100) {
			throw new Error('Rarity roll is d100')
		}
		if (roll >= 96) {
			return 'legendary'
		}
		if (roll >= 90) {
			return 'epic'
		}
		if (roll > 50) {
			return 'rare'
		}
		return 'common'
	}

	getNumModsFromRoll (roll: number) {
		if (roll < 1 || roll > 12) {
			throw new Error('Num mod roll is d12')
		}
		if (roll === 12) {
			return 3
		}
		if (roll >= 10) {
			return 2
		}
		return 1
	}

	addMods (mods: Mod[]) {
		for (const mod of mods) {
			const id = mod.id
			const dupe = this.getModById(id)
			if (dupe) {
				throw new Error(`Duplicate mods with id "${id}"`)
			}
			this.modTotals[mod.rarity] = (this.modTotals[mod.rarity] || 0) + 1
			this.mods.push(mod)
		}
	}

	async newSoulStoneFromInput (input: string) : Promise<SoulStone> {
		const nums = getNumbersFromTextInput(input)
		const modsRoll = nums[0]
		const numMods = forge.getNumModsFromRoll(modsRoll)
		if (nums.length < numMods + 1) {
			throw new Error('Not enough d100 rolls provided for the number of mods')
		}
		const d100s = nums.slice(1, 1+numMods)
		const rarityList = d100s.map(forge.getRarityFromRoll)
		const rarityCounts = rarityListToCounts(rarityList)
		return this.newSoulStone(rarityCounts, input)
	}

	/**
	 * Creates and returns a new soul stone based on available mods based on registered
	 * soul stones
	 * Doesn't register the new stone
	 * @param modCats
	 */
	newSoulStone (modCats: RarityCounts, seed: string) : SoulStone {
		const mods : Mod[] = []

		// Duplicate it from the getter function because we'll add to it
		const usedModIds = this.usedMods.map(x => x.id)
		for (const x of Object.entries(modCats)) {
			const entry = x as [Rarity, number]
			const [rarity, count] = entry
			const rarityMods = this.mods.filter(x => x.rarity === rarity)
			for (let i = 1; i <= count; i++) {
				const available = rarityMods.filter(x => !usedModIds.includes(x.id))
				if (!available.length) {
					throw new Error(`No mods of rarity "${rarity}" left`)
				}

				const mod = getRandomItemSeeded<Mod>(available, seed + '_' + rarity + '_' + i)
				usedModIds.push(mod.id)
				mods.push(mod)
			}
		}

		if (!mods.length) {
			throw new Error('Ended up with no mods')
		}

		// Put the rarer ones first
		const sortedMods = sortModsRarest(mods)

		const name = getRandomStonePrefix() + ' ' + getRandomStoneNoun()
		const stone = new SoulStone({
			id: Date.now().toString(),
			slug: slugify(name), // slugify(name
			name,
			playerId: null,
			mods: sortedMods,
			createdAt: new Date(),
		})
		this.stones.push(stone)
		return stone
	}

	registerStone (stone: StoneStored) {
		const mods = stone.modIds.map(id => {
			const mod = this.getModById(id)
			if (!mod) {
				throw new Error(`Mod with id "${id}" not found`)
			}
			return mod
		}).sort((a, b) => {
			return rarityToCommonality(b.rarity) - rarityToCommonality(a.rarity)
		})
		this.stones.push(new SoulStone({
			...stone,
			createdAt: new Date(stone.createdAt),
			mods: mods
		}))
	}

	registerStones (stones: StoneStored[]) {
		this.stones = []
		stones.forEach(stone => this.registerStone(stone))
	}

	removeStone (id: string) {
		const index = this.stones.findIndex(x => x.id === id)
		if (index === -1) {
			throw new Error('Stone not found')
		}
		this.stones.splice(index, 1)
	}

	getStoneById (id: string) {
		const matching = this.stones.filter(x => x.id.toLowerCase().indexOf(id.toLowerCase()) === 0)
		if (matching.length > 1) {
			throw new Error('Multiple stones found')
		}
		return matching[0]
	}

	getStoneBySearch (input: string) : SoulStone {
		const found = this.getStonesBySearch(input)
		if (found.length > 1) {
			throw new Error(`Found too many stones from search "${input}". Found ${found.map(x => x.id)}`)
		}
		if (found.length === 0) {
			throw new Error(`Found no stones from search "${input}"`)
		}
		return found[0]
	}

	getStonesBySearch (input: string) {
		const search = input.toLowerCase().trim()
		return this.stones.filter(x => x.name.toLowerCase().includes(search) || x.id.includes(search))
	}

	get usedMods () {
		if (!this.stones.length) {
			return []
		}
		return this.stones.reduce((acc: Mod[], x) => {
			return acc.concat(x.mods)
		}, [])
	}

	get usedModCounts () : RarityCounts {
		const rarityList = this.usedMods.map((mod) => mod.rarity)
		const counts = rarityListToCounts(rarityList)
		return counts
	}
}
