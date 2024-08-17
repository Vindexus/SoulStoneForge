import {getStoneFromArgv, promptPlayerId} from "./helpers";
import {logStone} from "./prints";
import {saveSoulStoneJSON} from "@/soulstones/stone-storage";
import prompts from "prompts";


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
	stone.name = response.value
	saveSoulStoneJSON(stone)
	console.log(`Changed the name to: ${stone.name}`)
})();
