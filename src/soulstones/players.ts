export type PlayerId = 'mb' | 'mc' | 'wyatt' | 'tj' | 'colin'

export type Player = {
	username: string,
	discordUserId?: string,
	aliases: string[]
	characterName: string,
	id: PlayerId
}

export const PLAYERS: Player[] = [
	{
		username: 'Vindexus',
		characterName: 'Eltraxtin',
		aliases: ['lucy', 'blix', 'vin', 'colin'],
		id: 'colin',
		discordUserId: '86729947938312192',
	},
	{
		username: 'Puggy',
		characterName: 'Puggy',
		aliases: ['pugnacious', 'wyatt'],
		id: 'wyatt'
	},
	{
		username: 'Thalion',
		characterName: 'Thalion',
		aliases: [],
		discordUserId: '225159199527534593',
		id: 'tj'
	},
	{
		username: 'Lucious',
		characterName: 'Lucious',
		aliases: ['lucy', 'milesb', 'barron'],
		id: 'mb'
	},
	{
		username: 'Dent',
		characterName: 'Dent',
		aliases: ['milesc', 'campbell'],
		id: 'mc'
	},
]

export const PlayerMap = new Map<PlayerId, Player>(PLAYERS.map(p => [p.id as PlayerId, p]))

export function getPlayerByDiscordId (discordId: string): Player | undefined {
	return PLAYERS.find(p => p.discordUserId === discordId)
}

export function getPlayerBySearch (search: string): Player {
	const term = search.trim().toLowerCase()
	if (!term) {
		throw new Error(`No search term for player provided`)
	}
	const found = PLAYERS.filter(p => {
		return p.characterName.toLowerCase().includes(term) || p.username.toLowerCase().includes(term) || p.id.toLowerCase().includes(term) || p.aliases.includes(term)
	})
	if (found.length > 1) {
		throw new Error(`Found too many players from search "${term}". Found ${found.map(x => x.id)}`)
	}
	if (found.length === 0) {
		console.log('PLAYERS', PLAYERS)
		throw new Error(`Found no players from search "${term}"`)
	}
	return found[0]
}
