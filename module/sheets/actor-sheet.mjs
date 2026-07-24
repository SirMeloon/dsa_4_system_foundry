import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;
const TextEditorV2 = foundry.applications.ux.TextEditor.implementation;

/**
 * ApplicationV2 actor sheet for DSA.
 * @extends {ActorSheetV2}
 */
export class dsaActorSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ['dsa', 'sheet', 'actor', 'flexcol'],
    tag: 'form',
    form: {
      closeOnSubmit: false,
      submitOnChange: true,
    },
    position: {
      width: 600,
      height: 600,
    },
    window: {
      resizable: true,
    },
  };

  static PARTS = {
    sheet: {
      template: 'systems/dsa_4_system_foundry/templates/actor/actor-character-sheet.hbs',
      scrollable: ['.sheet-body'],
    },
  };

  tabGroups = {
    primary: 'features',
  };

  /* -------------------------------------------- */

  /** @override */
  _configureRenderParts(options) {
    const parts = super._configureRenderParts(options);
    parts.sheet.template =
      `systems/dsa_4_system_foundry/templates/actor/actor-${this.actor.type}-sheet.hbs`;
    return parts;
  }

  /** @override */
  async _prepareContext(options) {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = await super._prepareContext(options);

    // Use a safe clone of the actor data for further operations.
    const actorData = this.document.toPlainObject();

    // Add the actor's data to context.data for easier access, as well as flags.
    context.actor = this.actor;
    context.editable = this.isEditable;
    context.system = actorData.system;
    context.flags = actorData.flags;
    context.portrait = {
      token: actorData.img === actorData.prototypeToken?.texture?.src,
    };

    // Adding a pointer to CONFIG.DSA
    context.config = CONFIG.DSA;
    context.featureSummary = foundry.utils.deepClone(this.actor.featureSummary ?? {
      abilities: {},
      resources: {},
      derivedRules: [],
    });
    context.featureAbilityBonuses = Object.entries(context.featureSummary.abilities ?? {})
      .filter(([, value]) => Number(value))
      .map(([key, value]) => ({
        key,
        value,
        label: game.i18n.localize(CONFIG.DSA.abilityAbbreviations?.[key] ?? key),
      }));
    context.featureResourceBonuses = Object.entries(context.featureSummary.resources ?? {})
      .filter(([, bonus]) => Number(bonus?.value) || Number(bonus?.max))
      .map(([key, bonus]) => ({
        key,
        value: Number(bonus?.value) || 0,
        max: Number(bonus?.max) || 0,
      }));

    // Prepare character data and items.
    if (actorData.type == 'character') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'npc') {
      this._prepareItems(context);
    }

    // Enrich biography info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    context.enrichedBiography = await TextEditorV2.enrichHTML(
      this.actor.system.biography,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        // Necessary in v11, can be removed in v12
        async: true,
        // Data to fill in for inline rolls
        rollData: this.actor.getRollData(),
        // Relative UUID resolution
        relativeTo: this.actor,
      }
    );

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(
      // A generator that returns all effects stored on the actor
      // as well as any items
      this.actor.allApplicableEffects()
    );

    return context;
  }

  /**
   * Character-specific context modifications
   *
   * @param {object} context The context object to mutate
   */
  _prepareCharacterData(context) {
    // This is where you can enrich character-specific editor fields
    // or setup anything else that's specific to this type
  }

  /**
   * Organize and classify Items for Actor sheets.
   *
   * @param {object} context The context object to mutate
   */
  _prepareItems(context) {
    // Initialize containers.
    const gear = [];
    const features = [];
    const talents = [];
    const talentsByGroup = {};
    const featureBuckets = {
      advantage: [],
      disadvantage: [],
      specialAbility: [],
      uncategorized: [],
    };
    const spells = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
    };

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      // Append to gear.
      if (i.type === 'item') {
        gear.push(i);
      }
      // Append to features.
      else if (i.type === 'feature') {
        features.push(i);
        if (featureBuckets[i.system.category]) {
          featureBuckets[i.system.category].push(i);
        } else {
          featureBuckets.uncategorized.push(i);
        }
      }
      else if (i.type === 'talent') {
        talents.push(i);
        const group = i.system.group?.trim() || game.i18n.localize('DSA.Talent.Ungrouped');
        talentsByGroup[group] ??= [];
        talentsByGroup[group].push(i);
      }
      // Append to spells.
      else if (i.type === 'spell') {
        if (i.system.spellLevel != undefined) {
          spells[i.system.spellLevel].push(i);
        }
      }
    }

    // Assign and return
    context.gear = gear;
    context.features = features;
    context.featureBuckets = featureBuckets;
    context.hasFeatures = features.length > 0;
    context.talents = talents;
    context.talentsByGroup = talentsByGroup;
    context.hasTalents = talents.length > 0;
    context.spells = spells;
  }

  /* -------------------------------------------- */

  /** @override */
  _onRender(context, options) {
    super._onRender(context, options);
    const html = this.element;
    html.classList.add(this.actor.type);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.querySelectorAll('.item-edit').forEach((element) =>
      element.addEventListener('click', (event) => {
        const itemId = event.currentTarget.closest('.item')?.dataset.itemId;
        this.actor.items.get(itemId)?.sheet.render({ force: true });
      })
    );

    html.querySelectorAll('.sheet-tabs [data-tab]').forEach((element) =>
      element.addEventListener('click', this._onChangeTab.bind(this))
    );
    this._renderTabs();

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.querySelectorAll('.item-create').forEach((element) =>
      element.addEventListener('click', this._onItemCreate.bind(this))
    );

    // Delete Inventory Item
    html.querySelectorAll('.item-delete').forEach((element) =>
      element.addEventListener('click', async (event) => {
        const row = event.currentTarget.closest('.item');
        const item = this.actor.items.get(row?.dataset.itemId);
        if (item) await item.delete();
      })
    );

    // Active Effect management
    html.querySelectorAll('.effect-control').forEach((element) =>
      element.addEventListener('click', (event) => {
        const row = event.currentTarget.closest('li');
        const document =
          row.dataset.parentId === this.actor.id
            ? this.actor
            : this.actor.items.get(row.dataset.parentId);
        onManageActiveEffect(event, document);
      })
    );

    // Rollable abilities.
    html.querySelectorAll('.rollable').forEach((element) =>
      element.addEventListener('click', this._onRoll.bind(this))
    );

    // Character proficiency lists are stored as arrays, so update them directly.
    this._listen('click', '.proficiency-create', this._onProficiencyCreate);
    this._listen('click', '.proficiency-delete', this._onProficiencyDelete);
    this._listen('change', '.proficiency-input', this._onProficiencyChange);
    this._listen('change', '.talent-taw-input', this._onTalentTawChange);
    this._listen('click', '[data-edit]', this._onEditImage);

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.querySelectorAll('li.item').forEach((li) => {
        if (li.classList.contains('inventory-header')) return;
        li.setAttribute('draggable', true);
        li.addEventListener('dragstart', handler, false);
      });
    }
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

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = foundry.utils.deepClone(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data,
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system['type'];

    // Finally, create the item!
    return await Item.create(itemData, { parent: this.actor });
  }

  /** Add an empty entry to one of the character's proficiency lists. */
  async _onProficiencyCreate(event) {
    event.preventDefault();
    const proficiency = event.currentTarget.dataset.proficiency;
    const values = [...(this.actor.system.proficiencies?.[proficiency] ?? []), ''];
    return this.actor.update({ [`system.proficiencies.${proficiency}`]: values });
  }

  /** Remove an entry from one of the character's proficiency lists. */
  async _onProficiencyDelete(event) {
    event.preventDefault();
    const { proficiency, index } = event.currentTarget.dataset;
    const values = [...(this.actor.system.proficiencies?.[proficiency] ?? [])];
    values.splice(Number(index), 1);
    return this.actor.update({ [`system.proficiencies.${proficiency}`]: values });
  }

  /** Persist a changed proficiency entry without converting the array to an object. */
  async _onProficiencyChange(event) {
    const { proficiency, index } = event.currentTarget.dataset;
    const values = [...(this.actor.system.proficiencies?.[proficiency] ?? [])];
    values[Number(index)] = event.currentTarget.value;
    return this.actor.update({ [`system.proficiencies.${proficiency}`]: values });
  }

  /** Persist the TaW on an embedded talent item. */
  async _onTalentTawChange(event) {
    const itemId = event.currentTarget.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    const parsed = Number.parseInt(event.currentTarget.value, 10);
    const taw = Number.isNaN(parsed) ? 0 : parsed;
    const system = item.system.toPlainObject ? item.system.toPlainObject() : foundry.utils.deepClone(item.system);

    event.currentTarget.value = taw;
    system.taw = taw;
    return item.update({ system });
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[ability] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }
}
