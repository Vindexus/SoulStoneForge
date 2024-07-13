import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {getRandomInt, rarityListToCounts} from "@/soulstones/helpers";
import {Rarity} from "@/soulstones/types";

export const data = new SlashCommandBuilder()
.setName('preview')
.setDescription('Preview a totally random soul stone');

export async function execute(interaction: ChatInputCommandInteraction) {
	const imp = await import('@/soulstones/forge');
	const forge = imp.default
	const d12 = getRandomInt(1, 12)
	const numMods = forge.getNumModsFromRoll(d12)
	const rarities: Rarity[] = []
	for (let i = 0; i < numMods; i++) {
		const rarity = forge.getRarityFromRoll(getRandomInt(1, 100))
		rarities.push(rarity)
	}
	const count = rarityListToCounts(rarities)
	const soulStone = forge.newSoulStone(count)
	const lines : string[] = ['**' + soulStone.name + '**']
	soulStone.mods.forEach((mod, idx) => {
		if (idx >= 1) {
			lines.push('---')
		}
		lines.push(`**${mod.title}** (${mod.rarity})`)
		lines.push(`${mod.description}`)
	})
	await interaction.reply(lines.join('\n'))
};

export default {
	data,
	execute,
}
