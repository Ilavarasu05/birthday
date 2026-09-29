/**
 * Central Configuration for the Birthday Surprise & Proposal Experience.
 * You can modify any value here to personalize the entire experience.
 */

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    text: string;
    isCorrect?: boolean;
    funnyReaction?: string;
  }[];
  explanation: string;
}

export interface MemoryPhoto {
  id: number;
  url: string;
  caption: string;
  date?: string;
  note?: string;
}

export interface StoryConfig {
  NAME: string;
  YOUR_NAME: string;
  AGE: number | string;
  BIRTHDAY_DATE: string;
  
  // Theme & Colors
  COLORS: {
    primaryBg: string;
    accentPink: string;
    accentGold: string;
    accentPurple: string;
    accentBlue: string;
    accentRed: string;
  };

  // Scene 01 Diagnostics
  DIAGNOSTICS: {
    cuteness: number; // percentage
    drama: number;
    attitude: number;
    patience: number;
    replySpeed: string;
    foodStealing: number;
    stealingHeart: number;
  };

  // Scene 02 Mission Details
  MISSION: {
    codeName: string;
    department: string;
    clearanceLevel: string;
    objectives: string[];
  };

  // Scene 03 Quiz
  QUIZ_QUESTIONS: QuizQuestion[];
  COMPATIBILITY_SCORE: string;
  COMPATIBILITY_NOTE: string;

  // Scene 04 Boss Battle
  BOSS: {
    name: string;
    title: string;
    stats: {
      love: number;
      drama: number;
      jealousy: number;
      cuteness: number;
      foodStealing: number;
    };
    specialAttack: string;
  };

  // Scene 05 Police Investigation
  INVESTIGATION: {
    caseNumber: string;
    crime: string;
    suspectName: string;
    aliases: string[];
    evidenceList: {
      id: string;
      title: string;
      description: string;
      badge: string;
      icon: string;
    }[];
    verdict: string;
    sentence: string;
  };

  // Scene 08 Photos & Memories
  PHOTOS: MemoryPhoto[];

  // Scene 09 Birthday Cake
  BIRTHDAY_MESSAGE: {
    greeting: string;
    subtext: string;
    wishPrompt: string;
    afterWishMessage: string;
  };

  // Scene 11 Proposal
  PROPOSAL_MESSAGE: {
    leadIn: string;
    middle: string;
    questionPrefix: string;
    mainQuestion: string;
    subQuestion: string;
  };

  // Scene 12 Funny No responses
  NO_BUTTON_RESPONSES: string[];

  // Scene 13 & 14 Celebration & Report
  CELEBRATION: {
    badge: string;
    title: string;
    subtitle: string;
    loveDeclaration: string;
  };

  FINAL_REPORT: {
    mission: string;
    status: string;
    heart: string;
    relationship: string;
    future: string;
    punchline: string;
  };

  // Scene 15 Ending
  FINAL_MESSAGE: {
    quote1: string;
    quote2: string;
    signaturePrefix: string;
    dateDisplay: string;
  };

  // Sound Config
  MUSIC: {
    defaultVolume: number;
    enableSfx: boolean;
    ambientSynthEnabled: boolean;
  };
}

