export default class DSA41ItemSheet extends ItemSheet {
    #mode = "view";

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["dsa41", "sheet", "item"],
            width: 700,
            height: 650
        });
    }

    get isComplexSheet() {
        return ["species", "culture", "profession"].includes(this.item.type);
    }

    get template() {
        const specialized = ["weapon", "species", "culture", "profession"];
        const sheet = specialized.includes(this.item.type) ? this.item.type : "item";
        return `systems/dsa_4_system_foundry/templates/sheets/${sheet}-sheet.html`;
    }

    render(force, options) {
        if (!this.rendered) {
            this.#mode = "view";
        }
        return super.render(force, options);
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.DSA41;
        data.system = this.item.system;
        data.isComplexSheet = this.isComplexSheet;
        data.isEditMode = this.#mode === "edit";
        data.canToggleEditMode = this.isComplexSheet && this.isEditable;
        if (this.item.type === "species") {
            const grantedTalents = this.#normalizeTalentEntries(this.item.system.grantedTalents);
            data.species = {
                hairColorsText: this.#formatRangeEntries(this.item.system.hairColors),
                eyeColorsText: this.#formatRangeEntries(this.item.system.eyeColors),
                automaticAdvantagesText: this.#formatList(this.item.system.automaticAdvantages),
                automaticDisadvantagesText: this.#formatList(this.item.system.automaticDisadvantages),
                recommendedAdvantagesText: this.#formatList(this.item.system.recommendedAdvantages),
                recommendedDisadvantagesText: this.#formatList(this.item.system.recommendedDisadvantages),
                unsuitableAdvantagesText: this.#formatList(this.item.system.unsuitableAdvantages),
                unsuitableDisadvantagesText: this.#formatList(this.item.system.unsuitableDisadvantages),
                allowedCulturesText: this.#formatList(this.item.system.allowedCultures),
                grantedTalentsText: this.#formatTalentList(grantedTalents),
                grantedTalents,
                characteristicModifiers: this.#formatCharacteristicModifiers(this.item.system.modifiers?.characteristics),
                scalarModifiers: this.#formatScalarModifiers([
                    [game.i18n.localize("DSA41.Species.lifePointsModifier"), this.item.system.modifiers?.lifePoints],
                    [game.i18n.localize("DSA41.Species.enduranceModifier"), this.item.system.modifiers?.endurance],
                    [game.i18n.localize("DSA41.Species.magicResistanceModifier"), this.item.system.modifiers?.magicResistance]
                ])
            };
        }
        if (this.item.type === "culture") {
            const talents = this.#normalizeTalentMap(this.item.system.talents);
            data.culture = {
                modificationsText: this.#formatList(this.item.system.modifications),
                automaticAdvantagesText: this.#formatList(this.item.system.automaticAdvantages),
                automaticDisadvantagesText: this.#formatList(this.item.system.automaticDisadvantages),
                recommendedAdvantagesText: this.#formatList(this.item.system.recommendedAdvantages),
                recommendedDisadvantagesText: this.#formatList(this.item.system.recommendedDisadvantages),
                unsuitableAdvantagesText: this.#formatList(this.item.system.unsuitableAdvantages),
                unsuitableDisadvantagesText: this.#formatList(this.item.system.unsuitableDisadvantages),
                allowedProfessionsText: this.#formatList(this.item.system.allowedProfessions),
                combatTalentsText: this.#formatTalentList(talents.combat),
                bodyTalentsText: this.#formatTalentList(talents.body),
                socialTalentsText: this.#formatTalentList(talents.social),
                natureTalentsText: this.#formatTalentList(talents.nature),
                knowledgeTalentsText: this.#formatTalentList(talents.knowledge),
                scriptsLanguagesTalentsText: this.#formatTalentList(talents.scriptsLanguages),
                craftTalentsText: this.#formatTalentList(talents.craft),
                specialAbilitiesText: this.#formatList(this.item.system.specialAbilities),
                combatTalents: talents.combat,
                bodyTalents: talents.body,
                socialTalents: talents.social,
                natureTalents: talents.nature,
                knowledgeTalents: talents.knowledge,
                scriptsLanguagesTalents: talents.scriptsLanguages,
                craftTalents: talents.craft
            };
        }
        if (this.item.type === "profession") {
            const talents = this.#normalizeTalentMap(this.item.system.talents);
            data.profession = {
                requirementsText: this.#formatList(this.item.system.requirements),
                modificationsText: this.#formatList(this.item.system.modifications),
                automaticAdvantagesText: this.#formatList(this.item.system.automaticAdvantages),
                automaticDisadvantagesText: this.#formatList(this.item.system.automaticDisadvantages),
                recommendedAdvantagesText: this.#formatList(this.item.system.recommendedAdvantages),
                recommendedDisadvantagesText: this.#formatList(this.item.system.recommendedDisadvantages),
                unsuitableAdvantagesText: this.#formatList(this.item.system.unsuitableAdvantages),
                unsuitableDisadvantagesText: this.#formatList(this.item.system.unsuitableDisadvantages),
                equipmentText: this.#formatList(this.item.system.equipment),
                specialPossessionsText: this.#formatList(this.item.system.specialPossessions),
                discountedSpecialAbilitiesText: this.#formatList(this.item.system.discountedSpecialAbilities),
                combatTalentsText: this.#formatTalentList(talents.combat),
                bodyTalentsText: this.#formatTalentList(talents.body),
                socialTalentsText: this.#formatTalentList(talents.social),
                natureTalentsText: this.#formatTalentList(talents.nature),
                knowledgeTalentsText: this.#formatTalentList(talents.knowledge),
                scriptsLanguagesTalentsText: this.#formatTalentList(talents.scriptsLanguages),
                craftTalentsText: this.#formatTalentList(talents.craft),
                combatTalents: talents.combat,
                bodyTalents: talents.body,
                socialTalents: talents.social,
                natureTalents: talents.nature,
                knowledgeTalents: talents.knowledge,
                scriptsLanguagesTalents: talents.scriptsLanguages,
                craftTalents: talents.craft
            };
        }
        return data;
    }

    _getSubmitData(updateData = {}) {
        const data = super._getSubmitData(updateData);
        if (!["species", "culture", "profession"].includes(this.item.type)) return data;

        if (this.item.type === "species") {
            const rangeFields = [
                ["species.hairColorsText", "system.hairColors"],
                ["species.eyeColorsText", "system.eyeColors"]
            ];

            for (const [source, target] of rangeFields) {
                data[target] = this.#parseRangeEntries(foundry.utils.getProperty(data, source));
                delete data[source];
            }

            const listFields = [
                ["species.automaticAdvantagesText", "system.automaticAdvantages"],
                ["species.automaticDisadvantagesText", "system.automaticDisadvantages"],
                ["species.recommendedAdvantagesText", "system.recommendedAdvantages"],
                ["species.recommendedDisadvantagesText", "system.recommendedDisadvantages"],
                ["species.unsuitableAdvantagesText", "system.unsuitableAdvantages"],
                ["species.unsuitableDisadvantagesText", "system.unsuitableDisadvantages"],
                ["species.allowedCulturesText", "system.allowedCultures"]
            ];

            for (const [source, target] of listFields) {
                data[target] = this.#parseList(foundry.utils.getProperty(data, source));
                delete data[source];
            }

            data["system.grantedTalents"] = this.#parseTalentList(foundry.utils.getProperty(data, "species.grantedTalentsText"));
            delete data["species.grantedTalentsText"];
        }

        if (this.item.type === "culture") {
            const listFields = [
                ["culture.modificationsText", "system.modifications"],
                ["culture.automaticAdvantagesText", "system.automaticAdvantages"],
                ["culture.automaticDisadvantagesText", "system.automaticDisadvantages"],
                ["culture.recommendedAdvantagesText", "system.recommendedAdvantages"],
                ["culture.recommendedDisadvantagesText", "system.recommendedDisadvantages"],
                ["culture.unsuitableAdvantagesText", "system.unsuitableAdvantages"],
                ["culture.unsuitableDisadvantagesText", "system.unsuitableDisadvantages"],
                ["culture.allowedProfessionsText", "system.allowedProfessions"],
                ["culture.specialAbilitiesText", "system.specialAbilities"]
            ];

            for (const [source, target] of listFields) {
                data[target] = this.#parseList(foundry.utils.getProperty(data, source));
                delete data[source];
            }

            const talentFields = [
                ["culture.combatTalentsText", "system.talents.combat"],
                ["culture.bodyTalentsText", "system.talents.body"],
                ["culture.socialTalentsText", "system.talents.social"],
                ["culture.natureTalentsText", "system.talents.nature"],
                ["culture.knowledgeTalentsText", "system.talents.knowledge"],
                ["culture.scriptsLanguagesTalentsText", "system.talents.scriptsLanguages"],
                ["culture.craftTalentsText", "system.talents.craft"]
            ];

            for (const [source, target] of talentFields) {
                data[target] = this.#parseTalentList(foundry.utils.getProperty(data, source));
                delete data[source];
            }
        }

        if (this.item.type === "profession") {
            const listFields = [
                ["profession.requirementsText", "system.requirements"],
                ["profession.modificationsText", "system.modifications"],
                ["profession.automaticAdvantagesText", "system.automaticAdvantages"],
                ["profession.automaticDisadvantagesText", "system.automaticDisadvantages"],
                ["profession.recommendedAdvantagesText", "system.recommendedAdvantages"],
                ["profession.recommendedDisadvantagesText", "system.recommendedDisadvantages"],
                ["profession.unsuitableAdvantagesText", "system.unsuitableAdvantages"],
                ["profession.unsuitableDisadvantagesText", "system.unsuitableDisadvantages"],
                ["profession.equipmentText", "system.equipment"],
                ["profession.specialPossessionsText", "system.specialPossessions"],
                ["profession.discountedSpecialAbilitiesText", "system.discountedSpecialAbilities"]
            ];

            for (const [source, target] of listFields) {
                data[target] = this.#parseList(foundry.utils.getProperty(data, source));
                delete data[source];
            }

            const talentFields = [
                ["profession.combatTalentsText", "system.talents.combat"],
                ["profession.bodyTalentsText", "system.talents.body"],
                ["profession.socialTalentsText", "system.talents.social"],
                ["profession.natureTalentsText", "system.talents.nature"],
                ["profession.knowledgeTalentsText", "system.talents.knowledge"],
                ["profession.scriptsLanguagesTalentsText", "system.talents.scriptsLanguages"],
                ["profession.craftTalentsText", "system.talents.craft"]
            ];

            for (const [source, target] of talentFields) {
                data[target] = this.#parseTalentList(foundry.utils.getProperty(data, source));
                delete data[source];
            }
        }

        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        if (!this.isComplexSheet || !this.isEditable) return;
        html.find("[data-sheet-mode]").on("click", this.#onToggleMode.bind(this));
    }

    #onToggleMode(event) {
        event.preventDefault();
        const mode = event.currentTarget.dataset.sheetMode;
        if (!["view", "edit"].includes(mode)) return;
        this.#mode = mode;
        this.render(false);
    }

    #formatRangeEntries(entries = []) {
        return entries.map((entry) => `${entry.min}-${entry.max}: ${entry.label}`).join("\n");
    }

    #formatList(entries = []) {
        return entries.join("\n");
    }

    #formatTalentList(entries = []) {
        return entries.map((entry) => `${entry.name}: ${entry.value}`).join("\n");
    }

    #normalizeTalentEntries(entries = []) {
        return (entries ?? [])
            .map((entry) => {
                if (typeof entry === "string") {
                    const [name, ...valueParts] = entry.split(":");
                    return {
                        name: name.trim(),
                        value: valueParts.join(":").trim()
                    };
                }
                return {
                    name: String(entry?.name ?? "").trim(),
                    value: String(entry?.value ?? "").trim()
                };
            })
            .filter((entry) => entry.name);
    }

    #normalizeTalentMap(talents = {}) {
        return {
            combat: this.#normalizeTalentEntries(talents?.combat),
            body: this.#normalizeTalentEntries(talents?.body),
            social: this.#normalizeTalentEntries(talents?.social),
            nature: this.#normalizeTalentEntries(talents?.nature),
            knowledge: this.#normalizeTalentEntries(talents?.knowledge),
            scriptsLanguages: this.#normalizeTalentEntries(talents?.scriptsLanguages),
            craft: this.#normalizeTalentEntries(talents?.craft)
        };
    }

    #formatCharacteristicModifiers(modifiers = {}) {
        return Object.entries(modifiers)
            .filter(([, value]) => Number(value) !== 0)
            .map(([key, value]) => ({
                label: game.i18n.localize(CONFIG.DSA41.characteristics[key]),
                value: Number(value) > 0 ? `+${value}` : `${value}`
            }));
    }

    #formatScalarModifiers(entries = []) {
        return entries
            .filter(([, value]) => Number(value) !== 0)
            .map(([label, value]) => ({
                label,
                value: Number(value) > 0 ? `+${value}` : `${value}`
            }));
    }

    #parseRangeEntries(text) {
        return String(text ?? "")
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => {
                const [rangePart, ...labelParts] = line.split(":");
                const label = labelParts.join(":").trim();
                const [minPart, maxPart] = rangePart.trim().split("-");
                const min = Number.parseInt(minPart.trim(), 10);
                const max = Number.parseInt((maxPart ?? minPart).trim(), 10);
                return { min, max, label };
            })
            .filter((entry) => Number.isInteger(entry.min) && Number.isInteger(entry.max) && entry.label);
    }

    #parseList(text) {
        return String(text ?? "")
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
    }

    #parseTalentList(text) {
        return String(text ?? "")
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => {
                const [name, ...valueParts] = line.split(":");
                return {
                    name: name.trim(),
                    value: valueParts.join(":").trim()
                };
            })
            .filter((entry) => entry.name);
    }
}
