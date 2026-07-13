import ApplicationV2Mixin from "./application-v2-mixin.js";

const { DocumentSheetV2 } = foundry.applications.api;

export default class DocumentSheetDSA41 extends ApplicationV2Mixin(DocumentSheetV2) {
    static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS ?? {}, {
        classes: ["standard-form", "dsa41-sheet"]
    });
}
