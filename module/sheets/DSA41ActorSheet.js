export default class DSA41ActorSheet extends ActorSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["dsa41", "sheet", "actor"],
            width: 720,
            height: 680
        });
    }

    get template() {
        const specialized = ["character"];
        const sheet = specialized.includes(this.actor.type) ? this.actor.type : "actor";
        return `systems/dsa_4_system_foundry/templates/sheets/${sheet}-sheet.html`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.DSA41;
        data.system = this.actor.system;
        return data;
    }
}
