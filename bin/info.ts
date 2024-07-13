import {logModCount, logStonesCount, logUsedMods, logWelcomeMsg} from "./prints";

;(async function () {
	logWelcomeMsg()
	logModCount()
	logUsedMods()
	logStonesCount()
})()
