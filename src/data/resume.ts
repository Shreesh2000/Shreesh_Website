export const profile = {
  name: 'Shreesh Kawathekar',
  role: 'Software Engineer',
  yearsExperience: 3,
  summary:
    'I build intelligent systems and ship production-grade products — RAG pipelines, GenAI chatbots, real-time event platforms, and full-stack React applications at enterprise scale.',
  highlights: ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'LangChain', 'RAG', 'Azure OpenAI', 'Docker'],
  email: 'kawathekarshreesh@gmail.com',
  phone: '+91 9403454896',
  linkedin: 'https://www.linkedin.com/in/shreesh-kawathekar-28490a196/',
  github: 'https://github.com/Shreesh2000',
  location: 'Pune',
} as const;

export const stats = [
  { label: 'Years Exp', value: 3, suffix: '+' },
  { label: 'Projects', value: 10, suffix: '+' },
  { label: 'Tech Stack', value: 25, suffix: '+' },
  { label: 'AI Systems', value: 4, suffix: '' },
] as const;

export const skillCategories = [
  {
    id: 'frontend' as const,
    icon: '🖥️',
    label: 'Frontend',
    skills: [
      'React 18/19', 'Next.js 14', 'TypeScript', 'JavaScript ES2023', 'Vite',
      'Redux Toolkit', 'React Query', 'Zustand', 'MUI v5/v7', 'Nivo Charts',
      'Recharts', 'D3.js', 'Framer Motion', 'react-grid-layout',
    ],
  },
  {
    id: 'backend' as const,
    icon: '⚙️',
    label: 'Backend',
    skills: [
      'Python 3.11', 'FastAPI', 'C# .NET', 'ASP.NET Core', 'REST APIs',
      'SignalR WebSockets', 'Uvicorn', 'Gunicorn', 'Pydantic', 'SQLAlchemy',
      'Entity Framework', 'Clean Architecture',
    ],
  },
  {
    id: 'ai' as const,
    icon: '🤖',
    label: 'AI / GenAI',
    skills: [
      'LangChain', 'LlamaIndex', 'RAG Pipelines', 'Azure OpenAI', 'Azure AI Search',
      'GPT-4', 'HuggingFace', 'Prompt Engineering', 'Vector Search', 'Embeddings',
      'Streaming SSE', 'PaddleOCR',
    ],
  },
  {
    id: 'databases' as const,
    icon: '🗄️',
    label: 'Databases',
    skills: [
      'PostgreSQL', 'PGVector', 'SQL Server', 'MySQL', 'MongoDB',
      'ChromaDB', 'FAISS', 'SeaweedFS', 'Redis', 'SQL Optimization',
    ],
  },
  {
    id: 'cloud' as const,
    icon: '☁️',
    label: 'Cloud & DevOps',
    skills: [
      'Azure App Service', 'Azure Container Registry', 'Azure DevOps',
      'Docker', 'Docker Compose', 'CI/CD YAML Pipelines', 'GitHub Actions',
      'Nginx', 'Linux', 'Azure Functions',
    ],
  },
  {
    id: 'auth' as const,
    icon: '🔐',
    label: 'Auth & Security',
    skills: [
      'JWT', 'OAuth 2.0', 'Azure MSAL SSO', 'Azure AD B2C', 'NextAuth.js',
      'RBAC', 'bcrypt', 'Cookie Auth', 'CORS', 'API Rate Limiting',
    ],
  },
] as const;

export type SkillCategoryId = typeof skillCategories[number]['id'];

