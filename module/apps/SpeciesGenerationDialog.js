function normalizeNumber(value) {
    if (value === null || value === undefined || value === "") return null;
    const normalized = Number.parseFloat(String(value).replace(",", "."));
    return Number.isNaN(normalized) ? null : normalized;
}

function inferHeightInCentimeters(heightValue, unit) {
    const numericHeight = normalizeNumber(heightValue);
    if (numericHeight === null) return null;

    const normalizedUnit = String(unit ?? "").toLowerCase();
    if (normalizedUnit.includes("schritt") || normalizedUnit === "m" || normalizedUnit.includes("meter")) {
        return numericHeight * 100;
    }

    return numericHeight;
}

export default class SpeciesGenerationDialog extends FormApplication {
    constructor(actor, species, options = {}) {
        super({}, options);
        this.actor = actor;
        this.species = species;
        this.state = {
            hairColor: actor.system.appearance?.hairColor ?? "",
            eyeColor: actor.system.appearance?.eyeColor ?? "",
            height: actor.system.appearance?.height ?? "",
            weight: actor.system.appearance?.weight ?? ""
        };
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["dsa41", "sheet", "species-dialog"],
            width: 720,
            height: "auto",
            closeOnSubmit: true,
            submitOnClose: false,
            title: game.i18n.localize("DSA41.Dialog.speciesGenerationTitle")
        });
    }

    get template() {
        return "systems/dsa_4_system_foundry/templates/apps/species-generation-dialog.html";
    }

    getData() {
        const data = super.getData();
        data.actor = this.actor;
        data.species = this.species;
        data.system = this.species.system;
        data.state = this.state;
        data.hairColors = this.species.system.hairColors ?? [];
        data.eyeColors = this.species.system.eyeColors ?? [];
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        html.find("[data-roll-field]").on("click", this.#onRollField.bind(this));
    }

    async #onRollField(event) {
        event.preventDefault();
        const field = event.currentTarget.dataset.rollField;
        if (field === "hairColor") this.state.hairColor = await this.#rollTable(this.species.system.hairColors);
        if (field === "eyeColor") this.state.eyeColor = await this.#rollTable(this.species.system.eyeColors);
        if (field === "height") this.state.height = await this.#rollHeight();
        if (field === "weight") this.state.weight = await this.#rollWeight();
        this.render(false);
    }

    async #rollTable(entries) {
        if (!entries?.length) return "";
        const roll = await (new Roll("1d20")).evaluate();
        const total = roll.total;
        const match = entries.find((entry) => total >= entry.min && total <= entry.max);
        return match?.label ?? "";
    }

    async #rollHeight() {
        const height = this.species.system.height ?? {};
        const base = normalizeNumber(height.base) ?? 0;
        const step = normalizeNumber(height.step) ?? 1;
        const diceCount = Number.parseInt(height.diceCount ?? 0, 10) || 0;
        const diceFaces = Number.parseInt(height.diceFaces ?? 0, 10) || 0;
        let result = base;
        if (diceCount > 0 && diceFaces > 0) {
            const roll = await (new Roll(`${diceCount}d${diceFaces}`)).evaluate();
            result += roll.total * step;
        }
        return `${result.toFixed(2)} ${height.unit ?? ""}`.trim();
    }

    async #rollWeight() {
        const weight = this.species.system.weight ?? {};
        const height = this.species.system.height ?? {};
        const heightValue = this.state.height || await this.#rollHeight();
        if (!this.state.height) this.state.height = heightValue;
        const heightInCentimeters = inferHeightInCentimeters(heightValue, height.unit);
        const numericHeight = normalizeNumber(heightValue);
        if (numericHeight === null || heightInCentimeters === null || !weight.formula) return "";

        const expression = String(weight.formula)
            .replace(/GrößeCm|GroesseCm|groessecm|größecm|heightcm/gi, String(heightInCentimeters))
            .replace(/Größe|Groesse|groesse|größe|Hoehe|Höhe|height/gi, String(heightInCentimeters))
            .replace(",", ".");

        const safeExpression = expression.replace(/[^0-9+\-*/(). ]/g, "");
        if (!safeExpression.trim()) return "";

        try {
            const result = Function(`"use strict"; return (${safeExpression});`)();
            if (typeof result === "number" && Number.isFinite(result)) {
                return `${result.toFixed(2)} ${weight.unit ?? ""}`.trim();
            }
        } catch {
            return "";
        }

        return "";
    }

    async _updateObject(_event, formData) {
        const data = foundry.utils.expandObject(formData);
        await this.actor.update({
            "system.appearance.hairColor": data.hairColor ?? "",
            "system.appearance.eyeColor": data.eyeColor ?? "",
            "system.appearance.height": data.height ?? "",
            "system.appearance.weight": data.weight ?? "",
            "system.species": this.species.name
        });
    }
}
