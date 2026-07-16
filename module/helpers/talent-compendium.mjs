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
    const current = existingByName.get(talent.name);
    if (!current) {
      creates.push(talent);
      continue;
    }

    updates.push({
      _id: current.id,
      name: talent.name,
      img: talent.img,
      system: talent.system,
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
