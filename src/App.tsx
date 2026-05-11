/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PlayCircle, 
  Star, 
  Settings, 
  Search, 
  Bell, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Award,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Course {
  id: string;
  title: string;
  code: string;
  progress: number;
  image: string;
}

// --- Mock Data ---

const COURSES: Course[] = [
  {
    id: '1',
    title: 'Microblading Avançado',
    code: '#FA4BSD',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=400&h=250&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Microblading Avançado',
    code: '#F69D3C',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=400&h=250&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Microblading Eyeliner',
    code: '#F68D3C',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=400&h=250&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Microblading Eyeliner',
    code: '#F68D3C',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=400&h=250&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Microblading Avançado',
    code: '#FA4BSD',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1522337300263-9512ec28441b?q=80&w=400&h=250&auto=format&fit=crop'
  }
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <motion.button
    whileHover={{ x: 4 }}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium tracking-tight text-sm">{label}</span>
  </motion.button>
);

const CourseCard = ({ course }: { course: Course }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -4 }}
    className="min-w-[280px] group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300"
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img 
        src={course.image} 
        alt={course.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
    
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold text-zinc-100 line-clamp-1">{course.title}</h3>
      </div>
      
      <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
        <span>{course.code}</span>
        <span>{course.progress}% Completo</span>
      </div>
      
      <div className="relative h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${course.progress}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute h-full bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"
        />
      </div>
      
      <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium rounded-lg transition-colors duration-200">
        Continuar
      </button>
    </div>
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-black text-zinc-200 flex font-sans selection:bg-pink-500/30">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-64 border-r border-zinc-800 p-6 flex flex-col gap-8 fixed lg:sticky top-0 h-screen overflow-y-auto z-[60] bg-black/95 lg:bg-black"
          >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 px-2">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20">
                    <span className="text-white font-bold text-lg">P</span>
                </div>
                <h1 className="text-xl font-bold tracking-tighter text-white">PMUCLASS</h1>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-zinc-500">
                    <ChevronLeft size={20} />
                </button>
            </div>

            <nav className="flex flex-col gap-2">
              <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} />
              <SidebarItem icon={PlayCircle} label="My Courses" active={activeTab === 'My Courses'} />
              <SidebarItem icon={Star} label="Favorites" active={activeTab === 'Favorites'} />
              <div className="my-4 border-t border-zinc-800/50 mx-2" />
              <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} />
            </nav>

            <div className="mt-auto px-2">
              <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl space-y-3">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Suporte</p>
                <p className="text-xs text-zinc-400">Dúvidas com algum curso? Nossa equipe está pronta para ajudar.</p>
                <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-lg border border-white/10 transition-all">
                  Central de Ajuda
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="h-20 border-b border-zinc-800 px-4 lg:px-8 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-50">
          <div className="flex items-center gap-4 flex-1">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 lg:fixed lg:top-4 lg:left-4 z-[70] transition-all hover:border-zinc-700"
              >
                <MoreVertical size={20} className="text-white" />
              </button>
            )}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-pink-500 transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Search your next transformation..." 
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 transition-all"
                />
                </div>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6 ml-4">
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-black" />
            </button>

            <div className="hidden sm:block h-8 w-px bg-zinc-800" />

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-white group-hover:text-pink-400 transition-colors uppercase tracking-tight">João Silva</p>
                <div className="flex items-center gap-1 justify-end">
                  < Award size={10} className="text-orange-500" />
                  <p className="text-[10px] font-bold text-orange-500 uppercase tracking-tighter">VIP Aluno</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full ring-2 ring-zinc-800 ring-offset-2 ring-offset-black overflow-hidden group-hover:ring-pink-500 transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 lg:p-8 space-y-12 max-w-[1400px] mx-auto">
          {/* Hero Banner */}
          <section className="relative rounded-[24px] lg:rounded-[32px] overflow-hidden bg-zinc-900 min-h-[450px] lg:min-h-[400px] flex items-center shadow-2xl shadow-pink-500/5 border border-zinc-800/50">
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-full lg:w-1/2 h-1/2 lg:h-full">
                <img 
                  src="https://images.unsplash.com/photo-1616394158624-a2ba9927964e?q=80&w=1200&h=800&auto=format&fit=crop" 
                  className="w-full h-full object-cover opacity-60 lg:opacity-60 mix-blend-luminosity"
                  alt="Microblading session"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-zinc-900 via-zinc-900/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              </div>
            </div>

            <div className="relative z-10 p-6 lg:p-12 max-w-2xl space-y-8 mt-48 lg:mt-0">
              <div className="space-y-4">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] font-display"
                >
                  IMAGINE VIVER DA SUA <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 underline-offset-8 decoration-pink-500/30">
                    ARTE COM CONFIANÇA
                  </span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg lg:text-xl text-zinc-400 font-medium"
                >
                  A agenda cheia todos os meses.
                </motion.p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                {[
                  { icon: TrendingUp, label: "Liberdade Financeira", color: "text-pink-500" },
                  { icon: Award, label: "Reconhecimento e Valorização", color: "text-orange-500" },
                  { icon: Calendar, label: "Agenda Lotada", color: "text-amber-500" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="space-y-2"
                  >
                    <item.icon className={item.color} size={24} />
                    <p className="text-[10px] lg:text-xs font-semibold text-zinc-200 leading-tight">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button className="w-full sm:w-auto px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 active:scale-95">
                  Explorar cursos
                </button>
                <button className="w-full sm:w-auto px-8 py-3 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all border border-zinc-700 active:scale-95">
                  Continuar aprendizado
                </button>
              </div>

              <div className="pt-4 flex items-center gap-6 text-zinc-500">
                <p className="text-[10px] lg:text-xs italic">Liberdade Financeira começa com decisão</p>
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="absolute bottom-6 right-6 lg:bottom-12 lg:right-12 flex gap-2">
              <button className="p-3 bg-black/40 backdrop-blur hover:bg-white/10 rounded-full border border-white/5 transition-all">
                <ChevronLeft size={20} />
              </button>
              <button className="p-3 bg-black/40 backdrop-blur hover:bg-white/10 rounded-full border border-white/5 transition-all text-pink-500">
                <ChevronRight size={20} />
              </button>
            </div>
          </section>

          {/* Courses Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Meus Cursos Comprados
                <div className="w-6 h-px bg-zinc-800" />
              </h2>
              <button className="text-zinc-500 hover:text-white text-sm font-medium transition-colors">
                Ver todos
              </button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide no-scrollbar">
              {COURSES.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>

          {/* Additional Section - New Releases or Suggested */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="col-span-full mb-2">
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    Lançamentos Premium
                    <div className="w-6 h-px bg-zinc-800" />
                </h2>
            </div>
            {[
              { title: "Labial Expert Pro", students: "1.2k", price: "R$ 497", img: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=600" },
              { title: "Nanoblading Masterclass", students: "850", price: "R$ 890", img: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=600" },
              { title: "Eyeliner Fio a Fio", students: "2.1k", price: "R$ 299", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="group relative h-[250px] rounded-[24px] overflow-hidden border border-zinc-800 ring-1 ring-white/5"
              >
                <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 space-y-1">
                  <p className="text-[10px] text-pink-500 font-bold uppercase tracking-[0.2em]">{item.students} Alunas</p>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-white font-black">{item.price}</span>
                    <button className="p-2 bg-white/10 backdrop-blur rounded-full hover:bg-white text-white hover:text-black transition-all">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
