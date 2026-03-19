import React, { useEffect, useState, useRef } from 'react';
import {
  CalculatorIcon,
  KeyboardIcon,
  ZoomInIcon,
  ZoomOutIcon,
  SunIcon,
  MoonIcon,
  ContrastIcon,
  Volume2Icon,
  LogOutIcon } from
'lucide-react';
export interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark' | 'high-contrast';
  onThemeChange: (theme: 'light' | 'dark' | 'high-contrast') => void;
  showQuestionNavInToolbar: boolean;
  onToggleNavInToolbar: () => void;
  showQuestionNavInHamburger: boolean;
  onToggleNavInHamburger: () => void;
  onToggleCalculator: () => void;
  onToggleKeyboard: () => void;
  onToggleAccessibility: () => void;
  zoomPercent: number;
  zoomIn: () => void;
  zoomOut: () => void;
  voiceNarrator: boolean;
  onToggleVoiceNarrator: () => void;
  onExit?: () => void;
}
export function SettingsPanel({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  onToggleCalculator,
  onToggleKeyboard,
  zoomPercent,
  zoomIn,
  zoomOut,
  voiceNarrator,
  onToggleVoiceNarrator,
  onExit
}: SettingsPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-[300px] rounded-xl shadow-lg py-2 z-50 animate-pop-in font-heading"
      style={{
        backgroundColor: 'var(--surface-white)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-default)'
      }}>
      
      {/* Theme Section */}
      <div
        className="px-4 py-3"
        style={{
          borderBottom: '1px solid var(--border-default)'
        }}>
        
        <div
          className="text-xs font-semibold mb-2 uppercase tracking-wider"
          style={{
            color: 'var(--text-muted)'
          }}>
          
          Theme
        </div>
        <div
          className="flex rounded-lg p-1"
          style={{
            backgroundColor: 'var(--surface-subtle)',
            border: '1px solid var(--border-default)'
          }}>
          
          <ThemeButton
            active={theme === 'light'}
            onClick={() => onThemeChange('light')}
            icon={<SunIcon size={14} />}
            label="Light" />
          
          <ThemeButton
            active={theme === 'dark'}
            onClick={() => onThemeChange('dark')}
            icon={<MoonIcon size={14} />}
            label="Dark" />
          
          <ThemeButton
            active={theme === 'high-contrast'}
            onClick={() => onThemeChange('high-contrast')}
            icon={<ContrastIcon size={14} />}
            label="Contrast" />
          
        </div>
      </div>

      {/* Tools Section */}
      <div
        className="py-2"
        style={{
          borderBottom: '1px solid var(--border-default)'
        }}>
        
        <SettingsItem
          icon={<CalculatorIcon size={16} />}
          label="Calculator"
          onClick={() => {
            onToggleCalculator();
            onClose();
          }} />
        
        <SettingsItem
          icon={<KeyboardIcon size={16} />}
          label="Virtual Keyboard"
          onClick={() => {
            onToggleKeyboard();
            onClose();
          }} />
        
        <div
          className="px-4 py-2 flex items-center justify-between transition-colors hover:bg-[var(--surface-subtle)] cursor-pointer"
          onClick={onToggleVoiceNarrator}>
          
          <div
            className="flex items-center gap-3 text-sm"
            style={{
              color: 'var(--text-primary)'
            }}>
            
            <Volume2Icon
              size={16}
              style={{
                color: 'var(--text-muted)'
              }} />
            
            <span>Voice Narrator</span>
          </div>
          <div
            className="w-8 h-4 rounded-full relative transition-colors"
            style={{
              backgroundColor: voiceNarrator ?
              'var(--exam-accent)' :
              'var(--border-medium)'
            }}>
            
            <div
              className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform"
              style={{
                left: voiceNarrator ? '18px' : '2px'
              }} />
            
          </div>
        </div>
      </div>

      {/* View Section */}
      <div
        className="py-2"
        style={{
          borderBottom: '1px solid var(--border-default)'
        }}>
        
        <div
          className="flex items-center justify-between px-4 py-2 transition-colors"
          style={{
            cursor: 'default'
          }}>
          
          <div className="flex items-center gap-3 text-sm">
            <ZoomInIcon
              size={16}
              style={{
                color: 'var(--text-muted)'
              }} />
            
            <span>Zoom</span>
          </div>
          <div
            className="flex items-center gap-2 rounded-md"
            style={{
              backgroundColor: 'var(--surface-subtle)',
              border: '1px solid var(--border-default)'
            }}>
            
            <button
              onClick={zoomOut}
              className="p-1 rounded-l-md transition-colors"
              style={{
                color: 'var(--text-secondary)'
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor =
                'var(--border-default)';
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = '';
              }}
              aria-label="Zoom out"
              title="Decrease text size">
              
              <ZoomOutIcon size={14} />
            </button>
            <span
              className="text-xs font-mono w-10 text-center"
              style={{
                color: 'var(--text-primary)'
              }}>
              
              {zoomPercent}%
            </span>
            <button
              onClick={zoomIn}
              className="p-1 rounded-r-md transition-colors"
              style={{
                color: 'var(--text-secondary)'
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor =
                'var(--border-default)';
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = '';
              }}
              aria-label="Zoom in"
              title="Increase text size">
              
              <ZoomInIcon size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div
        className="px-4 py-3"
        style={{
          borderBottom: onExit ? '1px solid var(--border-default)' : undefined
        }}>
        
        <div
          className="text-xs font-semibold mb-2.5 uppercase tracking-wider"
          style={{
            color: 'var(--text-muted)'
          }}>
          
          Keyboard Shortcuts
        </div>
        <div className="flex flex-col gap-2">
          <ShortcutRow keys={['A', 'B', 'C', 'D']} label="Select answer" />
          <ShortcutRow keys={['←', '→']} label="Navigate questions" />
          <ShortcutRow keys={['Enter']} label="Next question" />
          <ShortcutRow keys={['F']} label="Flag question" />
        </div>
      </div>

      {/* Exit Exam */}
      {onExit &&
      <div className="px-4 py-3">
          <ExitButton onExit={onExit} onClose={onClose} />
        </div>
      }
    </div>);

}
function ThemeButton({
  active,
  onClick,
  icon,
  label





}: {active: boolean;onClick: () => void;icon: React.ReactNode;label: string;}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-colors"
      style={{
        backgroundColor: active ? 'var(--brand-primary)' : 'transparent',
        color: active ? 'var(--brand-primary-text)' : 'var(--text-muted)',
        boxShadow: active ? '0 1px 3px rgba(0,0,0,0.2)' : 'none'
      }}
      onMouseEnter={(e) => {
        if (!active)
        (e.currentTarget as HTMLElement).style.backgroundColor =
        'var(--surface-subtle)';
      }}
      onMouseLeave={(e) => {
        if (!active)
        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
      }}>
      
      {icon}
      {label}
    </button>);

}
function SettingsItem({
  icon,
  label,
  onClick,
  shortcut





}: {icon: React.ReactNode;label: string;onClick: () => void;shortcut?: string;}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-2 transition-colors text-sm"
      style={{
        color: 'var(--text-primary)'
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.backgroundColor =
        'var(--surface-subtle)';
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.backgroundColor = '';
      }}>
      
      <div className="flex items-center gap-3">
        <span
          style={{
            color: 'var(--text-muted)'
          }}>
          
          {icon}
        </span>
        <span>{label}</span>
      </div>
      {shortcut &&
      <span
        className="text-xs font-mono"
        style={{
          color: 'var(--text-muted)'
        }}>
        
          {shortcut}
        </span>
      }
    </button>);

}
function ExitButton({
  onExit,
  onClose



}: {onExit: () => void;onClose: () => void;}) {
  const [confirming, setConfirming] = useState(false);
  if (confirming) {
    return (
      <div className="flex flex-col gap-2">
        <p
          className="text-xs font-heading font-medium"
          style={{
            color: 'var(--semantic-error-text)'
          }}>
          
          Are you sure? Unanswered questions will not be saved.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              onClose();
              onExit();
            }}
            className="flex-1 py-2 rounded-lg text-xs font-heading font-bold transition-colors"
            style={{
              backgroundColor: 'var(--semantic-error-text)',
              color: '#FFFFFF'
            }}>
            
            Yes, Exit
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="flex-1 py-2 rounded-lg border text-xs font-heading font-semibold transition-colors"
            style={{
              borderColor: 'var(--border-medium)',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--surface-white)'
            }}>
            
            Cancel
          </button>
        </div>
      </div>);

  }
  return (
    <button
      onClick={() => setConfirming(true)}
      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border text-sm font-heading font-semibold transition-colors"
      style={{
        borderColor: 'var(--semantic-error-border)',
        color: 'var(--semantic-error-text)',
        backgroundColor: 'var(--semantic-error-bg)'
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.backgroundColor =
        'var(--semantic-error-border)';
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.backgroundColor =
        'var(--semantic-error-bg)';
      }}>
      
      <LogOutIcon size={15} />
      Exit Exam
    </button>);

}
function ShortcutRow({ keys, label }: {keys: string[];label: string;}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className="text-xs"
        style={{
          color: 'var(--text-subtle)'
        }}>
        
        {label}
      </span>
      <div className="flex gap-1">
        {keys.map((k, i) =>
        <kbd
          key={i}
          className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded"
          style={{
            color: 'var(--text-muted)',
            border: '1px solid var(--border-default)',
            backgroundColor: 'var(--surface-subtle)'
          }}>
          
            {k}
          </kbd>
        )}
      </div>
    </div>);

}