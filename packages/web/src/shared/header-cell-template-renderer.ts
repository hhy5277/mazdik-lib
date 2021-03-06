import { DataTable, TemplateRenderer, TemplateContext, FilterOperator, Column } from '@mazdik-lib/data-table';
import { Listener } from '@mazdik-lib/common';

export class HeaderCellTemplateRenderer implements TemplateRenderer {

  private elements = new Map<Column, DocumentFragment>();
  private listeners: Listener[] = [];

  create(context: TemplateContext): DocumentFragment {
    const { table, column } = context;

    const fragment = document.createDocumentFragment();

    const imgAsm = document.createElement('img');
    imgAsm.classList.add('dt-pointer', 'dt-template-demo-img');
    imgAsm.src = 'assets/asmodian.png';
    imgAsm.title = 'ASMODIANS';
    fragment.append(imgAsm);

    const strong = document.createElement('strong');
    strong.classList.add('dt-pointer');
    strong.title = table.messages.clearFilters;
    strong.textContent = column.title;
    fragment.append(strong);

    const imgEly = document.createElement('img');
    imgEly.classList.add('dt-pointer', 'dt-template-demo-img');
    imgEly.src = 'assets/elyos.png';
    imgEly.title = 'ELYOS';
    fragment.append(imgEly);

    this.addListener({
      eventName: 'click',
      target: imgAsm,
      handler: this.onClickRaceFilter.bind(this, table, 'ASMODIANS')
    });
    this.addListener({
      eventName: 'click',
      target: strong,
      handler: this.onClickRaceFilter.bind(this, table, null)
    });
    this.addListener({
      eventName: 'click',
      target: imgEly,
      handler: this.onClickRaceFilter.bind(this, table, 'ELYOS')
    });

    this.elements.set(column, fragment);
    return fragment;
  }

  destroy() {
    this.removeEventListeners();
    this.elements.clear();
  }

  refresh(context: TemplateContext) {
    const { table, column } = context;
    const element = this.elements.get(column);
  }

  private addListener(listener: Listener) {
    this.listeners.push(listener);
    listener.target.addEventListener(listener.eventName, listener.handler);
  }

  private removeEventListeners() {
    this.listeners.forEach(x => {
      x.target.removeEventListener(x.eventName, x.handler);
    });
  }

  private onClickRaceFilter(table: DataTable, value: string) {
    table.dataFilter.setFilter(value, 'race', FilterOperator.EQUALS);
    table.events.emitFilter();
  }

}
