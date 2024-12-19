import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { VisTooltip } from '../classes/VisTooltip';
import { VisTree, VisRadialTree, VisSunburst } from '../classes/VisCharts';
import { DataAccessor, TreeNode } from '../types';

type ChartData = 'categories' | 'uses' | 'subjects';
type ChartType = 'tree' | 'radialTree' | 'sunburst';
type ChartInstance = VisTree | VisRadialTree | VisSunburst;
type ColorScale = d3.ScaleOrdinal<string, string>;

const colors: Record<ChartData, ColorScale> = {
  categories: d3.scaleOrdinal<string, string>()
    .domain(['data_category', 'system', 'user'])
    .range(['#2a3045', '#0861ce', '#8459cc']),
  uses: d3.scaleOrdinal<string, string>()
    .domain([
      'data_use', 'analytics', 'collect', 'employment', 'essential',
      'finance', 'improve', 'marketing', 'operations', 'personalize',
      'sales', 'third_party_sharing', 'train_ai_system', 'functional',
    ])
    .range([
      '#2a3045', '#0861ce', '#8459cc', '#c14cbb', '#ed43a0',
      '#ff4a7f', '#ff635b', '#ff8436', '#ffa600', '#ffcf40',
      '#acff40', '#58ff40', '#52cf70', '#A180F0', '#4670cf',
    ]),
  subjects: d3.scaleOrdinal<string, string>()
    .domain([
      'data_subject', 'anonymous_user', 'citizen_voter', 'commuter',
      'consultant', 'customer', 'employee', 'job_applicant',
      'next_of_kin', 'passenger', 'patient', 'prospect',
      'shareholder', 'supplier_vendor', 'trainee', 'visitor',
    ])
    .range([
      '#2a3045', '#0861ce', '#ff7040', '#ffa040', '#ffcf40',
      '#acff40', '#58ff40', '#52cf70', '#4ca0a0', '#4670cf',
      '#4040ff', '#6e40fe', '#9c40fe', '#c93ffd', '#f73ffc',
      '#fb409e',
    ]),
};

const accessor: DataAccessor = {
  id: (d: TreeNode) => d.fides_key,
  parentId: (d: TreeNode) => d.parent_key,
  name: (d: TreeNode) => d.fides_key
    .slice(d.fides_key.lastIndexOf('.') + 1)
    .split('_')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' '),
  colorKey: (d: TreeNode) => d.fides_key,
  description: (d: TreeNode) => d.description,
};

export const useD3Visualization = (
  selectedData: ChartData,
  selectedChartType: ChartType,
): {
  treeRef: React.RefObject<SVGSVGElement>;
  radialTreeRef: React.RefObject<SVGSVGElement>;
  sunburstRef: React.RefObject<SVGSVGElement>;
} => {
  const treeRef = useRef<SVGSVGElement>(null);
  const radialTreeRef = useRef<SVGSVGElement>(null);
  const sunburstRef = useRef<SVGSVGElement>(null);
  const chartInstanceRef = useRef<ChartInstance | null>(null);
  const tooltipRef = useRef<VisTooltip | null>(null);

  useEffect(() => {
    // Initialize tooltip if not already created
    if (!tooltipRef.current) {
      tooltipRef.current = new VisTooltip();
    }

    // Get the active SVG ref based on selected chart type
    const activeRef = {
      tree: treeRef,
      radialTree: radialTreeRef,
      sunburst: sunburstRef
    }[selectedChartType];

    if (!activeRef?.current) return;

    // Clear previous chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart instance based on type
    const ChartClass = {
      tree: VisTree,
      radialTree: VisRadialTree,
      sunburst: VisSunburst
    }[selectedChartType];

    chartInstanceRef.current = new ChartClass({
      el: activeRef.current,
      accessor,
      tooltip: tooltipRef.current,
    });

    // Load and process data
    const loadData = async () => {
      try {
        const response = await fetch(`/csv/data_${selectedData}.csv`);
        const csvData = await response.text();
        const parsedData = d3.csvParse(csvData);

        if (!parsedData) return;

        const data = parsedData as unknown as TreeNode[];
        const stratify = d3.stratify<TreeNode>()
          .id(accessor.id)
          .parentId(accessor.parentId);

        const root = stratify(data);
        const color = colors[selectedData].copy();

        if (chartInstanceRef.current) {
          chartInstanceRef.current.updateData({ data: root, color });
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    loadData();

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [selectedData, selectedChartType]);

  return { treeRef, radialTreeRef, sunburstRef };
};
