import { memo } from 'react';

type Props = {
  data: {
    height: number;
    color: string;
  };
};

export const ExecutionNode = memo(({ data }: Props) => {
  return (
    <div
      className="execution-box"
      style={{
        height: data.height,
        backgroundColor: data.color,
      }}
    >
      <style>{`
        .execution-box {
          width: 10px;
          opacity: 0.8;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
});

ExecutionNode.displayName = 'ExecutionNode';
