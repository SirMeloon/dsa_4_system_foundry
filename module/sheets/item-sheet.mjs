import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class dsaItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['dsa', 'sheet', 'item'],
      width: 520,
      height: 480,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'description',
        },
      ],
    });
  }

  /** @override */
  get template() {
    const path = 'systems/dsa_4_system_foundry/templates/item';
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.hbs`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.hbs`.
    return `${path}/item-${this.item.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = this.document.toPlainObject();

    // Enrich description info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    const options = {
      secrets: this.document.isOwner,
      async: true,
      rollData: this.item.getRollData(),
      relativeTo: this.item,
    }
    if (this.item.type === "rasse") {
      context.enrichedDescription = {
        general: await TextEditor.enrichHTML(this.item.system.description.general, options),
        originDistribution: await TextEditor.enrichHTML(this.item.system.description.originDistribution, options),
        appearance: await TextEditor.enrichHTML(this.item.system.description.appearance, options),
        reproductionAging: await TextEditor.enrichHTML(this.item.system.description.reproductionAging, options),
      };

      const height = this.item.system.getHeightRollData();
      const { baseCm, diceCount, dieFaces } = this.item.system.height;
      const formatHeight = (centimeters) => (centimeters / 100).toLocaleString(game.i18n.lang, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      context.heightFormula = `${formatHeight(baseCm)} + ${diceCount}W${dieFaces}`;
      context.heightRange = `${formatHeight(height.minimumCm)}-${formatHeight(height.maximumCm)} ${game.i18n.localize('DSA.Item.Rasse.Step')}`;
    } else {
      context.enrichedDescription = await TextEditor.enrichHTML(this.item.system.description, options); 
    }



    // Add the item's data to context.data for easier access, as well as flags.
    context.system = itemData.system;
    context.flags = itemData.flags;

    // Adding a pointer to CONFIG.DSA
    context.config = CONFIG.DSA;

    // Prepare active effects for easier access
    context.effects = prepareActiveEffectCategories(this.item.effects);

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.

    html.on('click', '.appearance-table-add', this._onAppearanceTableAdd.bind(this));
    html.on('click', '.appearance-table-delete', this._onAppearanceTableDelete.bind(this));
    html.on('change', '.appearance-table-input', this._onAppearanceTableChange.bind(this));

    // Active Effect management
    html.on('click', '.effect-control', (ev) =>
      onManageActiveEffect(ev, this.item)
    );
  }

  /** Add a row to one of a race item's appearance tables. */
  async _onAppearanceTableAdd(event) {
    event.preventDefault();
    const table = event.currentTarget.dataset.table;
    const entries = foundry.utils.deepClone(this.item.system.appearanceTables?.[table] ?? []);
    entries.push({ min: 1, max: 1, result: '' });
    return this.item.update({ [`system.appearanceTables.${table}`]: entries });
  }

  /** Remove a row from one of a race item's appearance tables. */
  async _onAppearanceTableDelete(event) {
    event.preventDefault();
    const { table, index } = event.currentTarget.dataset;
    const entries = foundry.utils.deepClone(this.item.system.appearanceTables?.[table] ?? []);
    entries.splice(Number(index), 1);
    return this.item.update({ [`system.appearanceTables.${table}`]: entries });
  }

  /** Persist a single changed value without coercing the array into an object. */
  async _onAppearanceTableChange(event) {
    const { table, index, field } = event.currentTarget.dataset;
    const entries = foundry.utils.deepClone(this.item.system.appearanceTables?.[table] ?? []);
    entries[Number(index)][field] = field === 'result'
      ? event.currentTarget.value
      : Number(event.currentTarget.value);
    return this.item.update({ [`system.appearanceTables.${table}`]: entries });
  }
}
