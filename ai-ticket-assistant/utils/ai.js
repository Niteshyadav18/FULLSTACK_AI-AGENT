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
