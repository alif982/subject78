import { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  Search, 
  RotateCcw, 
  BookOpen, 
  PenTool, 
  Languages, 
  Globe, 
  Quote,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  LogIn,
  LogOut,
  Cloud,
  CloudOff,
  Loader2,
  User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { syllabusData, type Subject, type Topic } from './data';
import { 
  auth, 
  db, 
  signInWithGoogle, 
  logout, 
  handleFirestoreError, 
  OperationType 
} from './lib/firebase';
import { 
  onAuthStateChanged, 
  type User 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  writeBatch,
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';

const SUBJECT_ICONS = {
  BookOpen: BookOpen,
  PenTool: PenTool,
  Languages: Languages,
  Globe: Globe,
};

const MOTIVATIONAL_QUOTES = [
  "The secret to getting ahead is getting started.",
  "Your education is a dress rehearsal for a life that is yours to lead.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The expert in anything was once a beginner.",
  "Believe you can and you're halfway there."
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('syllabus-progress');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error('Error loading progress:', e);
      return {};
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [hideCompletedSubjects, setHideCompletedSubjects] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [collapsedSubjects, setCollapsedSubjects] = useState<Record<string, boolean>>({});
  const [hiddenSubjects, setHiddenSubjects] = useState<Record<string, boolean>>({});

  // 1. Initial connection test & Auth listener
  useEffect(() => {
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch/Merge progress when user logs in
  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      setSyncing(true);
      const progressPath = `users/${user.uid}/progress`;
      try {
        const q = query(collection(db, progressPath));
        const snapshot = await getDocs(q);
        
        const firestoreProgress: Record<string, boolean> = {};
        snapshot.forEach(doc => {
          if (doc.data().completed) {
            firestoreProgress[doc.id] = true;
          }
        });

        // Merge logic: Local storage might have progress from guest session
        // We'll prioritize what's already in Firestore, but add new ones from local
        setCompletedTopics(prev => {
          const merged = { ...firestoreProgress, ...prev };
          
          // If local had things Firestore didn't, sync them back to Firestore
          const batch = writeBatch(db);
          let hasNew = false;
          Object.keys(prev).forEach(topicId => {
            if (prev[topicId] && !firestoreProgress[topicId]) {
              const docRef = doc(db, `users/${user.uid}/progress`, topicId);
              batch.set(docRef, { completed: true, updatedAt: serverTimestamp() });
              hasNew = true;
            }
          });
          
          if (hasNew) {
            batch.commit().catch(e => handleFirestoreError(e, OperationType.WRITE, progressPath));
          }
          
          return merged;
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, progressPath);
      } finally {
        setSyncing(false);
      }
    };

    fetchProgress();
  }, [user]);

  // 3. Local storage persistence
  useEffect(() => {
    localStorage.setItem('syllabus-progress', JSON.stringify(completedTopics));
  }, [completedTopics]);

  const toggleTopic = async (id: string) => {
    const newState = !completedTopics[id];
    setCompletedTopics(prev => ({
      ...prev,
      [id]: newState
    }));

    if (user) {
      const path = `users/${user.uid}/progress/${id}`;
      try {
        await setDoc(doc(db, path), {
          completed: newState,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    }
  };

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const toggleSubject = (subjectId: string) => {
    setCollapsedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  const toggleHideSubject = (subjectId: string) => {
    setHiddenSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  const toggleAllSubjects = (collapse: boolean) => {
    const newCollapsed: Record<string, boolean> = {};
    syllabusData.forEach(s => {
      newCollapsed[s.id] = collapse;
    });
    setCollapsedSubjects(newCollapsed);
  };

  const completeAllSubject = async (subjectId: string) => {
    const subject = syllabusData.find(s => s.id === subjectId);
    if (!subject) return;

    const newCompleted = { ...completedTopics };
    const batch = user ? writeBatch(db) : null;
    let anyChange = false;

    subject.categories.forEach(cat => {
      cat.topics.forEach(topic => {
        if (!newCompleted[topic.id]) {
          newCompleted[topic.id] = true;
          anyChange = true;
          if (user && batch) {
            const docRef = doc(db, `users/${user.uid}/progress`, topic.id);
            batch.set(docRef, { completed: true, updatedAt: serverTimestamp() });
          }
        }
      });
    });

    if (!anyChange) return;

    setCompletedTopics(newCompleted);
    if (user && batch) {
      const path = `users/${user.uid}/progress`;
      try {
        await batch.commit();
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    }
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setCompletedTopics({});
      if (user) {
        // Warning: This only resets UI/State. 
        // In a real app we might delete docs, but for safety we'll just let them toggle.
        // Actually let's clean up Firestore if they reset.
        const resetFirestore = async () => {
          setSyncing(true);
          try {
            const q = query(collection(db, `users/${user.uid}/progress`));
            const snapshot = await getDocs(q);
            const batch = writeBatch(db);
            snapshot.forEach(d => batch.delete(d.ref));
            await batch.commit();
          } catch (error) {
            console.error("Failed to reset Firestore progress", error);
          } finally {
            setSyncing(false);
          }
        };
        resetFirestore();
      }
    }
  };

  const handleSignIn = async () => {
    if (isLoggingIn) return;
    setAuthError(null);
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-by-user') {
        setAuthError('Sign-in cancelled. Please try again.');
        setTimeout(() => setAuthError(null), 3000);
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Silently handle
      } else if (error.code === 'auth/unauthorized-domain') {
        setAuthError('Unauthorized Domain: Please add this URL to Firebase Authentication Authorized Domains.');
        setTimeout(() => setAuthError(null), 8000);
      } else {
        setAuthError(`Sign-in failed: ${error.message || 'Check your connection'}`);
        setTimeout(() => setAuthError(null), 5000);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const stats = useMemo(() => {
    let total = 0;
    let completed = 0;

    syllabusData.forEach(subject => {
      subject.categories.forEach(cat => {
        total += cat.topics.length;
        cat.topics.forEach(topic => {
          if (completedTopics[topic.id]) completed++;
        });
      });
    });

    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return { total, completed, remaining: total - completed, percentage };
  }, [completedTopics]);

  const filteredSyllabus = useMemo(() => {
    return syllabusData.filter(subject => {
      // Hide subjects manually hidden
      if (hiddenSubjects[subject.id]) return false;

      // Filter by group
      if (selectedGroup !== 'all' && subject.group !== selectedGroup) return false;

      // Filter by subject selection
      if (selectedSubjectId !== 'all' && subject.id !== selectedSubjectId) return false;

      // Calculate subject completion
      let subTotal = 0;
      let subCompleted = 0;
      subject.categories.forEach(cat => {
        subTotal += cat.topics.length;
        cat.topics.forEach(topic => {
          if (completedTopics[topic.id]) subCompleted++;
        });
      });
      const isFinished = subTotal > 0 && subCompleted === subTotal;

      // Hide completed subjects if toggled
      if (hideCompletedSubjects && isFinished) return false;

      // Filter categories/topics by search query
      const hasMatchingTopic = subject.categories.some(cat => 
        cat.topics.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      return hasMatchingTopic;
    }).map(subject => ({
      ...subject,
      categories: subject.categories.map(cat => ({
        ...cat,
        topics: cat.topics.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
      })).filter(cat => cat.topics.length > 0)
    }));
  }, [searchQuery, hideCompletedSubjects, completedTopics, selectedSubjectId, selectedGroup]);

  const quote = useMemo(() => {
    const today = new Date().toDateString();
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = today.charCodeAt(i) + ((hash << 5) - hash);
    }
    return MOTIVATIONAL_QUOTES[Math.abs(hash) % MOTIVATIONAL_QUOTES.length];
  }, []);

  return (
    <div className="min-h-screen py-6 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-6 font-sans bg-slate-50 text-black">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight text-black flex items-center gap-3">
            <span className="w-2.5 h-10 bg-black rounded-full"></span>
            Admission Syllabus Tracker
          </h1>
          <p className="text-slate-500 text-sm mt-1">Syllabus Master</p>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
          {/* User Auth Section */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
              {authLoading ? (
                <div className="px-3">
                  <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                </div>
              ) : user ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end px-2 hidden sm:flex">
                    <span className="text-xs font-bold text-black truncate max-w-[120px]">{user.displayName}</span>
                    <span className="text-[10px] text-slate-500">Synced to Cloud</span>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-black border border-slate-200 overflow-hidden">
                    {user.photoURL ? <img src={user.photoURL} alt="" /> : <UserIcon className="w-4 h-4" />}
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors rounded-xl"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  disabled={isLoggingIn}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md ${
                    isLoggingIn ? 'bg-slate-400 cursor-not-allowed' : 'bg-black text-white hover:bg-zinc-800'
                  }`}
                >
                  {isLoggingIn ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  {isLoggingIn ? 'Signing In...' : 'Sign In'}
                </button>
              )}
            </div>
            {authError && (
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] text-red-500 font-bold bg-red-50 px-2 py-1 rounded-lg border border-red-200"
              >
                {authError}
              </motion.span>
            )}
          </div>

          <div className="glass-panel px-4 py-2.5 flex items-center gap-3 flex-1 md:flex-none md:w-64 bg-white border-slate-200">
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 text-black"
            />
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <button
            onClick={resetProgress}
            className="px-5 py-2.5 rounded-xl bg-red-50 text-red-500 border border-red-200 text-sm font-semibold hover:bg-red-100 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Topics', value: stats.total, border: 'border-l-emerald-500' },
          { label: 'Completed', value: stats.completed, border: 'border-l-cyan-500' },
          { label: 'Remaining', value: stats.remaining, border: 'border-l-amber-500' },
          { 
            label: 'Total Progress', 
            value: `${Math.round(stats.percentage)}%`, 
            border: 'border-l-black', 
            progress: stats.percentage 
          }
        ].map((stat, i) => (
          <div key={i} className={`glass-panel p-5 flex flex-col justify-center border-l-4 ${stat.border} bg-white shadow-sm border-slate-100`}>
            <span className="text-[10px] uppercase tracking-wider text-black font-bold mb-1">{stat.label}</span>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-black text-black">{stat.value}</span>
              {stat.progress !== undefined && (
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }}
                    className="h-full bg-black"
                    transition={{ duration: 1 }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Subject Filter Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2 p-1 bg-slate-200/50 rounded-2xl w-fit">
            {['all', 'General', 'Science'].map(group => (
              <button
                key={group}
                onClick={() => {
                  setSelectedGroup(group);
                  setSelectedSubjectId('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${
                  selectedGroup === group 
                  ? 'bg-black text-white shadow-md' 
                  : 'text-slate-500 hover:text-black'
                }`}
              >
                {group}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setHideCompletedSubjects(!hideCompletedSubjects)}
              className={`px-5 py-2.5 rounded-xl border flex items-center gap-2 text-sm font-black transition-all shadow-sm ${
                hideCompletedSubjects 
                ? 'bg-black text-white border-black ring-2 ring-black/10' 
                : 'bg-white border-slate-200 text-black hover:bg-slate-50'
              }`}
            >
              {hideCompletedSubjects ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {hideCompletedSubjects ? 'Hiding Finished' : 'Hide Finished'}
            </button>

            <div className="flex gap-1 bg-slate-200/50 p-1 rounded-xl">
              <button
                onClick={() => toggleAllSubjects(true)}
                className="p-2 hover:bg-white rounded-lg transition-all text-black"
                title="Collapse All"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleAllSubjects(false)}
                className="p-2 hover:bg-white rounded-lg transition-all text-black"
                title="Expand All"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {(Object.keys(hiddenSubjects).some(id => hiddenSubjects[id])) && (
              <button
                onClick={() => setHiddenSubjects({})}
                className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider hover:bg-slate-200 transition-all flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Hidden
              </button>
            )}
          </div>
        </div>

        {/* Individual Subject Quick Filter (Only shown if a specific group is selected or all) */}
        <div className="flex flex-wrap gap-2 items-center pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedSubjectId('all')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
              selectedSubjectId === 'all'
              ? 'bg-slate-800 text-white border-slate-800'
              : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
            }`}
          >
            All Subjects
          </button>
          {syllabusData
            .filter(s => selectedGroup === 'all' || s.group === selectedGroup)
            .map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSubjectId(s.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                  selectedSubjectId === s.id
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                }`}
              >
                {s.title}
              </button>
            ))}
        </div>
      </div>

      {/* Subjects Container - Grouped Sections */}
      <div className="flex flex-col gap-12">
        {['General', 'Science'].map(groupName => {
          const subjectsInGroup = filteredSyllabus.filter(s => s.group === groupName);
          if (subjectsInGroup.length === 0) return null;
          
          return (
            <div key={groupName} className="flex flex-col gap-6">
              <div className="flex items-center gap-4 px-2">
                <h2 className="text-xl font-black uppercase tracking-[0.3em] text-slate-400">{groupName}</h2>
                <div className="h-px flex-1 bg-slate-200"></div>
                <span className="text-[10px] font-bold text-slate-400 px-3 py-1 bg-white border border-slate-100 rounded-full">
                  {subjectsInGroup.length} {subjectsInGroup.length === 1 ? 'Subject' : 'Subjects'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {subjectsInGroup.map((subject) => {
                  let subTotal = 0;
                  let subCompleted = 0;
                  subject.categories.forEach(cat => {
                    subTotal += cat.topics.length;
                    cat.topics.forEach(topic => {
                      if (completedTopics[topic.id]) subCompleted++;
                    });
                  });
                  const subPercentage = subTotal > 0 ? (subCompleted / subTotal) * 100 : 0;
                  
                  const isCollapsed = collapsedSubjects[subject.id];
                  
                  return (
                    <div key={subject.id} className="glass-panel p-6 flex flex-col h-fit hover:bg-white transition-all duration-300 group bg-white shadow-sm border-slate-100">
                      <div className="flex justify-between items-start mb-5">
                        <button 
                          onClick={() => toggleSubject(subject.id)}
                          className="flex items-center gap-4 text-left group/title"
                        >
                          <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-black font-bold text-lg shadow-sm border border-slate-100 group-hover/title:border-slate-300 transition-all`}>
                            {subject.id.split('-').map(p => p[0].toUpperCase()).join('')}
                          </div>
                          <div className="flex flex-col">
                            <h2 className="text-xl font-semibold text-black group-hover/title:text-zinc-600 transition-colors">{subject.title}</h2>
                            <span className="text-[10px] font-black text-black uppercase tracking-widest">{Math.round(subPercentage)}% COMPLETED</span>
                          </div>
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleHideSubject(subject.id)}
                            className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 transition-all"
                            title="Hide Subject Card"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleSubject(subject.id)}
                            className={`p-2 rounded-lg border transition-all ${
                              isCollapsed 
                              ? 'bg-black text-white border-black ring-2 ring-black/10' 
                              : 'bg-white border-slate-200 text-slate-400 hover:text-black'
                            }`}
                            title={isCollapsed ? "Show Topics" : "Minimize Topics"}
                          >
                            {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => completeAllSubject(subject.id)}
                            className={`text-[10px] uppercase font-bold text-black bg-white px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-all border border-slate-200`}
                          >
                            Complete All
                          </button>
                        </div>
                      </div>

                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6 relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${subPercentage}%` }}
                              className={`h-full bg-black rounded-full`}
                              transition={{ duration: 0.8 }}
                            />
                          </div>

                          <div className="topic-list overflow-y-auto flex-1 pr-3 space-y-2 max-h-[400px]">
                            <AnimatePresence>
                              {subject.categories.map((cat) => {
                                const categoryKey = `${subject.id}-${cat.name}`;
                                const isCatCollapsed = expandedCategories[categoryKey];
                                const hasMultipleCategories = subject.categories.length > 1;
                                
                                return (
                                  <AnimatePresence key={cat.name}>
                                    {(() => {
                                      const visibleTopics = cat.topics.filter(t => !(hideCompletedSubjects && completedTopics[t.id]));
                                      if (visibleTopics.length === 0 && hideCompletedSubjects) return null;

                                      return (
                                        <motion.div 
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                          className="space-y-2 border-b border-slate-50 last:border-0 pb-4"
                                        >
                                          {hasMultipleCategories && (
                                            <button 
                                              onClick={() => toggleCategory(categoryKey)}
                                              className="w-full flex items-center justify-between text-[10px] font-bold text-black hover:opacity-70 transition-colors uppercase tracking-[0.2em] py-2 cursor-pointer group/cat"
                                            >
                                              <div className="flex items-center gap-2">
                                                <span className={`w-1 h-1 rounded-full bg-black`}></span>
                                                {cat.name}
                                                <span className="opacity-40 ml-1">({visibleTopics.length})</span>
                                              </div>
                                              {isCatCollapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                                            </button>
                                          )}
                                          
                                          {(isCatCollapsed && hasMultipleCategories) ? null : (
                                            <motion.div 
                                              initial={hasMultipleCategories ? { opacity: 0, height: 0 } : false}
                                              animate={{ opacity: 1, height: 'auto' }}
                                              exit={{ opacity: 0, height: 0 }}
                                              className="grid gap-2 overflow-hidden"
                                            >
                                              {visibleTopics.map(topic => {
                                                const isDone = completedTopics[topic.id];
                                                return (
                                                  <button
                                                    key={topic.id}
                                                    onClick={() => toggleTopic(topic.id)}
                                                    className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all duration-200 text-left group/topic ${
                                                      isDone 
                                                      ? `bg-emerald-50 border-emerald-100 text-emerald-900 shadow-sm` 
                                                      : 'bg-white border-slate-100 text-black hover:border-slate-300 hover:bg-slate-50'
                                                    }`}
                                                  >
                                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-300 ${
                                                      isDone 
                                                      ? `border-emerald-500 bg-emerald-500 text-white` 
                                                      : 'border-slate-300 group-hover/topic:border-slate-500'
                                                    }`}>
                                                      {isDone && <CheckCircle2 className="w-4 h-4" />}
                                                    </div>
                                                    <span className="text-sm font-medium">{topic.name}</span>
                                                  </button>
                                                );
                                              })}
                                            </motion.div>
                                          )}
                                        </motion.div>
                                      );
                                    })()}
                                  </AnimatePresence>
                                );
                              })}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quote Footer Section */}
      <div className="mt-4 glass-panel p-6 flex flex-col md:flex-row justify-between items-center gap-6 bg-white border-slate-200">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-black bg-slate-50 shadow-sm">
            <Quote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm md:text-base italic text-slate-600 font-medium max-w-xl">
              "{quote}"
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Daily Inspiration</p>
          </div>
        </div>
        
        <div className="flex gap-8 text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100">
          <div className="flex flex-col items-end gap-1">
            <span className="opacity-60">Database</span>
            <span className={user ? 'text-black font-bold' : 'text-amber-600 font-bold'}>
              {user ? 'Connected' : 'Offline Mode'}
            </span>
          </div>
          <div className="w-px h-10 bg-slate-200"></div>
          <div className="flex flex-col items-end gap-1">
            <span className="opacity-60">Status</span>
            <span className="text-emerald-600 flex items-center gap-2 font-bold">
              {syncing ? <Loader2 className="w-3 h-3 animate-spin" /> : (user ? <Cloud className="w-3 h-3" /> : <CloudOff className="w-3 h-3" />)}
              {syncing ? 'Syncing...' : 'Saved'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
