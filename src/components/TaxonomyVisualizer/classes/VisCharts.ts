import * as d3 from 'd3';
import { VisBaseChart } from './VisBase';
import { TreeNode, UpdateDataParams } from '../types';
import styles from '../styles/visualization.module.css';

export class VisRadialTree extends VisBaseChart {
  private link!: d3.Selection<SVGPathElement, d3.HierarchyPointLink<TreeNode>, SVGGElement, unknown>;
  private node!: d3.Selection<SVGCircleElement, d3.HierarchyPointNode<TreeNode>, SVGGElement, unknown>;
  private labelText!: d3.Selection<SVGGElement, d3.HierarchyPointNode<TreeNode>, SVGGElement, unknown>;

  updateData({ data, color }: UpdateDataParams): void {
    const diameter = this.width - 200; // Leave some padding
    this.svg
      .attr('height', diameter)
      .style('height', `${diameter}px`);

    const radius = (diameter / 2)-100;

    const tree = d3.tree<TreeNode>()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

    const root = tree(data);

    this.g.selectAll('*').remove();
    this.g.attr('transform', `translate(${this.width / 2},${diameter / 2})`);

    // Create links
    this.link = (this.g.append('g')
      .attr('class', 'links-g')
      .attr('fill', 'none')
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('d', d3.linkRadial<d3.HierarchyLink<TreeNode>, d3.HierarchyNode<TreeNode>>()
        .angle(d => d.x ?? 0)
        .radius(d => d.y ?? 0))
      .attr('stroke', ({ target }) => {
        let node = target;
        while (node.depth > 1) node = node.parent!;
        return color(this.accessor.colorKey(node.data));
      })
      .attr('stroke-width', 1)
    ) as d3.Selection<SVGPathElement, d3.HierarchyPointLink<TreeNode>, SVGGElement, unknown>;

    // Create nodes
    this.node = (this.g.append('g')
      .attr('class', 'nodes-g')
      .selectAll('circle')
      .data(root.descendants().filter(d => d.depth !== 0))
      .join('circle')
      .attr('class', 'node')
      .attr('transform', d => `
        rotate(${(d.x * 180 / Math.PI - 90)})
        translate(${d.y},0)
      `)
      .attr('r', 4)
      .attr('fill', d => {
        let node = d;
        while (node.depth > 1) node = node.parent!;
        return color(this.accessor.colorKey(node.data));
      })
      .attr('stroke', 'transparent')
      .attr('stroke-width', 16)
      .on('mouseover', this.handleNodeMouseOver.bind(this))
      .on('mousemove', this.handleMouseMove.bind(this))
      .on('mouseout', this.handleNodeMouseOut.bind(this))
    ) as d3.Selection<SVGCircleElement, d3.HierarchyPointNode<TreeNode>, SVGGElement, unknown>;

    // Create labels
    this.labelText = (this.g.append('g')
      .attr('class', 'labels-g')
      .selectAll('g')
      .data(root.descendants().filter(d => d.depth !== 0))
      .join('g')
      .attr('class', 'label-text')
      .attr('transform', d => `
        rotate(${(d.x * 180 / Math.PI - 90)})
        translate(${d.y},0)
        rotate(${d.x >= Math.PI ? 180 : 0})
      `)
      .on('mouseover', this.handleNodeMouseOver.bind(this))
      .on('mousemove', this.handleMouseMove.bind(this))
      .on('mouseout', this.handleNodeMouseOut.bind(this))
    ) as d3.Selection<SVGGElement, d3.HierarchyPointNode<TreeNode>, SVGGElement, unknown>;

    this.labelText.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
      .text(d => this.accessor.name(d.data))
      .attr('class', styles.labelText);
  }

