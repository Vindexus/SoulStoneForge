import 'dotenv/config'
export const guildId = process.env.DISCORD_GUILD_ID as string
export const clientId = process.env.DISCORD_CLIENT_ID as string
export const token = process.env.DISCORD_TOKEN as string

if (!guildId || !clientId || !token) {
	console.error('Missing environment variables.')
	process.exit(1)
}
