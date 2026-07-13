import ApplicationV2Mixin from "../api/application-v2-mixin.js";

const { ActorSheetV2 } = foundry.applications.sheets;

export default class BaseActorSheetDSA41 extends ApplicationV2Mixin(ActorSheetV2) {
    static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS ?? {}, {
        classes: ["dsa41-sheet", "dsa41-actor-sheet"],
        position: {
            width: 900,
            height: 820
        }
    });

    get actor() {
        return this.document;
    }

    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        const actor = this.actor;
        context.actor = actor;
        context.system = actor.system;
        context.cssClass = this.options.classes.join(" ");
        context.description = actor.system.description ?? "";
        context.notes = actor.system.notes ?? "";
        context.itemCategories = this._prepareItemCategories();
        context.inventoryLists = {
            weapons: context.itemCategories.weapons,
            skills: context.itemCategories.skills
        };
        return context;
    }

    _prepareItemCategories() {
        return {
            weapons: this.actor.items.filter((item) => item.type === "weapon"),
            skills: this.actor.items.filter((item) => item.type === "skill"),
            specialAbilities: this.actor.items.filter((item) => item.type === "specialAbility"),
            advantages: this.actor.items.filter((item) => item.type === "advantage"),
            disadvantages: this.actor.items.filter((item) => item.type === "disadvantage")
        };
    }

    _onRender(context, options) {
        super._onRender(context, options);
        this.element.querySelectorAll("[data-item-id]").forEach((row) => {
            row.addEventListener("click", async (event) => {
                const itemId = event.currentTarget.dataset.itemId;
                const item = this.actor.items.get(itemId);
                if (!item) return;
                await item.sheet.render(true);
            });
        });
    }
}
