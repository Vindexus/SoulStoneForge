import {SoulStoneFields} from "@/soulstones/stone.class";

export type StoneStored = Omit<SoulStoneFields, 'mods'|'createdAt'> & {
	modIds: string[]
	createdAt: string
}

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'

export type RarityCounts = Partial<Record<Rarity, number>>

export type ModDef = {
	id?: string
	title: string
	description?: string
	rarity?: Rarity
}

export type Mod = Omit<ModDef, 'id'|'rarity'> & {
	rarity: Rarity
	id: string
}

export const RARITIES : Rarity[] = ['common', 'rare', 'epic', 'legendary']
