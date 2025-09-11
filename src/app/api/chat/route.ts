import { NextResponse } from "next/server";

// Enhanced knowledge base with learning capabilities
interface KnowledgeItem {
    id: string;
    keywords: string[];
    patterns: RegExp[];
    response: string;
    category: string;
    confidence: number;
    usageCount: number;
    successRate: number;
    followUp?: string[];
    context?: string[];
    createdAt: Date;
    lastUsed: Date;
    userFeedback: Array<{
        rating: number;
        feedback?: string;
        timestamp: Date;
    }>;
}

// Learning data structure
interface LearningData {
    patterns: Map<string, {
        frequency: number;
        responses: string[];
        context: string[];
        successRate: number;
    }>;
    userInteractions: Array<{
        input: string;
        response: string;
        timestamp: Date;
        sessionId: string;
        wasHelpful?: boolean;
        rating?: number;
    }>;
    commonPhrases: Map<string, number>;
    contextualPairs: Map<string, string[]>;
    failedQueries: Array<{
        query: string;
        timestamp: Date;
        sessionId: string;
        attempts: number;
    }>;
}

// Initialize learning data (in-memory for demo - use database in production)
const learningData: LearningData = {
    patterns: new Map(),
    userInteractions: [],
    commonPhrases: new Map(),
    contextualPairs: new Map(),
    failedQueries: []
};

