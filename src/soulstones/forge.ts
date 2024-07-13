import {SoulStoneForge} from "@/soulstones/forge.class";
import mods from '@/soulstones/mods/mods'
import {getRegisteredSoulStones} from "@/soulstones/stone-storage";
const forge = new SoulStoneForge()
forge.addMods(mods)

const registered = getRegisteredSoulStones()
forge.registerStones(registered)

export default forge
