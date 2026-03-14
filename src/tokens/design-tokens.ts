/**
 * EXXAT EXAM MANAGEMENT — DESIGN TOKENS
 * Single source of truth. Every hex value in the codebase should
 * reference one of these constants, not be written inline.
 *
 * Figma variable collection mapping:
 *   Brand/     → brand.*
 *   Surface/   → surface.*
 *   Text/      → text.*
 *   Border/    → border.*
 *   State/     → state.*
 *   Semantic/  → semantic.*
 */

export const tokens = {
  // ─── Brand ──────────────────────────────────────────────────────────────────
  brand: {
    primary: '#E4077D', // Exxat Pink — primary actions, active states
    primaryHover: '#C9026D', // Hover on primary buttons
    primaryActive: '#A01257', // Pressed state
    primaryBg: '#FEF2F2', // Tinted background (selected MCQ, badges)
    primaryBorder: '#FCE7F3', // Subtle border on pink-tinted surfaces
    primaryMid: '#BE185D', // Points badge text, attempt badge text
    primaryMidBg: '#FCE7F3' // Points badge background
  },

  // ─── Neutrals / Surface ─────────────────────────────────────────────────────
  surface: {
    page: '#F8FAFC', // Page / app background
    white: '#FFFFFF', // Cards, inputs, dropdowns
    subtle: '#F1F5F9', // Timer chip background, icon button hover
    muted: '#F8FAFC', // Answer area background (same as page — intentional)
    overlay: 'rgba(0,0,0,0.30)' // Modal backdrop
  },

  // ─── Text ───────────────────────────────────────────────────────────────────
  text: {
    primary: '#0F172A', // Headings, question text, nav labels
    secondary: '#334155', // Option text, body copy
    muted: '#475569', // Legend labels, stat counts
    subtle: '#64748B', // Navigator subtitle, placeholder
    placeholder: '#9CA3AF', // Icon tints in sub-header
    inverse: '#FFFFFF', // Text on dark/pink backgrounds
    timer: '#334155' // Timer display (same as text.secondary)
  },

  // ─── Border ─────────────────────────────────────────────────────────────────
  border: {
    default: '#E2E8F0', // Card borders, dividers, input default
    medium: '#CBD5E1', // Timer chip border, navigator buttons
    strong: '#94A3B8', // (reserved)
    focus: '#F9A8D4' // Input/option focus ring (pink-300)
  },

  // ─── State — Answered (Green) ───────────────────────────────────────────────
  state: {
    answeredBg: '#DCFCE7',
    answeredBorder: '#4ADE80',
    answeredText: '#15803D',

    flaggedBg: '#FEF9C3',
    flaggedBorder: '#FACC15',
    flaggedText: '#92400E',

    requiredBg: '#FFFFFF',
    requiredBorder: '#F87171',
    requiredShadow: 'rgba(254,226,226,1)',

    currentBg: '#E4077D', // alias → brand.primary
    currentText: '#FFFFFF'
  },

  // ─── Semantic ───────────────────────────────────────────────────────────────
  semantic: {
    errorText: '#DC2626',
    errorBg: '#FEF2F2',
    errorBorder: '#FECACA',
    errorDot: '#EF4444',

    warningText: '#D97706',

    infoBg: '#EFF6FF', // blue-50
    infoIcon: '#3B82F6', // blue-500

    successBg: '#F0FDF4', // green-50
    successIcon: '#22C55E', // green-500

    amberBg: '#FFFBEB', // amber-50
    amberIcon: '#F59E0B', // amber-500

    purpleBg: '#FAF5FF', // purple-50
    purpleIcon: '#A855F7' // purple-500
  },

  // ─── Sidebar active strip ───────────────────────────────────────────────────
  sidebar: {
    activeBg: '#DB2777' // pink-600 — left sidebar active icon background
  },

  // ─── Calculator ─────────────────────────────────────────────────────────────
  calc: {
    displayBg: '#111827', // gray-900
    numBtn: '#FFFFFF',
    numBorder: '#E5E7EB',
    numText: '#1F2937',
    opBtn: '#F3F4F6',
    opBorder: '#E5E7EB',
    opText: '#374151',
    sciBtn: '#EFF6FF',
    sciBorder: '#BFDBFE',
    sciText: '#1D4ED8',
    equalBtn: '#E5175F',
    equalHover: '#C91352',
    headerBg: '#F9FAFB'
  }
} as const;

/**
 * CSS custom property map — mirrors tokens above.
 * Injected into :root in index.css.
 * Reference in Tailwind via `var(--token-name)`.
 */
export const cssVars = `
  /* Brand */
  --brand-primary:        ${tokens.brand.primary};
  --brand-primary-hover:  ${tokens.brand.primaryHover};
  --brand-primary-active: ${tokens.brand.primaryActive};
  --brand-primary-bg:     ${tokens.brand.primaryBg};
  --brand-primary-border: ${tokens.brand.primaryBorder};
  --brand-primary-mid:    ${tokens.brand.primaryMid};
  --brand-primary-mid-bg: ${tokens.brand.primaryMidBg};

  /* Surface */
  --surface-page:    ${tokens.surface.page};
  --surface-white:   ${tokens.surface.white};
  --surface-subtle:  ${tokens.surface.subtle};
  --surface-muted:   ${tokens.surface.muted};

  /* Text */
  --text-primary:     ${tokens.text.primary};
  --text-secondary:   ${tokens.text.secondary};
  --text-muted:       ${tokens.text.muted};
  --text-subtle:      ${tokens.text.subtle};
  --text-placeholder: ${tokens.text.placeholder};
  --text-inverse:     ${tokens.text.inverse};

  /* Border */
  --border-default: ${tokens.border.default};
  --border-medium:  ${tokens.border.medium};
  --border-focus:   ${tokens.border.focus};

  /* State */
  --state-answered-bg:     ${tokens.state.answeredBg};
  --state-answered-border: ${tokens.state.answeredBorder};
  --state-answered-text:   ${tokens.state.answeredText};
  --state-flagged-bg:      ${tokens.state.flaggedBg};
  --state-flagged-border:  ${tokens.state.flaggedBorder};
  --state-flagged-text:    ${tokens.state.flaggedText};
  --state-current-bg:      ${tokens.state.currentBg};

  /* Semantic */
  --semantic-error-text:   ${tokens.semantic.errorText};
  --semantic-error-bg:     ${tokens.semantic.errorBg};
  --semantic-error-border: ${tokens.semantic.errorBorder};
  --semantic-error-dot:    ${tokens.semantic.errorDot};
`;