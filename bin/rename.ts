import {getStoneFromArgv} from "./helpers";
import {logStone} from "./prints";
import prompts from "prompts";
import {renameStone} from "@/soulstones/controller";


;(async function () {
	const stone = getStoneFromArgv()
	logStone(stone)
	const response = await prompts({
		type: 'text',
		name: 'value',
		message: 'Enter a new name',
	})
	if (!response || !response.value) {
		console.log('Cancelled')
		return
	}
	renameStone(stone, response.value)
	console.log(`Changed the name to: ${stone.name}`)
})();
