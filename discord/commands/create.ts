import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {saveSoulStoneJSON} from "@/soulstones/stone-storage";
import {getSoulStoneLines} from "../discord-helpers";

export const data = new SlashCommandBuilder()
.setName('create')
.setDescription('Create Soul Stone. Input: [d12] [d100] [d100] [d100]')
.addStringOption(option =>
	option.setName('rolls')
			.setDescription('Results of d12 and d100 rolls. Example: 12 34 11 89')
			.setRequired(true))

export async function execute(interaction: ChatInputCommandInteraction) {
	const imp = await import('@/soulstones/forge');
	const forge = imp.default
	const rolls = interaction.options.getString('rolls', true);
	console.log('input', rolls)
	try {
		const ss = await forge.newSoulStoneFromInput(rolls)
		const lines = getSoulStoneLines(ss)
		await interaction.reply(lines.join('\n'))
		saveSoulStoneJSON(ss)
	}
	catch (ex) {
		await interaction.reply(`ERROR: ${ex}`)
	}
};

export default {
	data,
	execute,
}
