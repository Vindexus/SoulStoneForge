import puppeteer from 'puppeteer'
import SoulStone from "@/soulstones/stone.class";
import path from "path";
import 'dotenv/config'

const PORT = process.env.PORT

console.log('PORT', PORT)

export async function takeScreenshotAndSaveToDisk (stone: SoulStone) {
	const browser = await puppeteer.launch({

	});
	const page = await browser.newPage();
	const url = `http://localhost:${PORT}/stone/${stone.id}`
	console.log('going to', url)
	await page.goto(url);
	const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
	await page.setViewport({
		width: 600,
		height: bodyHeight
	});

	const screenshotPath = getStoneScreenshotPath(stone)
	await page.screenshot({
		path: screenshotPath,
	});
	console.log('saved to', screenshotPath)
	await browser.close();
}

export function getStoneScreenshotPath(stone: SoulStone) {
	const id = stone.id.split('-')[0]
	const screenshotPath = path.join(path.resolve(__dirname, '..', '..', 'public', 'stones'), id + '.png')
	return screenshotPath
}
