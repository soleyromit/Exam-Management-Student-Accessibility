import React, { useCallback, useEffect, useState } from 'react';
import { questions } from './data/questions';
import { useTimer } from './hooks/useTimer';
import { useZoom } from './hooks/useZoom';
import { ExamToolbar } from './components/ExamToolbar';
import { SplitQuestionView } from './components/SplitQuestionView';
import { SidebarDrawer } from './components/SidebarDrawer';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { CalculatorPopover } from './components/CalculatorPopover';
import { QuestionNavigatorPopover } from './components/QuestionNavigatorPopover';
import { AccessibilityPanel } from './components/AccessibilityPanel';
// Question types that benefit from a calculator
const CALCULATOR_TYPES = new Set([
'table',
'fill-blank',
'short-answer',
'essay',
'chart']
);
// Question types that benefit from an on-screen keyboard
const KEYBOARD_TYPES = new Set(['short-answer', 'essay', 'fill-blank']);
// Question types that support A-D single-select keyboard shortcuts
const MCQ_TYPES = new Set([
'mcq',
'image-mcq',
'video-mcq',
'audio',
'case-study',
'combined',
'passage',
'pdf',
'table',
'cross-out',
'chart']
);
export function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  // UI States
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showNavigator, setShowNavigator] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [voiceNarrator, setVoiceNarrator] = useState(false);
  // Preferences — light theme by default
  const [theme, setTheme] = useState<'light' | 'dark' | 'high-contrast'>(
    'light'
  );
  const [showQuestionNavInToolbar, setShowQuestionNavInToolbar] = useState(true);
  const [showQuestionNavInHamburger, setShowQuestionNavInHamburger] =
  useState(true);
  const { formatted: timerFormatted, totalSeconds } = useTimer(7200);
  const isLastFiveMinutes = totalSeconds <= 300;
  const { zoomPercent, setZoom, zoomIn, zoomOut, announcement } = useZoom();
  const currentQuestion = questions[currentIndex];
  const answeredIndices = new Set(
    questions.
    map((q, i) => answers[q.id] !== undefined ? i : -1).
    filter((i) => i !== -1)
  );
  const unansweredCount = questions.length - answeredIndices.size;
  // Contextual tool relevance
  const needsCalculator = CALCULATOR_TYPES.has(currentQuestion.type);
  const needsKeyboard = KEYBOARD_TYPES.has(currentQuestion.type);
  // Reset inline tools when switching to a question that doesn't need them
  useEffect(() => {
    if (!needsCalculator && showCalculator) setShowCalculator(false);
    if (!needsKeyboard && showKeyboard) setShowKeyboard(false);
  }, [currentIndex, needsCalculator, needsKeyboard]);
  const handleSelectAnswer = useCallback((questionId: number, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);
  const handleNavigate = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);
  const handleToggleFlag = useCallback(() => {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(currentIndex) ?
      next.delete(currentIndex) :
      next.add(currentIndex);
      return next;
    });
  }, [currentIndex]);
  const handleSubmit = useCallback(() => {
    const unanswered = questions.length - Object.keys(answers).length;
    alert(
      unanswered > 0 ?
      `You have ${unanswered} unanswered questions. Submit anyway?` :
      'Exam submitted successfully!'
    );
  }, [answers]);
  const handleExit = useCallback(() => {
    alert('You have exited the exam. Your progress may not be saved.');
  }, []);
  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement)

      return;
      if (e.key === 'Enter' && currentIndex < questions.length - 1) {
        handleNavigate(currentIndex + 1);
      } else if (
      e.key === 'ArrowRight' &&
      currentIndex < questions.length - 1)
      {
        handleNavigate(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handleNavigate(currentIndex - 1);
      } else if (e.key.toLowerCase() === 'f') {
        handleToggleFlag();
      } else if (
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].includes(
        e.key.toLowerCase()
      ) &&
      e.key.toLowerCase() !== 'f')
      {
        // Skip 'f' since it's used for flagging — only handle a,b,c,d,e,g,h
        const idx = e.key.toLowerCase().charCodeAt(0) - 97;
        if (currentQuestion.type === 'checkbox') {
          // Toggle checkbox option
          if (currentQuestion.options && currentQuestion.options[idx]) {
            const currentAnswer: string[] = answers[currentQuestion.id] || [];
            const option = currentQuestion.options[idx];
            const currentSet = new Set(currentAnswer);
            if (currentSet.has(option)) {
              currentSet.delete(option);
            } else {
              currentSet.add(option);
            }
            handleSelectAnswer(currentQuestion.id, Array.from(currentSet));
          }
        } else if (MCQ_TYPES.has(currentQuestion.type)) {
          // Single select for MCQ-like types
          if (currentQuestion.options && currentQuestion.options[idx]) {
            handleSelectAnswer(currentQuestion.id, currentQuestion.options[idx]);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
  currentIndex,
  currentQuestion,
  handleNavigate,
  handleToggleFlag,
  handleSelectAnswer,
  answers]
  );
  return (
    <div
      className={`h-screen w-full flex flex-col overflow-hidden transition-colors duration-300 theme-${theme}`}
      style={{
        backgroundColor: 'var(--surface-page)'
      }}>
      
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <ExamToolbar
        timerFormatted={timerFormatted}
        answeredCount={answeredIndices.size}
        flaggedCount={flagged.size}
        unansweredCount={unansweredCount}
        totalQuestions={questions.length}
        currentIndex={currentIndex}
        zoomPercent={zoomPercent}
        questions={questions}
        answeredSet={answeredIndices}
        flaggedSet={flagged}
        onNavigate={handleNavigate}
        onToggleCalculator={() => setShowCalculator(!showCalculator)}
        onToggleKeyboard={() => setShowKeyboard(!showKeyboard)}
        onToggleAccessibility={() => setShowAccessibility(!showAccessibility)}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        onSubmit={handleSubmit}
        theme={theme}
        onThemeChange={setTheme}
        showQuestionNavInToolbar={showQuestionNavInToolbar}
        onToggleNavInToolbar={() =>
        setShowQuestionNavInToolbar(!showQuestionNavInToolbar)
        }
        showQuestionNavInHamburger={showQuestionNavInHamburger}
        onToggleNavInHamburger={() =>
        setShowQuestionNavInHamburger(!showQuestionNavInHamburger)
        }
        isFlaggedCurrent={flagged.has(currentIndex)}
        onToggleFlag={handleToggleFlag}
        isLastFiveMinutes={isLastFiveMinutes}
        voiceNarrator={voiceNarrator}
        onToggleVoiceNarrator={() => setVoiceNarrator(!voiceNarrator)}
        onExit={handleExit} />
      

      <div className="relative flex-1 overflow-hidden flex flex-col">
        <QuestionNavigatorPopover
          questions={questions}
          currentIndex={currentIndex}
          answeredSet={answeredIndices}
          flaggedSet={flagged}
          onNavigate={handleNavigate}
          isOpen={showNavigator}
          onClose={() => setShowNavigator(false)} />
        

        <AccessibilityPanel
          isOpen={showAccessibility}
          onClose={() => setShowAccessibility(false)}
          zoomPercent={zoomPercent}
          zoomIn={zoomIn}
          zoomOut={zoomOut} />
        

        <main
          className="flex-1 overflow-hidden flex flex-col p-4 md:p-6"
          role="main">
          
          <SplitQuestionView
            key={currentIndex}
            question={currentQuestion}
            questionIndex={currentIndex}
            selectedAnswer={answers[currentQuestion.id]}
            onSelectAnswer={handleSelectAnswer}
            zoomPercent={zoomPercent}
            showCalculator={showCalculator}
            showKeyboard={showKeyboard}
            onToggleCalculator={() => setShowCalculator(!showCalculator)}
            onToggleKeyboard={() => setShowKeyboard(!showKeyboard)}
            needsCalculator={needsCalculator}
            needsKeyboard={needsKeyboard}
            voiceNarrator={voiceNarrator} />
          
        </main>
      </div>

      <SidebarDrawer
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        questions={questions}
        currentIndex={currentIndex}
        answeredSet={answeredIndices}
        flaggedSet={flagged}
        onNavigate={handleNavigate} />
      

      {/* Fallback floating tools — only shown when NOT inline (i.e., question doesn't need them but user toggled from settings) */}
      {showKeyboard && !needsKeyboard &&
      <VirtualKeyboard
        isOpen={showKeyboard}
        onClose={() => setShowKeyboard(false)} />

      }
      {showCalculator && !needsCalculator &&
      <CalculatorPopover
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)} />

      }
    </div>);

}