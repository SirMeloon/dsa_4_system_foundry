import { DSA41 } from "./module/config.js";
import DSA41ActorSheet from "./module/sheets/DSA41ActorSheet.js";
import DSA41ItemSheet from "./module/sheets/DSA41ItemSheet.js";

Hooks.once("init", function () {
    console.log("dsa_4_system_foundry | Initializing system");

    CONFIG.DSA41 = DSA41;

    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);

    Actors.registerSheet("dsa_4_system_foundry", DSA41ActorSheet, {
        types: ["character", "creature"],
        makeDefault: true
    });

    Items.registerSheet("dsa_4_system_foundry", DSA41ItemSheet, {
        types: ["weapon", "skill", "specialAbility"],
        makeDefault: true
    });
});
