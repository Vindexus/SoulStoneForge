import {red} from "next/dist/lib/picocolors";
import forge from "@/soulstones/forge";
import {logStone} from "./prints";
import SoulStone from "@/soulstones/stone.class";
import prompts from "prompts";
import {PLAYERS} from "@/soulstones/players";

export function exit (err?: string) {
	if (err) {
		console.log(red(err))
	}
	process.exit(1)
}

export function getNumbersFromTextInput (text: string) : number[] {
	if (!text) {
		return []
	}
	return text.split(/[^0-9]+/g).map(x => parseInt(x.trim()))
}

export const promptOpts = {
	onCancel: () => {
		exit('Canceled')
	}
}

export async function promptPlayerName () : Promise<string | undefined> {
	const response = await prompts({
		type: 'select',
		name: 'value',
		message: 'Choose a player',
		choices: [
			{
				value: null,
				title: '[none]'
			},
			...PLAYERS.map(name => ({
				title: name,
				value: name,
			}))
		]
	})
	return response.value

}

export function getStoneFromArgv () : SoulStone {
	const search = process.argv.slice(2).join(' ').trim()
	if (!search) {
		exit('No search input provided')
	}
	const stones = forge.getStonesBySearch(search);
	if (stones.length === 0) {
		exit('Found no stones')
	}
	else if (stones.length > 1) {
		stones.forEach(logStone)
		exit(`Found ${stones.length} stones. Please provide a more specific search`)
	}

	return stones[0]!
}
