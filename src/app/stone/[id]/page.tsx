import formatDate from "@/lib/helpers";
import {Mod} from "@/soulstones/types";
import {getRegisteredSoulStones} from "@/soulstones/stone-storage";
// Convert Markdown to HTML
const convertMarkdown = (markdown: string) => {
	// Escape HTML characters
	let html = markdown
	// Convert double new lines to paragraph <p> tags
	html = html.replace(/\n\n/g, '<br />');

	// Convert **text** to <strong>text</strong>
	html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

	// Convert *text* to <em>text</em>
	html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

	// Convert - at the start of a line to a list item <li>
	html = html.replace(/^\s?- (.*$)/gim, '<li>$1</li>');

	// Wrap list items in <ul> tags
	html = html.replace(/(<li>[\s\S]*?<\/li>)+/g, '<ul>$1</ul>');


	// Wrap the entire content in a <p> tag
	html = `<p>${html}</p>`;

	return html;
};
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
				{mod.description && <div dangerouslySetInnerHTML={{__html: convertMarkdown(mod.description)}}/>}
				{!mod.description && <div><em>Description pending.</em></div>}
			</div>
		})}
		<div className={'text-sm footer'}>
			{stone.player && <div className={'text-lg'}>In <strong>{stone.player.characterName}</strong>'s Inventory</div>}
			<div className={'italic'}>ID: <span className={'font-mono'}>{stone.id.split('-')[0]}</span> \\ Created {formatDate(stone.createdAt)}</div>
		</div>

	</div>
}
