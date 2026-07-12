import { fs2e } from "./module/config.js";
import FS2ItemSheet from "./module/sheets/FS2ItemSheet.js";

Hooks.once("init", function () {
    console.log("dsa_4_system_foundry | Initializing system");

    CONFIG.fs2e = fs2e;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("dsa_4_system_foundry", FS2ItemSheet, { makeDefault: true });
});
