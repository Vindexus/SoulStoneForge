import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {addCommandOptionSearchStone, getInteractionStone, verifyAdminRole} from "../discord-helpers";
import {deleteStone} from "@/soulstones/controller";

export const data = new SlashCommandBuilder()
.setName('destroy')
.setDescription('Destroy a stone.')
.addStringOption(addCommandOptionSearchStone)

export async function execute(interaction: ChatInputCommandInteraction) {
	if (!await verifyAdminRole(interaction)) {
		return
	}
	const imp = await import('@/soulstones/forge');
	const forge = imp.default
	try {
		const ss = await getInteractionStone(interaction, forge)
		deleteStone(ss.id)
		await interaction.reply(`Stone deleted.`)
	}
	catch (ex) {
		await interaction.reply(`ERROR: ${ex}`)
	}
};

export default {
	data,
	execute,
}
