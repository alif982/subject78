export interface Topic {
  id: string;
  name: string;
  category?: string;
}

export interface Subject {
  id: string;
  title: string;
  icon: string;
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
  }
];
