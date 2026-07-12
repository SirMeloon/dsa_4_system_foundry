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
        types: ["weapon", "skill", "specialAbility", "species", "culture"],
        makeDefault: true
    });
});

Hooks.on("preCreateItem", (item) => {
    if (!(item.parent instanceof Actor)) return;
    if (!["species", "culture"].includes(item.type)) return;
    if (item.parent.type !== "character") return;
    const existingEntry = item.parent.items.some((actorItem) => actorItem.type === item.type);
    if (!existingEntry) return;
    const messageKey = item.type === "species" ? "DSA41.Dialog.currentSpeciesExists" : "DSA41.Dialog.currentCultureExists";
    ui.notifications?.warn(game.i18n.localize(messageKey));
    return false;
});

Hooks.on("createItem", async (item, _options, userId) => {
    if (game.userId !== userId) return;
    if (!(item.parent instanceof Actor)) return;
    if (item.parent.type !== "character") return;

    if (item.type === "species") {
        new SpeciesGenerationDialog(item.parent, item).render(true);
        return;
    }

    if (item.type === "culture") {
        await item.parent.update({ "system.culture": item.name });
    }
});
