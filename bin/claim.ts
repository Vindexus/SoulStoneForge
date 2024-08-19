import {getStoneFromArgv, promptPlayerId} from "./helpers";
import {logStone} from "./prints";
import {setStonePlayer} from "@/soulstones/controller";

;(async function () {
	const stone = getStoneFromArgv()
	const beforeName = stone.playerId
	logStone(stone)
	const player = await promptPlayerId()
	setStonePlayer(stone, player)
	console.log(`Changed the player from ${beforeName ?? 'no one'} to: ${player ?? 'none'}`)
})();
