export const DSA41_SPECIES = [
    {
        name: "Tulamiden",
        type: "species",
        img: "icons/svg/mystery-man.svg",
        system: {
            description: "Die Tulamiden Suedost-Aventuriens zaehlen zu den aeltesten Menschenvoelkern Aventuriens. Ihnen wird nachgesagt, grosse Lebensfreude mit ebenso grossem Interesse an Reichtum, Spiritualitaet und den Mysterien zu verbinden.",
            notes: "",
            gpCost: 0,
            originDistribution: "Die urspruengliche Heimat liegt im Raschtulswall. Von dort haben sich die Tulamiden im Gebiet zwischen Baburin und Selem ausgebreitet. Auch die Bevoelkerung Almadas, Al'Anfas und weiterer suedlicher Staedte ist tulamidisch gepraegt.",
            appearance: "Tulamiden sind von mittelgrossem Wuchs, haben oft hellbraune Haut, schwarzes Haar, scharfe Gesichtszuege und dunkle Augen. Durch Vermischung mit Waldmenschen und Mittellaendern kommen auch hellhaeutigere, blau- oder gruenaeugige sowie blonde oder rothaarige Auspraegungen vor.",
            hairColors: [
                { min: 1, max: 6, label: "schwarz" },
                { min: 7, max: 12, label: "dunkelbraun" },
                { min: 13, max: 14, label: "mittelbraun" },
                { min: 15, max: 17, label: "hellbraun" },
                { min: 18, max: 19, label: "blond" },
                { min: 20, max: 20, label: "rot" }
            ],
            eyeColors: [
                { min: 1, max: 4, label: "schwarz" },
                { min: 5, max: 12, label: "dunkelbraun" },
                { min: 13, max: 16, label: "braun" },
                { min: 17, max: 18, label: "grau" },
                { min: 19, max: 19, label: "gruen" },
                { min: 20, max: 20, label: "blau" }
            ],
            height: {
                base: 1.55,
                diceCount: 2,
                diceFaces: 20,
                step: 0.01,
                unit: "Schritt",
                formula: "1.55 + 2W20 * 0.01"
            },
            weight: {
                formula: "GroesseCm - 105",
                unit: "Stein"
            },
            modifiers: {
                characteristics: {
                    mu: 0,
                    kl: 0,
                    in: 0,
                    ch: 0,
                    ff: 0,
                    ge: 0,
                    ko: 0,
                    kk: 0
                },
                lifePoints: 10,
                endurance: 10,
                magicResistance: -4
            },
            automaticAdvantages: [],
            automaticDisadvantages: [],
            recommendedAdvantages: [],
            recommendedDisadvantages: [],
            unsuitableAdvantages: [
                "Herausragende Balance",
                "Nahrungsrestriktion"
            ],
            allowedCultures: [
                "Tulamidische Stadtstaaten",
                "Novadi",
                "Suedaventurien"
            ],
            grantedTalents: []
        }
    }
];
