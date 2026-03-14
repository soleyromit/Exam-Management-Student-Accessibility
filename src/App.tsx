import React, { useCallback, useEffect, useState, useRef } from 'react';
/**
 * App — Exxat Exam Management root
 *
 * FIGMA LAYER GUIDE (top-level frame tree)
 * ─────────────────────────────────────────
 * ExamLayout                  [Frame, 100vw×100vh, bg=Surface/Page, Auto Layout vertical]
 *   ├── ExamHeader            [Instance: ExamHeader component, fill×48px]
 *   ├── SubHeader             [Frame, Auto Layout horizontal, space-between, fill×57px, bg=Surface/White, border-b=Border/Default, pl=80px, pr=16px]
 *   │     ├── SubHeader/Left  [Frame, Auto Layout horizontal, gap=12px]
 *   │     │     ├── ExamTitle         [Text, 18px SemiBold, Text/Primary, Source Sans 3]
 *   │     │     ├── AttemptBadge      [Frame, pill, bg=Brand/PrimaryBg, border=Brand/PrimaryBorder, text=Brand/PrimaryMid]
 *   │     │     ├── InfoButton        [Frame, 28×28, circle, icon-button]
 *   │     │     ├── CalculatorButton  [Frame, 28×28, circle, icon-button]
 *   │     │     └── FontSizeControl   [Frame, relative — see FontSizePopover]
 *   │     └── SubHeader/Right [Frame]
 *   │           └── TimerChip         [Frame, Auto Layout horizontal, 34px tall, bg=Surface/Subtle, border=Border/Medium, rounded-8, px=13px]
 *   │                 ├── ClockIcon   [SVG, 16×16, Text/Muted]
 *   │                 └── TimerText   [Text, 14px Bold, Text/Timer, Menlo monospace]
 *   ├── MainContent           [Frame, Auto Layout horizontal, fill×fill, gap=16px]
 *   │     ├── LeftSidebar     [Instance: LeftSidebar, 64px×fill]
 *   │     └── ContentArea     [Frame, Auto Layout horizontal, fill×fill, p=16px, gap=16px]
 *   │           ├── QuestionCard      [Instance: QuestionCard, fill×fill]
 *   │           └── QuestionNavigator [Instance: QuestionNavigator, 322px×fill]
 *   ├── Calculator?           [Instance: Calculator — floating overlay]
 *   └── ExamInfoOverlay?      [Instance: ExamInfoOverlay — modal overlay]
 *
 * FONT SIZE POPOVER (inline in SubHeader)
 *   FontSizeControl           [Frame, relative]
 *     ├── FontSizeButton      [Frame, 28×28, circle]
 *     └── FontSizePopover?    [Frame, 224px wide, Auto Layout vertical, bg=Surface/White, border=Border/Default, rounded-12, shadow]
 *           ├── Popover/Header [Frame, px=16px, py=12px, border-b=Border/Default, bg=Surface/Subtle]
 *           │     └── "Text Size" [Text, 14px SemiBold, Text/Primary]
 *           └── Popover/Control [Frame, px=16px, py=12px] — same as AccessibilityFab TextSizeControl
 *
 * ⚠️ FIGMA EXPORT FLAGS
 *   1. FontSizePopover is absolutely positioned — treat as a floating overlay variant.
 *   2. Calculator and ExamInfoOverlay are conditionally rendered — document as overlay
 *      states in a Figma prototype flow.
 *   3. TimerText (Menlo monospace) — if Menlo isn't in your Figma type styles,
 *      substitute Roboto Mono or Space Mono.
 *
 * TOKEN USAGE
 *   page bg      → Surface/Page
 *   sub-header   → Surface/White, Border/Default
 *   attempt badge→ Brand/PrimaryBg, Brand/PrimaryBorder, Brand/PrimaryMid
 *   timer chip   → Surface/Subtle bg, Border/Medium border, Text/Timer text
 *   icon color   → Text/Placeholder
 */
