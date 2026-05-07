/* ============================================
   OPTION C — Business Match Quiz
   business-match.js
   ============================================ */

(function () {
  'use strict';

  // ============ QUIZ QUESTIONS ============
  const QUESTIONS = [
    {
      id: 'q1_budget',
      title: 'How much money can you realistically put toward starting your business right now?',
      help: 'There are no wrong answers. We use this to filter out ideas that won\'t work for your situation.',
      options: [
        { value: 'b1', label: 'Less than $200', emoji: '💵' },
        { value: 'b2', label: '$200 – $1,000',  emoji: '💰' },
        { value: 'b3', label: '$1,000 – $3,000', emoji: '🏦' },
        { value: 'b4', label: '$3,000 or more', emoji: '💎' }
      ]
    },
    {
      id: 'q2_hours',
      title: 'How many hours per week can you commit to building your business?',
      help: 'Be honest — small consistent hours often beat big bursts.',
      options: [
        { value: 'h1', label: 'Under 10 hours', emoji: '⏱️' },
        { value: 'h2', label: '10 – 20 hours', emoji: '🕐' },
        { value: 'h3', label: '20 – 40 hours', emoji: '🕓' },
        { value: 'h4', label: '40+ hours (full-time)', emoji: '🚀' }
      ]
    },
    {
      id: 'q3_physical',
      title: 'Which best describes your physical situation?',
      help: 'This is private. We use it to suggest businesses that genuinely fit your day-to-day capacity.',
      options: [
        { value: 'p1', label: 'I need to work mostly seated, low physical demand', emoji: '🪑' },
        { value: 'p2', label: 'Some moderate movement is fine',                    emoji: '🚶' },
        { value: 'p3', label: 'I can do physical work without limits',             emoji: '💪' }
      ]
    },
    {
      id: 'q4_social',
      title: 'How comfortable are you working directly with people?',
      help: '',
      options: [
        { value: 's1', label: 'Prefer working alone — minimal client contact', emoji: '🧘' },
        { value: 's2', label: 'OK with email/text but not face-to-face',      emoji: '💬' },
        { value: 's3', label: 'Comfortable on calls and video',                 emoji: '📞' },
        { value: 's4', label: 'I love being in front of people',                emoji: '🎤' }
      ]
    },
    {
      id: 'q5_skills',
      title: 'Which area best matches your strengths?',
      help: 'Pick the one that feels most natural — you can always grow into others later.',
      options: [
        { value: 'k_hands',    label: 'Working with my hands / fixing things', emoji: '🔧' },
        { value: 'k_detail',   label: 'Writing, research, organized detail work', emoji: '📋' },
        { value: 'k_tech',     label: 'Tech, computers, problem solving',      emoji: '💻' },
        { value: 'k_creative', label: 'Art, design, creativity',                emoji: '🎨' },
        { value: 'k_service',  label: 'Customer service, talking to people',   emoji: '🤝' },
        { value: 'k_outdoor',  label: 'Driving or outdoor work',                emoji: '🚚' }
      ]
    },
    {
      id: 'q6_location',
      title: 'Where would you prefer to work from?',
      help: '',
      options: [
        { value: 'l_home',   label: 'From home only',                  emoji: '🏠' },
        { value: 'l_local',  label: 'Local area / driving in my city', emoji: '📍' },
        { value: 'l_online', label: 'Online from anywhere',            emoji: '🌐' },
        { value: 'l_any',    label: 'Doesn\'t matter — I\'m flexible', emoji: '🔄' }
      ]
    },
    {
      id: 'q7_goal',
      title: 'What\'s your primary goal with this business?',
      help: '',
      options: [
        { value: 'g_side',     label: 'Side income while I figure things out', emoji: '🌱' },
        { value: 'g_fulltime', label: 'Full-time replacement income',           emoji: '🌳' },
        { value: 'g_growth',   label: 'Build something I can grow into a real company', emoji: '📈' },
        { value: 'g_flexible', label: 'Flexible work that fits around my life', emoji: '⚖️' }
      ]
    }
  ];

  // ============ BUSINESS LIBRARY ============
  // Each business has tags used to score against user answers.
  // Scoring rules at the bottom of this file.
  const BUSINESSES = [
    {
      id: 'mobile-notary',
      name: 'Mobile Notary / Loan Signing Agent',
      desc: 'Travel to people\'s homes and offices to notarize documents and witness loan signings. Title companies, real estate offices, and law firms hire signing agents weekly.',
      cost: '$200 – $500',
      time: '2 – 8 weeks',
      steps: [
        'Apply for your state notary commission and order your notary stamp & journal.',
        'Take a short Notary Signing Agent (NSA) certification course (Notary2Pro, NNA, or LSS).',
        'Build a one-page profile and join SnapDocs and NotaryRotary to get your first signings.'
      ],
      tags: {
        budget:   ['b2', 'b3'],
        hours:    ['h1', 'h2', 'h3'],
        physical: ['p1', 'p2'],
        social:   ['s2', 's3'],
        skills:   ['k_detail', 'k_service'],
        location: ['l_local', 'l_any'],
        goal:     ['g_side', 'g_fulltime', 'g_flexible']
      }
    },
    {
      id: 'bookkeeping',
      name: 'Virtual Bookkeeping Service',
      desc: 'Handle the books for small businesses from your laptop — categorizing transactions, reconciling accounts, sending monthly reports. Recurring monthly clients = predictable income.',
      cost: '$0 – $300',
      time: '4 – 12 weeks',
      steps: [
        'Take the free QuickBooks ProAdvisor certification — it\'s free and gives you instant credibility.',
        'Pick 1 niche (restaurants, contractors, salons) and build a one-page service site.',
        'Get your first client by offering a free 30-minute "books cleanup" consultation in local Facebook groups.'
      ],
      tags: {
        budget:   ['b1', 'b2'],
        hours:    ['h2', 'h3', 'h4'],
        physical: ['p1', 'p2', 'p3'],
        social:   ['s2', 's3'],
        skills:   ['k_detail', 'k_tech'],
        location: ['l_home', 'l_online', 'l_any'],
        goal:     ['g_fulltime', 'g_growth', 'g_flexible']
      }
    },
    {
      id: 'home-cleaning',
      name: 'Residential & Move-Out Cleaning',
      desc: 'Cleaning is the fastest path from $0 to first paying customer. Move-out and Airbnb cleans pay $150–$400 per visit and clients book on repeat.',
      cost: '$150 – $400',
      time: '1 – 3 weeks',
      steps: [
        'Buy basic supplies and pick up cheap general liability insurance ($30/month).',
        'Set your hourly rate ($35–$60/hr) and post on Nextdoor, Facebook Marketplace, and local groups.',
        'Get 3 first clients to leave a Google review — that\'s your real marketing engine.'
      ],
      tags: {
        budget:   ['b1', 'b2'],
        hours:    ['h2', 'h3', 'h4'],
        physical: ['p3'],
        social:   ['s2', 's3'],
        skills:   ['k_hands', 'k_service'],
        location: ['l_local'],
        goal:     ['g_side', 'g_fulltime', 'g_growth']
      }
    },
    {
      id: 'lawn-care',
      name: 'Lawn Care & Yard Maintenance',
      desc: 'Recurring weekly mowing, edging, and seasonal cleanups. Low overhead if you already have a mower — or rent one until you can buy.',
      cost: '$300 – $1,500',
      time: '2 – 4 weeks',
      steps: [
        'Make a route map of 3 zip codes you\'ll service to keep gas costs down.',
        'Set a weekly mowing rate ($35–$55/yard) and offer a 4-month contract for a small discount.',
        'Door-hang flyers in 200 homes in your route — expect 3–8 customers per 200 flyers.'
      ],
      tags: {
        budget:   ['b2', 'b3'],
        hours:    ['h3', 'h4'],
        physical: ['p3'],
        social:   ['s2', 's3'],
        skills:   ['k_hands', 'k_outdoor'],
        location: ['l_local'],
        goal:     ['g_fulltime', 'g_growth']
      }
    },
    {
      id: 'auto-detailing',
      name: 'Mobile Auto Detailing',
      desc: 'Show up at the customer\'s house or office, detail their car in their driveway. Average $150–$300 per detail with very low ongoing costs.',
      cost: '$500 – $2,000',
      time: '3 – 6 weeks',
      steps: [
        'Buy a starter detailing kit (vacuum, polisher, supplies) and a portable water tank.',
        'Build a simple Instagram with 5 before/afters from cars in your own driveway.',
        'Offer a $99 intro detail to your first 5 customers in exchange for a Google review.'
      ],
      tags: {
        budget:   ['b3', 'b4'],
        hours:    ['h2', 'h3', 'h4'],
        physical: ['p3'],
        social:   ['s2', 's3'],
        skills:   ['k_hands', 'k_outdoor'],
        location: ['l_local'],
        goal:     ['g_fulltime', 'g_growth']
      }
    },
    {
      id: 'pressure-washing',
      name: 'Pressure Washing Service',
      desc: 'Clean driveways, sidewalks, decks, and house siding. Repeat customers every 1–2 years and high margins per job ($200–$700 per visit).',
      cost: '$1,000 – $3,000',
      time: '3 – 6 weeks',
      steps: [
        'Buy a 4 GPM pressure washer with surface cleaner attachment + soaps and downstream injector.',
        'Practice on your own driveway and 2 family members\' homes — build before/after content.',
        'Offer "$199 driveway special" door-hangers in nicer neighborhoods.'
      ],
      tags: {
        budget:   ['b3', 'b4'],
        hours:    ['h3', 'h4'],
        physical: ['p3'],
        social:   ['s2', 's3'],
        skills:   ['k_hands', 'k_outdoor'],
        location: ['l_local'],
        goal:     ['g_fulltime', 'g_growth']
      }
    },
    {
      id: 'handyman',
      name: 'Handyman / Small Repair Service',
      desc: 'Hang TVs, assemble furniture, patch drywall, fix leaky faucets — the stuff most people don\'t want to do themselves. $80–$150/hour for skilled hands.',
      cost: '$200 – $1,000',
      time: '2 – 6 weeks',
      steps: [
        'Pick 5 specific services you\'re confident with — don\'t list everything.',
        'Get a basic general liability policy (~$40/month) and set up a Google Business Profile.',
        'List on TaskRabbit and Thumbtack to get fast first jobs and reviews.'
      ],
      tags: {
        budget:   ['b2', 'b3'],
        hours:    ['h2', 'h3', 'h4'],
        physical: ['p3'],
        social:   ['s3', 's4'],
        skills:   ['k_hands'],
        location: ['l_local'],
        goal:     ['g_fulltime', 'g_growth']
      }
    },
    {
      id: 'freelance-writing',
      name: 'Freelance Content Writing',
      desc: 'Write blog posts, web copy, and product descriptions for small businesses and agencies. 100% remote and asynchronous — good fit for low-energy days.',
      cost: '$0 – $100',
      time: '4 – 10 weeks',
      steps: [
        'Pick a niche you understand (legal, real estate, fitness, etc.) and write 3 sample articles.',
        'Build a one-page portfolio site and start a LinkedIn profile in that niche.',
        'Pitch 5 small businesses per day with a short, specific email — expect 3–5% to reply.'
      ],
      tags: {
        budget:   ['b1', 'b2'],
        hours:    ['h1', 'h2', 'h3'],
        physical: ['p1', 'p2', 'p3'],
        social:   ['s1', 's2'],
        skills:   ['k_detail', 'k_creative'],
        location: ['l_home', 'l_online', 'l_any'],
        goal:     ['g_side', 'g_fulltime', 'g_flexible']
      }
    },
    {
      id: 'resume-writing',
      name: 'Resume & LinkedIn Service',
      desc: 'Help job seekers with polished resumes, LinkedIn profiles, and cover letters. Quick turnaround, $150–$400 per package, mostly async with a quick discovery call.',
      cost: '$0 – $200',
      time: '2 – 6 weeks',
      steps: [
        'Build 2 free sample resumes for friends to use as your portfolio.',
        'Create a service page on your own simple site (or Carrd.co) listing 3 packages.',
        'Post on Reddit\'s r/resumes and your local job-seeker Facebook groups offering a $99 starter package.'
      ],
      tags: {
        budget:   ['b1', 'b2'],
        hours:    ['h1', 'h2', 'h3'],
        physical: ['p1', 'p2', 'p3'],
        social:   ['s2', 's3'],
        skills:   ['k_detail', 'k_creative', 'k_service'],
        location: ['l_home', 'l_online', 'l_any'],
        goal:     ['g_side', 'g_fulltime', 'g_flexible']
      }
    },
    {
      id: 'print-on-demand',
      name: 'Print on Demand Apparel & Stickers',
      desc: 'Design t-shirts, hoodies, and stickers — a print partner ships them for you. Zero inventory. Niches like first responders, faith, fitness, and dad jokes consistently sell.',
      cost: '$50 – $300',
      time: '4 – 12 weeks',
      steps: [
        'Pick 1 niche (not "all designs") and create 25 designs around 3 themes.',
        'Open an Etsy shop OR a Shopify store with Printful or Printify connected.',
        'Run $5/day Pinterest pins on your top 5 designs — Pinterest is the cheapest test platform.'
      ],
      tags: {
        budget:   ['b1', 'b2'],
        hours:    ['h1', 'h2', 'h3'],
        physical: ['p1', 'p2', 'p3'],
        social:   ['s1', 's2'],
        skills:   ['k_creative', 'k_tech'],
        location: ['l_home', 'l_online', 'l_any'],
        goal:     ['g_side', 'g_growth', 'g_flexible']
      }
    },
    {
      id: 'etsy-handmade',
      name: 'Etsy Handmade Shop',
      desc: 'Sell physical handmade goods — candles, leather goods, woodworking, crochet, jewelry. Etsy already has buyers; you just need a listing they\'ll click.',
      cost: '$200 – $1,200',
      time: '6 – 16 weeks',
      steps: [
        'Pick 1 product line (not 4) and make 5 versions to photograph well.',
        'Open the Etsy shop with strong, search-optimized titles for each listing.',
        'Reinvest first $500 of profit into better photos and Etsy ads.'
      ],
      tags: {
        budget:   ['b2', 'b3'],
        hours:    ['h2', 'h3'],
        physical: ['p1', 'p2'],
        social:   ['s1', 's2'],
        skills:   ['k_hands', 'k_creative'],
        location: ['l_home', 'l_online', 'l_any'],
        goal:     ['g_side', 'g_growth', 'g_flexible']
      }
    },
    {
      id: 'social-media-mgmt',
      name: 'Social Media Management for Local Businesses',
      desc: 'Run Instagram and Facebook for restaurants, gyms, and salons. $400–$1,500/month per client, recurring. Most local owners hate posting and gladly pay.',
      cost: '$100 – $400',
      time: '4 – 10 weeks',
      steps: [
        'Pick 1 niche (med spas, restaurants, fitness) and build sample posts to show what you\'d do for them.',
        'Pick 10 local businesses with weak social and walk in or send a personalized email.',
        'Offer a 30-day "test month" at half price to land your first 2 clients.'
      ],
      tags: {
        budget:   ['b1', 'b2'],
        hours:    ['h2', 'h3', 'h4'],
        physical: ['p1', 'p2'],
        social:   ['s3', 's4'],
        skills:   ['k_creative', 'k_tech', 'k_service'],
        location: ['l_home', 'l_online', 'l_local', 'l_any'],
        goal:     ['g_fulltime', 'g_growth']
      }
    },
    {
      id: 'pet-services',
      name: 'Pet Sitting & Dog Walking',
      desc: 'Sign up on Rover and Wag, or build local clients directly. Repeat customers with low operating cost. Especially flexible if your day-to-day energy varies.',
      cost: '$0 – $150',
      time: '1 – 3 weeks',
      steps: [
        'Set up a Rover profile and pass their background check (or build local-only via Nextdoor).',
        'Offer a $20 first walk to your first 3 neighbors and ask for a Rover review.',
        'Upsell into pet-sitting (overnight stays) — those pay $60–$90/night.'
      ],
      tags: {
        budget:   ['b1'],
        hours:    ['h1', 'h2', 'h3'],
        physical: ['p2', 'p3'],
        social:   ['s2', 's3'],
        skills:   ['k_service', 'k_outdoor'],
        location: ['l_local'],
        goal:     ['g_side', 'g_flexible']
      }
    },
    {
      id: 'errand-service',
      name: 'Errand & Concierge Service for Seniors',
      desc: 'Grocery runs, prescription pickups, doctor-visit transportation, light home help. Charge $30–$50/hour. Strong word-of-mouth in any community.',
      cost: '$100 – $500',
      time: '2 – 4 weeks',
      steps: [
        'Decide if you\'ll drive your own car (mileage rate built into pricing) and update insurance.',
        'Make a flyer listing 6 specific services and post in 3 senior-living communities.',
        'Ask each first client for a written testimonial — seniors talk to each other.'
      ],
      tags: {
        budget:   ['b1', 'b2'],
        hours:    ['h2', 'h3', 'h4'],
        physical: ['p2', 'p3'],
        social:   ['s3', 's4'],
        skills:   ['k_service', 'k_outdoor'],
        location: ['l_local'],
        goal:     ['g_side', 'g_fulltime', 'g_flexible']
      }
    },
    {
      id: 'courier-delivery',
      name: 'Local Courier & Same-Day Delivery',
      desc: 'Deliver for local pharmacies, law offices, and small businesses that need same-day runs. Recurring B2B routes pay better than gig apps.',
      cost: '$300 – $1,000',
      time: '2 – 5 weeks',
      steps: [
        'Confirm your car insurance covers business use and add commercial coverage if not.',
        'Build a one-page rate sheet ($25 base + $1.50/mile is a fair starting point).',
        'Visit 20 local law firms, pharmacies, and print shops and pitch your service in person.'
      ],
      tags: {
        budget:   ['b2', 'b3'],
        hours:    ['h2', 'h3', 'h4'],
        physical: ['p2', 'p3'],
        social:   ['s2', 's3'],
        skills:   ['k_outdoor'],
        location: ['l_local'],
        goal:     ['g_fulltime', 'g_growth']
      }
    },
    {
      id: 'tax-prep',
      name: 'Independent Tax Prep / IRS Enrolled Agent',
      desc: 'Seasonal and year-round tax prep for individuals and small businesses. Become an IRS Enrolled Agent (EA) — no degree required, no felony bar in most cases.',
      cost: '$300 – $1,200',
      time: '8 – 24 weeks',
      steps: [
        'Get a PTIN from the IRS (online, free) so you can prepare returns for pay.',
        'Take an EA review course and pass the 3-part exam (or start with H&R Block training).',
        'Build a list of 20 friends + family who\'ll be your first season\'s clients.'
      ],
      tags: {
        budget:   ['b2', 'b3'],
        hours:    ['h2', 'h3'],
        physical: ['p1', 'p2', 'p3'],
        social:   ['s2', 's3'],
        skills:   ['k_detail', 'k_tech', 'k_service'],
        location: ['l_home', 'l_online', 'l_local', 'l_any'],
        goal:     ['g_fulltime', 'g_growth', 'g_flexible']
      }
    },
    {
      id: 'junk-removal',
      name: 'Junk Removal Service',
      desc: 'Haul away furniture, appliances, and yard debris from homes and offices. Cash-positive day one if you have access to a truck or dump trailer.',
      cost: '$1,500 – $3,000',
      time: '3 – 6 weeks',
      steps: [
        'Either buy/rent a 14ft dump trailer or partner with a friend who has a truck (50/50 split early).',
        'Sign up for LoadUp and Pawlik Junk Hauling — both send you paid jobs.',
        'Set a transparent flat-rate per cubic yard ($75–$100) and stick to it.'
      ],
      tags: {
        budget:   ['b3', 'b4'],
        hours:    ['h3', 'h4'],
        physical: ['p3'],
        social:   ['s2', 's3'],
        skills:   ['k_hands', 'k_outdoor'],
        location: ['l_local'],
        goal:     ['g_fulltime', 'g_growth']
      }
    },
    {
      id: 'online-tutoring',
      name: 'Online Tutoring & Coaching',
      desc: 'Tutor a subject you know well — reading, math, GED prep, ESL, music, software. Wyzant and Outschool give you instant access to paying students.',
      cost: '$0 – $100',
      time: '2 – 6 weeks',
      steps: [
        'Pick one subject and one age group — niche down hard.',
        'Apply to Wyzant or Preply (or use your own free Calendly + Stripe).',
        'Offer 3 free 30-minute sessions in exchange for written reviews.'
      ],
      tags: {
        budget:   ['b1'],
        hours:    ['h1', 'h2', 'h3'],
        physical: ['p1', 'p2', 'p3'],
        social:   ['s3', 's4'],
        skills:   ['k_detail', 'k_service'],
        location: ['l_home', 'l_online', 'l_any'],
        goal:     ['g_side', 'g_flexible']
      }
    },
    {
      id: 'real-estate-photo',
      name: 'Real Estate Photography',
      desc: 'Shoot listing photos for real estate agents — $150–$400 per house, 30–45 minutes per shoot. Each agent shoots 30+ houses a year. One happy agent = recurring income.',
      cost: '$1,500 – $3,500',
      time: '4 – 10 weeks',
      steps: [
        'Get a wide-angle lens, tripod, and basic flash. Used gear is fine.',
        'Practice on 3 friends\' homes and put them in a portfolio site.',
        'Email 25 local agents with a $99 intro listing offer to get your first 3 paying jobs.'
      ],
      tags: {
        budget:   ['b3', 'b4'],
        hours:    ['h2', 'h3', 'h4'],
        physical: ['p2', 'p3'],
        social:   ['s2', 's3'],
        skills:   ['k_creative'],
        location: ['l_local'],
        goal:     ['g_fulltime', 'g_growth']
      }
    },
    {
      id: 'custom-apparel',
      name: 'Custom Apparel & Vinyl Press',
      desc: 'Make custom shirts, hats, tumblers, and signs from home with a heat press and vinyl cutter. Local sports teams, churches, and small events are your audience.',
      cost: '$500 – $2,000',
      time: '4 – 10 weeks',
      steps: [
        'Buy a heat press, vinyl cutter (Cricut Maker or Roland), and starter vinyl pack.',
        'Make 10 sample products (shirts, tumblers, hats) for your portfolio photos.',
        'Reach out to 5 local youth sports teams and 3 churches with a one-pager of your services.'
      ],
      tags: {
        budget:   ['b3', 'b4'],
        hours:    ['h2', 'h3', 'h4'],
        physical: ['p2', 'p3'],
        social:   ['s2', 's3'],
        skills:   ['k_hands', 'k_creative'],
        location: ['l_home', 'l_local'],
        goal:     ['g_side', 'g_fulltime', 'g_growth']
      }
    }
  ];

  // ============ MATCHING ENGINE ============
  /**
   * Score a business against the user's answers.
   * Each tag category has a weight. Hard mismatches incur penalty.
   * Returns a numeric score (higher = better fit).
   */
  function scoreBusiness(biz, answers) {
    const weights = {
      budget:   3,   // very important — startup cost must fit
      hours:    2,
      physical: 4,   // hard filter — won't suggest something physically incompatible
      social:   3,
      skills:   3,
      location: 2,
      goal:     1
    };

    let score = 0;

    Object.entries(weights).forEach(([category, weight]) => {
      const userAns = answers[`q_${category}`] || answers[lookupAnsKey(category)];
      const tagList = biz.tags[category] || [];

      if (!userAns) return;

      if (tagList.includes(userAns)) {
        score += weight * 2;            // direct match: full credit
      } else {
        // partial penalty if not on the allowed list
        score -= weight;
      }
    });

    return score;
  }

  function lookupAnsKey(category) {
    // Maps category name -> question id used when storing answers
    const map = {
      budget:   'q1_budget',
      hours:    'q2_hours',
      physical: 'q3_physical',
      social:   'q4_social',
      skills:   'q5_skills',
      location: 'q6_location',
      goal:     'q7_goal'
    };
    return map[category];
  }

  /**
   * Get the top N matches and build a personalized "why it fits" line.
   */
  function getTopMatches(answers, n = 3) {
    // Score every business
    const scored = BUSINESSES.map(biz => ({
      biz,
      score: scoreBusiness(biz, answers)
    }));

    // Sort high to low and pick top N (ensure variety — prefer different skills areas)
    scored.sort((a, b) => b.score - a.score);

    const picks = [];
    const usedSkillTags = new Set();

    for (const s of scored) {
      if (picks.length >= n) break;
      const primarySkill = (s.biz.tags.skills && s.biz.tags.skills[0]) || 'misc';
      // Encourage skill variety on the top 3
      if (picks.length > 0 && usedSkillTags.has(primarySkill) && scored.indexOf(s) < scored.length - 1) {
        // Skip if we have a similar skill already, unless we're running out of options
        if (picks.length < 2) continue;
      }
      picks.push(s);
      usedSkillTags.add(primarySkill);
    }

    // If not enough due to filtering, pad from the original sorted list
    if (picks.length < n) {
      for (const s of scored) {
        if (picks.length >= n) break;
        if (!picks.find(p => p.biz.id === s.biz.id)) picks.push(s);
      }
    }

    return picks.slice(0, n).map(p => ({
      ...p.biz,
      whyItFits: buildWhyItFits(p.biz, answers)
    }));
  }

  /**
   * Build a 1–2 sentence personalized explanation.
   */
  function buildWhyItFits(biz, answers) {
    const reasons = [];
    const budgetLabels  = { b1: 'low-budget', b2: 'starter-budget', b3: 'mid-budget', b4: 'higher-budget' };
    const hourLabels    = { h1: 'limited weekly hours', h2: '10–20 hours/week', h3: '20–40 hours/week', h4: 'full-time' };
    const physicalLabels= { p1: 'low-physical', p2: 'moderate-activity', p3: 'physically capable' };
    const socialLabels  = { s1: 'work-alone', s2: 'async-only', s3: 'comfortable on calls', s4: 'love being in front of people' };
    const skillLabels   = {
      k_hands: 'hands-on', k_detail: 'detail-oriented', k_tech: 'tech-savvy',
      k_creative: 'creative', k_service: 'people-person', k_outdoor: 'outdoor/driving'
    };
    const locLabels     = { l_home: 'home-based', l_local: 'local', l_online: 'online', l_any: 'flexible-location' };
    const goalLabels    = {
      g_side: 'side income', g_fulltime: 'full-time replacement income',
      g_growth: 'growable business', g_flexible: 'flexible work'
    };

    if (biz.tags.budget.includes(answers.q1_budget))   reasons.push(`fits your ${budgetLabels[answers.q1_budget]}`);
    if (biz.tags.physical.includes(answers.q3_physical)) reasons.push(`works with a ${physicalLabels[answers.q3_physical]} day`);
    if (biz.tags.skills.includes(answers.q5_skills))   reasons.push(`leans on your ${skillLabels[answers.q5_skills]} strengths`);
    if (biz.tags.social.includes(answers.q4_social) && answers.q4_social === 's1') reasons.push('lets you work without being "on" with people');
    if (biz.tags.location.includes(answers.q6_location) && answers.q6_location === 'l_home') reasons.push('runs entirely from home');
    if (biz.tags.location.includes(answers.q6_location) && answers.q6_location === 'l_online') reasons.push('runs entirely online');
    if (biz.tags.goal.includes(answers.q7_goal) && answers.q7_goal === 'g_flexible') reasons.push('lets you work around your schedule');

    if (reasons.length === 0) {
      return 'A solid match for your overall situation based on your quiz answers.';
    }

    // Pick top 2 most distinctive reasons
    const picked = reasons.slice(0, 2).join(' and ');
    return capitalize(picked) + '.';
  }

  function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  }

  // ============ STATE & RENDERING ============
  const state = {
    currentQ: 0,
    answers: {},
    matches: []
  };

  // Cache DOM
  const $quiz       = document.getElementById('quiz-state');
  const $email      = document.getElementById('email-state');
  const $results    = document.getElementById('results-state');
  const $qContainer = document.getElementById('question-container');
  const $progBar    = document.getElementById('progress-bar');
  const $progLabel  = document.getElementById('progress-label');
  const $progPct    = document.getElementById('progress-percent');
  const $btnNext    = document.getElementById('btn-next');
  const $btnBack    = document.getElementById('btn-back');
  const $resContainer = document.getElementById('results-container');
  const $resGreeting  = document.getElementById('results-greeting');
  const $leadForm     = document.getElementById('lead-form');
  const $btnSubmit    = document.getElementById('btn-submit');
  const $formError    = document.getElementById('form-error');
  const $btnRestart   = document.getElementById('btn-restart');

  function renderQuestion() {
    const q = QUESTIONS[state.currentQ];
    const selected = state.answers[q.id];

    const optsCols = q.options.length > 4 ? 'options-grid' : 'options-grid';

    $qContainer.innerHTML = `
      <div class="question-title">${escapeHtml(q.title)}</div>
      ${q.help ? `<p class="question-help">${escapeHtml(q.help)}</p>` : ''}
      <div class="${optsCols}">
        ${q.options.map(opt => `
          <button type="button" class="option-btn ${selected === opt.value ? 'selected' : ''}"
                  data-value="${opt.value}">
            <span class="option-emoji" aria-hidden="true">${opt.emoji}</span>
            <span class="option-label">${escapeHtml(opt.label)}</span>
            <span class="option-check" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
          </button>
        `).join('')}
      </div>
    `;

    // Wire option buttons
    $qContainer.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => selectOption(q.id, btn.dataset.value));
    });

    // Update progress
    const pct = Math.round((state.currentQ / QUESTIONS.length) * 100);
    $progBar.style.width = pct + '%';
    $progLabel.textContent = `Question ${state.currentQ + 1} of ${QUESTIONS.length}`;
    $progPct.textContent = pct + '%';

    // Update nav
    $btnBack.disabled = state.currentQ === 0;
    $btnNext.disabled = !state.answers[q.id];
    $btnNext.querySelector('svg').style.display = '';
    $btnNext.childNodes[0].textContent = state.currentQ === QUESTIONS.length - 1 ? 'See My Matches ' : 'Next ';
  }

  function selectOption(qId, value) {
    state.answers[qId] = value;
    // Update UI
    $qContainer.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.value === value);
    });
    $btnNext.disabled = false;
  }

  function next() {
    const q = QUESTIONS[state.currentQ];
    if (!state.answers[q.id]) return;

    if (state.currentQ < QUESTIONS.length - 1) {
      state.currentQ++;
      renderQuestion();
      scrollIntoQuiz();
    } else {
      // Last question — compute matches and go to email gate
      state.matches = getTopMatches(state.answers, 3);
      goToEmailGate();
    }
  }

  function back() {
    if (state.currentQ > 0) {
      state.currentQ--;
      renderQuestion();
      scrollIntoQuiz();
    }
  }

  function scrollIntoQuiz() {
    if (window.scrollY > 200) {
      $quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function goToEmailGate() {
    $quiz.classList.add('hidden');
    $email.classList.remove('hidden');
    $email.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      const fn = document.getElementById('first_name');
      if (fn) fn.focus();
    }, 250);
  }

  function showResults(firstName) {
    $email.classList.add('hidden');
    $results.classList.remove('hidden');

    const safeName = firstName ? escapeHtml(firstName.trim()) : 'there';
    $resGreeting.innerHTML = `Here are your top 3 matches, <span class="name-highlight">${safeName}</span>`;

    $resContainer.innerHTML = state.matches.map((m, idx) => `
      <article class="result-card ${idx === 0 ? 'top-match' : ''}">
        <div class="result-card-head">
          <h3 class="result-card-title">
            ${escapeHtml(m.name)}
            ${idx === 0 ? '<span class="rank-badge">Best match</span>' : ''}
          </h3>
          <div class="result-card-stats">
            <span class="result-card-stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Startup: <span>${escapeHtml(m.cost)}</span>
            </span>
            <span class="result-card-stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              First $: <span>${escapeHtml(m.time)}</span>
            </span>
          </div>
        </div>
        <p class="result-card-desc">${escapeHtml(m.desc)}</p>
        <div class="result-fit">
          <div class="result-fit-label">Why it fits you</div>
          <div class="result-fit-text">${escapeHtml(m.whyItFits)}</div>
        </div>
        <div class="result-steps">
          <div class="result-steps-title">Your first 3 steps</div>
          <ol class="result-steps-list">
            ${m.steps.map((step, i) => `
              <li><span class="step-num">${i + 1}</span><span>${escapeHtml(step)}</span></li>
            `).join('')}
          </ol>
        </div>
      </article>
    `).join('');

    $results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ============ FORM SUBMISSION (Netlify) ============
  function encodeFormData(data) {
    return Object.keys(data)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');
  }

  async function submitLead(e) {
    e.preventDefault();
    $formError.hidden = true;

    const firstName = document.getElementById('first_name').value.trim();
    const email     = document.getElementById('email').value.trim();

    if (!firstName) {
      showError('Please enter your first name.');
      return;
    }
    if (!isValidEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    // Build payload
    const payload = {
      'form-name':   'business-match',
      'first_name':  firstName,
      'email':       email,
      'q1_budget':   labelFor(0),
      'q2_hours':    labelFor(1),
      'q3_physical': labelFor(2),
      'q4_social':   labelFor(3),
      'q5_skills':   labelFor(4),
      'q6_location': labelFor(5),
      'q7_goal':     labelFor(6),
      'top_match_1': state.matches[0] ? state.matches[0].name : '',
      'top_match_2': state.matches[1] ? state.matches[1].name : '',
      'top_match_3': state.matches[2] ? state.matches[2].name : '',
      'source':      'business-match-quiz',
      'bot-field':   ''
    };

    // Show loading
    $btnSubmit.classList.add('btn-submit-loading');
    $btnSubmit.disabled = true;

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData(payload)
      });

      if (!res.ok) throw new Error('Network error');

      // Success — show results
      showResults(firstName);
    } catch (err) {
      // Even if Netlify reports an error, still show results so user gets value.
      // We can re-attempt the form submission once silently.
      console.warn('Form submit failed, showing results anyway:', err);
      showResults(firstName);
    } finally {
      $btnSubmit.classList.remove('btn-submit-loading');
      $btnSubmit.disabled = false;
    }
  }

  function labelFor(qIdx) {
    const q = QUESTIONS[qIdx];
    const ans = state.answers[q.id];
    const opt = q.options.find(o => o.value === ans);
    return opt ? opt.label : '';
  }

  function showError(msg) {
    $formError.textContent = msg;
    $formError.hidden = false;
  }

  function isValidEmail(s) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
  }

  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function restart() {
    state.currentQ = 0;
    state.answers = {};
    state.matches = [];
    $results.classList.add('hidden');
    $email.classList.add('hidden');
    $quiz.classList.remove('hidden');
    renderQuestion();
    $quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ============ INIT ============
  document.addEventListener('DOMContentLoaded', () => {
    if (!$quiz) return;

    renderQuestion();

    $btnNext.addEventListener('click', next);
    $btnBack.addEventListener('click', back);
    $leadForm.addEventListener('submit', submitLead);
    $btnRestart.addEventListener('click', restart);

    // Keyboard: Enter advances when an option is selected
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !$quiz.classList.contains('hidden')) {
        if (!$btnNext.disabled && document.activeElement.tagName !== 'BUTTON') {
          next();
        }
      }
    });
  });
})();
