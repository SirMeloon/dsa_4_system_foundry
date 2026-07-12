import FS2ItemSheet from "./module/sheets/FS2ItemSheet";

Hooks.once("init", function () {
    console.log("fs2e | Initializing FS2E System");

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("fs2e", FS2ItemSheet, { makeDefault: true });
})