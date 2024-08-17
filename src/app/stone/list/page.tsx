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

	return <div className={'stone descriptive'}>
		<h1>Num Soul Stones: {registered.length}</h1>
		<ol>
			{registered.length === 0 && <li>NONE</li>}
			{registered.map((stone, idx)=> {
				return <li key={idx}>
					<a style={{textDecoration: 'underline'}} href={`/stone/${stone.id}`}>{stone.name}</a>
				</li>
			})}
		</ol>
	</div>
}
