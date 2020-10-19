import { InputOptionComponent } from './input-option.component';
import '@mazdik-lib/dropdown-select';
import { DropdownSelectComponent } from '@mazdik-lib/dropdown-select';

export class SelectDropdownComponent extends InputOptionComponent {

  private dropdownSelect: DropdownSelectComponent;

  constructor() {
    super();
    this.dropdownSelect = document.createElement('web-dropdown-select') as DropdownSelectComponent;
  }

  onInit() {
    super.onInit();
    this.label.after(this.dropdownSelect);

    window.customElements.whenDefined('web-dropdown-select').then(() => {
      this.dropdownSelect.settings = {
        placeholder: this.dynElement.selectPlaceholder,
        searchMessage: this.dynElement.searchInputPlaceholder,
        multiple: this.dynElement.multiple,
      };
      this.dropdownSelect.options = this.getOptions();
      this.dropdownSelect.value = this.value;
    });

    this.addEventListeners();
  }

  onDisabled(val: boolean) {
    super.onDisabled(val);
    // TODO
    window.customElements.whenDefined('web-dropdown-select').then(() => {
      this.dropdownSelect.settings = {
        disabled: val
      };
    });
  }

  onLoadOptions() {
    super.onLoadOptions();
    window.customElements.whenDefined('web-dropdown-select').then(() => {
      this.dropdownSelect.options = this.getOptions();
    })
  }

  private addEventListeners() {
    this.listeners = [
      {
        eventName: 'valueChange',
        target: this.dropdownSelect,
        handler: this.onInput.bind(this)
      },
    ];
    this.listeners.forEach(x => {
      x.target.addEventListener(x.eventName, x.handler);
    })
  }

  private onInput(event: CustomEvent) {
    this.value = event.detail;
  }

}
