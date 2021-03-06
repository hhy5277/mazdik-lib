import { CellEventArgs } from './types';
import { isBlank, findAncestor } from '@mazdik-lib/common';

export class EventHelper {

  static findCellEventTarget(event: any, element: HTMLElement): HTMLElement {
    let target = event.target;
    while (target && target !== element) {
      if (target.classList.contains('datatable-body-cell')) {
        break;
      }
      target = target.parentNode;
    }
    if (target === element) {
      return;
    }
    return target;
  }

  static findCellEvent(event: any, element: HTMLElement): CellEventArgs {
    const target = this.findCellEventTarget(event, element);
    if (target) {
      const dataColIndex = target.dataset.columnIndex;
      const dataRowIndex = target.dataset.rowIndex;
      if (!isBlank(dataColIndex) && !isBlank(dataRowIndex)) {
        const columnIndex = parseInt(dataColIndex, 10);
        const rowIndex = parseInt(dataRowIndex, 10);
        return { columnIndex, rowIndex, event, fromCell: target } as CellEventArgs;
      }
    }
  }

  static getRowPosition(event: Event, virtualScroll: boolean = false) {
    const rowElement = findAncestor(event.target, '.datatable-body-row');
    let top = rowElement.offsetTop + rowElement.offsetHeight;
    const cell = findAncestor(event.target, '.datatable-body-cell');
    let left = cell ? cell.offsetLeft : 0;
    const wrapper = findAncestor(event.target, '.datatable-wrapper');

    const prevElement = wrapper ? wrapper.previousElementSibling : null;
    if (prevElement && prevElement.classList.contains('dt-toolbar')) {
      top += prevElement.offsetHeight;
    }
    const datatable = findAncestor(event.target, '.datatable');

    const header = datatable.querySelector('.datatable-header');
    if (header) {
      top += header.offsetHeight;
    }
    const scroller = datatable;
    const scrollTop = scroller ? scroller.scrollTop : 0;
    const scrollLeft = scroller ? scroller.scrollLeft : 0;
    left -= scrollLeft;
    if (virtualScroll) {
      top -= scrollTop ? 17 : 0;
    } else {
      top -= scrollTop;
    }
    return {left, top};
  }

  static getColumnPosition(event: MouseEvent, menuWidth: number, isLast: boolean = false) {
    const colElement = findAncestor(event.target, '.datatable-header-cell');
    const header = findAncestor(event.target, '.datatable-header');
    const top = header.offsetHeight;
    let left = colElement.offsetLeft;

    const datatable = findAncestor(event.target, '.datatable');
    const scroller = datatable;
    const scrollLeft = scroller ? scroller.scrollLeft : 0;
    left -= scrollLeft;
    if ((event.pageX + 1 + menuWidth - document.body.scrollLeft > window.innerWidth) || isLast) {
      left = left + colElement.offsetWidth - menuWidth;
    }
    return {left, top};
  }

}
