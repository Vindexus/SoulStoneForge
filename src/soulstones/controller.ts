import forge from "@/soulstones/forge";
import {removeSoulStoneJSON, saveSoulStoneJSON} from "@/soulstones/stone-storage";
import SoulStone from "@/soulstones/stone.class";
import {PlayerId} from "@/soulstones/players";

export function deleteStone (stoneId: string) {
	forge.removeStone(stoneId)
	removeSoulStoneJSON(stoneId)
}

export function setStonePlayer (stone: SoulStone, player: PlayerId | undefined) {
	stone.setPlayer(player)
	saveSoulStoneJSON(stone)
}

export function renameStone (stone: SoulStone, newName: string) {
	stone.setName(newName)
	saveSoulStoneJSON(stone)
}