const knowledgeBase: KnowledgeItem[] = [
    // Greetings & Social
    {
        id: "greeting",
        keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "greetings"],
        patterns: [/^(hi|hello|hey|greetings)/i, /good (morning|afternoon|evening)/i],
        response: `✨ **Hello there!** 👋 

Welcome to **Ambitious Students Ubiquitous**! I'm your AI assistant, ready to help you discover amazing learning opportunities.

▸ What would you like to know about our programs?
▸ Are you exploring specific courses?
▸ Need guidance on admissions?`,
        category: "greeting",
        confidence: 0.95,
        usageCount: 0,
        successRate: 0.95,
        createdAt: new Date(),
        lastUsed: new Date(),
        userFeedback: [],
        followUp: ["Explore our courses", "Learn about admission", "Pricing information"]
    },

    // Courses & Programs
    {
        id: "courses_general",
        keywords: ["courses", "programs", "classes", "subjects", "curriculum", "study", "learn", "education"],
        patterns: [/what.*courses/i, /available.*programs/i, /curriculum/i, /study.*options/i],
        response: `🎓 **Our Comprehensive Programs**

We offer cutting-edge education in technology with two main tracks:

**💻 Software Engineering Track:**
• Full-Stack Web Development
• Mobile App Development (iOS/Android)
• DevOps & Cloud Computing
• Software Architecture & Design

**🔧 IT Specializations:**
• Cybersecurity & Ethical Hacking
• Data Science & Analytics
• Network Administration
• IT Project Management

**✨ Each program includes:**
✓ Hands-on projects
✓ Industry mentorship  
✓ Career placement support
✓ Portfolio development`,
        category: "academics",
        confidence: 0.90,
        usageCount: 0,
        successRate: 0.88,
        createdAt: new Date(),
        lastUsed: new Date(),
        userFeedback: [],
        followUp: ["Specific track details", "Duration and schedule", "Prerequisites needed"]
    },

    {
        id: "software_engineering",
        keywords: ["software engineering", "programming", "coding", "development", "web development", "mobile app"],
        patterns: [/software.*engineering/i, /(web|mobile).*development/i, /programming/i, /full.*stack/i],
        response: `🚀 **Software Engineering Program** 
*Our flagship 12-month intensive program*

**📚 What You'll Master:**
• **Frontend:** React, Vue.js, HTML5/CSS3, JavaScript/TypeScript
• **Backend:** Node.js, Python, Java, RESTful APIs
• **Databases:** MongoDB, PostgreSQL, Redis
• **Cloud:** AWS, Docker, Kubernetes
• **Version Control:** Git, GitHub workflows

**🎯 Real-World Projects:**
✓ E-commerce platforms
✓ Social media applications  
✓ Fintech solutions
✓ IoT systems

**💼 Career Support:**
✓ Resume building
✓ Interview preparation  
✓ Job placement assistance

**📊 Success Rate:** 99% of graduates land jobs within 3 months!`,
        category: "academics",
        confidence: 0.92,
        usageCount: 0,
        successRate: 0.91,
        createdAt: new Date(),
        lastUsed: new Date(),
        userFeedback: []
    },

    {
        id: "cybersecurity",
        keywords: ["cybersecurity", "security", "hacking", "ethical hacking", "penetration testing", "infosec"],
        patterns: [/cyber.*security/i, /ethical.*hacking/i, /penetration.*testing/i, /security.*analyst/i],
        response: `🔐 **Cybersecurity & Ethical Hacking Program** 
*Protect the digital world!*

**📖 Core Modules:**
• Network Security & Firewalls
• Ethical Hacking & Penetration Testing
• Digital Forensics & Incident Response
• Risk Assessment & Compliance
• Cryptography & Secure Communications

**🔬 Hands-On Labs:**
✓ Real attack simulations
✓ Vulnerability assessments
✓ Security auditing exercises

**🏆 Certifications Preparation:**
✓ CEH (Certified Ethical Hacker)
✓ CISSP (Certified Information Systems Security Professional)  
✓ CompTIA Security+

**🌐 Industry Demand:** 3.5 million unfilled cybersecurity jobs globally!`,
        category: "academics",
        confidence: 0.89,
        usageCount: 0,
        successRate: 0.87,
        createdAt: new Date(),
        lastUsed: new Date(),
        userFeedback: []
    },

    // Pricing & Financial
    {
        id: "pricing_detailed",
        keywords: ["price", "cost", "fee", "tuition", "payment", "scholarship", "financial aid", "money"],
        patterns: [/how.*much/i, /pricing/i, /cost/i, /tuition/i, /payment.*plan/i, /scholarship/i],
        response: `💰 **Investment in Your Future**

**📅 Monthly Plans:**
• **Basic Access:** $9.99/month (self-paced courses)
• **Premium:** $29.99/month (live sessions + mentorship)
• **Pro:** $49.99/month (1-on-1 coaching + job guarantee)

**🎯 Full Program Investment:**
• Software Engineering: $2,999 (12 months)
• IT Specialization: $1,999 (8 months)

**✨ Special Opportunities:**
• 🎓 **Student Discount:** 40% off
• 🚀 **Early Bird:** 25% off (first 100 students)
• 📚 **Sibling Discount:** 30% off second enrollment

**💳 Flexible Payment:** 0% interest installment plans available!`,
        category: "pricing",
        confidence: 0.93,
        usageCount: 0,
        successRate: 0.90,
        createdAt: new Date(),
        lastUsed: new Date(),
        userFeedback: [],
        followUp: ["Money-back guarantee", "Scholarship options", "Help choosing plan"]
    },

    // Admission & Enrollment
    {
        id: "admission_process",
        keywords: ["admission", "apply", "enroll", "registration", "requirements", "eligibility", "join"],
        patterns: [/how.*apply/i, /admission.*process/i, /requirements/i, /enroll/i, /registration/i],
        response: `📝 **Admission Process Made Simple**

**🎯 Step 1: Online Application** (5 minutes)
• Complete our digital form
• Upload your resume/CV
• Select your preferred program

**📊 Step 2: Assessment** (30 minutes)
• Logic & problem-solving evaluation
• Basic technical aptitude (for tech tracks)
• Optional portfolio review

**💬 Step 3: Interview** (20 minutes)
• Video call with admissions team
• Discuss your goals & motivations
• Program fit assessment

**✅ Requirements:**
✓ High school diploma or equivalent
✓ Basic computer literacy  
✓ Passion for learning!

**⏰ Timeline:** Complete process in 48 hours!`,
        category: "admission",
        confidence: 0.91,
        usageCount: 0,
        successRate: 0.89,
        createdAt: new Date(),
        lastUsed: new Date(),
        userFeedback: []
    },

    // Support & Technical
    {
        id: "support",
        keywords: ["help", "support", "problem", "issue", "technical", "contact", "assistance"],
        patterns: [/need.*help/i, /technical.*support/i, /having.*problem/i, /contact.*support/i],
        response: `🛠️ **We're Here to Help!**

**📞 24/7 Support Channels:**
• Email: cambodiaasu@gmail.com    
• Phone: 096-9767031 / 023-902300
• Telegram: @Ambitious_Students_ubiquitous

**👥 Student Success Team:**
• Academic advisors
• Technical mentors
• Career counselors
• Peer study groups

**⚡ Average Response Time:** Under 10 minutes!
**⭐ Student Satisfaction:** 4.9/5 stars`,
        category: "support",
        confidence: 0.88,
        usageCount: 0,
        successRate: 0.92,
        createdAt: new Date(),
        lastUsed: new Date(),
        userFeedback: []
    },

    // Company & About
    {
        id: "about_company",
        keywords: ["about", "company", "mission", "vision", "team", "history", "ambitious students"],
        patterns: [/about.*company/i, /who.*are.*you/i, /ambitious.*students/i, /mission/i],
        response: `🌟 **About Ambitious Students Ubiquitous**

We're revolutionizing tech education with a mission to make high-quality programming and IT education accessible to everyone, everywhere.

**📅 Founded:** 2020 by former Google & Microsoft engineers
**👥 Students:** 50,000+ successful graduates worldwide
**🌍 Locations:** Online-first with campuses in 12 countries
**🎯 Success Rate:** 94% job placement within 3 months

**💫 Our Promise:** Transform your career with practical skills, real projects, and industry connections. From zero to employed in months, not years!`,
        category: "company",
        confidence: 0.94,
        usageCount: 0,
        successRate: 0.93,
        createdAt: new Date(),
        lastUsed: new Date(),
        userFeedback: []
    },

    // Career & Jobs
    {
        id: "career_support",
        keywords: ["job", "career", "employment", "placement", "salary", "hiring", "work"],
        patterns: [/job.*placement/i, /career.*support/i, /salary.*expectations/i, /hiring.*partners/i],
        response: `🎯 **Career Success Guaranteed!**

**💼 Job Placement Support:**
• Resume & LinkedIn optimization
• Mock interviews with industry experts
• Portfolio development guidance
• Direct connections with 500+ hiring partners

**💰 Average Graduate Outcomes:**
• **Software Engineers:** $75,000-$120,000
• **Cybersecurity Analysts:** $70,000-$110,000  
• **Data Scientists:** $80,000-$130,000
• **Cloud Engineers:** $85,000-$140,000

**🤝 Hiring Partners:** Google, Microsoft, Amazon, Netflix, Spotify, and 500+ startups!

**✅ Guarantee:** Land a job within 6 months or get your money back!`,
        category: "career",
        confidence: 0.90,
        usageCount: 0,
        successRate: 0.88,
        createdAt: new Date(),
        lastUsed: new Date(),
        userFeedback: []
    },

    // GPA Analysis for Scholarship
    {
        id: "gpa_analysis",
        keywords: ["gpa", "grade", "scholarship", "academic", "score", "transcript", "merit", "financial aid"],
        patterns: [
            /analy(s|z)e.*gpa/i,
            /gpa.*scholarship/i,
            /scholarship.*gpa/i,
            /what.*gpa.*scholarship/i,
            /my.*gpa.*is/i,
            /can.*analy(s|z)e.*gpa/i
        ],
        response: `📊 **GPA Analysis for Scholarships**

I'd be happy to help you understand scholarship eligibility based on your GPA! 

**🎓 Academic Excellence Scholarship Tiers:**

• **3.8+ GPA:** Up to 50% tuition coverage
• **3.5-3.79 GPA:** Up to 30% tuition coverage  
• **3.0-3.49 GPA:** Up to 15% tuition coverage

**💡 Merit-Based Considerations:**
• STEM background and achievements
• Leadership experience
• Community involvement  
• Personal accomplishments

**📋 Next Steps:**
1. Share your GPA (on a 4.0 scale)
2. Upload transcript for detailed analysis
3. Schedule financial aid consultation

Please share your GPA, and I'll provide a personalized assessment!`,
        category: "scholarship",
        confidence: 0.92,
        usageCount: 0,
        successRate: 0.90,
        createdAt: new Date(),
        lastUsed: new Date(),
        userFeedback: [],
        followUp: ["What's your current GPA?", "Need-based scholarships", "Application process"]
    }
];

