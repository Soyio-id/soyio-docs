import * as d3 from 'd3';
import { DataAccessor, TreeNode } from '../types';
import styles from '../styles/tooltip.module.css';

export class VisTooltip {
  private tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, undefined>;

  constructor() {
    this.tooltip = d3.select('body')
      .append('div')
      .attr('class', styles.tooltip) as d3.Selection<HTMLDivElement, unknown, HTMLElement, undefined>;
  }

  show({ accessor, d, path = [] }: {
    accessor: DataAccessor;
    d: TreeNode;
    path?: TreeNode[]
  }): void {
    const name = accessor.name(d);
    const description = accessor.description(d);
    const hierarchy = path.length > 0
      ? path.map(node => accessor.name(node)).join(' > ')
      : accessor.name(d);
    const key = accessor.id(d);

    this.tooltip
      .style('visibility', 'visible')
      .html(`
        <div>
          <div class="${styles.tooltipTitle}">${name}</div>
          <div class="${styles.tooltipSection}">
            <h6 class="${styles.tooltipSectionTitle}">Hierarchy</h6>
            <div class="${styles.tooltipHierarchyContent}">${hierarchy}</div>
          </div>
          ${description ? `
            <div class="${styles.tooltipSection}">
              <h6 class="${styles.tooltipSectionTitle}">Description</h6>
              <div class="${styles.tooltipContent}">${description}</div>
            </div>
          ` : ''}
          <div class="${styles.tooltipSection}">
            <h6 class="${styles.tooltipSectionTitle}">Key</h6>
            <div class="${styles.tooltipKey}">${key}</div>
          </div>
        </div>
      `);
  }

  hide(): void {
    this.tooltip.style('visibility', 'hidden');
  }

  move(event: MouseEvent): void {
    const tooltipNode = this.tooltip.node();
    if (!tooltipNode) return;

    const tooltipRect = tooltipNode.getBoundingClientRect();
    const margin = 10;

    let left = event.pageX + margin;
    let top = event.pageY + margin;

    if (left + tooltipRect.width > window.innerWidth) {
      left = event.pageX - tooltipRect.width - margin;
    }
    if (top + tooltipRect.height > window.innerHeight) {
      top = event.pageY - tooltipRect.height - margin;
    }

    this.tooltip
      .style('left', `${left}px`)
      .style('top', `${top}px`);
  }

  destroy(): void {
    this.tooltip.remove();
  }
}
