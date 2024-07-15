import forge 	from "@/soulstones/forge"
import {takeScreenshotAndSaveToDisk} from "@/lib/screenshotter";

(async function () {
	const id = process.argv[2]
	const stone = forge.getStoneById(id)
	await takeScreenshotAndSaveToDisk(stone)
})()