// Context tracking for conversations
interface ConversationContext {
    lastCategory?: string;
    askedQuestions: string[];
    interests: string[];
    stage: "initial" | "exploring" | "deciding" | "enrolling";
    satisfactionScore?: number;
    preferredResponseStyle?: "detailed" | "concise" | "conversational";
    gpaInfo?: {
        value?: number;
        scale?: number;
        provided: boolean;
    };
}

const conversations = new Map<string, ConversationContext>();

// Machine Learning Utilities
class MachineLearning {
    // Extract features from text
    static extractFeatures(text: string): string[] {
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 2);

        // N-grams (2-grams and 3-grams)
        const features = [...words];
        for (let i = 0; i < words.length - 1; i++) {
            features.push(`${words[i]} ${words[i + 1]}`);
            if (i < words.length - 2) {
                features.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
            }
        }

        return features;
    }

    // Calculate similarity between two text inputs
    static calculateSimilarity(text1: string, text2: string): number {
        const features1 = new Set(this.extractFeatures(text1));
        const features2 = new Set(this.extractFeatures(text2));

        const intersection = new Set([...features1].filter(x => features2.has(x)));
        const union = new Set([...features1, ...features2]);

        return intersection.size / union.size; // Jaccard similarity
    }

    // Learn from user interactions
    static learnFromInteraction(input: string, response: string, sessionId: string, wasHelpful?: boolean) {
        const features = this.extractFeatures(input);

        // Store interaction
        learningData.userInteractions.push({
            input,
            response,
            timestamp: new Date(),
            sessionId,
            wasHelpful
        });

        // Update pattern frequency
        features.forEach(feature => {
            if (!learningData.patterns.has(feature)) {
                learningData.patterns.set(feature, {
                    frequency: 0,
                    responses: [],
                    context: [],
                    successRate: 0.5
                });
            }

            const pattern = learningData.patterns.get(feature)!;
            pattern.frequency++;
            if (!pattern.responses.includes(response)) {
                pattern.responses.push(response);
            }

            if (wasHelpful !== undefined) {
                pattern.successRate = (pattern.successRate + (wasHelpful ? 1 : 0)) / 2;
            }
        });

        // Update common phrases
        features.forEach(feature => {
            learningData.commonPhrases.set(feature, (learningData.commonPhrases.get(feature) || 0) + 1);
        });
    }

    // Generate response based on learned patterns
    static generateLearnedResponse(input: string): string | null {
        const features = this.extractFeatures(input);
        let bestMatch: { response: string; confidence: number } | null = null;

        for (const feature of features) {
            const pattern = learningData.patterns.get(feature);
            if (pattern && pattern.frequency > 2 && pattern.successRate > 0.6) {
                const confidence = (pattern.frequency / 100) * pattern.successRate;

                if (!bestMatch || confidence > bestMatch.confidence) {
                    const responseIndex = Math.floor(Math.random() * pattern.responses.length);
                    bestMatch = {
                        response: pattern.responses[responseIndex],
                        confidence
                    };
                }
            }
        }

        return bestMatch && bestMatch.confidence > 0.3 ? bestMatch.response : null;
    }

    // Adapt response style based on user preference
    static adaptResponseStyle(response: string, context: ConversationContext): string {
        if (!context.preferredResponseStyle) {
            return response;
        }

        switch (context.preferredResponseStyle) {
            case "concise":
                return this.makeConcise(response);
            case "conversational":
                return this.makeConversational(response);
            case "detailed":
            default:
                return response;
        }
    }

    static makeConcise(response: string): string {
        // Remove emojis and extra formatting for concise style
        return response
            .replace(/[✨🎓🚀🔐💰📝🛠️🌟🎯📊📋📅📖🔬🏆🌐👥⚡⭐💫🤝✅🌍👥💼📚🎯🔧💻📞📧🎥💬💳🎓💡📊📋]/g, '')
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/✓/g, '•')
            .replace(/▸/g, '•')
            .split('\n')
            .filter(line => line.trim().length > 0)
            .slice(0, 5)
            .join('\n');
    }

    static makeConversational(response: string): string {
        const conversationalPrefixes = [
            "Great question! ",
            "I'd be happy to tell you that ",
            "Here's what I can share about that: ",
            "Let me explain that for you: "
        ];

        const prefix = conversationalPrefixes[Math.floor(Math.random() * conversationalPrefixes.length)];
        return prefix + response;
    }

    // Auto-generate new knowledge base entries
    static autoGenerateKnowledge(failedQueries: string[]): KnowledgeItem[] {
        const newItems: KnowledgeItem[] = [];

        // Group similar failed queries
        const queryGroups = new Map<string, string[]>();

        failedQueries.forEach(query => {
            const features = this.extractFeatures(query);
            const mainFeature = features.find(f => learningData.commonPhrases.get(f) || 0 > 5) || features[0];

            if (mainFeature) {
                if (!queryGroups.has(mainFeature)) {
                    queryGroups.set(mainFeature, []);
                }
                queryGroups.get(mainFeature)!.push(query);
            }
        });

        // Generate knowledge items for frequent failed queries
        queryGroups.forEach((queries, feature) => {
            if (queries.length >= 3) {
                const newItem: KnowledgeItem = {
                    id: `learned_${feature.replace(/\s+/g, '_')}`,
                    keywords: [feature, ...this.extractFeatures(queries.join(' '))],
                    patterns: [new RegExp(feature, 'i')],
                    response: `I've noticed you're asking about ${feature}. While I'm still learning about this topic, I'd recommend contacting our support team for detailed information. They can provide you with the most accurate and up-to-date details!`,
                    category: "learned",
                    confidence: 0.6,
                    usageCount: 0,
                    successRate: 0.5,
                    createdAt: new Date(),
                    lastUsed: new Date(),
                    userFeedback: []
                };

                newItems.push(newItem);
            }
        });

        return newItems;
    }
}

