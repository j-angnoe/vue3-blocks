import { VueBlocks } from "./VueBlocks"
import * as Vue from "vue";
import * as VueRouter from "vue-router";

window.VueBlocksBundle = { VueBlocks, Vue, VueRouter } 

window.VueBlocks = VueBlocks;
window.Vue ??= Vue;
window.VueRouter ??= VueRouter;

if (document.currentScript) { 
    // UMD mode 
    setTimeout(() => { VueBlocks.automount() }, 0);
} else { 
    // ESM mode 
}

export { 
    VueBlocks,
    Vue,
    VueRouter,
}
