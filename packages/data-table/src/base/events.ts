import { Subject, BehaviorSubject } from 'rxjs';
import { ColumnMenuEventArgs, CellEventArgs, CellEventType } from './types';

export class Events {

  element: HTMLElement;

  readonly selectionSource = new Subject();
  private readonly sortSource = new Subject();
  private readonly filterSource = new Subject();
  private readonly pageSource = new Subject();
  private readonly columnMenuSource = new Subject<ColumnMenuEventArgs>();
  private readonly resizeBeginSource = new Subject();
  private readonly resizeSource = new Subject<any>();
  private readonly resizeEndSource = new Subject();
  private readonly rowsChanged = new Subject();
  private readonly scrollSource = new Subject<any>();
  private readonly loadingSource = new BehaviorSubject<boolean>(false);
  private readonly checkboxSource = new Subject<any>();
  private readonly cellSource = new Subject<CellEventArgs>();

  readonly sortSource$ = this.sortSource.asObservable();
  readonly filterSource$ = this.filterSource.asObservable();
  readonly selectionSource$ = this.selectionSource.asObservable();
  readonly pageSource$ = this.pageSource.asObservable();
  readonly columnMenuSource$ = this.columnMenuSource.asObservable();
  readonly resizeBeginSource$ = this.resizeBeginSource.asObservable();
  readonly resizeSource$ = this.resizeSource.asObservable();
  readonly resizeEndSource$ = this.resizeEndSource.asObservable();
  readonly rowsChanged$ = this.rowsChanged.asObservable();
  readonly scrollSource$ = this.scrollSource.asObservable();
  readonly loadingSource$ = this.loadingSource.asObservable();
  readonly checkboxSource$ = this.checkboxSource.asObservable();
  readonly cellSource$ = this.cellSource.asObservable();

  constructor() {
    this.element = document.createElement('div');
  }

  onSort() {
    this.sortSource.next();
    this.element.dispatchEvent(new CustomEvent('sort'));
  }

  onFilter() {
    this.filterSource.next();
    this.element.dispatchEvent(new CustomEvent('filter'));
  }

  onSelectionChange() {
    this.selectionSource.next();
    this.element.dispatchEvent(new CustomEvent('selection'));
  }

  onPage() {
    this.pageSource.next();
  }

  onColumnMenuClick(data: ColumnMenuEventArgs) {
    this.columnMenuSource.next(data);
    this.element.dispatchEvent(new CustomEvent('columnMenu', { detail: data }));
  }

  onResizeBegin() {
    this.resizeBeginSource.next();
    this.element.dispatchEvent(new CustomEvent('resizeBegin'));
  }

  onResize(data: any) {
    this.resizeSource.next(data);
    this.element.dispatchEvent(new CustomEvent('resize'));
  }

  onResizeEnd() {
    this.resizeEndSource.next();
    this.element.dispatchEvent(new CustomEvent('resizeEnd'));
  }

  onRowsChanged() {
    this.rowsChanged.next();
    this.element.dispatchEvent(new CustomEvent('rowsChanged'));
  }

  onScroll(data: any) {
    this.scrollSource.next(data);
    this.element.dispatchEvent(new CustomEvent('scroll'));
  }

  onLoading(data: boolean) {
    this.loadingSource.next(data);
    this.element.dispatchEvent(new CustomEvent('loading', { detail: data }));
  }

  onCheckbox(data: any) {
    this.checkboxSource.next(data);
    this.element.dispatchEvent(new CustomEvent('checkbox', { detail: data }));
  }

  onCell(data: CellEventArgs) {
    this.cellSource.next(data);
    this.element.dispatchEvent(new CustomEvent('cell', { detail: data }));
  }

  onMouseover(data: CellEventArgs) {
    data.type = CellEventType.Mouseover;
    this.onCell(data);
  }

  onMouseout(data: CellEventArgs) {
    data.type = CellEventType.Mouseout;
    this.onCell(data);
  }

  onActivateCell(data: CellEventArgs) {
    data.type = CellEventType.Activate;
    this.onCell(data);
  }

  onClickCell(data: CellEventArgs) {
    data.type = CellEventType.Click;
    this.onCell(data);
  }

  onDblClickCell(data: CellEventArgs) {
    data.type = CellEventType.DblClick;
    this.onCell(data);
  }

  onKeydownCell(data: CellEventArgs) {
    data.type = CellEventType.Keydown;
    this.onCell(data);
  }

  onContextMenu(data: CellEventArgs) {
    data.type = CellEventType.ContextMenu;
    this.onCell(data);
  }

  onCellEditMode(data: CellEventArgs) {
    data.type = CellEventType.EditMode;
    this.onCell(data);
  }

  onCellValueChanged(data: CellEventArgs) {
    data.type = CellEventType.ValueChanged;
    this.onCell(data);
  }

}
