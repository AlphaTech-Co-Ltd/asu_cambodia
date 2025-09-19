import { NextResponse } from "next/server";

// ASU-specific search and learning interfaces
interface SearchResult {
    title: string;
    snippet: string;
    url: string;
    relevance: number;
    category: 'academic' | 'visa' | 'admission' | 'general';
}

interface DataItem {
    title?: string;
    snippet?: string;
    link?: string;
}


interface WebSearchService {
    search(query: string, asuContext?: boolean): Promise<SearchResult[]>;
}

// ASU-focused search implementation
class ASUSearchService implements WebSearchService {
    private apiKey = process.env.GOOGLE_API_KEY || '';
    private searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID || '';

    async search(query: string, asuContext: boolean = true): Promise<SearchResult[]> {
        // Enhance query with ASU Cambodia context
        const enhancedQuery = asuContext
            ? `Angelo State University Cambodia ${query} study abroad visa`
            : query;

        if (!this.apiKey || !this.searchEngineId) {
            return this.fallbackSearch(enhancedQuery);
        }

        try {
            const response = await fetch(
                `https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.searchEngineId}&q=${encodeURIComponent(enhancedQuery)}&num=8`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            if (!response.ok) {
                return this.fallbackSearch(enhancedQuery);
            }

            const data = await response.json();

            return (data.items || []).map((item: DataItem, index: number) => ({
                title: item.title,
                snippet: item.snippet,
                url: item.link,
                relevance: 1 - index * 0.1,
                category: this.categorizeResult(`${item.title} ${item.snippet}`)
            }));
        } catch (error) {
            console.error('ASU Search error:', error);
            return this.fallbackSearch(enhancedQuery);
        }
    }

    private categorizeResult(content: string): 'academic' | 'visa' | 'admission' | 'general' {
        const lowerContent = content.toLowerCase();

        if (lowerContent.includes('visa') || lowerContent.includes('immigration')) {
            return 'visa';
        }
        if (lowerContent.includes('admission') || lowerContent.includes('apply') || lowerContent.includes('enrollment')) {
            return 'admission';
        }
        if (lowerContent.includes('course') || lowerContent.includes('program') || lowerContent.includes('degree')) {
            return 'academic';
        }
        return 'general';
    }

    private fallbackSearch(query: string): SearchResult[] {
        // Basic fallback when APIs are unavailable
        return [{
            title: "ASU Cambodia Information",
            snippet: "I'm searching for the latest information about Angelo State University programs in Cambodia. Please contact our office for current details.",
            url: "contact",
            relevance: 0.5,
            category: 'general'
        }];
    }
}

// ASU Knowledge Item structure
interface ASUKnowledgeItem {
    id: string;
    keywords: string[];
    khmerKeywords: string[];
    patterns: RegExp[];
    response: string;
    khmerResponse?: string;
    category: 'visa' | 'academic' | 'admission' | 'contact' | 'success_stories' | 'services';
    confidence: number;
    usageCount: number;
    successRate: number;
    lastUsed: Date;
    lastUpdated: Date;
    webSearchEnabled: boolean;
    autoUpdate: boolean;
    sources: string[];
    userFeedback: Array<{
        rating: number;
        feedback?: string;
        timestamp: Date;
        language: 'en' | 'km';
    }>;
    searchData?: {
        lastSearchQuery?: string;
        lastSearchTime?: Date;
        searchResults?: SearchResult[];
        webEnhancedResponse?: string;
    };
}

// Auto-learning data for ASU context
interface ASULearningData {
    patterns: Map<string, {
        frequency: number;
        responses: string[];
        khmerResponses: string[];
        context: string[];
        successRate: number;
        category: string;
        lastWebUpdate: Date;
    }>;
    userInteractions: Array<{
        input: string;
        response: string;
        timestamp: Date;
        sessionId: string;
        wasHelpful?: boolean;
        language: 'en' | 'km';
        category: string;
        searchUsed?: boolean;
        responseTime: number;
    }>;
    studentQueries: Map<string, number>;
    visaQuestions: Map<string, number>;
    successStories: Array<{
        studentName: string;
        program: string;
        achievement: string;
        timestamp: Date;
    }>;
    contactRequests: Array<{
        type: string;
        timestamp: Date;
        resolved: boolean;
    }>;
    trendingTopics: Map<string, { count: number; lastSeen: Date; category: string }>;
}

// Initialize ASU learning data
const asuLearningData: ASULearningData = {
    patterns: new Map(),
    userInteractions: [],
    studentQueries: new Map(),
    visaQuestions: new Map(),
    successStories: [
        {
            studentName: "Sonika Ketyarath",
            program: "Chemistry",
            achievement: "Third-year Chemistry major working on soybean oil extraction project",
            timestamp: new Date()
        }
    ],
    contactRequests: [],
    trendingTopics: new Map()
};

// ASU Cambodia Knowledge Base
const asuKnowledgeBase: ASUKnowledgeItem[] = [
    {
        id: "greeting",
        keywords: ["hello", "hi", "សួស្តី", "អូន"],
        khmerKeywords: ["សួស្តី", "ជំរាបសួរ", "អូន"],
        patterns: [/^(hi|hello|hey|សួស្តី)/i],
        response: "Hello! Welcome to ASU Cambodia Information Center. I'm here to help you learn about Angelo State University opportunities for Cambodian students.",
        khmerResponse: "សួស្តី! ស្វាគមន៍មកកាន់មជ្ឈមណ្ឌលព័ត៌មាន ASU កម្ពុជា។ ខ្ញុំនៅទីនេះដើម្បីជួយអ្នកស្វែងយល់អំពីឱកាសសិក្សានៅ Angelo State University សម្រាប់សិស្សកម្ពុជា។",
        category: "contact",
        confidence: 0.95,
        usageCount: 0,
        successRate: 0.95,
        lastUsed: new Date(),
        lastUpdated: new Date(),
        webSearchEnabled: false,
        autoUpdate: false,
        sources: [],
        userFeedback: []
    },
    {
        id: "services_overview",
        keywords: ["services", "what do you offer", "help", "assistance", "សេវាកម្ម"],
        khmerKeywords: ["សេវាកម្ម", "ជំនួយ", "ផ្តល់ជូន"],
        patterns: [/what.*services/i, /what.*offer/i, /អ្វីខ្លះ.*សេវា/i],
        response: `🎓 **ASU Cambodia Services**

We provide comprehensive support for Cambodian students:

**📋 Our Services Include:**
• Student visa consultation and processing for USA
• Tourism visa assistance for USA
• Study abroad opportunities at Angelo State University & Australia
• Degree programs: Bachelor's, Master's, PhD & Vocational training
• Special pricing like US/Australian citizens

**🏢 Contact Information:**
• Location: The Base Building, near Tuol Kork Antenna
• Phone: 023-902300 / 096-9767031  
• Telegram: @Ambitious_Students_ubiquitous

We are the **exclusive representative** for ASU in Cambodia!`,
        khmerResponse: `🎓 **សេវាកម្ម ASU កម្ពុជា**

យើងផ្តល់ការគាំទ្រពេញលេញសម្រាប់សិស្សកម្ពុជា:

**📋 សេវាកម្មរបស់យើង:**
• ប្រឹក្សា និងរៀបចំវីសារសិស្សទៅអាមេរិក
• ជំនួយវីសារទេសចរណ៍ទៅអាមេរិក  
• ឱកាសសិក្សាបរទេសនៅ Angelo State University និងអូស្ត្រាលី
• កម្មវិធីសិក្សា: បរិញ្ញាប័ត្រ, អនុបណ្ឌិត, បណ្ឌិត និងសាលាជំនាញ
• តម្លៃពិសេសដូចពលរដ្ឋអាមេរិក និងអូស្ត្រាលី

**🏢 ព័ត៌មានទំនាក់ទំនង:**
• ទីតាំង: អាគារ The Base ជិតអង់តែនទួលគោក
• ទូរស័ព្ទ: 023-902300 / 096-9767031
• Telegram: @Ambitious_Students_ubiquitous

យើងជាតំណាងពេញសិទ្ធិតែមួយគត់នៅកម្ពុជា!`,
        category: "services",
        confidence: 0.95,
        usageCount: 0,
        successRate: 0.90,
        lastUsed: new Date(),
        lastUpdated: new Date(),
        webSearchEnabled: true,
        autoUpdate: true,
        sources: ["ASU Cambodia Official"],
        userFeedback: []
    },
    {
        id: "student_visa",
        keywords: ["student visa", "visa", "F1", "study visa", "វីសារសិស្ស"],
        khmerKeywords: ["វីសារសិស្ស", "វីសារសិក្សា", "F1"],
        patterns: [/student.*visa/i, /F1.*visa/i, /វីសារ.*សិស្ស/i],
        response: `🛂 **Student Visa Services (F-1 Visa)**

**✅ What We Provide:**
• Complete F-1 student visa consultation
• Document preparation and review
• Interview preparation and coaching  
• Application timeline management
• Post-arrival support guidance

**📋 Required Documents:**
• Valid passport
• I-20 form from ASU
• Financial documents (bank statements, sponsorship)
• Academic transcripts
• English proficiency scores (TOEFL/IELTS)
• Visa application fee payment

**⏱️ Processing Timeline:**
• Application preparation: 2-4 weeks
• Embassy interview: 1-3 weeks wait time
• Visa processing: 3-5 business days

**💡 Success Rate:** 95% approval rate for our students!

Need assistance with your student visa? Contact us for personalized guidance.`,
        category: "visa",
        confidence: 0.92,
        usageCount: 0,
        successRate: 0.95,
        lastUsed: new Date(),
        lastUpdated: new Date(),
        webSearchEnabled: true,
        autoUpdate: true,
        sources: ["US Embassy Cambodia", "ASU International Office"],
        userFeedback: []
    },
    {
        id: "tourism_visa",
        keywords: ["tourism visa", "tourist visa", "B2", "travel visa", "វីសារទេសចរណ៍"],
        khmerKeywords: ["វីសារទេសចរណ៍", "វីសារធ្វើដំណើរ", "B2"],
        patterns: [/tour(ism|ist).*visa/i, /travel.*visa/i, /B2.*visa/i, /វីសារ.*ទេសចរណ៍/i],
        response: `🌍 **Tourism Visa Services (B-2 Visa)**

**✅ Our Tourism Visa Services:**
• B-2 tourist visa consultation
• Travel itinerary planning assistance
• Documentation preparation
• Interview preparation
• Travel insurance guidance

**📋 Required Documents:**
• Valid passport (6+ months validity)
• Completed DS-160 form
• Visa fee payment receipt
• Photo meeting specifications
• Proof of employment/income
• Travel itinerary
• Hotel reservations
• Return ticket booking

**💰 Estimated Costs:**
• US visa fee: $160
• Service fee: Contact for current rates
• Additional documents: Variable

**⏱️ Processing Time:** 
• Standard processing: 7-14 days
• Emergency processing: 3-5 days (additional fee)

Ready to explore America? Let us handle your tourism visa process!`,
        category: "visa",
        confidence: 0.90,
        usageCount: 0,
        successRate: 0.88,
        lastUsed: new Date(),
        lastUpdated: new Date(),
        webSearchEnabled: true,
        autoUpdate: true,
        sources: ["US Embassy Cambodia"],
        userFeedback: []
    },
    {
        id: "asu_programs",
        keywords: ["Angelo State", "ASU", "programs", "degrees", "majors", "courses"],
        khmerKeywords: ["កម្មវិធីសិក្សា", "ជំនាញ", "សាកលវិទ្យាល័យ"],
        patterns: [/Angelo.*State/i, /ASU.*program/i, /degree.*program/i],
        response: `🎓 **Angelo State University Programs**

**🏛️ About Angelo State University:**
• Located in San Angelo, Texas, USA
• Founded in 1928 - Nearly 100 years of excellence
• Over 100+ undergraduate and graduate programs
• Small class sizes with personalized attention

**📚 Popular Programs for International Students:**
• **Business Administration** - Marketing, Finance, Management
• **Engineering** - Mechanical, Computer, Civil Engineering  
• **Computer Science** - Software Development, Cybersecurity
• **Health Sciences** - Nursing, Kinesiology, Psychology
• **Chemistry** - Like our success story student Sonika Ketyarath!
• **Agriculture & Environmental Sciences**

**🌟 Special Advantages:**
• In-state tuition rates for international students
• Small campus community (10,000+ students)
• Excellent faculty-to-student ratio
• Strong career services and job placement
• Pathway programs available for English improvement

**💰 Tuition Benefits:**
• Same rates as US residents
• Scholarship opportunities available
• Work-study programs permitted

Want to know more about specific programs? I can provide detailed information!`,
        category: "academic",
        confidence: 0.94,
        usageCount: 0,
        successRate: 0.92,
        lastUsed: new Date(),
        lastUpdated: new Date(),
        webSearchEnabled: true,
        autoUpdate: true,
        sources: ["Angelo State University Official", "ASU Academic Catalog"],
        userFeedback: []
    },
    {
        id: "australia_programs",
        keywords: ["Australia", "Australian university", "study Australia", "អូស្ត្រាលី"],
        khmerKeywords: ["អូស្ត្រាលី", "សិក្សាអូស្ត្រាលី"],
        patterns: [/Australia/i, /Australian.*study/i, /អូស្ត្រាលី/i],
        response: `🇦🇺 **Study in Australia Programs**

**✅ Australian University Partners:**
• Multiple university partnerships across Australia
• Bachelor's, Master's, and PhD programs
• Vocational and technical training options
• Pathway programs for international students

**🌟 Benefits of Studying in Australia:**
• High-quality education system
• Post-study work opportunities
• Multicultural environment
• Beautiful climate and lifestyle
• Strong job market for graduates

**💰 Special Pricing:**
• Same tuition rates as Australian residents
• Reduced international student fees
• Scholarship opportunities available
• Work rights during studies (20 hours/week)

**📋 Popular Fields:**
• Engineering & Technology
• Business & Management  
• Health Sciences & Medicine
• Information Technology
• Hospitality & Tourism

**🛂 Visa Support:**
• Student visa (subclass 500) assistance
• Post-study work visa guidance
• Permanent residency pathway information

Contact us for detailed information about Australian university options and admission requirements!`,
        category: "academic",
        confidence: 0.91,
        usageCount: 0,
        successRate: 0.89,
        lastUsed: new Date(),
        lastUpdated: new Date(),
        webSearchEnabled: true,
        autoUpdate: true,
        sources: ["Australian Universities", "Department of Home Affairs Australia"],
        userFeedback: []
    },
    {
        id: "success_stories",
        keywords: ["success", "student", "Sonika", "chemistry", "graduate", "រឿងជោគជ័យ"],
        khmerKeywords: ["ជោគជ័យ", "សិស្ស", "បញ្ចប់ការ�សិក្សា"],
        patterns: [/success.*story/i, /Sonika/i, /graduate.*story/i, /រឿង.*ជោគជ័យ/i],
        response: `🌟 **Student Success Stories**

**👩‍🔬 Featured Success: Sonika Ketyarath**
• **Program:** Chemistry Major (3rd Year)  
• **University:** Angelo State University
• **Current Project:** Soybean oil extraction research
• **Achievement:** Excelling in one of ASU's most challenging majors

*"From the classroom to the laboratory — turning knowledge into action! Her dedication and passion for science are proof that Cambodia is gaining a valuable human resource for the future. Truly proud of her!"*

**🎯 What Makes Our Students Successful:**
• Rigorous academic preparation before departure
• Continuous support during studies
• Strong foundation in English and academics
• Cultural adaptation assistance
• Career guidance and internship support

**📈 Our Track Record:**
• 95% student visa approval rate
• 90% of students maintain good academic standing
• High graduation rates across all programs
• Many students secure internships and jobs

**💪 Why Cambodian Students Excel at ASU:**
• Strong work ethic and determination
• Excellent mathematical and analytical skills
• Adaptability and resilience
• Cultural diversity brings fresh perspectives

Your success story could be next! Ready to join our achievers at Angelo State University?`,
        category: "success_stories",
        confidence: 0.96,
        usageCount: 0,
        successRate: 0.94,
        lastUsed: new Date(),
        lastUpdated: new Date(),
        webSearchEnabled: false,
        autoUpdate: true,
        sources: ["ASU Cambodia Success Records"],
        userFeedback: []
    },
    {
        id: "contact_info",
        keywords: ["contact", "address", "phone", "telegram", "location", "ទំនាក់ទំនង"],
        khmerKeywords: ["ទំនាក់ទំនង", "អាសយដ្ឋាន", "ទូរ�ស័ព្ទ"],
        patterns: [/contact.*info/i, /address/i, /phone.*number/i, /ទំនាក់ទំនង/i],
        response: `📞 **Contact ASU Cambodia**

**🏢 Office Location:**
The Base Building (អាគារ The Base)
Near Tuol Kork Antenna (ជិតអង់តែនទួលគោក)
Phnom Penh, Cambodia

**📱 Phone Numbers:**
• Main Office: 023-902300
• Mobile/WhatsApp: 096-9767031

**💬 Digital Contact:**
• Telegram: @Ambitious_Students_ubiquitous
• Email: cambodiaasu@gmail.com (if available)

**🕐 Office Hours:**
• Monday - Friday: 8:00 AM - 5:00 PM
• Saturday: 8:00 AM - 12:00 PM  
• Sunday: Closed

**🚗 How to Find Us:**
• Located in Tuol Kork district
• Near the prominent Tuol Kork antenna
• Easy access by tuk-tuk, car, or moto
• Parking available

**💡 Best Times to Visit:**
• Morning (8:00-11:00 AM) for consultations
• Afternoon (2:00-4:00 PM) for document submission
• Call ahead to schedule appointments

**🌟 Why Visit Our Office:**
• Face-to-face consultation with experts
• Document review and verification
• Personalized guidance for your situation
• Meet our experienced counselors

Ready to start your journey? Contact us today!`,
        category: "contact",
        confidence: 0.98,
        usageCount: 0,
        successRate: 0.96,
        lastUsed: new Date(),
        lastUpdated: new Date(),
        webSearchEnabled: false,
        autoUpdate: false,
        sources: ["ASU Cambodia Office"],
        userFeedback: []
    }
];

// ASU Learning Engine
class ASULearningEngine {
    static extractASUFeatures(text: string): string[] {
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 1);

