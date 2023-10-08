type SemanticTrigger = {
  title: string;
  relevance_score: number;
};
// type IdentifiedPerson = {
//   full_name: {
//     firstname: string;
//     middlenames: string;
//     lastname: string;
//     title: string;
//   };
//   date_of_birth?: SemanticTrigger;
//   social_security_number?: SemanticTrigger;
//   // residential_address?: SemanticTrigger;
//   state_id_or_drivers_license?: SemanticTrigger;
//   state_id?: SemanticTrigger;
//   passport_number?: SemanticTrigger;
//   address?: SemanticTrigger;
//   financial_account_number?: SemanticTrigger;
//   payment_card_number?: SemanticTrigger;
//   username_and_password?: SemanticTrigger;
//   email_and_password?: SemanticTrigger;
//   biometric_data?: SemanticTrigger;
//   medical_information?: SemanticTrigger;
//   medical_record_number?: SemanticTrigger;
//   health_insurance_info?: SemanticTrigger;
// };

// type IdentifiedPeople = IdentifiedPerson[];
type Credentials = {
  username: string;
  password: string;
};
type ExtractedDataPointRef = {
  chunk_source: string;
  document_source: string;
  trace: string;
  observation: string;
  value: string | boolean | Credentials;
};
type ExtractedPerson = {
  id?: string;
  full_name: {
    firstname: string;
    middlenames: string;
    lastname: string;
    title: string;
  };
  date_of_birth?: ExtractedDataPointRef[];
  social_security_number?: ExtractedDataPointRef[];
  // residential_address?: ExtractedDataPointRef[];
  state_id_or_drivers_license?: ExtractedDataPointRef[];
  state_id?: ExtractedDataPointRef[];
  passport_number?: ExtractedDataPointRef[];
  financial_account_number?: ExtractedDataPointRef[];
  payment_card_number?: ExtractedDataPointRef[];
  username_and_password?: ExtractedDataPointRef[];
  biometric_data?: ExtractedDataPointRef[];
  medical_information?: ExtractedDataPointRef[];
  medical_record_number?: ExtractedDataPointRef[];
  health_insurance_info?: ExtractedDataPointRef[];
  email_and_password?: ExtractedDataPointRef[];
};

type ExtractedPeople = ExtractedPerson[];

interface Product {
  id?: number;
  product: string;
  price: string;
}
// General App types
// i18n: internationalisation
type SimpleDictionary = Record<string, string>;

type Flag = {
  code: string;
  language: string;
};
type ChatGPTAgent = "user" | "system" | "assistant" | "function";

const tiers = {
  free: "free",
  professional: "professional",
  business: "business",
  enterprise: "enterprise",
} as const;
type Tiers = (typeof tiers)[keyof typeof tiers];

const tiers = {
  free: "free",
  professional: "professional",
  business: "business",
  enterprise: "enterprise",
} as const;
type Tiers = (typeof tiers)[keyof typeof tiers];

// Chat
const chatModes = {
  converse: "converse",
  plan: "plan",
  reflect: "reflect",
  structured: "structured",
} as const;
type ChatMode = (typeof chatModes)[keyof typeof chatModes];

// Search
const searchModes = {
  semantic: "semantic",
  keyword: "keyword",
  metadata: "metadata",
} as const;
type SearchMode = (typeof searchModes)[keyof typeof searchModes];

const llms = {
  botree: "botree",
  gpt3: "gpt-3",
  gpt4: "gpt-4",
} as const;
type LLM = (typeof llms)[keyof typeof llms];

interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
  sourceDocs?: unknown;
  followUps?: unknown;
  feedback?: ResponseUserRating;
  user?: Record<string, unknown>;
}
type ResponseUserRating =
  | undefined
  | number
  | { user: Record<string, unknown>; rating: number | undefined }[];


type Chat = {
  _id?: ObjectId;
  gisId: string;
  messages: ChatGPTMessage[];
  user: string;
  createdAt: string;
  mode?: string;
  libSource?: string;
};
type HtmlElementMetaDataBase = {
  id?: number | string;
  label: string;
  hover: string;
};
const i18n = {
  de: "de",
  en: "en",
  es: "es",
  it: "it",
} as const;
type Locale = (typeof i18n)[keyof typeof i18n];

const tiers = {
  free: "free",
  professional: "professional",
  business: "business",
  enterprise: "enterprise",
} as const;

type SubscriptionTier = (typeof tiers)[keyof typeof tiers];
const knowledgeVisibility = {
  public: "public",
  paid: "paid",
  private: "private",
} as const;

type KnowledgeVisibility =
  (typeof knowledgeVisibility)[keyof typeof knowledgeVisibility];

const knowledgeCategory = {
  public: "public",
  paid: "paid",
  private: "private",
  shared: "shared",
} as const;

