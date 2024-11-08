import { Handle, Position } from 'reactflow';

interface ActorNodeData {
  label: string;
  diagramHeight: number;
  actorWidth: number;
}

export const ActorNode = ({ data }: { data: ActorNodeData }) => {
  return (
    <div className="actor-node">
      <div className="actor-box">{data.label}</div>
      <div className="actor-line" />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0, left: '50%' }}
      />
      <style>{`
        .actor-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: ${data.actorWidth}px;
        }

        .actor-box {
          padding: 8px 16px;
          border-radius: 4px;
          text-align: center;
          width: 100%;
          z-index: 1;
          font-weight: bold;
          font-size: 18px;
          color: var(--ifm-color-content);
        }

        .actor-line {
          width: 4px;
          height: calc(${data.diagramHeight}px - 50px);
          background: #d0d5df;
          opacity: .6;
          margin-top: -1px;
          position: absolute;
          top: 100%;
          z-index: 0;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};
