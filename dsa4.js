import { DSA41 } from "./module/config.js";
import SpeciesGenerationDialog from "./module/apps/SpeciesGenerationDialog.js";
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
        types: ["weapon", "skill", "specialAbility", "species"],
        makeDefault: true
    });
});

Hooks.on("preCreateItem", (item) => {
    if (!(item.parent instanceof Actor)) return;
    if (item.type !== "species") return;
    if (item.parent.type !== "character") return;
    const existingSpecies = item.parent.items.some((actorItem) => actorItem.type === "species");
    if (!existingSpecies) return;
    ui.notifications?.warn(game.i18n.localize("DSA41.Dialog.currentSpeciesExists"));
    return false;
});

Hooks.on("createItem", async (item, _options, userId) => {
    if (game.userId !== userId) return;
    if (!(item.parent instanceof Actor)) return;
    if (item.type !== "species") return;
    if (item.parent.type !== "character") return;

    new SpeciesGenerationDialog(item.parent, item).render(true);
});