// Enhanced Intelligent ChatBot with Learning
class LearningChatBot {
    private static updateKnowledgeBaseStats(item: KnowledgeItem, wasHelpful?: boolean) {
        item.usageCount++;
        item.lastUsed = new Date();

        if (wasHelpful !== undefined) {
            const totalFeedback = item.userFeedback.length + 1;
            const currentSuccessRate = item.successRate * item.userFeedback.length;
            item.successRate = (currentSuccessRate + (wasHelpful ? 1 : 0)) / totalFeedback;

            item.userFeedback.push({
                rating: wasHelpful ? 5 : 2,
                timestamp: new Date()
            });
        }
    }

    private static getContextualResponse(message: string, context?: ConversationContext): string {
        const lowerMessage = message.toLowerCase();

        // First, try to use learned patterns
        const learnedResponse = MachineLearning.generateLearnedResponse(message);
        if (learnedResponse) {
            return MachineLearning.adaptResponseStyle(learnedResponse, context || {} as ConversationContext);
        }

        // Check for GPA information
        if (this.containsGPAInfo(message)) {
            return this.analyzeGPA(message, context);
        }

        // Intent classification
        if (this.isGreeting(lowerMessage)) {
            return this.getPersonalizedGreeting(context);
        }

        if (this.isQuestion(lowerMessage)) {
            return this.handleQuestion(message, context);
        }

        if (this.isPriceInquiry(lowerMessage)) {
            return this.handlePricing(message, context);
        }

        if (this.isComplaint(lowerMessage)) {
            return this.handleComplaint(message);
        }

        // Fallback to knowledge base with learning enhancement
        return this.searchKnowledgeBase(message, context);
    }

