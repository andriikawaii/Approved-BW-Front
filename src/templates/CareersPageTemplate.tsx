"use client";

import { useEffect, useRef, useState } from "react";
import type { CMSPage } from "@/types/cms";
import { HeroTrustBar, cls, label, linkNode, media, parts, section, sections } from "./template-utils";
import { ArrowRight, ArrowLeft, Check, Upload } from "lucide-react";

/* ── fade-up ── */
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const els = c.querySelectorAll<HTMLElement>(".fade-up");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

const fu: React.CSSProperties = { opacity: 0, transform: "translateY(30px)", transition: "opacity 0.7s ease, transform 0.7s ease" };

/* ── trade icons ── */
const tradeIcons: Record<string, React.ReactNode> = {
  carpentry: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  tile: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  flooring: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><rect x="1" y="6" width="22" height="12" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/><line x1="1" y1="14" x2="23" y2="14"/><line x1="8" y1="6" x2="8" y2="10"/><line x1="16" y1="6" x2="16" y2="10"/><line x1="12" y1="10" x2="12" y2="14"/><line x1="6" y1="14" x2="6" y2="18"/><line x1="18" y1="14" x2="18" y2="18"/></svg>,
  painting: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><path d="M19 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/><path d="M12 11v6"/><path d="M8 17h8"/></svg>,
  electrical: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  plumbing: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><path d="M6 2v6h6V2"/><path d="M9 8v4a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4V8"/><path d="M15 2v6h4V2"/></svg>,
  "general labor": <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  other: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
};

function getTradeIcon(trade: string) {
  return tradeIcons[trade.toLowerCase()] || tradeIcons.other;
}

/* ── benefit card icons ── */
const benefitIcons: Record<string, React.ReactNode> = {
  steady: <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="24" height="24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  pay: <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="24" height="24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  local: <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="24" height="24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  respect: <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="24" height="24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
};

function pickBenefitIcon(title?: string) {
  if (!title) return benefitIcons.steady;
  const l = title.toLowerCase();
  if (l.includes("pay") || l.includes("fair")) return benefitIcons.pay;
  if (l.includes("local") || l.includes("project")) return benefitIcons.local;
  if (l.includes("respect") || l.includes("team")) return benefitIcons.respect;
  return benefitIcons.steady;
}

