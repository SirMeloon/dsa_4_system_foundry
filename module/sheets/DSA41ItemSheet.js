export default class DSA41ItemSheet extends ItemSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["dsa41", "sheet", "item"],
            width: 600,
            height: 520
        });
    }

    get template() {
        const specialized = ["weapon"];
        const sheet = specialized.includes(this.item.type) ? this.item.type : "item";
        return `systems/dsa_4_system_foundry/templates/sheets/${sheet}-sheet.html`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.DSA41;
        data.system = this.item.system;
        return data;
    }
}
