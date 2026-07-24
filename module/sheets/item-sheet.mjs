import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ItemSheetV2 } = foundry.applications.sheets;
const TextEditorV2 = foundry.applications.ux.TextEditor.implementation;

/**
 * ApplicationV2 item sheet for DSA.
 * @extends {ItemSheetV2}
 */
export class dsaItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['dsa', 'sheet', 'item', 'flexcol'],
    tag: 'form',
    form: {
      closeOnSubmit: false,
      submitOnChange: true,
    },
    position: {
      width: 520,
      height: 480,
    },
    window: {
      resizable: true,
    },
  };

  static PARTS = {
    sheet: {
      template: 'systems/dsa_4_system_foundry/templates/item/item-item-sheet.hbs',
      scrollable: ['.sheet-body'],
    },
  };

  tabGroups = {
    primary: 'description',
  };

  /** @override */
  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    const sizes = {
      rasse: { width: 720, height: 620 },
      feature: { width: 860, height: 720 },
      talent: { width: 760, height: 620 },
    };
    options.position = {
      ...(sizes[this.item.type] ?? {}),
      ...options.position,
    };
  }

  /** @override */
  _configureRenderParts(options) {
    const parts = super._configureRenderParts(options);
    parts.sheet.template =
      `systems/dsa_4_system_foundry/templates/item/item-${this.item.type}-sheet.hbs`;
    return parts;
  }

  /* -------------------------------------------- */

  /** @override */
  async _prepareContext(options) {
    // Retrieve base data structure.
    const context = await super._prepareContext(options);

    // Use a safe clone of the item data for further operations.
    const itemData = this.document.toPlainObject();
    context.item = this.item;
    context.editable = this.isEditable;

    // Enrich description info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    const enrichmentOptions = {
      secrets: this.document.isOwner,
      async: true,
      rollData: this.item.getRollData(),
      relativeTo: this.item,
    };
    if (this.item.type === 'rasse') {
      context.enrichedDescription = {
        general: await TextEditorV2.enrichHTML(this.item.system.description.general, enrichmentOptions),
        originDistribution: await TextEditorV2.enrichHTML(
          this.item.system.description.originDistribution,
          enrichmentOptions
        ),
        appearance: await TextEditorV2.enrichHTML(this.item.system.description.appearance, enrichmentOptions),
        reproductionAging: await TextEditorV2.enrichHTML(
          this.item.system.description.reproductionAging,
          enrichmentOptions
        ),
      };

      const height = this.item.system.getHeightRollData();
      const weight = this.item.system.getWeightRollData();
      const { baseCm, diceCount, dieFaces } = this.item.system.height;
      const { subtract } = this.item.system.weight;
      const formatHeight = (centimeters) => (centimeters / 100).toLocaleString(game.i18n.lang, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const formatWeight = (value) => value.toLocaleString(game.i18n.lang, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      context.heightFormula = `${formatHeight(baseCm)} + ${diceCount}W${dieFaces}`;
      context.heightRange = `${formatHeight(height.minimumCm)}-${formatHeight(height.maximumCm)} ${game.i18n.localize('DSA.Item.Rasse.Step')}`;
      context.weightFormula = `${game.i18n.localize('DSA.Item.Rasse.HeightValue')} - ${formatWeight(subtract)}`;
      context.weightRange = `${formatWeight(weight.minimumWeight)}-${formatWeight(weight.maximumWeight)} ${game.i18n.localize('DSA.Item.Rasse.WeightUnit')}`;
    } else {
      context.enrichedDescription = await TextEditorV2.enrichHTML(
        this.item.system.description,
        enrichmentOptions
      );
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
  _onRender(context, options) {
    super._onRender(context, options);
    this.element.classList.add(`${this.item.type}-sheet`);

    this.element.querySelectorAll('.sheet-tabs [data-tab]').forEach((element) =>
      element.addEventListener('click', this._onChangeTab.bind(this))
    );
    this._renderTabs();

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.

    this._listen('click', '.appearance-table-add', this._onAppearanceTableAdd);
    this._listen('click', '.appearance-table-delete', this._onAppearanceTableDelete);
    this._listen('change', '.appearance-table-input', this._onAppearanceTableChange);
    this._listen('click', '.feature-array-add', this._onFeatureArrayAdd);
    this._listen('click', '.feature-array-delete', this._onFeatureArrayDelete);
    this._listen('change', '.feature-array-input', this._onFeatureArrayChange);
    this._listen('click', '[data-edit]', this._onEditImage);

    // Active Effect management
    this.element.querySelectorAll('.effect-control').forEach((element) =>
      element.addEventListener('click', (event) =>
        onManageActiveEffect(event, this.item)
      )
    );
  }

  _listen(type, selector, handler) {
    this.element.querySelectorAll(selector).forEach((element) =>
      element.addEventListener(type, handler.bind(this))
    );
  }

  _onChangeTab(event) {
    event.preventDefault();
    this.tabGroups.primary = event.currentTarget.dataset.tab;
    this._renderTabs();
  }

  _renderTabs() {
    const active = this.tabGroups.primary;
    this.element.querySelectorAll('.sheet-tabs [data-tab]').forEach((tab) =>
      tab.classList.toggle('active', tab.dataset.tab === active)
    );
    this.element.querySelectorAll('.sheet-body > [data-tab]').forEach((tab) =>
      tab.classList.toggle('active', tab.dataset.tab === active)
    );
  }

  async _onEditImage(event) {
    const target = event.currentTarget;
    const path = target.dataset.edit;
    const picker = new foundry.applications.apps.FilePicker.implementation({
      current: foundry.utils.getProperty(this.document._source, path),
      type: target.dataset.type || 'image',
      document: this.document,
      callback: (src) => this.document.update({ [path]: src }),
    });
    await picker.browse();
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

  /** Add a structured row to one of a feature item's arrays. */
  async _onFeatureArrayAdd(event) {
    event.preventDefault();
    const array = event.currentTarget.dataset.array;
    const entries = foundry.utils.deepClone(this.item.system?.[array] ?? []);
    entries.push(this._getFeatureArrayDefaultRow(array));
    return this.item.update({ [`system.${array}`]: entries });
  }

  /** Remove a structured row from one of a feature item's arrays. */
  async _onFeatureArrayDelete(event) {
    event.preventDefault();
    const { array, index } = event.currentTarget.dataset;
    const entries = foundry.utils.deepClone(this.item.system?.[array] ?? []);
    entries.splice(Number(index), 1);
    return this.item.update({ [`system.${array}`]: entries });
  }

  /** Persist a changed value within one of a feature item's structured arrays. */
  async _onFeatureArrayChange(event) {
    const { array, index, field } = event.currentTarget.dataset;
    const entries = foundry.utils.deepClone(this.item.system?.[array] ?? []);
    const dtype = event.currentTarget.dataset.dtype;
    let value = event.currentTarget.value;

    if (dtype === 'Number') value = Number(value);
    entries[Number(index)][field] = value;

    return this.item.update({ [`system.${array}`]: entries });
  }

  /** Default row templates for feature system arrays. */
  _getFeatureArrayDefaultRow(array) {
    if (array === 'requirements') {
      return {
        type: 'ability',
        target: '',
        operator: '>=',
        value: '',
        note: '',
      };
    }

    if (array === 'effects') {
      return {
        type: 'grantFeature',
        targetType: '',
        target: '',
        mode: '',
        value: 0,
        max: 0,
        note: '',
      };
    }

    return {};
  }
}
