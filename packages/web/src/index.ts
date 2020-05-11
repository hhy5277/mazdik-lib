import './styles/app.css';
import './styles/all.css';
import '@mazdik-lib/modal';
import '@mazdik-lib/nav-menu';
import { NavMenuComponent } from '@mazdik-lib/nav-menu';
import { Header } from './header';
import { Page } from './page';

class App {

  currentPage: Page = null;
  indexPageTitle: string = document.title;
  header: Header;
  main: HTMLElement;
  navMenu: NavMenuComponent;

  constructor() {
    this.header = new Header();
    this.main = document.querySelector('main');
    this.navMenu = document.querySelector('#nav-menu');
    this.navMenu.nodes = this.getNavMenuNodes();

    const page = location.hash.slice(1) || 'modal-basic';
    this.setPage(page, '');
    this.navMenu.ensureVisible(page);

    this.navMenu.addEventListener('linkClicked', (event: CustomEvent) => {
      this.destroy(this.currentPage);
      this.setPage(event.detail.id, event.detail.name);
    });
  }

  async setPage(name: string, title: string) {
    try {
      const module = await import(`./pages/${name}.ts`);
      history.replaceState({}, `${title}`, `/#${name}`);
      this.currentPage = new module.default;
      this.main.innerHTML = this.currentPage.template;
      this.currentPage.load();
      document.title = title ? title + ' - ' + this.indexPageTitle : this.indexPageTitle;
      this.header.state = name;
    } catch (error) {
      this.main.textContent = error.message;
    }
  }

  private destroy(page: Page) {
    if (page && typeof page.onDestroy === "function") {
      page.onDestroy();
    }
  }

  private getNavMenuNodes(): any[] {
    return [
      {
        name: 'Modal',
        children: [
          { id: 'modal-basic', name: 'Basic modal' },
          { id: 'modal-nested', name: 'Nested modals' },
          { id: 'modal-panels', name: 'Panels' },
        ]
      },
      {
        name: 'Base',
        expanded: true,
        children: [
          { id: 'select-list', name: 'Select list' },
          { id: 'dropdown-select', name: 'Dropdown select' },
          { id: 'resizable', name: 'Resizable' },
          { id: 'draggable', name: 'Draggable' },
          { id: 'drag-drop', name: 'Drag and drop' },
          { id: 'context-menu', name: 'Context menu' },
          { id: 'dropdown', name: 'Dropdown' },
          { id: 'inline-edit', name: 'Inline edit' },
          { id: 'nav-menu', name: 'Navigation menu' },
        ]
      },
    ];
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
