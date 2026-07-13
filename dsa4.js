import { DSA41 } from "./module/config.js";
import * as applications from "./module/applications/_module.js";
import { DSA41_CULTURES } from "./module/data/cultures.js";
import { DSA41_SPECIES } from "./module/data/species.js";
import SpeciesGenerationDialog from "./module/apps/SpeciesGenerationDialog.js";

globalThis.dsa41 = {
    applications,
    config: DSA41
};

Hooks.once("init", async function () {
    console.log("dsa_4_system_foundry | Initializing system");

    globalThis.dsa41 = game.dsa41 = Object.assign(game.system, globalThis.dsa41);
    CONFIG.DSA41 = DSA41;
    CONFIG.Item.typeLabels = {
        ...CONFIG.Item.typeLabels,
        ...DSA41.itemTypeLabels
    };

    Handlebars.registerHelper("eq", (a, b) => a === b);
    await loadTemplates([
        "systems/dsa_4_system_foundry/templates/shared/horizontal-tabs.hbs",
        "systems/dsa_4_system_foundry/templates/actors/parts/actor-header.hbs",
        "systems/dsa_4_system_foundry/templates/actors/parts/actor-sidebar.hbs",
        "systems/dsa_4_system_foundry/templates/actors/tabs/character-details.hbs",
        "systems/dsa_4_system_foundry/templates/actors/tabs/character-features.hbs",
        "systems/dsa_4_system_foundry/templates/actors/tabs/character-inventory.hbs",
        "systems/dsa_4_system_foundry/templates/actors/tabs/actor-biography.hbs",
        "systems/dsa_4_system_foundry/templates/actors/tabs/creature-details.hbs",
        "systems/dsa_4_system_foundry/templates/items/header.hbs",
        "systems/dsa_4_system_foundry/templates/items/parts/item-summary.hbs",
        "systems/dsa_4_system_foundry/templates/items/tabs/description.hbs",
        "systems/dsa_4_system_foundry/templates/items/tabs/details.hbs",
        "systems/dsa_4_system_foundry/templates/items/tabs/notes.hbs"
    ]);

    const DocumentSheetConfig = foundry.applications.apps.DocumentSheetConfig;

    DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.appv1.sheets.ActorSheet);
    DocumentSheetConfig.unregisterSheet(Item, "core", foundry.appv1.sheets.ItemSheet);

    DocumentSheetConfig.registerSheet(Actor, "dsa_4_system_foundry", applications.actor.CharacterActorSheetDSA41, {
        types: ["character"],
        makeDefault: true
    });

    DocumentSheetConfig.registerSheet(Actor, "dsa_4_system_foundry", applications.actor.CreatureActorSheetDSA41, {
        types: ["creature"],
        makeDefault: true
    });

    DocumentSheetConfig.registerSheet(Item, "dsa_4_system_foundry", applications.item.ItemSheetDSA41, {
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
