// ============================================================
// ReviewIQ – Mock Data
// ============================================================

export interface Review {
  id: string;
  appId: string;
  platform: 'android' | 'ios';
  rating: number;
  text: string;
  date: string;
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  themes: string[];
  version: string;
  country: string;
  churnRisk: 'low' | 'medium' | 'high';
  userName: string;
}

export interface AppData {
  id: string;
  name: string;
  platform: 'android' | 'ios';
  category: string;
  rating: number;
  totalReviews: number;
  positivePercent: number;
  negativePercent: number;
  neutralPercent: number;
  churnRisk: number;
  icon: string;
  trend: number;
  satisfaction: number;
}

export interface Theme {
  id: string;
  name: string;
  mentionCount: number;
  percentOfReviews: number;
  sentiment: number;
  trend: number;
  businessImpact: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  aiSummary: string;
}

export interface SentimentTrend {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

export interface ChurnFactor {
  factor: string;
  impact: number;
  mentions: number;
  trend: number;
}

// ============================================================
// Applications
// ============================================================

export const applications: AppData[] = [
  {
    id: 'app-a-android',
    name: 'FinanceFlow',
    platform: 'android',
    category: 'Finance / Productivity',
    rating: 4.4,
    totalReviews: 12430,
    positivePercent: 72,
    negativePercent: 16,
    neutralPercent: 12,
    churnRisk: 6.8,
    icon: '💳',
    trend: 3.2,
    satisfaction: 86,
  },
  {
    id: 'app-b-android',
    name: 'ShopSmart',
    platform: 'android',
    category: 'Shopping',
    rating: 3.9,
    totalReviews: 8921,
    positivePercent: 61,
    negativePercent: 24,
    neutralPercent: 15,
    churnRisk: 11.2,
    icon: '🛒',
    trend: -2.1,
    satisfaction: 74,
  },
  {
    id: 'app-c-android',
    name: 'TaskMaster Pro',
    platform: 'android',
    category: 'Productivity',
    rating: 4.1,
    totalReviews: 3541,
    positivePercent: 66,
    negativePercent: 20,
    neutralPercent: 14,
    churnRisk: 8.4,
    icon: '✅',
    trend: 1.8,
    satisfaction: 79,
  },
  {
    id: 'app-a-ios',
    name: 'FinanceFlow',
    platform: 'ios',
    category: 'Finance / Productivity',
    rating: 4.5,
    totalReviews: 7832,
    positivePercent: 75,
    negativePercent: 13,
    neutralPercent: 12,
    churnRisk: 5.1,
    icon: '💳',
    trend: 4.1,
    satisfaction: 89,
  },
  {
    id: 'app-c-ios',
    name: 'TaskMaster Pro',
    platform: 'ios',
    category: 'Productivity',
    rating: 4.1,
    totalReviews: 5203,
    positivePercent: 68,
    negativePercent: 18,
    neutralPercent: 14,
    churnRisk: 7.2,
    icon: '✅',
    trend: 0.9,
    satisfaction: 81,
  },
];

// ============================================================
// Themes
// ============================================================

export const themes: Theme[] = [
  {
    id: 'theme-payment',
    name: 'Payment Failure',
    mentionCount: 2341,
    percentOfReviews: 18.8,
    sentiment: 22,
    trend: 24,
    businessImpact: 'critical',
    category: 'Transaction',
    aiSummary:
      'Customers frequently report failed UPI transactions and delayed payment confirmations. This issue spiked after version 4.2 and is the leading driver of negative sentiment.',
  },
  {
    id: 'theme-crash',
    name: 'App Crashes',
    mentionCount: 1876,
    percentOfReviews: 15.1,
    sentiment: 18,
    trend: 12,
    businessImpact: 'critical',
    category: 'Stability',
    aiSummary:
      'Users report crashes on app startup and when accessing the document upload feature. Android 14 devices are disproportionately affected.',
  },
  {
    id: 'theme-performance',
    name: 'Slow Performance',
    mentionCount: 1543,
    percentOfReviews: 12.4,
    sentiment: 31,
    trend: 8,
    businessImpact: 'high',
    category: 'Performance',
    aiSummary:
      'Screens take 3-5 seconds to load. Users note performance degradation after recent updates, especially on older devices.',
  },
  {
    id: 'theme-login',
    name: 'Login Problems',
    mentionCount: 1245,
    percentOfReviews: 10.0,
    sentiment: 25,
    trend: -3,
    businessImpact: 'high',
    category: 'Authentication',
    aiSummary:
      'OTP delivery delays and biometric login failures. Some users locked out of accounts after password reset.',
  },
  {
    id: 'theme-support',
    name: 'Customer Support',
    mentionCount: 987,
    percentOfReviews: 7.9,
    sentiment: 28,
    trend: 5,
    businessImpact: 'medium',
    category: 'Service',
    aiSummary:
      'Long response times from support team. Users report tickets unresolved for weeks. Chatbot responses perceived as unhelpful.',
  },
  {
    id: 'theme-pricing',
    name: 'Subscription Pricing',
    mentionCount: 742,
    percentOfReviews: 6.0,
    sentiment: 35,
    trend: 15,
    businessImpact: 'medium',
    category: 'Pricing',
    aiSummary:
      'Users feel premium features are overpriced. Many request a mid-tier plan between free and pro. Price increase backlash detected.',
  },
  {
    id: 'theme-ui',
    name: 'UI/UX Complaints',
    mentionCount: 542,
    percentOfReviews: 4.4,
    sentiment: 42,
    trend: -2,
    businessImpact: 'low',
    category: 'Design',
    aiSummary:
      'Users want dark mode, better navigation layout, and more intuitive onboarding. Some find the settings menu confusing.',
  },
];

// ============================================================
// Sentiment Trends (30 days)
// ============================================================

export const sentimentTrends: SentimentTrend[] = Array.from(
  { length: 30 },
  (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const base = 68 + Math.sin(i / 3) * 4;
    return {
      date: d.toISOString().slice(0, 10),
      positive: Math.round(base + (Math.random() - 0.5) * 6),
      negative: Math.round(18 + Math.sin(i / 2) * 3 + (Math.random() - 0.5) * 4),
      neutral: Math.round(14 + (Math.random() - 0.5) * 3),
    };
  }
);

// ============================================================
// Rating Distribution
// ============================================================

export const ratingDistribution = [
  { stars: 5, count: 5842, percent: 47 },
  { stars: 4, count: 3108, percent: 25 },
  { stars: 3, count: 1492, percent: 12 },
  { stars: 2, count: 1119, percent: 9 },
  { stars: 1, count: 869, percent: 7 },
];

// ============================================================
// Churn Factors
// ============================================================

export const churnFactors: ChurnFactor[] = [
  { factor: 'App Crashes', impact: 89, mentions: 1876, trend: 12 },
  { factor: 'Payment Failures', impact: 85, mentions: 2341, trend: 24 },
  { factor: 'Poor Customer Support', impact: 72, mentions: 987, trend: 5 },
  { factor: 'Subscription Pricing', impact: 64, mentions: 742, trend: 15 },
  { factor: 'Slow Performance', impact: 58, mentions: 1543, trend: 8 },
  { factor: 'Login Issues', impact: 51, mentions: 1245, trend: -3 },
];

// ============================================================
// Churn Trend (12 weeks)
// ============================================================

export const churnTrend = Array.from({ length: 12 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (11 - i) * 7);
  return {
    week: `W${i + 1}`,
    date: d.toISOString().slice(0, 10),
    churnRisk: +(7.2 + Math.sin(i / 2) * 2 + Math.random()).toFixed(1),
    satisfaction: +(80 - Math.sin(i / 2) * 3 + Math.random() * 2).toFixed(1),
  };
});

