import { Page } from '../page';
import { DragToScroll } from '@mazdik-lib/drag-to-scroll';

export default class DragToScrollDemo implements Page {

  get template(): string {
    return `<div class="drag-to-scroll-demo">
    <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div>
    <div>9</div><div>10</div><div>11</div><div>12</div><div>13</div><div>14</div><div>15</div><div>16</div>
  </div>`;
  }

  private dragToScroll: DragToScroll;

  load() {
    const element = document.querySelector('.drag-to-scroll-demo') as HTMLElement;
    this.dragToScroll = new DragToScroll(element, { dragX: true, dragY: true });
  }

  onDestroy() {
    this.dragToScroll.destroy();
  }

}
