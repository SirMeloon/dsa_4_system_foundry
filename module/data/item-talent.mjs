import dsaItemBase from "./base-item.mjs";

export default class dsaTalent extends dsaItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.group = new fields.StringField({ required: true, blank: true, initial: '' });
    schema.basicTalent = new fields.BooleanField({ required: true, initial: false });
    schema.effectiveEncumbrance = new fields.StringField({ required: true, blank: true, initial: '' });
    schema.advancementLetter = new fields.StringField({ required: true, blank: true, initial: '' });
    schema.taw = new fields.NumberField({ required: true, integer: true, initial: 0 });
    schema.combat = new fields.SchemaField({
      kind: new fields.StringField({ required: true, blank: false, initial: 'none' }),
      attackOnly: new fields.BooleanField({ required: true, initial: false }),
      fallbackTalent: new fields.StringField({ required: true, blank: true, initial: '' }),
    });

    return schema;
  }
}