        const features = [...words];

        // ASU-specific feature patterns
        if (text.match(/វីសារ|visa/i)) features.push('_VISA_INQUIRY');
        if (text.match(/សិក្សា|study|education/i)) features.push('_EDUCATION_INQUIRY');
        if (text.match(/Angelo|ASU/i)) features.push('_ASU_SPECIFIC');
        if (text.match(/Australia|អូស្ត្រាលី/i)) features.push('_AUSTRALIA_INQUIRY');
        if (text.match(/ទំនាក់ទំនង|contact|phone/i)) features.push('_CONTACT_REQUEST');
        if (text.match(/តម្លៃ|price|cost|fee/i)) features.push('_PRICING_INQUIRY');

        // Add bigrams for better context
        for (let i = 0; i < words.length - 1; i++) {
            features.push(`${words[i]} ${words[i + 1]}`);
        }

        return features;
    }

    static async learnFromASUInteraction(
        input: string,
        response: string,
        sessionId: string,
        wasHelpful?: boolean,
        language: 'en' | 'km' = 'en'
    ): Promise<void> {
        const features = this.extractASUFeatures(input);
        const category = this.categorizeQuery(input);

        // Store interaction
        asuLearningData.userInteractions.push({
            input,
            response,
            timestamp: new Date(),
            sessionId,
            wasHelpful,
            language,
            category,
            responseTime: 0
        });

        // Update pattern learning
        for (const feature of features) {
            if (!asuLearningData.patterns.has(feature)) {
                asuLearningData.patterns.set(feature, {
                    frequency: 0,
                    responses: [],
                    khmerResponses: [],
                    context: [],
                    successRate: 0.5,
                    category,
                    lastWebUpdate: new Date()
                });
            }

            const pattern = asuLearningData.patterns.get(feature)!;
            pattern.frequency++;

            if (language === 'km') {
                if (!pattern.khmerResponses.includes(response)) {
                    pattern.khmerResponses.push(response);
                }
            } else {
                if (!pattern.responses.includes(response)) {
                    pattern.responses.push(response);
                }
            }

            if (wasHelpful !== undefined) {
                pattern.successRate = (pattern.successRate * (pattern.frequency - 1) + (wasHelpful ? 1 : 0)) / pattern.frequency;
            }
        }

        // Update category-specific learning
        this.updateCategoryLearning(input, category);
    }

