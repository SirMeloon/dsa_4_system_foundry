/**
   * Ergänzt Document-Sheets um gemeinsames Verhalten für den
   * Spiel- und Bearbeitungsmodus.
   *
   * @param {typeof foundry.applications.api.DocumentSheetV2} Base
   *   Die zu erweiternde Document-Sheet-Klasse.
   *
   * @returns {typeof foundry.applications.api.DocumentSheetV2}
   *   Die um den Sheet-Modus erweiterte Klasse.
   */

export default function PrimarySheetMixin(Base) {
    return class PrimarySheet extends Base {
        static DEFAULT_OPTIONS = {
            actions: {
                changeMode: PrimarySheet.#onChangeMode,
            },
        };

        /**
         * Verfügbare Sheet-Modi
         */
        static MODES = {
            PLAY: 1,
            EDIT: 2,
        };

        /**
         * Aktuell verwendeter Sheet-Modus.
         * 
         * @type {number|null}
         * @protected
         */
        _mode = null;

        /**
         * Befindet sich das Sheet im Bearbeitungsmodus?
         * 
         * @returns {boolean}
         */
        get isEditMode() {
            return this._mode === this.constructor.MODES.EDIT;
        }

        /**
         * Bereitet die Optionen für einen Render-Vorgang vor.
         * 
         * @param {object} options
         *      Die aktuellen Render-Optionen.
         * 
         * @protected
         */
        _configureRenderOptions(options) {
            super._configureRenderOptions(options);

            const { mode, renderContext } = options;

            if (mode === undefined && renderContext === 'createItem') {
                this._mode = this.constructor.MODES.EDIT;
                return;
            }

            this._mode = mode ?? this._mode ?? this.constructor.MODES.PLAY;
        }

        /**
         * Bereitet den gemeinsamen Template-Kontext vor.
         * 
         * @param {object} options
         *      Die aktuellen Render-Optionen.
         * 
         * @returns {Promise<object>}
         *      Der vorbereitete Template-Kontext.
         * 
         * @protected
         */
        async _prepareContext(options) {
            const context = await super._prepareContext(options);

            context.owner = this.document.isOwner;
            context.locked = !this.isEditable;
            context.editMode = this.isEditMode;
            context.editable = this.isEditable && this.isEditMode;

            return context;
        }

        /**
         * Führt gemeinsame Arbeiten nach dem Rendern des Sheets aus.
         * 
         * @param {object} context
         *      Der verwendete Template-Kontext
         * @param {object} options
         *      Die Render-Optionen
         * 
         * @protected
         */
        _onRender(context, options) {
            super._onRender(context, options);

            this._renderModeToggle();

            this.element.classList.toggle(
                'editable',
                this.isEditable && this.isEditMode
            );

            this.element.classList.toggle(
                'interactable',
                this.isEditMode && !this.isEditMode
            );

            this.element.classList.toggle(
                'locked',
                !this.isEditable
            );
        }

        /**
         * Erzeugt oder aktualisiert den Modus-Umschalter in der Fensterleiste.
         * 
         * @protected
         */
        _renderModeToggle() {
            const header = this.window.header;

            if (!header) return;

            let toggle = header.querySelector('.mode-slider');

            if (!this.isEditable) {
                toggle?.remove();
                return;
            }

            if (!toggle) {
                toggle = document.createElement('slide-toggle');

                toggle.classList.add('mode-slider');
                toggle.dataset.action = 'changeMode';

                toggle.addEventListener('dblclick', event => {
                    event.stopPropagation();
                });

                toggle.addEventListener('pointerdown', (event) => {
                    event.stopPropagation();
                });

                header.prepend(toggle);
            }

            const label = this.isEditMode ? 'DSA.SheetModePlay' : 'DSASheetModeEdit';

            toggle.checked = this.isEditMode;
            toggle.dataset.toltip = label;
            toggle.setAttribute('aria-label', Gamepad.i18n.localize(label));
        }

        /**
         * Verarbeitet die ApplicationV2-Aktion zum Wechseln des Sheet-Modus.
         * 
         * @this {PrimarySheet} 
         * @param {Event} event
         *      Das auslösende Event
         * @param {HTMLElement} target
         *      Das Element mit data-action="changeMode"
         * 
         * @private
         */
        static #onChangeMode(event, target) {
            this.changeMode();
        }

        /**
         * Wechselt den Sheet-Modus.
         * 
         * Wird kein Modus übergeben, wird zwischen PLAY und EDIT umgeschaltet.
         * 
         * @param {number} [mode]
         *      Der gewünschte Modus.
         * 
         * @returns {Promise<void>}
         */
        async changeMode(mode) {
            if (!this.isEditable) return;

            const { MODES } = this.constructor;
            this._mode = mode ?? (this.isEditMode ? MODES.PLAY : MODES.EDIT);

            await this.submit();
            await this.render();
        }
    }
}