import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {getSoulStoneLines} from "../discord-helpers";
import formatDate from "@/lib/helpers";

export const data = new SlashCommandBuilder()
.setName('list')
.setDescription('Lists all the party Soul Stones')

export async function execute(interaction: ChatInputCommandInteraction) {
	const imp = await import('@/soulstones/forge');
	const forge = imp.default

	try {
		let lines : string[] = []
		if (forge.stones.length === 0) {
			await interaction.reply('No registered stones.')
			return
		}

		const sorted = forge.stones.sort((a, b) => {
			return a.createdAt < b.createdAt ? -1 : 1
		})
		for (const ss of sorted) {
			const parts = ['- ' + ss.name]
			if (ss.player) {
				parts.push(` **(${ss.player.characterName})**`)
			}
			parts.push( '`#' + ss.id + '`')
			parts.push(' - Created ' + formatDate(ss.createdAt))

			lines.push(parts.join(' '))
		}
		console.log('lines', lines)
		await interaction.reply(lines.join('\n'))
	}
	catch (ex) {
		await interaction.reply(`ERROR: ${ex}`)
	}
};

export default {
	data,
	execute,
}