    private static categorizeQuery(input: string): string {
        const lower = input.toLowerCase();

        if (lower.match(/វីសារ|visa/)) return 'visa';
        if (lower.match(/program|degree|major|course/)) return 'academic';
        if (lower.match(/contact|phone|address/)) return 'contact';
        if (lower.match(/success|graduate|student/)) return 'success_stories';
        if (lower.match(/service|help|assist/)) return 'services';

        return 'general';
    }

    private static updateCategoryLearning(input: string, category: string): void {
        // Update student queries tracking
        if (category === 'academic') {
            const count = asuLearningData.studentQueries.get(input) || 0;
            asuLearningData.studentQueries.set(input, count + 1);
        }

        // Update visa questions tracking
        if (category === 'visa') {
            const count = asuLearningData.visaQuestions.get(input) || 0;
            asuLearningData.visaQuestions.set(input, count + 1);
        }

        // Update trending topics
        const trendingData = asuLearningData.trendingTopics.get(input);
        if (trendingData) {
            trendingData.count++;
            trendingData.lastSeen = new Date();
        } else {
            asuLearningData.trendingTopics.set(input, {
                count: 1,
                lastSeen: new Date(),
                category
            });
        }
    }

    static async performASUSearch(query: string): Promise<SearchResult[]> {
        const searchService = new ASUSearchService();
        return await searchService.search(query, true);
    }

