export default class DSA41ItemSheet extends ItemSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["dsa41", "sheet", "item"],
            width: 700,
            height: 650
        });
    }

    get template() {
        const specialized = ["weapon", "species", "culture"];
        const sheet = specialized.includes(this.item.type) ? this.item.type : "item";
        return `systems/dsa_4_system_foundry/templates/sheets/${sheet}-sheet.html`;
    }

    getData() {
        const data = super.getData();
        data.config = CONFIG.DSA41;
        data.system = this.item.system;
        if (this.item.type === "species") {
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
                grantedTalentsText: this.#formatTalentList(this.item.system.grantedTalents)
            };
        }
        if (this.item.type === "culture") {
            data.culture = {
                modificationsText: this.#formatList(this.item.system.modifications),
                automaticAdvantagesText: this.#formatList(this.item.system.automaticAdvantages),
                automaticDisadvantagesText: this.#formatList(this.item.system.automaticDisadvantages),
                recommendedAdvantagesText: this.#formatList(this.item.system.recommendedAdvantages),
                recommendedDisadvantagesText: this.#formatList(this.item.system.recommendedDisadvantages),
                unsuitableAdvantagesText: this.#formatList(this.item.system.unsuitableAdvantages),
                unsuitableDisadvantagesText: this.#formatList(this.item.system.unsuitableDisadvantages),
                allowedProfessionsText: this.#formatList(this.item.system.allowedProfessions),
                combatTalentsText: this.#formatTalentList(this.item.system.talents?.combat),
                bodyTalentsText: this.#formatTalentList(this.item.system.talents?.body),
                socialTalentsText: this.#formatTalentList(this.item.system.talents?.social),
                natureTalentsText: this.#formatTalentList(this.item.system.talents?.nature),
                knowledgeTalentsText: this.#formatTalentList(this.item.system.talents?.knowledge),
                scriptsLanguagesTalentsText: this.#formatTalentList(this.item.system.talents?.scriptsLanguages),
                craftTalentsText: this.#formatTalentList(this.item.system.talents?.craft),
                specialAbilitiesText: this.#formatList(this.item.system.specialAbilities)
            };
        }
        return data;
    }

    _getSubmitData(updateData = {}) {
        const data = super._getSubmitData(updateData);
        if (!["species", "culture"].includes(this.item.type)) return data;

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

        return data;
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