// ============================================================
// Reviews (60+)
// ============================================================

const reviewTexts: Omit<Review, 'id'>[] = [
  { appId: 'app-a-android', platform: 'android', rating: 1, text: 'Payment failed twice even though money was deducted. Still waiting for refund after 3 days. Worst experience ever.', date: '2024-03-22', sentiment: 'negative', themes: ['Payment Failure'], version: '4.2.1', country: 'India', churnRisk: 'high', userName: 'Rajesh K.' },
  { appId: 'app-a-android', platform: 'android', rating: 2, text: 'UPI payment keeps failing after the latest update. Had to use a different app to make my payment.', date: '2024-03-20', sentiment: 'negative', themes: ['Payment Failure'], version: '4.2.1', country: 'India', churnRisk: 'high', userName: 'Priya M.' },
  { appId: 'app-a-android', platform: 'android', rating: 3, text: 'Payment confirmation takes too long. Sometimes I have to wait 10 minutes to know if it went through.', date: '2024-03-18', sentiment: 'negative', themes: ['Payment Failure', 'Slow Performance'], version: '4.2.0', country: 'India', churnRisk: 'medium', userName: 'Amit S.' },
  { appId: 'app-a-android', platform: 'android', rating: 1, text: 'App crashes every time I try to upload a document. Completely unusable on my Samsung Galaxy S24.', date: '2024-03-21', sentiment: 'negative', themes: ['App Crashes'], version: '4.2.1', country: 'USA', churnRisk: 'high', userName: 'Michael R.' },
  { appId: 'app-a-android', platform: 'android', rating: 2, text: 'Keeps crashing on startup since the last update. I\'ve tried clearing cache and reinstalling. Nothing works.', date: '2024-03-19', sentiment: 'negative', themes: ['App Crashes'], version: '4.2.1', country: 'UK', churnRisk: 'high', userName: 'Sarah L.' },
  { appId: 'app-a-android', platform: 'android', rating: 5, text: 'Love the new interface! Clean, modern, and everything is where you\'d expect it to be. Great job!', date: '2024-03-22', sentiment: 'positive', themes: ['UI/UX Complaints'], version: '4.2.1', country: 'USA', churnRisk: 'low', userName: 'James W.' },
  { appId: 'app-a-android', platform: 'android', rating: 5, text: 'Fastest finance app I\'ve ever used. Transactions process in seconds. Highly recommend!', date: '2024-03-21', sentiment: 'positive', themes: ['Slow Performance'], version: '4.2.0', country: 'Germany', churnRisk: 'low', userName: 'Hans M.' },
  { appId: 'app-a-android', platform: 'android', rating: 4, text: 'Mostly good app but login takes forever sometimes. OTP arrives after 2-3 minutes.', date: '2024-03-20', sentiment: 'mixed', themes: ['Login Problems'], version: '4.2.1', country: 'India', churnRisk: 'medium', userName: 'Neha P.' },
  { appId: 'app-a-android', platform: 'android', rating: 1, text: 'Cannot login at all. Biometric login fails and OTP never arrives. I\'m locked out of my account!', date: '2024-03-18', sentiment: 'negative', themes: ['Login Problems'], version: '4.2.0', country: 'USA', churnRisk: 'high', userName: 'David C.' },
  { appId: 'app-a-android', platform: 'android', rating: 2, text: 'Customer support is terrible. I raised a ticket 2 weeks ago and still no response. Very frustrating.', date: '2024-03-17', sentiment: 'negative', themes: ['Customer Support'], version: '4.1.9', country: 'UK', churnRisk: 'high', userName: 'Emma T.' },
  { appId: 'app-a-android', platform: 'android', rating: 3, text: 'The chatbot support is useless. It keeps giving generic responses. Need to talk to a real person.', date: '2024-03-16', sentiment: 'negative', themes: ['Customer Support'], version: '4.1.9', country: 'Canada', churnRisk: 'medium', userName: 'Alex B.' },
  { appId: 'app-a-android', platform: 'android', rating: 2, text: 'The premium subscription is way too expensive. $15/month for features that other apps give for free.', date: '2024-03-15', sentiment: 'negative', themes: ['Subscription Pricing'], version: '4.1.9', country: 'USA', churnRisk: 'high', userName: 'Chris J.' },
  { appId: 'app-a-android', platform: 'android', rating: 3, text: 'Please add a mid-tier plan. The free version is too limited and pro is too expensive for individual use.', date: '2024-03-14', sentiment: 'neutral', themes: ['Subscription Pricing'], version: '4.1.8', country: 'India', churnRisk: 'medium', userName: 'Sneha G.' },
  { appId: 'app-a-android', platform: 'android', rating: 4, text: 'Good app overall. Would love dark mode support. Using it at night strains my eyes.', date: '2024-03-13', sentiment: 'positive', themes: ['UI/UX Complaints'], version: '4.1.8', country: 'Australia', churnRisk: 'low', userName: 'Tom H.' },
  { appId: 'app-a-android', platform: 'android', rating: 5, text: 'Amazing onboarding experience! Was up and running in under 2 minutes. Very intuitive.', date: '2024-03-12', sentiment: 'positive', themes: [], version: '4.1.8', country: 'USA', churnRisk: 'low', userName: 'Lisa K.' },
  { appId: 'app-a-android', platform: 'android', rating: 5, text: 'The AI assistant feature is incredible. It predicted my expenses for next month accurately!', date: '2024-03-11', sentiment: 'positive', themes: [], version: '4.1.7', country: 'Germany', churnRisk: 'low', userName: 'Klaus F.' },
  { appId: 'app-a-android', platform: 'android', rating: 4, text: 'Solid app with great features. The budget tracking is particularly useful. Minor bugs here and there.', date: '2024-03-10', sentiment: 'positive', themes: [], version: '4.1.7', country: 'Canada', churnRisk: 'low', userName: 'Marie D.' },
  { appId: 'app-a-android', platform: 'android', rating: 1, text: 'App is extremely slow. Takes 5 seconds to load each screen. On a flagship phone. Unacceptable.', date: '2024-03-09', sentiment: 'negative', themes: ['Slow Performance'], version: '4.1.7', country: 'India', churnRisk: 'high', userName: 'Vikram R.' },
  { appId: 'app-a-android', platform: 'android', rating: 3, text: 'Performance got worse after the last 2 updates. Previously it was smooth, now everything lags.', date: '2024-03-08', sentiment: 'negative', themes: ['Slow Performance'], version: '4.1.6', country: 'USA', churnRisk: 'medium', userName: 'Jordan P.' },
  { appId: 'app-a-android', platform: 'android', rating: 5, text: 'Security features are top notch. Love the real-time fraud alerts. Saved me from a scam last week!', date: '2024-03-07', sentiment: 'positive', themes: [], version: '4.1.6', country: 'UK', churnRisk: 'low', userName: 'Oliver N.' },

  // iOS reviews for FinanceFlow
  { appId: 'app-a-ios', platform: 'ios', rating: 5, text: 'Beautifully designed app. The widgets on iOS are perfect. Love checking my balance at a glance.', date: '2024-03-22', sentiment: 'positive', themes: ['UI/UX Complaints'], version: '4.2.0', country: 'USA', churnRisk: 'low', userName: 'Jennifer A.' },
  { appId: 'app-a-ios', platform: 'ios', rating: 3, text: 'Payment confirmation takes too long on iOS. My Android-using friends don\'t have this issue.', date: '2024-03-21', sentiment: 'negative', themes: ['Payment Failure'], version: '4.2.0', country: 'India', churnRisk: 'medium', userName: 'Arun V.' },
  { appId: 'app-a-ios', platform: 'ios', rating: 4, text: 'Works well on iPhone 15 Pro. Smooth performance. Just wish there were more customization options.', date: '2024-03-20', sentiment: 'positive', themes: [], version: '4.2.0', country: 'USA', churnRisk: 'low', userName: 'Rachel G.' },
  { appId: 'app-a-ios', platform: 'ios', rating: 5, text: 'The Face ID login is seamless. Best finance app I\'ve used. The AI insights are genuinely useful.', date: '2024-03-19', sentiment: 'positive', themes: [], version: '4.1.9', country: 'UK', churnRisk: 'low', userName: 'William S.' },
  { appId: 'app-a-ios', platform: 'ios', rating: 2, text: 'App crashes when trying to export PDF statements. This is a basic feature that should work.', date: '2024-03-18', sentiment: 'negative', themes: ['App Crashes'], version: '4.1.9', country: 'Canada', churnRisk: 'high', userName: 'Sophie L.' },
  { appId: 'app-a-ios', platform: 'ios', rating: 4, text: 'Reliable and fast. Notifications are timely. Would give 5 stars if dark mode was available.', date: '2024-03-17', sentiment: 'positive', themes: ['UI/UX Complaints'], version: '4.1.8', country: 'Australia', churnRisk: 'low', userName: 'Liam C.' },
  { appId: 'app-a-ios', platform: 'ios', rating: 1, text: 'Subscription jumped from $9 to $15 without any notice. Lost my trust. Looking for alternatives.', date: '2024-03-16', sentiment: 'negative', themes: ['Subscription Pricing'], version: '4.1.8', country: 'USA', churnRisk: 'high', userName: 'Karen M.' },
  { appId: 'app-a-ios', platform: 'ios', rating: 5, text: 'The spend analytics feature is a game changer. Finally understand where my money goes each month.', date: '2024-03-15', sentiment: 'positive', themes: [], version: '4.1.7', country: 'Germany', churnRisk: 'low', userName: 'Anna B.' },
  { appId: 'app-a-ios', platform: 'ios', rating: 3, text: 'Support team took 5 days to respond to my query about a failed transaction. Not acceptable for a paid app.', date: '2024-03-14', sentiment: 'negative', themes: ['Customer Support', 'Payment Failure'], version: '4.1.7', country: 'India', churnRisk: 'medium', userName: 'Pooja S.' },
  { appId: 'app-a-ios', platform: 'ios', rating: 4, text: 'Great app for managing finances. The investment tracking could be improved but overall excellent.', date: '2024-03-13', sentiment: 'positive', themes: [], version: '4.1.6', country: 'USA', churnRisk: 'low', userName: 'Robert T.' },

  // ShopSmart Android reviews
  { appId: 'app-b-android', platform: 'android', rating: 1, text: 'Cart items keep disappearing. Lost my carefully curated wishlist three times now. Very frustrating.', date: '2024-03-22', sentiment: 'negative', themes: ['App Crashes'], version: '3.8.0', country: 'India', churnRisk: 'high', userName: 'Meera K.' },
  { appId: 'app-b-android', platform: 'android', rating: 2, text: 'Prices shown in app don\'t match checkout price. Feels like a bait and switch tactic.', date: '2024-03-21', sentiment: 'negative', themes: ['Payment Failure'], version: '3.8.0', country: 'USA', churnRisk: 'high', userName: 'Steve B.' },
  { appId: 'app-b-android', platform: 'android', rating: 4, text: 'Great deals and fast delivery. The price comparison feature saves me money every week.', date: '2024-03-20', sentiment: 'positive', themes: [], version: '3.7.9', country: 'UK', churnRisk: 'low', userName: 'Emily R.' },
  { appId: 'app-b-android', platform: 'android', rating: 5, text: 'Best shopping app out there. AR try-on feature for sunglasses is surprisingly accurate!', date: '2024-03-19', sentiment: 'positive', themes: [], version: '3.7.9', country: 'Germany', churnRisk: 'low', userName: 'Fritz W.' },
  { appId: 'app-b-android', platform: 'android', rating: 1, text: 'App crashes during checkout. Lost a flash sale deal because of this. Switching to competitor.', date: '2024-03-18', sentiment: 'negative', themes: ['App Crashes', 'Payment Failure'], version: '3.7.8', country: 'India', churnRisk: 'high', userName: 'Arjun N.' },
  { appId: 'app-b-android', platform: 'android', rating: 3, text: 'Search results are irrelevant. I search for "laptop stand" and get phone cases. Fix the search algorithm.', date: '2024-03-17', sentiment: 'negative', themes: ['Slow Performance'], version: '3.7.8', country: 'Canada', churnRisk: 'medium', userName: 'Mark D.' },
  { appId: 'app-b-android', platform: 'android', rating: 4, text: 'Love the daily deals section. Found amazing discounts on electronics. Delivery was on time.', date: '2024-03-16', sentiment: 'positive', themes: [], version: '3.7.7', country: 'USA', churnRisk: 'low', userName: 'Diana F.' },
  { appId: 'app-b-android', platform: 'android', rating: 2, text: 'Return process is a nightmare. 3 weeks and still waiting for my refund. Support keeps giving excuses.', date: '2024-03-15', sentiment: 'negative', themes: ['Customer Support', 'Payment Failure'], version: '3.7.7', country: 'India', churnRisk: 'high', userName: 'Ravi T.' },
  { appId: 'app-b-android', platform: 'android', rating: 5, text: 'Notification about price drops is genius. Saved $200 on a TV by waiting for the right moment.', date: '2024-03-14', sentiment: 'positive', themes: [], version: '3.7.6', country: 'USA', churnRisk: 'low', userName: 'Nancy H.' },
  { appId: 'app-b-android', platform: 'android', rating: 3, text: 'App is getting bloated. Too many ads and pop-ups. Used to be clean and simple.', date: '2024-03-13', sentiment: 'negative', themes: ['UI/UX Complaints'], version: '3.7.6', country: 'UK', churnRisk: 'medium', userName: 'George P.' },

  // TaskMaster Pro Android reviews
  { appId: 'app-c-android', platform: 'android', rating: 5, text: 'Perfect task management app. Kanban boards, calendar integration, and team collaboration all in one.', date: '2024-03-22', sentiment: 'positive', themes: [], version: '2.5.0', country: 'USA', churnRisk: 'low', userName: 'Amanda C.' },
  { appId: 'app-c-android', platform: 'android', rating: 2, text: 'Sync issues between devices. Tasks I complete on phone still show as pending on tablet.', date: '2024-03-21', sentiment: 'negative', themes: ['App Crashes'], version: '2.5.0', country: 'Germany', churnRisk: 'high', userName: 'Stefan K.' },
  { appId: 'app-c-android', platform: 'android', rating: 4, text: 'Great productivity tool. The AI task prioritization is surprisingly helpful. Minor UI glitches.', date: '2024-03-20', sentiment: 'positive', themes: ['UI/UX Complaints'], version: '2.4.9', country: 'India', churnRisk: 'low', userName: 'Kavitha R.' },
  { appId: 'app-c-android', platform: 'android', rating: 1, text: 'Lost all my tasks after the latest update. No backup, no recovery option. Months of planning gone.', date: '2024-03-19', sentiment: 'negative', themes: ['App Crashes'], version: '2.4.9', country: 'UK', churnRisk: 'high', userName: 'Paul E.' },
  { appId: 'app-c-android', platform: 'android', rating: 4, text: 'Good for team management. Would love Slack integration and better notification controls.', date: '2024-03-18', sentiment: 'positive', themes: [], version: '2.4.8', country: 'Canada', churnRisk: 'low', userName: 'Jessica M.' },

  // TaskMaster Pro iOS reviews
  { appId: 'app-c-ios', platform: 'ios', rating: 5, text: 'Seamless Apple Watch integration. Getting task reminders on my wrist is a productivity game changer.', date: '2024-03-22', sentiment: 'positive', themes: [], version: '2.5.0', country: 'USA', churnRisk: 'low', userName: 'Daniel W.' },
  { appId: 'app-c-ios', platform: 'ios', rating: 3, text: 'Good app but too expensive for what it offers. Todoist and Notion have better free tiers.', date: '2024-03-21', sentiment: 'neutral', themes: ['Subscription Pricing'], version: '2.5.0', country: 'UK', churnRisk: 'medium', userName: 'Claire B.' },
  { appId: 'app-c-ios', platform: 'ios', rating: 4, text: 'The calendar view is beautiful. Love the color coding. Please add natural language input for tasks.', date: '2024-03-20', sentiment: 'positive', themes: ['UI/UX Complaints'], version: '2.4.9', country: 'Australia', churnRisk: 'low', userName: 'Noah J.' },
  { appId: 'app-c-ios', platform: 'ios', rating: 2, text: 'Notifications don\'t work reliably on iOS 17. Missed important deadlines because of this.', date: '2024-03-19', sentiment: 'negative', themes: ['App Crashes'], version: '2.4.9', country: 'India', churnRisk: 'high', userName: 'Divya S.' },
  { appId: 'app-c-ios', platform: 'ios', rating: 5, text: 'Best project management app for small teams. The shared workspace feature is incredibly well designed.', date: '2024-03-18', sentiment: 'positive', themes: [], version: '2.4.8', country: 'Germany', churnRisk: 'low', userName: 'Max H.' },
  { appId: 'app-c-ios', platform: 'ios', rating: 4, text: 'Solid app. The Gantt chart view needs improvement but the rest is excellent.', date: '2024-03-17', sentiment: 'positive', themes: [], version: '2.4.8', country: 'USA', churnRisk: 'low', userName: 'Ashley F.' },
  { appId: 'app-c-ios', platform: 'ios', rating: 1, text: 'Support never responds. I reported a data sync bug a month ago. Radio silence.', date: '2024-03-16', sentiment: 'negative', themes: ['Customer Support'], version: '2.4.7', country: 'Canada', churnRisk: 'high', userName: 'Tyler G.' },
  { appId: 'app-c-ios', platform: 'ios', rating: 3, text: 'The free version is too limited. Can only create 5 projects. At least make it 10.', date: '2024-03-15', sentiment: 'neutral', themes: ['Subscription Pricing'], version: '2.4.7', country: 'India', churnRisk: 'medium', userName: 'Shreya N.' },

  // Additional reviews for density
  { appId: 'app-a-android', platform: 'android', rating: 4, text: 'The bill splitting feature is fantastic for group dinners. Makes shared expenses effortless.', date: '2024-03-06', sentiment: 'positive', themes: [], version: '4.1.5', country: 'USA', churnRisk: 'low', userName: 'Kevin L.' },
  { appId: 'app-a-android', platform: 'android', rating: 2, text: 'Recurring payment setup is broken. My rent payment failed 3 months in a row. Had to pay late fees.', date: '2024-03-05', sentiment: 'negative', themes: ['Payment Failure'], version: '4.1.5', country: 'India', churnRisk: 'high', userName: 'Suresh B.' },
  { appId: 'app-a-android', platform: 'android', rating: 5, text: 'Finally an app that makes budgeting simple. The visual charts help me understand my spending patterns.', date: '2024-03-04', sentiment: 'positive', themes: [], version: '4.1.4', country: 'UK', churnRisk: 'low', userName: 'Charlotte D.' },
  { appId: 'app-a-android', platform: 'android', rating: 3, text: 'Decent app but the notification system is too aggressive. Getting 10+ notifications daily is annoying.', date: '2024-03-03', sentiment: 'neutral', themes: ['UI/UX Complaints'], version: '4.1.4', country: 'Australia', churnRisk: 'medium', userName: 'Jack R.' },
  { appId: 'app-a-android', platform: 'android', rating: 1, text: 'Money deducted but transaction shows failed. Third time this month. I want my money back NOW.', date: '2024-03-02', sentiment: 'negative', themes: ['Payment Failure'], version: '4.1.3', country: 'India', churnRisk: 'high', userName: 'Deepak G.' },
  { appId: 'app-a-ios', platform: 'ios', rating: 5, text: 'Switched from competitor and never looked back. The investment portfolio tracker is exceptional.', date: '2024-03-12', sentiment: 'positive', themes: [], version: '4.1.6', country: 'USA', churnRisk: 'low', userName: 'Michelle P.' },
  { appId: 'app-a-ios', platform: 'ios', rating: 2, text: 'iPad version is just a stretched phone app. Expected a proper tablet-optimized experience.', date: '2024-03-11', sentiment: 'negative', themes: ['UI/UX Complaints'], version: '4.1.5', country: 'UK', churnRisk: 'medium', userName: 'Andrew K.' },
  { appId: 'app-b-android', platform: 'android', rating: 4, text: 'Same day delivery in my area is reliable. Product quality has been consistently good.', date: '2024-03-12', sentiment: 'positive', themes: [], version: '3.7.5', country: 'India', churnRisk: 'low', userName: 'Sunita V.' },
  { appId: 'app-b-android', platform: 'android', rating: 1, text: 'Fake reviews everywhere. Products look nothing like the photos. Misleading descriptions.', date: '2024-03-11', sentiment: 'negative', themes: ['Customer Support'], version: '3.7.5', country: 'USA', churnRisk: 'high', userName: 'Brandon S.' },
];

