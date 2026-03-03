// ============================================================
//  ТОХИРГОО — Та доорх мэдээллийг өөрчлөх боломжтой
// ============================================================

// Одоо идэвхтэй байгаа номинацийн индекс (0 = анхдагч)
// 0 = Шилдэг удирдагч, 1 = Хамтын ажиллагаа, 2 = Шинэлэг санаа
// 3 = Хамгийн эерэг хандлага, 4 = Нуугдмал авьяас
export const ACTIVE_NOMINATION_INDEX = 4;

// Нэг номинацид нэг хүн хэдэн санал өгөх вэ
export const VOTES_PER_PERSON = 3;

// Хүйсийн emoji — та өөрчлөх боломжтой
export const GENDER_EMOJI = { m: '🧔', f: '👩' };

// ============================================================
//  5 НОМИНАЦИ — Гэрэл/цагаан дэвсгэрт тохирсон өнгө
// ============================================================
export const NOMINATIONS = [
    {
        id: 'best_coolest',
        name: 'Хамгийн cool ',
        emoji: '👑',
        description: 'Хамгийн cool, Coolest ',
        theme: {
            primary: '#059669',
            secondary: '#10b981',
            accent: '#065f46',
            textDark: '#064e3b',
            glow: 'rgba(217, 119, 6, 0.35)',
            bg: `linear-gradient(145deg, rgba(255,251,235,0.9) 0%, rgba(254,243,199,0.9) 60%, rgba(253,230,138,0.9) 100%),        url('/smile.jpg')     `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            pageBg: '#ecfdf5',
            cardBg: '#ffffff',
            cardBorder: '#6ee7b7',
            cardShadow: 'rgba(5, 150, 105, 0.18)',
            particle: '#10b981',
            buttonBg: 'linear-gradient(135deg, #10b981, #059669)',
            buttonText: '#ffffff',
            headerBg: 'rgba(236,253,245,0.92)',
            badgeBg: '#d1fae5',
            badgeText: '#065f46',
            sidebarBg: '#f0fdf8',
            name: 'gold',

        }
    },
    {
        id: 'best_funny',
        name: 'Хамгийн хөгжилтэй',
        emoji: '🤝',
        description: 'Хамт олондоо хамгийн их инэээд баясгал түгээсэн',
        theme: {
            primary: '#d97706',
            secondary: '#f59e0b',
            accent: '#92400e',
            textDark: '#78350f',
            glow: 'rgba(5, 150, 105, 0.35)',
            bg: `linear-gradient(145deg, rgba(255,251,235,0.9) 0%, rgba(254,243,199,0.9) 60%, rgba(253,230,138,0.9) 100%),        url('/funny.jpg')     `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            pageBg: '#fffbeb',
            cardBg: '#ffffff',
            cardBorder: '#fbbf24',
            cardShadow: 'rgba(217, 119, 6, 0.18)',
            particle: '#f59e0b',
            buttonBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
            buttonText: '#ffffff',
            headerBg: 'rgba(255,251,235,0.92)',
            badgeBg: '#fef3c7',
            badgeText: '#92400e',
            sidebarBg: '#fffdf0',
            name: 'emerald',
        }
    },
    {
        id: 'best_model',
        name: 'Хамгийн Загварлаг',
        emoji: '💡',
        description: 'Хамгийн загварын мэдрэмжтэй хүн',
        theme: {
            primary: '#2563eb',
            secondary: '#3b82f6',
            accent: '#1e40af',
            textDark: '#1e3a8a',
            glow: 'rgba(37, 99, 235, 0.35)',
            bg: `linear-gradient(145deg, rgba(255,251,235,0.9) 0%, rgba(254,243,199,0.9) 60%, rgba(253,230,138,0.9) 100%),        url('/stylist.jpg')     `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            pageBg: '#eff6ff',
            cardBg: '#ffffff',
            cardBorder: '#93c5fd',
            cardShadow: 'rgba(37, 99, 235, 0.18)',
            particle: '#3b82f6',
            buttonBg: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            buttonText: '#ffffff',
            headerBg: 'rgba(239,246,255,0.92)',
            badgeBg: '#dbeafe',
            badgeText: '#1e40af',
            sidebarBg: '#f0f7ff',
            name: 'blue',
        }
    },
    {
        id: 'best_attitude',
        name: 'Хамгийн тусч',
        emoji: '🌟',
        description: 'Хамгийн их бусдад өгдөг хүн',
        theme: {
            primary: '#7c3aed',
            secondary: '#8b5cf6',
            accent: '#4c1d95',
            textDark: '#3b0764',
            glow: 'rgba(124, 58, 237, 0.35)',
            bg: `linear-gradient(145deg, rgba(255,251,235,0.9) 0%, rgba(254,243,199,0.9) 60%, rgba(253,230,138,0.9) 100%),        url('/help.jpg')     `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            pageBg: '#f5f3ff',
            cardBg: '#ffffff',
            cardBorder: '#c4b5fd',
            cardShadow: 'rgba(124, 58, 237, 0.18)',
            particle: '#8b5cf6',
            buttonBg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            buttonText: '#ffffff',
            headerBg: 'rgba(245,243,255,0.92)',
            badgeBg: '#ede9fe',
            badgeText: '#4c1d95',
            sidebarBg: '#f8f5ff',
            name: 'purple',
        }
    },
    {
        id: 'best_performance',
        name: 'Хамгийн чадварлаг',
        emoji: '💎',
        description: 'Харагдаагүй ч гайхамшигтай чадварлаг хүн',
        theme: {
            primary: '#0891b2',
            secondary: '#06b6d4',
            accent: '#164e63',
            textDark: '#0c4a6e',
            glow: 'rgba(8, 145, 178, 0.35)',
            bg: `linear-gradient(145deg, rgba(255,251,235,0.9) 0%, rgba(254,243,199,0.9) 60%, rgba(253,230,138,0.9) 100%),        url('/best_performance.jpg')     `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            pageBg: '#ecfeff',
            cardBg: '#ffffff',
            cardBorder: '#67e8f9',
            cardShadow: 'rgba(8, 145, 178, 0.18)',
            particle: '#06b6d4',
            buttonBg: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            buttonText: '#ffffff',
            headerBg: 'rgba(236,254,255,0.92)',
            badgeBg: '#cffafe',
            badgeText: '#164e63',
            sidebarBg: '#f0fdff',
            name: 'cyan',
        }
    }
];

