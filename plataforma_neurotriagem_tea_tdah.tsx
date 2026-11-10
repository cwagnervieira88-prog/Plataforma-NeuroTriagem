import React, { useState } from 'react';
import {
  Stethoscope,
  CheckCircle,
  FileBadge,
  Printer,
  Download,
  ShieldAlert,
  Award,
  BookOpen,
  User,
  ZoomIn,
  Sun,
  Moon,
  ChevronRight,
  RefreshCw,
  Activity,
  Brain,
  FileText
} from 'lucide-react';

export default function App() {
  // Identificação do Profissional (Editável livremente)
  const [profName, setProfName] = useState('Dr(a). Maria Silva');
  const [profCouncil, setProfCouncil] = useState('CRP 06/123456');

  // Termos Bioéticos e Navegação
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [fontSize, setFontSize] = useState('base'); // 'base', 'lg', 'xl'
  const [highContrast, setHighContrast] = useState(false);
  const [profile, setProfile] = useState(null); // 'toddler', 'school', 'adult'
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Identificação do Paciente no Cabeçalho
  const [patientName, setPatientName] = useState('Lucas Oliveira');
  const [patientAge, setPatientAge] = useState('7 anos');
  const [patientDiagnosis, setPatientDiagnosis] = useState('Em investigação para TEA e TDAH');
  const [patientGuardian, setPatientGuardian] = useState('Ana Oliveira (Mãe)');

  // Questionários por Faixa Etária
  const questionnaires = {
    toddler: {
      title: 'M-CHAT-R/F (18 a 36 Meses)',
      subtitle: 'Rastreio precoce de sinais do Espectro Autista em crianças pequenas',
      questions: [
        { id: 't1', category: 'Atenção Compartilhada', text: 'Se você aponta para algo do outro lado da sala, a criança olha para o objeto?' },
        { id: 't2', category: 'Sensorial', text: 'Você já se perguntou se a criança pode ser surda (não responde ao nome)?' },
        { id: 't3', category: 'Brincadeira Simbólica', text: 'A criança brinca de faz de conta (ex: fingir falar ao telefone, dar comida à boneca)?' },
        { id: 't4', category: 'Motor/Imitação', text: 'A criança gosta de subir nas coisas (móveis, brinquedos do parque)?' },
        { id: 't5', category: 'Motor', text: 'A criança faz movimentos estranhos com os dedos perto dos olhos?' },
        { id: 't6', category: 'Comunicação', text: 'A criança aponta com o dedo para pedir algo ou para pedir ajuda?' },
        { id: 't7', category: 'Atenção Compartilhada', text: 'A criança aponta com o dedo para mostrar algo interessante para você?' },
        { id: 't8', category: 'Interação Social', text: 'A criança se interessa por outras crianças?' },
        { id: 't9', category: 'Atenção Compartilhada', text: 'A criança traz objetos para mostrar a você?' },
        { id: 't10', category: 'Contato Social', text: 'A criança responde quando você chama pelo nome dela?' },
        { id: 't11', category: 'Reciprocidade Emocional', text: 'Quando você sorri para a criança, ela sorri de volta para você?' },
        { id: 't12', category: 'Sensorial', text: 'A criança fica muito incomodada com barulhos do dia a dia?' },
        { id: 't13', category: 'Motor', text: 'A criança já anda sozinha?' },
        { id: 't14', category: 'Contato Visual', text: 'A criança olha nos seus olhos quando você fala ou brinca com ela?' },
        { id: 't15', category: 'Imitação', text: 'A criança tenta imitar o que você faz (ex: dar tchau, bater palmas)?' }
      ]
    },
    school: {
      title: 'Escolar e Adolescente (4 a 17 Anos)',
      subtitle: 'Triagem integrada baseada no DSM-5-TR para TDAH e TEA',
      questions: [
        { id: 's1', category: 'TDAH - Desatenção', text: 'Comete erros por descuido ou desatenção nas atividades escolares ou outras tarefas?' },
        { id: 's2', category: 'TDAH - Desatenção', text: 'Dificuldade em manter a atenção em tarefas ou atividades lúdicas até o fim?' },
        { id: 's3', category: 'TDAH - Desatenção', text: 'Parece não escutar quando lhe dirigem a palavra diretamente?' },
        { id: 's4', category: 'TDAH - Desatenção', text: 'Dificuldade em organizar tarefas, horários e materiais?' },
        { id: 's5', category: 'TDAH - Hiperatividade', text: 'Mexe ou balança as mãos/pés ou se contorce na cadeira com frequência?' },
        { id: 's6', category: 'TDAH - Hiperatividade', text: 'Levanta da cadeira em situações em que se espera que permaneça sentado?' },
        { id: 's7', category: 'TDAH - Impulsividade', text: 'Responde precipitadamente antes de as perguntas serem concluídas?' },
        { id: 's8', category: 'TEA - Reciprocidade Social', text: 'Dificuldade em iniciar ou manter conversas com troca recíproca?' },
        { id: 's9', category: 'TEA - Comunicação Não-Verbal', text: 'Uso limitado de gestos, contato visual ou expressões faciais para interagir?' },
        { id: 's10', category: 'TEA - Inflexibilidade', text: 'Insistência nas mesmas rotinas ou sofrimento extremo com pequenas mudanças?' },
        { id: 's11', category: 'TEA - Interesses Restritos', text: 'Interesse hiperfocado e de intensidade incomum por tópicos específicos?' },
        { id: 's12', category: 'Sensorial', text: 'Hiper ou hiporeatividade a estímulos sensoriais (texturas, luzes, sons ou dor)?' }
      ]
    },
    adult: {
      title: 'Adultos (18+ Anos)',
      subtitle: 'Escala ASRS-18 da OMS e Fenotipagem Autista no Adulto (Masking/Camuflagem)',
      questions: [
        { id: 'a1', category: 'ASRS - Desatenção', text: 'Com que frequência você tem dificuldade para finalizar os detalhes de um projeto após as partes difíceis?' },
        { id: 'a2', category: 'ASRS - Desatenção', text: 'Com que frequência você tem dificuldade para colocar as coisas em ordem em tarefas organizacionais?' },
        { id: 'a3', category: 'ASRS - Desatenção', text: 'Com que frequência você tem problemas para lembrar de compromissos ou obrigações?' },
        { id: 'a4', category: 'ASRS - Hiperatividade', text: 'Com que frequência você se agita ou mexe as mãos/pés quando tem que ficar sentado?' },
        { id: 'a5', category: 'ASRS - Hiperatividade', text: 'Com que frequência você se sente hiperativo e compelido a fazer coisas como se estivesse movido a motor?' },
        { id: 'a6', category: 'TEA - Camuflagem Social', text: 'Você monitora ativamente sua linguagem corporal ou expressão facial para parecer "normal"?' },
        { id: 'a7', category: 'TEA - Exaustão Social', text: 'Sente exaustão extrema ou esgotamento (burnout) após períodos de interação social?' },
        { id: 'a8', category: 'TEA - Interesses Intensos', text: 'Desenvolve interesses profundos que absorvem completamente seu tempo e atenção?' },
        { id: 'a9', category: 'TEA - Processamento Sensorial', text: 'Ambientes muito barulhentos ou com luzes intensas causam sobrecarga ou irritabilidade?' },
        { id: 'a10', category: 'TEA - Manutenção de Rotina', text: 'Sente desconforto significativo quando seus planos diários sofrem alterações imprevistas?' }
      ]
    }
  };

  const handleSelectProfile = (selectedProfile) => {
    setProfile(selectedProfile);
    setAnswers({});
    setIsSubmitted(false);
  };

  const handleAnswerChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  // Cálculo dos Resultados
  const calculateResults = () => {
    if (!profile) return { score: 0, maxScore: 0, pct: 0, level: '', hypothesis: '' };
    const currentQuestions = questionnaires[profile].questions;
    let totalScore = 0;
    const maxScore = currentQuestions.length * 2;

    currentQuestions.forEach((q) => {
      if (answers[q.id] !== undefined) {
        totalScore += answers[q.id];
      }
    });

    const pct = Math.round((totalScore / maxScore) * 100);
    let level = 'Indicativo Baixo';
    let levelClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    let hypothesis = '';

    if (pct >= 65) {
      level = 'Indicativo Elevado / Significativo';
      levelClass = 'bg-rose-100 text-rose-800 border-rose-300';
      hypothesis = `Pontuação elevada (${pct}% da carga sintomática). O resultado sugere compatibilidade com critérios do DSM-5-TR para Transtorno do Espectro Autista (F84.0) e/ou Transtorno de Déficit de Atenção/Hiperatividade (F90). Recomenda-se avaliação clínica neuropsicológica e consulta médica para diagnóstico diferencial detalhado.`;
    } else if (pct >= 35) {
      level = 'Indicativo Moderado';
      levelClass = 'bg-amber-100 text-amber-800 border-amber-300';
      hypothesis = `Pontuação moderada (${pct}% da carga sintomática). Apresenta traços e comportamentos pontuais que demandam investigação suplementar para diagnóstico diferencial entre ansiedade, TDAH ou TEA nível 1 de suporte.`;
    } else {
      hypothesis = `Pontuação dentro dos limites de corte normativos (${pct}%). Apresentação sintomática reduzida na triagem preliminar.`;
    }

    return { score: totalScore, maxScore, pct, level, levelClass, hypothesis };
  };

  const results = calculateResults();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    const printContent = document.getElementById('report-printable-area');
    if (!printContent) return;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Relatório de Triagem - ${patientName}</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="p-8 bg-white">
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  const fontClasses = {
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={`min-h-screen ${highContrast ? 'bg-black text-yellow-300' : 'bg-slate-50 text-slate-800'} ${fontClasses[fontSize]} transition-colors duration-200`}>
      
      {/* CABEÇALHO PRINCIPAL */}
      <header className={`${highContrast ? 'bg-zinc-900 border-b-2 border-yellow-400' : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white'} shadow-xl border-b border-indigo-800 sticky top-0 z-40 print:hidden`}>
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 border border-blue-400/30 rounded-2xl shadow-inner">
              <Brain className="w-8 h-8 text-blue-300" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                Sistema de Triagem Neurodivergente
                <span className="text-xs font-semibold px-2 py-0.5 bg-blue-500/30 text-blue-200 border border-blue-400/40 rounded-full">
                  TEA & TDAH
                </span>
              </h1>
              <p className="text-xs text-blue-200/80">Alinhado ao DSM-5-TR, M-CHAT-R/F, ASRS-18 e Leis Federais Nº 12.764 / 14.254</p>
            </div>
          </div>

          {/* BARRA DE CONTROLES E IDENTIFICAÇÃO DO PROFISSIONAL */}
          <div className="flex flex-wrap items-center gap-3 bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/15">
            
            {/* CAMPOS EDITÁVEIS DO PROFISSIONAL NO CABEÇALHO */}
            <div className="flex items-center gap-2 border-r border-white/20 pr-3">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  value={profName}
                  onChange={(e) => setProfName(e.target.value)}
                  placeholder="Nome do Profissional"
                  className="bg-black/30 border border-white/20 rounded px-2 py-0.5 text-xs font-bold text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                  title="Nome do Profissional para Assinatura do Relatório"
                />
                <input
                  type="text"
                  value={profCouncil}
                  onChange={(e) => setProfCouncil(e.target.value)}
                  placeholder="Nº Conselho (ex: CRP/CRM)"
                  className="bg-black/30 border border-white/20 rounded px-2 py-0.5 text-[11px] font-semibold text-blue-200 placeholder-slate-400 focus:outline-none focus:border-blue-400"
                  title="Nº do Conselho Profissional"
                />
              </div>
              <span className="bg-blue-500/30 text-blue-300 border border-blue-500/50 text-[10px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                ACESSO LIVRE
              </span>
            </div>

            {/* Controles de Acessibilidade */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFontSize(fontSize === 'base' ? 'lg' : fontSize === 'lg' ? 'xl' : 'base')}
                className="p-1.5 hover:bg-white/10 rounded text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
                title="Ajustar Tamanho da Fonte"
              >
                <ZoomIn className="w-4 h-4" /> {fontSize.toUpperCase()}
              </button>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className="p-1.5 hover:bg-white/10 rounded text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
                title="Modo Alto Contraste"
              >
                {highContrast ? <Sun className="w-4 h-4 text-yellow-300" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* TERMO BIOÉTICO E LEGAL */}
        {!hasAcceptedTerms && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl mt-1">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Termo de Consentimento & Esclarecimento Bioético / Legal</h2>
                <p className="text-sm text-slate-600 mt-1">
                  Por favor, leia atentamente as diretrizes formais de utilização desta ferramenta de rastreio de neurodivergência.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed space-y-3 max-h-60 overflow-y-auto">
              <p>
                <strong>1. Natureza da Ferramenta:</strong> Esta plataforma consiste em um instrumento padronizado de <em>rastreio e triagem sintomatológica preliminar</em>. Não substitui a avaliação clínica presencial realizada por médico neuropediatra, psiquiatra da infância/adolescência ou avaliação neuropsicológica formal.
              </p>
              <p>
                <strong>2. Embasamento Legal:</strong> Desenvolvido segundo os preceitos da <strong>Lei Berenice Piana (Lei Federal nº 12.764/2012)</strong>, que estabelece a Política Nacional de Proteção dos Direitos da Pessoa com Transtorno do Espectro Autista, e da <strong>Lei nº 14.254/2021</strong> (Acompanhamento integral para TDAH e Dislexia no ambiente escolar).
              </p>
              <p>
                <strong>3. Sigilo e Proteção de Dados:</strong> O preenchimento está alinhado às diretrizes da LGPD (Lei nº 13.709/2018). Nenhuma informação identificável de saúde é armazenada permanentemente em servidores externos sem o devido consentimento explícito.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="accept-terms"
                checked={disclaimerChecked}
                onChange={(e) => setDisclaimerChecked(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="accept-terms" className="text-sm font-semibold text-slate-700 cursor-pointer">
                Li, compreendo e concordo integralmente com os termos bioéticos e legais.
              </label>
            </div>

            <button
              disabled={!disclaimerChecked}
              onClick={() => setHasAcceptedTerms(true)}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-white transition flex items-center justify-center gap-2 shadow-lg ${
                disclaimerChecked
                  ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/30 cursor-pointer'
                  : 'bg-slate-300 cursor-not-allowed shadow-none'
              }`}
            >
              Iniciar Protocolo de Triagem <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* PAINEL DO PACIENTE E QUESTIONÁRIOS */}
        {hasAcceptedTerms && (
          <div className="space-y-8">
            
            {/* PAINEL DE DADOS DO PACIENTE */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4 print:p-0 print:border-none print:shadow-none">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <User className="w-5 h-5 text-blue-600" /> Identificação e Dados do Avaliado
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome Completo do Paciente</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Idade do Paciente</label>
                  <input
                    type="text"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Responsável / Acompanhante</label>
                  <input
                    type="text"
                    value={patientGuardian}
                    onChange={(e) => setPatientGuardian(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Diagnóstico Médico / Prévio</label>
                  <input
                    type="text"
                    value={patientDiagnosis}
                    onChange={(e) => setPatientDiagnosis(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* SELEÇÃO DE FAIXA ETÁRIA */}
            {!profile && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 text-center">Selecione o Módulo por Faixa Etária:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div
                    onClick={() => handleSelectProfile('toddler')}
                    className="bg-white border-2 border-slate-200 hover:border-blue-500 rounded-2xl p-6 shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-extrabold rounded-full">
                        18 a 36 meses
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                        Pré-Escolar (M-CHAT-R/F)
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Focado na detecção precoce de sinais de autismo, contato visual, atenção compartilhada e resposta ao nome.
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                      <span>Iniciar Questionário</span> <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div
                    onClick={() => handleSelectProfile('school')}
                    className="bg-white border-2 border-slate-200 hover:border-indigo-500 rounded-2xl p-6 shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-extrabold rounded-full">
                        4 a 17 anos
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
                        Escolar e Adolescente
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Avalia critérios do DSM-5-TR para TDAH (desatenção, impulsividade) e TEA (comunicação social e inflexibilidade).
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                      <span>Iniciar Questionário</span> <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div
                    onClick={() => handleSelectProfile('adult')}
                    className="bg-white border-2 border-slate-200 hover:border-violet-500 rounded-2xl p-6 shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 text-xs font-extrabold rounded-full">
                        18+ anos
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition">
                        Adultos (ASRS-18 + TEA)
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Investiga o perfil neurodivergente no adulto, escala ASRS da OMS e estratégias de camuflagem social (masking).
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-violet-600">
                      <span>Iniciar Questionário</span> <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PREENCHIMENTO DOS QUESTIONÁRIOS */}
            {profile && !isSubmitted && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{questionnaires[profile].title}</h3>
                    <p className="text-xs text-slate-500">{questionnaires[profile].subtitle}</p>
                  </div>
                  <button
                    onClick={() => setProfile(null)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline self-start sm:self-auto cursor-pointer"
                  >
                    Alterar Faixa Etária
                  </button>
                </div>

                <div className="space-y-6">
                  {questionnaires[profile].questions.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-xs font-bold px-2 py-1 bg-slate-200 text-slate-700 rounded">
                          Item {idx + 1} • {q.category}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{q.text}</p>
                      
                      <div className="flex flex-wrap gap-3 pt-2">
                        {[
                          { label: 'Nunca / Raro (0)', val: 0 },
                          { label: 'Às vezes / Moderado (1)', val: 1 },
                          { label: 'Frequente / Sempre (2)', val: 2 }
                        ].map((opt) => (
                          <label
                            key={opt.val}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border cursor-pointer transition ${
                              answers[q.id] === opt.val
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q_${q.id}`}
                              value={opt.val}
                              checked={answers[q.id] === opt.val}
                              onChange={() => handleAnswerChange(q.id, opt.val)}
                              className="hidden"
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setIsSubmitted(true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-4 px-6 rounded-xl transition shadow-lg shadow-emerald-900/20 text-base flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle className="w-5 h-5" /> Gerar Relatório Clínico Completo
                  </button>
                </div>
              </div>
            )}

            {/* RELATÓRIO CLÍNICO IMPRESSÁVEL */}
            {profile && isSubmitted && (
              <div className="space-y-6">
                
                <div className="flex flex-wrap gap-3 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" /> Revisar Respostas
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={handleDownloadReport}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 shadow transition cursor-pointer"
                    >
                      <Download className="w-4 h-4" /> Baixar / Abrir em Nova Aba
                    </button>
                    <button
                      onClick={handlePrint}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 shadow transition cursor-pointer"
                    >
                      <Printer className="w-4 h-4" /> Imprimir / Salvar PDF
                    </button>
                  </div>
                </div>

                <div id="report-printable-area" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8 text-slate-800">
                  
                  {/* CABEÇALHO DO DOCUMENTO */}
                  <div className="border-b-2 border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">RELATÓRIO DE TRIAGEM NEURODIVERGENTE</h2>
                      <p className="text-xs font-semibold text-slate-500 mt-1">
                        Sintetizador de Rastreio TEA & TDAH • Protocolo {questionnaires[profile].title}
                      </p>
                    </div>
                    <div className="text-right text-xs text-slate-600">
                      <p>Data de Emissão: <strong>{new Date().toLocaleDateString('pt-BR')}</strong></p>
                      <p>Status: <strong>Avaliação Concluída</strong></p>
                    </div>
                  </div>

                  {/* IDENTIFICAÇÃO DO PACIENTE E PROFISSIONAL */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <p><strong className="text-slate-500 uppercase">Paciente:</strong> <span className="font-bold text-slate-900">{patientName}</span></p>
                      <p><strong className="text-slate-500 uppercase">Idade:</strong> {patientAge}</p>
                      <p><strong className="text-slate-500 uppercase">Responsável:</strong> {patientGuardian}</p>
                    </div>
                    <div>
                      <p><strong className="text-slate-500 uppercase">Avaliado Por:</strong> <span className="font-bold text-slate-900">{profName}</span></p>
                      <p><strong className="text-slate-500 uppercase">Registro:</strong> {profCouncil}</p>
                      <p><strong className="text-slate-500 uppercase">Condição Prévias:</strong> {patientDiagnosis}</p>
                    </div>
                  </div>

                  {/* SÍNTESE DE PONTUAÇÃO E RISCO */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">1. Índice Sintomático e Nível de Indicativo</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                        <span className="text-xs text-slate-500 font-bold uppercase block">Pontuação Bruta</span>
                        <span className="text-3xl font-black text-slate-900">{results.score} / {results.maxScore}</span>
                      </div>
                      
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                        <span className="text-xs text-slate-500 font-bold uppercase block">Percentual de Carga</span>
                        <span className="text-3xl font-black text-blue-600">{results.pct}%</span>
                      </div>

                      <div className={`border rounded-xl p-4 text-center flex flex-col justify-center items-center ${results.levelClass}`}>
                        <span className="text-xs font-bold uppercase block">Classificação de Risco</span>
                        <span className="text-sm font-extrabold">{results.level}</span>
                      </div>
                    </div>
                  </div>

                  {/* PARECER E HIPÓTESE DIAGNÓSTICA */}
                  <div className="space-y-3 border-t border-slate-200 pt-6">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" /> 2. Raciocínio Clínico e Hipótese Diagnóstica (DSM-5-TR / CID-11)
                    </h4>
                    <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 leading-relaxed font-medium">
                      {results.hypothesis}
                    </div>
                  </div>

                  {/* DETALHAMENTO COMPLETO DAS RESPOSTAS */}
                  <div className="space-y-3 border-t border-slate-200 pt-6">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">3. Detalhamento dos Itens Avaliados</h4>
                    
                    <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                            <th className="p-3">#</th>
                            <th className="p-3">Categoria</th>
                            <th className="p-3">Item / Pergunta</th>
                            <th className="p-3 text-right">Resposta Assinalada</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {questionnaires[profile].questions.map((q, idx) => {
                            const val = answers[q.id] || 0;
                            const label = val === 2 ? 'Frequente (2)' : val === 1 ? 'Às vezes (1)' : 'Nunca (0)';
                            return (
                              <tr key={q.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                <td className="p-3 font-bold text-slate-500">{idx + 1}</td>
                                <td className="p-3 font-semibold text-slate-600">{q.category}</td>
                                <td className="p-3 text-slate-800">{q.text}</td>
                                <td className="p-3 text-right font-bold">
                                  <span className={`px-2 py-0.5 rounded ${val === 2 ? 'bg-rose-100 text-rose-800' : val === 1 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                    {label}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* RECOMENDAÇÕES MULTIDISCIPLINARES */}
                  <div className="space-y-3 border-t border-slate-200 pt-6">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">4. Recomendações Práticas e Encaminhamentos</h4>
                    <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                      <li><strong>Consulta Médica Especializada:</strong> Agendar consulta com Neuropediatra ou Psiquiatra da Infância/Adolescência (ou Psiquiatra de Adultos).</li>
                      <li><strong>Avaliação Neuropsicológica:</strong> Mapeamento de funções executivas, atenção sustentada, memória de trabalho e perfil cognitivo.</li>
                      <li><strong>Intervenção Multidisciplinar:</strong> Terapia Cognitivo-Comportamental (TCC / Análise do Comportamento Aplicada ABA), Fonoaudiologia e Terapia Ocupacional com foco em Integração Sensorial.</li>
                      <li><strong>Adaptações Escolares / Trabalho:</strong> Elaboração do Plano de Ensino Individualizado (PEI) conforme diretrizes da Lei nº 14.254/2021.</li>
                    </ul>
                  </div>

                  {/* FONTES E REFERÊNCIAS CIENTÍFICAS */}
                  <div className="border-t border-slate-200 pt-6 text-[11px] text-slate-500 space-y-1">
                    <p><strong>Fontes e Referências Técnicas:</strong></p>
                    <p>• American Psychiatric Association. (2022). Diagnostic and Statistical Manual of Mental Disorders (DSM-5-TR).</p>
                    <p>• Robins, D. L., et al. (2009). The Modified Checklist for Autism in Toddlers, Revised (M-CHAT-R/F).</p>
                    <p>• World Health Organization. Adult ADHD Self-Report Scale (ASRS-v1.1) Screener.</p>
                    <p>• Brasil. Lei Federal nº 12.764/2012 (Lei Berenice Piana) & Lei Federal nº 14.254/2021.</p>
                  </div>

                  {/* ASSINATURA DO PROFISSIONAL AVALIADOR */}
                  <div className="border-t-2 border-slate-300 pt-8 mt-8 flex flex-col items-center justify-center text-center">
                    <div className="w-64 border-b border-slate-400 mb-2"></div>
                    <p className="text-xs font-bold text-slate-900">{profName}</p>
                    <p className="text-[11px] text-slate-600">{profCouncil}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Profissional Avaliador Responsável</p>
                  </div>

                </div>
              </div>
            )}

            {/* GUIA LEGAL DE DIREITOS NO BRASIL */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4 print:hidden">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <BookOpen className="w-5 h-5 text-indigo-600" /> Guia Prático de Direitos no Brasil (Lei Berenice Piana & Lei 14.254)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-indigo-600" /> Carteira CIPTEA
                  </h4>
                  <p>
                    A Carteira de Identificação da Pessoa com Transtorno do Espectro Autista garante atendimento prioritário no SUS e estabelecimentos públicos e privados.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-600" /> PEI & AEE na Escola
                  </h4>
                  <p>
                    Direito ao Plano de Ensino Individualizado (PEI) e Acompanhante Especializado em sala de aula sem custo adicional na mensalidade escolar.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-indigo-600" /> BPC / LOAS & SUS
                  </h4>
                  <p>
                    Acesso ao Benefício de Prestação Continuada (BPC) para famílias de baixa renda e cobertura integral de terapias pelo Sistema Único de Saúde.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}