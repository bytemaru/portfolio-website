export const skills =
  {
    name: "Maria",
    children: [
      {
        name: "Cloud Infrastructure & Security",
        children: [
          {
            name: "Secure Ingress",
            children: [{ name: "App Gateway" }, { name: "WAF Rules" }],
          },
          {
            name: "DNS and Domain Configuration",
            children: [
              { name: "Custom domain binding" },
              { name: "DNS A-record routing" },
              { name: "Domain verification" },
            ],
          },
          {
            name: "Private Network Architecture",
            children: [
              { name: "Private endpoints (Blob and ADF)" },
              { name: "App Service private access" },
            ],
          },
        ],
      },
      {
        name: "Data Modelling",
        children: [
          { name: "Business Keys" },
          { name: "Slowly Changing Dimensions" },
          { name: "Data Marts Modelling" },
          { name: "Temporal Datasets" },
          {
            name: "Dimension Modelling",
            children: [
              { name: "DimDate/Calendar tables" },
              { name: "Dashboard reporting datasets" },
            ],
          },
        ],
      },
      {
        name: "Programming",
        children: [
          {
            name: "Javascript / Typescript",
            children: [
              { name: "API routes" },
              { name: "Interactive data visualisations" },
            ],
          },
          {
            name: "Python",
            children: [
              { name: "Airflow DAG development" },
              { name: "Synthetic data generation (SQL Alchemy)" },
              { name: "Data processing scripts" },
            ],
          },
        ],
      },
      {
        name: "Engineering Collaboration",
        children: [
          { name: "Client-facing communication and solution discovery" },
          { name: "Requirements discovery" },
          { name: "Data product thinking" },
          { name: "Cross-team collaboration" },
        ],
      },
      {
        name: "SQL Engineering",
        children: [
          {
            name: "Data Transformation",
            children: [
              { name: "CTE chains" },
              { name: "Window functions" },
              { name: "Merge Upserts" },
            ],
          },
          {
            name: "Data Modelling",
            children: [
              { name: "Slowly changing dimensions (Type 2)" },
              { name: "Business key design" },
            ],
          },
          {
            name: "Data Quality Engineering",
            children: [
              { name: "Referential Integrity checks" },
              { name: "Missing/Inconsistent value handling (coalesce)" },
              { name: "Deduplication" },
              { name: "Data validation rules" },
            ],
          },
          {
            name: "Data Pipeline Supporting SQL design",
            children: [
              { name: "Incremental loads" },
              { name: "Idempotent transformations" },
              { name: "Execution auditing" },
            ],
          },
          {
            name: "Analytical SQL",
            children: [
              { name: "Window functions" },
              { name: "Conditional aggregation" },
            ],
          },
        ],
      },
    ],
  }
