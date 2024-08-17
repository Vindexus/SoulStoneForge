export type PlayerId = 'mb' | 'mc' | 'wyatt' | 'tj' | 'colin'

export type Player = {
	username: string,
	discordUserId?: string,
	characterName: string,
	id: PlayerId
}

export const PLAYERS: Player[] = [
	{
		username: 'Vindexus',
		characterName: 'Eltraxtin',
		id: 'colin',
		discordUserId: '86729947938312192',
	},
	{
		username: 'Puggy',
		characterName: 'Puggy',
		id: 'wyatt'
	},
	{
		username: 'Thalion',
		characterName: 'Thalion',
		discordUserId: '225159199527534593',
		id: 'tj'
	},
	{
		username: 'Lucious',
		characterName: 'Lucious',
		id: 'mb'
	},
	{
		username: 'Dent',
		characterName: 'Dent',
		id: 'mc'
	},
]

export const PlayerMap = new Map<PlayerId, Player>(PLAYERS.map(p => [p.id as PlayerId, p]))

export function getPlayerByDiscordId (discordId: string): Player | undefined {
	return PLAYERS.find(p => p.discordUserId === discordId)
}
