import dsaItemBase from "./base-item.mjs";

export default class dsaRasse extends dsaItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    // Beschreibung der Rasse
    schema.description = new fields.SchemaField({
      general: new fields.HTMLField({ required: false, nullable: false, initial: "" }),
      originDistribution: new fields.HTMLField({ required: false, nullable: false, initial: "" }),
      appearance: new fields.HTMLField({ required: false, nullable: false, initial: "" }),
      reproductionAging: new fields.HTMLField({ required: false, nullable: false, initial: "" }),
    });

    // Werte der Rasse
    schema.gp = new fields.NumberField({ required: true, integer: true, initial: 0, min: 0 });
    schema.appearanceTables = new fields.SchemaField({
      hairColors: new fields.ArrayField(
        new fields.SchemaField({
          min: new fields.NumberField({ required: true, integer: true, initial: 1, min: 1, max: 20 }),
          max: new fields.NumberField({ required: true, integer: true, initial: 1, min: 1, max: 20 }),
          result: new fields.StringField({ required: true, blank: true, initial: "" }),
        })
      ),
      eyeColors: new fields.ArrayField(
        new fields.SchemaField({
          min: new fields.NumberField({ required: true, integer: true, initial: 1, min: 1, max: 20 }),
          max: new fields.NumberField({ required: true, integer: true, initial: 1, min: 1, max: 20 }),
          result: new fields.StringField({ required: true, blank: true, initial: "" }),
        })
      ),
    });
    schema.height = new fields.SchemaField({
      baseCm: new fields.NumberField({ required: true, integer: true, initial: 168, min: 0 }),
      diceCount: new fields.NumberField({ required: true, integer: true, initial: 2, min: 0 }),
      dieFaces: new fields.NumberField({ required: true, integer: true, initial: 20, min: 1 }),
    });
    schema.weight = new fields.SchemaField({
      subtract: new fields.NumberField({ required: true, integer: true, initial: 105, min: 0 }),
    });

    return schema;
  }

  getHeightRollData() {
    const { baseCm, diceCount, dieFaces } = this.height;

    return {
      formula: `${diceCount}d${dieFaces}`,
      minimumCm: baseCm + diceCount,
      maximumCm: baseCm + diceCount * dieFaces,
    };
  }

  getWeightRollData() {
    const { subtract } = this.weight;
    const height = this.getHeightRollData();

    return {
      formula: `height - ${subtract}`,
      minimumWeight: Math.max(height.minimumCm - subtract, 0),
      maximumWeight: Math.max(height.maximumCm - subtract, 0),
    };
  }
}
