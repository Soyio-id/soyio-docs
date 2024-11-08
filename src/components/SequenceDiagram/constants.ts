export const DIAGRAM_CONSTANTS = {
  // Visual Theme
  COLORS: {
    ACTOR: [
      '#A180F0',
      '#6EFF89',
      '#F36EFF',
      '#98BFF5',
      '#6EF8FF',
      '#3340CF',
    ],
    SWIMLANE: 'rgba(156, 163, 175, 0.3)',
    ACTOR_LINE: '#d0d5df'
  },

  // Actor Related
  ACTOR: {
    WIDTH: 200,
    FONT_SIZE: '18px',
    LINE_OPACITY: 0.6,
  },

  // Message/Action Related
  ACTION: {
    ARROW: {
      WIDTH: 10,
      HEIGHT: 10
    },
    SELF_LOOP: {
      BOX_WIDTH: 140,
      BOX_HEIGHT: 80,
      START_X: 30,
      RADIUS: 10
    },
    EXECUTION_BOX: {
      WIDTH: 10,
      GAP: 10,
      OPACITY: 0.8
    }
  },

  // Layout & Spacing
  LAYOUT: {
    START_X: 50,
    START_Y: 100,
    LANE_SPACING: 250,
    MESSAGE_SPACING: 80,
  },

  // Visual Elements
  STYLE: {
    BORDER_RADIUS: 4,
    LINE_WIDTH: 1.5,
    DASH_ARRAY: '8 8',
    SWIMLANE_WIDTH: 2,
  },

  // Text Formatting
  TEXT: {
    MAX_LINE_WIDTH: 36,
    LINE_HEIGHT: 14,
    CHAR_WIDTH: 8,
    PADDING: {
      HORIZONTAL: 2,
      VERTICAL: 8
    },
    FONT: {
      SIZE: {
        NORMAL: '14px',
        SMALL: '12px'
      },
      WEIGHT: {
        NORMAL: 500,
        BOLD: 'bold'
      }
    }
  }
};
