// import { createAgent, gemini } from "@inngest/agent-kit";

// const analyzeTicket = async (ticket) => {
//   const supportAgent = createAgent({
//     model: gemini({
//       model: "gemini-1.5-flash-8b",
//       apiKey: process.env.GEMINI_API_KEY,
//     }),
//     name: "AI Ticket Triage Assistant",
//     system: `You are an expert AI assistant that processes technical support tickets.

// Your job is to:
// 1. Summarize the issue.
// 2. Estimate its priority.
// 3. Provide helpful notes and resource links for human moderators.
// 4. List relevant technical skills required.

// IMPORTANT:
// - Respond with *only* valid raw JSON.
// - Do NOT include markdown, code fences, comments, or any extra formatting.
// - The format must be a raw JSON object.

// Repeat: Do not wrap your output in markdown or code fences.`,
//   });

//   const response =
//     await supportAgent.run(`You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.

// Analyze the following support ticket and provide a JSON object with:

// - summary: A short 1-2 sentence summary of the issue.
// - priority: One of "low", "medium", or "high".
// - helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
// - relatedSkills: An array of relevant skills required to solve the issue (e.g., ["React", "MongoDB"]).

// Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

// {
// "summary": "Short summary of the ticket",
// "priority": "high",
// "helpfulNotes": "Here are useful tips...",
// "relatedSkills": ["React", "Node.js"]
// }

// ---

// Ticket information:

// - Title: ${ticket.title}
// - Description: ${ticket.description}`);

//   const raw = response.output[0].context;

//   try {
//     const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
//     const jsonString = match ? match[1] : raw.trim();
//     return JSON.parse(jsonString);
//   } catch (e) {
//     console.log("Failed to parse JSON from AI response" + e.message);
//     return null; // watch out for this
//   }
// };

// export default analyzeTicket;

import {createAgent, gemini} from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
    const supportAgent = createAgent({
        model: gemini({
            model: "gemini-1.5-flash-8b",
            apiKey: process.env.GEMINI_API_KEY,
        }),
        name: "AI Ticket Triage Assistant",
        system: `You are an expert AI assistant that processes technical support tickets.

Your job is to:
1. Summarize the issue.
2. Estimate its priority.
3. Provide helpful notes and resource links.
4. List relevant technical skills.

Respond ONLY with valid raw JSON.
No markdown, no code blocks, no comments.`,
    });

    const response = await supportAgent.run(`
Analyze this ticket and return strict JSON with:
{
  "summary": "Short summary",
  "priority": "high",
  "helpfulNotes": "Technical explanation",
  "relatedSkills": ["MongoDB", "Node.js"]
}

Ticket:
Title: ${ticket.title}
Description: ${ticket.description}
`);

    try {
        const rawContent = response.output?.[0]?.content;
        console.log(rawContent);

        if (!rawContent) {
            throw new Error("AI returned no content.");
        }

        // Extract JSON string (remove optional ```json blocks)
        const match = rawContent.match(/```json\s*([\s\S]*?)\s*```/) || [];
        const jsonStr = match[1] || rawContent.trim();

        const parsed = JSON.parse(jsonStr);

        // Optional validation
        if (!["low", "medium", "high"].includes(parsed.priority)) {
            parsed.priority = "medium";
        }
        if (!Array.isArray(parsed.relatedSkills)) {
            parsed.relatedSkills = [];
        }

        return parsed;
    } catch (e) {
        console.error("🧠 Raw AI response:", response);
        console.error("❌ Failed to parse AI response:", e.message);
        return null;
    }
};

export default analyzeTicket;
