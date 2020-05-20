import { TreeDataSource, Tree, TreeNode } from '@mazdik-lib/tree-lib';
import { TreeViewNode } from './tree-view-node';

function getTemplate(id: string) {
  return `
<div class="tree-header">
  <i class="dt-tree-icon dt-icon-shrink large" (click)="collapseAll()"></i>
  <i class="dt-tree-icon dt-icon-reload large" (click)="refresh()"></i>

  <div class="dt-clearable-input tree-filter-input">
    <input class="dt-input"
           placeholder="Search"
           #filterInput
           [value]="searchFilterText"
           (input)="searchFilterText = $event.target.value"
           (keyup)="onFilterKeyup()">
    <span class="dt-loader"
          style="top: 25%; cursor:auto;"
          [style.display]="filterLoading ? 'block' : 'none' ">
    </span>
    <span [style.display]="(searchFilterText?.length > 0 && !filterLoading) ? 'block' : 'none' "
          (click)="onClickClearSearch()">&times;</span>
  </div>
</div>
<div class="tree-body">
  <div *ngIf="loading" class="tree-loading-content"><i class="dt-loader"></i></div>
  <ul class="tree-container" id="treeContainer${id}" style="padding-left: 0;">
    <app-tree-view-node
      *ngFor="let node of nodes"
      [node]="node"
      [getIconFunc]="getIconFunc"
      (selectedChanged)="selectedChanged.emit($event)"
      (nodeRightClick)="onNodeRightClick($event)">
    </app-tree-view-node>
  </ul>
</div>
  `;
}

export class TreeViewComponent extends HTMLElement {

  get service(): TreeDataSource { return this.tree.service; }
  set service(val: TreeDataSource) {
    this.tree.service = val;
    this.tree.nodes = [];
  }

  get nodes(): TreeNode[] { return this.tree.nodes; }
  set nodes(val: TreeNode[]) {
    this.tree.nodes = val;
    this.render();
  }

  set serverSideFiltering(val: boolean) {
    this.tree.serverSideFiltering = val;
  }

  filterDelay = 500;
  getIconFunc: (node?: TreeNode) => string;

  get filterLoading(): boolean {
    return this.tree.filterLoading;
  }

  //@Output() selectedChanged: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
  private filterInput: HTMLInputElement;

  tree: Tree = new Tree();
  filterTimeout: any;
  loading: boolean;
  searchFilterText: any = null;

  private treeViewNodes: TreeViewNode[] = [];
  private treeContainer: HTMLElement;

  constructor() {
    super();
    const id = (~~(Math.random()*1e3)).toString();
    const template = document.createElement('template');
    template.innerHTML = getTemplate(id);
    this.appendChild(template.content.cloneNode(true));

    this.treeContainer = this.querySelector('#treeContainer'+id);
  }

  initGetNodes() {
    this.loading = true;
    this.tree.initLoadNodes().finally(() => { this.loading = false; });
  }

  onFilterKeyup() {
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.tree.filterTree(this.searchFilterText);
      this.filterTimeout = null;
    }, this.filterDelay);
  }

  onNodeRightClick(event) {
    const data = {originalEvent: event.event, data: event.node};
    this.dispatchEvent(new CustomEvent('nodeRightClick', {detail: data}));
  }

  collapseAll() {
    this.tree.collapseAll();
  }

  refresh() {
    this.nodes = [];
    this.initGetNodes();
    this.tree.selectedNode = null;
    this.filterInput.value = null;
  }

  onClickClearSearch() {
    this.searchFilterText = null;
    this.onFilterKeyup();
  }

  private render() {
    const fragment = document.createDocumentFragment();
    this.nodes.forEach(node => {
      const element = this.createTreeDom(node);
      fragment.appendChild(element);
    });
    this.treeContainer.appendChild(fragment);
  }

  private createTreeDom(node: TreeNode): HTMLElement {
    const treeViewNode = new TreeViewNode(node);
    if (node.hasChildren) {
      const childrenContainer = document.createElement('ul');
      childrenContainer.classList.add('tree-container');
      treeViewNode.element.appendChild(childrenContainer);
      //updateExpandedStyles(node.expanded, childrenContainer);

      node.children.forEach(childNode => {
        const dom = this.createTreeDom(childNode);
        childrenContainer.appendChild(dom);
      });
    }
    return treeViewNode.element;
  }

}

customElements.define('web-tree-view', TreeViewComponent);