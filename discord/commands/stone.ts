import {AttachmentBuilder, ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {getStoneScreenshotPath, takeScreenshotAndSaveToDisk} from "@/lib/screenshotter";
import SoulStone from "@/soulstones/stone.class";
import {replyWithStone} from "../discord-helpers";

export const data = new SlashCommandBuilder()
.setName('stone')
.setDescription('Find and show a Soul Stone')
.addStringOption(option =>
	option.setName('search')
	.setDescription('ID number or name')
	.setRequired(true))

export async function execute(interaction: ChatInputCommandInteraction) {
	const imp = await import('@/soulstones/forge');
	const forge = imp.default
	const search = interaction.options.getString('search', true);
	console.log('search', search)
	try {
		let ss : SoulStone
		const id = parseInt(search)
		if (isNaN(id)) {
			const found = await forge.getStonesBySearch(search)
			if (found.length > 1) {
				throw new Error(`Multiple stones found for "${search}"`)
			}
			ss = found[0]
		}
		else {
			ss = forge.getStoneById(search)
		}
		if (!ss) {
			await interaction.reply(`Could not find stone with search "${search}"`)
			return
		}
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
