import ReactFlow, {
  Background,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { ActorNode } from './nodes/ActorNode';
import { ActionNode } from './nodes/ActionNode';
import { SwimLaneNode } from './nodes/SwimLaneNode';
import { ExecutionNode } from './nodes/ExecutionNode';
import { useSequenceDiagram } from './hooks/useSequenceDiagram';

const nodeTypes = {
  actor: ActorNode,
  action: ActionNode,
  swimlane: SwimLaneNode,
  execution: ExecutionNode,
};

type Props = {
  actors: Array<{
    id: string;
    label: string;
  }>;
  actions: Array<{
    from: string;
    to: string;
    label: string;
  }>;
};

export default function SequenceDiagram({ actors, actions }: Props) {
  const { nodes } = useSequenceDiagram(actors, actions);

  return (
    <div style={{
      width: '100%',
      height: '600px',
      background: 'transparent',
      borderRadius: '8px',
      marginBottom: '2rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}>
      <ReactFlow
        nodes={nodes}
        edges={[]}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 8,
        }}
        minZoom={0.7}
        maxZoom={7}
        proOptions={{ hideAttribution: true }}
      >
        <Background  />
        <Controls
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}