  private handleNodeMouseOver(event: MouseEvent, d: d3.HierarchyNode<TreeNode>): void {
    const ancestors = d.ancestors();
    const ancestorSet = new Set(ancestors);

    // First raise the links group
    this.g.select('.links-g').raise();

    // Then raise the nodes group
    this.g.select('.nodes-g').raise();

    // Finally raise the labels group
    this.g.select('.labels-g').raise();

    // Handle links highlighting
    this.link
      .classed('is-highlighted', ({ source, target }) =>
        ancestorSet.has(source) && ancestorSet.has(target)
      )
      .style('stroke', ({ source, target }) =>
        ancestorSet.has(source) && ancestorSet.has(target)
          ? '#2196F3' // Highlight color for the path
          : null
      )
      .style('stroke-width', ({ source, target }) =>
        ancestorSet.has(source) && ancestorSet.has(target)
          ? '3px' // Highlight color for the path
          : null
      )
      .filter(({ source, target }) => ancestorSet.has(source) && ancestorSet.has(target))
      .raise();

    // Handle nodes highlighting
    this.node
      .classed('is-highlighted', node => ancestorSet.has(node))
      .style('fill', node =>
        node === d
          ? '#2196F3' // Highlight color for selected node
          : ancestorSet.has(node)
            ? null // Keep original color for ancestors
            : null
      )
      .filter(node => ancestorSet.has(node))
      .raise();

    // Handle labels highlighting
    this.labelText
      .classed('is-highlighted', node => ancestorSet.has(node))
      .style('font-weight', node =>
        node === d ? 'bold' : 'normal'
      )
      .filter(node => ancestorSet.has(node))
      .raise();

    this.handleMouseOver(event, d.data, ancestors.slice(0, -1).map(n => n.data).reverse());
  }

  private handleNodeMouseOut(): void {
    this.link
      .classed('is-highlighted', false)
      .style('stroke', null);

    this.node
      .classed('is-highlighted', false)
      .style('fill', null);

    this.labelText
      .classed('is-highlighted', false)
      .style('font-weight', 'normal');

    this.handleMouseOut();
  }
}

export class VisSunburst extends VisBaseChart {
  private path!: d3.Selection<SVGPathElement, d3.HierarchyRectangularNode<TreeNode>, SVGGElement, unknown>;
  private label!: d3.Selection<SVGGElement, d3.HierarchyRectangularNode<TreeNode>, SVGGElement, unknown>;

  updateData({ data, color }: UpdateDataParams): void {
    // Make height equal to width for proper circular layout
    this.svg
      .attr('height', this.width)
      .style('height', `${this.width}px`);

    // Reduce padding by using a larger portion of the width
    const radius = (this.width / 2) - 10;

    const partition = d3.partition<TreeNode>()
      .size([2 * Math.PI, radius]);

    const root = partition(data.sum(() => 1));

    this.g.selectAll('*').remove();
    this.g.attr('transform', `translate(${this.width / 2},${this.width / 2})`);

    const arc = d3.arc<d3.HierarchyRectangularNode<TreeNode>>()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(0.002)
      .padRadius(radius / 2)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1 - 1);

    // Create paths
    this.path = (this.g.append('g')
      .attr('class', 'paths-g')
      .selectAll('path')
      .data(root.descendants().filter(d => d.depth))
      .join('path')
      .attr('class', 'path')
      .attr('fill', d => {
        let node = d;
        while (node.depth > 1) node = node.parent!;
        return color(this.accessor.colorKey(node.data));
      })
      .attr('fill-opacity', 0.8)
      .attr('d', arc)
      .on('mouseover', this.handlePathMouseOver.bind(this))
      .on('mousemove', this.handleMouseMove.bind(this))
      .on('mouseout', this.handlePathMouseOut.bind(this))
    ) as d3.Selection<SVGPathElement, d3.HierarchyRectangularNode<TreeNode>, SVGGElement, unknown>;

    // Create labels
    this.label = (this.g.append('g')
      .attr('class', 'labels-g')
      .selectAll('g')
      .data(root.descendants().filter(d => d.depth && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03))
      .join('g')
      .attr('class', 'label-text')
      .attr('transform', d => {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `
          rotate(${x - 90})
          translate(${y},0)
          rotate(${x < 180 ? 0 : 180})
        `;
      })
      .on('mouseover', (this.handlePathMouseOver as (event: MouseEvent, d: d3.HierarchyNode<TreeNode>) => void).bind(this))
      .on('mousemove', this.handleMouseMove.bind(this))
      .on('mouseout', this.handlePathMouseOut.bind(this))
    ) as d3.Selection<SVGGElement, d3.HierarchyRectangularNode<TreeNode>, SVGGElement, unknown>;

