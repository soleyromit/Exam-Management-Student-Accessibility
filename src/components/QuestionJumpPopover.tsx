import React, { useEffect, useState, useRef } from 'react';
import {
  CheckCircleIcon,
  FlagIcon,
  CircleIcon,
  ChevronDownIcon,
  ChevronRightIcon } from
'lucide-react';
import { Question } from '../data/questions';
export interface QuestionJumpPopoverProps {
  questions: Question[];
  currentIndex: number;
  answeredSet: Set<number>;
  flaggedSet: Set<number>;
  onNavigate: (index: number) => void;
  isOpen: boolean;
  onClose: () => void;
}
interface GroupedQuestion {
  index: number;
  question: Question;
}
export function QuestionJumpPopover({
  questions,
  currentIndex,
  answeredSet,
  flaggedSet,
  onNavigate,
  isOpen,
  onClose
}: QuestionJumpPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>>(
    {
      unanswered: false,
      answered: false,
      flagged: false
    });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  // Group questions by status
  const answered: GroupedQuestion[] = [];
  const flagged: GroupedQuestion[] = [];
  const unanswered: GroupedQuestion[] = [];
  questions.forEach((q, i) => {
    const entry = {
      index: i,
      question: q
    };
    if (answeredSet.has(i)) {
      answered.push(entry);
    } else if (flaggedSet.has(i)) {
      flagged.push(entry);
    } else {
      unanswered.push(entry);
    }
  });
  const total = questions.length;
  const answeredCount = answered.length;
  const flaggedCount = flagged.length;
  const unansweredCount = unanswered.length;
  const toggleSection = (key: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const truncate = (text: string, max: number) =>
  text.length > max ? text.slice(0, max) + '…' : text;
  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-2 z-50 animate-pop-in flex flex-col overflow-hidden"
      style={{
        width: '320px',
        backgroundColor: 'var(--surface-white)',
        border: '1px solid var(--border-default)',
        borderRadius: '12px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.12)'
      }}>
      
      {/* Legend row */}
      <div
        className="px-3 pt-3 pb-1 flex items-center gap-4 text-[11px] font-heading font-medium"
        style={{
          color: 'var(--text-secondary)'
        }}>
        
        <span className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: 'var(--state-answered-border)'
            }} />
          
          Answered · {answeredCount}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: 'var(--border-medium)'
            }} />
          
          Unanswered · {unansweredCount}
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: 'var(--state-flagged-border)'
            }} />
          
          Flagged · {flaggedCount}
        </span>
      </div>

      {/* Segmented progress bar */}
      <div className="flex w-full px-3 pb-2.5 pt-1.5">
        <div
          className="flex w-full overflow-hidden"
          style={{
            height: '6px',
            borderRadius: '9999px',
            backgroundColor: 'var(--surface-subtle)'
          }}>
          
          {answeredCount > 0 &&
          <div
            className="transition-all duration-300"
            style={{
              flexGrow: answeredCount,
              backgroundColor: 'var(--state-answered-border)'
            }} />

          }
          {unansweredCount > 0 &&
          <div
            style={{
              flexGrow: unansweredCount,
              backgroundColor: 'var(--border-medium)'
            }} />

          }
          {flaggedCount > 0 &&
          <div
            className="transition-all duration-300"
            style={{
              flexGrow: flaggedCount,
              backgroundColor: 'var(--state-flagged-border)'
            }} />

          }
        </div>
      </div>

      <div
        className="w-full"
        style={{
          height: '1px',
          backgroundColor: 'var(--border-default)'
        }} />
      

      {/* Scrollable sections */}
      <div
        className="overflow-y-auto"
        style={{
          maxHeight: '340px'
        }}>
        
        {/* Unanswered Section */}
        <SectionGroup
          title="Unanswered"
          count={unansweredCount}
          items={unanswered}
          isCollapsed={collapsedSections.unanswered}
          onToggle={() => toggleSection('unanswered')}
          currentIndex={currentIndex}
          onNavigate={onNavigate}
          onClose={onClose}
          truncate={truncate}
          badgeColor="var(--text-muted)"
          badgeBg="var(--surface-subtle)"
          renderIcon={() =>
          <CircleIcon
            size={14}
            style={{
              color: 'var(--text-subtle)'
            }} />

          } />
        

        <div
          className="w-full"
          style={{
            height: '1px',
            backgroundColor: 'var(--border-default)'
          }} />
        

        {/* Answered Section */}
        <SectionGroup
          title="Answered"
          count={answeredCount}
          items={answered}
          isCollapsed={collapsedSections.answered}
          onToggle={() => toggleSection('answered')}
          currentIndex={currentIndex}
          onNavigate={onNavigate}
          onClose={onClose}
          truncate={truncate}
          badgeColor="var(--state-answered-text)"
          badgeBg="var(--state-answered-bg)"
          renderIcon={() =>
          <CheckCircleIcon
            size={14}
            style={{
              color: 'var(--state-answered-text)'
            }} />

          } />
        

        <div
          className="w-full"
          style={{
            height: '1px',
            backgroundColor: 'var(--border-default)'
          }} />
        

        {/* Flagged Section */}
        <SectionGroup
          title="Flagged"
          count={flaggedCount}
          items={flagged}
          isCollapsed={collapsedSections.flagged}
          onToggle={() => toggleSection('flagged')}
          currentIndex={currentIndex}
          onNavigate={onNavigate}
          onClose={onClose}
          truncate={truncate}
          badgeColor="var(--state-flagged-text)"
          badgeBg="var(--state-flagged-bg)"
          renderIcon={() =>
          <FlagIcon
            size={13}
            style={{
              color: 'var(--state-flagged-text)'
            }} />

          } />
        
      </div>
    </div>);

}
/* ── Section Group Sub-component ─────────────────────────────────────────── */
interface SectionGroupProps {
  title: string;
  count: number;
  items: GroupedQuestion[];
  isCollapsed: boolean;
  onToggle: () => void;
  currentIndex: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
  truncate: (text: string, max: number) => string;
  badgeColor: string;
  badgeBg: string;
  renderIcon: () => React.ReactNode;
}
function SectionGroup({
  title,
  count,
  items,
  isCollapsed,
  onToggle,
  currentIndex,
  onNavigate,
  onClose,
  truncate,
  badgeColor,
  badgeBg,
  renderIcon
}: SectionGroupProps) {
  const ChevronComp = isCollapsed ? ChevronRightIcon : ChevronDownIcon;
  return (
    <div>
      {/* Section header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2 text-left transition-colors hover:opacity-80"
        style={{
          backgroundColor: 'var(--surface-subtle)'
        }}>
        
        <ChevronComp
          size={14}
          style={{
            color: 'var(--text-muted)',
            flexShrink: 0
          }} />
        
        <span
          className="font-heading font-semibold text-xs flex-1"
          style={{
            color: 'var(--text-primary)'
          }}>
          
          {title}
        </span>
        <span
          className="text-[11px] font-heading font-bold px-1.5 py-0.5 rounded-full"
          style={{
            color: badgeColor,
            backgroundColor: badgeBg
          }}>
          
          {count}
        </span>
      </button>

      {/* Section items */}
      {!isCollapsed &&
      <div className="flex flex-col">
          {items.length === 0 ?
        <div
          className="px-3 py-3 text-[11px] font-heading"
          style={{
            color: 'var(--text-subtle)'
          }}>
          
              No questions in this group
            </div> :

        items.map(({ index: i, question: q }) => {
          const isCurrent = i === currentIndex;
          return (
            <button
              key={i}
              onClick={() => {
                onNavigate(i);
                onClose();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-left transition-all hover:opacity-80 exam-focus"
              style={{
                backgroundColor: isCurrent ?
                'var(--exam-accent-light)' :
                'transparent',
                borderLeft: isCurrent ?
                '3px solid var(--exam-accent)' :
                '3px solid transparent'
              }}>
              
                  {/* Question number */}
                  <span
                className="font-heading font-bold text-xs w-6 text-center flex-shrink-0"
                style={{
                  color: isCurrent ?
                  'var(--exam-accent)' :
                  'var(--text-primary)'
                }}>
                
                    {i + 1}
                  </span>

                  {/* Question text preview */}
                  <span
                className="text-[11px] leading-snug flex-1 truncate"
                style={{
                  color: isCurrent ?
                  'var(--exam-accent)' :
                  'var(--text-secondary)'
                }}>
                
                    {truncate(q.text, 40)}
                  </span>

                  {/* Status icon */}
                  <span className="flex-shrink-0">{renderIcon()}</span>
                </button>);

        })
        }
        </div>
      }
    </div>);

}