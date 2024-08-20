import prompts, {Choice} from 'prompts'
import {logStone, logWelcomeMsg} from "./prints";
import {clrRarity, getRandomInt, rarityCountToOxfordList, rarityListToCounts, slugify} from "@/soulstones/helpers";
import forge from "@/soulstones/forge";
import {saveSoulStoneJSON} from "@/soulstones/stone-storage";
import {magenta, red} from "next/dist/lib/picocolors";
import SoulStone from "@/soulstones/stone.class";
import {exit, getNumbersFromTextInput, promptOpts} from "./helpers";
import {RarityCounts} from "@/soulstones/types";

async function prompNumMods (cliArg: string | undefined) : Promise<number> {
	const modsResponse = await prompts({
		type: 'text',
		name: 'value',
		message: 'How many mods? (1-3, or roll)',
		initial: cliArg,
		validate: value => {
			if (value === 'roll') {
				return true
			}
			const num = parseInt(value)
			if (isNaN(num)) {
				return 'Must be a number'
			}
			if (num < 1 || num > 3) {
				return 'Must be between 1 and 3'
			}
			return true
		},
	}, promptOpts);
	let numMods = modsResponse.value
	if (numMods === 'roll') {
		let roll = 0
		let keepRoll = false
		do {
			roll = getRandomInt(1, 12)
			numMods = forge.getNumModsFromRoll(roll)
			console.log(`Rolled a ${roll} (${numMods} mod${numMods > 1 ? 's' : ''})`)
			const resp = await prompts({
				type: 'confirm',
				name: 'value',
				message: 'Keep roll?',
				initial: true,
			})
			keepRoll = resp.value
		} while(!keepRoll)
		numMods = forge.getNumModsFromRoll(roll)
	}
	const num = parseInt(numMods)
	if (isNaN(num)) {
		exit('numMods is NaN')
	}
	return num
}

async function promptRarityRolls (numMods: number, cliArgs: undefined | string[]) : Promise<RarityCounts> {
	let rarityRolls
	let rarityCounts
	let confirmed = false
	let initial = ''
	if (cliArgs) {
		initial = cliArgs.slice(1).join(' ')
	}
	do {
		rarityRolls = await prompts({
			type: 'text',
			name: 'value',
			initial,
			validate: async (value) => {
				const vals = getNumbersFromTextInput(value)
				if (vals.length !== numMods) {
					return `Must enter exactly ${numMods} roll${numMods > 1 ? 's' : ''}. (You entered ${vals} which is ${vals.length})`
				}
				if (vals.some(x => x < 1 || x > 100)) {
					return 'Rarity rolls are d100'
				}
				// Check for any NaN
				if (vals.some(isNaN)) {
					return 'All values must be numbers'
				}
				return true
			},
			message: `Enter ${numMods} d100 result${numMods === 1 ? '' : 's'}:`,
		}, promptOpts)
		initial = ''
		if (!rarityRolls.value) {
			exit()
		}

		const nums = getNumbersFromTextInput(rarityRolls.value)
		const rarityList = nums.map(forge.getRarityFromRoll)
		rarityCounts = rarityListToCounts(rarityList)
		console.log('This stone will have ' + rarityCountToOxfordList(rarityCounts) + '.')
		confirmed = (await prompts({
			type: 'confirm',
			name: 'value',
			message: 'Confirm?',
			initial: true,
		})).value
	} while (!confirmed)

	return rarityCounts
}

async function promptSoulStoneName (stone: SoulStone) : Promise<string> {
	const choices = [
		'Stony McStoneFace',
		'Big Rock',
		'Palantir',
		'Eye of the Heavens',
		stone.mods.map(mod => mod.title).join(' '),
	].map((name) => {
		return {
			title: name,
			value: name,
		}
	})
	const name = await prompts({
		type: 'autocomplete',
		name: 'value',
		message: 'Name this soul stone:',
		choices: choices,
		suggest: async (input: string, choices) : Promise<(string | Choice)[]> => {
			return [
				input || stone.name,
				...choices.filter(choice => choice.title.toLowerCase().includes(input.toLowerCase()))
			]
		},
	}, promptOpts)
	return name.value
}

;(async function () {
	logWelcomeMsg()
	const args = process.argv.slice(2)
	const numMods = await prompNumMods(args[0])
	const rarityCounts = await promptRarityRolls(numMods, args)
	const stone = forge.newSoulStone(rarityCounts, args.join(' '))
	if (stone.mods.length === 0) {
		exit('Mod list is empty. This is bug. Exiting.')
		return
	}
	logStone(stone)
	const name = await promptSoulStoneName(stone)
	if (!name) {
		exit('No name entered. Exiting.')
	}
	stone.name = name
	stone.updateIdSuffix(stone.name)
	logStone(stone)

	console.log(`Soul stone named "${magenta(name)}" created!`)
	console.log('Saving to a JSON file')
	saveSoulStoneJSON(stone)
})()
