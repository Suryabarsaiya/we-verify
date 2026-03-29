const llm = require('../services/llm');

/**
 * 1. Legal Risk Analyzer Agent (India Specific)
 */
async function analyzeLegalRisks(ideaStr) {
    const prompt = `You are a top-tier Indian Corporate Lawyer specializing in tech startups.
Evaluate the legality of the following startup idea strictly within the context of Indian Law (IT Act 2000, RBI regulations, SEBI, DPDPA 2023, etc.).
Idea: "${ideaStr}"

You must output STRICT JSON. Provide deep research citations.
{
  "legality_score": 85, 
  "risk_level": "Low" or "Medium" or "High",
  "key_risks": ["Risk bullet 1 with specific Act/Section cited", "Risk 2"]
}`;
    
    // We expect a JSON object containing { legality_score, risk_level, key_risks }
    return await llm.fetchJSON(prompt, { useGemini: true });
}

/**
 * 2. Compliance Advisor Agent (India Specific)
 */
async function adviseCompliance(ideaStr, riskData) {
    const prompt = `You are an Indian Startup Compliance Architect.
A founder has an idea: "${ideaStr}".
The Legal AI assessed these risks: ${JSON.stringify(riskData.key_risks)}.

Determine how to make this idea legally operational in India. Conduct deep research into exact licenses.
Output STRICT JSON:
{
  "compliance_steps": ["Step 1 referencing specific Indian legal clauses", "Step 2"],
  "required_documents": ["CIN Incorporation (MCA)", "GST Registration", "Specific License (e.g., FSSAI, RBI NBFC)"],
  "regulatory_bodies": ["RBI", "SEBI", "MCA", "MeitY", etc.]
}`;
    
    return await llm.fetchJSON(prompt, { useGemini: true });
}

/**
 * 3. Funding & Acceleration Agent (India Specific)
 */
async function findFunding(ideaStr) {
    const prompt = `You are an Indian Venture Capital Analyst and Startup India Expert.
A founder has this idea: "${ideaStr}".

Identify the precise Indian government schemes, grants, incubators, and private funding options available for this specific niche. Do deep research. Provide exact scheme names.
Output STRICT JSON:
{
  "government_schemes": ["Startup India Seed Fund (SISFS) up to ₹50 Lakhs", "DPIIT Recognition", etc.],
  "incubators": ["T-Hub (Hyderabad)", "NASSCOM 10k Startups", "Specific domain incubators"],
  "funding_options": ["Angel Networks (e.g. Indian Angel Network)", "Specific VC Firms", "Grants"]
}`;
    
    return await llm.fetchJSON(prompt, { useGemini: true });
}

/**
 * Main Orchestration Endpoint for the Accelerator Page
 */
async function runAccelerationPipeline(ideaStr) {
    console.log(`\n⚖️ STARTING INDIAN LEGAL/FUNDING AI FOR: "${ideaStr}"`);
    const startTime = Date.now();

    try {
        // Step 1: Legal Risk Analyzer
        console.log(`  [Agent 1] Analyzing Legal Risks...`);
        const legalData = await analyzeLegalRisks(ideaStr);

        // Step 2: Compliance Advisor (Takes input from Agent 1)
        console.log(`  [Agent 2] Drafting Compliance Steps...`);
        const complianceData = await adviseCompliance(ideaStr, legalData);

        // Step 3: Funding & Acceleration (Can run in parallel with 2 but we run sequential for safety)
        console.log(`  [Agent 3] Identifying Funding/Grants...`);
        const fundingData = await findFunding(ideaStr);

        console.log(`✅ ACCELERATOR PIPELINE COMPLETE in ${Date.now() - startTime}ms`);

        // Assemble Final UI Payload
        return {
            legalityScore: Number(legalData.legality_score) || 50,
            riskLevel: legalData.risk_level || "Unknown",
            keyRisks: legalData.key_risks || [],
            complianceSteps: complianceData.compliance_steps || [],
            requiredDocuments: complianceData.required_documents || [],
            regulatoryBodies: complianceData.regulatory_bodies || [],
            governmentSchemes: fundingData.government_schemes || [],
            incubators: fundingData.incubators || [],
            fundingOptions: fundingData.funding_options || []
        };
    } catch (err) {
        console.error('Accelerator Pipeline Error:', err);
        throw new Error('Acceleration AI failed to process. ' + err.message);
    }
}

module.exports = { runAccelerationPipeline };