    this.label.append('text')
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => this.accessor.name(d.data))
      .attr('class', styles.sunburstLabel);
  }

  private handlePathMouseOver(event: MouseEvent, d: d3.HierarchyRectangularNode<TreeNode>): void {
    // Get ancestors but exclude root node
    const ancestors = d.ancestors().slice(1); // Skip root
    const ancestorSet = new Set(ancestors);

    // First raise the paths group
    this.g.select('.paths-g').raise();

    // Then raise the labels group
    this.g.select('.labels-g').raise();

    this.path
      .attr('fill-opacity', node => {
        if (node === d) return 1; // Selected node
        if (ancestorSet.has(node)) return 0.8; // Ancestor nodes
        return 0.3; // Other nodes
      })
      .style('fill', node => {
        if (node === d) return '#2196F3'; // Selected node in blue
        if (ancestorSet.has(node)) return null; // Keep original color for ancestors
        return null; // Keep original color for others
      })
      .style('stroke', node => {
        if (node === d || ancestorSet.has(node)) return '#2196F3';
        return null;
      })
      .style('stroke-width', node => {
        if (node === d || ancestorSet.has(node)) return '2px';
        return null;
      });

    // Raise the selected path and its ancestors
    this.path
      .filter(node => node === d || ancestorSet.has(node))
      .each((_, i, nodes) => {
        d3.select(nodes[i]).raise();
      });

    this.label
      .style('font-weight', node =>
        node === d ? 'bold' : 'normal'
      )
      .style('opacity', node =>
        node === d || ancestorSet.has(node) ? 1 : 0.3
      )
      .filter(node => node === d || ancestorSet.has(node))
      .each((_, i, nodes) => {
        d3.select(nodes[i]).raise();
      });

    // Pass ancestors without the root node
    this.handleMouseOver(event, d.data, ancestors.map(n => n.data).reverse());
  }

  private handlePathMouseOut(): void {
    this.path
      .attr('fill-opacity', 0.8)
      .style('fill', null)
      .style('stroke', null)
      .style('stroke-width', null);

    this.label
      .style('font-weight', 'normal')
      .style('opacity', 1);

    this.handleMouseOut();
  }
}

export class VisTree extends VisBaseChart {
  private link!: d3.Selection<SVGPathElement, d3.HierarchyPointLink<TreeNode>, SVGGElement, unknown>;
  private node!: d3.Selection<SVGGElement, d3.HierarchyPointNode<TreeNode>, SVGGElement, unknown>;

  updateData({ data, color }: UpdateDataParams): void {
    const padding = 80;

    // Calculate maximum width based on tree depth
    const maxDepth = Math.max(d3.max(data.descendants(), d => d.depth) ?? 0, 1);
    const widthPerLevel = 200;
    const maxWidth = Math.min(
      this.width - this.margin.left - this.margin.right - (padding * 2),
      maxDepth * widthPerLevel
    );

    // Calculate height based on number of nodes
    const nodeCount = data.descendants().length;
    const minHeight = 400;
    const maxHeight = 1200;
    const nodeSpacing = 52;
    const calculatedHeight = Math.min(maxHeight, Math.max(minHeight, nodeCount * nodeSpacing));

    this.svg
      .attr('height', calculatedHeight)
      .style('height', `${calculatedHeight}px`);

    const height = (calculatedHeight - this.margin.top - this.margin.bottom - (padding * 2)) * 1.2;

    const tree = d3.tree<TreeNode>()
      .size([height, maxWidth]);

    const root = tree(data);

    this.g.selectAll('*').remove();

    // Center both vertically and horizontally
    const verticalOffset = (calculatedHeight - height) / 2;
    const horizontalOffset = (this.width - maxWidth) / 2;
    this.g.attr('transform', `translate(${horizontalOffset},${verticalOffset})`);

    // Create links
    this.link = (this.g.append('g')
      .attr('class', 'links-g')
      .attr('fill', 'none')
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal<d3.HierarchyLink<TreeNode>, d3.HierarchyNode<TreeNode>>()
        .x(d => d.y ?? 0)
        .y(d => d.x ?? 0))
      .attr('stroke', ({ target }) => {
        let node = target;
        while (node.depth > 1) node = node.parent!;
        return color(this.accessor.colorKey(node.data));
      })
      .attr('stroke-width', 1)
    ) as d3.Selection<SVGPathElement, d3.HierarchyPointLink<TreeNode>, SVGGElement, unknown>;

