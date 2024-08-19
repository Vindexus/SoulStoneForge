import {exit, getStoneFromArgv} from "./helpers";
import {logStone} from "./prints";
import prompts from "prompts";
import {underline} from "next/dist/lib/picocolors";
import {deleteStone} from "@/soulstones/controller";

;(async function () {
	const stone = getStoneFromArgv()
	logStone(stone)
	const confirm = await prompts({
		type: 'confirm',
		name: 'value',
		message: `Delete stone ${underline(stone.name)}?`,
		initial: false,
	})
	if (!confirm.value) {
		exit('Cancelled')
	}

	deleteStone(stone.id)
	console.log('Done.')
})();
