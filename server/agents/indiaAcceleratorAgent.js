const llm = require('../services/llm');

/**
 * 1. Legal Risk Analyzer Agent (India Specific)
 */
async function analyzeLegalRisks(ideaStr) {
    const prompt = `You are a top-tier Indian Corporate Lawyer specializing in tech startups.
Evaluate the legality of the following startup idea strictly within the context of Indian Law.

Idea: "${ideaStr}"

IMPORTANT: Output ONLY raw JSON with no markdown, no code fences, no ** bold **, no * italic *.
Plain text strings only inside JSON values.

{
  "legality_score": 75,
  "risk_level": "Low or Medium or High",
  "key_risks": ["Risk 1 citing specific Indian Act/Section", "Risk 2", "Risk 3"]
}`;
    
    return await llm.fetchJSON(prompt);
}

/**
 * 2. Compliance Advisor Agent (India Specific)
 */
async function adviseCompliance(ideaStr, riskData) {
    const prompt = `You are an Indian Startup Compliance Architect.
Startup idea: "${ideaStr}"
Legal risks identified: ${JSON.stringify(riskData.key_risks || [])}

Determine exact steps to make this idea legally operational in India.

IMPORTANT: Output ONLY raw JSON with no markdown, no code fences, no ** bold **, no * italic *.
Plain text strings only inside JSON values.

{
  "compliance_steps": ["Step 1 with specific Indian law reference", "Step 2", "Step 3"],
  "required_documents": ["CIN Incorporation via MCA", "GST Registration", "Specific license name"],
  "regulatory_bodies": ["MCA", "GSTN", "MeitY", "RBI"]
}`;
    
    return await llm.fetchJSON(prompt);
}

/**
 * 3. Funding & Acceleration Agent (India Specific)
 */
async function findFunding(ideaStr) {
    const prompt = `You are an Indian Venture Capital Analyst and Startup India Expert.
Startup idea: "${ideaStr}"

List exact Indian government schemes, grants, incubators and private funding sources for this niche.

IMPORTANT: Output ONLY raw JSON with no markdown, no code fences, no ** bold **, no * italic *.
Plain text strings only inside JSON values.

{
  "government_schemes": ["Startup India Seed Fund Scheme (SISFS) up to Rs 50 Lakhs", "DPIIT Recognition", "Scheme name 3"],
  "incubators": ["T-Hub Hyderabad", "NASSCOM 10k Startups", "Domain specific incubator"],
  "funding_options": ["Indian Angel Network", "Specific VC firm name", "Grant program name"]
}`;
    
    return await llm.fetchJSON(prompt);
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
        console.log(`  [Agent 1] Done. Score: ${legalData.legality_score}, Risk: ${legalData.risk_level}`);

        // Step 2: Compliance Advisor (Takes input from Agent 1)
        console.log(`  [Agent 2] Drafting Compliance Steps...`);
        const complianceData = await adviseCompliance(ideaStr, legalData);
        console.log(`  [Agent 2] Done. Steps: ${complianceData.compliance_steps?.length}`);

        // Step 3: Funding & Acceleration
        console.log(`  [Agent 3] Identifying Funding/Grants...`);
        const fundingData = await findFunding(ideaStr);
        console.log(`  [Agent 3] Done. Schemes: ${fundingData.government_schemes?.length}`);

        console.log(`✅ ACCELERATOR PIPELINE COMPLETE in ${Date.now() - startTime}ms`);

        // Assemble Final UI Payload
        return {
            legalityScore: Number(legalData.legality_score) || 50,
            riskLevel: legalData.risk_level || 'Unknown',
            keyRisks: Array.isArray(legalData.key_risks) ? legalData.key_risks : [],
            complianceSteps: Array.isArray(complianceData.compliance_steps) ? complianceData.compliance_steps : [],
            requiredDocuments: Array.isArray(complianceData.required_documents) ? complianceData.required_documents : [],
            regulatoryBodies: Array.isArray(complianceData.regulatory_bodies) ? complianceData.regulatory_bodies : [],
            governmentSchemes: Array.isArray(fundingData.government_schemes) ? fundingData.government_schemes : [],
            incubators: Array.isArray(fundingData.incubators) ? fundingData.incubators : [],
            fundingOptions: Array.isArray(fundingData.funding_options) ? fundingData.funding_options : []
        };
    } catch (err) {
        console.error('Accelerator Pipeline Error:', err.message);
        throw new Error('Acceleration AI failed: ' + err.message);
    }
}

module.exports = { runAccelerationPipeline };