export const DEFAULT_STORY_CONFIG: StoryConfig = {
  NAME: "Maya",
  YOUR_NAME: "Lucas",
  AGE: 25,
  BIRTHDAY_DATE: "September 28",

  COLORS: {
    primaryBg: "#05050b",
    accentPink: "#f43f5e",
    accentGold: "#fbbf24",
    accentPurple: "#a855f7",
    accentBlue: "#38bdf8",
    accentRed: "#ef4444",
  },

  DIAGNOSTICS: {
    cuteness: 100,
    drama: 87,
    attitude: 93,
    patience: 21,
    replySpeed: "ERROR 404 (Typing...)",
    foodStealing: 100,
    stealingHeart: 1000,
  },

  MISSION: {
    codeName: "OPERATION: GOLDEN FOREVER",
    department: "INTERSTELLAR ROMANCE AGENCY",
    clearanceLevel: "LEVEL 99 — CLASSIFIED TOP SECRET",
    objectives: [
      "Find the hidden memories",
      "Survive the relationship quiz",
      "Recover the stolen heart",
      "Locate the mystery gift",
      "Unlock the final question",
    ],
  },

  QUIZ_QUESTIONS: [
    {
      id: 1,
      question: "Who is officially more dramatic?",
      options: [
        { label: "A", text: "Me (obviously calm & collected)" },
        { label: "B", text: "You (Oscars are taking notes 🎭)", isCorrect: true },
        { label: "C", text: "Both of us (certified disaster duo 💀)", isCorrect: true, funnyReaction: "Accurate! A walking soap opera!" },
      ],
      explanation: "Science has proven that minor inconveniences are theatrical masterpieces.",
    },
    {
      id: 2,
      question: "Who steals food from the other person's plate?",
      options: [
        { label: "A", text: "I ordered my own and respect boundaries" },
        { label: "B", text: "\"I just want one bite\" (Takes half the burger) 🍔", isCorrect: true, funnyReaction: "Caught red-handed! Every single time!" },
        { label: "C", text: "Nobody 😂", funnyReaction: "Stop lying, the French fries were taken without a warrant!" },
      ],
      explanation: "Food tastes 300% better when it belongs to someone else.",
    },
    {
      id: 3,
      question: "Who wins every single argument?",
      options: [
        { label: "A", text: "Me (In my imagination during the shower)" },
        { label: "B", text: "You (Even when the laws of physics disagree) 😭", isCorrect: true, funnyReaction: "Facts! I yield to the supreme authority!" },
        { label: "C", text: "Logic and reason 🤓", funnyReaction: "Logic left the group chat 2 years ago." },
      ],
      explanation: "You don't win against that puppy face. It is scientifically impossible.",
    },
    {
      id: 4,
      question: "What does 'I am ready in 5 minutes' actually mean?",
      options: [
        { label: "A", text: "Exactly 300 seconds" },
        { label: "B", text: "I have just started looking for my shoes 👠", isCorrect: true, funnyReaction: "45 minutes later: 'Wait, which earrings go with this?'" },
        { label: "C", text: "I am already in the car" },
      ],
      explanation: "Time is merely a suggestion in our universe.",
    },
  ],

  COMPATIBILITY_SCORE: "99.9999%",
  COMPATIBILITY_NOTE: "Remaining 0.0001% caused by stealing food.",

  BOSS: {
    name: "THE ADORABLE MENACE",
    title: "Level 99 Heart Snatcher",
    stats: {
      love: 100,
      drama: 87,
      jealousy: 42,
      cuteness: 999,
      foodStealing: 100,
    },
    specialAttack: "THE POUT OF DESTRUCTION (Critical Cute Damage)",
  },

  INVESTIGATION: {
    caseNumber: "#LOVE-001",
    crime: "Grand Larceny: Unlawful Theft of My Entire Heart",
    suspectName: "Maya",
    aliases: ["The French Fry Bandit", "The Cuteness Offender", "My Favorite Human"],
    evidenceList: [
      {
        id: "ev1",
        title: "Exhibit A: The Smile",
        description: "Direct optical evidence of weaponized charm that stunned the victim on day one.",
        badge: "DANGEROUSLY CHARMING",
        icon: "Camera",
      },
      {
        id: "ev2",
        title: "Exhibit B: The Chat Logs",
        description: "2:00 AM conversations consisting entirely of chaotic memes and 'Are you asleep yet?'.",
        badge: "HIGH FREQUENCY",
        icon: "MessageSquare",
      },
      {
        id: "ev3",
        title: "Exhibit C: Unforgettable Sunset",
        description: "That evening we laughed until our stomachs hurt and time completely stopped.",
        badge: "CORE MEMORY",
        icon: "Sparkles",
      },
      {
        id: "ev4",
        title: "Exhibit D: The Stolen French Fry",
        description: "Found with fingerprints matching the suspect despite swearing 'I am not hungry'.",
        badge: "CRITICAL PROOF",
        icon: "Utensils",
      },
    ],
    verdict: "GUILTY AS CHARGED",
    sentence: "STAY WITH ME FOREVER. ❤️",
  },

  PHOTOS: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
      caption: "The Beginning",
      date: "Day One",
      note: "The moment our eyes met and my entire world quietly tilted in your direction.",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1000&q=80",
      caption: "One Moment I Will Never Forget",
      date: "That Golden Evening",
      note: "Walking hand in hand as the city lights turned into a blur of warm colors.",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      caption: "One of My Favorite Memories",
      date: "Pure Magic",
      note: "Your laugh when you think nobody is watching. That was the day I knew.",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80",
      caption: "Every Ordinary Day Became Special",
      date: "Every Day Since",
      note: "Making tea, silly jokes, sleepy mornings—everything is an adventure with you.",
    },
  ],

  BIRTHDAY_MESSAGE: {
    greeting: "Before anything else...",
    subtext: "Happy Birthday, Maya. ❤️",
    wishPrompt: "Make a wish & blow out the candles ✨",
    afterWishMessage: "You deserve more happiness than I can fit into one website.",
  },

  PROPOSAL_MESSAGE: {
    leadIn: "I don't want just another birthday with you...",
    middle: "...I want every birthday after this one.",
    questionPrefix: "I have one question...",
    mainQuestion: "WILL YOU BE MINE...",
    subQuestion: "FOREVER? ❤️",
  },

  NO_BUTTON_RESPONSES: [
    "Are you sure? 👀",
    "Think again 😂",
    "That button is starting to look suspicious 🧐",
    "Okay... I think we both know the answer 🥺",
    "Nice try, this button has retired! 🚀",
  ],

  CELEBRATION: {
    badge: "MISSION COMPLETE ❤️",
    title: "YOU JUST MADE MY FAVORITE STORY EVEN BETTER",
    subtitle: "Every star in the night sky is celebrating with us right now.",
    loveDeclaration: "I LOVE YOU WITH ALL MY HEART ❤️",
  },

  FINAL_REPORT: {
    mission: "Birthday Surprise & Proposal",
    status: "COMPLETED ✅",
    heart: "Successfully Stolen ❤️",
    relationship: "Upgraded to Eternal 💍",
    future: "FOREVER ♾️",
    punchline: "Congratulations. You are officially stuck with me! 😂❤️",
  },

  FINAL_MESSAGE: {
    quote1: "Some stories are written...",
    quote2: "...ours is meant to be lived.",
    signaturePrefix: "Forever & Always,",
    dateDisplay: "September 28, 2026",
  },

  MUSIC: {
    defaultVolume: 0.75,
    enableSfx: true,
    ambientSynthEnabled: true,
  },
};
