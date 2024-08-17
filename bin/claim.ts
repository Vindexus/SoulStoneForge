import {getStoneFromArgv, promptPlayerId} from "./helpers";
import {logStone} from "./prints";
import {saveSoulStoneJSON} from "@/soulstones/stone-storage";

;(async function () {
	const stone = getStoneFromArgv()
	const beforeName = stone.playerId
	logStone(stone)
	const player = await promptPlayerId()
	stone.setPlayer(player)
	saveSoulStoneJSON(stone)
	console.log(`Changed the player from ${beforeName ?? 'no one'} to: ${player ?? 'none'}`)
})();
