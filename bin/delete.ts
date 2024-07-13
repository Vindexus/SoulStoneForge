import {exit, getStoneFromArgv} from "./helpers";
import forge from "@/soulstones/forge";
import {logStone} from "./prints";
import {removeSoulStoneJSON} from "@/soulstones/stone-storage";
import prompts from "prompts";
import {underline} from "next/dist/lib/picocolors";

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

	forge.removeStone(stone.id)
	removeSoulStoneJSON(stone.id)
	console.log('Done.')
})();