    private static isGreeting(message: string): boolean {
        const greetingPatterns = [
            /^(hi|hello|hey|greetings)/i,
            /good (morning|afternoon|evening)/i,
            /what's up/i,
            /howdy/i
        ];
        return greetingPatterns.some(pattern => pattern.test(message));
    }

    private static isQuestion(message: string): boolean {
        const questionWords = ["what", "how", "when", "where", "why", "which", "who", "can you", "do you", "will you"];
        return questionWords.some(word => message.toLowerCase().includes(word)) || message.includes("?");
    }

    private static isPriceInquiry(message: string): boolean {
        const priceKeywords = ["price", "cost", "fee", "expensive", "cheap", "afford", "budget", "money", "pay"];
        return priceKeywords.some(keyword => message.toLowerCase().includes(keyword));
    }

    private static isComplaint(message: string): boolean {
        const complaintKeywords = ["problem", "issue", "wrong", "error", "bug", "not working", "broken"];
        return complaintKeywords.some(keyword => message.toLowerCase().includes(keyword));
    }

    private static containsGPAInfo(message: string): boolean {
        // Check for GPA patterns like "3.5 GPA", "gpa is 3.8", etc.
        const gpaPatterns = [
            /\b\d\.\d+\s*(gpa|grade)/i,
            /(gpa|grade).*is.*\d\.\d+/i,
            /\b\d\.\d+\s*(out of|on a scale of)/i
        ];

        return gpaPatterns.some(pattern => pattern.test(message)) ||
            message.toLowerCase().includes("my gpa") ||
            message.toLowerCase().includes("gpa of");
    }

    private static extractGPA(message: string): { value: number; scale: number } | null {
        // Extract GPA value from message
        const gpaMatch = message.match(/\b(\d\.\d+)\b/);
        if (!gpaMatch) return null;

        const value = parseFloat(gpaMatch[1]);

        // Check for scale (default is 4.0)
        let scale = 4.0;
        const scaleMatch = message.match(/(\d\.\d+)\s*(out of|scale|on a scale of)\s*(\d\.\d+)/i);
        if (scaleMatch && scaleMatch[3]) {
            scale = parseFloat(scaleMatch[3]);
        }

        return { value, scale };
    }

