import dsaItemBase from "./base-item.mjs";

export default class dsaFeature extends dsaItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.category = new fields.StringField({ required: true, blank: false, initial: 'advantage' });
    schema.gpCost = new fields.SchemaField({
      base: new fields.NumberField({ required: true, integer: true, initial: 0 }),
      mode: new fields.StringField({ required: true, blank: false, initial: 'flat' }),
      per: new fields.StringField({ required: false, blank: true, initial: '' }),
      max: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 }),
      note: new fields.StringField({ required: false, blank: true, initial: '' }),
    });
    schema.levels = new fields.SchemaField({
      enabled: new fields.BooleanField({ required: true, initial: false }),
      mode: new fields.StringField({ required: true, blank: false, initial: 'fixed' }),
      current: new fields.NumberField({ required: true, integer: true, initial: 1, min: 1 }),
      min: new fields.NumberField({ required: true, integer: true, initial: 1, min: 1 }),
      max: new fields.NumberField({ required: true, integer: true, initial: 1, min: 1 }),
    });
    schema.requirementsText = new fields.StringField({ required: false, blank: true, initial: '' });
    schema.requirements = new fields.ArrayField(
      new fields.SchemaField({
        type: new fields.StringField({ required: true, blank: false, initial: 'ability' }),
        target: new fields.StringField({ required: false, blank: true, initial: '' }),
        operator: new fields.StringField({ required: true, blank: false, initial: '>=' }),
        value: new fields.StringField({ required: false, blank: true, initial: '' }),
        note: new fields.StringField({ required: false, blank: true, initial: '' }),
      })
    );
    schema.magic = new fields.SchemaField({
      isMagical: new fields.BooleanField({ required: true, initial: false }),
      fullCaster: new fields.BooleanField({ required: true, initial: false }),
      quarterCaster: new fields.BooleanField({ required: true, initial: false }),
    });
    schema.effects = new fields.ArrayField(
      new fields.SchemaField({
        type: new fields.StringField({ required: true, blank: false, initial: 'grantFeature' }),
        targetType: new fields.StringField({ required: false, blank: true, initial: '' }),
        target: new fields.StringField({ required: false, blank: true, initial: '' }),
        mode: new fields.StringField({ required: false, blank: true, initial: '' }),
        value: new fields.NumberField({ required: true, integer: true, initial: 0 }),
        max: new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 }),
        note: new fields.StringField({ required: false, blank: true, initial: '' }),
      })
    );

    return schema;
  }
}
