import { useState, useEffect, useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowInstance,
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((prev: boolean) => !prev);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isFullscreen) {
      setIsFullscreen(false);
    }
  }, [isFullscreen]);

  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen, handleKeyDown]);

  // Reset ReactFlow view when fullscreen state changes
  useEffect(() => {
    if (reactFlowInstance.current) {
      // Use setTimeout to ensure the DOM has updated with new dimensions
      setTimeout(() => {
        reactFlowInstance.current?.fitView({
          padding: 8,
          minZoom: isFullscreen ? 1 : 0.55,
          duration: 300, // Smooth transition
        });
      }, 100);
    }
  }, [isFullscreen]);

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: isFullscreen ? '100vh' : '600px',
    background: 'var(--ifm-pre-background)',
    borderRadius: isFullscreen ? '0' : '1rem',
    marginBottom: isFullscreen ? '0' : '2rem',
    position: isFullscreen ? 'fixed' : 'relative',
    top: isFullscreen ? '0' : 'auto',
    left: isFullscreen ? '0' : 'auto',
    zIndex: isFullscreen ? 2000 : 'auto',
  };

  const fullscreenButtonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1,
    background: 'var(--ifm-background-surface-color)',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '.5rem',
    padding: '.5rem .75rem',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: 'var(--ifm-font-color-base)',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
  };

  const handleFullscreenButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = 'var(--ifm-color-emphasis-100)';
  };

  const handleFullscreenButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = 'var(--ifm-background-surface-color)';
    e.currentTarget.style.opacity = '0.9';
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div style={containerStyle}>
      <button
        style={fullscreenButtonStyle}
        onClick={handleToggleFullscreen}
        onMouseEnter={handleFullscreenButtonHover}
        onMouseLeave={handleFullscreenButtonLeave}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        title={isFullscreen ? 'Exit fullscreen (ESC)' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shrink-icon lucide-shrink"><path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8"/><path d="M9 19.8V15m0 0H4.2M9 15l-6 6"/><path d="M15 4.2V9m0 0h4.8M15 9l6-6"/><path d="M9 4.2V9m0 0H4.2M9 9 3 3"/></svg>
            Contraer
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-expand-icon lucide-expand"><path d="m15 15 6 6"/><path d="m15 9 6-6"/><path d="M21 16v5h-5"/><path d="M21 8V3h-5"/><path d="M3 16v5h5"/><path d="m3 21 6-6"/><path d="M3 8V3h5"/><path d="M9 9 3 3"/></svg>
            Expandir
          </>
        )}
      </button>

      <ReactFlow
        nodes={nodes}
        edges={[]}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 8,
        }}
        minZoom={0.55}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
        onInit={(instance) => {
          reactFlowInstance.current = instance;
        }}
      >
        <Background />
        <Controls
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}