export const reviews: Review[] = reviewTexts.map((r, i) => ({
  ...r,
  id: `review-${String(i + 1).padStart(3, '0')}`,
}));

// ============================================================
// AI Analyzer Responses
// ============================================================

export const aiAnalyzerResponses: Record<string, { answer: string; evidence: string[]; recommendations: string[] }> = {
  default: {
    answer:
      'Customer sentiment declined by 8.4% over the last 30 days. The primary drivers are:\n\n1. **Payment failures** — responsible for 38% of negative sentiment\n2. **App crashes** — responsible for 27% of negative sentiment\n3. **Login issues** — responsible for 19% of negative sentiment\n\nPayment-related complaints increased significantly after version 4.2. The issue is concentrated among Android users in India where UPI is the primary payment method.',
    evidence: ['2,341 payment-related complaints', '1,876 crash reports', '1,245 login issues'],
    recommendations: [
      'Prioritize UPI payment gateway stability',
      'Roll back or hotfix version 4.2 crash-causing changes',
      'Improve OTP delivery reliability with fallback SMS providers',
    ],
  },
  complaints: {
    answer:
      'The most common customer complaints over the last 30 days are:\n\n1. **Payment Failure** (2,341 mentions, 18.8% of all reviews) — UPI transactions failing and delayed confirmations\n2. **App Crashes** (1,876 mentions, 15.1%) — Crashes on startup and document upload\n3. **Slow Performance** (1,543 mentions, 12.4%) — Screens taking 3-5 seconds to load\n4. **Login Problems** (1,245 mentions, 10.0%) — OTP delays and biometric failures\n5. **Customer Support** (987 mentions, 7.9%) — Long response times\n\nPayment failure is the single largest driver of customer dissatisfaction and has the highest correlation with churn risk.',
    evidence: ['18.8% of reviews mention payment issues', '78% of payment-related reviews are negative', 'Issue spike correlates with v4.2 release'],
    recommendations: [
      'Immediate: Fix UPI payment processing pipeline',
      'Short-term: Improve crash handling with better error recovery',
      'Medium-term: Optimize app performance for older devices',
    ],
  },
  sentiment: {
    answer:
      'Sentiment dropped primarily due to a combination of technical failures following the v4.2 release:\n\n- **Payment processing errors** increased by 340% post-update\n- **App stability** degraded, particularly on Android 14 devices\n- **User trust** eroded as money was deducted without successful transactions\n\nPositive sentiment remains strong around the app\'s core features: AI insights (91% positive), onboarding experience (88% positive), and UI design (82% positive).',
    evidence: ['340% increase in payment errors', 'Android 14 crash rate: 3.2x higher', 'Trust-related negative reviews up 42%'],
    recommendations: [
      'Issue a public acknowledgment of payment issues',
      'Expedite v4.2.2 hotfix release',
      'Proactive refund processing for affected users',
    ],
  },
  features: {
    answer:
      'The most requested features from customer reviews are:\n\n1. **Dark Mode** — 31% increase in demand this quarter (542 mentions)\n2. **Better notification controls** — Users want granular notification settings\n3. **Slack/Teams integration** — Especially for TaskMaster Pro users\n4. **Natural language task input** — iOS users requesting Siri-style task creation\n5. **Mid-tier pricing plan** — Gap between free and pro plans\n6. **Tablet-optimized layouts** — iPad users want native tablet experience\n7. **Apple Watch improvements** — More complications and quick actions',
    evidence: ['542 dark mode requests', '318 notification control requests', '267 integration requests'],
    recommendations: [
      'Prioritize dark mode as a quick win with high satisfaction impact',
      'Introduce a "Plus" tier at $7.99/month',
      'Add Slack webhook support to TaskMaster Pro',
    ],
  },
  churn: {
    answer:
      'The complaints most likely to increase churn are:\n\n1. **Payment Failures** (Churn correlation: 89%) — Users whose money is deducted without successful transactions show the highest likelihood of abandonment\n2. **App Crashes** (Churn correlation: 85%) — Repeated crashes erode user confidence\n3. **Poor Support Response** (Churn correlation: 72%) — Users who don\'t receive timely support escalate to 1-star reviews\n\nUsers who experience 2+ of these issues simultaneously have a **94% churn probability** within 30 days.',
    evidence: ['94% churn rate for multi-issue users', '67% of churned users cited payment failures', 'Average support response time: 4.2 days'],
    recommendations: [
      'Create a VIP support fast-track for users experiencing payment issues',
      'Implement proactive outreach for users who experienced crashes 3+ times',
      'Offer retention credits to at-risk users',
    ],
  },
  priority: {
    answer:
      'Based on a composite analysis of volume, sentiment impact, churn risk, and business value, the product team should prioritize:\n\n**🔴 Immediate (This Sprint):**\n1. Fix UPI payment gateway — 2,341 affected users, highest churn risk\n2. Resolve Android 14 crash bug — 1,876 reports, critical stability issue\n\n**🟡 Short-term (Next 2 Sprints):**\n3. OTP delivery reliability — Partner with backup SMS provider\n4. Performance optimization — Reduce screen load time to <1 second\n\n**🟢 Medium-term (Next Quarter):**\n5. Customer support response SLA — Target <24 hour response\n6. Dark mode implementation — High demand, positive sentiment driver',
    evidence: ['Combined churn risk of top 2 issues: 87%', 'Estimated revenue impact: $2.1M annually', 'Fix would improve CSAT by ~8 points'],
    recommendations: [
      'Allocate 60% of engineering bandwidth to payment and crash fixes',
      'Form a dedicated "Customer Recovery" task force',
      'Set up real-time monitoring dashboards for payment success rates',
    ],
  },
};

