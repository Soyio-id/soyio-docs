import * as d3 from 'd3';
import { VisTooltip } from './classes/VisTooltip';

export interface TreeNode {
  fides_key: string;
  parent_key: string;
  description?: string;
}

export interface DataAccessor {
  id: (d: TreeNode) => string;
  parentId: (d: TreeNode) => string;
  name: (d: TreeNode) => string;
  colorKey: (d: TreeNode) => string;
  description: (d: TreeNode) => string | undefined;
}

export interface ChartConstructorParams {
  el: SVGSVGElement;
  accessor: DataAccessor;
  tooltip: VisTooltip;
}

export interface UpdateDataParams {
  data: d3.HierarchyNode<TreeNode>;
  color: d3.ScaleOrdinal<string, string>;
}