    private static analyzeGPA(message: string, context?: ConversationContext): string {
        const gpaInfo = this.extractGPA(message);

        if (!gpaInfo) {
            return "I'd love to analyze your GPA for scholarship eligibility! Could you please share your GPA in the format like '3.5 GPA' or 'My GPA is 3.8'?";
        }

        // Update context with GPA info
        if (context) {
            context.gpaInfo = {
                value: gpaInfo.value,
                scale: gpaInfo.scale,
                provided: true
            };
        }

        // Normalize GPA to 4.0 scale for analysis
        const normalizedGPA = gpaInfo.scale === 4.0 ? gpaInfo.value : (gpaInfo.value / gpaInfo.scale) * 4.0;

        // Determine scholarship eligibility
        let scholarshipPercentage = 0;
        let scholarshipTier = "Not eligible";

        if (normalizedGPA >= 3.8) {
            scholarshipPercentage = 50;
            scholarshipTier = "Academic Excellence";
        } else if (normalizedGPA >= 3.5) {
            scholarshipPercentage = 30;
            scholarshipTier = "Academic Excellence";
        } else if (normalizedGPA >= 3.0) {
            scholarshipPercentage = 15;
            scholarshipTier = "Academic Merit";
        }

        // Generate personalized response
        let response = `📊 **GPA Analysis Results**\n\n`;
        response += `Based on your GPA of ${gpaInfo.value} (on a ${gpaInfo.scale} scale):\n\n`;

        if (scholarshipPercentage > 0) {
            response += `🎉 **Congratulations!** You qualify for our **${scholarshipTier} Scholarship**!\n\n`;
            response += `**💰 Potential Award:** Up to ${scholarshipPercentage}% tuition coverage\n\n`;
            response += `**📋 Next Steps:**\n`;
            response += `• Complete your application for official scholarship offer\n`;
            response += `• Prepare supporting documents\n`;
            response += `• Schedule financial aid consultation\n\n`;
            response += `**💡 Additional merit-based awards may be available for:**\n`;
            response += `• STEM background and achievements\n`;
            response += `• Leadership experience\n`;
            response += `• Community involvement\n`;
            response += `• Personal statement quality\n\n`;
        } else {
            response += `While your current GPA doesn't qualify for our academic scholarships, we offer several other opportunities:\n\n`;
            response += `**💼 Need-Based Financial Aid:**\n`;
            response += `• Income-based discounts\n`;
            response += `• Payment plans with 0% interest\n`;
            response += `• Work-study opportunities\n\n`;
            response += `**🎯 Merit-Based Awards:**\n`;
            response += `• Portfolio-based scholarships for tech projects\n`;
            response += `• Leadership and community service awards\n`;
            response += `• Diversity and inclusion scholarships\n\n`;
        }

        response += `**🚀 To Get Started:**\n`;
        response += `1. Complete our online application\n`;
        response += `2. Upload your transcript for official review\n`;
        response += `3. Schedule a consultation with our financial aid team\n\n`;
        response += `Would you like me to help you with the application process?`;

        return response;
    }

    private static getPersonalizedGreeting(context?: ConversationContext): string {
        if (context?.askedQuestions.length) {
            return "Welcome back! I'm glad you're interested in learning more. What other questions can I answer for you?";
        }

        // Learn from user's preferred greeting style
        const styles = ["formal", "casual", "enthusiastic"];
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];

