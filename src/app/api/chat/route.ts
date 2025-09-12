import { NextResponse } from "next/server";

// ASU-specific search and learning interfaces
interface SearchResult {
    title: string;
    snippet: string;
    url: string;
    relevance: number;
    category: 'academic' | 'visa' | 'admission' | 'general' | 'other';
}

interface WebSearchService {
    search(query: string, asuContext?: boolean): Promise<SearchResult[]>;
}

// Enhanced ASU-focused search implementation
class ASUSearchService implements WebSearchService {
    private apiKey = process.env.GOOGLE_API_KEY || '';
    private searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID || '';

    async search(query: string, asuContext: boolean = true): Promise<SearchResult[]> {
        // Only enhance query with ASU context if it's education-related
        const isEducationRelated = query.match(/study|education|school|university|college|learn|student/i);
        const enhancedQuery = asuContext && isEducationRelated
            ? `Angelo State University ${query}`
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

            return (data.items || []).map((item: any, index: number) => ({
                title: item.title,
                snippet: item.snippet,
                url: item.link,
                relevance: 1 - (index * 0.1),
                category: this.categorizeResult(item.title + ' ' + item.snippet)
            }));
        } catch (error) {
            console.error('Search error:', error);
            return this.fallbackSearch(enhancedQuery);
        }
    }

    private categorizeResult(content: string): 'academic' | 'visa' | 'admission' | 'general' | 'other' {
        const lowerContent = content.toLowerCase();

        if (lowerContent.includes('visa') || lowerContent.includes('immigration')) {
            return 'visa';
        }
        if (lowerContent.includes('admission') || lowerContent.includes('apply') || lowerContent.includes('enrollment')) {
            return 'admission';
        }
        if (lowerContent.includes('course') || lowerContent.includes('program') || lowerContent.includes('degree') || lowerContent.includes('study')) {
            return 'academic';
        }
        if (lowerContent.includes('angelo') || lowerContent.includes('asu') || lowerContent.includes('university')) {
            return 'academic';
        }
        return 'other';
    }

    private fallbackSearch(query: string): SearchResult[] {
        // More comprehensive fallback
        return [{
            title: "Information Search",
            snippet: `I'm searching for information about "${query}". While I specialize in ASU and study abroad, I can help you find information on various topics.`,
            url: "search",
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
    category: 'visa' | 'academic' | 'admission' | 'contact' | 'success_stories' | 'services' | 'general' | 'other';
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

// Auto-learning data for broader context
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
    generalQueries: Map<string, number>;
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

// Initialize learning data
const asuLearningData: ASULearningData = {
    patterns: new Map(),
    userInteractions: [],
    studentQueries: new Map(),
    generalQueries: new Map(),
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

// Enhanced ASU Cambodia Knowledge Base with general knowledge
const asuKnowledgeBase: ASUKnowledgeItem[] = [
    // ... (keep all the existing ASU-specific items from previous code)
    // Existing ASU items here...

    // Add general knowledge items
    {
        id: "general_greeting",
        keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"],
        khmerKeywords: ["សួស្តី", "ជំរាបសួរ", "អូន", "សុំសួរ"],
        patterns: [/^(hi|hello|hey|greetings|good\s(morning|afternoon|evening))/i],
        response: "Hello! I'm here to help you with information about Angelo State University, study abroad opportunities, and general knowledge. How can I assist you today?",
        khmerResponse: "សួស្តី! ខ្ញុំនៅទីនេះដើម្បីជួយអ្នកជាមួយព័ត៌មានអំពី Angelo State University ឱកាសសិក្សាបរទេស និងចំណេះដឹងទូទៅ។ តើខ្ញុំអាចជួយអ្នកយ៉ាងដូចម្តេចថ្ងៃនេះ?",
        category: "general",
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
        id: "general_help",
        keywords: ["help", "assist", "support", "what can you do", "how can you help"],
        khmerKeywords: ["ជំនួយ", "ដៃគូ", "គាំទ្រ", "អ្វីដែលអ្នកអាចធ្វើ", "របៀបជួយ"],
        patterns: [/help/i, /assist/i, /support/i, /what.*can.*you.*do/i],
        response: "I can help you with:\n• ASU programs and admissions\n• Student visa information\n• Study abroad opportunities\n• General knowledge questions\n• Current events and information\n• And much more!\n\nWhat would you like to know about?",
        khmerResponse: "ខ្ញុំអាចជួយអ្នកជាមួយ:\n• កម្មវិធី ASU និងការចូលរៀន\n• ព័ត៌មានវីសារសិស្ស\n• ឱកាសសិក្សាបរទេស\n• សំណួរចំណេះដឹងទូទៅ\n• ព្រឹត្តិការណ៍បច្ចុប្បន្ន និងព័ត៌មាន\n• និងច្រើនទៀត!\n\nតើអ្នកចង់ដឹងអំពីអ្វី?",
        category: "general",
        confidence: 0.90,
        usageCount: 0,
        successRate: 0.90,
        lastUsed: new Date(),
        lastUpdated: new Date(),
        webSearchEnabled: true,
        autoUpdate: true,
        sources: [],
        userFeedback: []
    },
    {
        id: "general_thanks",
        keywords: ["thank", "thanks", "appreciate", "grateful", "អរគុណ", "ដឹងគុណ"],
        khmerKeywords: ["អរគុណ", "ដឹងគុណ", "សូមអរគុណ"],
        patterns: [/thank/i, /appreciate/i, /grateful/i, /អរគុណ/i],
        response: "You're welcome! I'm glad I could help. If you have any more questions about ASU, study abroad, or anything else, feel free to ask!",
        khmerResponse: "មិនមែនអ្វីទេ! ខ្ញុំរីករាយដែលអាចជួយបាន។ ប្រសិនបើអ្នកមានសំណួរបន្ថែមអំពី ASU ការសិក្សានៅបរទេស ឬអ្វីផ្សេងទៀត សូមសួរដោយសេរី!",
        category: "general",
        confidence: 0.95,
        usageCount: 0,
        successRate: 0.95,
        lastUsed: new Date(),
        lastUpdated: new Date(),
        webSearchEnabled: false,
        autoUpdate: false,
        sources: [],
        userFeedback: []
    }
];

// Enhanced Learning Engine
class ASULearningEngine {
    static extractASUFeatures(text: string): string[] {
        const words = text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 1);

        const features = [...words];

        // Enhanced feature patterns for broader topics
        if (text.match(/វីសារ|visa/i)) features.push('_VISA_INQUIRY');
        if (text.match(/សិក្សា|study|education|learn/i)) features.push('_EDUCATION_INQUIRY');
        if (text.match(/Angelo|ASU|university|college/i)) features.push('_ASU_SPECIFIC');
        if (text.match(/Australia|អូស្ត្រាលី|abroad/i)) features.push('_ABROAD_INQUIRY');
        if (text.match(/ទំនាក់ទំនង|contact|phone|address/i)) features.push('_CONTACT_REQUEST');
        if (text.match(/តម្លៃ|price|cost|fee|money/i)) features.push('_PRICING_INQUIRY');
        if (text.match(/what|how|when|where|why|who/i)) features.push('_GENERAL_QUESTION');
        if (text.match(/news|current|event|update/i)) features.push('_CURRENT_EVENTS');
        if (text.match(/weather|temperature|forecast/i)) features.push('_WEATHER');
        if (text.match(/time|date|day|year/i)) features.push('_TIME_DATE');

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
            responseTime: 0,
            searchUsed: response.includes('Latest Information') || response.includes('ព័ត៌មានបានប្រមូល')
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
        if (lower.match(/program|degree|major|course|study|education|learn/)) return 'academic';
        if (lower.match(/contact|phone|address|location/)) return 'contact';
        if (lower.match(/success|graduate|student|achievement/)) return 'success_stories';
        if (lower.match(/service|help|assist|support/)) return 'services';
        if (lower.match(/time|date|weather|news|current/)) return 'general';
        if (lower.match(/what|how|when|where|why|who/)) return 'general';

        return 'other';
    }

    private static updateCategoryLearning(input: string, category: string): void {
        // Update queries tracking
        if (category === 'academic' || category === 'visa') {
            const count = asuLearningData.studentQueries.get(input) || 0;
            asuLearningData.studentQueries.set(input, count + 1);
        } else {
            const count = asuLearningData.generalQueries.get(input) || 0;
            asuLearningData.generalQueries.set(input, count + 1);
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

    static async performWebSearch(query: string): Promise<SearchResult[]> {
        const searchService = new ASUSearchService();
        return await searchService.search(query, false); // Don't force ASU context for general queries
    }

    static generateEnhancedResponse(
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

// Enhanced Main Chatbot
class ASUChatBot {
    private static detectLanguage(message: string): 'en' | 'km' {
        const khmerChars = /[\u1780-\u17FF]/;
        return khmerChars.test(message) ? 'km' : 'en';
    }

    private static async findBestMatch(message: string): Promise<ASUKnowledgeItem | null> {
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

    public static async processMessage(
        message: string,
        sessionId: string = "default"
    ): Promise<{
        reply: string;
        language: 'en' | 'km';
        category: string;
        searchUsed: boolean;
        confidence: number;
        responseTime: number;
        sources: string[];
    }> {
        const startTime = Date.now();
        const language = this.detectLanguage(message);
        let searchUsed = false;
        let sources: string[] = [];

        try {
            // Find best knowledge match
            const bestMatch = await this.findBestMatch(message);
            let response = "";
            let category = "general";
            let confidence = 0.7; // Default confidence for general queries

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
                        const searchResults = await ASULearningEngine.performWebSearch(message);
                        if (searchResults.length > 0) {
                            response = ASULearningEngine.generateEnhancedResponse(response, searchResults, language);
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
                        console.warn('Web search failed:', error);
                    }
                }
            } else {
                // No knowledge match - use web search for all queries
                searchUsed = true;
                category = "other";
                confidence = 0.6;

                try {
                    const searchResults = await ASULearningEngine.performWebSearch(message);
                    if (searchResults.length > 0) {
                        const baseResponse = language === 'km'
                            ? `ខ្ញុំរកឃើញព័ត៌មាននេះអំពី "${message}":`
                            : `I found this information about "${message}":`;

                        response = ASULearningEngine.generateEnhancedResponse(baseResponse, searchResults, language);
                        sources = searchResults.map(r => r.url);
                        confidence = 0.75;
                    } else {
                        response = this.generateFallback(message, language);
                        confidence = 0.4;
                    }
                } catch (error) {
                    response = this.generateFallback(message, language);
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
                responseTime,
                sources
            };

        } catch (error) {
            console.error("ChatBot Error:", error);

            const fallbackResponse = this.generateFallback(message, this.detectLanguage(message));
            const responseTime = Date.now() - startTime;

            return {
                reply: fallbackResponse,
                language: this.detectLanguage(message),
                category: "error",
                searchUsed: false,
                confidence: 0.2,
                responseTime,
                sources: []
            };
        }
    }

    private static generateFallback(message: string, language: 'en' | 'km'): string {
        const fallbacks = {
            en: [
                `I'm researching information about "${message}". While I specialize in ASU and study abroad, I can help you find information on various topics using web search.`,
                `That's an interesting question! Let me search for the most current information about "${message}" for you.`,
                `I'm expanding my knowledge base to include more topics. Let me find the latest information about "${message}" from reliable sources.`
            ],
            km: [
                `ខ្ញុំកំពុងស្រាវជ្រាវព័ត៌មានអំពី "${message}"។ ខណៈខ្ញុំឯកទេសខាង ASU និងការសិក្សានៅបរទេស ខ្ញុំអាចជួយអ្នករកព័ត៌មានអំពីប្រធានបទផ្សេងៗដោយប្រើការស្វែងរកវេប។`,
                `នេះជាសំណួរគួរឱ្យចាប់អារម្មណ៍! សូមឱ្យខ្ញុំស្វែងរកព័ត៌មានចុងក្រោយបំផុតអំពី "${message}" សម្រាប់អ្នក។`,
                `ខ្ញុំកំពុងពង្រីកមូលដ្ឋានចំណេះដឹងរបស់ខ្ញុំដើម្បីរួមបញ្ចូលប្រធានបទបន្ថែមទៀត។ សូមឱ្យខ្ញុំរកព័ត៌មានចុងក្រោយបំផុតអំពី "${message}" ពីប្រភពដែលអាចទុកចិត្តបាន។`
            ]
        };

        const languageFallbacks = fallbacks[language];
        return languageFallbacks[Math.floor(Math.random() * languageFallbacks.length)];
    }

    // Enhanced auto-generation for broader topics
    private static async autoGenerateKnowledge(): Promise<void> {
        const frequentQueries = Array.from(asuLearningData.trendingTopics.entries())
            .filter(([query, data]) => data.count >= 3) // Lower threshold for more topics
            .sort(([,a], [,b]) => b.count - a.count)
            .slice(0, 10);

        for (const [query, data] of frequentQueries) {
            const hasExistingKnowledge = asuKnowledgeBase.some(kb =>
                kb.keywords.some(keyword => query.toLowerCase().includes(keyword.toLowerCase())) ||
                kb.khmerKeywords.some(keyword => query.includes(keyword))
            );

            if (!hasExistingKnowledge) {
                const newItem = await this.createKnowledgeItem(query, data.category);
                if (newItem) {
                    asuKnowledgeBase.push(newItem);
                    console.log(`Auto-generated knowledge: ${newItem.id}`);
                }
            }
        }
    }

    private static async createKnowledgeItem(query: string, category: string): Promise<ASUKnowledgeItem | null> {
        const features = ASULearningEngine.extractASUFeatures(query);
        const language = this.detectLanguage(query);

        let searchResults: SearchResult[] = [];
        try {
            searchResults = await ASULearningEngine.performWebSearch(query);
        } catch (error) {
            console.warn('Failed to search for auto-knowledge generation:', error);
        }

        if (searchResults.length === 0) return null;

        const response = language === 'km'
            ? `បានតាមការស្វែងយល់របស់អ្នកអំពី ${query}, នេះគឺជាព័ត៌មានដែលខ្ញុំរកឃើញ៖`
            : `Based on your inquiry about ${query}, here's what I found:`;

        const enhancedResponse = ASULearningEngine.generateEnhancedResponse(response, searchResults, language);

        const newItem: ASUKnowledgeItem = {
            id: `auto_${category}_${Date.now()}`,
            keywords: features.filter(f => !f.startsWith('_') && f.length > 2).slice(0, 8),
            khmerKeywords: language === 'km' ? [query.slice(0, 25)] : [],
            patterns: [new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')],
            response: enhancedResponse,
            khmerResponse: language === 'km' ? enhancedResponse : undefined,
            category: category as any,
            confidence: 0.65,
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

    // Get comprehensive statistics
    public static getStats() {
        const totalInteractions = asuLearningData.userInteractions.length;
        const khmerInteractions = asuLearningData.userInteractions.filter(int => int.language === 'km').length;

        const categoryStats = asuKnowledgeBase.reduce((acc, kb) => {
            acc[kb.category] = (acc[kb.category] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const topTrending = Array.from(asuLearningData.trendingTopics.entries())
            .sort(([,a], [,b]) => b.count - a.count)
            .slice(0, 15);

        return {
            totalInteractions,
            khmerInteractions,
            englishInteractions: totalInteractions - khmerInteractions,
            knowledgeBaseSize: asuKnowledgeBase.length,
            autoLearnedItems: asuKnowledgeBase.filter(kb => kb.id.startsWith('auto_')).length,
            categoryBreakdown: categoryStats,
            studentQueries: asuLearningData.studentQueries.size,
            generalQueries: asuLearningData.generalQueries.size,
            successStories: asuLearningData.successStories.length,
            trendingTopics: topTrending,
            averageConfidence: asuKnowledgeBase.reduce((sum, kb) => sum + kb.confidence, 0) / asuKnowledgeBase.length,
            lastUpdate: new Date().toISOString(),
            languages: ['English', 'Khmer'],
            specialization: 'ASU & General Knowledge'
        };
    }

    // Enhanced feedback system
    public static async provideFeedback(
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

        // Find and update matching knowledge item
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

            const totalFeedback = matchingKB.userFeedback.length;
            const positiveFeedback = matchingKB.userFeedback.filter(fb => fb.rating >= 4).length;
            matchingKB.successRate = positiveFeedback / totalFeedback;
        }

        // Re-learn from this interaction
        await ASULearningEngine.learnFromASUInteraction(
            interaction.input,
            interaction.response,
            sessionId,
            wasHelpful,
            interaction.language
        );

        // Trigger auto-improvement for negative feedback
        if (!wasHelpful) {
            await this.autoGenerateKnowledge();
        }

        return true;
    }

    // Add new information manually
    public static addInformation(
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
            category: category as any,
            confidence: 0.85,
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

// Enhanced API handler
export async function POST(req: Request) {
    try {
        const { message, sessionId, feedback, action, newInfo } = await req.json();

        switch (action) {
            case 'feedback':
                const success = await ASUChatBot.provideFeedback(
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
                    stats: ASUChatBot.getStats()
                });

            case 'addInfo':
                if (newInfo && newInfo.keywords && newInfo.response) {
                    const newId = ASUChatBot.addInformation(
                        newInfo.keywords,
                        newInfo.khmerKeywords || [],
                        newInfo.response,
                        newInfo.khmerResponse || '',
                        newInfo.category || 'general',
                        newInfo.sources || []
                    );

                    return NextResponse.json({
                        success: true,
                        message: `New information added successfully`,
                        id: newId
                    });
                }

                return NextResponse.json({
                    success: false,
                    message: "Invalid information format"
                });

            default:
                if (!message?.trim()) {
                    return NextResponse.json({
                        reply: "I didn't receive your message. Please try again. / ខ្ញុំមិនទទួលបានសាររបស់អ្នក។ សូមព្យាយាមម្តងទៀត។",
                        error: "empty_message"
                    });
                }

                const result = await ASUChatBot.processMessage(
                    message,
                    sessionId || 'default'
                );

                const stats = ASUChatBot.getStats();

                return NextResponse.json({
                    ...result,
                    timestamp: new Date().toISOString(),
                    learningStats: {
                        totalInteractions: stats.totalInteractions,
                        knowledgeBaseSize: stats.knowledgeBaseSize,
                        autoLearnedItems: stats.autoLearnedItems,
                        languages: stats.languages,
                        specialization: stats.specialization,
                        isLearning: true,
                        asuFocused: true,
                        generalKnowledge: true
                    },
                    metadata: {
                        sessionId: sessionId || 'default',
                        messageLength: message.length,
                        asuSpecialized: true,
                        bilingualSupport: true,
                        webSearchEnabled: true
                    }
                });
        }

    } catch (error) {
        console.error("ChatBot Error:", error);

        return NextResponse.json({
            reply: "I encountered an issue, but I'm learning from it! Please try again. / ខ្ញុំមានបញ្ហា ប៉ុន្តែខ្ញុំកំពុងរៀនពីវា! សូមព្យាយាមម្តងទៀត។",
            error: "processing_error",
            searchUsed: false,
            confidence: 0.1,
            responseTime: 0,
            asuSpecialized: true,
            language: 'en',
            sources: []
        }, { status: 500 });
    }
}

// Add GET endpoint for health check and basic functionality
export async function GET() {
    return NextResponse.json({
        status: "online",
        message: "ASU ChatBot is running with enhanced general knowledge capabilities",
        capabilities: [
            "ASU-specific information",
            "Study abroad guidance",
            "Visa assistance",
            "General knowledge queries",
            "Web search integration",
            "Bilingual support (English/Khmer)",
            "Auto-learning from interactions"
        ],
        timestamp: new Date().toISOString()
    });
}