export const projects = [
  {
    id: 'medflow' as const,
    name: 'MedFlow',
    subtitle: 'Hospital Management & Patient Portal',
    accent: '#10b981',
    deployPlatform: 'Enterprise' as const,
    deployUrl: 'https://hospital-website-njp0cspyq-shreesh-s-projects.vercel.app/',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'MUI'],
    bullets: [
      'Comprehensive hospital management system for patient records, appointments, and billing.',
      'Role-based dashboards for doctors, receptionists, and patients.',
      'Secure health data architecture.'
    ],
  },
  {
    id: 'wingstalk' as const,
    name: 'WingsTalk',
    subtitle: 'Enterprise RAG Document Intelligence Platform',
    accent: '#a78bfa',
    deployPlatform: 'Enterprise' as const,
    stack: ['Python', 'FastAPI', 'LangChain', 'LlamaIndex', 'PGVector', 'ChromaDB', 'Azure OpenAI', 'React', 'TypeScript', 'Docker'],
    bullets: [
      'End-to-end RAG pipeline: PDF/DOCX ingestion → RecursiveCharacterTextSplitter → HuggingFace sentence-transformers → PGVector + ChromaDB vector search → Azure OpenAI GPT-4 streaming',
      'Built 20 service modules: workspace CRUD, document upload, chat, query workspace (12KB RAG pipeline), subscriptions, pricing, notifications, and user management',
      'React frontend with Nivo Charts dashboard (12 chart types), react-chatbot-kit, speech recognition, react-grid-layout, and Razorpay payments',
      'SeaweedFS binary storage, Azure AD B2C auth, Docker Compose deployment to Azure App Service',
    ],
  },
  {
    id: 'wibi' as const,
    name: 'WiBi Chatbot',
    subtitle: 'Embeddable RAG chatbot with Azure AI Search & voice',
    accent: '#38bdf8',
    deployPlatform: 'Enterprise' as const,
    stack: ['Python', 'FastAPI', 'Azure OpenAI', 'Azure AI Search', 'React 19', 'TypeScript', 'Vite', 'Zustand', 'MUI v7', 'Docker'],
    bullets: [
      'Azure AI Search hybrid retrieval (keyword + vector) → RAG pipeline with Azure OpenAI GPT-4 for context-aware responses',
      'React 19 chat UI with Zustand state, Framer Motion animations, voice input (Web Speech API), text-to-speech, markdown rendering with syntax highlighting',
      'Multilingual support via i18next, IndexedDB message persistence, dark/light theme, conversation export/import',
      'Embeddable widget mode: single script-tag integration into any PHP/HTML site with floating toggle button',
    ],
  },
  {
    id: 'meetinghub' as const,
    name: 'Meeting Hub',
    subtitle: 'Real-time event matchmaking platform with SignalR',
    accent: '#fb7185',
    deployPlatform: 'Enterprise' as const,
    stack: ['Next.js 14', 'TypeScript', 'SignalR', 'Redux Toolkit', 'React Query', 'MUI X Data Grid', 'C# .NET', 'Azure MSAL', 'Docker'],
    bullets: [
      'Real-time exhibitor–visitor matchmaking with SignalR WebSocket push notifications across 6 interconnected repositories',
      'Next.js 14 frontend: Redux Toolkit + React Query, MUI X Data Grid, Recharts analytics, react-virtualized for 1000+ row tables, jsPDF/xlsx export',
      'Admin portal with role-based navigation, cookie auth, theme customization system, and capacity planning grid',
      'C# .NET API with Repository pattern, Azure DevOps CI/CD (4 pipeline YAMLs), Azure Functions for onboarding flows',
    ],
  },
  {
    id: 'analytics' as const,
    name: 'WingsBI Analytics',
    subtitle: 'Full-stack BI dashboard with 12 chart types & AI chatbot',
    accent: '#34d399',
    deployPlatform: 'Enterprise' as const,
    stack: ['React', 'TypeScript', 'Nivo Charts', 'D3.js', 'Recharts', 'MUI v5', 'Azure AD B2C', 'Razorpay', 'Docker'],
    bullets: [
      'Interactive BI dashboards: Nivo bar, line, pie, heatmap, radar, sunburst, boxplot, scatterplot, bump, radial-bar, and geo charts with drill-down',
      'Integrated react-chatbot-kit for in-dashboard AI queries, speech recognition, and drag-and-drop dashboard layouts via react-grid-layout',
      'Azure AD B2C SSO (MSAL) with RBAC, Razorpay payment integration, multi-environment configs (dev/test/prod)',
      'Azure DevOps CI/CD with SonarQube integration, Docker multi-stage builds, 3 environment Dockerfiles',
    ],
  },
  {
    id: 'qhub' as const,
    name: 'QHub NL-to-SQL',
    subtitle: 'Natural language to SQL query engine with LangChain',
    accent: '#22d3ee',
    deployPlatform: 'Enterprise' as const,
    stack: ['Python', 'FastAPI', 'LangChain', 'OpenAI', 'PostgreSQL', 'SQL Server', 'MySQL', 'Pandas', 'React'],
    bullets: [
      'LangChain-powered NL-to-SQL: database_chatbot_service (15KB) converts natural language to valid SQL across PostgreSQL, SQL Server, and MySQL',
      'Auto-generates data visualizations from query results with possible_visualization_service and visualization_service modules',
      'LangChain suggestion service provides intelligent query auto-completions, voice-to-text input for hands-free querying',
      'File datasource management: upload, update, delete with structured data extraction for chatbot context',
    ],
  },
  {
    id: 'precheck' as const,
    name: 'Precheck',
    subtitle: 'QR-code manufacturing inspection system for Godrej',
    accent: '#fbbf24',
    deployPlatform: 'Enterprise' as const,
    stack: ['React 18', 'TypeScript', 'Vite', 'Redux Toolkit', 'React Query', 'MUI X Data Grid', 'QR Code', 'C# .NET', 'Docker'],
    bullets: [
      'Dynamic checklist builder: assembly line → step → SOP document attachment with revision tracking and react-hook-form validation',
      'QR code generation per inspection unit — scan opens pre-filled, step-specific checklist form on mobile',
      'react-window virtualization handling 1000+ row production datasets, MUI X Data Grid with sorting/filtering, xlsx export',
      'C# .NET API with Clean Architecture (Host/Models/Repository/Service), SQL Server, Docker, cookie-based auth',
    ],
  },
  {
    id: 'shiptracking' as const,
    name: 'Ship Tracking',
    subtitle: 'Maritime vessel & cargo tracking dashboard',
    accent: '#06b6d4',
    deployPlatform: 'Enterprise' as const,
    stack: ['React 19', 'TypeScript', 'Vite', 'MUI v7', 'Zustand', 'React Query', 'Zod', 'C# .NET', 'Docker'],
    bullets: [
      'Real-time vessel tracking dashboard with MUI X Data Grid for cargo manifests, voyage schedules, and port status',
      'Zustand state management with Zod schema validation for type-safe API contracts and response parsing',
      'React Query for server state with background refetch, optimistic updates, and axios-mock-adapter for offline dev',
      'C# .NET API with Clean Architecture (VesselCargoTracking namespace), Repository pattern, Docker deployment',
    ],
  },
] as const;

