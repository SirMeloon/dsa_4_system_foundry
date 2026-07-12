import FS2ItemSheet from "./module/sheets/FS2ItemSheet.js";

Hooks.once("init", function () {
    console.log("dsa_4_system_foundry | Initializing system");

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("dsa_4_system_foundry", FS2ItemSheet, { makeDefault: true });
});
