const useJobCategories = () => {
    const categories = [
        { name: "Administration & Management", banglaName: "প্রশাসন ও ব্যবস্থাপনা" },
        { name: "Agriculture & Livestock", banglaName: "কৃষি ও প্রাণিসম্পদ" },
        { name: "Animal Husbandry & Veterinary Services", banglaName: "পশুপালন ও পশুচিকিৎসা সেবা" },
        { name: "Banking & Financial Services", banglaName: "ব্যাংকিং ও আর্থিক সেবা" },
        { name: "Cultural & Creative Arts", banglaName: "সংস্কৃতি ও সৃজনশীল শিল্প" },
        { name: "Customs & Taxation", banglaName: "কাস্টমস ও কর" },
        { name: "Defense & Armed Forces", banglaName: "প্রতিরক্ষা ও সশস্ত্র বাহিনী" },
        { name: "Disaster Management", banglaName: "দুর্যোগ ব্যবস্থাপনা" },
        { name: "Education & Teaching", banglaName: "শিক্ষা ও শিক্ষাদান" },
        { name: "Energy & Power", banglaName: "জ্বালানি ও বিদ্যুৎ" },
        { name: "Engineering & Technical Services", banglaName: "প্রকৌশল ও কারিগরি সেবা" },
        { name: "Environment & Forest", banglaName: "পরিবেশ ও বন" },
        { name: "Finance & Accounts", banglaName: "অর্থ ও হিসাব" },
        { name: "Food & Nutrition Services", banglaName: "খাদ্য ও পুষ্টি সেবা" },
        { name: "Health & Medical Services", banglaName: "স্বাস্থ্য ও চিকিৎসা সেবা" },
        { name: "Housing & Urban Development", banglaName: "গৃহায়ন ও নগর উন্নয়ন" },
        { name: "Human Resources & Employment", banglaName: "মানবসম্পদ ও কর্মসংস্থান" },
        { name: "Information Technology", banglaName: "তথ্য প্রযুক্তি" },
        { name: "Judiciary & Legal Services", banglaName: "বিচার বিভাগ ও আইন সেবা" },
        { name: "Labor & Industrial Relations", banglaName: "শ্রম ও শিল্প সম্পর্ক" },
        { name: "Law Enforcement & Security", banglaName: "আইন প্রয়োগ ও নিরাপত্তা" },
        { name: "Maritime Affairs", banglaName: "সমুদ্র বিষয়ক" },
        { name: "Meteorology & Climate Services", banglaName: "আবহাওয়া ও জলবায়ু সেবা" },
        { name: "Mining & Natural Resources", banglaName: "খনিজ ও প্রাকৃতিক সম্পদ" },
        { name: "Municipal & Local Government", banglaName: "পৌরসভা ও স্থানীয় সরকার" },
        { name: "Planning & Development", banglaName: "পরিকল্পনা ও উন্নয়ন" },
        { name: "Postal & Courier Services", banglaName: "ডাক ও কুরিয়ার সেবা" },
        { name: "Public Administration & Civil Services", banglaName: "জনপ্রশাসন ও সিভিল সার্ভিস" },
        { name: "Public Relations & Communications", banglaName: "জনসংযোগ ও যোগাযোগ" },
        { name: "Public Works & Infrastructure", banglaName: "জনকল্যাণ ও অবকাঠামো" },
        { name: "Research & Development", banglaName: "গবেষণা ও উন্নয়ন" },
        { name: "Social Welfare & Community Services", banglaName: "সমাজকল্যাণ ও কমিউনিটি সেবা" },
        { name: "Statistics & Census", banglaName: "পরিসংখ্যান ও আদমশুমারি" },
        { name: "Telecommunications", banglaName: "টেলিযোগাযোগ" },
        { name: "Tourism & Hospitality", banglaName: "পর্যটন ও আতিথেয়তা" },
        { name: "Trade & Commerce", banglaName: "বাণিজ্য ও ব্যবসা" },
        { name: "Transport & Communication", banglaName: "পরিবহন ও যোগাযোগ" },
        { name: "Transportation Safety & Regulation", banglaName: "পরিবহন নিরাপত্তা ও নিয়ন্ত্রণ" },
        { name: "Veterans & Military Support", banglaName: "প্রাক্তন সেনা ও সামরিক সহায়তা" },
        { name: "Water Resources & Fisheries", banglaName: "পানি সম্পদ ও মৎস্য" },
        { name: "Youth & Sports Development", banglaName: "যুব ও ক্রীড়া উন্নয়ন" }
    ]

    return { categories };
};

export default useJobCategories;