type KnowledgeCategory =
  (typeof knowledgeCategory)[keyof typeof knowledgeCategory];

const roles = {
  user: "user",
  admin: "admin",
  expert: "expert",
  influencer: "influencer",
  publisher: "publisher",
} as const;

type Roles = (typeof roles)[keyof typeof roles];

// "" | "" | "" | "";
// Truth Tables - Knowledge
type LibraryState = {
  id: string;
  value: boolean;
};

type GraphConnection = { id: string; weight: number };

type MultiSelectTagBase = {
  id: string;
  text: string;
};
type SemanticSearchParams = {
  q: string | null;
  ft: string | null;
  ds: string | null;
  p: string | null;
  semantic: string | null;
  relevance: string | null;
  limit: string | null;
};
// This type extends the base type and adds a metadata property
type MultiSelectTagDefault = MultiSelectTagBase & {
  metadata?: Record<string, unknown>;
};

type MultiSelectCollectionTag = MultiSelectTagBase & {
  metadata: CollectionMetadata;
};

type KnowledgeTag = {
  id: string;
  text: string;
  connections?: GraphConnection[];
  weight?: number;
};
type CollectionMetadata = {
  projectId: string;
  title: string;
  description: string;
  use?: string;
  people: string;
  error_files: string;
  visibility: KnowledgeCategory | KnowledgeVisibility;
  general_distance_threshold: number;
  dob_distance_threshold: number;
  ssn_distance_threshold: number;
  drivers_distance_threshold: number;
  state_id_distance_threshold: number;
  passport_number_distance_threshold: number;
  account_number_distance_threshold: number;
  card_number_distance_threshold: number;
  username_distance_threshold: number;
  email_distance_threshold: number;
  bio_distance_threshold: number;
  medical_distance_threshold: number;
  mrn_distance_threshold: number;
  insurance_distance_threshold: number;
  owner: string;
  status: string;
  sentenceBatchSize?: number;
  image?: string;
  tags?: string;
  publishedAt: string;
  updatedAt: string;
  ident_model: string;
  extract_model: string;
  // tags: KnowledgeTag[];
};
interface FullDocument {
  id: string;
  createdAt?: string;
  publishedAt?: string;
  name?: string;
  author?: string;
  abbreviation?: string;
  usefulFor?: string;
  description?: string;
  title: string;
  // status: TypedColumn;
  image?: Image;
  source: string;
  version?: string;
  feedback?: Feedback;
}



type Feedback = { general: number; individual: IndividualFeedback[] };
type Doc = { pageContent: string; metadata: Record<string, unkonwn> };
type Docs = Doc[];

// News Types

type NewsSearchParams = {
  term: string;
  languages?: string;
  countries?: string;
  authors?: string;
  sources?: string;
};
type NewsCategory =
  | "general"
  | "business"
  | "technology"
  | "entertainment"
  | "health"
  | "science"
  | "politics";
type HashTag = {
  id: string;
  text: string;
};
type FilterMetadata = {
  authors: string[];
  sources: string[];
  countries: string[];
  languages: string[];
};
type Pagination = {
  count: Int;
  limit: Int;
  offset: Int;
  total: Int;
};
type NewsArticle = {
  id: string;
  author?: string;
  image: string | null;
  category: NewsCategory;
  country: string;
  description: string;
  language: string;
  published_at: string;
  source: string;
  title: string;
  url: string;
};
type NewsResponse = { pagination: Pagination; data: NewsArticle[] };

// Intelligence
// Agents
type Rule = { id: string; name: string; rule: string };

const mbti = {
  ISTJ: "ISTJ",
  ISFJ: "ISFJ",
  INFJ: "INFJ",
  INTJ: "INTJ",
  ISTP: "ISTP",
  ISFP: "ISFP",
  INFP: "INFP",
  INTP: "INTP",
  ESTP: "ESTP",
  ESFP: "ESFP",
  ENFP: "ENFP",
  ENTP: "ENTP",
  ESTJ: "ESTJ",
  ESFJ: "ESFJ",
  ENFJ: "ENFJ",
  ENTJ: "ENTJ",
} as const;

type MBTI = (typeof mbti)[keyof typeof mbti];
type MeyerBriggsType = {
  name: string;
  description: string;
  modelRepresentation: GPTModelParameters;
};
type PersonaType = "expert" | "coach" | "conversational" | "custom";

type Persona = {
  id: string;
  modes: Modes;
  autonomy?: number;
  roles?: string[];
  type: PersonaType;
  name: string;
  disclaimer?: string;
  instructions?: string;
  description: string;
  greeting: string;
  mbti?: MBTI;
  options: {
    upload: boolean;
    reveal: boolean;
    featured: boolean;
    webResource: boolean;
  };
  gptParams?: {
    temperature: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
  };
};
