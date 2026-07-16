export const DSA = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
DSA.abilities = {
  mu: "DSA.Ability.Mu.long",
  kl: "DSA.Ability.Kl.long",
  in: "DSA.Ability.In.long",
  ch: "DSA.Ability.Ch.long",
  ff: "DSA.Ability.Ff.long",
  ge: "DSA.Ability.Ge.long",
  ko: "DSA.Ability.Ko.long",
  kk: "DSA.Ability.Kk.long",
};

DSA.abilityAbbreviations = {
  mu: 'DSA.Ability.Mu.abbr',
  kl: 'DSA.Ability.Kl.abbr',
  in: 'DSA.Ability.In.abbr',
  ch: 'DSA.Ability.Ch.abbr',
  ff: 'DSA.Ability.Ff.abbr',
  ge: 'DSA.Ability.Ge.abbr',
  ko: 'DSA.Ability.Ko.abbr',
  kk: 'DSA.Ability.Kk.abbr',
};

DSA.featureCategories = {
  advantage: 'DSA.Feature.Category.Advantage',
  disadvantage: 'DSA.Feature.Category.Disadvantage',
  specialAbility: 'DSA.Feature.Category.SpecialAbility',
};

DSA.featureCostModes = {
  flat: 'DSA.Feature.CostMode.Flat',
  perLevel: 'DSA.Feature.CostMode.PerLevel',
  perResource: 'DSA.Feature.CostMode.PerResource',
  custom: 'DSA.Feature.CostMode.Custom',
};

DSA.featureLevelModes = {
  fixed: 'DSA.Feature.LevelMode.Fixed',
  talentLike: 'DSA.Feature.LevelMode.TalentLike',
  range: 'DSA.Feature.LevelMode.Range',
};

DSA.featureRequirementTypes = {
  ability: 'DSA.Feature.RequirementType.Ability',
  feature: 'DSA.Feature.RequirementType.Feature',
  talent: 'DSA.Feature.RequirementType.Talent',
  resource: 'DSA.Feature.RequirementType.Resource',
  text: 'DSA.Feature.RequirementType.Text',
};

DSA.featureOperators = {
  '>=': 'DSA.Feature.Operator.Gte',
  '<=': 'DSA.Feature.Operator.Lte',
  '=': 'DSA.Feature.Operator.Eq',
  '!=': 'DSA.Feature.Operator.Neq',
};

DSA.featureEffectTypes = {
  grantFeature: 'DSA.Feature.EffectType.GrantFeature',
  grantItem: 'DSA.Feature.EffectType.GrantItem',
  discountFeature: 'DSA.Feature.EffectType.DiscountFeature',
  improveFeature: 'DSA.Feature.EffectType.ImproveFeature',
  forbidFeature: 'DSA.Feature.EffectType.ForbidFeature',
  modifyResource: 'DSA.Feature.EffectType.ModifyResource',
  modifyRegeneration: 'DSA.Feature.EffectType.ModifyRegeneration',
  modifyRule: 'DSA.Feature.EffectType.ModifyRule',
  skillCheckBonus: 'DSA.Feature.EffectType.SkillCheckBonus',
};

DSA.featureEffectTargetTypes = {
  ability: 'DSA.Feature.TargetType.Ability',
  feature: 'DSA.Feature.TargetType.Feature',
  item: 'DSA.Feature.TargetType.Item',
  talent: 'DSA.Feature.TargetType.Talent',
  resource: 'DSA.Feature.TargetType.Resource',
  rule: 'DSA.Feature.TargetType.Rule',
  check: 'DSA.Feature.TargetType.Check',
};

DSA.talentCombatKinds = {
  none: 'DSA.Talent.CombatKind.None',
  melee: 'DSA.Talent.CombatKind.Melee',
  ranged: 'DSA.Talent.CombatKind.Ranged',
};