        switch (randomStyle) {
            case "formal":
                return "Good day! Welcome to Ambitious Students Ubiquitous. I am your AI assistant, here to provide information about our educational programs. How may I assist you today?";
            case "casual":
                return "Hey there! Welcome to Ambitious Students! I'm your AI buddy here to help you learn about our awesome tech programs. What's on your mind?";
            case "enthusiastic":
            default:
                return "Hello there! Welcome to Ambitious Students Ubiquitous! I'm super excited to help you discover amazing learning opportunities. What interests you most?";
        }
    }

    private static handleQuestion(message: string, context?: ConversationContext): string {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes("what") && (lowerMessage.includes("course") || lowerMessage.includes("program"))) {
            const item = knowledgeBase.find(kb => kb.id === "courses_general");
            if (item) {
                this.updateKnowledgeBaseStats(item);
                return MachineLearning.adaptResponseStyle(item.response, context || {} as ConversationContext);
            }
        }

        if (lowerMessage.includes("how") && lowerMessage.includes("apply")) {
            const item = knowledgeBase.find(kb => kb.id === "admission_process");
            if (item) {
                this.updateKnowledgeBaseStats(item);
                return MachineLearning.adaptResponseStyle(item.response, context || {} as ConversationContext);
            }
        }

        return this.searchKnowledgeBase(message, context);
    }

    private static handlePricing(message: string, context?: ConversationContext): string {
        const pricingKB = knowledgeBase.find(kb => kb.id === "pricing_detailed");
        if (pricingKB) {
            this.updateKnowledgeBaseStats(pricingKB);
            return MachineLearning.adaptResponseStyle(pricingKB.response, context || {} as ConversationContext);
        }
        return "Our pricing starts at $9.99 per month with various plans available.";
    }

    private static handleComplaint(message: string): string {
        return "I'm sorry to hear you're experiencing an issue! Our support team is here to help 24/7. You can:\n\n• Use our live chat for instant assistance\n• Email us at support@ambitiousstudents.com\n• Call +1-800-AMBITIOUS\n\nWe typically resolve issues within 10 minutes. What specific problem can I help you with right now?";
    }

    private static searchKnowledgeBase(message: string, context?: ConversationContext): string {
        const lowerMessage = message.toLowerCase();
        let bestMatch: KnowledgeItem | null = null;
        let highestScore = 0;

        // Enhanced matching with machine learning
        for (const item of knowledgeBase) {
            let score = 0;

            // Keyword matching
            for (const keyword of item.keywords) {
                if (lowerMessage.includes(keyword.toLowerCase())) {
                    score += 2;
                }
            }

            // Pattern matching
            for (const pattern of item.patterns) {
                if (pattern.test(message)) {
                    score += 3;
                }
            }

            // Context bonus
            if (context?.lastCategory === item.category) {
                score += 1;
            }

            // Success rate bonus
            score += item.successRate * 2;

            // Similarity matching using ML
            const similarity = MachineLearning.calculateSimilarity(
                message,
                item.keywords.join(' ') + ' ' + item.response
            );
            score += similarity * 5;

            if (score > highestScore) {
                highestScore = score;
                bestMatch = item;
            }
        }

        if (bestMatch && highestScore >= 2) {
            this.updateKnowledgeBaseStats(bestMatch);
            return MachineLearning.adaptResponseStyle(bestMatch.response, context || {} as ConversationContext);
        }

        // Track failed queries for learning
        learningData.failedQueries.push({
            query: message,
            timestamp: new Date(),
            sessionId: context?.toString() || "unknown",
            attempts: 1
        });

        // Enhanced fallback responses
        return this.getIntelligentFallback(message);
    }

    private static getIntelligentFallback(message: string): string {
        // Learn from failed queries and adapt fallback
        const similarFailures = learningData.failedQueries.filter(fq =>
            MachineLearning.calculateSimilarity(fq.query, message) > 0.3
        );

        if (similarFailures.length > 2) {
            return "I notice this is a common question that I'm still learning about! Let me connect you with our human support team who can give you a detailed answer:\n\n📞 Call: +1-800-AMBITIOUS\n📧 Email: support@ambitiousstudents.com\n💬 Live Chat: Available 24/7\n\nIs there anything else about our programs I can help you with in the meantime?";
        }

        const fallbacks = [
            "That's an interesting question! I'm always learning and improving. While I don't have specific information about that right now, I'd be happy to help you with:\n\n• Course information and curriculum details\n• Admission requirements and application process\n• Pricing and payment options\n• Career support and job placement\n\nWhat would you like to know more about?",

            "Could you rephrase your question? I'm particularly knowledgeable about:\n\n• Our Software Engineering and IT programs\n• Admission process and requirements\n• Pricing and financial aid options\n• Student support services\n\nWhat specific area interests you most?",

            "While I'm still learning about that specific topic, our admissions team would be perfect to help you.\n\nIn the meantime, I can share details about:\n• Program curriculum and structure\n• Student success stories\n• Pricing and scholarships\n• Getting started with applications\n\nWhat would you like to explore first?"
        ];

        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    public static processMessage(message: string, sessionId: string = "default", feedback?: { wasHelpful?: boolean; rating?: number }): string {
        // Get or create conversation context
        let context = conversations.get(sessionId);
        if (!context) {
            context = {
                askedQuestions: [],
                interests: [],
                stage: "initial",
                gpaInfo: {
                    provided: false
                }
            };
            conversations.set(sessionId, context);
        }

        // Process the message
        const response = this.getContextualResponse(message, context);

        // Learn from the interaction
        MachineLearning.learnFromInteraction(message, response, sessionId, feedback?.wasHelpful);

        // Update context
        context.askedQuestions.push(message);

        // Extract interests and learn user preferences
        const interestKeywords = ["software", "programming", "cybersecurity", "data science", "web development"];
        interestKeywords.forEach(keyword => {
            if (message.toLowerCase().includes(keyword) && !context!.interests.includes(keyword)) {
                context!.interests.push(keyword);
            }
        });

        // Learn response style preference
        if (message.includes("brief") || message.includes("short")) {
            context.preferredResponseStyle = "concise";
        } else if (message.includes("detail") || message.includes("explain more")) {
            context.preferredResponseStyle = "detailed";
        } else if (message.includes("casual") || message.includes("friendly")) {
            context.preferredResponseStyle = "conversational";
        }

        // Update conversation stage
        if (message.toLowerCase().includes("apply") || message.toLowerCase().includes("enroll")) {
            context.stage = "enrolling";
        } else if (message.toLowerCase().includes("price") || message.toLowerCase().includes("cost")) {
            context.stage = "deciding";
        } else if (context.askedQuestions.length > 1) {
            context.stage = "exploring";
        }

        return response;
    }

    // Get learning statistics
    public static getLearningStats() {
        return {
            totalInteractions: learningData.userInteractions.length,
            uniquePatterns: learningData.patterns.size,
            knowledgeBaseSize: knowledgeBase.length,
            averageSuccessRate: knowledgeBase.reduce((sum, item) => sum + item.successRate, 0) / knowledgeBase.length,
            recentFailures: learningData.failedQueries.filter(fq =>
                Date.now() - fq.timestamp.getTime() < 24 * 60 * 60 * 1000
            ).length,
            topPatterns: Array.from(learningData.commonPhrases.entries())
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10),
            lastLearningUpdate: new Date().toISOString()
        };
    }

    // Manual learning from feedback
    public static provideFeedback(sessionId: string, messageIndex: number, wasHelpful: boolean, feedback?: string) {
        const context = conversations.get(sessionId);
        if (!context || !context.askedQuestions[messageIndex]) {
            return false;
        }

        const message = context.askedQuestions[messageIndex];
        const interaction = learningData.userInteractions.find(
            int => int.sessionId === sessionId && int.input === message
        );

        if (interaction) {
            interaction.wasHelpful = wasHelpful;
            interaction.rating = wasHelpful ? 5 : 2;

            // Re-learn from this interaction
            MachineLearning.learnFromInteraction(
                interaction.input,
                interaction.response,
                sessionId,
                wasHelpful
            );

            return true;
        }

        return false;
    }
}

