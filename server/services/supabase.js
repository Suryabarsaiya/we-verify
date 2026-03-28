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
                avg_score: (() => {
                    try {
                        const s = report.scores || {};
                        const get = (v) => (typeof v === 'number' ? v : Number(v?.score) || 0);
                        return Math.round((get(s.marketViability || s.market_viability) +
                            get(s.customerClarity || s.customer_clarity) +
                            get(s.competitionIntensity || s.competition_intensity) +
                            get(s.risk)) / 4);
                    } catch { return 0; }
                })(),
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
async function saveLead({ email, idea_title, verdict, avg_score }) {
    if (!supabase) return null;

    try {
        const { data, error } = await supabase
            .from('leads')
            .insert([{
                email,
                idea_title: idea_title || '',
                verdict: verdict || '',
                avg_score: avg_score || 0,
                created_at: new Date().toISOString()
            }])
            .select();

        if (error) throw error;
        console.log(`  📧 Lead saved: ${email}`);
        return data?.[0]?.id;
    } catch (err) {
        console.error('Failed to save lead:', err.message);
        return null;
    }
}

async function dbCheck() {
    if (!supabase) return { status: 'disconnected', message: 'Supabase not configured' };

    try {
        const { count: validationCount, error: e1 } = await supabase
            .from('validations')
            .select('*', { count: 'exact', head: true });

        const { count: leadCount, error: e2 } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true });

        return {
            status: 'connected',
            tables: {
                validations: { count: e1 ? `error: ${e1.message}` : validationCount },
                leads: { count: e2 ? `error: ${e2.message}` : leadCount }
            }
        };
    } catch (err) {
        return { status: 'error', message: err.message };
    }
}

module.exports = { initSupabase, saveValidationRecord, saveLead, dbCheck };
