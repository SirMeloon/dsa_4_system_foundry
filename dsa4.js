import { DSA41 } from "./module/config.js";
import { DSA41_CULTURES } from "./module/data/cultures.js";
import { DSA41_SPECIES } from "./module/data/species.js";
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
        types: ["weapon", "skill", "specialAbility", "species", "culture", "profession", "advantage", "disadvantage"],
        makeDefault: true
    });
});

Hooks.on("preCreateItem", (item) => {
    if (!(item.parent instanceof Actor)) return;
    if (!["species", "culture", "profession"].includes(item.type)) return;
    if (item.parent.type !== "character") return;
    const existingEntry = item.parent.items.some((actorItem) => actorItem.type === item.type);
    if (!existingEntry) return;
    const messageKey = {
        species: "DSA41.Dialog.currentSpeciesExists",
        culture: "DSA41.Dialog.currentCultureExists",
        profession: "DSA41.Dialog.currentProfessionExists"
    }[item.type];
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
        return;
    }

    if (item.type === "profession") {
        await item.parent.update({ "system.profession": item.name });
    }
});

Hooks.once("ready", async () => {
    if (!game.user?.isGM) return;
    await seedSpeciesCompendium();
    await seedCulturesCompendium();
});

async function seedSpeciesCompendium() {
    await seedItemCompendium("species", DSA41_SPECIES);
}

async function seedCulturesCompendium() {
    await seedItemCompendium("cultures", DSA41_CULTURES);
}

async function seedItemCompendium(packName, entries) {
    const pack = game.packs.get(`dsa_4_system_foundry.${packName}`);
    if (!pack) return;

    const index = await pack.getIndex();
    const existingNames = new Set(index.map((entry) => entry.name));
    const missingEntries = entries.filter((entry) => !existingNames.has(entry.name));
    if (!missingEntries.length) return;

    const wasLocked = pack.locked;

    try {
        if (wasLocked) {
            await pack.configure({ locked: false });
        }

        await Item.createDocuments(missingEntries, { pack: pack.collection });
        console.log(`dsa_4_system_foundry | Seeded ${missingEntries.length} entries into ${packName}`);
    } finally {
        if (wasLocked) {
            await pack.configure({ locked: true });
        }
    }
}
