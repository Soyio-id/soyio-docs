import { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { useD3Visualization } from './hooks/useD3Visualization';

import RadialTreeSVG from './svg/RadialTree.svg';
import SunburstSVG from './svg/Sunburst.svg';
import TreeSVG from './svg/Tree.svg';

type ChartData = 'categories' | 'uses' | 'subjects';
type ChartType = 'tree' | 'radialTree' | 'sunburst';

interface Props {
  className?: string;
}

export default function TaxonomyVisualizer({ className }: Props) {
  const [selectedData, setSelectedData] = useState<ChartData>('categories');
  const [selectedChartType, setSelectedChartType] = useState<ChartType>('tree');

  const { treeRef, radialTreeRef, sunburstRef } = useD3Visualization(
    selectedData,
    selectedChartType
  );

  return (
    <div className={clsx(styles.visContainer, 'vis', className)}>
      <div className={styles.controlsContainer}>
        <div className={clsx(styles.controlGroup, 'control-group')}>
          <div className={styles.btnGroup}>
            <button
              className={clsx(styles.btn, { [styles.isSelected]: selectedData === 'categories' })}
              onClick={() => setSelectedData('categories')}
              data-chart-data="categories"
              aria-label="Show data categories"
            >
              Data Categories
            </button>
            <button
              className={clsx(styles.btn, { [styles.isSelected]: selectedData === 'uses' })}
              onClick={() => setSelectedData('uses')}
              data-chart-data="uses"
              aria-label="Show data uses"
            >
              Data Uses
            </button>
            <button
              className={clsx(styles.btn, { [styles.isSelected]: selectedData === 'subjects' })}
              onClick={() => setSelectedData('subjects')}
              data-chart-data="subjects"
              aria-label="Show data subjects"
            >
              Data Subjects
            </button>
          </div>
        </div>
        <div className={clsx(styles.controlGroup, 'control-group')}>
          <div className={styles.btnGroup}>
            <button
              className={clsx(styles.btn, styles.btnIcon, { [styles.isSelected]: selectedChartType === 'tree' })}
              onClick={() => setSelectedChartType('tree')}
              data-chart-type="tree"
              aria-label="Show tree visualization"
            >
              <TreeSVG />
            </button>
            <button
              className={clsx(styles.btn, styles.btnIcon, { [styles.isSelected]: selectedChartType === 'radialTree' })}
              onClick={() => setSelectedChartType('radialTree')}
              data-chart-type="radialTree"
              aria-label="Show radial tree visualization"
            >
              <RadialTreeSVG />
            </button>
            <button
              className={clsx(styles.btn, styles.btnIcon, { [styles.isSelected]: selectedChartType === 'sunburst' })}
              onClick={() => setSelectedChartType('sunburst')}
              data-chart-type="sunburst"
              aria-label="Show sunburst visualization"
            >
              <SunburstSVG />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <svg
          ref={sunburstRef}
          style={{ display: selectedChartType === 'sunburst' ? 'block' : 'none' }}
          aria-label="Sunburst visualization"
        />
        <svg
          ref={radialTreeRef}
          style={{ display: selectedChartType === 'radialTree' ? 'block' : 'none' }}
          aria-label="Radial tree visualization"
        />
        <svg
          ref={treeRef}
          style={{ display: selectedChartType === 'tree' ? 'block' : 'none' }}
          aria-label="Tree visualization"
        />
      </div>
      <div id="vis-color-legend" className={styles.colorLegend} />
    </div>
  );
}
