import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {getSoulStoneLines} from "../discord-helpers";

export const data = new SlashCommandBuilder()
.setName('list')
.setDescription('Lists all the party Soul Stones')

export async function execute(interaction: ChatInputCommandInteraction) {
	const imp = await import('@/soulstones/forge');
	const forge = imp.default

	try {
		let lines : string[] = []
		const sorted = forge.stones.sort((a, b) => {
			return a.createdAt < b.createdAt ? -1 : 1
		})
		lines.push('**==============================**')
		let num = 0
		for (const ss of sorted) {
			num++
			if (lines.length > 0) {
				lines.push(' ')
				lines.push('**==============================**')
			}
			lines = lines.concat(getSoulStoneLines(ss, {
				showCreated: true,
			}))
		}
		lines.push('**==============================**')
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
