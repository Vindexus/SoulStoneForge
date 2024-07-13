import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {RARITIES} from "@/soulstones/types";
import {cyan, gray, red} from "next/dist/lib/picocolors";

export const data = new SlashCommandBuilder()
	.setName('info')
	.setDescription('General forge info');

export async function execute(interaction: ChatInputCommandInteraction) {
	const imp = await import('@/soulstones/forge');
	const forge = imp.default
	const usedCount = forge.usedModCounts
	let lines : string[] = []
	for (const rarity of RARITIES) {
		const num = forge.modTotals[rarity] || 0
		const remaining = num - (usedCount[rarity] || 0)
		lines.push(`There ${remaining === 1 ? 'is' : 'are'} ${remaining}  ${rarity} mod${num === 1 ? '' : 's'} remaining of ${num} total`)
	}
	const num = forge.stones.length
	lines.push(`The party has ${num} Soul Stone${num === 1 ? '' : 's'}.`)
	await interaction.reply(lines.join('\n'))
};

export default {
	data,
	execute,
}
