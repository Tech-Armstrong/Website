export type TeamMember = {
  name: string;
  role: string;
  image: string;
  linkedinUrl?: string;
  bio: string;
};

const UPLOADS = "https://armstrong-cap.com/wp-content/uploads";

export const ourTeamMembers: TeamMember[] = [
  {
    name: "Manju Mastakar",
    role: "Founder & Managing Director",
    image: `${UPLOADS}/2023/06/Manju-FounderCEO.jpg`,
    linkedinUrl: "https://www.linkedin.com/in/manju-mastakar-5a3489a/",
    bio: [
      "Ms. Manju Mastakar, with over three decades of experience navigating multiple market cycles, is a recognized leader in India's wealth management industry. She began her career at Dalal Street—the epicenter of India's investing world. Her career with prestigious firms like Motilal Oswal, MF Global, and HSBC gave her the foundation to see both the power of markets and the gaps in how financial advice was delivered.",
      "In 2010, she founded Armstrong Capital & Financial Services Pvt. Ltd. with a vision to build a client-first, transparent, and research-driven advisory platform. Since then, many corporates and HNIs have successfully built and managed their wealth under her sound investment advice, making her a trusted partner in long-term financial growth.",
      "A recipient of several prestigious awards and accolades, Ms. Mastakar has nurtured Armstrong Capital from a modest beginning into a well-respected wealth management firm, trusted by clients across India and abroad. Her philosophy is simple yet powerful: \"Wealth managers don't deliver returns; they create discipline and manage risk — and that's what truly creates wealth.\"",
    ].join("\n\n"),
  },
  {
    name: "Ratheesh Nambiar",
    role: "Director",
    image: `${UPLOADS}/2023/06/Ratheesh.jpg`,
    linkedinUrl: "https://www.linkedin.com/in/ratheesh-nambiar-53242421/",
    bio: [
      "Ratheesh Nambiar is the Director at Armstrong Capital, with over 22 years of distinguished experience in the financial services industry. His career spans various market cycles, offering him unparalleled insights into evolving financial landscapes and investment opportunities.",
      "Starting his career in 2004 with Geojit BNP Paribas Financial Services Ltd., Bangalore, where he spent 8 years managing branch operations, client portfolios, and driving business growth.",
      "Since 2011, Mr. Nambiar has been an integral part of Armstrong Capital. He has played a pivotal role in managing wealth for High-Net-Worth Individuals (HNIs) and Non-Resident Indians (NRIs), particularly in the Middle East. His client-focused approach emphasizes financial education, disciplined planning, and customized strategies, empowering clients to preserve wealth, manage complexities, and achieve long-term financial freedom.",
    ].join("\n\n"),
  },
  {
    name: "Rahul MV",
    role: "Vice President",
    image: `${UPLOADS}/Rahul-796x1024.webp`,
    linkedinUrl: "https://www.linkedin.com/in/rahul-m-v-a63873122/",
    bio: [
      "Rahul MV is the Vice President at Armstrong Capital, with over 9 years of experience in Wealth Management and Investment Advisory.",
      "With a strong foundation in banking and wealth management, Rahul began his professional journey at ICICI Bank in 2016, where he gained strong expertise in banking, client servicing, and building long-term trust-based relationships.",
      "Since joining Armstrong Capital in 2017, Rahul has been instrumental in client acquisition and wealth management. He specializes in goal-based financial planning, NRI tax planning, and solving complex financial challenges. With expertise in managing HNI and NRI portfolios (particularly in the US & UK), he builds tailored investment strategies aligned with clients' goals and risk appetite, while conducting regular reviews and adjustments based on market dynamics.",
      "He holds an MBA and a Master's degree in Computer Applications (MCA), along with certifications in Artificial Intelligence.",
    ].join("\n\n"),
  },
  {
    name: "Ashish Lal",
    role: "Senior Portfolio Manager",
    image: `${UPLOADS}/2024/09/PHOTO-6.jpg`,
    linkedinUrl: "https://www.linkedin.com/in/ashishl7/",
    bio: [
      "Ashish Lal is the Senior Portfolio Manager at Armstrong Capital & Financial Services Pvt. Ltd., bringing around half a decade of experience in wealth management and investment advisory. He specializes in portfolio structuring, asset allocation, and guiding clients through both equity and debt markets with a focus on long-term wealth creation. Ashish has been tracking and analyzing the equity markets for around a decade.",
      "At Armstrong Capital, Ashish has advised high-net-worth clients on building resilient portfolios, managing some of the toughest and largest portfolios, and balancing risk and opportunity across market cycles. He is known for his client-first approach, simplifying complex investment decisions, and building trust through transparency.",
      "Beyond investment management, Ashish hosts a finance podcast where he engages with CIOs and Fund Managers managing several lakh crores in AUM, distilling market insights for a wider audience. He holds a Master's degree with strong expertise in equity strategy and evolving market trends.",
    ].join("\n\n"),
  },
  {
    name: "Binto Sebastian",
    role: "Investment Solution Manager",
    image: `${UPLOADS}/2024/09/PHOTO-1-1.jpg`,
    linkedinUrl: "https://www.linkedin.com/in/binto-sebastian-91116826a/",
    bio: [
      "Binto Sebastian is an Investment Solution Manager at Armstrong Capital, with over 20 years of experience in the financial services industry.",
      "He began his career in 2006 with Geojit Financial in Bengaluru, followed by leadership roles at Hedge Equities Ltd. and Nirmal Bang, where he managed branch operations, client portfolios, and investment product sales.",
      "Since joining Armstrong Capital, he has been delivering end-to-end financial advisory services, helping clients create, grow, and protect wealth through personalized financial planning and disciplined investment strategies. His expertise spans risk profiling, investment strategy, debt management, portfolio optimization, and strategic reallocation. Known for his client-focused approach, he builds long-term trust by aligning financial roadmaps with individual goals.",
    ].join("\n\n"),
  },
  {
    name: "Khushboo Sheth",
    role: "Investment Solution Manager",
    image: `${UPLOADS}/untitled-0-4-1024x796.webp`,
    linkedinUrl: "https://www.linkedin.com/in/khushbooksheth",
    bio: [
      "Khushboo Sheth is the Investment Solution Manager at Armstrong Capital, where she blends analytical expertise with a deeply human approach to wealth management.",
      "Her career began at HDFC Securities as an Equity Advisor & Dealer, where she built a reputation for simplifying complex market movements into actionable strategies. From executing trades to conducting portfolio reviews, she learned that successful investing relies as much on trust and clarity as on numbers.",
      "At Armstrong Capital, she plays a pivotal role in shaping clients' wealth creation journeys. She works closely with individuals from diverse backgrounds to design tailored financial plans, conduct risk assessments, and build portfolio strategies that balance growth with stability—ensuring every roadmap remains resilient and aligned with evolving goals.",
      "An MBA in Finance and NISM-certified professional, Khushboo finds joy in being part of every client's financial story. From small beginnings to major milestones, she makes wealth management simple and personal.",
    ].join("\n\n"),
  },
  {
    name: "Suhas Patchipulusu",
    role: "Senior Portfolio Strategist",
    image: `${UPLOADS}/2-1-1-1024x796.webp`,
    linkedinUrl: "https://www.linkedin.com/in/suhas-patchipulusu",
    bio: [
      "Suhas Patchipulusu is the Senior Portfolio Strategist at Armstrong Capital & Financial Services Pvt. Ltd., with 4 years of experience across wealth management, equity research, and financial planning.",
      "Before Armstrong, Suhas worked as an Equity Research Analyst and Investment Coach at FundsIndia, where he developed expertise in business analysis, market research, and investor coaching. His strong analytical background enables him to blend research-driven insights with practical solutions in every plan.",
      "At Armstrong, he helps clients build customized strategies that emphasize portfolio diversification, tax efficiency, and practical decision-making—whether evaluating a loan, purchasing a home, or balancing investments with long-term security.",
      "He holds an MBA in Banking, Financial Services & Insurance (BFSI). Guided by a client-first approach, he simplifies complex financial choices so clients can act with clarity and confidence.",
    ].join("\n\n"),
  },
];
