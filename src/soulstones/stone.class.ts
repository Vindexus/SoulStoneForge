import {Mod} from "@/soulstones/forge.class";
import {slugify} from "@/soulstones/helpers";

export interface SoulStoneFields {
	id: string
	name: string
	player: null | string
	mods: Mod[]
	createdAt: Date
}

export default class SoulStone implements SoulStoneFields {
	id: string
	name: string
	player: null | string
	mods: Mod[]
	createdAt: Date

	constructor ({id, name, player, mods, createdAt}: SoulStoneFields) {
		this.id = id
		this.name = name
		this.player = player
		this.mods = mods
		this.createdAt = new Date(createdAt)
	}

	setPlayer (player: string | undefined | null) {
		this.player = !!player ? player : null
	}

	updateIdSuffix (suffix: string) {
		this.id = this.id.split('-')[0] + '-' + slugify(suffix)
	}
}
