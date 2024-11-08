import { memo } from 'react';

type Props = {
  data: {
    height: number;
  };
};

export const SwimLaneNode = memo(({ data }: Props) => {
  return (
    <div
      className="swimlane"
      style={{ height: data.height }}
    >
      <style>{`
        .swimlane {
          width: 2px; // Slightly thicker line
          background: rgba(156, 163, 175, 0.3);
          position: absolute;
          left: -1px; // Center the line
        }
      `}</style>
    </div>
  );
});

SwimLaneNode.displayName = 'SwimLaneNode';
