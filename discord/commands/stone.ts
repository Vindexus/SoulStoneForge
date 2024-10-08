import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {addCommandOptionSearchStone, getInteractionStone, replyWithStone} from "../discord-helpers";

export const data = new SlashCommandBuilder()
.setName('stone')
.setDescription('Find and show a Soul Stone')
.addStringOption(addCommandOptionSearchStone)

export async function execute(interaction: ChatInputCommandInteraction) {
	const imp = await import('@/soulstones/forge');
	const forge = imp.default
	try {
		const ss = await getInteractionStone(interaction, forge)
		await replyWithStone(interaction, ss, {
			ephemeral: false,
		})
	}
	catch (ex) {
		await interaction.reply(`ERROR: ${ex}`)
	}
};

export default {
	data,
	execute,
}
