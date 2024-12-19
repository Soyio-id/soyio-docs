import * as d3 from 'd3';
import { VisTooltip } from './VisTooltip';
import { ChartConstructorParams, DataAccessor, TreeNode } from '../types';

export class VisBaseChart {
  protected svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  protected g: d3.Selection<SVGGElement, unknown, null, undefined>;
  protected accessor: DataAccessor;
  protected tooltip: VisTooltip;
  protected width: number;
  protected height: number;
  protected margin = { top: 40, right: 40, bottom: 40, left: 40 };

  constructor({ el, accessor, tooltip }: ChartConstructorParams) {
    this.svg = d3.select(el);
    this.accessor = accessor;
    this.tooltip = tooltip;

    // Get dimensions
    const rect = el.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;

    // Create main group
    this.g = this.svg.append('g');
  }

  destroy(): void {
    this.svg.selectAll('*').remove();
  }

  protected handleMouseOver(event: MouseEvent, d: TreeNode, path: TreeNode[] = []): void {
    this.tooltip.show({ accessor: this.accessor, d, path });
    this.tooltip.move(event);
  }

  protected handleMouseMove(event: MouseEvent): void {
    this.tooltip.move(event);
  }

  protected handleMouseOut(): void {
    this.tooltip.hide();
  }
}
