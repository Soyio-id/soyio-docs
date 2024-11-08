import { Node } from 'reactflow';
import { DIAGRAM_CONSTANTS } from '../constants';

export function useSequenceDiagram(
  actors: Array<{ id: string; label: string }>,
  actions: Array<{
    from: string;
    to: string;
    label: string;
    isDashed?: boolean;
  }>,
) {
  // Validate that all action references point to existing actors
  const actorIds = new Set(actors.map(actor => actor.id));

  actions.forEach((action, index) => {
    if (!actorIds.has(action.from)) {
      throw new Error(`Invalid action at index ${index}: Actor "${action.from}" not found in actors list`);
    }
    if (!actorIds.has(action.to)) {
      throw new Error(`Invalid action at index ${index}: Actor "${action.to}" not found in actors list`);
    }
  });

  const diagramHeight = (actions.length + 1) * DIAGRAM_CONSTANTS.LAYOUT.MESSAGE_SPACING + 50;
  const messageYOffset = DIAGRAM_CONSTANTS.LAYOUT.MESSAGE_SPACING / 2;

  // Calculate execution ranges for each actor
  const executionRanges = new Map<string, Array<{ start: number; end: number }>>();

  actors.forEach(actor => {
    const ranges: Array<{ start: number; end: number }> = [];
    let currentRange: { start: number; end: number } | null = null;

    actions.forEach((action, index) => {
      // Start execution when either sending or receiving a message
      if (action.to === actor.id || action.from === actor.id) {
        if (!currentRange) {
          currentRange = { start: index, end: index };
        }
        currentRange.end = index;
      } else if (currentRange) {
        // End execution when not involved in the message
        ranges.push(currentRange);
        currentRange = null;
      }
    });

    // Handle any unclosed ranges
    if (currentRange) {
      ranges.push(currentRange);
    }

    executionRanges.set(actor.id, ranges);
  });

  // Create all nodes
  const nodes: Node[] = [
    // Actor nodes with their specific colors
    ...actors.map((actor, index) => ({
      id: actor.id,
      type: 'actor',
      position: {
        x: DIAGRAM_CONSTANTS.LAYOUT.START_X + (index * DIAGRAM_CONSTANTS.LAYOUT.LANE_SPACING),
        y: 0
      },
      data: {
        label: actor.label,
        diagramHeight,
        actorWidth: DIAGRAM_CONSTANTS.ACTOR.WIDTH,
      },
    })),

    // Execution box nodes
    ...Array.from(executionRanges.entries()).flatMap(([actorId, ranges], actorIndex) =>
      ranges.map((range, rangeIndex) => ({
        id: `execution_${actorId}_${rangeIndex}`,
        type: 'execution',
        position: {
          x: DIAGRAM_CONSTANTS.LAYOUT.START_X +
             (actorIndex * DIAGRAM_CONSTANTS.LAYOUT.LANE_SPACING) +
             (DIAGRAM_CONSTANTS.ACTOR.WIDTH / 2) -
             (DIAGRAM_CONSTANTS.ACTION.EXECUTION_BOX.WIDTH / 2),
          y: DIAGRAM_CONSTANTS.LAYOUT.START_Y + (range.start * DIAGRAM_CONSTANTS.LAYOUT.MESSAGE_SPACING),
        },
        data: {
          height: (range.end - range.start + 1) * DIAGRAM_CONSTANTS.LAYOUT.MESSAGE_SPACING,
          color: DIAGRAM_CONSTANTS.COLORS.ACTOR[actorIndex],
        },
      }))
    ),

    // Message nodes with source actor colors
    ...actions.map((action, index) => {
      const sourceIndex = actors.findIndex(actor => actor.id === action.from);
      const targetIndex = actors.findIndex(actor => actor.id === action.to);
      const isSelfLoop = action.from === action.to;
      const sourceX = DIAGRAM_CONSTANTS.LAYOUT.START_X +
                     (sourceIndex * DIAGRAM_CONSTANTS.LAYOUT.LANE_SPACING) +
                     (DIAGRAM_CONSTANTS.ACTOR.WIDTH / 2);
      const targetX = DIAGRAM_CONSTANTS.LAYOUT.START_X +
                     (targetIndex * DIAGRAM_CONSTANTS.LAYOUT.LANE_SPACING) +
                     (DIAGRAM_CONSTANTS.ACTOR.WIDTH / 2);

      if (isSelfLoop) {
        return {
          id: `message_${index}`,
          type: 'action',
          position: {
            x: sourceX - DIAGRAM_CONSTANTS.ACTION.SELF_LOOP.START_X,
            y: DIAGRAM_CONSTANTS.LAYOUT.START_Y +
               (index * DIAGRAM_CONSTANTS.LAYOUT.MESSAGE_SPACING) +
               messageYOffset,
          },
          data: {
            label: action.label,
            width: DIAGRAM_CONSTANTS.ACTION.SELF_LOOP.BOX_WIDTH,
            isLeftToRight: true,
            isSelfLoop: true,
            color: DIAGRAM_CONSTANTS.COLORS.ACTOR[sourceIndex],
            isDashed: action.isDashed,
          },
        };
      }

      return {
        id: `message_${index}`,
        type: 'action',
        position: {
          x: Math.min(sourceX, targetX),
          y: DIAGRAM_CONSTANTS.LAYOUT.START_Y +
             (index * DIAGRAM_CONSTANTS.LAYOUT.MESSAGE_SPACING) +
             messageYOffset,
        },
        data: {
          label: action.label,
          width: Math.abs(targetX - sourceX),
          isLeftToRight: targetIndex > sourceIndex,
          isSelfLoop: false,
          color: DIAGRAM_CONSTANTS.COLORS.ACTOR[sourceIndex],
          isDashed: action.isDashed,
        },
      };
    }),
  ];

  return { nodes };
}
