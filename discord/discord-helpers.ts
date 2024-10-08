import SoulStone from "@/soulstones/stone.class";
import formatDate from "@/lib/helpers";
import {getStoneScreenshotPath, takeScreenshotAndSaveToDisk} from "@/lib/screenshotter";
import {AttachmentBuilder, ChatInputCommandInteraction, SlashCommandStringOption} from "discord.js";
import fs from "fs";
import {SoulStoneForge} from "@/soulstones/forge.class";

// Certain commands require the user to have this role
const ADMIN_ROLE = 'Stoneforger'

export function addCommandOptionSearchStone (option: SlashCommandStringOption) {
	return option.setName('stone')
		.setDescription('ID or search for stone')
		.setRequired(true)
}

export async function getInteractionStone (interaction: ChatInputCommandInteraction, forge: SoulStoneForge) : Promise<SoulStone> {
	const stoneSearch = interaction.options.getString('stone', true);
	const ss = forge.getStoneBySearch(stoneSearch)
	return ss
}

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

export async function verifyAdminRole (interaction: ChatInputCommandInteraction) : Promise<boolean> {
	const member = interaction.member
	if (!member) {
		throw new Error('No member')
	}
	console.log('roles', interaction.member!.roles)
	console.log('roles cache', interaction.member!.roles.cache)
	// @ts-ignore Whatever types I have installed don't think .cache is a thing
	const isForger = interaction.member!.roles.cache.some(role => role.name === ADMIN_ROLE)

	if (!isForger) {
		await interaction.reply(`You must have the ${ADMIN_ROLE} role to do this`)
		return false
	}

	return true
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
		if (ageS > 3) {
			console.log('Too old, recreate it please')
			await takeScreenshotAndSaveToDisk(ss)
		}
	}

	console.log('ssPath', ssPath)
	const attachment = new AttachmentBuilder(ssPath)
	return attachment
}
