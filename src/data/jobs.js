const jobs = [
  {
    startDate: new Date("2021-12-01"),
    endDate: new Date("2023-08-10"),
    title: "Database Research Engineer (Research Assistant)",
    company: "Institute for System Programming (Russian Academy of Sciences)",
    companyLink: "https://www.ispras.ru/en/",
    description: "I designed a storage solution for network traffic control systems using Greenplum Database, evaluated storage configurations for scalability and performance, and built a synthetic data generator to benchmark the system.",
    tools: ["Python", "SQL", "Greenplum", "Bash"],
    projectUrl: "https://github.com/bytemaru",
    projectLabel: "Link to GitHub"
  },
{
    startDate: new Date("2023-08-15"),
    endDate: new Date("2023-12-01"),
    title: "Data Engineer",
    company: "Stroitel'nyj dvor",
    companyLink: "https://ru.wikipedia.org/wiki/Строительный_двор",
    description: "I worked closely with business analysts to design Data Marts for reporting and decision-making purposes. Designed and implemented Apache Airflow DAGs. Conducted code reviews, debugging, and log analysis to maintain pipeline reliability. Ensured successful data delivery and validation in target databases.",
    tools: ["Python", "Airflow", "SQL", "Azure SQL"],
    projectUrl: "https://github.com/bytemaru",
    projectLabel: "Link to GitHub"
  },
{
    startDate: new Date("2023-12-02"),
    endDate: new Date("2024-06-01"),
    title: "Data Engineer",
    company: "Sberbank",
    companyLink: "https://www.sberbank.com/about?TSPD_101_R0=0817d681ccab20001d516419901c68448e640a270739ac1a2a366ea4f106b38fc6e713e848a4d0cf08859c260d143000a2b53b1526bde5ee45a6deddbbbe2670b7ea9839d44ea9fed41cc1c3743625abeffe6577d2c4211bde2aa3c61cf42195",
    description: " I worked in the Global Markets Platform team, developing tools that automated Data Marts assembly and retrieving analytical data from Apache Hive. This reduced Data Marts release time by 50%. I also collaborated with end users to improve Microsoft Power BI reports performance.",
    tools: ["Python", "Hive", "SQL", "Power BI"],
    projectUrl: "https://github.com/bytemaru",
    projectLabel: "Link to GitHub"
  },
  {
      startDate: new Date("2024-07-01"),
      endDate: new Date("2025-07-01"),
      title: "Masters Degree in Computer Science",
      company: "Victoria University of Wellington",
      companyLink: "https://www.wgtn.ac.nz",
      description: "My studies expanded my experience in big data technologies (Apache Spark, Apache Hadoop), database systems and data warehouse design, DevOps and program analysis, cybersecurity, and interactive data visualisation.",
      tools: ["Python", "SQL", "Cloud", "Java", "Javascript", "Cybersecurity"],
      projectUrl: "https://euphonious-medovik-db77db.netlify.app/",
      projectLabel: "Link to Visualisation Project"
    },
      {
          startDate: new Date("2025-08-01"),
          endDate: new Date(),
          title: "Data Engineer",
          company: "Datasing NZ",
          companyLink: "https://www.datasing.nz/about/",
          description: "I design and implement components of Azure-based data platforms for corporate and government clients. My work includes developing SQL ETL processes that move data from staging to curated layers, implementing validation and audit tracking, and preparing datasets used in Microsoft Power BI reporting.",
          tools: ["Azure SQL", "SQL", "Azure Cloud", "Azure Infrastructure", "Azure Data Factory", "Typescript", "Power BI"],
          projectUrl: "./storytelling.html",
          projectLabel: "Data Storytelling"
        }
]

export function getJobAtDate(date) {
  return jobs.find(job =>
    date >= job.startDate && date <= job.endDate
  )
}

export { jobs }