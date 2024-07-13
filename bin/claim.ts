import {getStoneFromArgv, promptPlayerName} from "./helpers";
import {logStone} from "./prints";
import {saveSoulStoneJSON} from "@/soulstones/stone-storage";

;(async function () {
	const stone = getStoneFromArgv()
	logStone(stone)
	const player = await promptPlayerName()
	stone.setPlayer(player)
	saveSoulStoneJSON(stone)
})();