// ============================================================
// Chatbot Responses
// ============================================================

export const chatbotResponses: Record<string, string> = {
  'why are negative reviews increasing':
    'Negative reviews increased **14%** over the last 30 days, primarily driven by:\n\n• **Payment failures** (+24% mentions)\n• **App crashes** (+12% mentions)\n• **Login issues** (stable but persistent)\n\nThe spike correlates with the v4.2 release on March 15th. Android users are 2.3x more affected than iOS users.',
  'which issue should our product team prioritize':
    'Based on combined analysis of **volume**, **sentiment impact**, and **churn risk**:\n\n🔴 **#1 Priority: Payment Failures**\n- Highest volume (2,341 mentions)\n- Highest negative sentiment (78%)\n- Highest churn correlation (89%)\n\n🟡 **#2 Priority: App Crashes**\n- 1,876 mentions, 82% negative\n- Churn correlation: 85%\n\nFixing these two issues could reduce churn by an estimated 6.2 percentage points.',
  'give me marketing insights':
    'Customers frequently praise these strengths:\n\n✨ **Speed & Performance** — "fastest finance app" mentioned 340+ times\n✨ **Simple Interface** — "intuitive" and "clean" appear in 28% of positive reviews\n✨ **AI Features** — "AI assistant" praised in 91% of mentions\n\n**Suggested Marketing Messages:**\n- *"Fast. Simple. Built for you."*\n- *"Your finances, intelligently managed."*\n- *"Meet your smarter everyday assistant."*\n\n📊 Top audience segments: Students (32%), Young Professionals (41%), Small Businesses (27%)',
  'what features do customers want':
    'Most requested features by volume:\n\n1. 🌙 **Dark Mode** — 542 requests (+31% this quarter)\n2. 🔔 **Notification Controls** — 318 requests\n3. 🔗 **Third-party Integrations** — 267 requests (Slack, Teams)\n4. 💬 **Natural Language Input** — 189 requests\n5. 💰 **Mid-tier Pricing** — 174 requests\n6. 📱 **Tablet Layout** — 156 requests\n\nDark mode has the highest ROI potential — relatively low effort with significant user satisfaction impact.',
  default:
    'Based on your review data analysis:\n\nI can see patterns across **24,892 reviews** from your applications. The overall sentiment is **68.4% positive**, but there are emerging concerns around payment processing and app stability that need attention.\n\nWould you like me to dive deeper into any specific area? Try asking about:\n• Customer complaints\n• Sentiment trends\n• Feature requests\n• Churn drivers\n• Marketing opportunities',
};

