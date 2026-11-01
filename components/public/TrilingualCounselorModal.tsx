'use client';

import React, { useState } from 'react';
import { INSTITUTIONAL_DATA } from '@/lib/institutional-data';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  GraduationCap,
  Building2,
  Phone,
  HelpCircle,
  Languages,
} from 'lucide-react';

interface TrilingualCounselorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApply?: (programCode: string) => void;
}

export const TrilingualCounselorModal: React.FC<TrilingualCounselorModalProps> = ({
  isOpen,
  onClose,
  onOpenApply,
}) => {
  const [lang, setLang] = useState<'en' | 'ur' | 'sd'>('en');
  const [messages, setMessages] = useState<
    Array<{ role: 'ai' | 'user'; text: string; time: string }>
  >([
    {
      role: 'ai',
      text:
        'Welcome to Imam Institute of Nursing & Allied Health Sciences! I am your AI Admissions Counselor. Ask me anything about BS Nursing (Generic), our 9 Free Paramedical Diplomas, affiliations with SMBBMU Larkana & PNMC, or campus facilities in Jacobabad.',
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = {
    en: [
      'What are the eligibility criteria for BS Nursing?',
      'Are the 9 paramedical diplomas really free?',
      'Which hospitals are used for clinical rotations?',
      'What is the address and contact number in Jacobabad?',
    ],
    ur: [
      'بی ایس نرسنگ (Generic) کے داخلے کی اہلیت کیا ہے؟',
      'کیا 9 پیرامیڈیکل ڈپلومے واقعی 100 فیصد مفت ہیں؟',
      'کلینیکل ٹریننگ کن ہسپتالوں میں کروائی جاتی ہے؟',
      'جیکب آباد کیمپس کا پتہ اور رابطہ نمبر کیا ہے؟',
    ],
    sd: [
      'بي ايس نرسنگ (Generic) جي داخلا جون شرطون ڇا آهن؟',
      'ڇا 9 پيراميڊيڪل ڊپلوما واقعي 100 سيڪڙو مفت آهن؟',
      'ڪلينيڪل ٽريننگ ڪهڙين اسپتالن ۾ ڪرائي وڃي ٿي؟',
      'جيڪب آباد ڪيمپس جو پتو ۽ رابطي نمبر ڇا آهي؟',
    ],
  };

  const getAIAnswer = (query: string, currentLang: 'en' | 'ur' | 'sd') => {
    const q = query.toLowerCase();

    if (currentLang === 'ur') {
      if (q.includes('اہلیت') || q.includes('بی ایس') || q.includes('bsn') || q.includes('مارکس')) {
        return 'بی ایس نرسنگ (Generic) چار سالہ ڈگری پروگرام ہے جو SMBBMU لاڑکانہ سے الحاق شدہ اور PNMC سے رجسٹرڈ ہے۔ اس کی اہلیت ایف ایس سی پری میڈیکل (کم از کم 50 فیصد نمبر) ہے۔ عمر کی حد 17 سے 35 سال ہے۔ داخلے ابھی کھلے ہیں!';
      }
      if (q.includes('مفت') || q.includes('پیرامیڈیکل') || q.includes('فیس')) {
        return 'جی ہاں! امام پیرامیڈیکل انسٹی ٹیوٹ کے تحت تمام 9 ون-ایئر ڈپلوما کورسز (ایکس رے، ای سی جی، آئی سی یو، فزیوتھراپی، پیڈیاٹرک، ڈینٹل، اینستھیزیا، امراض چشم، اور بلڈ ٹرانسفیوژن) 100 فیصد مفت ایڈمشن اقدام کے تحت پیش کیے جا رہے ہیں۔ یہ سندھ میڈیکل فیکلٹی (SMF) کراچی سے منظور شدہ ہیں۔';
      }
      if (q.includes('ہسپتال') || q.includes('کلینیکل')) {
        return 'ہمارے طلبہ 4 بڑے مراکز میں کلینیکل ٹریننگ حاصل کرتے ہیں: 1) امام میڈیکل سینٹر، 2) جیکب آباد انسٹی ٹیوٹ آف میڈیکل سائنسز (JIMS) 133 بستروں پر مشتمل ہسپتال، 3) سول ہسپتال جیکب آباد، اور گریجوایشن کے بعد غلام محمد مہر میڈیکل کالج (GMMMC) سکھر میں ہاؤس جاب کا موقع۔';
      }
      return 'امام انسٹی ٹیوٹ شاہ غازی محلہ، امام بخش روڈ، جیکب آباد میں واقع ہے۔ دفتر کے اوقات صبح 8:00 بجے سے شام 4:00 بجے تک ہیں۔ آپ ہم سے فون یا واٹس ایپ نمبر +92 300 2320085 پر یا Imcjcd@gmail.com پر رابطہ کر سکتے ہیں۔ سی ای او ڈاکٹر عابد حسین سومرو کے وژن کے مطابق ہم صحت کے شعبے میں باعزت روزگار کے مواقع فراہم کر رہے ہیں۔';
    }

    if (currentLang === 'sd') {
      if (q.includes('شرطون') || q.includes('بي ايس') || q.includes('bsn') || q.includes('مارڪون')) {
        return 'بي ايس نرسنگ (Generic) چار سالا ڊگري پروگرام آهي، جيڪو SMBBMU لاڙڪاڻو سان لاڳاپيل ۽ PNMC اسلام آباد سان رجسٽرڊ آهي. اميدوار وٽ ايف ايس سي پري ميڊيڪل ۾ گهٽ ۾ گهٽ 50 سيڪڙو مارڪون هجڻ لازمي آهن. عمر جي حد 17 کان 35 سال آهي.';
      }
      if (q.includes('مفت') || q.includes('پيراميڊيڪل') || q.includes('فيس')) {
        return 'ها بلڪل! امام پيراميڊيڪل انسٽيٽيوٽ پاران سمورا 9 هڪ سالا ڊپلوما (ايڪس ري، اي سي جي، آءِ سي يو، فزيوٿراپي، پيڊز، ڊينٽل، اينسٿيزيا، اکين جي سار سنڀال، بلڊ ٽرانسفيوژن) مفت داخلا اسڪيم تحت پيش ڪيا وڃن پيا. هي سنڌ ميڊيڪل فيڪلٽي (SMF) ڪراچي ۽ اسٽيوٽا سان الحاق ٿيل آهن.';
      }
      if (q.includes('اسپتال') || q.includes('ٽريننگ')) {
        return 'شاگردن کي 4 وڏين اسپتالن ۾ هٿين کلينيڪل سکيا ڏني وڃي ٿي: 1) امام ميڊيڪل سينٽر، 2) جمز (JIMS) 133 بسترن واري جديد اسپتال، 3) سول اسپتال جيڪب آباد، ۽ بي ايس نرسنگ پاس ڪرڻ کان پوءِ جي ايم ايم ايم سي (GMMMC) سکر اسپتال ۾ هائوس جاب جا بهترين موقعا آهن.';
      }
      return 'امام انسٽيٽيوٽ شاهه غازي محلا، امام بخش روڊ، جيڪب آباد، سنڌ ۾ واقع آهي. آفيس جا ڪلاڪ صبح 8:00 کان شام 4:00 تائين آهن. واٽس ايپ ۽ فون نمبر +92 300 2320085 ۽ اي ميل Imcjcd@gmail.com آهي. سي اي او ڊاڪٽر عابد حسين سومرو جي اڳواڻي ۾ اسان معيار واري تعليم تي يقين رکون ٿا.';
    }

    // Default English
    if (q.includes('bsn') || q.includes('nursing') || q.includes('criteria') || q.includes('eligibility')) {
      return 'The flagship 4-Year BS Nursing (Generic) degree is affiliated with Shaheed Mohtarma Benazir Bhutto Medical University (SMBBMU) Larkana and registered with Pakistan Nursing & Midwifery Council (PNMC). Eligibility requires FSc Pre-Medical with at least 50% aggregate marks, aged 17–35 years. Admissions are currently open for Batch 2026–27!';
    }
    if (q.includes('paramedical') || q.includes('free') || q.includes('diploma') || q.includes('fee')) {
      return 'Yes! Under the Free Admissions Initiative at Imam Paramedical Institute, all 9 1-Year technician diplomas (X-Ray, ECG, ICU, Physiotherapy, Pediatric, Dental, Anaesthesia, Ophthalmic, and Blood Transfusion) offer 100% free tuition. Certified by Sindh Medical Faculty (SMF) Karachi & STEVTA.';
    }
    if (q.includes('hospital') || q.includes('clinical') || q.includes('rotation') || q.includes('house job')) {
      return 'Students train across 4 premier hospital centers: 1) Imam Medical Center (on-site bedside drills), 2) Jacobabad Institute of Medical Sciences (JIMS, 133-bed facility), 3) Civil Hospital Jacobabad (public health volume), and 4) graduate House Job opportunities at Ghulam Muhammad Mahar Medical College (GMMMC) Sukkur.';
    }
    return `Imam Institute of Nursing & Allied Health Sciences was established in 2019 under the leadership of CEO Dr. Abid Hussain Soomro. We are located at Shah Ghazi Muhalla, Imam Baksh Road, Jacobabad, Sindh. Office hours: 8:00 AM – 4:00 PM. Call / WhatsApp +92 300 2320085 or email Imcjcd@gmail.com. We also offer PEEF & TCF Alumni scholarships!`;
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      role: 'user' as const,
      text: text.trim(),
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAIAnswer(text, lang);
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: reply,
          time: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const isRTL = lang === 'ur' || lang === 'sd';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full h-[85vh] max-h-[700px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-imam-navy to-[#0A3D73] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-200">
              <Bot size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white">
                  Imam AI Admissions Counselor
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-blue-200">
                Grounded in official imcan.pk institutional facts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/15 rounded-xl p-1 text-xs font-bold">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-lg transition ${
                  lang === 'en' ? 'bg-white text-imam-navy shadow-xs' : 'text-blue-100 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ur')}
                className={`px-2 py-1 rounded-lg transition font-urdu ${
                  lang === 'ur' ? 'bg-white text-imam-navy shadow-xs' : 'text-blue-100 hover:text-white'
                }`}
              >
                اردو
              </button>
              <button
                onClick={() => setLang('sd')}
                className={`px-2 py-1 rounded-lg transition font-sindhi ${
                  lang === 'sd' ? 'bg-white text-imam-navy shadow-xs' : 'text-blue-100 hover:text-white'
                }`}
              >
                سنڌي
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="Close counselor"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50">
          {messages.map((m, idx) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={idx}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-imam-navy text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    <Bot size={16} />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-imam-blue text-white rounded-tr-none shadow-sm'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-xs'
                  } ${isRTL ? 'text-right' : 'text-left'}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  {m.text}
                  <div
                    className={`text-[10px] mt-1.5 opacity-70 ${
                      isUser ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </div>
                </div>
                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    <User size={16} />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic bg-white p-2.5 rounded-xl border border-slate-200 w-fit">
              <Bot size={14} className="text-imam-blue" />
              <span>Imam AI is answering...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-3 bg-white border-t border-slate-200 overflow-x-auto whitespace-nowrap space-x-2 flex">
          {quickQuestions[lang].map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="inline-block px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition shrink-0 cursor-pointer"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={
              lang === 'ur'
                ? 'داخلہ یا پروگرام کے بارے میں کوئی سوال پوچھیں...'
                : lang === 'sd'
                ? 'داخلا يا پروگرام بابت ڪو سوال پڇو...'
                : 'Ask about admissions, fees, or hospital rotations...'
            }
            className={`flex-1 bg-slate-100 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-imam-blue ${
              isRTL ? 'text-right' : 'text-left'
            }`}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-imam-blue hover:bg-imam-navy text-white transition disabled:opacity-40 cursor-pointer shadow-xs"
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
