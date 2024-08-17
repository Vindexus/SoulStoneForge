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

	const mods = forge.mods

	return <div className={'stone descriptive'}>
		<h1>Num Mods: {mods.length}</h1>
		<table>
			<tbody>
				{mods.map((mod, idx)=> {
					return <tr key={idx}>
						<td>{mod.title}</td>
						<td>{mod.rarity}</td>
						<td style={{whiteSpace: 'pre-wrap'}}>{mod.description}</td>
					</tr>
				})}
			</tbody>
		</table>
	</div>
}
