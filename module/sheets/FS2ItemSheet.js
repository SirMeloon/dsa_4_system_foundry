export default class FS2ItemSheet extends ItemSheet {
    get template() {
        return `systems/dsa_4_system_foundry/templates/sheets/${this.item.data.type}-sheet.html`;
    }
}