// Enhanced API handler with learning capabilities
export async function POST(req: Request) {
    try {
        const { message, sessionId, feedback, action } = await req.json();

        // Handle different actions
        switch (action) {
            case 'feedback':
                const success = LearningChatBot.provideFeedback(
                    sessionId,
                    feedback.messageIndex,
                    feedback.wasHelpful,
                    feedback.comment
                );

                return NextResponse.json({
                    success,
                    message: success ? "Thank you for your feedback! I'm learning from it." : "Feedback not recorded"
                });

            case 'stats':
                return NextResponse.json({
                    stats: LearningChatBot.getLearningStats()
                });

            default:
                // Regular chat processing
                if (!message?.trim()) {
                    return NextResponse.json({
                        reply: "I didn't receive your message. Could you please try again?",
                        error: "empty_message"
                    });
                }

                // Process with intelligent learning bot
                const reply = LearningChatBot.processMessage(message, sessionId, feedback);

                // Simulate realistic typing delay based on response length
                const baseDelay = 800;
                const lengthDelay = Math.min(reply.length * 8, 2500);
                const totalDelay = baseDelay + lengthDelay;

                await new Promise(resolve => setTimeout(resolve, totalDelay));

                // Get current learning stats for response metadata
                const stats = LearningChatBot.getLearningStats();

                return NextResponse.json({
                    reply,
                    timestamp: new Date().toISOString(),
                    confidence: "high",
                    learningStats: {
                        totalInteractions: stats.totalInteractions,
                        knowledgeBaseSize: stats.knowledgeBaseSize,
                        isLearning: true
                    },
                    metadata: {
                        sessionId,
                        messageLength: message.length,
                        processingTime: totalDelay
                    }
                });
        }

    } catch (error) {
        console.error("Chat API Error:", error);

        return NextResponse.json({
            reply: "I'm experiencing some technical difficulties right now. However, I'm continuously learning and improving! Please try again in a moment, or contact our support team for immediate assistance!",
            error: "server_error",
            learningActive: true
        }, { status: 500 });
    }
}