import { questions } from './data/questions';
import { useTimer } from './hooks/useTimer';
import { useSpeechToText } from './hooks/useSpeechToText';
import { ExamHeader } from './components/ExamHeader';
import { LeftSidebar } from './components/LeftSidebar';
import { QuestionCard } from './components/QuestionCard';
import { QuestionNavigator } from './components/QuestionNavigator';
import { Calculator } from './components/Calculator';
import { ExamInfoOverlay } from './components/ExamInfoOverlay';
import { InfoIcon, CalculatorIcon } from 'lucide-react';
import { tokens } from './tokens/design-tokens';
import { useZoom } from './hooks/useZoom';
import { ZoomControl } from './components/ZoomControl';
import { ZoomChip } from './components/ZoomChip';
import { CollapsedNavigator } from './components/CollapsedNavigator';
type FontSizeLevel = 'normal' | 'large' | 'xlarge';
const FONT_SIZE_LABEL: Record<FontSizeLevel, string> = {
  normal: '100%',
  large: '118%',
  xlarge: '136%'
};
export function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showCalculator, setShowCalculator] = useState(false);
  const [showExamInfo, setShowExamInfo] = useState(false);
  const [showFontPanel, setShowFontPanel] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const baseTextRef = useRef('');
  const { formatted: timerFormatted } = useTimer(3600);
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    isSupported: isSpeechSupported
  } = useSpeechToText();
  const {
    zoomPercent,
    setZoom,
    zoomIn,
    zoomOut,
    resetZoom,
    isHighZoom,
    isUltraZoom,
    announcement
  } = useZoom();
  const currentQuestion = questions[currentIndex];
  const isTextQuestion = currentQuestion.type === 'short-answer';
  // Sync speech transcript to short-answer field
  useEffect(() => {
    if (isListening && transcript && isTextQuestion) {
      const base = baseTextRef.current;
      const separator = base && !base.endsWith(' ') ? ' ' : '';
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: base + separator + transcript
      }));
    }
  }, [transcript, isListening, currentQuestion, isTextQuestion]);
  const handleSelectAnswer = useCallback(
    (questionId: number, answer: string) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: answer
      }));
    },
    []
  );
  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      if (isListening) stopListening();
      resetTranscript();
      setCurrentIndex((p) => p + 1);
    }
  }, [currentIndex, isListening, stopListening, resetTranscript]);
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      if (isListening) stopListening();
      resetTranscript();
      setCurrentIndex((p) => p - 1);
    }
  }, [currentIndex, isListening, stopListening, resetTranscript]);
  const handleNavigate = useCallback(
    (index: number) => {
      if (isListening) stopListening();
      resetTranscript();
      setCurrentIndex(index);
    },
    [isListening, stopListening, resetTranscript]
  );
  const handleToggleFlag = useCallback(() => {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(currentIndex) ?
      next.delete(currentIndex) :
      next.add(currentIndex);
      return next;
    });
  }, [currentIndex]);
  const handleStartSpeech = useCallback(() => {
    baseTextRef.current = answers[currentQuestion.id] || '';
    resetTranscript();
    startListening();
  }, [answers, currentQuestion.id, resetTranscript, startListening]);
  const handleStopSpeech = useCallback(() => {
    stopListening();
    baseTextRef.current = '';
  }, [stopListening]);
  const handleSubmit = useCallback(() => {
    const unanswered = questions.length - Object.keys(answers).length;
    alert(
      unanswered > 0 ?
      `You have ${unanswered} unanswered question(s). Are you sure?` :
      'Exam submitted successfully!'
    );
  }, [answers]);
  const answeredIndices = new Set<number>();
  questions.forEach((q, idx) => {
    if (answers[q.id]?.trim()) answeredIndices.add(idx);
  });
  return (
    // Figma layer: "ExamLayout"
    <div
      className="h-screen w-full flex flex-col overflow-hidden"
      style={{
        backgroundColor: tokens.surface.page
      }}>
      
      {/* ARIA Live Announcer for Zoom changes */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      {/* Figma layer: "ExamHeader" */}
      <ExamHeader timerFormatted={timerFormatted} isUltraZoom={isUltraZoom} />

      {/* Figma layer: "SubHeader" */}
      <div
        className="flex items-center"
        style={{
          backgroundColor: tokens.surface.white,
          borderBottom: `1px solid ${tokens.border.default}`,
          height: '57px',
          padding: '0 16px 0 80px'
        }}>
        
        <div className="flex items-center justify-between w-full">
          {/* Figma layer: "SubHeader/Left" */}
          <div
            className="flex items-center"
            style={{
              gap: '12px'
            }}>
            
            {/* Figma layer: "ExamTitle" */}
            <h1
              className="font-heading font-semibold"
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                color: tokens.text.primary
              }}>
              
              Introduction to Pathology
            </h1>

            {/* Figma layer: "AttemptBadge" */}
            <span
              className="font-heading font-semibold"
              style={{
                fontSize: '12px',
                lineHeight: '16px',
                color: tokens.brand.primaryMid,
                backgroundColor: tokens.brand.primaryBg,
                border: `1px solid ${tokens.brand.primaryBorder}`,
                borderRadius: '9999px',
                padding: '3px 11px'
              }}>
              
              Attempt #4
            </span>

            {!isUltraZoom &&
            <>
                {/* Figma layer: "InfoButton" */}
                <button
                className="flex items-center justify-center rounded-full transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  width: '28px',
                  height: '28px',
                  outlineColor: tokens.brand.primary
                }}
                aria-label="Exam info"
                onClick={() => setShowExamInfo(true)}>
                
                  <InfoIcon
                  style={{
                    width: '20px',
                    height: '20px',
                    color: tokens.text.placeholder
                  }} />
                
                </button>

                {/* Figma layer: "CalculatorButton" */}
                <button
                className="flex items-center justify-center rounded-full transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  width: '28px',
                  height: '28px',
                  outlineColor: tokens.brand.primary
                }}
                aria-label="Toggle Calculator"
                onClick={() => setShowCalculator((p) => !p)}>
                
                  <CalculatorIcon
                  style={{
                    width: '20px',
                    height: '20px',
                    color: tokens.text.placeholder
                  }} />
                
                </button>
              </>
            }

            {/* Figma layer: "FontSizeControl" */}
            <ZoomControl
              zoomPercent={zoomPercent}
              setZoom={setZoom}
              zoomIn={zoomIn}
              zoomOut={zoomOut}
              resetZoom={resetZoom}
              isOpen={showFontPanel}
              setIsOpen={setShowFontPanel} />
            
          </div>

          {/* Figma layer: "TimerChip" */}
          <div
            className="flex items-center"
            style={{
              height: '34px',
              borderRadius: '8px',
              border: `1px solid ${tokens.border.medium}`,
              backgroundColor: tokens.surface.subtle,
              padding: '0 13px',
              gap: '8px'
            }}>
            
            {/* Figma layer: "ClockIcon" */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="8"
                r="6.5"
                stroke={tokens.text.muted}
                strokeWidth="1.2" />
              
              <path
                d="M8 4.5V8L10.5 9.5"
                stroke={tokens.text.muted}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round" />
              
            </svg>
            {/* Figma layer: "TimerText"
              ⚠️ Menlo monospace — substitute Roboto Mono or Space Mono in Figma if needed */}
            <span
              style={{
                fontFamily: 'Menlo, monospace',
                fontWeight: 700,
                fontSize: '14px',
                color: tokens.text.timer
              }}>
              
              {timerFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Figma layer: "MainContent" */}
      <div className="flex flex-1 min-h-0">
        {/* Figma layer: "LeftSidebar" */}
        <LeftSidebar examTitle="Introduction to Pathology" attemptNumber={4} />

        {/* Figma layer: "ContentArea" */}
        <div
          className="flex flex-1 min-h-0 overflow-hidden relative"
          style={{
            gap: '16px',
            padding: '16px',
            paddingBottom: isHighZoom ? '80px' : '16px'
          }}>
          
          <div className="flex-1 flex flex-col min-h-0">
            <ZoomChip
              zoomPercent={zoomPercent}
              onClick={() => setShowFontPanel(true)} />
            

            {/* Figma layer: "QuestionCard" */}
            <QuestionCard
              question={currentQuestion}
              questionIndex={currentIndex}
              totalQuestions={questions.length}
              selectedAnswer={answers[currentQuestion.id]}
              onSelectAnswer={handleSelectAnswer}
              onNext={handleNext}
              onPrevious={handlePrevious}
              speechToTextEnabled={true}
              speechTranscript={transcript}
              isSpeechListening={isListening}
              onStartSpeech={handleStartSpeech}
              onStopSpeech={handleStopSpeech}
              isSpeechSupported={isSpeechSupported}
              zoomPercent={zoomPercent} />
            
          </div>

          {/* Figma layer: "QuestionNavigator" */}
          {(!isHighZoom || showMobileNav) &&
          <div
            className={
            isHighZoom ?
            'fixed inset-y-0 right-0 z-50 bg-white shadow-2xl p-4 overflow-y-auto' :
            ''
            }>
            
              {isHighZoom &&
            <div className="flex justify-end mb-4">
                  <button
                onClick={() => setShowMobileNav(false)}
                className="p-2 rounded-full hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  outlineColor: tokens.brand.primary
                }}
                aria-label="Close Navigator">
                
                    <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
            }
              <QuestionNavigator
              totalQuestions={questions.length}
              currentIndex={currentIndex}
              answeredSet={answeredIndices}
              flaggedSet={flagged}
              onNavigate={(idx) => {
                handleNavigate(idx);
                if (isHighZoom) setShowMobileNav(false);
              }}
              onToggleFlag={handleToggleFlag}
              onSubmit={handleSubmit}
              isFlaggedCurrent={flagged.has(currentIndex)} />
            
            </div>
          }

          {isHighZoom && showMobileNav &&
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowMobileNav(false)}
            aria-hidden="true" />

          }
        </div>
      </div>

      {isHighZoom && !showMobileNav &&
      <CollapsedNavigator
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        answeredCount={answeredIndices.size}
        flaggedCount={flagged.size}
        onExpand={() => setShowMobileNav(true)} />

      }

      {/* Floating overlays */}
      {showCalculator &&
      <Calculator onClose={() => setShowCalculator(false)} />
      }
      {showExamInfo &&
      <ExamInfoOverlay onClose={() => setShowExamInfo(false)} />
      }
    </div>);

}