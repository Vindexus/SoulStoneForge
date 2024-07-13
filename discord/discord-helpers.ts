import SoulStone from "@/soulstones/stone.class";

type Opts = {
	showCreated?: boolean
}
export function getSoulStoneLines (ss: SoulStone, opts: Opts = {}) {
	const lines : string[] = []

		let title = '**' + ss.name + '**'


	lines.push(title)

	if (opts.showCreated) {
		lines.push(`Created: ${new Date(ss.createdAt).toLocaleTimeString('en-CA', {
			timeZone: 'America/Vancouver', 
			hour12: false, 
			hour: '2-digit',
			minute: '2-digit',
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})}`)
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