/* ══════════════════════════════════════════════════════════════ */
/* WIZARD COMPONENT                                              */
/* ══════════════════════════════════════════════════════════════ */
function ApplicationWizard({ data }: { data: any }) {
  const [step, setStep] = useState(1);
  const [trades, setTrades] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [toggles, setToggles] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [county, setCounty] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const wizRef = useRef<HTMLDivElement>(null);

  const tradeOptions = data?.trades || ["Carpentry", "Tile", "Flooring", "Painting", "Electrical", "Plumbing", "General Labor", "Other"];
  const expOptions = data?.experience_options || ["1-3", "3-5", "5-10", "10+"];
  const countyOptions = data?.county_options || ["Fairfield", "New Haven", "Both"];
  const sourceOptions = data?.source_options || ["Google", "Referral", "Job Board", "Social Media", "Other"];

  function goTo(s: number) {
    setStep(s);
    setTimeout(() => wizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }

  function nextStep(current: number) {
    if (current === 1 && trades.length === 0) { setErrors({ 1: "Please select at least one trade." }); return; }
    if (current === 2 && !experience) { setErrors({ 2: "Please select your experience level." }); return; }
    if (current === 3) {
      if (!formValues.name?.trim() || !formValues.phone?.trim() || !formValues.email?.trim()) {
        setErrors({ 3: "Please fill in the required fields." }); return;
      }
    }
    setErrors({});
    goTo(current + 1);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const progressWidth = step === 1 ? "0%" : step === 2 ? "33%" : step === 3 ? "66%" : "100%";

  if (submitted) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(188,145,85,0.1)]">
          <Check className="h-8 w-8 text-[#bc9155]" />
        </div>
        <h3 className="font-serif text-[28px] font-bold">Application Received</h3>
        <p className="mx-auto mt-3 max-w-[420px] text-[15px] leading-7 text-[#5c677d]">Thank you. We review every application personally and will be in touch within 48 hours.</p>
      </div>
    );
  }

  return (
    <div ref={wizRef} className="careers-wizard-wrap">
      {/* Progress */}
      <div className="careers-wizard-progress">
        <div className="careers-wizard-track" />
        <div className="careers-wizard-fill" style={{ width: progressWidth }} />
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="contents">
            <div className={cls("careers-wizard-dot", s <= step ? "active" : "")}>{s <= step && s < step ? <Check className="h-3.5 w-3.5" /> : s}</div>
            {s < 4 ? <div className="flex-1" /> : null}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1: Trade */}
        {step === 1 && (
          <div className="careers-wizard-step-anim">
            <h3 className="mb-2 text-center font-serif text-[24px] font-bold">What is Your Trade?</h3>
            <p className="mb-7 text-center text-[15px] leading-[1.6] text-[#5c677d]">Select one or more that apply.</p>
            <div className="careers-trade-grid">
              {tradeOptions.map((trade: string) => (
                <div
                  key={trade}
                  className={cls("careers-trade-card", trades.includes(trade) ? "selected" : "")}
                  onClick={() => setTrades((prev) => prev.includes(trade) ? prev.filter((t) => t !== trade) : [...prev, trade])}
                >
                  <span className="mb-2 block leading-none">{getTradeIcon(trade)}</span>
                  <span className="text-[13px] font-semibold text-[#1e2b43]">{trade}</span>
                </div>
              ))}
            </div>
            {errors[1] ? <p className="mt-2 text-center text-[13px] text-[#c0392b]">{errors[1]}</p> : null}
            <div className="mt-8 flex items-center justify-between gap-4">
              <div />
              <button type="button" onClick={() => nextStep(1)} className="careers-wizard-btn-next">Next <ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        )}

        {/* STEP 2: Experience */}
        {step === 2 && (
          <div className="careers-wizard-step-anim">
            <h3 className="mb-2 text-center font-serif text-[24px] font-bold">Tell Us About Your Experience</h3>
            <p className="mb-7 text-center text-[15px] leading-[1.6] text-[#5c677d]">A few quick questions so we know what to expect.</p>

            <div className="mb-6">
              <label className="mb-2.5 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1e2b43]">Years of Experience</label>
              <div className="careers-exp-options">
                {expOptions.map((opt: string) => (
                  <div key={opt} className={cls("careers-exp-option", experience === opt ? "selected" : "")} onClick={() => setExperience(opt)}>{opt}</div>
                ))}
              </div>
            </div>

            {[
              { field: "tools", question: "Do you have your own tools?" },
              { field: "vehicle", question: "Do you have your own vehicle?" },
              { field: "insurance", question: "Do you have liability insurance?" },
            ].map(({ field, question }) => (
              <div key={field} className="careers-toggle-row">
                <span className="text-[15px] font-medium text-[#1e2b43]">{question}</span>
                <div className="flex gap-2">
                  {["Yes", "No"].map((v) => (
                    <button key={v} type="button" className={cls("careers-toggle-btn", toggles[field] === v ? "selected" : "")} onClick={() => setToggles((prev) => ({ ...prev, [field]: v }))}>{v}</button>
                  ))}
                </div>
              </div>
            ))}

            {errors[2] ? <p className="mt-2 text-center text-[13px] text-[#c0392b]">{errors[2]}</p> : null}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button type="button" onClick={() => goTo(1)} className="careers-wizard-btn-back"><ArrowLeft className="h-3.5 w-3.5" /> Back</button>
              <button type="button" onClick={() => nextStep(2)} className="careers-wizard-btn-next">Next <ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        )}

        {/* STEP 3: Your Info */}
        {step === 3 && (
          <div className="careers-wizard-step-anim">
            <h3 className="mb-2 text-center font-serif text-[24px] font-bold">Your Info</h3>
            <p className="mb-7 text-center text-[15px] leading-[1.6] text-[#5c677d]">How do we reach you?</p>

            <div className="careers-wizard-form-row">
              <div className="careers-wizard-form-group">
                <label>Name *</label>
                <input type="text" placeholder="Your full name" required value={formValues.name || ""} onChange={(e) => setFormValues((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="careers-wizard-form-group">
                <label>Phone *</label>
                <input type="tel" placeholder="(203) 000-0000" required value={formValues.phone || ""} onChange={(e) => setFormValues((p) => ({ ...p, phone: e.target.value }))} />
              </div>
            </div>
            <div className="careers-wizard-form-row">
              <div className="careers-wizard-form-group">
                <label>Email *</label>
                <input type="email" placeholder="you@email.com" required value={formValues.email || ""} onChange={(e) => setFormValues((p) => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="careers-wizard-form-group">
                <label>City / Town</label>
                <input type="text" placeholder="Your city or town" value={formValues.city || ""} onChange={(e) => setFormValues((p) => ({ ...p, city: e.target.value }))} />
              </div>
            </div>
            <div className="careers-wizard-form-group">
              <label>Preferred County to Work In</label>
              <div className="careers-county-options">
                {countyOptions.map((c: string) => (
                  <div key={c} className={cls("careers-county-option", county === c ? "selected" : "")} onClick={() => setCounty(c)}>{c}</div>
                ))}
              </div>
            </div>

            {errors[3] ? <p className="mt-2 text-center text-[13px] text-[#c0392b]">{errors[3]}</p> : null}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button type="button" onClick={() => goTo(2)} className="careers-wizard-btn-back"><ArrowLeft className="h-3.5 w-3.5" /> Back</button>
              <button type="button" onClick={() => nextStep(3)} className="careers-wizard-btn-next">Next <ArrowRight className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        )}

        {/* STEP 4: Almost Done */}
        {step === 4 && (
          <div className="careers-wizard-step-anim">
            <h3 className="mb-2 text-center font-serif text-[24px] font-bold">Almost Done</h3>
            <p className="mb-7 text-center text-[15px] leading-[1.6] text-[#5c677d]">Tell us a bit more and you are all set.</p>

            <div className="careers-wizard-form-group">
              <label>Recent Projects</label>
              <textarea rows={3} placeholder="What kind of projects have you worked on recently?" value={formValues.projects || ""} onChange={(e) => setFormValues((p) => ({ ...p, projects: e.target.value }))} />
            </div>

            <div className="careers-wizard-form-group">
              <label>Upload Photos of Recent Work</label>
              <div className="careers-file-upload" onClick={() => document.getElementById("careers-file-input")?.click()}>
                <Upload className="mx-auto mb-2 h-6 w-6 text-[#bc9155]" />
                <p className="text-[14px] text-[#5c677d]"><span className="font-semibold text-[#1e2b43]">Click to upload</span> or drag photos here</p>
                <p className="mt-1 text-[12px] text-[#5c677d]">JPEG, PNG, or HEIC</p>
              </div>
              <input id="careers-file-input" type="file" multiple accept="image/jpeg,image/png,image/heic,.heic" className="hidden" onChange={(e) => setFiles(Array.from(e.target.files || []).map((f) => f.name))} />
              {files.length > 0 && <p className="mt-2 text-[12px] text-[#5c677d]">{files.join(", ")}</p>}
            </div>

            <div className="careers-wizard-form-group">
              <label>How Did You Hear About Us?</label>
              <select value={formValues.source || ""} onChange={(e) => setFormValues((p) => ({ ...p, source: e.target.value }))}>
                <option value="" disabled>Select one</option>
                {sourceOptions.map((o: string) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            {errors[4] ? <p className="mt-2 text-center text-[13px] text-[#c0392b]">{errors[4]}</p> : null}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button type="button" onClick={() => goTo(3)} className="careers-wizard-btn-back"><ArrowLeft className="h-3.5 w-3.5" /> Back</button>
              <button type="submit" className="careers-wizard-btn-submit">Submit Application <Check className="h-3.5 w-3.5" /></button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/* MAIN TEMPLATE                                                 */
/* ══════════════════════════════════════════════════════════════ */
export function CareersPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "hero");
  const trust = sections<any>(page, "trust_bar")[0];
  const rich = sections<any>(page, "rich_text");

  const benefitsSection = rich[0]; // "Why Work With Us"
  const rolesSection = rich[1];    // "Who We Work With"
  const wizardSection = rich[2];   // "Submit Your Application" — wizard config

  const heroParts = parts(hero?.headline, hero?.highlight_text || "BuiltWell CT");
  const fadeRef = useFadeUp();

  return (
    <div ref={fadeRef} className="bg-white text-[#1e2b43]">
      <style>{`
        /* ── WHY WORK WITH US CARDS ── */
        .careers-page .included-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
        .careers-page .included-card { background:#fff; border-radius:12px; padding:32px 24px; text-align:center; box-shadow:0 2px 12px rgba(30,43,67,0.06),0 1px 3px rgba(30,43,67,0.04); transition:all 0.35s cubic-bezier(0.4,0,0.2,1); border-bottom:2px solid transparent; }
        .careers-page .included-card:hover { transform:translateY(-4px); border-bottom-color:#BC9155; box-shadow:0 12px 28px rgba(30,43,67,0.1),0 28px 56px rgba(30,43,67,0.12); }
        .careers-page .included-card-icon { width:56px; height:56px; border-radius:50%; background:rgba(188,145,85,0.1); display:flex; align-items:center; justify-content:center; margin:0 auto 20px; }
        .careers-page .included-card-icon svg { width:24px; height:24px; }
        .careers-page .included-card h3 { font-size:18px; margin-bottom:10px; font-family:'Inter',sans-serif; font-weight:600; }
        .careers-page .included-card p { font-size:14px; color:#5c677d; line-height:1.65; }

        /* ── ROLE PILLS ── */
        .careers-page .roles-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; max-width:800px; margin:0 auto; }
        .careers-page .role-pill { font-size:14px; font-weight:600; color:#1e2b43; background:#f5f1e9; padding:14px 16px; border-radius:50px; text-align:center; letter-spacing:0.2px; transition:all 0.2s; white-space:nowrap; border:1px solid rgba(30,43,67,0.06); }
        .careers-page .role-pill:hover { background:rgba(188,145,85,0.1); color:#9a7340; border-color:#bc9155; }
        .careers-page .roles-note { text-align:center; font-size:15px; color:#5c677d; margin-top:32px; max-width:620px; margin-left:auto; margin-right:auto; line-height:1.7; }

        /* ── WIZARD ── */
        .careers-wizard-wrap { background:#fff; border-radius:12px; padding:40px 48px; max-width:800px; margin:0 auto; border:1px solid rgba(30,43,67,0.08); box-shadow:0 16px 48px rgba(30,43,67,0.1),0 4px 12px rgba(30,43,67,0.04); }
        .careers-wizard-progress { display:flex; align-items:center; margin-bottom:40px; position:relative; }
        .careers-wizard-track { position:absolute; top:50%; left:0; right:0; height:3px; background:rgba(30,43,67,0.08); transform:translateY(-50%); z-index:0; border-radius:3px; }
        .careers-wizard-fill { position:absolute; top:50%; left:0; height:3px; background:#bc9155; transform:translateY(-50%); z-index:1; border-radius:3px; transition:width 0.4s ease; }
        .careers-wizard-dot { width:36px; height:36px; border-radius:50%; background:#fff; border:3px solid rgba(30,43,67,0.12); display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:#5c677d; position:relative; z-index:2; transition:all 0.3s; flex-shrink:0; }
        .careers-wizard-dot.active { border-color:#bc9155; background:#bc9155; color:#fff; }
        .careers-wizard-step-anim { animation:carWizFadeIn 0.35s ease; }
        @keyframes carWizFadeIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }

        .careers-trade-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        .careers-trade-card { padding:20px 12px; border-radius:8px; border:2px solid rgba(30,43,67,0.1); text-align:center; cursor:pointer; transition:all 0.2s; background:#fff; user-select:none; }
        .careers-trade-card:hover { border-color:#bc9155; }
        .careers-trade-card.selected { border-color:#bc9155; background:rgba(188,145,85,0.1); }

        .careers-exp-options { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
        .careers-exp-option { padding:16px 12px; border-radius:8px; border:2px solid rgba(30,43,67,0.1); text-align:center; cursor:pointer; transition:all 0.2s; background:#fff; font-size:15px; font-weight:600; color:#1e2b43; min-height:48px; display:flex; align-items:center; justify-content:center; }
        .careers-exp-option:hover { border-color:#bc9155; }
        .careers-exp-option.selected { border-color:#bc9155; background:rgba(188,145,85,0.1); color:#9a7340; }

        .careers-toggle-row { display:flex; align-items:center; justify-content:space-between; padding:16px 0; border-bottom:1px solid rgba(30,43,67,0.06); }
        .careers-toggle-row:last-of-type { border-bottom:none; }
        .careers-toggle-btn { padding:10px 24px; border-radius:6px; border:2px solid rgba(30,43,67,0.12); background:#fff; font-size:14px; font-weight:600; color:#1e2b43; cursor:pointer; transition:all 0.2s; min-width:64px; min-height:48px; text-align:center; font-family:'Inter',sans-serif; }
        .careers-toggle-btn:hover { border-color:#bc9155; }
        .careers-toggle-btn.selected { border-color:#bc9155; background:rgba(188,145,85,0.1); color:#9a7340; }

        .careers-wizard-form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .careers-wizard-form-group { margin-bottom:16px; }
        .careers-wizard-form-group label { display:block; font-size:13px; font-weight:600; color:#1e2b43; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px; }
        .careers-wizard-form-group input,
        .careers-wizard-form-group select,
        .careers-wizard-form-group textarea { width:100%; padding:12px 14px; border:1px solid rgba(30,43,67,0.15); border-radius:6px; font-family:'Inter',sans-serif; font-size:15px; color:#1e2b43; background:#fff; transition:border-color 0.2s; -webkit-appearance:none; appearance:none; }
        .careers-wizard-form-group input:focus,
        .careers-wizard-form-group select:focus,
        .careers-wizard-form-group textarea:focus { outline:none; border-color:#bc9155; }
        .careers-wizard-form-group textarea { resize:vertical; min-height:80px; line-height:1.6; }
        .careers-wizard-form-group select { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C677D' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 16px center; padding-right:40px; }

        .careers-county-options { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
        .careers-county-option { padding:14px 12px; border-radius:8px; border:2px solid rgba(30,43,67,0.1); text-align:center; cursor:pointer; transition:all 0.2s; background:#fff; font-size:14px; font-weight:600; color:#1e2b43; min-height:48px; display:flex; align-items:center; justify-content:center; }
        .careers-county-option:hover { border-color:#bc9155; }
        .careers-county-option.selected { border-color:#bc9155; background:rgba(188,145,85,0.1); color:#9a7340; }

        .careers-file-upload { border:2px dashed rgba(30,43,67,0.15); border-radius:8px; padding:24px; text-align:center; cursor:pointer; transition:border-color 0.2s,background 0.2s; min-height:48px; }
        .careers-file-upload:hover { border-color:#bc9155; background:rgba(188,145,85,0.1); }

        .careers-wizard-btn-back { display:inline-flex; align-items:center; gap:8px; padding:14px 28px; border-radius:6px; font-weight:600; font-size:15px; border:2px solid rgba(30,43,67,0.15); color:#1e2b43; transition:all 0.25s; cursor:pointer; background:transparent; font-family:'Inter',sans-serif; min-height:48px; }
        .careers-wizard-btn-back:hover { border-color:#bc9155; color:#bc9155; }
        .careers-wizard-btn-next { display:inline-flex; align-items:center; gap:8px; padding:14px 28px; border-radius:6px; font-weight:600; font-size:15px; background:#bc9155; color:#fff; border:none; cursor:pointer; transition:all 0.25s; font-family:'Inter',sans-serif; min-height:48px; margin-left:auto; }
        .careers-wizard-btn-next:hover { background:#a57d48; transform:translateY(-1px); }
        .careers-wizard-btn-submit { display:inline-flex; align-items:center; gap:8px; padding:16px 36px; border-radius:6px; font-weight:700; font-size:16px; background:#bc9155; color:#fff; border:none; cursor:pointer; transition:all 0.25s; font-family:'Inter',sans-serif; min-height:52px; margin-left:auto; }
        .careers-wizard-btn-submit:hover { background:#a57d48; transform:translateY(-1px); box-shadow:0 4px 12px rgba(188,145,85,0.3); }

        /* ── RESPONSIVE ── */
        @media (max-width:1024px) {
          .careers-page .included-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:768px) {
          .careers-page .included-grid { grid-template-columns:repeat(2,1fr); gap:16px; }
          .careers-page .roles-grid { grid-template-columns:repeat(2,1fr); }
          .careers-wizard-wrap { padding:28px 20px; }
          .careers-trade-grid { grid-template-columns:repeat(2,1fr); }
          .careers-exp-options { grid-template-columns:repeat(2,1fr); }
          .careers-wizard-form-row { grid-template-columns:1fr; }
          .careers-county-options { grid-template-columns:1fr; }
          .careers-toggle-row { flex-direction:column; align-items:flex-start; gap:12px; }
        }
        @media (max-width:480px) {
          .careers-page .included-grid { grid-template-columns:1fr; gap:12px; }
          .careers-wizard-wrap { padding:20px 14px; }
          .careers-trade-grid { grid-template-columns:repeat(2,1fr); gap:10px; }
          .careers-exp-options { grid-template-columns:repeat(2,1fr); gap:8px; }
        }
        @media (prefers-reduced-motion:reduce) {
          .careers-wizard-step-anim { animation:none; }
          .careers-page .included-card { transition:none; }
          .careers-page .included-card:hover { transform:none; }
        }
      `}</style>

      <div className="careers-page">
        {/* ══════ HERO ══════ */}
        <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pt-[120px] text-white md:px-10">
          <div className="absolute inset-0 bg-cover bg-[center_30%] opacity-[0.72]" style={{ backgroundImage: `url(${media(hero?.background_image, "/portfolio/builtwell-team-van-exterior-ct-01.jpg")})` }} />
          <div className="absolute inset-0" style={{
            background: [
              "radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,0.9) 8%, transparent 30%)",
              "radial-gradient(ellipse at 3% 97%, rgba(21,30,48,0.9) 0%, transparent 25%)",
              "linear-gradient(180deg, rgba(21,30,48,0.35) 0%, rgba(21,30,48,0.2) 30%, rgba(21,30,48,0.45) 65%, rgba(21,30,48,0.92) 100%)",
            ].join(", "),
          }} />
          <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-[1240px] flex-col items-center justify-center pb-12 text-center">
            <ol className="fade-up mb-5 flex list-none items-center gap-0 text-[13px] font-medium text-white/[0.92] [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]" style={fu}>
              <li>{linkNode("/", "Home", "text-white/85 transition-colors hover:text-[#bc9155]")}</li>
              <li className="before:mx-2.5 before:text-[12px] before:text-[#bc9155] before:content-['›']">
                <span className="font-semibold text-white">Careers</span>
              </li>
            </ol>
            <h1 className="fade-up mb-3 max-w-[900px] text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.5px] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]" style={{ ...fu, transitionDelay: "0.1s" }}>
              {heroParts.before}{heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}{heroParts.after}
            </h1>
            {hero?.subheadline ? (
              <p className="fade-up mx-auto mt-4 max-w-[560px] text-center text-[17px] font-normal leading-[1.7] text-white/[0.82]" style={{ ...fu, transitionDelay: "0.2s" }}>{hero.subheadline}</p>
            ) : null}
            <div className="fade-up mt-8 flex flex-wrap items-center justify-center gap-4" style={{ ...fu, transitionDelay: "0.3s" }}>
              {(hero?.badges || []).map((badge: any, i: number) => {
                const isPrimary = !!badge.is_primary;
                const btnText = badge.value ? `${badge.label}: ${badge.value}` : badge.label;
                return isPrimary ? (
                  <a
                    key={`badge-${i}`}
                    href={badge.url || "#"}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-[8px] bg-[#bc9155] px-7 py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-[#a57d48] hover:-translate-y-[1px]"
                  >
                    {badge.label}
                  </a>
                ) : (
                  <a
                    key={`badge-${i}`}
                    href={badge.url || "#"}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-[8px] border border-white/[0.18] bg-[rgba(10,18,35,0.55)] px-7 py-3 text-[14px] font-semibold text-white backdrop-blur-[8px] transition-all duration-200 hover:bg-[rgba(10,18,35,0.72)] hover:border-white/[0.3] hover:-translate-y-[1px]"
                  >
                    {btnText}
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════ TRUST BAR ══════ */}
        <HeroTrustBar items={trust?.items} />

        {/* ══════ WHY WORK WITH US ══════ */}
        <section className="bg-[#f5f1e9] px-5 py-[100px] md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="fade-up mb-12 text-center" style={fu}>
              {label(benefitsSection?.eyebrow || "Why BuiltWell")}
              {(() => { const p = parts(benefitsSection?.title, benefitsSection?.highlight_text); return (
                <h2 className="mx-auto mb-5 max-w-[780px] font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                  {p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}
                </h2>
              ); })()}
              {benefitsSection?.content ? <p className="mx-auto max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">{benefitsSection.content}</p> : null}
            </div>
            <div className="fade-up included-grid" style={{ ...fu, transitionDelay: "0.15s" }}>
              {(benefitsSection?.cards || []).map((card: any, i: number) => (
                <div key={`${card.title}-${i}`} className="included-card">
                  <div className="included-card-icon">{pickBenefitIcon(card.title)}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ WHO WE WORK WITH ══════ */}
        <section className="bg-white px-5 py-[100px] md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="fade-up mb-12 text-center" style={fu}>
              {label(rolesSection?.eyebrow || "Open Roles")}
              {(() => { const p = parts(rolesSection?.title, rolesSection?.highlight_text); return (
                <h2 className="mx-auto mb-5 max-w-[780px] font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                  {p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}
                </h2>
              ); })()}
              {rolesSection?.content ? <p className="mx-auto max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">{rolesSection.content}</p> : null}
            </div>
            <div className="fade-up roles-grid" style={{ ...fu, transitionDelay: "0.15s" }}>
              {(rolesSection?.cards || []).map((role: any, i: number) => (
                <span key={`${role.title || role}-${i}`} className="role-pill">{typeof role === "string" ? role : role.title}</span>
              ))}
            </div>
            {rolesSection?.footer_note ? <p className="fade-up roles-note" style={{ ...fu, transitionDelay: "0.25s" }}>{rolesSection.footer_note}</p> : null}
          </div>
        </section>

        {/* ══════ APPLICATION WIZARD ══════ */}
        <section className="bg-[#f5f1e9] px-5 py-20 md:px-10" id="apply">
          <div className="mx-auto max-w-[1240px]">
            <div className="fade-up mb-10 text-center" style={fu}>
              {label(wizardSection?.eyebrow || "Apply")}
              {(() => { const p = parts(wizardSection?.title, wizardSection?.highlight_text); return (
                <h2 className="mx-auto mb-5 max-w-[780px] font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                  {p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}
                </h2>
              ); })()}
              {wizardSection?.content ? <p className="mx-auto max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">{wizardSection.content}</p> : null}
            </div>
            <div className="fade-up" style={{ ...fu, transitionDelay: "0.15s" }}>
              <ApplicationWizard data={wizardSection} />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
