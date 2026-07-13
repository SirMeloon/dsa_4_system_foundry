import DocumentSheetDSA41 from "../api/document-sheet.js";

export default class ItemSheetDSA41 extends DocumentSheetDSA41 {
    static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS ?? {}, {
        classes: ["dsa41-sheet", "dsa41-item-sheet"],
        position: {
            width: 820,
            height: 760
        }
    });

    static PARTS = {
        sheet: {
            template: "systems/dsa_4_system_foundry/templates/items/item-sheet.hbs"
        }
    };

    static TABS = [
        { id: "description", label: "DSA41.Tab.description" },
        { id: "details", label: "DSA41.Tab.details" },
        { id: "notes", label: "DSA41.Tab.notes" }
    ];

    #mode = "view";

    get item() {
        return this.document;
    }

    get isComplexSheet() {
        return ["species", "culture", "profession"].includes(this.item.type);
    }

    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        context.item = this.item;
        context.system = this.item.system;
        context.cssClass = this.options.classes.join(" ");
        context.isComplexSheet = this.isComplexSheet;
        context.isEditMode = this.#mode === "edit";
        context.canToggleEditMode = this.isComplexSheet && this.isEditable;
        context.typeLabel = game.i18n.localize(CONFIG.Item.typeLabels?.[this.item.type] ?? CONFIG.DSA41.itemTypeLabels?.[this.item.type] ?? this.item.type);
        context.summaryProperties = this.#prepareSummaryProperties();
        context.isWeapon = this.item.type === "weapon";
        context.isSkill = this.item.type === "skill";
        context.isSpecies = this.item.type === "species";
        context.isCulture = this.item.type === "culture";
        context.isProfession = this.item.type === "profession";
        context.isSpecialAbility = this.item.type === "specialAbility";
        context.isAdvantage = this.item.type === "advantage";
        context.isDisadvantage = this.item.type === "disadvantage";
        context.skillProbeText = this.#formatProbe(this.item.system.probe);

        if (context.isSpecies) context.species = this.#prepareSpeciesContext();
        if (context.isCulture) context.culture = this.#prepareCultureContext();
        if (context.isProfession) context.profession = this.#prepareProfessionContext();

        return context;
    }

    async _prepareSubmitData(event, form, formData) {
        const data = await super._prepareSubmitData(event, form, formData);
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

    _onRender(context, options) {
        if (options.isFirstRender) this.#mode = "view";
        super._onRender(context, options);
        this.element.querySelectorAll("[data-sheet-mode]").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                const mode = event.currentTarget.dataset.sheetMode;
                if (!["view", "edit"].includes(mode)) return;
                this.#mode = mode;
                this.render(false);
            });
        });
    }

    #prepareSummaryProperties() {
        const properties = [game.i18n.localize(CONFIG.Item.typeLabels?.[this.item.type] ?? this.item.type)];

        if (this.item.type === "weapon") {
            properties.push(game.i18n.localize(CONFIG.DSA41.weaponGroups[this.item.system.group] ?? CONFIG.DSA41.weaponGroups.none));
            if (this.item.system.damage) properties.push(this.item.system.damage);
        }

        if (this.item.type === "skill") {
            if (this.item.system.group) properties.push(this.item.system.group);
            if (this.item.system.complexity) properties.push(this.item.system.complexity);
            if (this.item.system.probe?.length) properties.push(this.#formatProbe(this.item.system.probe));
        }

        if (["species", "culture", "profession"].includes(this.item.type)) {
            properties.push(`${this.item.system.gpCost ?? 0} GP`);
        }

        return properties.filter(Boolean);
    }

    #prepareSpeciesContext() {
        const grantedTalents = this.#normalizeTalentEntries(this.item.system.grantedTalents);
        return {
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
                [game.i18n.localize("DSA41.Species.astralPointsModifier"), this.item.system.modifiers?.astralPoints],
                [game.i18n.localize("DSA41.Species.magicResistanceModifier"), this.item.system.modifiers?.magicResistance]
            ])
        };
    }

    #prepareCultureContext() {
        const talents = this.#normalizeTalentMap(this.item.system.talents);
        return {
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

    #prepareProfessionContext() {
        const talents = this.#normalizeTalentMap(this.item.system.talents);
        return {
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

    #formatProbe(probe = []) {
        return (probe ?? [])
            .map((key) => game.i18n.localize(CONFIG.DSA41.characteristics[key] ?? key))
            .join(" / ");
    }

    #formatRangeEntries(entries = []) {
        return entries.map((entry) => `${entry.min}-${entry.max}: ${entry.label}`).join("\n");
    }

    #formatList(entries = []) {
        return (entries ?? []).join("\n");
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
        return Object.entries(modifiers ?? {})
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
