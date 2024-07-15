// Import the saved soulstones from the folder that saves them as JSON files
import fs from 'fs'
import path from 'path'
import SoulStone from "@/soulstones/stone.class";
import {StoneStored} from "@/soulstones/types";
import {fileURLToPath} from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const stonesDir = path.join(__dirname, '../../stones')

export function getRegisteredSoulStones (): StoneStored[] {
	const files = fs.readdirSync(stonesDir).filter(file => file.endsWith('.json'))
	return files.map(file => {
		const json = fs.readFileSync(path.join(stonesDir, file), 'utf-8')
		return jsonToStoneStored(json)
	})
}


export function removeSoulStoneJSON (id: string) {
	const stoneFile = path.join(stonesDir, id + '.json')
	fs.unlinkSync(stoneFile)
	console.log(`Removed ${stoneFile}`)
}

export function saveSoulStoneJSON (stone: SoulStone) {
	const json = stoneToJSON(stone)
	const stoneFile = path.join(stonesDir, stone.id + '.json')
	fs.writeFileSync(stoneFile, json)
	console.log(`Saving to ${stoneFile}`)
}

export function jsonToStoneStored (json: string) : StoneStored {
	const args = JSON.parse(json) as StoneStored
	return args
}

export function stoneToJSON (stone: SoulStone) : string {
	const {mods, ...toSave} = stone
	const stored : StoneStored = {
		...toSave,
		createdAt: new Date().toISOString(),
		modIds: stone.mods.map(mod => mod.id),
	}
	return JSON.stringify(stored, null, 2)
}
