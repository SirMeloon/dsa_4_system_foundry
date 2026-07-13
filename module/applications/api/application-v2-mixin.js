const { HandlebarsApplicationMixin } = foundry.applications.api;

export default function ApplicationV2Mixin(Base) {
    return class DSA41ApplicationV2 extends HandlebarsApplicationMixin(Base) {
        static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS ?? {}, {
            classes: ["dsa41-v2"],
            form: {
                submitOnChange: true
            },
            position: {
                width: 760,
                height: 760
            },
            window: {
                resizable: true
            }
        });

        static TABS = [];

        #activeTabs = new Map();

        _getTabDefinitions() {
            return this.constructor.TABS ?? [];
        }

        _getActiveTab(group = "primary") {
            if (!this.#activeTabs.has(group)) {
                const tabs = this._getTabDefinitions();
                const first = tabs[0]?.id ?? tabs[0]?.tab ?? null;
                this.#activeTabs.set(group, first);
            }
            return this.#activeTabs.get(group);
        }

        _setActiveTab(tab, group = "primary") {
            this.#activeTabs.set(group, tab);
        }

        _prepareTabsContext(group = "primary") {
            const active = this._getActiveTab(group);
            return this._getTabDefinitions()
                .filter((tab) => tab.condition ? tab.condition.call(this) : true)
                .map((tab) => ({
                    id: tab.id ?? tab.tab,
                    label: game.i18n.localize(tab.label),
                    active: (tab.id ?? tab.tab) === active
                }));
        }

        async _prepareContext(options) {
            const context = await super._prepareContext(options);
            context.config = CONFIG.DSA41;
            context.tabs = this._prepareTabsContext();
            context.activeTab = this._getActiveTab();
            return context;
        }

        _onRender(context, options) {
            super._onRender(context, options);
            this.element.querySelectorAll("[data-tab]").forEach((button) => {
                button.addEventListener("click", (event) => {
                    event.preventDefault();
                    const tab = event.currentTarget.dataset.tab;
                    if (!tab) return;
                    this._setActiveTab(tab);
                    this.render(false);
                });
            });
        }
    };
}