// ============================================================
//  АЖИЛЧДЫН ЖАГСААЛТ
//  Формат: { id, name, email, gender: 'm' | 'f' }
//  Та энэхүү жагсаалтыг бүрэн ажилчдынхаа мэдээллээр солино уу
// ============================================================
export const EMPLOYEES = [
    { id: 'emp001', name: 'Бат-Эрдэнэ Дорж', email: 'test@gmail.com', gender: 'm', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop' },
    { id: 'emp002', name: 'Оюунцэцэг Ганбаатар', email: 'oyuuntsetseg.ganbaatar@itc.mn', gender: 'f', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop' },
    { id: 'emp003', name: 'Энхбаяр Мөнхбаяр', email: 'enkhbayar.munkhbayar@itc.mn', gender: 'm', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop' },
    { id: 'emp004', name: 'Солонго Болд', email: 'solongo.bold@itc.mn', gender: 'f', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop' },
    { id: 'emp005', name: 'Анхбаяр Цэрэндорж', email: 'ankhbayar.tserendorj@itc.mn', gender: 'm' },
    { id: 'emp006', name: 'Мөнгөнцэцэг Лхагва', email: 'munguntsetseg.lkhagva@itc.mn', gender: 'f' },
    { id: 'emp007', name: 'Баттулга Сүхбаатар', email: 'battulga.sukhbaatar@itc.mn', gender: 'm' },
    { id: 'emp008', name: 'Номин Гантулга', email: 'nomin.gantulga@itc.mn', gender: 'f' },
    { id: 'emp009', name: 'Эрдэнэчимэг Наран', email: 'erdenechimeg.naran@itc.mn', gender: 'f' },
    { id: 'emp010', name: 'Тэмүүлэн Батболд', email: 'temhulen.batbold@itc.mn', gender: 'm' },
    { id: 'emp011', name: 'Хишигдэлгэр Пүрэв', email: 'khishigdelger.purev@itc.mn', gender: 'm' },
    { id: 'emp012', name: 'Долгормаа Гомбо', email: 'dolgormaa.gombo@itc.mn', gender: 'f' },
    { id: 'emp013', name: 'Жаргалсайхан Нямаа', email: 'jargalsaikhan.nyamaa@itc.mn', gender: 'm' },
    { id: 'emp014', name: 'Мөнхзул Дамдин', email: 'munkhzul.damdin@itc.mn', gender: 'f' },
    { id: 'emp015', name: 'Энхтайван Чимэд', email: 'enkhtaivan.chimed@itc.mn', gender: 'm' },
    { id: 'emp016', name: 'Ариунаа Отгон', email: 'ariunaa.otgon@itc.mn', gender: 'f' },
    { id: 'emp017', name: 'Одгэрэл Цэдэв', email: 'odgerel.tsedev@itc.mn', gender: 'f' },
    { id: 'emp018', name: 'Гантулга Батмөнх', email: 'gantulga.batmunkh@itc.mn', gender: 'm' },
    { id: 'emp019', name: 'Цэцэгмаа Дугар', email: 'tsetsegmaa.dugar@itc.mn', gender: 'f' },
    { id: 'emp020', name: 'Мөнхбаяр Жамц', email: 'munkhbayar.jamts@itc.mn', gender: 'm' },
    { id: 'emp021', name: 'Оюун-Эрдэнэ Бямба', email: 'oyuun-erdene.byamba@itc.mn', gender: 'f' },
    { id: 'emp022', name: 'Баянмөнх Дэмбэрэл', email: 'bayanmunkh.demberel@itc.mn', gender: 'm' },
    { id: 'emp023', name: 'Энхжаргал Нацагдорж', email: 'enkhjargal.natsagdorj@itc.mn', gender: 'f' },
    { id: 'emp024', name: 'Сарантуяа Лувсан', email: 'sarantuya.luvsan@itc.mn', gender: 'f' },
    { id: 'emp025', name: 'Батцэцэг Гэндэн', email: 'battsetseg.genden@itc.mn', gender: 'f' },
    { id: 'emp026', name: 'Уянга Зандан', email: 'uyanga.zandan@itc.mn', gender: 'f' },
    { id: 'emp027', name: 'Мөнхтуяа Шагдар', email: 'munkhttuya.shagdar@itc.mn', gender: 'f' },
    { id: 'emp028', name: 'Галбадрах Цогт', email: 'galbadrakh.tsogt@itc.mn', gender: 'm' },
    { id: 'emp029', name: 'Наранцэцэг Цэрэн', email: 'narantsetseg.tseren@itc.mn', gender: 'f' },
    { id: 'emp030', name: 'Гантогтох Буян', email: 'gantogtokh.buyan@itc.mn', gender: 'm' },
    { id: 'emp031', name: 'Энхболд Доржсүрэн', email: 'enkhbold.dorjsuren@itc.mn', gender: 'm' },
    { id: 'emp032', name: 'Болормаа Самбуу', email: 'bolormaa.sambuu@itc.mn', gender: 'f' },
    { id: 'emp033', name: 'Дэлгэрмаа Гомбожав', email: 'delgermaa.gombojav@itc.mn', gender: 'f' },
    { id: 'emp034', name: 'Алтансүх Норов', email: 'altansukh.norov@itc.mn', gender: 'm' },
    { id: 'emp035', name: 'Мөнхсайхан Батаа', email: 'munkhsaikhan.bataa@itc.mn', gender: 'm' },
    { id: 'emp036', name: 'Энхсайхан Ринчин', email: 'enkhsaikhan.rinchin@itc.mn', gender: 'm' },
    { id: 'emp037', name: 'Отгонбаяр Лхамсүрэн', email: 'otgonbayar.lkhamsuren@itc.mn', gender: 'm' },
    { id: 'emp038', name: 'Нандинцэцэг Балган', email: 'nandintsetseg.balgan@itc.mn', gender: 'f' },
    { id: 'emp039', name: 'Мөнхзаяа Хүрэлбаатар', email: 'munkhzaya.khurelbaatar@itc.mn', gender: 'f' },
    { id: 'emp040', name: 'Батжаргал Тунгалаг', email: 'batjargal.tungalag@itc.mn', gender: 'm' },
    { id: 'emp041', name: 'Чулуунбаатар Гэрэл', email: 'chuluunbaatar.gerel@itc.mn', gender: 'm' },
    { id: 'emp042', name: 'Оюунбилэг Мягмар', email: 'oyuunbileg.myagmar@itc.mn', gender: 'f' },
    { id: 'emp043', name: 'Ганзориг Нэргүй', email: 'ganzorig.nergui@itc.mn', gender: 'm' },
    { id: 'emp044', name: 'Мөнхцэцэг Дулам', email: 'munkhtsetseg.dulam@itc.mn', gender: 'f' },
    { id: 'emp045', name: 'Баярсайхан Санжаа', email: 'bayarsaikhan.sanjaa@itc.mn', gender: 'm' },
    { id: 'emp046', name: 'Цэнд-Аюуш Дондов', email: 'tsend-ayuush.dondov@itc.mn', gender: 'm' },
    { id: 'emp047', name: 'Алтантуяа Намсрай', email: 'altantuya.namsrai@itc.mn', gender: 'f' },
    { id: 'emp048', name: 'Энхзаяа Жигжид', email: 'enkhzaya.jigjid@itc.mn', gender: 'f' },
    { id: 'emp049', name: 'Хэрлэн Лхагвасүрэн', email: 'kherlen.lkhagvasuren@itc.mn', gender: 'm' },
    { id: 'emp050', name: 'Нарантуяа Цэдэнбал', email: 'narantuya.tsedenbal@itc.mn', gender: 'f' },
    { id: 'emp051', name: 'Дулмаа Ням', email: 'dulmaa.nyam@itc.mn', gender: 'f' },
    { id: 'emp052', name: 'Батмөнх Гаваа', email: 'batmunkh.gavaa@itc.mn', gender: 'm' },
    { id: 'emp053', name: 'Хандаа Цэвэл', email: 'khandaa.tsevel@itc.mn', gender: 'f' },
    { id: 'emp054', name: 'Сэргэлэн Мэнд', email: 'sergelen.mend@itc.mn', gender: 'm' },
    { id: 'emp055', name: 'Болд-Эрдэнэ Сүхэ', email: 'bold-erdene.sukhe@itc.mn', gender: 'm' },
    { id: 'emp056', name: 'Мандухай Пэрэнлэй', email: 'mandukhai.perenlei@itc.mn', gender: 'f' },
    { id: 'emp057', name: 'Ганхуяг Дашням', email: 'gankhuyag.dashnyam@itc.mn', gender: 'm' },
    { id: 'emp058', name: 'Цэрэнхорлоо Батдорж', email: 'tserenkholoo.batdorj@itc.mn', gender: 'f' },
    { id: 'emp059', name: 'Жаргал Чойжилсүрэн', email: 'jargal.choijilsuren@itc.mn', gender: 'm' },
    { id: 'emp060', name: 'Эрдэнэбулган Санжмятав', email: 'erdenebolgan.sanjmyatav@itc.mn', gender: 'm' },
    { id: 'emp061', name: 'Тогтохсүрэн Хүдэр', email: 'togtokhsuren.khuder@itc.mn', gender: 'm' },
    { id: 'emp062', name: 'Оюунтуяа Ядамсүрэн', email: 'oyuuntuya.yadamsuren@itc.mn', gender: 'f' },
    { id: 'emp063', name: 'Налайх Содном', email: 'nalaikh.sodnom@itc.mn', gender: 'm' },
    { id: 'emp064', name: 'Туяа Гэндэнсамбуу', email: 'tuya.gendensambuu@itc.mn', gender: 'f' },
    { id: 'emp065', name: 'Эрдэнэчулуун Хонгор', email: 'erdenechuluun.kgongor@itc.mn', gender: 'm' },
    { id: 'emp066', name: 'Мөнхэрдэнэ Аюурзана', email: 'munkherdene.ayuurzana@itc.mn', gender: 'f' },
    { id: 'emp067', name: 'Сансарбаяр Балжинням', email: 'sansarbayar.baljinnyam@itc.mn', gender: 'm' },
    { id: 'emp068', name: 'Энхтуяа Батсүрэн', email: 'enkhtuya.batsuren@itc.mn', gender: 'f' },
    { id: 'emp069', name: 'Гэрэлмаа Цогзолмаа', email: 'gerelmaa.tsogzolmaa@itc.mn', gender: 'f' },
    { id: 'emp070', name: 'Баяраа Мижиддорж', email: 'bayaraa.mijiiddorj@itc.mn', gender: 'f' },
    { id: 'emp071', name: 'Эрдэнэбат Жамьян', email: 'erdenebat.jamyan@itc.mn', gender: 'm' },
    { id: 'emp072', name: 'Чимэдцэдэн Лубсан', email: 'chimedtseden.lubsan@itc.mn', gender: 'm' },
    { id: 'emp073', name: 'Гантуяа Нямдорж', email: 'gantuya.nyamdorj@itc.mn', gender: 'f' },
    { id: 'emp074', name: 'Батбаяр Жамбалдорж', email: 'batbayar.jambaldorj@itc.mn', gender: 'm' },
    { id: 'emp075', name: 'Номинчимэг Дондогдорж', email: 'nominchimeg.dondogdorj@itc.mn', gender: 'f' },
    { id: 'emp076', name: 'Дэмчигжав Самбуудорж', email: 'demchigjav.sambuudorj@itc.mn', gender: 'm' },
    { id: 'emp077', name: 'Эрдэнэтуяа Тунгалаг', email: 'erdenetuya.tungalag@itc.mn', gender: 'f' },
    { id: 'emp078', name: 'Баяндэлгэр Монхоо', email: 'bayandelger.monkhoo@itc.mn', gender: 'm' },
    { id: 'emp079', name: 'Нэргүй Цэнд', email: 'nergui.tsend@itc.mn', gender: 'm' },
    { id: 'emp080', name: 'Зул Мягмарсүрэн', email: 'zul.myagmarsuren@itc.mn', gender: 'f' },
];

// Нэвтрэх боломжтой имэйлүүдийн жагсаалт (ажилчдаас автоматаар гаргана)
export const ALLOWED_EMAILS = new Set(EMPLOYEES.map(e => e.email.toLowerCase()));

// Имэйлийн хаягаас нэрийг хайна
export const getNameFromEmail = (email) => {
    const emp = EMPLOYEES.find(e => e.email.toLowerCase() === email.toLowerCase());
    return emp ? emp.name : email.split('@')[0];
};

// Ажилчдын ID-г имэйлээр хайна
export const getEmployeeByEmail = (email) => {
    return EMPLOYEES.find(e => e.email.toLowerCase() === email.toLowerCase());
};