// ============================================================
// Business Insights
// ============================================================

export const businessInsights = {
  painPoints: [
    { title: 'Payment Processing Reliability', severity: 'critical' as const, description: 'UPI payment failures affecting 18.8% of reviews. Direct revenue impact.', trend: 24 },
    { title: 'Application Stability', severity: 'high' as const, description: 'Crash rate increased post v4.2. Android 14 devices disproportionately affected.', trend: 12 },
    { title: 'Customer Support Responsiveness', severity: 'medium' as const, description: 'Average response time 4.2 days. Users expect <24 hour resolution.', trend: 5 },
    { title: 'Pricing Perception', severity: 'medium' as const, description: 'Gap between free and premium plans. Users requesting mid-tier option.', trend: 15 },
  ],
  strengths: [
    { title: 'Intuitive User Interface', score: 88, mentions: 3240 },
    { title: 'Fast Onboarding Experience', score: 91, mentions: 2180 },
    { title: 'AI-Powered Insights', score: 93, mentions: 1560 },
    { title: 'Security & Fraud Prevention', score: 90, mentions: 1120 },
    { title: 'Bill Splitting Feature', score: 87, mentions: 890 },
  ],
  weaknesses: [
    { title: 'Payment Gateway Reliability', score: 22, mentions: 2341 },
    { title: 'App Stability', score: 18, mentions: 1876 },
    { title: 'Performance on Older Devices', score: 31, mentions: 1543 },
    { title: 'Customer Support Quality', score: 28, mentions: 987 },
  ],
  featureRequests: [
    { feature: 'Dark Mode', demand: 542, growth: 31 },
    { feature: 'Notification Controls', demand: 318, growth: 18 },
    { feature: 'Slack Integration', demand: 267, growth: 22 },
    { feature: 'Natural Language Input', demand: 189, growth: 45 },
    { feature: 'Mid-tier Plan', demand: 174, growth: 28 },
    { feature: 'Tablet Layout', demand: 156, growth: 12 },
  ],
  emergingIssues: [
    { issue: 'Android 14 Compatibility', firstDetected: '2 weeks ago', velocity: 'Rapidly growing', mentions: 342 },
    { issue: 'Battery Drain Reports', firstDetected: '1 week ago', velocity: 'Growing', mentions: 128 },
    { issue: 'Data Sync Failures', firstDetected: '3 days ago', velocity: 'Emerging', mentions: 47 },
  ],
};

