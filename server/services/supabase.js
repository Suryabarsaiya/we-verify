const { createClient } = require('@supabase/supabase-js');

let supabase = null;

function initSupabase() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;

    if (url && key && url.startsWith('http')) {
        supabase = createClient(url, key);
        console.log('  Supabase: ✅ connected');
    } else {
        console.warn('  Supabase: ⚠️ URL or KEY missing/invalid. Database logging disabled.');
    }
}

async function saveValidationRecord(idea, report, trace) {
    if (!supabase) return null;

    try {
        const { data, error } = await supabase
            .from('validations')
            .insert([{
                idea_title: idea.title,
                idea_summary: idea.summary,
                target_market: idea.targetMarket,
                business_model: idea.businessModel,
                verdict: report.verdict,
                avg_score: report.scores ? Math.round(
                    (report.scores.marketViability.score +
                        report.scores.customerClarity.score +
                        report.scores.competitionIntensity.score +
                        report.scores.risk.score) / 4
                ) : 0,
                full_report: report,
                pipeline_trace: trace,
                created_at: new Date().toISOString()
            }])
            .select();

        if (error) throw error;
        return data?.[0]?.id;
    } catch (err) {
        console.error('Failed to save to Supabase:', err.message);
        return null;
    }
}

module.exports = { initSupabase, saveValidationRecord };
