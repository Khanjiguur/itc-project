// ============================================================
//  ТОХИРГОО — Та доорх мэдээллийг өөрчлөх боломжтой
// ============================================================

// Одоо идэвхтэй байгаа номинацийн индекс (0 = анхдагч)
// 0 = Шилдэг удирдагч, 1 = Хамтын ажиллагаа, 2 = Шинэлэг санаа
// 3 = Хамгийн эерэг хандлага, 4 = Нуугдмал авьяас
export const ACTIVE_NOMINATION_INDEX = 1;

// Нэг номинацид нэг хүн хэдэн санал өгөх вэ
export const VOTES_PER_PERSON = 3;

// Хүйсийн emoji — та өөрчлөх боломжтой
export const GENDER_EMOJI = { m: '👨🏼', f: '👩🏼' };

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
        emoji: '😜',
        description: 'Хамт олондоо хамгийн их инээд баясгал түгээсэн',
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
        emoji: '✨',
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
        emoji: '🫶',
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
        emoji: '🪄',
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
    { id: 'emp001', name: 'Наранбаатар Батдорж',    email: 'naranbaatar@itc.gov.mn', gender: 'm' },
    { id: 'emp002', name: 'Урангуа Цэдэнбалжир',    email: 'urangua.ts@itc.gov.mn', gender: 'f' },
    { id: 'emp003', name: 'Өлзийцэцэг Дүвжир',      email: 'ulziitsetseg.d@itc.gov.mn', gender: 'f' },
    { id: 'emp004', name: 'Сэлэнгэ Довдон',         email: 'selenge@itc.gov.mn', gender: 'f' },
    { id: 'emp005', name: 'Цэрэнханд Мөнх-Эрдэнэ',  email: 'tserenkhand.m@itc.gov.mn', gender: 'f' },
    { id: 'emp006', name: 'Мөнхжин Мөнхбат',        email: 'munkhjin@itc.gov.mn', gender: 'm' },
    { id: 'emp007', name: 'Энхжаргал Галтболд',     email: 'enkhjargal.g@itc.gov.mn', gender: 'f' },
    { id: 'emp008', name: 'Сүхбат Цэдэнбалжир',     email: 'sukhbat.ts@itc.gov.mn', gender: 'm' },
    { id: 'emp009', name: 'Баасанням Ундрахсайхан', email: 'baasannyam.u@itc.gov.mn', gender: 'm' },
    { id: 'emp010', name: 'Рэгдэншарав Батсайхан',  email: 'regdensharav.b@itc.gov.mn', gender: 'm' },
    { id: 'emp011', name: 'Дэлгэрмөрөн Есөнбилэг',  email: 'delgermurun.yes@itc.gov.mn', gender: 'f' },
    { id: 'emp012', name: 'Долгорсүрэн Батжаргал',  email: 'dolgorsuren.b@itc.gov.mn', gender: 'f' },
    { id: 'emp013', name: 'Ундрал  Ганбаатар',      email: 'undral@itc.gov.mn', gender: 'm' },
    { id: 'emp014', name: 'Баябацэцэг Баатарцогт',  email: 'byambatsetseg.b@itc.gov.mn', gender: 'f' },
    { id: 'emp015', name: 'Цэгмэд Төмөр ',          email: 'tsegmid.t@itc.gov.mn', gender: 'f' },
    { id: 'emp016', name: 'Булганжаргал	Баясгалан ',email: 'bulganjargal.b@itc.gov.mn', gender: 'm' },
    { id: 'emp017', name: 'Заяа	Жавхлан ',          email: 'zaya.j@itc.gov.mn', gender: 'f' },
    { id: 'emp018', name: 'Баяржаргал Уханаа ',     email: 'bayarjargal.u@itc.gov.mn', gender: 'f' },
    { id: 'emp019', name: 'Баасанням Ундрахсайхан', email: 'baasannyam.u@itc.gov.mn', gender: 'm' },
    { id: 'emp020', name: 'Хишигдулам Шинэбаяр',    email: 'khishigdulam.sh@itc.gov.mn', gender: 'f' },
    { id: 'emp021', name: 'Тэргэл Мөнхбаяр',        email: 'tergel.m@itc.gov.mn', gender: 'f' },
    { id: 'emp022', name: 'Буянхүү Баясгалан ',     email: 'buyankhuu.b@itc.gov.mn', gender: 'f' },
    { id: 'emp023', name: 'Туяацэцэг Отгонбаатар',  email: 'tuyatsetseg.o@itc.gov.mn', gender: 'f' },
    { id: 'emp024', name: 'Дагваширчин Бямбацогт',  email: 'dagvashirchin@itc.gov.mn', gender: 'm' },
    { id: 'emp025', name: 'Энх-Амар	Энхбат',        email: 'enkhamar@itc.gov.mn', gender: 'm' },
    { id: 'emp026', name: 'Төрсанаа	Батгэрэл ',     email: 'tursanaa.b@itc.gov.mn', gender: 'm' },
    { id: 'emp027', name: 'Санжсүрэн  Пүрэвдорж',   email: 'sanjsuren.p@itc.gov.mn', gender: 'm' },
    { id: 'emp028', name: 'Лувсанбат Галсанбаатар', email: 'luvsanbat.g@itc.gov.mn', gender: 'm' },
    { id: 'emp029', name: 'Батнавч	Өсөхбаяр',      email: 'batnavch.u@itc.gov.mn', gender: 'f' },
    { id: 'emp030', name: 'Хувьтөгөлдөр	Цагаанцоож',email: 'khuvituguldur.ts@itc.gov.mn', gender: 'm' },
    { id: 'emp031', name: 'Нямлхагва Гончигсүрэн',  email: 'Nyamlkhagva@itc.gov.mn', gender: 'm' },
    { id: 'emp032', name: 'Алтан-Очир Мийсэнгэ',    email: 'altanochir.m@itc.gov.mn', gender: 'm' },
    { id: 'emp033', name: 'Лхагва-Өлзий	Дуламсүрэн',email: 'lkhagvaulzii@itc.gov.mn', gender: 'm' },
    { id: 'emp034', name: 'Энхцэцэг	Энхбат',        email: 'enkhtsetseg.e@itc.gov.mn', gender: 'f' },
    { id: 'emp035', name: 'Ууганбаяр Магсаржав',    email: 'uuganbayar@itc.gov.mn', gender: 'm' },
    { id: 'emp036', name: 'Мөнгөнсүх Мөнгөнхүү',    email: 'mungunsukh.m@itc.gov.mn', gender: 'm' },
    { id: 'emp037', name: 'Мөнхтулга Цэрэннадмид',  email: 'munkhtulga.ts@itc.gov.mn', gender: 'm' },
    { id: 'emp038', name: 'Энхманлай Жигмэддорж ',  email: 'enkhmanlai.j@itc.gov.mn', gender: 'm' },
    { id: 'emp039', name: 'Тэмүүжин	Галбадрах',     email: 'temuujin@itc.gov.mn', gender: 'm' },
    { id: 'emp040', name: 'Чойжин	Алтангэрэл',    email: 'choijina@audit.gov.mn', gender: 'm' },
{ id: 'emp041', name: 'Ханжигүүр Алтаншагай ',      email: 'khanjiguur.a@itc.gov.mn', gender: 'm' },
    { id: 'emp042', name: 'Дуламжав	Хишигням',      email: 'dulamjav.kh@itc.gov.mn', gender: 'f' },
    { id: 'emp043', name: 'Отгон-Эрдэнэ  Сарантуяа',email: 'otgonerdene.s@itc.gov.mn', gender: 'f' },
    { id: 'emp044', name: 'Энхмөрөн	Намжилдорж',    email: 'enkhmurun.n@itc.gov.mn', gender: 'm' },
    { id: 'emp045', name: 'Наранмандал Чимэгмаа',   email: 'naranmandal@itc.gov.mn', gender: 'f' },
    { id: 'emp046', name: 'Билгүүн Ёошифүми',       email: 'bilguun.yo@itc.gov.mn', gender: 'm' },
    { id: 'emp047', name: 'Цолмон Мягмар',          email: 'tsolmon@itc.gov.mn', gender: 'm' },
    { id: 'emp048', name: 'Өнөрмаа Сэргэлэнбилэг',  email: 'unurmaa.s@itc.gov.mn', gender: 'f' },
    { id: 'emp049', name: 'Жаргалмаа Ганбаатар',    email: 'jargalmaa.g@itc.gov.mn', gender: 'f' },
    { id: 'emp050', name: 'Очирпүрэв Даваажав',     email: 'ochirpurev@itc.gov.mn', gender: 'm' },
    { id: 'emp051', name: 'Нармандах Дашдорж',      email: 'narmandakh.d@itc.gov.mn', gender: 'm' },
    { id: 'emp052', name: 'Түмэнжаргал Бүтээмж',    email: 'tumenjargal.b@itc.gov.mn', gender: 'm' },
    { id: 'emp053', name: 'Мөнхзул Шийлэгмаа',      email: 'munkhzul.sh@itc.gov.mn', gender: 'f' },
    { id: 'emp054', name: 'Мөнгөнчимэг Баярсайхан', email: 'mungunchimeg.b@itc.gov.mn', gender: 'f' },
    { id: 'emp055', name: 'Ганбаяр Чулуунбаатар ',  email: 'ganbayar.ch@itc.gov.mn', gender: 'm' },
    { id: 'emp056', name: 'Ганжаргал Ганбаатар',    email: 'ganjargal.g@itc.gov.mn', gender: 'f' },
    { id: 'emp057', name: 'Бямбасүх  Даваасамбуу',  email: 'byambasukh@itc.gov.mn', gender: 'm' },
    { id: 'emp058', name: 'Гантулга  Энхтөр ',      email: 'Gantulga.e@itc.gov.mn', gender: 'm' },
    { id: 'emp059', name: 'Номин  Наранбат ',       email: 'nomin.n@itc.gov.mn', gender: 'f' },
    { id: 'emp060', name: 'Баярцогт	Баатарсүх',     email: 'bayartsogt@itc.gov.mn', gender: 'm' },
    { id:'emp061',name:'Дирийлаамятав  Цэрэндолгор',email: 'diriilaamyatav.ts@itc.gov.mn', gender: 'm' },
    { id: 'emp062',name:'Хөгжилсайхан Эрдэнэ-Очир', email: 'khugjilsaikhan.e@itc.gov.mn', gender: 'f' },
    { id: 'emp063', name: 'Билгүүн	Ганчулуун',     email: 'bilguun.g@itc.gov.mn', gender: 'm' },
    { id: 'emp064', name: 'Төгөлдөр	Баярсайхан',    email: 'tuguldur.b@itc.gov.mn', gender: 'm' },
    { id: 'emp065', name: 'Мандах Адъяабазар',      email: 'mandakh.a@itc.gov.mn', gender: 'm' },
    { id: 'emp066', name: 'Эрдэнэсүрэн Намжилдорж', email: 'erdenesuren@itc.gov.mn', gender: 'm' },
    { id: 'emp067', name: 'Номуун Санжрагчаа',      email: 'nomuun@itc.gov.mn', gender: 'f' },
    { id: 'emp068', name: 'Энхзаяа Пүрэв-Очир',     email: 'enkhzaya@itc.gov.mn', gender: 'f' },
    { id: 'emp069', name: 'Үржинханд Алтангэрэл',   email: 'urjinkhand.a@itc.gov.mn', gender: 'f' },
    { id: 'emp070', name: 'Дөлгөөн Энхжаргал',      email: 'dulguun.e@itc.gov.mn', gender: 'f' },
    { id: 'emp071', name: 'Содгэрэл	Энх-Амгалан',   email: 'sodgerel.e@itc.gov.mn', gender: 'm' },
    { id: 'emp072', name: 'Хонгорзул Төрмөнх',      email: 'khongorzul.t@itc.gov.mn', gender: 'f' },
    { id: 'emp073', name: 'Хаштулга	Тайванбаатар',  email: 'khashtulga.t@itc.gov.mn', gender: 'm' },
    { id: 'emp074', name: 'Минжээ Лхагвасүрэн',     email: 'minjee.l@itc.gov.mn', gender: 'f' },
    { id: 'emp075', name: 'Баттулга	Чулуунбат',     email: 'battulga.ch@itc.gov.mn', gender: 'm' },
    { id: 'emp076', name: 'Энэрэл Энх-Амар',        email: 'eni.amar30@gmail.com', gender: 'f' },
    { id: 'emp077', name: 'Батбаяр Баярхүү',        email: 'batbayar.b@itc.gov.mn', gender: 'm' },
    { id: 'emp078', name: 'Энхбилэг  Дамчаа',       email: 'enkhbileg.d@itc.gov.mn', gender: 'f' },
    { id: 'emp079', name: 'Хүслэн Болорчулуу',      email: 'khuslen.b@itc.gov.mn', gender: 'm' },
    { id: 'emp080', name: 'Энх-Амгалан Наранцэцэг', email: 'enkhamgalan.n@itc.gov.mn', gender: 'm' },
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
