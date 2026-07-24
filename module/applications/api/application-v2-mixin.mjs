const { HandlebarsApplicationMixin } = foundry.applications.api;


/**
  * Ergänzt eine ApplicationV2-Klasse um gemeinsame DSA-Funktionen.
  *
  * @param {typeof foundry.applications.api.ApplicationV2} Base
  *   Die zu erweiternde ApplicationV2-Klasse.
  * @param {object} [options]
  *   Einstellungen für das Mixin.
  * @param {boolean} [options.handlebars=true]
  *   Soll die Application Handlebars-Templates unterstützen?
  *
  * @returns {typeof foundry.applications.api.ApplicationV2}
  *   Die erweiterte Application-Klasse.
  */
export default function ApplicationV2Mixin(Base, { handlebars = true } = {}) {
    const MixedBase = handlebars ? HandlebarsApplicationMixin(Base) : Base;

    return class DSAApplicationV2 extends MixedBase {
        static DEFAULT_OPTIONS = {
            classes: ['dsa']
        };
    };
}