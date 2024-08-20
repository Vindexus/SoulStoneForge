import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ChatInputCommandInteraction,
	Client,
	Events,
	Interaction,
	SlashCommandBuilder,
} from "discord.js";
import {removeSoulStoneJSON, saveSoulStoneJSON} from "@/soulstones/stone-storage";
import {getSSMessage, replyWithStone, verifyAdminRole} from "../discord-helpers";

export const data = new SlashCommandBuilder()
.setName('create')
.setDescription('Create Soul Stone. Input: [d12] [d100] [d100] [d100]')
.addStringOption(option =>
	option.setName('rolls')
			.setDescription('Results of d12 and d100 rolls. Example: 12 34 11 89')
			.setRequired(true))

export async function execute(interaction: ChatInputCommandInteraction, client: Client) {
	if (!await verifyAdminRole(interaction)) {
		return
	}

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
		saveSoulStoneJSON(ss)

		const id = ss.id
		const confirmButton = new ButtonBuilder()
			.setCustomId('confirm_' + id)
			.setLabel('Share')
			.setStyle(ButtonStyle.Primary)

		const refreshButton = new ButtonBuilder()
		.setCustomId('refresh_' + id)
		.setLabel('Refresh Image')
		.setStyle(ButtonStyle.Secondary)

		const cancelButton = new ButtonBuilder()
			.setCustomId('cancel_' + id)
			.setLabel('Delete')
			.setStyle(ButtonStyle.Danger)

		const prepend = 'Created a Stone from this input: ' + rolls + '\n\n'

		const row = new ActionRowBuilder().addComponents(confirmButton, refreshButton, cancelButton)

		async function onButton (btnI: Interaction) {
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
			else if (btnI.customId === 'refresh_' + id) {
				const updated = await getSSMessage(ss, {
					ephemeral: true,
					components: row,
				})
				await btnI.update({ content: 'Refresh', components: [] });
				await interaction.editReply(updated)
				// Return so we don't turn off the listener
				return
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
			else {
				// Return here so we don't turn off interactions before one of them is chosen
				return
			}

			client.off(Events.InteractionCreate, onButton)
		}

		client.on(Events.InteractionCreate, onButton)
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
