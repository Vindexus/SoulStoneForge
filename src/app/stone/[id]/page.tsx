import formatDate from "@/lib/helpers";
import {Mod} from "@/soulstones/types";
import {getRegisteredSoulStones} from "@/soulstones/stone-storage";

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
	const f = await import('@/soulstones/forge');
	const forge = f.default

	const registered = getRegisteredSoulStones()
	forge.registerStones(registered)

	const stone = forge.getStoneById(id);

	if (!stone) {
		return <div>No stone found for that ID.</div>
	}

	return <div className={'stone descriptive'}>
		<h3>{stone.name}</h3>
		{stone.mods.map((mod: Mod, idx) => {
			const icon = mod.rarity === 'legendary' ? '⭐' : ''
			return <div className={'mod mb-3'} key={idx}>
				<h4 className={'mt-0'}>
					{mod.title}
					<span className={'ms-1 text-sm rarity-' + mod.rarity}>({icon + mod.rarity.toUpperCase() + icon})</span>
				</h4>
				<p>{mod.description}</p>
			</div>
		})}
		<div className={'text-sm footer'}>
			{stone.player && <div className={'text-lg'}>In <strong>{stone.player.characterName}</strong>'s Inventory</div>}
			<div className={'italic'}>ID: <span className={'font-mono'}>{stone.id.split('-')[0]}</span> \\ Created {formatDate(stone.createdAt)}</div>
		</div>

	</div>
}
