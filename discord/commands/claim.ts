import {ChatInputCommandInteraction, Client, SlashCommandBuilder,} from "discord.js";
import {addCommandOptionSearchStone, getInteractionStone, replyWithStone} from "../discord-helpers";
import {getPlayerBySearch} from "@/soulstones/players";
import {setStonePlayer} from "@/soulstones/controller";

export const data = new SlashCommandBuilder()
.setName('claim')
.setDescription('Change who has the stone')
.addStringOption(addCommandOptionSearchStone)
.addStringOption(option =>
	option.setName('player')
	.setDescription('ID or search for player. Blank to unclaim.')
	.setRequired(false))

export async function execute(interaction: ChatInputCommandInteraction, client: Client) {
	const imp = await import('@/soulstones/forge');
	const forge = imp.default
	try {
		const playerSearch = interaction.options.getString('player', false);
		const ss = await getInteractionStone(interaction, forge)
		let newOwner = ''
		if (playerSearch) {
			const player = getPlayerBySearch(playerSearch)
			newOwner = player.characterName
			setStonePlayer(ss, player.id)
		}
		else {
			newOwner = '*none*'
			setStonePlayer(ss, undefined)
		}

		await replyWithStone(interaction, ss, {
			prepend: `Changed owner to ${newOwner}\n`,
			ephemeral: false,
		})
	}
	catch (ex) {
		console.log('ex', ex)
		await interaction.reply(`ERROR: ${ex}`)
	}
};

export default {
	data,
	execute,
}