export type ProjectId = typeof projects[number]['id'];

export const experience = {
  title: 'Software Engineering Analyst',
  company: 'WingsBI Technology and Solutions Pvt. Ltd.',
  location: 'Pune, India',
  period: 'Jul 2023 – March 2026 · 3 years',
  bullets: [
    'Built WingsTalk — full RAG pipeline with 20 service modules: LangChain + LlamaIndex + PGVector + ChromaDB → Azure OpenAI streaming, serving enterprise clients',
    'Developed WiBi Chatbot with Azure AI Search hybrid retrieval, embeddable widget mode, voice input, multilingual i18next, and Framer Motion animations',
    'Engineered Meeting Hub across 6 repos: Next.js 14 + SignalR real-time matchmaking, C# .NET API, Admin portal with role-based navigation and Azure Functions',
    'Created WingsBI Analytics — 12 Nivo chart types, D3.js, react-grid-layout dashboards, Azure AD B2C SSO, Razorpay, SonarQube CI/CD',
    'Built QHub NL-to-SQL engine: LangChain converts natural language to PostgreSQL/SQL Server/MySQL queries with auto-visualization',
    'Developed Precheck for Godrej — QR inspection system with react-window virtualization (1000+ rows), C# .NET Clean Architecture, cookie auth',
    'Built RFQ Estimation Portal with mathjs formula engine, KaTeX rendering, ExcelJS export, and Ship Tracking dashboard with Zustand + Zod',
    'Deployed all systems: Azure DevOps CI/CD → Docker → ACR → Azure App Service with multi-environment configs (dev/test/prod)',
  ],
} as const;

export const education = {
  degree: 'Bachelor of Engineering — Computer Technology',
  school: 'Yeshwantrao Chavan College Of Engineering Nagpur',
  city: 'Nagpur',
  graduated: '2023',
} as const;

export const aiResponses = {
  wingstalk: `WingsTalk uses a multi-stage RAG pipeline built across 20 service modules: (1) Ingestion — PDFs and DOCX chunked via LangChain RecursiveCharacterTextSplitter with LlamaIndex LlamaParse fallback. (2) Embedding — HuggingFace sentence-transformers generate vectors per chunk. (3) Storage — PGVector extension on PostgreSQL + ChromaDB dual-store for redundancy. (4) Retrieval — cosine similarity top-k search returns most relevant chunks. (5) Generation — Azure OpenAI GPT-4 streams response token-by-token via FastAPI SSE. Frontend: React with Nivo Charts dashboard, react-chatbot-kit, Razorpay payments, and SeaweedFS file storage.`,
  pipeline: `Full deployment stack across 30+ repos: FastAPI + Uvicorn on Docker → Azure Container Registry via Azure DevOps YAML pipelines → Azure App Service with slot-based zero-downtime deploy. C# .NET APIs use Clean Architecture (Host/Models/Repository/Service). Nginx reverse proxy for SSL termination. Multi-environment configs: separate Dockerfiles and .env files for dev, test, and production. CI/CD triggers on main branch: runs tests, builds Docker image, pushes to ACR, swaps deployment slot. SonarQube integration for code quality gates.`,
  analytics: `WingsBI Analytics runs a full Nivo Charts suite: bar, line, pie, heatmap, radar, sunburst, boxplot, scatterplot, bump, radial-bar, and geo charts — each with drill-down and dynamic filters. D3.js for custom visualizations. react-grid-layout for drag-and-drop dashboard composition. Azure AD B2C (MSAL) with RBAC. Integrated react-chatbot-kit for in-dashboard AI queries with speech recognition. Razorpay payment gateway. 3 Docker environments with Azure DevOps CI/CD and SonarQube quality gates.`,
} as const;
