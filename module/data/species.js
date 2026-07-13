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
    },
    {
        name: "Tulamiden",
        type: "species",
        img: "icons/svg/mystery-man.svg",
        system: {
            description: "Eine vielschichtige Rasse mit mehreren verschiedenen, komplexen Kulturen sind die Tulamiden Südost-Aventuriens: Als eines der ältesten Menschenvölker hatten sie schon eine Hochkultur, ehe die ersten güldenländischen Siedler eintrafen. Ihnen wird nachgesagt, sie verbänden große Lebensfreude mit einem ebenso großen Interesse an Reichtum, aber auch an der Welt des Spiri- tuellen und der Mysterien.",
            notes: "",
            gpCost: 0,
            originDistribution: "Die Gelehrten sind sich einig, dass die Tulamiden zu den aventurischen Ureinwohnern zählen. Ihre ursprüngliche Heimat liegt im Raschtulswall, von dort haben sie sich im Gebiet zwischen Baburin und Selem ausgebreitet. Auch die Bevölkerung Almadas sowie Al’Anfas und anderer südlicher Städte ist tulamidisch geprägt. Die Norbarden, die als reisende Händler durchs Bornland und die Nivesensteppe ziehen, haben ebenso tulamidische Vorfahren wie die zweigottgläubigen Maraskaner.",
            appearance: "Tulamiden sind von mittelgroßem Wuchs, haben eine hellbraune Haut, schwarzes Haar, scharfe Gesichtszüge und dunkle Augen. (An den Grenzen zu den Siedlungsräumen der Mittelländer findet man aufgrund der Vermischung auch hellhäutigere Tulamiden, die teils blau- oder grünäugig, teils blond oder rot-haarig sind.) Da die Haltung von Waldmenschensklaven Tradition hat, haben sich die Tulamiden immer wieder mit diesen vermischt, was sich durch kleineren Wuchs, hohe Wangenknochen, weichere Gesichtszügen und vor allem dunklere Haut bemerkbar machen kann.",
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
                { min: 19, max: 19, label: "grün" },
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
                "Herausragende Balance"
            ],
            unsuitableDisadvantages: [
                "Nahrungsrestriktion"
            ],
            allowedCultures: [
                "Tulamidische Stadtstaaten",
                "Novadi",
                "Südaventurien"
            ],
            grantedTalents: []
        }
    },
    {
        name: "Thorwaler",
        type: "species",
        img: "icons/svg/mystery-man.svg",
        system: {
            description: "Große, stämmige, muskelbepackte Männer und Frauen mit wilden, blonden oder roten Mähnen – das sind die Thorwaler, wie jedes Kind in Aventurien sie kennt. Sie sind geradlinig und haben die feine Diplomatie nicht eben erfunden, was sie im Rollenspiel zu idealen Einsteigercharakteren macht.",
            notes: "",
            gpCost: 5,
            originDistribution: "Thorwaler leben an der aventurischen Nordwestküste von der Ingval-Mündung bis zum Golf von Riva sowie in einigen verstreuten Siedlungen (Piratennester oder Seesöldner-Niederlassungen) entlang aller aventurischen Küsten. Ebenfalls zu den Thorwalern gerechnet werden die Gjalskerländer, die in den Hochländern nördlich des Orklands beheimatet sind, und die Fjarninger in den Nebelzinnen und der Grimmfrostöde. Es gilt als gesichert, dass die genannten Völker Nachfahren der legendären Hjaldinger sind, die vor etwa 2.650 Jahren aus dem nördlichen Güldenland in der Nähe der heutigen Stadt Olport anlandeten.",
            appearance: "Die Thorwaler sind der größte (verbreitete) Menschenschlag Aventuriens: Muskulöse Hünen von über 2 Schritt Körpergröße sind keine Seltenheit, helle Haarfarben und blaue Augen herrschen vor, aber auch Rotschöpfe mit grünen Augen sind weit verbreitet. Die Haut ist meist recht hell, dafür aber bei fast allen Thorwalern wettergegerbt. Kopf- und Körperbehaarung der Thorwaler sind üppig; Bärte in verschiedensten wilden Formen bei den Männern und Zöpfe bei Männern und Frauen sind beliebter Schmuck. Unter Thorwaler recht verbreitet ist ein Kampfrausch (bei der Kultur der Thorwaler als Swafskari oder Walwut berüchtigt), in dem sie keinen Schmerz mehr spüren und Freund und Feind nicht mehr unterscheiden können. Manche haben gelernt, diesen Rausch zu beherrschen und sich gezielt hineinzuversetzen, aber die meisten können ihn nicht kontrollieren und werden damit schnell zu einer Gefahr für sich und ihre Umgebung.",
            hairColors: [
                { min: 1, max: 8, label: "blond" },
                { min: 9, max: 13, label: "rotblond" },
                { min: 14, max: 15, label: "weißblond" },
                { min: 16, max: 17, label: "rot" },
                { min: 18, max: 18, label: "dunkelblond" },
                { min: 19, max: 19, label: "braun" },
                { min: 20, max: 20, label: "schwarz" }
            ],
            eyeColors: [
                { min: 1, max: 2, label: "dunkelbraun" },
                { min: 3, max: 7, label: "braun" },
                { min: 8, max: 11, label: "grün" },
                { min: 12, max: 18, label: "blau" },
                { min: 19, max: 20, label: "grau" }
            ],
            height: {
                base: 1.68,
                diceCount: 2,
                diceFaces: 20,
                step: 0.01,
                unit: "Schritt",
                formula: "1.68 + 2W20 * 0.01"
            },
            weight: {
                formula: "GroesseCm - 95",
                unit: "Stein"
            },
            modifiers: {
                characteristics: {
                    mu: 1,
                    kl: 0,
                    in: 0,
                    ch: 0,
                    ff: 0,
                    ge: 0,
                    ko: 1,
                    kk: 1
                },
                lifePoints: 11,
                endurance: 10,
                magicResistance: -5
            },
            automaticAdvantages: [],
            automaticDisadvantages: [
                "Jähzorn 6"
            ],
            recommendedAdvantages: [
                "Ausdauernd",
                "Eisern",
                "Hohe Lebendskraft",
                "Kampfrausch",
                "Richtungssinn",
                "Zäher Hund"
            ],
            recommendedDisadvantages: [
                "Blutrausch"
            ],
            unsuitableAdvantages: [
                "Herausragende Balance"
            ],
            unsuitableDisadvantages: [
                "Glasknochen",
                "Nahrungsrestriktion"
            ],
            allowedCultures: [
                "Thorwal",
                "Mittelländische Städte",
                "Andergast/Nostria",
                "Südaventurien"
            ],
            grantedTalents: [
                "Athletik: 1",
                "Sinnenschärfe: 1",
                "Zechen: 1",
                "Wettervorhersage: 1"
            ]
        }
    },
    {
        name: "Die Zwerge",
        type: "species",
        img: "icons/svg/mystery-man.svg",
        system: {
            description: "Die Zwerge, die sich selbst Angroschim nennen, wurden angeblich von Ingerimm geschaffen, um die Schätze der Welt gegen die habgierigen Drachen zu verteidigen. Sie haben großartige Handwerker und gefürchtete Krieger hervorgebracht und gelten als geradlinig und stur.",
            notes: "Besonderheiten: Zwerginnen, die ihre Sippe verlassen, müssen ausgesprochen stur sein (MU mindestens 12). Zwerge haben Probleme mit Waffen und Rüstungen in menschlichen Größen und umgekehrt.",
            gpCost: 16,
            originDistribution: "Die Zwerge gehören zu den ältesten Völkern Aventuriens. Heutzutage findet man sie hauptsächlich im Eisenwald, in den Ingrakuppen, den Koschbergen, im Amboss, dem Hügelland am Angbarer See und im Raschtulswall. Kleinere Völker finden sich auch in den Goldfelsen, im Finsterkamm und in den Drachensteinen. Einzelne Zwerge oder kleine Sippen leben über ganz Aventurien verteilt.",
            appearance: "Zwerge erreichen nur etwa 1,40 Schritt Körpergröße, sind jedoch überaus kompakt gebaut, meist etwas dunkelhäutiger als Mittelländer und mit festen Muskeln und starken Knochen gesegnet. Die Zierde jedes Zwergenmannes ist sein Bart. Zwerginnen sind von ähnlichem Körperbau und gleicher Robustheit wie die Männer, tragen jedoch keine Bärte. Zwerge werden meist 300 bis 400 Jahre alt.",
            hairColors: [
                { min: 1, max: 5, label: "blond" },
                { min: 6, max: 9, label: "schwarz" },
                { min: 10, max: 11, label: "dunkelgrau" },
                { min: 12, max: 13, label: "hellgrau" },
                { min: 14, max: 14, label: "salzweiß" },
                { min: 15, max: 15, label: "silberweiß" },
                { min: 16, max: 17, label: "feuerrot" },
                { min: 18, max: 20, label: "kupferrot" }
            ],
            eyeColors: [
                { min: 1, max: 2, label: "dunkelbraun" },
                { min: 3, max: 5, label: "braun" },
                { min: 6, max: 9, label: "grün" },
                { min: 10, max: 10, label: "blau" },
                { min: 11, max: 14, label: "grau" },
                { min: 15, max: 20, label: "schwarz" }
            ],
            height: {
                base: 1.28,
                diceCount: 2,
                diceFaces: 6,
                step: 0.01,
                unit: "Schritt",
                formula: "1.28 + 2W6 * 0.01"
            },
            weight: {
                formula: "GroesseCm - 80",
                unit: "Stein"
            },
            modifiers: {
                characteristics: {
                    mu: 0,
                    kl: 0,
                    in: 0,
                    ch: 0,
                    ff: 1,
                    ge: -1,
                    ko: 2,
                    kk: 2
                },
                lifePoints: 12,
                endurance: 18,
                magicResistance: -4
            },
            automaticAdvantages: [
                "Dämmerungssicht",
                "Resistenz gegen mineralische Gifte",
                "Resistenz gegen Krankheiten",
                "Schwer zu verzaubern"
            ],
            automaticDisadvantages: [
                "Goldgier 5",
                "Unfähigkeit Schwimmen",
                "Zwergenwuchs"
            ],
            recommendedAdvantages: [
                "Ausdauernd",
                "Eisern",
                "Gutes Gedächtnis",
                "Hitzeresistenz",
                "Hohe Lebenskraft",
                "Hohe Magieresistenz",
                "Kampfrausch",
                "Richtungssinn",
                "Zäher Hund",
                "Zwergennase"
            ],
            recommendedDisadvantages: [
                "Blutrausch",
                "Jähzorn",
                "Lichtscheu",
                "Platzangst",
                "Unansehnlich"
            ],
            unsuitableAdvantages: [
                "Feenfreund",
                "Flink",
                "Herausragende Balance",
                "Herausragendes Aussehen",
                "Koboldfreund",
                "Magiegespür",
                "Schlangenmensch",
                "Wohlklang"
            ],
            unsuitableDisadvantages: [
                "Dunkelangst",
                "Glasknochen",
                "Krankheitsanfällig",
                "Nachtblind",
                "Raumangst"
            ],
            allowedCultures: [
                "Ambosszwerge"
            ],
            grantedTalents: [
                "Ringen: 1",
                "Akrobatik: -3",
                "Reiten: -1",
                "Schwimmen: -3",
                "Selbstbeherrschung: 2",
                "Zechen: 1",
                "Orientierung: 1",
                "Gesteinskunde: 1"
            ]
        }
    },
    {
        name: "Auelfen",
        type: "species",
        img: "icons/svg/mystery-man.svg",
        system: {
            description: "Die Herkunft der Elfen ist ein Mysterium; wahrscheinlich liegt ihr Ursprung in der sogenannten Lichtwelt außerhalb des bekannten Kosmos. Jeder Elf kann zaubern und ist in der Lage, eine besondere Form des zweistimmigen Gesangs hervorzubringen. Ihre Sinne sind meist besser ausgeprägt als die der Menschen, doch manche Nahrungs- und Genussmittel sind ihnen unverträglich.",
            notes: "Die allgemeinen Elfenangaben wurden hier mit den konkreten Werten der Auelfen kombiniert.",
            gpCost: 20,
            originDistribution: "Als aventurische Heimat der Elfen gelten die verwunschenen Wälder der Salamandersteine. Bedeutende Völker sind Waldelfen in den Salamandersteinen, Auelfen an Seen und Flussläufen in Nord- und Mittelaventurien, Firnelfen in den kalten Regionen des Nordens und Steppenelfen in den nördlichen Steppen. Auelfen leben selten in den Städten der Menschen.",
            appearance: "Der elfische Wuchs ist schlank und hoch gewachsen, ihre Bewegungen wirken auffallend elegant. Spitz zulaufende Ohren, große leicht schräg gestellte Augen in ungewöhnlichen Farben, hohe Wangenknochen und lange Hälse verstärken den exotischen Eindruck. Elfen haben keine Körperbehaarung, Elfenmänner tragen keinen Bart, und beide Geschlechter wirken oft androgyn. Frauen wie Männer tragen ihr Haar gern lang und offen.",
            hairColors: [
                { min: 1, max: 1, label: "blauschwarz" },
                { min: 2, max: 3, label: "schwarz" },
                { min: 4, max: 5, label: "silbern" },
                { min: 6, max: 7, label: "weißblond" },
                { min: 8, max: 11, label: "hellblond" },
                { min: 12, max: 17, label: "mittelblond" },
                { min: 18, max: 20, label: "dunkelblond" }
            ],
            eyeColors: [
                { min: 1, max: 2, label: "schwarzbraun" },
                { min: 3, max: 4, label: "graublau" },
                { min: 5, max: 8, label: "saphirblau" },
                { min: 9, max: 12, label: "smaragdgrün" },
                { min: 13, max: 16, label: "dunkelviolett" },
                { min: 17, max: 18, label: "Bernstein" },
                { min: 19, max: 19, label: "goldgesprenkelt" },
                { min: 20, max: 20, label: "Amethyst" }
            ],
            height: {
                base: 1.68,
                diceCount: 2,
                diceFaces: 20,
                step: 0.01,
                unit: "Schritt",
                formula: "1.68 + 2W20 * 0.01"
            },
            weight: {
                formula: "GroesseCm - 120",
                unit: "Stein"
            },
            modifiers: {
                characteristics: {
                    mu: 0,
                    kl: -1,
                    in: 1,
                    ch: 0,
                    ff: 0,
                    ge: 2,
                    ko: 0,
                    kk: -1
                },
                lifePoints: 6,
                endurance: 12,
                astralPoints: 12,
                magicResistance: -2
            },
            automaticAdvantages: [
                "Altersresistenz",
                "Dämmerungssicht",
                "Gut Aussehend",
                "Herausragender Sinn (Gehör, Geruch oder Sicht)",
                "Resistenz gegen Krankheiten",
                "Vollzauberer",
                "Wohlklang",
                "Zweistimmiger Gesang"
            ],
            automaticDisadvantages: [
                "Sensibler Geruchssinn 6",
                "Unfähigkeit Zechen"
            ],
            recommendedAdvantages: [
                "Balance",
                "Feenfreund",
                "Flink",
                "Herausragende Balance",
                "Herausragendes Aussehen",
                "Nachtsicht",
                "Richtungssinn",
                "Schlangenmensch"
            ],
            recommendedDisadvantages: [
                "Nahrungsrestriktion",
                "Raumangst"
            ],
            unsuitableAdvantages: [
                "Hitzeresistenz",
                "Kampfrausch",
                "Schwer zu verzaubern",
                "Zwergennase"
            ],
            unsuitableDisadvantages: [
                "Blutrausch",
                "Eingeschränkter Sinn",
                "Farbenblind",
                "Fettleibig",
                "Krankheitsanfällig",
                "Lichtscheu",
                "Nachtblind",
                "Unangenehme Stimme"
            ],
            allowedCultures: [
                "Auelfen"
            ],
            grantedTalents: [
                "Körperbeherrschung: 3",
                "Schleichen: 2",
                "Singen: 2",
                "Sinnenschärfe: 5",
                "Tanzen: 1",
                "Zechen: -2"
            ]
        }
    },
    {
        name: "Halbelfen",
        type: "species",
        img: "icons/svg/mystery-man.svg",
        system: {
            description: "Halbelfen sind elfische Mischlinge mit deutlichem Anteil menschlichen Blutes. Je nachdem, in welcher Familie sie groß geworden sind, fühlen sie sich dem menschlichen oder elfischen Erbe stärker verpflichtet, gehören aber oft in keiner der beiden Welten ganz dazu. Vielen Halbelfen fehlt der zweistimmige Gesang der Elfen, und auch die alte Elfensprache Asdharia können sie meist nicht so sprechen, dass Elfen sie als schön empfinden würden.",
            notes: "Halbelfen haben von Geburt an die magische Gabe. Ohne besondere Förderung werden sie meist zu Magiedilettanten und starten mit (MU+IN+CH)/2 - 6 AsP. In menschlichen Kulturen ist die Profession Magier für Halbelfen grundsätzlich 2 GP billiger. Ein bei Auelfen großgezogener Halbelf zahlt zusätzlich 8 GP und erhält statt Viertelzauberer den Vorteil Vollzauberer, +12 AsP statt -6 AsP, MR -2 statt MR -4 sowie Zweistimmiger Gesang.",
            gpCost: 3,
            originDistribution: "Halbelfen gibt es überall dort, wo es auch Elfen gibt. Vom Norden Aventuriens nach Süden werden sie immer seltener.",
            appearance: "Je nachdem, aus welcher Menschenrasse das menschliche Elternteil stammt, können Halbelfen sehr unterschiedlich aussehen. Gemeinsam sind ihnen große Augen in klaren Farben, ein recht schlanker Wuchs und leicht spitze Ohren. Allgemein werden Halbelfen von Menschen als sehr schön empfunden. Sie werden meist etwas älter als Menschen, ohne jedoch die Alterslosigkeit der Elfen zu besitzen.",
            hairColors: [
                { min: 1, max: 3, label: "rot" },
                { min: 4, max: 6, label: "braun" },
                { min: 7, max: 10, label: "dunkelblond" },
                { min: 11, max: 15, label: "hellblond" },
                { min: 16, max: 17, label: "weißblond" },
                { min: 18, max: 19, label: "schwarz" },
                { min: 20, max: 20, label: "blauschwarz" }
            ],
            eyeColors: [
                { min: 1, max: 3, label: "schwarz" },
                { min: 4, max: 6, label: "grau" },
                { min: 7, max: 10, label: "blau" },
                { min: 11, max: 14, label: "grün" },
                { min: 15, max: 16, label: "dunkelbraun" },
                { min: 17, max: 18, label: "hellbraun" },
                { min: 19, max: 19, label: "bernsteinfarben" },
                { min: 20, max: 20, label: "goldgesprenkelt" }
            ],
            height: {
                base: 1.58,
                diceCount: 0,
                diceFaces: 0,
                step: 0.01,
                unit: "Schritt",
                formula: "1.58 + 1W20 * 0.01 + 4W6 * 0.01"
            },
            weight: {
                formula: "GroesseCm - 120",
                unit: "Stein"
            },
            modifiers: {
                characteristics: {
                    mu: 0,
                    kl: 0,
                    in: 0,
                    ch: 0,
                    ff: 0,
                    ge: 1,
                    ko: 0,
                    kk: -1
                },
                lifePoints: 8,
                endurance: 10,
                astralPoints: -6,
                magicResistance: -4
            },
            automaticAdvantages: [
                "Gut Aussehend",
                "Viertelzauberer"
            ],
            automaticDisadvantages: [],
            recommendedAdvantages: [
                "Balance",
                "Dämmerungssicht",
                "Feenfreund",
                "Flink",
                "Herausragender Sinn",
                "Herausragendes Aussehen",
                "Magiegespür",
                "Schlangenmensch",
                "Wohlklang",
                "Zweistimmiger Gesang"
            ],
            recommendedDisadvantages: [
                "Nahrungsrestriktion (wie Elfen)",
                "Sensibler Geruchssinn"
            ],
            unsuitableAdvantages: [
                "Kampfrausch",
                "Zwergennase"
            ],
            unsuitableDisadvantages: [
                "Blutrausch",
                "Fettleibig",
                "Krankheitsanfällig",
                "Lichtscheu",
                "Nachtblind",
                "Schwer zu verzaubern",
                "Unangenehme Stimme"
            ],
            allowedCultures: [
                "Auelfen",
                "Andergast/Nostria",
                "Bornland",
                "Mittelländische Städte",
                "Horasreich"
            ],
            grantedTalents: [
                "Körperbeherrschung: 2",
                "Schleichen: 1",
                "Singen: 1",
                "Sinnenschärfe: 2",
                "Tanzen: 1",
                "Zechen: -1"
            ]
        }
    }
];