    // Create nodes
    this.node = (this.g.append('g')
      .attr('class', 'nodes-g')
      .selectAll('g')
      .data(root.descendants().filter(d => d.depth !== 0))
      .join('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .on('mouseover', this.handleNodeMouseOver.bind(this))
      .on('mousemove', this.handleMouseMove.bind(this))
      .on('mouseout', this.handleNodeMouseOut.bind(this))
    ) as d3.Selection<SVGGElement, d3.HierarchyPointNode<TreeNode>, SVGGElement, unknown>;

    this.node.append('circle')
      .attr('r', 4)
      .attr('fill', d => {
        let node = d;
        while (node.depth > 1) node = node.parent!;
        return color(this.accessor.colorKey(node.data));
      })
      .attr('stroke', 'transparent')
      .attr('stroke-width', 16);

    this.node.append('text')
      .attr('class', styles.labelText)
      .attr('dy', '0.31em')
      .attr('x', d => d.children ? -6 : 6)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => this.accessor.name(d.data));
  }

  private handleNodeMouseOver(event: MouseEvent, d: d3.HierarchyPointNode<TreeNode>): void {
    const ancestors = d.ancestors();
    const ancestorSet = new Set(ancestors);

    // First raise the links group
    this.g.select('.links-g').raise();

    // Then raise the nodes group
    this.g.select('.nodes-g').raise();

    // Handle links highlighting
    this.link
      .classed('is-highlighted', ({ source, target }) =>
        ancestorSet.has(source) && ancestorSet.has(target)
      )
      .style('stroke', ({ source, target }) =>
        ancestorSet.has(source) && ancestorSet.has(target)
          ? '#2196F3' // Highlight color for the path
          : null
      )
      .style('stroke-width', ({ source, target }) =>
        ancestorSet.has(source) && ancestorSet.has(target)
          ? '3px' // Make highlighted path bolder
          : '1px'
      );

    // Handle nodes highlighting
    this.node
      .classed('is-highlighted', node => ancestorSet.has(node))
      .each(function(this: SVGGElement, node) {
        const element = d3.select(this);
        if (node === d) {
          // Highlight the selected node
          element.select('circle')
            .style('fill', '#2196F3')
            .style('stroke', '#2196F3')
            .style('stroke-width', '2px');
          element.select('text')
            .style('font-weight', 'bold')
            .style('fill', '#2196F3'); // Optional: also color the text
        } else if (ancestorSet.has(node)) {
          // Style ancestors
          element.select('circle')
            .style('stroke', '#2196F3')
            .style('stroke-width', '2px');
          element.select('text')
            .style('font-weight', 'bold'); // Make ancestor labels bold too
        }
      });

    this.handleMouseOver(event, d.data, ancestors.slice(0, -1).map(n => n.data).reverse());
  }

  private handleNodeMouseOut(): void {
    this.link
      .classed('is-highlighted', false)
      .style('stroke', null)
      .style('stroke-width', '1px');

    this.node
      .classed('is-highlighted', false)
      .each(function(this: SVGGElement) {
        const element = d3.select(this);
        element.select('circle')
          .style('fill', null)
          .style('stroke', 'transparent')
          .style('stroke-width', '16px');
        element.select('text')
          .style('font-weight', 'normal')
          .style('fill', 'var(--ifm-color-content)'); // Reset text color
      });

    this.handleMouseOut();
  }
}
