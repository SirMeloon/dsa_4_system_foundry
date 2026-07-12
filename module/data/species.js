export const DSA41_SPECIES = [
    {
        name: "Mittelländer",
        type: "species",
        img: "icons/svg/mystery-man.svg",
        system: {
            description: "Die hellhäutigen Mittelländer dominieren heutzutage Aventurien, stellen sie doh mehr als die Hälfte der Bewohner des Kontinents. Daraus ergibt sich eine kulturelle Vielfalt, die keine andere Rasse zu bieten hat; zudem kann fast jede erdenkliche PRofession gewählt werden. Daher hat der Spieler bei der Gestaltung 'seines' Mittelländers größtmögliche Freiheit.",
            notes: "",
            gpCost: 0,
            originDistribution: "Die Mittelländer sind die Nachkommen der güldenländischen Siedler, die vor etwa 2.500 Jahren an den Küsten des heutigen Horasreichs landeten. Eine ebenso aggressive wie erfolgreiche Eroberungspolitik führte zur raschen Verbreitung dieser Rasse über große Teile Aventuriens. Mittelländer leben heute in Riva, dem Svellttal, Nostria, Andergast, dem Mittelreich, dem Bornland, dem Horasreich, auf Maraskan und in den südlichen Stadtstaaten; einzelne Familien kann man aber auch in jedem anderen Winkel Aventuriens antreffen.",
            appearance: "Die weite Verbreitung der Mittelländer bewirkte natürlich auch eine Vermischung mit anderen Völkern, weshalb sich kein einheitliches Erscheinungsbild festmachen lässt. Die Körpergröße variiert, wobei aber ausgesprochene Hünen oder Kleinwüchsig die Ausnahme sind. Alle Haarfarben von Hellblond bis Schwarz sind vertreten, im Norden herrschen hellere und im Süden dunklere Farbtöne vor. Blauschwarzes Haar ist selten und kommt nur bei Familien vor, die einen guten Schuss Waldmenschenblut in den Adern haben. Bei den Augenfarben dominieren Blau, Grün und Braun; Dunkelbraun und Schwarz sind wiederum selten und treten ebenfalls nur bei Menschen auf, die entweder Tulamiden oder Waldmenschen in der Ahnenreihe haben. Der Bartwuchs ist bei Mittelländern stark ausgeprägt, wie man aber diese Zierde des Antlitzes trägt, hängt von der regionalen Mode ab.",
            hairColors: [
                { min: 1, max: 3, label: "schwarz" },
                { min: 4, max: 7, label: "braun" },
                { min: 8, max: 12, label: "dunkelblond" },
                { min: 13, max: 16, label: "blond" },
                { min: 17, max: 18, label: "weißblond" },
                { min: 19, max: 20, label: "rot" }
            ],
            eyeColors: [
                { min: 1, max: 2, label: "dunkelbraun" },
                { min: 3, max: 9, label: "braun" },
                { min: 10, max: 11, label: "grün" },
                { min: 12, max: 17, label: "blau" },
                { min: 18, max: 19, label: "grau" },
                { min: 20, max: 20, label: "schwarz" }
            ],
            height: {
                base: 1.60,
                diceCount: 2,
                diceFaces: 20,
                step: 0.01,
                unit: "Schritt",
                formula: "1.60 + 2W20 * 0.01"
            },
            weight: {
                formula: "GroesseCm - 100",
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
                "Herausragende Balance"
            ],
            unsuitableDisadvantages: [
                "Nahrungsrestriktion"
            ],
            allowedCultures: [
                "Mittelländische Städte",
                "Andergast/Nostria",
                "Bornland",
                "Horasreich",
                "Südaventurien"
            ],
            grantedTalents: []
        }
    }
];
