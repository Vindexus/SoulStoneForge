import SoulStone from "@/soulstones/stone.class";
import formatDate from "@/lib/helpers";
import {getStoneScreenshotPath, takeScreenshotAndSaveToDisk} from "@/lib/screenshotter";
import {AttachmentBuilder, ChatInputCommandInteraction} from "discord.js";

type Opts = {
	showCreated?: boolean
}
export function getSoulStoneLines (ss: SoulStone, opts: Opts = {}) {
	const lines : string[] = []

		let title = '**' + ss.name + '**'


	lines.push(title)

	if (opts.showCreated) {
		lines.push(`Created: ${formatDate(ss.createdAt)}`)
	}

	if (ss.player) {
		lines.push(`In **${ss.player}**'s Inventory`)
	}

	ss.mods.forEach((mod, idx) => {
		if (idx >= 1) {
			lines.push('')
		}
		lines.push(`*${mod.title}* (${mod.rarity})`)
		lines.push(`${mod.description}`)
	})
	return lines
}

export async function replyWithStone (interaction: ChatInputCommandInteraction, ss: SoulStone, opts  : {prepend?: string}= {}){
	await interaction.reply('Generating...');
	await takeScreenshotAndSaveToDisk(ss)
	const ssPath = getStoneScreenshotPath(ss)
	const attachment = new AttachmentBuilder(ssPath)
	await interaction.editReply({
		content: (opts.prepend || '') + "ID: `" + ss.id + "`",
		files: [attachment]
	})
}
