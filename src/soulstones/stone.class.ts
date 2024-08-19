import {slugify} from "@/soulstones/helpers";
import {Mod} from "@/soulstones/types";
import {Player, PlayerId, PlayerMap} from "@/soulstones/players";

export interface SoulStoneFields {
	id: string
	name: string
	playerId: null | PlayerId
	slug: string
	mods: Mod[]
	createdAt: Date
}

export default class SoulStone implements SoulStoneFields {
	id: string
	name: string
	slug: string
	playerId: null | PlayerId
	mods: Mod[]
	createdAt: Date
	player : undefined | Player

	constructor ({id, name, slug, playerId, mods, createdAt}: SoulStoneFields) {
		this.id = id
		this.name = name
		this.slug = slug
		this.playerId = playerId
		this.mods = mods
		this.createdAt = new Date(createdAt)
		this.player = undefined

		if (this.playerId) {
			this.player = PlayerMap.get(this.playerId)
		}
	}

	setPlayer (playerId: PlayerId | undefined | null) {
		this.playerId = !!playerId ? playerId : null
	}

	updateIdSuffix (suffix: string) {
		this.id = this.id.split('-')[0] + '-' + slugify(suffix)
	}

	setName (newName: string) {
		const name = (newName || '').trim()
		if (!name) {
			throw new Error('Name cannot be blank')
		}
		this.name = newName
	}
}
