export interface Topic {
  id: string;
  name: string;
  category?: string;
}

export interface Subject {
  id: string;
  title: string;
  icon: string;
  group?: string;
  categories: {
    name: string;
    topics: Topic[];
  }[];
}

export const syllabusData: Subject[] = [
  {
    id: 'bangla-1',
    title: 'Bangla 1st Paper',
    icon: 'BookOpen',
    group: 'General',
    categories: [
      {
        name: 'পাঠ্যসূচি',
        topics: [
          { id: 'b1g1', name: 'অপরিচিতা' },
          { id: 'b1g2', name: 'বিলাসী' },
          { id: 'b1g3', name: 'আমার পথ' },
          { id: 'b1g4', name: 'মানব কল্যাণ' },
          { id: 'b1g5', name: 'মাসি-পিসি' },
          { id: 'b1g6', name: 'বায়ান্নর দিনগুলো' },
          { id: 'b1g7', name: 'রেইনকোট' },
          { id: 'b1k1', name: 'সোনার তরী' },
          { id: 'b1k2', name: 'বিদ্রোহী' },
          { id: 'b1k3', name: 'প্রতিদান' },
          { id: 'b1k4', name: 'তাহারেই পড়ে মনে' },
          { id: 'b1k5', name: 'আঠারো বছর বয়স' },
          { id: 'b1k6', name: 'ফেব্রুয়ারি ১৯৬৯' },
          { id: 'b1k7', name: 'আমি কিংবদন্তির কথা বলছি' },
          { id: 'b1u1', name: 'লালসালু' },
          { id: 'b1n1', name: 'সিরাজউদৌল্লা' }
        ]
      }
    ]
  },
  {
    id: 'bangla-2',
    title: 'Bangla 2nd Paper',
    icon: 'PenTool',
    group: 'General',
    categories: [
      {
        name: 'ব্যাকরণ ও অন্যান্য',
        topics: [
          { id: 'b2t1', name: 'ভাষা ও বাংলা ভাষা, ভাষার রীতি ও বিভাজন' },
          { id: 'b2t2', name: 'বাংলা লিপি' },
          { id: 'b2t3', name: 'বাংলা ব্যাকরণ' },
          { id: 'b2t4', name: 'বাগযন্ত্র' },
          { id: 'b2t5', name: 'ধ্বনি, বর্ণ ও বর্ণের উচ্চারন' },
          { id: 'b2t6', name: 'ধ্বনি পরিবর্তন' },
          { id: 'b2t7', name: 'ণ-ত্ব ও ষ-ত্ব বিধান' },
          { id: 'b2t8', name: 'সন্ধি' },
          { id: 'b2t9', name: 'শব্দ সম্ভার' },
          { id: 'b2t10', name: 'নর ও নারীবাচক শব্দ' },
          { id: 'b2t11', name: 'সংখ্যাবাচক শব্দ' },
          { id: 'b2t12', name: 'শব্দ দ্বিত্ব' },
          { id: 'b2t13', name: 'বচন' },
          { id: 'b2t14', name: 'নির্দেশক' },
          { id: 'b2t15', name: 'উপসর্গ' },
          { id: 'b2t16', name: 'সমাস' },
          { id: 'b2t17', name: 'ধাতু' },
          { id: 'b2t18', name: 'প্রকৃতি ও প্রত্যয়' },
          { id: 'b2t19', name: 'শব্দ ও পদের গঠন' },
          { id: 'b2t20', name: 'পদ প্রকরণ' },
          { id: 'b2t21', name: 'ক্রিয়ার কাল' },
          { id: 'b2t22', name: 'ক্রিয়ার ভাব ও পুরুষ' },
          { id: 'b2t23', name: 'কারক ও বিভক্তি' },
          { id: 'b2t24', name: 'বাক্য প্রকরণ এবং ছন্দ ও অলংকার' },
          { id: 'b2t25', name: 'বাক্যের বর্গ' },
          { id: 'b2t26', name: 'বাচ্য' },
          { id: 'b2t27', name: 'যতি চিহ্ন' },
          { id: 'b2t28', name: 'উক্তি' },
          { id: 'b2t29', name: 'বাগর্থের শ্রেণি' },
          { id: 'b2t30', name: 'বাংলা বানান ও শুদ্ধিকরন এবং প্রয়োগ-অপ্রয়োগ' },
          { id: 'b2t31', name: 'বাগধারা' },
          { id: 'b2t32', name: 'বিপরীত শব্দ' },
          { id: 'b2t33', name: 'সমার্থক শব্দ' },
          { id: 'b2t34', name: 'প্রতিশব্দ/শব্দার্থ' },
          { id: 'b2t35', name: 'এক কথা প্রকাশ' },
          { id: 'b2t36', name: 'পারিভাষিক শব্দ' },
          { id: 'b2t37', name: 'প্রবাদ প্রবচন' },
          { id: 'b2t38', name: 'Translation' },
          { id: 'b2t39', name: 'একই শব্দের ভিন্নার্থে প্রয়োগ' },
          { id: 'b2t40', name: 'প্রায় সমোচ্চারিত ভিন্নার্থক শব্দ' },
          { id: 'b2t41', name: 'অপ-প্রয়োগ ও শুদ্ধপ্রয়োগ' }
        ]
      }
    ]
  },
  {
    id: 'english-2',
    title: 'English 2nd Paper',
    icon: 'Languages',
    group: 'General',
    categories: [
      {
        name: 'Syllabus',
        topics: [
          { id: 'e2g1', name: 'Parts of Speech' },
          { id: 'e2g2', name: 'Noun & Determiner' },
          { id: 'e2g3', name: 'Number' },
          { id: 'e2g4', name: 'Gender' },
          { id: 'e2g5', name: 'Pronoun' },
          { id: 'e2g6', name: 'Adjective' },
          { id: 'e2g7', name: 'Article' },
          { id: 'e2g8', name: 'Degree of Comparison' },
          { id: 'e2g9', name: 'Adverb & Inversion' },
          { id: 'e2g10', name: 'Tense & Sequence of Tense' },
          { id: 'e2g11', name: 'Verb in Details' },
          { id: 'e2g12', name: 'Gerund Infinitive, Participle' },
          { id: 'e2g13', name: 'Subject-Verb Agreement' },
          { id: 'e2g14', name: 'Right Form of Verb' },
          { id: 'e2g15', name: 'Subjunctive & Causative' },
          { id: 'e2g16', name: 'Conditional Sentence' },
          { id: 'e2g17', name: 'Conjunction & Linkers' },
          { id: 'e2g18', name: 'Phrase & Clause in Details' },
          { id: 'e2g19', name: 'WH Words & Embedded Questions' },
          { id: 'e2g20', name: 'Dangling Modifier' },
          { id: 'e2g21', name: 'Sentence & Its Transformations' },
          { id: 'e2g22', name: 'Voice' },
          { id: 'e2g23', name: 'Narration' },
          { id: 'e2g24', name: 'Tag Question' },
          { id: 'e2g25', name: 'Affirmative & Negative Agreement' },
          { id: 'e2v1', name: 'Synonym & Antonym' },
          { id: 'e2v2', name: 'Preposition' },
          { id: 'e2v3', name: 'Group Verb / Phrasal Verb' },
          { id: 'e2v4', name: 'Phrases & Idioms' },
          { id: 'e2v5', name: 'Spelling' },
          { id: 'e2v6', name: 'One Word Substitution' },
          { id: 'e2v7', name: 'Translations & Proverbs' }
        ]
      }
    ]
  },
  {
    id: 'gk',
    title: 'GK (General Knowledge)',
    icon: 'Globe',
    group: 'General',
    categories: [
      {
        name: 'Bangladesh Affairs',
        topics: [
          { id: 'gkb1', name: 'বিজ্ঞান ও চিকিৎসা' },
          { id: 'gkb2', name: 'সাম্প্রতিক' },
          { id: 'gkb3', name: 'প্রাচীন বাংলার ইতিহাস' },
          { id: 'gkb4', name: 'উপমহাদেশে ইসলামের আবির্ভাব' },
          { id: 'gkb5', name: 'বাংলায় মুসলিম শাসন প্রতিষ্ঠা' },
          { id: 'gkb6', name: 'মুঘল সম্রাজ্য' },
          { id: 'gkb7', name: 'ইংরেজ শাসন' },
          { id: 'gkb8', name: 'বাংলার সংস্কার আন্দোলন' },
          { id: 'gkb9', name: 'বাংলার রাজনৈতিক আন্দোলন' },
          { id: 'gkb10', name: 'পাকিস্তান আমল' },
          { id: 'gkb11', name: 'মহান মুক্তিযুদ্ধ' },
          { id: 'gkb12', name: 'বাংলাদেশ পরিচিতি' },
          { id: 'gkb13', name: 'বাংলাদেশের অবস্থান, আয়তন ও সীমানা' },
          { id: 'gkb14', name: 'বাংলাদেশের আবহাওয়া ও জলবায়ু' },
          { id: 'gkb15', name: 'বাংলাদেশের প্রথম' },
          { id: 'gkb16', name: 'বাংলাদেশের জাতীয় বিষয়াবলী' },
          { id: 'gkb17', name: 'বাংলাদেশের শিক্ষা' },
          { id: 'gkb18', name: 'বাংলাদেশের সংবিধান' },
          { id: 'gkb19', name: 'জাতীয় সংসদ' },
          { id: 'gkb20', name: 'গণভোট ও সংসদ নির্বাচন' },
          { id: 'gkb21', name: 'বাংলাদেশের সাংবিধানিক সংস্থা' },
          { id: 'gkb22', name: 'বাংলাদেশ সরকারের প্রশাসনিক ব্যবস্থা' },
          { id: 'gkb23', name: 'জনসংখ্যা ও ক্ষুদ্র নৃগোষ্ঠী' },
          { id: 'gkb24', name: 'বাংলাদেশের নদী, সমুদ্রবন্দর ও বাঁধ' },
          { id: 'gkb25', name: 'বাংলাদেশের পাহাড়, পর্বত, চর, বন্দর ও অন্যান্য' },
          { id: 'gkb26', name: 'ভৌগোলিক উপনাম, বর্তমান ও পুরাতন নাম' },
          { id: 'gkb27', name: 'বাংলাদেশের সম্পদ' },
          { id: 'gkb28', name: 'বাংলাদেশের শিল্প' },
          { id: 'gkb29', name: 'বাংলাদেশের অর্থনীতি' },
          { id: 'gkb30', name: 'বাংলাদেশের জাতীয় দিবস' },
          { id: 'gkb31', name: 'বাংলাদেশের শিল্প-সাহিত্য ও সংস্কৃতি' },
          { id: 'gkb32', name: 'বাংলার প্রাচীন স্থাপত্য' },
          { id: 'gkb33', name: 'বাংলাদেশের ভাস্কর, ভাস্কর্য ও অবস্থান' },
          { id: 'gkb34', name: 'বিভিন্ন প্রতিষ্ঠান ও একাডেমি ও কমিশন' },
          { id: 'gkb35', name: 'আন্তর্জাতিক ক্ষেত্রে বাংলাদেশ' },
          { id: 'gkb36', name: 'বাংলাদেশের চুক্তি' },
          { id: 'gkb37', name: 'বাংলাদেশের প্রতিরক্ষা ও নিরাপত্তা বাহিনী' },
          { id: 'gkb38', name: 'পরিবহন ও যোগাযোগ ব্যবস্থা' },
          { id: 'gkb39', name: 'বাংলাদেশের গণমাধ্যম' },
          { id: 'gkb40', name: 'বাংলাদেশের দর্শনীয় স্থান' },
          { id: 'gkb41', name: 'কবি সাহিত্যকদের ছদ্মনাম, উপাধি, মহাকাব্য, জীবনী উদ্ধৃতি-সংকলন ও পত্র-পত্রিকা' }
        ]
      },
      {
        name: 'International Affairs',
        topics: [
          { id: 'gki1', name: 'আন্তর্জাতিক সংস্থা' },
          { id: 'gki2', name: 'বিশ্ব ইতিহাস' },
          { id: 'gki3', name: 'বিশ্ব অর্থনীতি' },
          { id: 'gki4', name: 'আন্তর্জাতিক দিবস' },
          { id: 'gki5', name: 'সাম্প্রতিক বিশ্ব' },
          { id: 'gki6', name: 'বিভিন্ন দেশের রাজধানী, মুদ্রা ও ভাষা' },
          { id: 'gki7', name: 'আন্তর্জাতিক যুদ্ধ ও চুক্তি' },
          { id: 'gki8', name: 'জাতিসংঘ' },
          { id: 'gki9', name: 'বিশ্বখ্যাত স্থান ও স্থাপনা' }
        ]
      }
    ]
  },
  {
    id: 'physics-1',
    title: 'Physics 1st Paper',
    icon: 'Zap',
    group: 'Science',
    categories: [
      {
        name: 'Syllabus',
        topics: [
          { id: 'p1t1', name: 'Physical World and Measurement (ভৌত জগৎ ও পরিমাপ)' },
          { id: 'p1t2', name: 'Vectors (ভেক্টর)' },
          { id: 'p1t3', name: 'Dynamics (গতিবিদ্যা)' },
          { id: 'p1t4', name: 'Newtonian Mechanics (নিউটনিয়ান বলবিদ্যা)' },
          { id: 'p1t5', name: 'Work, Energy & Power (কাজ, শক্তি ও ক্ষমতা)' },
          { id: 'p1t6', name: 'Gravitation and Gravity (মহাকর্ষ ও অভিকর্ষ)' },
          { id: 'p1t7', name: 'Structural Properties of Matter (পদার্থের গাঠনিক ধর্ম)' },
          { id: 'p1t8', name: 'Periodic Motion (পর্যাবৃত্ত গতি)' },
          { id: 'p1t9', name: 'Wave (তরঙ্গ)' },
          { id: 'p1t10', name: 'Ideal Gas and Kinetic Theory of Gases (আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব)' }
        ]
      }
    ]
  },
  {
    id: 'physics-2',
    title: 'Physics 2nd Paper',
    icon: 'Zap',
    group: 'Science',
    categories: [
      {
        name: 'Syllabus',
        topics: [
          { id: 'p2t1', name: 'Thermodynamics (তাপগতবিদ্যা)' },
          { id: 'p2t2', name: 'Static Electricity (স্থির তড়িৎ)' },
          { id: 'p2t3', name: 'Current Electricity (চল তড়িৎ)' },
          { id: 'p2t4', name: 'Magnetic Effects of Electric Current and Magnetism (তড়িৎ প্রবাহের চৌম্বক ক্রিয়া ও চৌম্বকত্ব)' },
          { id: 'p2t5', name: 'Electromagnetic Induction and Alternating Current (তড়িতচৌম্বকীয় আবশ ও পরিবর্তী প্রবাহ)' },
          { id: 'p2t6', name: 'Geometrical Optics (জ্যামিতিক আলোকবিজ্ঞান)' },
          { id: 'p2t7', name: 'Physical Optics (ভৌত আলোকবিজ্ঞান)' },
          { id: 'p2t8', name: 'Introduction to Modern Physics (আধুনিক পদার্থবিজ্ঞান)' },
          { id: 'p2t9', name: 'Atomic Model and Nuclear Physics (পরমাণুর মডেল এবং নিউক্লিয়ার পদার্থবিজ্ঞান)' },
          { id: 'p2t10', name: 'Semiconductor and Electronics (সেমিকন্ডাক্টর ও ইলেক্ট্রনিক্স)' },
          { id: 'p2t11', name: 'Astronomy (জ্যোতির্বিজ্ঞান)' }
        ]
      }
    ]
  },
  {
    id: 'chemistry-1',
    title: 'Chemistry 1st Paper',
    icon: 'FlaskConical',
    group: 'Science',
    categories: [
      {
        name: 'Syllabus',
        topics: [
          { id: 'c1t1', name: 'Safe use of Laboratory (ল্যাবরেটরির নিরাপদ ব্যাবহার)' },
          { id: 'c1t2', name: 'Qualitative Chemistry (গুণগত রসায়ন)' },
          { id: 'c1t3', name: 'Perhodic Properties of Elements & Chemical Bonding (মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন)' },
          { id: 'c1t4', name: 'Chemical Changes (রাসায়নিক পরিবর্তন)' },
          { id: 'c1t5', name: 'Application Oriented Chemistry (কর্মমুখী রসায়ন)' }
        ]
      }
    ]
  },
  {
    id: 'chemistry-2',
    title: 'Chemistry 2nd Paper',
    icon: 'FlaskConical',
    group: 'Science',
    categories: [
      {
        name: 'Syllabus',
        topics: [
          { id: 'c2t1', name: 'Environmental Chemistry (পরিবেশ রসায়ন)' },
          { id: 'c2t2', name: 'Organic Chemistry (জৈব রসায়ন)' },
          { id: 'c2t3', name: 'Quantitive Chemistry (পরিমাণগত রসায়ন)' },
          { id: 'c2t4', name: 'Electro Chemistry (তড়িৎ রসায়ন)' },
          { id: 'c2t5', name: 'Economical Chemistry (অর্থনৈতিক রসায়ন)' }
        ]
      }
    ]
  },
  {
    id: 'biology-1',
    title: 'Biology 1st Paper',
    icon: 'Dna',
    group: 'Science',
    categories: [
      {
        name: 'Syllabus',
        topics: [
          { id: 'bio1t1', name: 'Cell and Its Structure (কোষ ও এর গঠন)' },
          { id: 'bio1t2', name: 'Cell Division (কোষ বিভাজন)' },
          { id: 'bio1t3', name: 'Cell Chemistry (কোষ রসায়ন)' },
          { id: 'bio1t4', name: 'Micro-organism/Microbe (অনুজীব)' },
          { id: 'bio1t5', name: 'Algae and Fungi (শৈবাল ও ছত্রাক)' },
          { id: 'bio1t6', name: 'Bryophyta and Pteridophya (ব্রায়োফাইট ও টেরিডোফাইটা)' },
          { id: 'bio1t7', name: 'Gymnosperms and Angiosperms (নগ্নবীজী ও আবৃতবীজী উদ্ভিদ)' },
          { id: 'bio1t8', name: 'Tissue and Tissue System (টিস্যু ও টিস্যুতন্ত্র)' },
          { id: 'bio1t9', name: 'Plant Physiology (উদ্ভিদ শারীরতত্ত্ব)' },
          { id: 'bio1t10', name: 'Plant Peproduction (উদ্ভিদ প্রজনন)' },
          { id: 'bio1t11', name: 'Biotechnology (জীবপ্রযুক্তি)' },
          { id: 'bio1t12', name: 'Environment, Distribution and Conservation of Living Organisms (জীবের পরিবেশ, বিস্তার ও সংরক্ষণ)' }
        ]
      }
    ]
  },
  {
    id: 'biology-2',
    title: 'Biology 2nd Paper',
    icon: 'Dna',
    group: 'Science',
    categories: [
      {
        name: 'Syllabus',
        topics: [
          { id: 'bio2t1', name: 'Animal Diversity & Classification (প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস)' },
          { id: 'bio2t2', name: 'Introduction to Animal (প্রাণীর পরিচিতি)' },
          { id: 'bio2t3', name: 'Human Physiology : Digestion & Absorption (মানব শরীরতত্ত্ব : পরিপাক ও শোষণ)' },
          { id: 'bio2t4', name: 'Human Physiology : Blood & Circulation (মানব শরীরতত্ত্ব : রক্ত ও সংবহনতন্ত্র)' },
          { id: 'bio2t5', name: 'Human Physiology : Respiration & its Process (মানব শরীরতত্ত্ব : শ্বসন ও শ্বাসক্রিয়া)' },
          { id: 'bio2t6', name: 'Human Physiology : Waste & Excretion (মানব শরীরতত্ত্ব : বর্জ্য ও নিষ্কাশন)' },
          { id: 'bio2t7', name: 'Human Physiology : Locomotion & Organ Movement (মানব শরীরতত্ত্ব : চলন ও অঙ্গচালনা)' },
          { id: 'bio2t8', name: 'Human Physiology : Co-ordination & Control (মানব শরীরতত্ত্ব : সমন্বয় ও নিয়ন্ত্রন)' },
          { id: 'bio2t9', name: 'Continuity of Human Life (মানব জীবনের ধারাবাহিকতা)' },
          { id: 'bio2t10', name: 'Immunity of Human Body (মানবদেহের প্রতিরক্ষা)' },
          { id: 'bio2t11', name: 'Genetics & Evolution (জীনতত্ত্ব ও বিবর্তন)' },
          { id: 'bio2t12', name: 'Animal Behaviour (প্রাণীর আচরণ)' }
        ]
      }
    ]
  },
  {
    id: 'math-1',
    title: 'Higher Math 1st Paper',
    icon: 'Calculator',
    group: 'Science',
    categories: [
      {
        name: 'Syllabus',
        topics: [
          { id: 'm1t1', name: 'Matrix & Diterminations (ম্যাট্রিক্স ও নির্ণায়ক)' },
          { id: 'm1t2', name: 'Vectors (ভেক্টর)' },
          { id: 'm1t3', name: 'Straight Line (সরলরেখা)' },
          { id: 'm1t4', name: 'Circles (বৃত্ত)' },
          { id: 'm1t5', name: 'Permutations & Combinations (বিন্যাস ও সমাবেশ)' },
          { id: 'm1t6', name: 'Trigonometric Ratios (ত্রিকোণমিতিক অনুপাত)' },
          { id: 'm1t7', name: 'Trigonometric Ratios of Associated Angles (সংযুক্ত কোণের ত্রিকোণমিতিক অনুপাত)' },
          { id: 'm1t8', name: 'Functions & Graph of Functions (ফাংশন ও ফাংশনের লেখচিত্র)' },
          { id: 'm1t9', name: 'Differentiation (অন্তরীকরণ)' },
          { id: 'm1t10', name: 'Integration (যোগজীকরণ)' }
        ]
      }
    ]
  },
  {
    id: 'math-2',
    title: 'Higher Math 2nd Paper',
    icon: 'Calculator',
    group: 'Science',
    categories: [
      {
        name: 'Syllabus',
        topics: [
          { id: 'm2t1', name: 'Real Number & Inequalities (বাস্তব সংখ্যা ও অসমতা)' },
          { id: 'm2t2', name: 'Linear Programming (যোগাশ্রয়ী প্রোগ্রাম)' },
          { id: 'm2t3', name: 'Complex Number (জঠিল সংখ্যা)' },
          { id: 'm2t4', name: 'Polynoials & Polynomial Equations (বহুপদী ও বহুপদী সমীকরণ)' },
          { id: 'm2t5', name: 'Binomial Expansions (দ্বিপদী বিস্তৃতি)' },
          { id: 'm2t6', name: 'Conics (কনিক)' },
          { id: 'm2t7', name: 'Inverse Trigonometric Functions & Trigonometric Equations (বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ)' },
          { id: 'm2t8', name: 'Statics (স্থিতিবিদ্যা)' },
          { id: 'm2t9', name: 'Motion of Particles in a Plane (সমতলে বস্তুকণার গতি)' },
          { id: 'm2t10', name: 'Measures of Dispersions & Probability (বিস্তার পরিমাপ ও সম্ভাবনা)' }
        ]
      }
    ]
  }
];