// ============================================================
// Marketing Intelligence
// ============================================================

export const marketingIntelligence = {
  strengths: [
    { keyword: 'Fast performance', mentions: 1240, sentiment: 92, quote: '"Fastest finance app I\'ve ever used"' },
    { keyword: 'Easy onboarding', mentions: 980, sentiment: 91, quote: '"Was up and running in under 2 minutes"' },
    { keyword: 'Simple interface', mentions: 870, sentiment: 88, quote: '"Clean, modern, everything is where you\'d expect it"' },
    { keyword: 'AI insights', mentions: 560, sentiment: 93, quote: '"The AI assistant feature is incredible"' },
    { keyword: 'Security features', mentions: 420, sentiment: 90, quote: '"Saved me from a scam last week"' },
  ],
  campaigns: [
    {
      title: 'Speed & Simplicity',
      message: 'Fast. Simple. Built for you.',
      basis: 'Customers frequently praise the app\'s speed and simple interface.',
      audience: 'New users, competitors\' dissatisfied users',
    },
    {
      title: 'AI-Powered Finance',
      message: 'Your finances, intelligently managed.',
      basis: 'AI features have 93% positive sentiment with strong word-of-mouth.',
      audience: 'Tech-savvy professionals, early adopters',
    },
    {
      title: 'Security First',
      message: 'Bank-grade security. Zero compromises.',
      basis: 'Security and fraud prevention praised in 1,120+ reviews.',
      audience: 'Security-conscious users, enterprise segment',
    },
  ],
  audienceSegments: [
    { segment: 'Young Professionals', percentage: 41, topConcern: 'Speed & modern UI', satisfaction: 84 },
    { segment: 'Students', percentage: 32, topConcern: 'Pricing & free features', satisfaction: 71 },
    { segment: 'Small Businesses', percentage: 18, topConcern: 'Payment reliability', satisfaction: 76 },
    { segment: 'Enterprise Users', percentage: 9, topConcern: 'Security & compliance', satisfaction: 89 },
  ],
  keywords: [
    { word: 'fast', count: 1240 },
    { word: 'easy', count: 980 },
    { word: 'simple', count: 870 },
    { word: 'reliable', count: 720 },
    { word: 'intuitive', count: 560 },
    { word: 'secure', count: 420 },
    { word: 'smart', count: 380 },
    { word: 'beautiful', count: 310 },
    { word: 'powerful', count: 290 },
    { word: 'innovative', count: 240 },
    { word: 'crash', count: 1876 },
    { word: 'slow', count: 1543 },
    { word: 'fail', count: 1240 },
    { word: 'expensive', count: 742 },
    { word: 'bug', count: 680 },
  ],
};

