import BaseActorSheetDSA41 from "./base-actor-sheet.js";

export default class CharacterActorSheetDSA41 extends BaseActorSheetDSA41 {
    static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS ?? {}, {
        classes: ["dsa41-sheet", "dsa41-actor-sheet", "dsa41-character-sheet"],
        position: {
            width: 980,
            height: 860
        }
    });

    static PARTS = {
        sheet: {
            template: "systems/dsa_4_system_foundry/templates/actors/character-sheet.hbs"
        }
    };

    static TABS = [
        { id: "details", label: "DSA41.Tab.details" },
        { id: "features", label: "DSA41.Tab.features" },
        { id: "inventory", label: "DSA41.Tab.inventory" },
        { id: "biography", label: "DSA41.Tab.biography" }
    ];

    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        context.speciesItem = this.actor.items.find((item) => item.type === "species") ?? null;
        context.cultureItem = this.actor.items.find((item) => item.type === "culture") ?? null;
        context.professionItem = this.actor.items.find((item) => item.type === "profession") ?? null;
        context.featureLists = {
            advantages: context.itemCategories.advantages,
            disadvantages: context.itemCategories.disadvantages,
            specialAbilities: context.itemCategories.specialAbilities
        };
        context.inventoryLists = {
            weapons: context.itemCategories.weapons,
            skills: context.itemCategories.skills
        };
        return context;
    }
}
