import {logStone, logStonesCount, logWelcomeMsg} from "./prints";
import forge from "@/soulstones/forge";

;(async function () {
	logWelcomeMsg();
	const stones = forge.stones;
	let sorted = stones.sort((a, b) => {
		return (a.createdAt < b.createdAt ? -1 : 1);
	});

	const search = process.argv.slice(2).join(' ').trim().toLowerCase();
	if (search) {
		const filtered = sorted.filter(stone => stone.id.includes(search) || stone.name.toLowerCase().includes(search));
		if (filtered.length === 0) {
			console.log(`No stones found for search: ${search}`);
			return;
		}
		sorted = filtered;
	}

	console.log('search', search)
	sorted.forEach((stone) => {
		logStone(stone);
	})
	if (search) {
		console.log(`Found ${sorted.length} stone${sorted.length > 1 ? 's' : ''} from your search of "${search}"`)
	}
	else {
		logStonesCount();
	}
})()