// ============================================================
// Action Center
// ============================================================

export const actionItems = [
  {
    id: 'action-1',
    title: 'Fix UPI Payment Processing Pipeline',
    priority: 'critical' as const,
    impact: 'high' as const,
    mentions: 2341,
    churnRisk: 'high' as const,
    team: 'Payments Engineering',
    status: 'open' as const,
    description: 'UPI transactions failing at checkout. Money deducted but transaction shows failed. Concentrated post v4.2.',
  },
  {
    id: 'action-2',
    title: 'Resolve Android 14 App Crash Bug',
    priority: 'critical' as const,
    impact: 'high' as const,
    mentions: 1876,
    churnRisk: 'high' as const,
    team: 'Mobile Engineering',
    status: 'open' as const,
    description: 'App crashes on startup and document upload. Samsung Galaxy S24 and Pixel 8 most affected.',
  },
  {
    id: 'action-3',
    title: 'Optimize App Performance for Older Devices',
    priority: 'high' as const,
    impact: 'high' as const,
    mentions: 1543,
    churnRisk: 'medium' as const,
    team: 'Performance Engineering',
    status: 'open' as const,
    description: 'Screen load times averaging 3-5 seconds. Performance degradation observed after recent updates.',
  },
  {
    id: 'action-4',
    title: 'Improve OTP Delivery Reliability',
    priority: 'high' as const,
    impact: 'medium' as const,
    mentions: 1245,
    churnRisk: 'medium' as const,
    team: 'Backend Engineering',
    status: 'in-progress' as const,
    description: 'OTP delivery delays and biometric login failures. Users locked out of accounts.',
  },
  {
    id: 'action-5',
    title: 'Reduce Customer Support Response Time',
    priority: 'medium' as const,
    impact: 'medium' as const,
    mentions: 987,
    churnRisk: 'medium' as const,
    team: 'Customer Success',
    status: 'open' as const,
    description: 'Average response time 4.2 days. Target <24 hours. Improve chatbot with contextual responses.',
  },
  {
    id: 'action-6',
    title: 'Introduce Mid-tier Pricing Plan',
    priority: 'medium' as const,
    impact: 'medium' as const,
    mentions: 742,
    churnRisk: 'medium' as const,
    team: 'Product Strategy',
    status: 'open' as const,
    description: 'Gap between free and premium tiers. Users requesting $7-8/month option.',
  },
  {
    id: 'action-7',
    title: 'Implement Dark Mode',
    priority: 'low' as const,
    impact: 'low' as const,
    mentions: 542,
    churnRisk: 'low' as const,
    team: 'UI/UX Design',
    status: 'open' as const,
    description: 'High-demand cosmetic feature with 31% growth in requests. Quick win for user satisfaction.',
  },
];

// ============================================================
// Reports
// ============================================================

export const reportTemplates = [
  { id: 'exec-summary', name: 'Executive Summary', description: 'High-level overview of review intelligence across all applications', icon: '📊', lastGenerated: '2024-03-20' },
  { id: 'weekly-review', name: 'Weekly Review Report', description: 'Detailed analysis of reviews received in the past week', icon: '📅', lastGenerated: '2024-03-18' },
  { id: 'monthly-insights', name: 'Monthly Customer Insights', description: 'Comprehensive monthly sentiment and theme analysis', icon: '📈', lastGenerated: '2024-03-01' },
  { id: 'product-issues', name: 'Product Issue Report', description: 'Detailed breakdown of product issues and their business impact', icon: '🔧', lastGenerated: '2024-03-15' },
  { id: 'marketing-report', name: 'Marketing Insights Report', description: 'Customer language analysis and marketing opportunity identification', icon: '📢', lastGenerated: '2024-03-10' },
  { id: 'churn-analysis', name: 'Churn Risk Analysis', description: 'Deep dive into churn factors and retention opportunities', icon: '⚠️', lastGenerated: '2024-03-12' },
];
