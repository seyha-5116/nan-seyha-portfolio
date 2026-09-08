import type { ProjectStatus } from "@/lib/types";

export interface CaseStudyChallenge {
  title: string;
  problem: string;
  reasoning: string;
  fix: string;
  result: string;
}

export interface CaseStudy {
  slug: string;
  index: number;
  name: string;
  oneLiner: string;
  role: string;
  timeline: string;
  team: string;
  status: ProjectStatus;
  liveUrl: string | null;
  repoUrl: string | null;
  image: string | null;
  overview: {
    context: string;
    problem: string[];
    outcome: string;
  };
  problemAndGoals: {
    narrative: string[];
    goals: string[];
    constraints: string[];
  };
  process: {
    steps: { title: string; description: string }[];
    decisions: { title: string; detail: string }[];
  };
  technical: {
    architecture: { layer: string; detail: string }[];
    highlights: { title: string; body: string }[];
    snippets: { title: string; code: string }[];
    stackTable: { category: string; items: string[] }[];
  };
  challenges: CaseStudyChallenge[];
  results: string[];
  reflection: { differently: string; reuse: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "pixtoprompt",
    index: 1,
    name: "PixToPrompt",
    oneLiner:
      "Paste an image, get a precise, production-ready prompt for AI image generation — no more writing 'similar to this but better' and praying.",
    role: "Design, build & ship",
    timeline: "3 weeks",
    team: "Solo",
    status: "LIVE",
    liveUrl: "https://pixtoprompt-5116.ai.studio",
    repoUrl: null,
    image: "/projects/pixtoprompt.png",
    overview: {
      context:
        "I generate a lot of images for client mockups and pitch decks. Every time I worked from a reference, the first prompt draft was vague — 'a tree, at sunset' — and it took three or four rewrites before the generator matched the reference's framing, lighting and tone.",
      problem: [
        "Writing prompts from an image by hand is slow and inconsistent. Two people describing the same photo produce prompts that look nothing alike.",
        "AI artists, marketers and content creators run into this constantly, but the tools I found treated prompts as loose chat text, not as data with a structure the model actually rewards.",
        "The interesting part: image models reward precision. The more attributes you pin down — subject, setting, lighting, camera, composition — the closer the generations land. I wanted to extract those attributes from the pixels instead of from memory.",
      ],
      outcome:
        "Shipped a single-page tool that turns an uploaded image into a structured, model-ready prompt in one request. The model supplies the facts; a deterministic template composes the final prompt, so the output format is mine to control and version.",
    },
    problemAndGoals: {
      narrative: [
        "The core problem is vocabulary. A human describing an image uses fuzzy words: framing collapses to 'close-up', light collapses to 'nice lighting', style is implied rather than specified. Image models reward concrete attributes over adjectives.",
        "I knew a vision model could read those attributes off the pixels directly. The design question was what to do with its answer — and the answer was to never trust it verbatim.",
      ],
      goals: [
        "Turn any reference image into a structured prompt in under ~15 seconds, end to end.",
        "Output must be consistent — the same image produces the same prompt every time, for every user.",
        "Prompt structure must match what image generators actually respond to: concrete attributes, not praise.",
        "Respect cost. Vision calls bill per image and per token, so oversize inputs and repeat requests had to be handled up front.",
        "No account, no friction. One image in, one prompt out.",
      ],
      constraints: [
        "No designer and no pattern library to start from — the UI shipped in the same week as the logic.",
        "OpenAI bills per request; there was no budget for runaway calls or unbounded uploads.",
        "Browsers cap multipart uploads and memory, so very large images had to be tamed before the model ever saw them.",
      ],
    },
    process: {
      steps: [
        {
          title: "Discover",
          description:
            "Timed my own workflow: most prompts needed 3–4 rewrites. The gap was description, not talent.",
        },
        {
          title: "Design",
          description:
            "Sketched a one-screen flow: drop image, review extracted attributes, copy prompt. Single card, no chrome.",
        },
        {
          title: "Develop",
          description:
            "Built the upload → vision-parse → template pipeline in Next.js with a zod schema gate between the model and the output.",
        },
        {
          title: "Ship",
          description:
            "Deployed, monitored cost, and left a graceful error path that hands users a raw prompt fallback when the API is down.",
        },
      ],
      decisions: [
        {
          title: "Downscale before upload, not after",
          detail:
            "Resizing to a 1536px long edge before encoding cut payload sizes by up to 80% — larger generations stay sharp, cost stays linear.",
        },
        {
          title: "Structured output over free text",
          detail:
            "The vision model returns JSON validated against a zod schema. On failure it gets one retry with the exact validation error; two attempts settles nearly everything.",
        },
        {
          title: "The template owns the shape",
          detail:
            "The model supplies facts; the template composes the prompt. Output structure is versionable and decoupled from model whims.",
        },
        {
          title: "Hash the input image",
          detail:
            "Identical uploads skip the API entirely and return the cached prompt — repeat costs dropped without adding a backend.",
        },
      ],
    },
    technical: {
      architecture: [
        { layer: "Browser", detail: "Next.js client handles upload + progress states" },
        { layer: "Server route", detail: "Resize, EXIF-strip, validate, rate-limit" },
        { layer: "Vision API", detail: "Returns scene attributes as JSON against a schema" },
        { layer: "Template engine", detail: "Composes validated facts into the final prompt" },
      ],
      highlights: [
        {
          title: "Schema-gated model output",
          body: "The vision call returns JSON validated against a zod schema. Failures feed their own error message back for one retry — the model fixes its own mistakes.",
        },
        {
          title: "Cost and rate controls",
          body: "Per-image resize and token cap bound the bill. A short-window per-IP rate limit and an image-hash cache cut repeat and abuse costs to zero.",
        },
        {
          title: "Deterministic assembly",
          body: "Prompt sections (subject, setting, lighting, camera, style, tone, medium) come from fixed slots, so two runs on one image are byte-identical.",
        },
      ],
      snippets: [
        {
          title: "resize-before-encode.ts",
          code: `// Cap payload before it ever reaches the API.
// A 12MB phone photo becomes a ~1MB JPEG — faster, cheaper, same signal.
const resized = await sharp(buffer)
  .rotate()
  .resize({ width: 1536, height: 1536, fit: "inside", withoutEnlargement: true })
  .jpeg({ quality: 82 })
  .toBuffer();

const base64 = "data:image/jpeg;base64," + resized.toString("base64");`,
        },
        {
          title: "schema-gated-retry.ts",
          code: `// Validate the model's output; never trust it verbatim.
// A failed parse feeds its own error message back for one retry.
const parsed = PromptSchema.safeParse(await visionParse(base64));

if (!parsed.success && attempt < 2) {
  return retry(base64, parsed.error.message); // the model fixes its own mistake
}

return parsed.success ? parsed.data : fallbackPrompt();`,
        },
        {
          title: "build-prompt.ts",
          code: `// The model supplies facts; the template decides the shape.
export function buildPrompt(a: ParsedAttributes): string {
  return [
    section("Subject", a.subject),
    section("Setting", a.setting),
    section("Lighting", a.lighting),
    clause("Shot", a.camera, "wide-to-close coverage"),
    clause("Style", a.style),
    clause("Tone", a.tone),
    clause("Medium", a.medium),
  ].join("\\n\\n");
}`,
        },
      ],
      stackTable: [
        { category: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "TypeScript"] },
        { category: "Backend", items: ["Next.js server routes", "Zod"] },
        { category: "Database", items: ["None — stateless"] },
        { category: "Infra", items: ["AI hosting studio"] },
        { category: "Third-party", items: ["OpenAI API", "Sharp"] },
      ],
    },
    challenges: [
      {
        title: "Keeping the model on-schema",
        problem:
          "The first release asked the model for a prompt in prose. It came back as paragraphs, half-markdown, sometimes describing the photo as a character.",
        reasoning:
          "The fix wasn't a better system prompt — it was a schema. I defined exactly which fields exist and moved composition out of the model entirely.",
        fix: "Switched to JSON-only output validated against a zod schema, with a single error-fed retry on failure.",
        result:
          "Valid output on the first pass the vast majority of the time; the two-attempt loop catches almost everything else.",
      },
      {
        title: "Tel-phone-size images",
        problem:
          "Phone photos are 8–12MB. Multipart limits and base64 inflation (roughly +33% on the wire) pushed requests over limits and spiked vision cost.",
        reasoning:
          "The vision model does not need 12MB to read a scene — 1536px holds the composition, lighting and subject at a fraction of the cost.",
        fix: "Resize with EXIF-aware rotation before encoding and hard-reject anything over a size cap with a friendly message.",
        result: "Payload sizes dropped 60–80%; per-image cost stayed flat as people uploaded bigger photos.",
      },
      {
        title: "Latency reads as 'broken'",
        problem:
          "A vision round-trip plus generation feels slow next to a chat UI. The first builds had users refreshing mid-request.",
        reasoning: "Honesty beats fake progress. A spinner with 'analyzing…' sets the wrong expectation.",
        fix: "Rendered a three-stage progress line mapped to real pipeline steps: upload → parse → assemble.",
        result:
          "Users wait calmly through the ~3–10s flow, and the 'is it dead?' class of feedback dropped to zero.",
      },
    ],
    results: [
      "One request moves an image to a full structured prompt; the typical round trip is 3–10 seconds.",
      "Structured, schema-validated output — no malformed results once the retry loop shipped.",
      "Image-hash cache and pre-encode resize removed repeat and oversized-input calls from the cost equation.",
      "No analytics wired in yet — this shipped as a solo utility. The honest metric is the pipeline: parse, validate, assemble, done.",
    ],
    reflection: {
      differently:
        "I'd add usage analytics on day one — without them I can't measure whether the tool actually helps people. And a few model-specific prompt presets would have made it useful beyond Midjourney-style output.",
      reuse:
        "The schema-gated extraction pattern — validate what a model returns, never trust it — is the piece I'd reuse everywhere.",
    },
  },
  {
    slug: "cambodia-explorer",
    index: 2,
    name: "Cambodia Explorer",
    oneLiner:
      "A bilingual travel platform that brings Cambodia's temples, islands, food, tours and verified local operators into one searchable map — with AI-built itineraries.",
    role: "Design, build & ship",
    timeline: "6 weeks",
    team: "Solo",
    status: "LIVE",
    liveUrl: "https://cambodia-explorer.vercel.app",
    repoUrl: null,
    image: "/projects/cambodia-explorer.png",
    overview: {
      context:
        "Every tourist I met in Phnom Penh asked the same three questions — what to do, who to trust, what it actually costs. The answers lived in ten different places: blogs, Facebook groups, booking sites and unvetted guides who overcharge on the spot.",
      problem: [
        "Cambodia's travel information is fragmented and almost entirely English-only, which locks out Khmer speakers and leaves visitors dependent on anecdotes.",
        "No single source vetted local operators, so scams and inflated prices were a normal part of the discovery process.",
        "Crafting an itinerary meant stitching together YouTube clips, Google Maps pins and forum threads into something that made sense day by day.",
      ],
      outcome:
        "Shipped a structured platform: a destination library across temples, islands, food and tours, an interactive map the whole library hangs off, a verified-operator directory and an AI itinerary builder that turns a few preferences into a day-by-day plan — all in Khmer and English.",
    },
    problemAndGoals: {
      narrative: [
        "The pain is trust and structure. Travel content exists as prose, which is where nuance lives and where search fails. I wanted the data modelled, not written: every place typed, geocoded and related to its neighbours, so 'islands near Kampot for two days with good seafood' has a real answer instead of a blog post to read.",
        "That structure is also what makes bilingual real. One record with two language fields can't drift the way two separate translated pages can.",
      ],
      goals: [
        "Cover the four buckets people actually search for: temples, islands, food and tours.",
        "Make the interactive map the primary surface, not an add-on.",
        "A verified-operator directory with a documented, transparent vetting criterion.",
        "AI itineraries generated from a short preference form, in both Khmer and English.",
        "Full bilingual parity — not a language toggle bolted on at the end.",
      ],
      constraints: [
        "Entirely solo: research, data entry, design and build all from the same hands.",
        "No tourism-authority data export exists — every location had to be researched and audited by hand.",
        "Map providers have usage caps, so marker counts and tile calls had to stay inside a free tier.",
      ],
    },
    process: {
      steps: [
        {
          title: "Discover",
          description:
            "Talked to working guides and a dozen travellers; watched where real inquiries broke — scams, no prices, no Khmer options.",
        },
        {
          title: "Design",
          description:
            "Information architecture first: destination types, relationships, geocodes. Wireframed the map as the index, not a feature.",
        },
        {
          title: "Develop",
          description:
            "Typed the data model, localized every field, and rendered the map from a single feature set so both languages share one source of truth.",
        },
        {
          title: "Ship",
          description:
            "Deployed, then used the itinerary builder myself for a week to smoke out weak prompts and dead data.",
        },
      ],
      decisions: [
        {
          title: "One record, two languages",
          detail:
            "Every destination is a single entry with Khmer and English fields. The map and the itinerary builder read the same records, so nothing can be translated halfway.",
        },
        {
          title: "OpenStreetMap + Leaflet over a commercial SDK",
          detail:
            "No API key, no billing surprise, and the whole document stays cacheable. Mirrors the 'functional first' line of the brand.",
        },
        {
          title: "Vet before you list",
          detail:
            "Operators appear only after a documented check — registered business, verifiable contact, sample work. A small directory on purpose.",
        },
        {
          title: "Itineraries built from data, not prose",
          detail:
            "The AI assembles real destination records into a plan instead of inventing places, so every suggestion exists and is reachable on the map.",
        },
      ],
    },
    technical: {
      architecture: [
        { layer: "Browser", detail: "React SPA renders the map + library" },
        { layer: "Data layer", detail: "Typed, geocoded, bilingual records" },
        { layer: "Itinerary logic", detail: "LLM call constrained to real IDs, then validated" },
        { layer: "Map tiles", detail: "OpenStreetMap via Leaflet" },
      ],
      highlights: [
        {
          title: "Bilingual content model",
          body: "Each destination carries a { kh, en } pair for every field. An English fallback covers still-empty Khmer fields, so a missing translation never renders a blank page.",
        },
        {
          title: "Map as the index",
          body: "Every destination has coordinates. Filtering the map filters the lists and vice versa — one state, two views.",
        },
        {
          title: "Constrained generation",
          body: "The itinerary prompt is handed the actual dataset and asked to return ordered IDs. A post-step drops any ID that doesn't resolve, so the model can't hallucinate a province.",
        },
      ],
      snippets: [
        {
          title: "destination.ts",
          code: `// One record, both languages, one source of truth.
type Localized = { kh: string; en: string };

interface Destination {
  id: string;
  type: "temple" | "island" | "food" | "tour";
  name: Localized;
  province: string;
  coords: [number, number]; // lat, lng
  tags: string[];
  body: Localized;
}`,
        },
        {
          title: "validate-itinerary.ts",
          code: `// Never let a model invent a destination. Resolve every ID.
const resolved = plan.stops.map((stop) => byId.get(stop.id));
const missing = resolved.filter((stop) => stop === undefined).length;

if (missing > 0) {
  return regen(plan, missing); // re-roll, feeding the gaps back in
}
return resolved.filter(Boolean); // only real, mapped places survive`,
        },
      ],
      stackTable: [
        { category: "Frontend", items: ["React", "Tailwind CSS", "JavaScript"] },
        { category: "Data", items: ["Localized content model"] },
        { category: "Map", items: ["OpenStreetMap", "Leaflet"] },
        { category: "AI", items: ["Itinerary generation (LLM)"] },
      ],
    },
    challenges: [
      {
        title: "A 'comprehensive' site by hand",
        problem:
          "A comprehensive travel platform implies hundreds of entries. Researching and entering them solo while also building the app was the real schedule risk.",
        reasoning:
          "The honest move was to cut scope: a smaller, accurate, bilingual dataset beats a sprawling English-only one nobody can trust.",
        fix: "Typed the data model so adding a location is a data-file edit, then launched with a tight, verified core set.",
        result:
          "Launched with a 100% vetted, curated set instead of a wide-but-unverified one, and a clear shape to grow into.",
      },
      {
        title: "Two scripts, one layout",
        problem:
          "Khmer glyphs sit taller and wrap denser than Latin. The first layout hit bleeding in English clipped and cramped the moment it switched to Khmer.",
        reasoning:
          "Line-height is script-specific — '1.6' means different physical spacing in two alphabets, and no single value serves both.",
        fix: "A root-level locale class raises line-height and loosens the tightest sections under Khmer only, tuned once for the whole site.",
        result: "Both languages hold their vertical rhythm; one switch re-tunes everything with no per-field overrides.",
      },
      {
        title: "Map performance at volume",
        problem:
          "Rendering every marker through the DOM dragged pan and zoom to a stutter on mid-range phones — exactly the audience travelling in the country.",
        reasoning: "DOM markers are a liability at volume; the renderer needs to stay off the layout thread.",
        fix: "Moved rendering to Leaflet's canvas renderer and clustered nearby points below a zoom threshold.",
        result: "Smooth pan and zoom with the full marker set loaded.",
      },
    ],
    results: [
      "A bilingual, geocoded library across temples, islands, food and tours — every destination vetted from public sources.",
      "Map-first discovery: filter the map or the lists, both stay in sync.",
      "AI itineraries that resolve to real, validated destinations — no hallucinated provinces.",
      "No analytics connected yet, so I won't quote traffic. What I can quote: full Khmer/English coverage, one source of truth, verified operators only.",
    ],
    reflection: {
      differently:
        "I over-weighted the itinerary AI early and under-weighted content density. A plain, well-structured dataset does 80% of the work here; the AI is the last 20%.",
      reuse:
        "The bilingual data model — one record, two languages, zero drift — is the pattern I'd reuse without thinking twice.",
    },
  },
  {
    slug: "led-events",
    index: 3,
    name: "LED Events",
    oneLiner:
      "A premium event-production studio site for Cambodia's concert, festival and corporate scene — built to win contracts, not just to look sharp.",
    role: "Design, build & ship",
    timeline: "4 weeks",
    team: "Solo (with client input)",
    status: "LIVE",
    liveUrl: "https://led-events-cambodia.vercel.app",
    repoUrl: null,
    image: "/projects/led-events.png",
    overview: {
      context:
        "LED Events stages concerts, festivals and corporate shows across Cambodia. When I started, they had zero owned digital presence — leads came from word of mouth and a Facebook page — and they were losing corporate RFPs to firms that simply looked established on paper.",
      problem: [
        "No website meant no credible, linkable proof of capability when festival organizers and corporate procurement asked for past work and services.",
        "Their best work lived in WhatsApp photo dumps and a Facebook timeline — impossible to present, hard to reuse.",
        "Corporate clients need trust signals fast: who did this, what services were included, at what scale.",
      ],
      outcome:
        "Shipped a fast, gallery-driven site with a service catalog, a past-events portfolio and a single-path inquiry flow. Photo-first homepage, real project photography, and a booking path reachable from every page.",
    },
    problemAndGoals: {
      narrative: [
        "This was a business problem wearing a design costume. A production company sells proof: venues lit, crowds facing a stage, audio that didn't drop. The site had to make that proof visible in under ten seconds — roughly how long an RFP reviewer spends deciding who to shortlist.",
      ],
      goals: [
        "A service catalog that mirrors how clients actually buy — concerts, festivals, corporate, weddings and technical hire.",
        "A portfolio the owner can maintain without touching code.",
        "One inquiry action reachable from anywhere on the site.",
        "Reliable loading on the patchy wifi of actual event sites.",
        "English-first with Khmer for the local crew market.",
      ],
      constraints: [
        "Source media was a mess — photos spread across drives and messenger in wildly different quality.",
        "No CMS budget; maintainability had to come from structure, not a platform.",
        "The owner wanted 'impressive'; I had to keep it fast, honest and loadable on slow connections.",
      ],
    },
    process: {
      steps: [
        {
          title: "Discover",
          description:
            "Sat with the producers and logged how enquiries actually arrive — then mirrored that path online: see work, check services, ask for a quote.",
        },
        {
          title: "Design",
          description:
            "Led with a full-bleed gallery homepage where every section is a sales argument. Flat, engineered dark look so the photos own the page.",
        },
        {
          title: "Develop",
          description:
            "Service pages rendered from a data file the client can edit, a lazy-loaded gallery with venue metadata, and a typed inquiry flow.",
        },
        {
          title: "Ship",
          description:
            "Deployed, tested on a throttled 3G profile from a festival ground, and walked the owner through editing content themselves.",
        },
      ],
      decisions: [
        {
          title: "Content as editable data",
          detail:
            "Services and portfolio live in flat, clearly-structed data files. The owner edits text and adds shows without a developer in the loop.",
        },
        {
          title: "Native lazy-loading image pipeline",
          detail:
            "Photos are served at fixed, compressed widths with responsive size hints. No heavyweight lightbox that blocks the page on slow wifi.",
        },
        {
          title: "One CTA language",
          detail:
            "Every page funnels to a single inquiry action; the nav doesn't compete with 'call us / email / WhatsApp' clutter.",
        },
        {
          title: "Performance as trust",
          detail:
            "A slow site reads as a vendor that can't run its own show. An event production company's product page has to hit its cues.",
        },
      ],
    },
    technical: {
      architecture: [
        { layer: "Browser", detail: "React SPA, photo-first layout" },
        { layer: "Content layer", detail: "Editable service + portfolio data files" },
        { layer: "Gallery", detail: "Lazy, responsive, hover-metadata cards" },
        { layer: "Inquiry flow", detail: "Single CTA from every page" },
      ],
      highlights: [
        {
          title: "Gallery that degrades gracefully",
          body: "A responsive grid of frame-slot cards; hovering reveals event, venue and scale. Native lazy images keep the initial page tiny.",
        },
        {
          title: "Service catalog as data",
          body: "One component renders every service page. Adding a service is adding a data entry — no markup, no redeploy.",
        },
        {
          title: "Portfolio rhythm",
          body: "An editorial template — hero shot plus supporting frames plus credits — forces consistent quality across shows of very different vintages.",
        },
      ],
      snippets: [
        {
          title: "portfolio-card.tsx",
          code: `// Live-show photography is heavy; serve only what the slot needs.
<Image
  src={show.image}
  width={960}
  height={1200}
  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
  loading="lazy"
  className="object-cover"
/>`,
        },
      ],
      stackTable: [
        { category: "Frontend", items: ["React", "Tailwind CSS", "JavaScript"] },
        { category: "Content", items: ["Editable data files"] },
        { category: "Media", items: ["Optimized image pipeline"] },
        { category: "Infra", items: ["Static hosting (Vercel)"] },
      ],
    },
    challenges: [
      {
        title: "Media soup into a portfolio",
        problem:
          "The raw material was hundreds of photos of inconsistent quality scattered across drives and messenger threads.",
        reasoning:
          "I can't objectively curate someone else's career — but the owner knows which shows won contracts. Let them curate; I structure the result.",
        fix: "Built a short editorial template — hero shot, supporting frames, credits — and had the owner pick the shows. Consistency comes from the format.",
        result: "A portfolio that reads intentional; every show follows the same rhythm.",
      },
      {
        title: "Heavy photos on slow connections",
        problem:
          "Concert photography at 5–8MB per file would drown the page on festival-ground wifi — where clients actually browse.",
        reasoning: "Compression is a design decision, not an afterthought. Sharp at phone pixel density is enough.",
        fix: "Standardized export widths and quality, native lazy-loading, and one static LCP image the browser can prioritize.",
        result: "Usable content renders immediately; the heavy shots stream in behind it.",
      },
      {
        title: "B2B trust signaling",
        problem:
          "A corporate reviewer scanning for 'has this crew done our kind of event' had no signal from the old Facebook page.",
        reasoning:
          "For a production vendor, trust comes from visible scale and named venues — not from superlative adjectives.",
        fix: "Every portfolio card carries venue and scope metadata; services pages state capabilities explicitly.",
        result: "Reviewers self-qualify in one scroll — the shortlist decision happens on the page.",
      },
    ],
    results: [
      "Full service catalog and portfolio shipped in one build; a photo-first homepage wins the first impression.",
      "A single inquiry path reachable from every page, and on one screen on mobile.",
      "The owner self-edits content — new shows ship without a developer.",
      "I can't share the client's pipeline numbers, but honest measures hold: the site is live, fast on throttled networks, and in active use as their primary web presence.",
    ],
    reflection: {
      differently:
        "I'd have introduced a lightweight CMS on day one once it became clear how often content changes. Flat files work, but routing every edit through me is slower than it should be.",
      reuse:
        "The editorial portfolio template — fixed slots that force consistent quality — is the pattern from this build I'm proudest of.",
    },
  },
  {
    slug: "ministry-of-mines-and-energy",
    index: 4,
    name: "Ministry of Mines & Energy",
    oneLiner:
      "A bilingual portal for Cambodia's Ministry of Mines and Energy — mineral resources, geological data and the nation's energy-transition roadmap, in Khmer and English.",
    role: "Design, build & ship",
    timeline: "5 weeks",
    team: "Solo",
    status: "LIVE",
    liveUrl: "https://ministry-of-mines-and-energy.vercel.app",
    repoUrl: null,
    image: "/projects/ministry-of-mines-and-energy.png",
    overview: {
      context:
        "Ministry communications about minerals, geology and the energy transition are spread across PDFs, older pages and press releases. Citizens, investors and journalists all want the same thing: find the data, understand the plan, in the language they read.",
      problem: [
        "Mineral and energy information sat in fragmented, outdated, mostly English PDFs — unusable on mobile and nearly invisible in search.",
        "There was no bilingual system. Khmer readers got machine-translated scraps or nothing at all.",
        "An energy-transition roadmap is policy. Presenting it accurately carries weight — there is no room for marketing spin or decorative confidence.",
      ],
      outcome:
        "Shipped a bilingual portal with structured mineral-resource and energy-transition sections, data tables and downloadable reports — rendered from a single source of truth so the numbers can't diverge between languages.",
    },
    problemAndGoals: {
      narrative: [
        "Government information is high-consequence: an investor reading mineralized provinces, a citizen reading the solar roadmap, a journalist quoting a figure. The portal had to make official data legible without flattening its nuance — and it had to do it in two scripts with very different typographic personalities.",
      ],
      goals: [
        "Full Khmer/English parity — pages, tables and report labels all present in both languages, by construction.",
        "Mineral and geological data presented as data — tables and breakdowns — not buried in prose.",
        "An energy-transition roadmap section that explains policy clearly and accurately.",
        "Mobile-first: officials, journalists and citizens all read on phones.",
        "A serious, official tone. No decorative web tricks.",
      ],
      constraints: [
        "Accuracy sourcing — every statistic had to trace to published public sources; nothing invented.",
        "Two scripts, one layout — Khmer needs taller line-height and wraps differently from Latin.",
        "Official content demands consistent terminology across Khmer and English, so a vocabulary had to be fixed up front.",
      ],
    },
    process: {
      steps: [
        {
          title: "Discover",
          description:
            "Mapped the real questions — where are the minerals, how is the grid changing, what can I download — then grouped pages around the questions.",
        },
        {
          title: "Design",
          description:
            "Designed for print-grade density: tables, structured sections, restrained type. Khmer and Latin blocks tuned separately for line-height.",
        },
        {
          title: "Develop",
          description:
            "Built a locale-keyed component system where every string and spacing choice switches at the root — a page can't end up half-translated.",
        },
        {
          title: "Ship",
          description:
            "Line-by-line QA pass on language parity and data accuracy, checking every figure back to its published source.",
        },
      ],
      decisions: [
        {
          title: "Locale as a root, not a per-page choice",
          detail:
            "<html lang>, fonts, spacing and every string switch together. There is no page state where one language gets stuck while the other moves on.",
        },
        {
          title: "Typography tuned per script",
          detail:
            "The Khmer face and the Latin face get different line-heights and optical sizing, applied by a root locale class rather than by element.",
        },
        {
          title: "Numbers exist once",
          detail:
            "Mineral and energy figures are structured arrays rendered to tables, so a statistic lives in one place and both languages read from it.",
        },
        {
          title: "Downloads for the long tail",
          detail:
            "Reports stay as PDFs; the site provides the browsable, searchable view of them.",
        },
      ],
    },
    technical: {
      architecture: [
        { layer: "Browser", detail: "React SPA, print-grade density" },
        { layer: "Locale layer", detail: "Khmer/English, switched at the root" },
        { layer: "Data layer", detail: "Structured arrays → tables and charts" },
        { layer: "Reports", detail: "Source-linked downloadable PDFs" },
      ],
      highlights: [
        {
          title: "Locale-as-root",
          body: "Language, direction and typography all keyed to a single locale value. Every string is a { kh, en } pair with an English safety net.",
        },
        {
          title: "Data-driven tables",
          body: "A mineral-resource table is an array, not markup. Headers and labels render per locale; the numbers are typed in exactly once.",
        },
        {
          title: "Serious-density layout",
          body: "Facts first, tables for data, prose only where policy needs explanation. The pages read like a briefing, not a brochure.",
        },
      ],
      snippets: [
        {
          title: "pick-locale.ts",
          code: `// Every label is bilingual; English is the safety net
// for still-empty Khmer fields.
function pick(fields: Localized, locale: Locale): string {
  return fields[locale] || fields.en;
}`,
        },
        {
          title: "table-from-data.tsx",
          code: `// A resource table is data, not markup. The numbers
// exist in one array and render in both languages.
const rows = RESOURCE_DATA.map((r) => ({
  province: pick(r.province, locale),
  commodity: pick(r.commodity, locale),
  status: pick(r.status, locale),
}));`,
        },
      ],
      stackTable: [
        { category: "Frontend", items: ["React", "Tailwind CSS", "JavaScript"] },
        { category: "Bilingual", items: ["Khmer/English locale system"] },
        { category: "Data", items: ["Structured tables and charts"] },
        { category: "Infra", items: ["Static hosting (Vercel)"] },
      ],
    },
    challenges: [
      {
        title: "Two scripts, different typography",
        problem:
          "Khmer text runs taller and denser than Latin; the layout that looked right in English clipped and overlapped the moment it switched.",
        reasoning:
          "No single line-height serves both alphabets — the same value produces different physical spacing in each.",
        fix: "Added a script-tuned class at the root that only changes spacing under the Khmer locale, tuned once for the entire site.",
        result: "Both languages hold their vertical rhythm, and one switch re-tunes everything.",
      },
      {
        title: "Accuracy under pressure",
        problem:
          "One wrong figure on a government-style page is worse than a typo — a journalist quoting it becomes a correction for everyone.",
        reasoning: "The counter-error move is structure: a number must exist once, in one source of truth.",
        fix: "Moved every statistic into structured data with a provenance note beside it; both language tables render from the same array.",
        result: "No duplicated numbers left to drift — the same figure cannot become two values in two languages.",
      },
      {
        title: "Density without clutter",
        problem:
          "Official content is dense before you start; a naive hero-plus-cards template would bury the actual data under decoration.",
        reasoning: "Government readers scan for specifics — who, what, where, how much. Lead with those; decorate with nothing.",
        fix: "A typed section layout: facts first, tables for data, prose only where a policy needs explaining.",
        result: "The pages read like a briefing, and the constraint set the visual language instead of fighting it.",
      },
    ],
    results: [
      "Full bilingual parity across pages and tables, with half-translated states impossible by construction.",
      "Mineral, geological and energy figures rendered from single sources, traceable per statistic.",
      "Energy-transition roadmap delivered as structured, readable policy rather than a press release.",
      "No public traffic analytics for an official portal — the honest measures are correctness and language-pair coverage, both verified in a line-by-line QA pass.",
    ],
    reflection: {
      differently:
        "I'd prototype in Khmer first. Every layout decision made in English had to be re-litigated the moment Khmer text landed.",
      reuse:
        "The locale-as-root pattern — one switch, zero drift — is the strongest piece here and carries straight into any multilingual build.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getNextCaseStudy(slug: string): CaseStudy {
  const current = getCaseStudy(slug) ?? caseStudies[0];
  const next = caseStudies[current.index % caseStudies.length];
  return next;
}