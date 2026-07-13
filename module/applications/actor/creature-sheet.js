import BaseActorSheetDSA41 from "./base-actor-sheet.js";

export default class CreatureActorSheetDSA41 extends BaseActorSheetDSA41 {
    static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS ?? {}, {
        classes: ["dsa41-sheet", "dsa41-actor-sheet", "dsa41-creature-sheet"],
        position: {
            width: 860,
            height: 760
        }
    });

    static PARTS = {
        sheet: {
            template: "systems/dsa_4_system_foundry/templates/actors/creature-sheet.hbs"
        }
    };

    static TABS = [
        { id: "details", label: "DSA41.Tab.details" },
        { id: "inventory", label: "DSA41.Tab.inventory" },
        { id: "biography", label: "DSA41.Tab.biography" }
    ];
}
