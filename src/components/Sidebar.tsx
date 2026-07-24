import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';
import { navigation, isNavGroup, NavGroup, NavPage } from '../config/navigation';
import { useProgressContext } from '../App';

function pageIsActive(page: NavPage, pathname: string) {
  return pathname === page.path || pathname.startsWith(page.path + '/');
}

function groupHasActivePage(group: NavGroup, pathname: string) {
  return group.pages.some(p => pageIsActive(p, pathname));
}

export default function Sidebar() {
  const location = useLocation();
  const { completed, completedCount, totalCheckpoints, percentComplete } = useProgressContext();

  const getInitialModuleExpanded = () => {
    const expanded: Record<string, boolean> = {};
    navigation.forEach(mod => {
      const hasActive = mod.items.some(item =>
        isNavGroup(item)
          ? groupHasActivePage(item, location.pathname)
          : pageIsActive(item, location.pathname)
      );
      if (hasActive) expanded[mod.id] = true;
    });
    if (Object.keys(expanded).length === 0) expanded['getting-started'] = true;
    return expanded;
  };

  const getInitialGroupExpanded = () => {
    const expanded: Record<string, boolean> = {};
    navigation.forEach(mod => {
      mod.items.forEach(item => {
        if (isNavGroup(item) && groupHasActivePage(item, location.pathname)) {
          expanded[item.id] = true;
        }
      });
    });
    return expanded;
  };

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(getInitialModuleExpanded);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(getInitialGroupExpanded);

  const toggleModule = (id: string) =>
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));

  const toggleGroup = (id: string) =>
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));

  const pageCheckpointStatus = (checkpoints?: string[]) => {
    if (!checkpoints?.length) return null;
    return checkpoints.every(cp => completed.has(cp)) ? 'complete' : null;
  };

  const groupCheckpointStatus = (group: NavGroup) => {
    const all = group.pages.flatMap(p => p.checkpoints || []);
    if (!all.length) return null;
    return all.every(cp => completed.has(cp)) ? 'complete' : null;
  };

  const renderPage = (page: NavPage, indent: number) => {
    const isActive = pageIsActive(page, location.pathname);
    const isDone = pageCheckpointStatus(page.checkpoints) === 'complete';
    return (
      <NavLink
        key={page.id}
        to={page.path}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          paddingLeft: indent,
          paddingRight: 12,
          paddingTop: 6,
          paddingBottom: 6,
          marginLeft: 4,
          marginRight: 4,
          marginTop: 1,
          marginBottom: 1,
          borderRadius: 6,
          backgroundColor: isActive ? '#EEF2FF' : 'transparent',
          color: isActive ? '#635BFF' : '#425466',
          fontWeight: isActive ? 500 : 400,
          fontSize: 13,
          textDecoration: 'none',
          lineHeight: '1.3',
        }}
      >
        <span style={{ flex: 1 }}>{page.label}</span>
        {isDone && <CheckCircle2 size={13} style={{ color: '#30B130', flexShrink: 0 }} />}
      </NavLink>
    );
  };

  const renderGroup = (group: NavGroup) => {
    const isOpen = expandedGroups[group.id] ?? false;
    const hasActive = groupHasActivePage(group, location.pathname);
    const isDone = groupCheckpointStatus(group) === 'complete';
    const color = group.color ?? '#635BFF';

    return (
      <div key={group.id}>
        <button
          onClick={() => toggleGroup(group.id)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            paddingLeft: 16,
            paddingRight: 12,
            paddingTop: 6,
            paddingBottom: 6,
            marginLeft: 4,
            marginRight: 4,
            marginTop: 1,
            marginBottom: 1,
            borderRadius: 6,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          {/* Color dot */}
          <span style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: color,
            flexShrink: 0,
          }} />
          <span style={{
            flex: 1,
            fontSize: 13,
            fontWeight: 500,
            color: hasActive ? color : '#0A2540',
            lineHeight: '1.3',
          }}>
            {group.label}
          </span>
          {isDone && <CheckCircle2 size={13} style={{ color: '#30B130', flexShrink: 0 }} />}
          {isOpen
            ? <ChevronDown size={13} style={{ color: '#425466', flexShrink: 0 }} />
            : <ChevronRight size={13} style={{ color: '#425466', flexShrink: 0 }} />
          }
        </button>

        {isOpen && (
          <div>
            {group.pages.map(page => renderPage(page, 28))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      width: 280,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      backgroundColor: 'white',
      borderRight: '1px solid #E6EBF1',
    }}>
      {/* Header + progress */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #E6EBF1' }}>
        <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#635BFF', marginBottom: 10 }}>
          Partner Solutions Lab
        </p>
        <div style={{ height: 6, borderRadius: 3, backgroundColor: '#E6EBF1', overflow: 'hidden', marginBottom: 6 }}>
          <div style={{ height: '100%', width: `${percentComplete}%`, backgroundColor: '#635BFF', borderRadius: 3, transition: 'width 0.3s' }} />
        </div>
        <p style={{ fontSize: 11, color: '#425466' }}>
          {completedCount} / {totalCheckpoints} checkpoints · {percentComplete}% complete
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', paddingTop: 8, paddingBottom: 8 }}>
        {navigation.map(mod => {
          const isExpanded = expandedModules[mod.id] ?? false;
          const hasActive = mod.items.some(item =>
            isNavGroup(item)
              ? groupHasActivePage(item, location.pathname)
              : pageIsActive(item, location.pathname)
          );

          return (
            <div key={mod.id} style={{ marginBottom: 4 }}>
              <button
                onClick={() => toggleModule(mod.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 16px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F6F9FC')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: hasActive ? '#0A2540' : '#425466',
                  lineHeight: '1.3',
                }}>
                  {mod.label}
                </span>
                {isExpanded
                  ? <ChevronDown size={13} style={{ color: '#425466', flexShrink: 0 }} />
                  : <ChevronRight size={13} style={{ color: '#425466', flexShrink: 0 }} />
                }
              </button>

              {isExpanded && (
                <div style={{ marginLeft: 4 }}>
                  {mod.items.map(item =>
                    isNavGroup(item)
                      ? renderGroup(item)
                      : renderPage(item, 16)
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
