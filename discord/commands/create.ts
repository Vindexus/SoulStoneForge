import {
	ActionRowBuilder,
	ButtonBuilder,
	ChatInputCommandInteraction,
	Client,
	Events, Interaction,
	SlashCommandBuilder,
	ButtonStyle,
} from "discord.js";
import {removeSoulStoneJSON, saveSoulStoneJSON} from "@/soulstones/stone-storage";
import {getSSMessage, replyWithStone} from "../discord-helpers";
import {getPlayerByDiscordId} from "@/soulstones/players";
import forge from "@/soulstones/forge";

export const data = new SlashCommandBuilder()
.setName('create')
.setDescription('Create Soul Stone. Input: [d12] [d100] [d100] [d100]')
.addStringOption(option =>
	option.setName('rolls')
			.setDescription('Results of d12 and d100 rolls. Example: 12 34 11 89')
			.setRequired(true))

	export async function execute(interaction: ChatInputCommandInteraction, client: Client) {
	const imp = await import('@/soulstones/forge');
	const forge = imp.default
	const rolls = interaction.options.getString('rolls', true);
	try {
		const ss = await forge.newSoulStoneFromInput(rolls)
/*

		const player = getPlayerByDiscordId(interaction.user.id)
		if (player) {
			ss.playerId = player.id
		}

*/

		console.log('interaction.channel', interaction.channel)
		console.log('channel id', interaction.channelId)
		const channel = await client.channels.fetch(interaction.channelId)
		console.log('fetched channel, channel', channel)

		saveSoulStoneJSON(ss)

		const id = ss.id
		const confirmButton = new ButtonBuilder()
			.setCustomId('confirm_' + id)
			.setLabel('Confirm')
			.setStyle(ButtonStyle.Primary)

		const cancelButton = new ButtonBuilder()
			.setCustomId('cancel_' + id)
			.setLabel('Cancel')
			.setStyle(ButtonStyle.Secondary)

		const prepend = 'Rolls: ' + rolls + '\n\n'

		const row = new ActionRowBuilder().addComponents(confirmButton, cancelButton)

		async function onConfirmButton(btnI: Interaction) {
			if (!btnI.isButton()) {
				return
			}

			if (btnI.customId === 'confirm_' + id) {
				await btnI.update({ content: 'Confirmed!', components: [] });
				await interaction.editReply({
					content: 'Confirmed! Sharing stone with channel.',
					files: [],
				})
				const content = await getSSMessage(ss, {
					ephemeral: false,
				})
				console.log('Sending content to channel', content)
				await btnI.channel!.send(content)
			}
			else if (btnI.customId === 'cancel_' + id) {
				forge.removeStone(ss.id)
				removeSoulStoneJSON(ss.id)
				await btnI.update({ content: 'Canceled', components: [] });
				await interaction.editReply({
					content: 'Canceled. Stone removed.',
					files: [],
				})
			}

			client.off(Events.InteractionCreate, onConfirmButton)
		}

		client.on(Events.InteractionCreate, onConfirmButton)
		await replyWithStone(interaction, ss, {
			prepend,
			components: row,
			ephemeral: true,
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
