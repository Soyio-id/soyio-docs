import { memo } from 'react';

type Props = {
  data: {
    label: string;
    width: number;
    isLeftToRight: boolean;
    isSelfLoop: boolean;
    color: string;
    isDashed?: boolean;
  };
};

const parseText = (text: string) => {
  const parts = text.split(/(`[^`]+`)/).map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <span
          key={index}
          style={{
            fontFamily: 'var(--ifm-font-family-monospace)',
            padding: '0em 0.4em',
          }}
        >
          {part.slice(1, -1)}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
  return parts;
};

export const ActionNode = memo(({ data }: Props) => {
  const arrowWidth = 10;
  const arrowHeight = 10;
  const lineY = 0;
  const executionBoxGap = 10;
  const fontSize = 13;

  const textPadding = {
    horizontal: 8,
    vertical: 12
  };

  const lineHeight = 16;
  const maxTextWidth = 180;

  if (data.isSelfLoop) {
    const boxWidth = 140;
    const boxHeight = 80;
    const startX = executionBoxGap * 4;
    const radius = 10;

    return (
      <div className="action-node">
        <div
          className="text-container"
          style={{
            position: 'absolute',
            left: `${(boxWidth + startX) / 2 - (maxTextWidth + textPadding.horizontal * 2) / 2 + 60}px`,
            top: 0,
            transform: 'translateY(-50%)',
            padding: `${textPadding.vertical}px ${textPadding.horizontal}px`,
            background: 'var(--ifm-background-surface-color)',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 1,
            width: `${maxTextWidth}px`,
            fontSize: `${fontSize}px`,
            fontWeight: 500,
            color: 'var(--ifm-color-content)',
            textAlign: 'center',
            lineHeight: `${lineHeight}px`,
            wordWrap: 'break-word',
          }}
        >
          {parseText(data.label)}
        </div>
        <svg
          width={boxWidth + 200}
          height={boxHeight}
          style={{ overflow: 'visible' }}
        >
          <path
            d={`M ${startX},${-boxHeight/2}
                L ${boxWidth - radius},${-boxHeight/2}
                Q ${boxWidth},${-boxHeight/2} ${boxWidth},${-boxHeight/2 + radius}
                L ${boxWidth},${boxHeight/2 - radius}
                Q ${boxWidth},${boxHeight/2} ${boxWidth - radius},${boxHeight/2}
                L ${startX},${boxHeight/2}`}
            fill="none"
            stroke={data.color}
            strokeWidth={1.5}
            strokeDasharray={data.isDashed ? "8 8" : "none"}
          />
          <polygon
            points={`${startX + arrowWidth},${boxHeight/2 - arrowHeight/2}
                    ${startX},${boxHeight/2}
                    ${startX + arrowWidth},${boxHeight/2 + arrowHeight/2}`}
            fill={data.color}
            style={{
              strokeWidth: 2,
              stroke: data.color,
              strokeLinejoin: "round",
              strokeLinecap: "round",
            }}
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="action-node">
      <div
        className="text-container"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translate(-50%, -50%)',
          padding: `${textPadding.vertical}px ${textPadding.horizontal}px`,
          background: 'var(--ifm-background-surface-color)',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          zIndex: 1,
          width: `${data.width/1.5}px`,
          fontSize: `${fontSize}px`,
          fontWeight: 500,
          color: 'var(--ifm-color-content)',
          textAlign: 'center',
          lineHeight: `${lineHeight}px`,
          wordWrap: 'break-word',
        }}
      >
        {parseText(data.label)}
      </div>
      <svg
        width={data.width}
        height={20}
        style={{ overflow: 'visible' }}
      >
        <line
          x1={executionBoxGap}
          y1={lineY}
          x2={data.width - executionBoxGap}
          y2={lineY}
          stroke={data.color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray={data.isDashed ? "8 8" : "none"}
        />

        <polygon
          points={data.isLeftToRight ?
            `${data.width - executionBoxGap - arrowWidth},${lineY - arrowHeight/2} ${data.width - executionBoxGap},${lineY} ${data.width - executionBoxGap - arrowWidth},${lineY + arrowHeight/2}` :
            `${executionBoxGap + arrowWidth},${lineY - arrowHeight/2} ${executionBoxGap},${lineY} ${executionBoxGap + arrowWidth},${lineY + arrowHeight/2}`
          }
          fill={data.color}
          style={{
            strokeWidth: 2,
            stroke: data.color,
            strokeLinejoin: "round",
            strokeLinecap: "round",
          }}
        />
      </svg>
      <style>{`
        .action-node {
          position: relative;
          z-index: 3;
        }
      `}</style>
    </div>
  );
});

ActionNode.displayName = 'ActionNode';
