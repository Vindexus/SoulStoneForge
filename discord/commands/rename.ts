import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {addCommandOptionSearchStone, getInteractionStone, replyWithStone} from "../discord-helpers";
import {renameStone} from "@/soulstones/controller";

export const data = new SlashCommandBuilder()
.setName('rename')
.setDescription('Rename a stone.')
.addStringOption(addCommandOptionSearchStone)
.addStringOption(option =>
	option.setName('new_name')
	.setDescription('New name')
	.setRequired(true))

export async function execute(interaction: ChatInputCommandInteraction) {
	const imp = await import('@/soulstones/forge');
	const forge = imp.default
	const newName = interaction.options.getString('new_name', true);
	try {
		const ss = await getInteractionStone(interaction, forge)
		const nameBefore = ss.name
		renameStone(ss, newName)
		await replyWithStone(interaction, ss, {
			prepend: `Renamed stone \`${ss.id}\` from "${nameBefore}" to "${ss.name}"\n`,
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
