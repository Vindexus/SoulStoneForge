import SoulStone from "@/soulstones/stone.class";
import formatDate from "@/lib/helpers";
import {getStoneScreenshotPath, takeScreenshotAndSaveToDisk} from "@/lib/screenshotter";
import {AttachmentBuilder, ChatInputCommandInteraction} from "discord.js";
import fs from "fs";

type Opts = {
	showCreated?: boolean
	hideMods?: boolean
}
export function getSoulStoneLines (ss: SoulStone, opts: Opts = {}) {
	const lines : string[] = []

		let title = '**' + ss.name + '**'


	lines.push(title)

	if (opts.showCreated) {
		lines.push(`Created: ${formatDate(ss.createdAt)}`)
	}

	if (ss.player) {
		lines.push(`In **${ss.player.characterName}**'s Inventory`)
	}

	if (!opts.hideMods) {
		ss.mods.forEach((mod, idx) => {
			if (idx >= 1) {
				lines.push('')
			}
			lines.push(`*${mod.title}* (${mod.rarity})`)
			lines.push(`${mod.description}`)
		})
	}
	return lines
}

type ReplyOpts = {
	prepend?: string
	components?: any,
	ephemeral: boolean
}
export async function replyWithStone (interaction: ChatInputCommandInteraction, ss: SoulStone, opts  : ReplyOpts){
	await interaction.reply({
		content: 'Working...',
		ephemeral: opts.ephemeral,
	});
	const updated = await getSSMessage(ss, opts)
	await interaction.editReply(updated)
}

export async function getSSMessage (ss: SoulStone, opts: ReplyOpts) {
	const attachment = await getSSAttachment(ss)
	const content = {
		content: (opts.prepend || '') + "ID: `" + ss.id + "`",
		files: [attachment],
		components: opts.components ? [opts.components] : [],
	}
	return content
}

export async function getSSAttachment (ss: SoulStone) {
	const ssPath = getStoneScreenshotPath(ss)

	// If the file doesn't exist, then we create it
	if (!fs.existsSync(ssPath)) {
		console.log('No SS! Create it pleease')
		await takeScreenshotAndSaveToDisk(ss)
	}
	else {
		const stats = fs.statSync(ssPath)
		const now = new Date()
		const ageS = (now.getTime() - stats.mtime.getTime()) / 1000
		console.log('SS found, its age is ', ageS, 'seconds')

		// If the file is older than some seconds we recreate it
		if (ageS > 30) {
			console.log('Too old, recreate it please')
			await takeScreenshotAndSaveToDisk(ss)
		}
	}

	console.log('ssPath', ssPath)
	const attachment = new AttachmentBuilder(ssPath)
	return attachment
}