    static generateASUResponse(
        baseResponse: string,
        searchResults: SearchResult[],
        language: 'en' | 'km' = 'en'
    ): string {
        if (searchResults.length === 0) return baseResponse;

        let enhancedResponse = baseResponse;

        // Add web-enhanced information
        enhancedResponse += `\n\n**📡 Latest Information:**\n`;

        searchResults.slice(0, 3).forEach((result, index) => {
            enhancedResponse += `\n${index + 1}. **${result.title}**\n   ${result.snippet}\n`;
        });

        if (language === 'km') {
            enhancedResponse += `\n*ព័ត៌មានបានប្រមូលពីប្រភពចុងក្រោយបំផុត*`;
        } else {
            enhancedResponse += `\n*Information gathered from current sources*`;
        }

        return enhancedResponse;
    }
}

// Main ASU Chatbot
class ASUChatBot {
    private static detectLanguage(message: string): 'en' | 'km' {
        // Simple language detection based on Unicode ranges
        const khmerChars = /[\u1780-\u17FF]/;
        return khmerChars.test(message) ? 'km' : 'en';
    }

    private static async findBestASUMatch(message: string): Promise<ASUKnowledgeItem | null> {
        let bestMatch: ASUKnowledgeItem | null = null;
        let highestScore = 0;
        const language = this.detectLanguage(message);

        for (const item of asuKnowledgeBase) {
            let score = 0;
            const keywords = language === 'km' ? item.khmerKeywords : item.keywords;

            // Keyword matching
            for (const keyword of keywords) {
                if (message.toLowerCase().includes(keyword.toLowerCase())) {
                    score += 3;
                }
            }

            // Pattern matching
            for (const pattern of item.patterns) {
                if (pattern.test(message)) {
                    score += 4;
                }
            }

            // Success rate and usage bonus
            score += item.successRate * 2;
            score += Math.min(item.usageCount / 10, 1);

            // Recent update bonus
            const daysSinceUpdate = (Date.now() - item.lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
            if (daysSinceUpdate < 7) score += 0.5;

            if (score > highestScore && score >= 2) {
                highestScore = score;
                bestMatch = item;
            }
        }

        return bestMatch;
    }

    public static async processASUMessage(
        message: string,
        sessionId: string = "default"
    ): Promise<{
        reply: string;
        language: "en" | "km";
        category: string;
        searchUsed: boolean;
        confidence: number;
        responseTime: number
    }> {
        const startTime = Date.now();
        const language = this.detectLanguage(message);
        let searchUsed = false;
        let sources: string[] = [];

        try {
            // Find best knowledge match
            const bestMatch = await this.findBestASUMatch(message);
            let response = "";
            let category = "general";
            let confidence = 0;

            if (bestMatch) {
                // Use appropriate language response
                response = language === 'km' && bestMatch.khmerResponse
                    ? bestMatch.khmerResponse
                    : bestMatch.response;

                category = bestMatch.category;
                confidence = bestMatch.confidence;
                sources = bestMatch.sources;

                // Update usage stats
                bestMatch.usageCount++;
                bestMatch.lastUsed = new Date();

                // Check if web search should enhance response
                if (bestMatch.webSearchEnabled) {
                    searchUsed = true;
                    try {
                        const searchResults = await ASULearningEngine.performASUSearch(message);
                        if (searchResults.length > 0) {
                            response = ASULearningEngine.generateASUResponse(response, searchResults, language);
                            sources = [...sources, ...searchResults.map(r => r.url)];
                            confidence = Math.min(confidence + 0.05, 0.98);

                            // Update knowledge item with search data
                            bestMatch.searchData = {
                                lastSearchQuery: message,
                                lastSearchTime: new Date(),
                                searchResults,
                                webEnhancedResponse: response
                            };
                            bestMatch.lastUpdated = new Date();
                        }
                    } catch (error) {
                        console.warn('ASU search failed:', error);
                    }
                }
            } else {
                // No knowledge match - try web search for ASU-related queries
                searchUsed = true;
                category = "general";
                confidence = 0.6;

                try {
                    const searchResults = await ASULearningEngine.performASUSearch(message);
                    if (searchResults.length > 0) {
                        const baseResponse = language === 'km'
                            ? "ខ្ញុំរកឃើញព័ត៌មានមួយចំនួនអំពីសំណួររបស់អ្នក:"
                            : "I found some information about your question:";

                        response = ASULearningEngine.generateASUResponse(baseResponse, searchResults, language);
                        sources = searchResults.map(r => r.url);
                        confidence = 0.75;
                    } else {
                        response = this.generateASUFallback(message, language);
                        confidence = 0.4;
                    }
                } catch (error) {
                    response = this.generateASUFallback(message, language);
                    confidence = 0.3;
                }
            }

            const responseTime = Date.now() - startTime;

            // Learn from this interaction
            await ASULearningEngine.learnFromASUInteraction(
                message,
                response,
                sessionId,
                undefined,
                language
            );

            return {
                reply: response,
                language,
                category,
                searchUsed,
                confidence,
                responseTime
            };

        } catch (error) {
            console.error("ASU ChatBot Error:", error);

            const fallbackResponse = this.generateASUFallback(message, this.detectLanguage(message));
            const responseTime = Date.now() - startTime;

            return {
                reply: fallbackResponse,
                language: this.detectLanguage(message),
                category: "error",
                searchUsed: false,
                confidence: 0.2,
                responseTime
            };
        }
    }

    private static generateASUFallback(message: string, language: 'en' | 'km'): string {
        const fallbacks = {
            en: [
                "I'm still learning about that topic. As the exclusive ASU Cambodia representative, I can connect you with our expert counselors for detailed information. Please contact us at 023-902300 or visit The Base Building near Tuol Kork Antenna.",
                "That's an interesting question about ASU or studying abroad! While I continue learning, our experienced team can provide you with personalized guidance. Call 096-9767031 or message us on Telegram @Ambitious_Students_ubiquitous.",
                "I'm expanding my knowledge about ASU programs daily. For immediate assistance with student visas, academic programs, or application processes, please contact our office directly. We're here to help make your study abroad dreams come true!"
            ],
            km: [
                "ខ្ញុំកំពុងរៀនអំពីប្រធានបទនេះ។ ជាតំណាងពេញសិទ្ធិ ASU កម្ពុជាតែមួយគត់ ខ្ញុំអាចភ្ជាប់អ្នកជាមួយប្រឹក្សាជំនាញរបស់យើងសម្រាប់ព័ត៌មានលម្អិត។ សូមទាក់ទងមកយើងតាម 023-902300 ឬមកការិយាល័យនៅអាគារ The Base ជិតអង់តែនទួលគោក។",
                "នេះជាសំណួរគួរឱ្យចាប់អារម្មណ៍អំពី ASU ឬការសិក្សាបរទេស! ខណៈដែលខ្ញុំបន្តរៀនសូត្រ ក្រុមការងារដែលមានបទពិសោធន៍របស់យើងអាចផ្តល់ការណែនាំផ្ទាល់ខ្លួនដល់អ្នក។ ទូរស័ព្ទ 096-9767031 ឬផ្ញើសារតាម Telegram @Ambitious_Students_ubiquitous។",
                "ខ្ញុំកំពុងពង្រីកចំណេះដឹងរបស់ខ្ញុំអំពីកម្មវិធី ASU ជារៀងរាល់ថ្ងៃ។ សម្រាប់ជំនួយបន្ទាន់ជាមួយវីសារសិស្ស កម្មវិធីសិក្សា ឬដំណើរការដាក់ពាក្យ សូមទាក់ទងការិយាល័យរបស់យើងដោយផ្ទាល់។ យើងនៅទីនេះដើម្បីជួយធ្វើឱ្យសុបិនសិក្សាបរទេសរបស់អ្នកកាយជាការពិត!"
            ]
        };

        const languageFallbacks = fallbacks[language];
        return languageFallbacks[Math.floor(Math.random() * languageFallbacks.length)];
    }

    // Auto-generate new ASU knowledge from frequent queries
    private static async autoGenerateASUKnowledge(): Promise<void> {
        // Analyze frequently asked questions that don't have good matches
        const frequentQueries = Array.from(asuLearningData.trendingTopics.entries())
            .filter(([query, data]) => data.count >= 5)
            .sort(([,a], [,b]) => b.count - a.count)
            .slice(0, 5);

        for (const [query, data] of frequentQueries) {
            // Check if we already have knowledge for this query
            const hasExistingKnowledge = asuKnowledgeBase.some(kb =>
                kb.keywords.some(keyword => query.toLowerCase().includes(keyword.toLowerCase())) ||
                kb.khmerKeywords.some(keyword => query.includes(keyword))
            );

            if (!hasExistingKnowledge) {
                // Generate new knowledge item
                const newItem = await this.createASUKnowledgeItem(query, data.category);
                if (newItem) {
                    asuKnowledgeBase.push(newItem);
                    console.log(`Auto-generated ASU knowledge: ${newItem.id}`);
                }
            }
        }
    }

    private static async createASUKnowledgeItem(query: string, category: string): Promise<ASUKnowledgeItem | null> {
        const features = ASULearningEngine.extractASUFeatures(query);
        const language = this.detectLanguage(query);

        // Search for current information to create response
        let searchResults: SearchResult[] = [];
        try {
            searchResults = await ASULearningEngine.performASUSearch(query);
        } catch (error) {
            console.warn('Failed to search for auto-knowledge generation:', error);
        }

        if (searchResults.length === 0) return null;

        const response = language === 'km'
            ? `បានតាមការស្វែងយល់របស់អ្នកអំពី ${query}, នេះគឺជាព័ត៌មានដែលខ្ញុំរកឃើញ៖`
            : `Based on your inquiry about ${query}, here's what I found:`;

        const enhancedResponse = ASULearningEngine.generateASUResponse(response, searchResults, language);

        type Category =
            | "academic"
            | "visa"
            | "admission"
            | "contact"
            | "success_stories"
            | "services";

// Helper to ensure the category is valid
        function getValidCategory(cat: string): Category {
            const valid: Category[] = [
                "academic",
                "visa",
                "admission",
                "contact",
                "success_stories",
                "services",
            ];

            return valid.includes(cat as Category) ? (cat as Category) : "academic"; // fallback default
        }

        const newItem: ASUKnowledgeItem = {
            id: `auto_${category}_${Date.now()}`,
            keywords: features.filter(f => !f.startsWith('_') && f.length > 2).slice(0, 5),
            khmerKeywords: language === 'km' ? [query.slice(0, 20)] : [],
            patterns: [new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')],
            response: enhancedResponse,
            khmerResponse: language === 'km' ? enhancedResponse : undefined,
            category: getValidCategory(category), // ✅ safe assignment
            confidence: 0.7,
            usageCount: 0,
            successRate: 0.6,
            lastUsed: new Date(),
            lastUpdated: new Date(),
            webSearchEnabled: true,
            autoUpdate: true,
            sources: searchResults.map(r => r.url),
            userFeedback: []
        };

        return newItem;
    }

    // Get comprehensive ASU learning statistics
    public static getASUStats() {
        const totalInteractions = asuLearningData.userInteractions.length;
        const khmerInteractions = asuLearningData.userInteractions.filter(int => int.language === 'km').length;

        const categoryStats = asuKnowledgeBase.reduce((acc, kb) => {
            acc[kb.category] = (acc[kb.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const topTrending = Array.from(asuLearningData.trendingTopics.entries())
            .sort(([,a], [,b]) => b.count - a.count)
            .slice(0, 10);

        return {
            totalInteractions,
            khmerInteractions,
            englishInteractions: totalInteractions - khmerInteractions,
            knowledgeBaseSize: asuKnowledgeBase.length,
            autoLearnedItems: asuKnowledgeBase.filter(kb => kb.id.startsWith('auto_')).length,
            categoryBreakdown: categoryStats,
            studentQueries: asuLearningData.studentQueries.size,
            visaQuestions: asuLearningData.visaQuestions.size,
            successStories: asuLearningData.successStories.length,
            trendingTopics: topTrending,
            averageConfidence: asuKnowledgeBase.reduce((sum, kb) => sum + kb.confidence, 0) / asuKnowledgeBase.length,
            lastUpdate: new Date().toISOString(),
            languages: ['English', 'Khmer'],
            specializtion: 'Angelo State University & Study Abroad Services'
        };
    }

    // Provide feedback and improve learning
    public static async provideASUFeedback(
        sessionId: string,
        messageIndex: number,
        wasHelpful: boolean,
        feedback?: string,
        language: 'en' | 'km' = 'en'
    ): Promise<boolean> {
        const interaction = asuLearningData.userInteractions.find(
            int => int.sessionId === sessionId &&
                asuLearningData.userInteractions.indexOf(int) === messageIndex
        );

        if (!interaction) return false;

        interaction.wasHelpful = wasHelpful;

        // Find corresponding knowledge item and update
        const matchingKB = asuKnowledgeBase.find(kb =>
            kb.response.includes(interaction.response.slice(0, 50)) ||
            (kb.khmerResponse && kb.khmerResponse.includes(interaction.response.slice(0, 50)))
        );

        if (matchingKB) {
            matchingKB.userFeedback.push({
                rating: wasHelpful ? 5 : 2,
                feedback,
                timestamp: new Date(),
                language
            });

            // Update success rate
            const totalFeedback = matchingKB.userFeedback.length;
            const positiveFeeback = matchingKB.userFeedback.filter(fb => fb.rating >= 4).length;
            matchingKB.successRate = positiveFeeback / totalFeedback;
        }

        // Re-learn from this interaction
        await ASULearningEngine.learnFromASUInteraction(
            interaction.input,
            interaction.response,
            sessionId,
            wasHelpful,
            interaction.language
        );

        // If negative feedback, trigger auto-improvement
        if (!wasHelpful) {
            await this.autoGenerateASUKnowledge();
        }

        return true;
    }

    // Add new information manually
    public static addASUInformation(
        keywords: string[],
        khmerKeywords: string[],
        response: string,
        khmerResponse: string,
        category: string,
        sources: string[] = []
    ): string {
        const newItem: ASUKnowledgeItem = {
            id: `manual_${Date.now()}`,
            keywords,
            khmerKeywords,
            patterns: keywords.map(kw => new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')),
            response,
            khmerResponse,
            category: category as never,
            confidence: 0.9,
            usageCount: 0,
            successRate: 0.8,
            lastUsed: new Date(),
            lastUpdated: new Date(),
            webSearchEnabled: true,
            autoUpdate: true,
            sources,
            userFeedback: []
        };

        asuKnowledgeBase.push(newItem);
        return newItem.id;
    }
}

// Enhanced API handler for ASU Cambodia
export async function POST(req: Request) {
    try {
        const { message, sessionId, feedback, action, newInfo } = await req.json();

        switch (action) {
            case 'feedback':
                const success = await ASUChatBot.provideASUFeedback(
                    sessionId || 'default',
                    feedback.messageIndex,
                    feedback.wasHelpful,
                    feedback.comment,
                    feedback.language || 'en'
                );

                return NextResponse.json({
                    success,
                    message: success
                        ? (feedback.language === 'km' ? "អរគុណ! ខ្ញុំកំពុងរៀនពីមតិរបស់អ្នក។" : "Thank you! I'm learning from your feedback.")
                        : "Feedback not recorded"
                });

            case 'stats':
                return NextResponse.json({
                    stats: ASUChatBot.getASUStats()
                });

            case 'addInfo':
                if (newInfo && newInfo.keywords && newInfo.response) {
                    const newId = ASUChatBot.addASUInformation(
                        newInfo.keywords,
                        newInfo.khmerKeywords || [],
                        newInfo.response,
                        newInfo.khmerResponse || '',
                        newInfo.category || 'general',
                        newInfo.sources || []
                    );

                    return NextResponse.json({
                        success: true,
                        message: `New ASU information added successfully`,
                        id: newId
                    });
                }

                return NextResponse.json({
                    success: false,
                    message: "Invalid information format"
                });

            default:
                // Regular ASU chat processing
                if (!message?.trim()) {
                    return NextResponse.json({
                        reply: "I didn't receive your message. Please try again. / ខ្ញុំមិនទទួលបានសាររបស់អ្នក។ សូមព្យាយាមម្តងទៀត។",
                        error: "empty_message"
                    });
                }

                // Process with ASU-focused learning
                const result = await ASUChatBot.processASUMessage(
                    message,
                    sessionId || 'default'
                );

                const stats = ASUChatBot.getASUStats();

                return NextResponse.json({
                    ...result,
                    timestamp: new Date().toISOString(),
                    learningStats: {
                        totalInteractions: stats.totalInteractions,
                        knowledgeBaseSize: stats.knowledgeBaseSize,
                        autoLearnedItems: stats.autoLearnedItems,
                        languages: stats.languages,
                        specialization: stats.specializtion,
                        isLearning: true,
                        asuFocused: true
                    },
                    metadata: {
                        sessionId: sessionId || 'default',
                        messageLength: message.length,
                        asuSpecialized: true,
                        bilingualSupport: true
                    }
                });
        }

    } catch (error) {
        console.error("ASU ChatBot Error:", error);

        return NextResponse.json({
            reply: "I encountered an issue, but I'm learning from it! Please try again. / ខ្ញុំមានបញ្ហា ប៉ុន្តែខ្ញុំកំពុងរៀនពីវា! សូមព្យាយាមម្តងទៀត។",
            error: "processing_error",
            searchUsed: false,
            confidence: 0.1,
            responseTime: 0,
            asuSpecialized: true,
            language: 'en'
        }, { status: 500 });
    }
}