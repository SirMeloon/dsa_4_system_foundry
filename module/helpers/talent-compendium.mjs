import { TALENT_DEFINITIONS } from './talent-definitions.mjs';

const TALENT_COMPENDIUM_NAME = 'dsa-talente';
const TALENT_COMPENDIUM_ID = `dsa_4_system_foundry.${TALENT_COMPENDIUM_NAME}`;

export async function seedSystemTalentCompendium() {
  const pack = getSystemTalentCompendium();
  const existing = await pack.getDocuments();
  const existingByName = new Map(existing.map((doc) => [doc.name, doc]));

  const creates = [];
  const updates = [];

  for (const talent of TALENT_DEFINITIONS) {
    const normalized = normalizeTalentSourceData(talent);
    const current = existingByName.get(talent.name);
    if (!current) {
      creates.push(normalized);
      continue;
    }

    updates.push({
      _id: current.id,
      name: normalized.name,
      img: normalized.img,
      system: normalized.system,
    });
  }

  if (creates.length) {
    await Item.createDocuments(creates, { pack: pack.collection });
  }

  if (updates.length) {
    await Item.updateDocuments(updates, { pack: pack.collection });
  }

  ui.notifications.info(
    `System-Talent-Kompendium synchronisiert: ${creates.length} neu, ${updates.length} aktualisiert.`
  );

  return pack;
}

export function getSystemTalentCompendium() {
  const pack = game.packs.get(TALENT_COMPENDIUM_ID);
  if (!pack) {
    throw new Error(
      `System-Kompendium ${TALENT_COMPENDIUM_ID} wurde nicht gefunden. Prüfe den packs-Eintrag in system.json und lade Foundry neu.`
    );
  }

  return pack;
}

export async function initializeSystemTalentCompendium() {
  const pack = getSystemTalentCompendium();
  await pack.getIndex();
  if (pack.index.size > 0) return pack;
  return seedSystemTalentCompendium();
}

export async function migrateTalentTawValues() {
  const worldTalentUpdates = game.items.contents
    .filter((item) => item.type === 'talent')
    .flatMap((item) => buildTalentUpdate(item));

  if (worldTalentUpdates.length) {
    await Item.updateDocuments(worldTalentUpdates);
  }

  for (const actor of game.actors.contents) {
    const embeddedUpdates = actor.items.contents
      .filter((item) => item.type === 'talent')
      .flatMap((item) => buildTalentUpdate(item));

    if (embeddedUpdates.length) {
      await actor.updateEmbeddedDocuments('Item', embeddedUpdates);
    }
  }
}

function buildTalentUpdate(item) {
  const system = normalizeTalentSystemData(item.system);
  if (system.taw === item.system.taw) return [];
  return [{ _id: item.id, system }];
}

function normalizeTalentSourceData(talent) {
  return {
    ...talent,
    system: normalizeTalentSystemData(talent.system),
  };
}

function normalizeTalentSystemData(system) {
  const source = system?.toPlainObject ? system.toPlainObject() : foundry.utils.deepClone(system ?? {});
  const parsed = Number.parseInt(source.taw, 10);

  source.taw = Number.isNaN(parsed) ? 0 : parsed;
  source.group ??= '';
  source.basicTalent ??= false;
  source.effectiveEncumbrance ??= '';
  source.advancementLetter ??= '';
  source.combat ??= {};
  source.combat.kind ??= 'none';
  source.combat.attackOnly ??= false;
  source.combat.fallbackTalent ??= '';

  return source;
}
