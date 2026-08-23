#!/usr/bin/env python3
"""Generate blog posts for hermes-passiv from data dictionaries.
Usage: python3 make_blog.py
Writes one HTML file per job to site/blog/{slug}.html
"""

import re, json

HEAD_TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{meta_desc}">
<meta property="og:type" content="article">
<meta property="og:title" content="{og_title}">
<meta property="og:description" content="{og_desc}">
<meta property="og:url" content="https://hermes-passiv.pages.dev/blog/{slug}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{og_title}">
<meta name="twitter:description" content="{og_desc}">
<link rel="canonical" href="https://hermes-passiv.pages.dev/blog/{slug}">
<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
<link rel="stylesheet" href="/style.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{article_headline}",
  "description": "{article_desc}",
  "publisher": {{ "@type": "Organization", "name": "Mahope" }}
}}
</script>
<script defer src="/track.js"></script>
</head>
<body>'''

HERO = '''<header class="hero">
  <div class="container">
    <div class="badge">BLOG · {badge_label}</div>
    <h1>{h1}</h1>
    <p class="subtitle">{subtitle}</p>
    <div class="hero-cta">
      <a href="#content" class="btn-primary">Start Reading</a>
      <a href="{cta_link}" class="btn-secondary">{cta_label} →</a>
    </div>
    <p class="hero-note">Updated August 2026 · Reading time: {reading_time}</p>
  </div>
</header>'''

SECTION_TOP = '''<section class="problem" id="content">
  <div class="container">'''

SECTION_DIVIDER = '''  </div>
</section>

<section class="products">
  <div class="container">'''

SECTION_BOTTOM = '''  </div>
</section>'''

FOOTER = '''<footer class="site-footer">
  <div class="container">
    <p><a href="/">← Home</a> · <a href="/scan.html">Free Scanner</a> · <a href="/#products">E-Books</a> · <a href="/blog">Blog</a></p>
    <p>Mahope © 2026 · Practical EU compliance for small web agencies</p>
  </div>
</footer>

</body>
</html>'''

def product_cta(btn_text, btn_link, secondary_text, secondary_link):
    return f'''<div style="text-align:center;margin-top:24px;">
      <a href="{btn_link}" class="btn-primary">{btn_text} →</a>
      &nbsp;&nbsp;
      <a href="{secondary_link}" class="btn-secondary">{secondary_text} →</a>
    </div>'''

def intro_paragraph(text):
    return f'<p>{text}</p>'

def card_block(cards):
    """cards: list of (emoji_icon, heading, body_html)"""
    items = ''
    for icon, h, body in cards:
        items += f'''      <div class="card"><h3>{icon} {h}</h3><p>{body}</p></div>\n'''
    return f'''    <div class="problem-cards">
{items}    </div>'''

def subsection(title, body_paragraphs, cards=None):
    """Returns HTML for a subsection with optional card grid."""
    html = f'    <h2>{title}</h2>\n'
    if isinstance(body_paragraphs, str):
        body_paragraphs = [body_paragraphs]
    for p in body_paragraphs:
        html += f'    <p>{p}</p>\n'
    if cards:
        html += card_block(cards)
    return html

def faq_section(faqs):
    """faqs: list of (question, answer)"""
    items = ''
    for q, a in faqs:
        items += f'''      <div class="card"><h3>{q}</h3><p>{a}</p></div>\n'''
    return f'''    <h2>Frequently Asked Questions</h2>
    <div class="problem-cards">
{items}    </div>'''


def build_post(slug, meta_desc, badge_label, h1, subtitle, reading_time,
               sections, cta_product, cta_secondary,
               faqs, og_desc=None):
    """sections: list of (title, body_paragraphs|str, optional cards|None)
       faqs: list of (q, a)
       cta_product: (btn_text, btn_link)
       cta_secondary: (text, link)
    """
    og_title = h1.replace('<br>', ' ').replace('<br/>', ' ').replace('\n', ' ')
    og_title = re.sub(r'\s+', ' ', og_title).strip()
    og_desc = og_desc or meta_desc

    title = og_title + ' — Free Guide for EU Web Agencies'

    head = HEAD_TEMPLATE.format(
        title=title, meta_desc=meta_desc, og_title=og_title,
        og_desc=og_desc, slug=slug, article_headline=og_title.replace('"', '\\"'),
        article_desc=meta_desc.replace('"', '\\"')
    )

    body = HERO.format(
        badge_label=badge_label, h1=h1, subtitle=subtitle,
        cta_link=f'#{sections[0][0].lower().replace(" ", "-")[:30]}' if sections else '#content',
        cta_label=cta_secondary[0], reading_time=reading_time
    )

    body += SECTION_TOP

    for i, (sec_title, pars, cards) in enumerate(sections):
        if i > 0:
            body += SECTION_DIVIDER
        body += subsection(sec_title, pars, cards)

    body += SECTION_DIVIDER

    body += f'''    <h2>Going Deeper</h2>
    <p class="section-intro">{cta_secondary[2] if len(cta_secondary) > 2 else f'Get the full compliance toolkit — templates, checklists, and ready-to-use documents.'}</p>
'''
    body += product_cta(cta_product[0], cta_product[1], cta_secondary[0], cta_secondary[1])

    body += SECTION_DIVIDER
    body += faq_section(faqs)
    body += product_cta(cta_product[0], cta_product[1], cta_secondary[0], cta_secondary[1])

    body += SECTION_BOTTOM + FOOTER

    return head + body


def main():
    jobs = [
        # Blog 1: GDPR DPA for web agencies
        dict(
            slug='gdpr-dpa-web-agencies',
            meta_desc='Complete guide to Data Processing Agreements for small web agencies. When you need a DPA, 7 essential clauses, common mistakes, and a fill-in template. Updated for 2026.',
            badge_label='GDPR COMPLIANCE',
            h1='GDPR Data Processing Agreement<br>for Web Agencies',
            subtitle='What every small agency needs to know about DPAs — when you need one, what to include, and how to get it signed without a lawyer.',
            reading_time='7 minutes',
            cta_product=('Get the Complete DPA Template →', '/#products'),
            cta_secondary=('GDPR E-Book →', '/#products',
                           'Our GDPR e-book includes a complete DPA template with Annex A–C, RoPA template, incident response plan, and 8 contract clauses — everything a small agency needs.'),
            sections=[
                ('what-is-a-dpa',
                 'A Data Processing Agreement (DPA) is a legally required contract between a data controller and a data processor under Article 28 of the GDPR. If your web agency handles any personal data on behalf of clients — hosting their website, managing their email newsletter, running their analytics, storing their customer data — you are a data processor and your clients are data controllers. Without a DPA in place, both you and your client are technically in violation of the GDPR.',
                 None),
                ('why-it-matters',
                 ['The short answer: because GDPR Article 28 requires it. Every controller that engages a processor must have a written contract that binds the processor to the same data protection standards the controller is subject to.', 'But the practical answer matters more. Enterprise clients and EU public-sector organisations will not sign with a vendor that cannot produce a DPA. It is a procurement gatekeeper — not having one disqualifies you before the conversation even starts. And without a DPA, a data breach on a client site becomes your liability, with no contractual framework to limit it.'],
                 [
                    ('⚖️', 'Legal Requirement', 'Article 28(3) of the GDPR lists 9 specific items a DPA must cover. Without it, both controller and processor face regulatory risk — fines up to €10M or 2% of turnover for the processor.'),
                    ('🛡️', 'Liability Protection', 'A DPA defines who is responsible for what. Without it, a breach at your hosting provider or an employee sending customer data to the wrong email address is your liability with no limits.'),
                    ('📋', 'Procurement Gatekeeper', 'Enterprise procurement teams now ask for DPAs before they ask for pricing. Having a professional DPA signals that you understand regulatory requirements — and that you can be trusted with their data.'),
                 ]),
                ('when-you-need',
                 ['If you do ANY of the following for clients, you need a DPA:',
                  '• Host client websites on your own servers or a reseller account',
                  '• Manage email marketing or newsletter platforms for clients',
                  '• Set up and maintain Google Analytics, Meta Pixel, or other tracking',
                  '• Process payments through a gateway you configured',
                  '• Store client customer data in any database or CRM',
                  '• Provide backup or disaster recovery services',
                  '• Have administrative access to client WordPress sites, servers, or cloud infrastructure',
                  'If you only design a website and hand over the files to the client who self-hosts, you may not need a DPA — but you are still a controller for the personal data you collect through your own business operations.'],
                 None),
                ('essential-clauses',
                 ['A properly drafted DPA has 9 mandatory elements under Article 28(3). For a small web agency, the following 7 clauses are the most critical to get right:'],
                 [
                    ('📝', '1. Subject Matter and Duration', 'Describe the processing activities clearly: what data, for what purpose, for how long. Vague language creates ambiguity in a breach scenario.'),
                    ('🔒', '2. Security Measures', 'List your technical and organisational measures: encryption, access controls, MFA, backups, employee training. Be specific — "appropriate measures" is not enough.'),
                    ('👤', '3. Sub-processors', 'Name your sub-processors (hosting provider, CDN, email service) and include an authorisation mechanism. The DPA must allow the client to object to new sub-processors.'),
                    ('🚨', '4. Data Breach Notification', 'State the notification timeline — typically 24-48 hours after confirmation of a breach. Include contact details and the format of the notification.'),
                    ('🗑️', '5. Data Deletion', 'Define what happens at the end of the contract: how and when you delete client data, certification of deletion, and any retention periods required by law.'),
                    ('🌍', '6. International Transfers', 'If you use US-based services (AWS, Cloudflare, Google), specify the transfer mechanism. Standard Contractual Clauses (SCCs) are the most common for small agencies.'),
                    ('📊', '7. Audit and Reporting', 'Grant the client the right to audit your compliance with the DPA (or accept third-party certifications as equivalent). Annual reports on security measures are standard.'),
                 ]),
                ('mistakes',
                 ['Five mistakes that small agencies make with DPAs:',
                  '',
                  '<strong>1. Using a generic template without customising it.</strong> A template gives you the structure, but you must fill in your actual sub-processors, actual security measures, and actual retention periods. A DPA that says "[Insert security measures here]" is not worth the PDF it is printed on.',
                  '',
                  '<strong>2. Not updating the DPA when your stack changes.</strong> Every time you switch hosting providers, add a CDN, or start using a new analytics tool, your DPA becomes outdated. Schedule a quarterly review.',
                  '',
                  '<strong>3. Signing the client\'s DPA instead of offering your own.</strong> Large clients will often present their own DPA. It will contain obligations that are reasonable for an enterprise but impossible for a 3-person agency. Always counter with your own DPA — it protects you from commitments you cannot meet.',
                  '',
                  '<strong>4. Failing to maintain a Register of Processing Activities (RoPA).</strong> A RoPA is required under Article 30. It lists every processing activity you perform, the data categories involved, and the legal basis. It is the document that shows a regulator — or a client\'s procurement team — that you have your house in order.',
                  '',
                  '<strong>5. Not having a data retention and deletion policy.</strong> GDPR Article 5(1)(e) requires that personal data be kept no longer than necessary. Without a documented retention schedule, you are holding data indefinitely — which is a violation.',
                  ''],
                 None),
                ('getting-it-signed',
                 ['Getting a DPA signed does not require a legal team. Here is the practical process:',
                  '',
                  '<strong>Step 1:</strong> Draft or customise your DPA template. List your actual sub-processors, actual security measures, and contact information.',
                  '',
                  '<strong>Step 2:</strong> Share it with new clients as part of your onboarding package. Present it as a sign of professionalism, not a legal burden.',
                  '',
                  '<strong>Step 3:</strong> For existing clients, send a brief email: "As part of our GDPR compliance programme, we have updated our Data Processing Agreement. Please review and sign the attached document." Include a 30-day deadline.',
                  '',
                  '<strong>Step 4:</strong> Store signed DPAs in a secure location (encrypted cloud storage) with client name, signing date, and expiry/review date.',
                  '',
                  '<strong>Step 5:</strong> Review and update quarterly — or whenever you change your technology stack.',
                  ''],
                 None),
            ],
            faqs=[
                ('Do I really need a DPA if I only host WordPress sites?',
                 'Yes. Hosting is a processing activity. Your client entrusts you with their website data, which may include customer personal data (contact forms, user accounts, e-commerce orders). As a hosting provider, you are a data processor under GDPR Article 28.'),
                ('Can I use a free DPA template from the internet?',
                 'You can, but be careful. Many free templates omit required clauses or are written for specific jurisdictions. The safest approach is a template written for small EU service providers, customised with your actual sub-processors and security measures.'),
                ('What if my client refuses to sign a DPA?',
                 'Without a signed DPA, you are both in violation of Article 28. Explain that the DPA protects both parties — it limits your liability and satisfies their regulatory obligations. If they still refuse, consider whether the relationship is worth the regulatory risk.'),
                ('Do I need a DPA with every client, even small ones?',
                 'Technically yes — Article 28 applies regardless of the client\'s size. In practice, micro-clients (e.g. a local bakery with a 3-page brochure site) rarely ask for one. But having a standard DPA ready to send shows professionalism and protects you if something goes wrong.'),
                ('How long does a DPA remain valid?',
                 'A DPA is valid for the duration of the processing relationship. When the contract ends, the DPA obligations regarding data deletion and confidentiality survive. Review the DPA annually and whenever you change sub-processors or security measures.'),
            ],
        ),
        dict(
            slug='nis2-incident-report-checklist',
            meta_desc='Free NIS2 incident report template and checklist for small EU web agencies. What to include, 6 required sections, notification timeline, and a fill-in template. Updated for 2026 enforcement.',
            badge_label='NIS2 COMPLIANCE',
            h1='NIS2 Incident Report<br>Checklist & Template',
            subtitle='What your small agency needs to document when a security incident happens — and how to report it to clients and regulators under NIS2 rules.',
            reading_time='6 minutes',
            cta_product=('Get the Complete NIS2 E-Book →', '/#products'),
            cta_secondary=('NIS2 Readiness Guide →', '/blog/nis2-readiness-guide',
                           'Our NIS2 Compliance for Small Web Agencies e-book includes a complete incident response plan template, 5 contract clauses, and a 30-day compliance checklist — everything your agency needs.'),
            sections=[
                ('why-incident-reporting',
                 'NIS2 Article 21(2)(c) requires in-scope entities to have incident response and reporting processes. Even if your small agency is below the direct NIS2 size threshold (50+ employees), your clients who ARE in scope will require you to demonstrate incident reporting capability. The standard is clear: incidents must be reported within 24 hours of awareness, with a detailed final report within 1 month. And that report must follow a structured format.',
                 [
                    ('⏰', '24-Hour Timeline', 'NIS2 requires early warning within 24 hours of becoming aware of an incident. This is not a detailed report — it is a notification that something happened, what systems are affected, and what you are doing.'),
                    ('📝', 'Final Report Within 1 Month', 'The detailed incident report must be submitted within 30 days. It covers root cause analysis, impact assessment, containment measures, and future prevention.'),
                    ('📋', 'Template Is Required', 'There is no prescribed NIS2 report format, but regulators expect a minimum set of sections. Having a template ready before an incident happens is the difference between a calm response and a panicked scramble.'),
                 ]),
                ('template-overview',
                 ['An effective NIS2 incident report has six sections. Print this list and keep it in your incident response folder — when something happens, you fill in each section in sequence.',
                  '',
                  '<strong>1. Incident Summary (1 paragraph)</strong>',
                  '   What happened, when, what systems were affected, and the current status. Written for a non-technical audience — your client\'s CEO will read this first.',
                  '',
                  '<strong>2. Timeline of Events (bullet list)</strong>',
                  '   When the incident was detected, when it started (estimated), each action taken, and when each action was completed. Precision matters here — regulators will compare your timeline against log data.',
                  '',
                  '<strong>3. Impact Assessment</strong>',
                  '   What data was affected (categories, volume, sensitivity), what systems were compromised, what services were disrupted, and what the business impact is. Be honest — underestimating impact damages credibility more than overestimating it.',
                  '',
                  '<strong>4. Containment and Remediation</strong>',
                  '   What you did to stop the incident (containment), what you did to remove the cause (eradication), and what you did to restore normal operations (recovery). Include timestamps for each action.',
                  '',
                  '<strong>5. Root Cause Analysis</strong>',
                  '   How the incident happened. Not just the technical trigger (a vulnerable plugin, a weak password) but the systemic cause (no update policy, no password rotation). This section answers the question: will it happen again?',
                  '',
                  '<strong>6. Preventive Measures</strong>',
                  '   What you are changing to prevent recurrence. Specific actions with deadlines: "MFA enabled for all admin accounts by 1 September" is better than "improving access controls." Include who is responsible and the review date.',
                  ''],
                 None),
                ('notification-process',
                 ['When you discover a security incident, follow this process. Time is the critical factor — the 24-hour NIS2 clock starts ticking from the moment you become aware, not from the moment you confirm the details.',
                  ''],
                 [
                    ('🚨', 'Step 1: Initial Notification (Within 1 Hour)', 'Notify your internal security contact and the affected client\'s designated contact. By email AND phone. Include: what happened (brief), what systems are affected, and when you will provide the next update.'),
                    ('🔍', 'Step 2: Investigation (24 Hours)', 'Determine the scope: what data, what systems, what users. Collect logs, take system snapshots, preserve evidence. Prepare the initial NIS2 early-warning notification with whatever information you have.'),
                    ('📨', 'Step 3: Submit Early Warning (Within 24 Hours)', 'Submit the NIS2 early-warning report. It does not need to be complete — NIS2 allows incomplete information at the initial stage. The key is demonstrating that you have a process and you are following it.'),
                    ('🔧', 'Step 4: Contain (Within 48 Hours)', 'Contain the incident. Disconnect affected systems, revoke compromised credentials, block malicious IPs. Document every action with timestamps.'),
                    ('📄', 'Step 5: Final Report (Within 30 Days)', 'Complete the full incident report with root cause analysis, impact assessment, and preventive measures. Submit to the client and, if required, to the relevant NIS2 regulator. Keep a copy for your own records.'),
                    ('🔄', 'Step 6: Post-Incident Review (30 Days After Closure)', 'Review the incident response process itself. What worked? What didn\'t? Update your incident response plan based on lessons learned. This step is often skipped but it is the most valuable one for improving over time.'),
                 ]),
                ('common-mistakes',
                 ['Five mistakes that turn a manageable incident into a regulatory problem:',
                  '',
                  '<strong>1. Waiting to have complete information before notifying.</strong> NIS2\'s 24-hour clock starts at awareness, not at full understanding. Submit an early warning with whatever you know — you can always update it. The fine for late notification is far worse than the fine for incomplete notification.',
                  '',
                  '<strong>2. Not documenting everything as it happens.</strong> Every phone call, every decision, every command executed. If you do not write it down in real time, you will not remember it accurately 30 days later when the final report is due.',
                  '',
                  '<strong>3. Downplaying the impact.</strong> The temptation is to minimise the incident to avoid alarm. Regulators and clients have seen this before. An impact assessment that turns out to be too optimistic destroys your credibility. State the worst reasonable case.',
                  '',
                  '<strong>4. Forgetting the post-incident review.</strong> The incident itself is a learning opportunity. Agencies that skip the post-incident review repeat the same mistakes. Those that conduct it systematically improve their security posture over time.',
                  '',
                  '<strong>5. Not having a template ready before an incident.</strong> Writing an incident report from scratch under time pressure produces poor reports. A pre-written template with placeholders turns a panic into a process.',
                  ''],
                 None),
                ('sample-template',
                 ['Below is a fill-in template you can adapt for your agency. Keep it in your incident response folder and update it annually.',
                  '',
                  '<hr style="margin:24px 0;border-color:var(--color-border);">',
                  '',
                  '<strong>INCIDENT REPORT — [Agency Name]</strong>',
                  '<br><strong>Report Number:</strong> IR-[YEAR]-[001]',
                  '<br><strong>Classification:</strong> [Critical / High / Medium / Low]',
                  '<br><strong>Status:</strong> [Open / Contained / Resolved]',
                  '',
                  '<br><br><strong>1. Incident Summary</strong>',
                  '<br><em>On [DATE] at [TIME], [describe what happened briefly — e.g. "unauthorised access detected on client hosting panel"]. Affected systems: [list]. Current status: [open/contained/resolved].</em>',
                  '',
                  '<br><strong>2. Timeline</strong>',
                  '<br>[TIME] — Incident detected by [source]',
                  '<br>[TIME] — Investigation started',
                  '<br>[TIME] — Containment initiated: [action]',
                  '<br>[TIME] — Client notified',
                  '<br>[TIME] — Early warning submitted',
                  '',
                  '<br><strong>3. Impact Assessment</strong>',
                  '<br><strong>Affected data categories:</strong> [e.g. names, emails, financial data]',
                  '<br><strong>Number of records:</strong> [estimate]',
                  '<br><strong>Sensitivity level:</strong> [low / medium / high]',
                  '<br><strong>Services disrupted:</strong> [list]',
                  '<br><strong>Business impact:</strong> [description]',
                  '',
                  '<br><strong>4. Containment and Remediation</strong>',
                  '<br>[Describe actions taken to contain, eradicate, and recover. Include timestamps.]',
                  '',
                  '<br><strong>5. Root Cause Analysis</strong>',
                  '<br><strong>Technical cause:</strong> [e.g. outdated plugin with known CVE]',
                  '<br><strong>Systemic cause:</strong> [e.g. no automated update policy]',
                  '',
                  '<br><strong>6. Preventive Measures</strong>',
                  '<br>[Action] — Owner: [name] — Deadline: [date]',
                  '<br>[Action] — Owner: [name] — Deadline: [date]',
                  '',
                  '<br><strong>Prepared by:</strong> [Name] <strong>Date:</strong> [Date]',
                  '<br><strong>Reviewed by:</strong> [Name] <strong>Date:</strong> [Date]',
                  '',
                  '<hr>',
                  ''],
                 None),
            ],
            faqs=[
                ('Does my 3-person agency really need an incident reporting process?',
                 'If you serve clients who are in NIS2 scope (50+ employees in critical sectors), yes. They will require it in their vendor agreements. And if a serious incident happens on a client site you manage, having a documented process is the difference between a professional response and a relationship-ending scramble.'),
                ('What counts as an "incident" under NIS2?',
                 'NIS2 defines incident broadly: any event that compromises the availability, authenticity, integrity, or confidentiality of stored or transmitted data. A hacked admin account, a ransomware attack, a data leak, a DDoS that takes a client site down — all of these are incidents that trigger the reporting obligation.'),
                ('Can I submit an incomplete initial report?',
                 'Yes — NIS2 explicitly allows it. The early warning (24 hours) is a notification, not a full report. You provide whatever information you have and update it as you learn more. The critical requirement is to NOTIFY within 24 hours, not to have all the answers within 24 hours.'),
                ('What happens if I miss the 24-hour deadline?',
                 'Late notification is a violation of NIS2 Article 21(2)(c) and could result in enforcement action. For small agencies acting as subcontractors, the penalty is typically contractual (loss of contract, professional indemnity issues) rather than direct NIS2 fines — but the reputational damage is significant.'),
                ('Where do I keep incident reports?',
                 'Store completed reports in an encrypted, access-controlled location separate from the systems that were affected. Keep them for at least 2 years (the NIS2 review period for enforcement). Use a naming convention that makes them easy to retrieve: IR-2026-001, IR-2026-002, etc.'),
            ],
        ),
        dict(
            slug='cookie-consent-gdpr-compliance',
            meta_desc='Complete guide to cookie consent and GDPR compliance for small web agencies. Cookie banner requirements, ePrivacy Directive, consent records, and a 7-step implementation plan. Updated for 2026 enforcement.',
            badge_label='GDPR &amp; EPRIVACY',
            h1='Cookie Consent &amp; GDPR Compliance<br>for Web Agencies',
            subtitle='What small web agencies need to know about cookie banners, consent records, and ePrivacy rules — no legal team required.',
            reading_time='8 minutes',
            cta_product=('Get the Complete Cookie Consent E-Book →', '/#products'),
            cta_secondary=('GDPR DPA Guide →', '/blog/gdpr-dpa-web-agencies',
                           'Our Cookie Consent &amp; Privacy Compliance e-book includes cookie banner templates, consent record templates, privacy policy structure, and data subject request forms.'),
            sections=[
                ('What the Law Says',
                 'Three EU laws govern cookie consent. Most small web agencies know about GDPR, but the ePrivacy Directive is where most cookie requirements live. For now, we operate under GDPR for personal data and the ePrivacy Directive (transposed into national laws) for cookies.',
                 [
                    ('📜', 'ePrivacy Directive (2002/58/EC)', 'This is the actual cookie law. It requires informed consent before storing information on a user device. Transposed into national laws (UK PECR, Danish Cookie Executive Order, German TTDSG). The core is the same everywhere: active, informed, prior consent. Pre-checked boxes are illegal.'),
                    ('🔒', 'GDPR (Regulation 2016/679)', 'Applies when cookies collect personal data. Most analytics cookies do. Consent must be freely given, specific, informed, and unambiguous. Combined with ePrivacy, valid cookie consent must satisfy BOTH laws.'),
                    ('🇪🇺', 'ePrivacy Regulation (proposed)', 'Would replace the Directive with a directly applicable regulation. Currently in trilogue negotiations, expected 2027. Would simplify consent rules but introduce stricter requirements.'),
                 ]),
                ('Cookie Banner Requirements', [
                    'A compliant cookie banner is not just a pop-up that disappears when you click "Accept All." Here is what the law actually requires:',
                    '<strong>1. Active consent — no pre-checked boxes.</strong> Every cookie category must require an active opt-in. Dark patterns that steer users toward acceptance can invalidate consent.',
                    '<strong>2. Granular choice — not just accept/reject.</strong> Users must be able to accept some categories and reject others. Cookie walls that block access unless the user accepts all cookies are illegal.',
                    '<strong>3. Clear language for each cookie purpose.</strong> "Marketing" is not enough. Explain what each category does, what data it collects, and who the recipients are.',
                    '<strong>4. Consent recorded and stored.</strong> GDPR Article 7(1) requires you to demonstrate consent. Record: who, when, what categories, the exact banner wording, and any withdrawal.',
                    '<strong>5. Easy to change or withdraw consent.</strong> A "Cookie Preferences" link in the footer lets users review preferences at any time. Withdrawal must be as easy as giving consent.',
                    '<strong>6. Necessary cookies exemption.</strong> Cookies strictly necessary for basic functions (session, authentication, load balancing) are exempt under ePrivacy Article 5(3). Everything else requires prior consent.',
                 ], None),
                ('Consent Fatigue Is Not an Excuse', [
                    'Cookie banners are among the most complained-about web features. Users click "Accept All" without reading. Regulators know this.',
                    'Consent fatigue does not invalidate your consent mechanism. If you offer a genuine choice and document it, consent is valid even if the user did not read every line.',
                    'What DOES invalidate consent: (a) pre-checked boxes, (b) cookie walls, (c) dark patterns, (d) vague cookie descriptions, (e) no consent records.',
                    'Practical tip: set default state to reject. No cookies loaded until the user actively opts in. Give "Reject all" and "Accept all" equal visual weight.',
                 ], None),
                ('A 7-Day Implementation Plan', [
                    'A 7-day plan for implementing a compliant cookie consent system on client sites:',
                    '<strong>Day 1-2: Audit current cookies.</strong> List every cookie: domain, name, purpose, expiration, first/third party.',
                    '<strong>Day 3: Categorise.</strong> Divide into (a) strictly necessary, (b) functional, (c) analytics, (d) marketing. Be honest.',
                    '<strong>Day 4-5: Configure a CMP.</strong> Cookiebot, Complianz, or self-hosted. Set default state to off for all non-essential categories.',
                    '<strong>Day 6: Test.</strong> Incognito window. Verify only necessary cookies load before consent. Verify consent and withdrawal both work.',
                    '<strong>Day 7: Document and deploy.</strong> Consent record policy, cookie list in privacy policy, Cookie Preferences link in footer.',
                 ], None),
                ('Do Anonymised Analytics Need Consent?', [
                    '"We only use anonymised analytics, we do not need consent." This is the most common argument — and it needs careful handling.',
                    'Google Analytics, even with IP anonymization, sets a _ga cookie (Client ID). This cookie is not strictly necessary. It requires consent under both ePrivacy and GDPR.',
                    'Cookieless analytics (Plausible, Fathom, Umami — and the tracker on this site) set NO cookies. These do not require cookie consent, though they should be disclosed in your privacy policy.',
                    'For small agencies: switch to cookieless analytics for your own site and recommend it to clients. It eliminates the consent burden entirely.',
                 ], None),
                ('Five Mistakes Regulators Spot Immediately', [
                    '<strong>1. Implied consent by scrolling.</strong> "By continuing to use this site, you accept cookies" is not valid consent. You need active, affirmative consent.',
                    '<strong>2. No revisit mechanism.</strong> Without a Cookie Preferences link, users cannot withdraw consent. This is a violation.',
                    '<strong>3. Consent records not stored.</strong> If you cannot produce a timestamped record, you cannot prove consent. Most CMPs do this automatically.',
                    '<strong>4. Incomplete cookie list.</strong> An outdated or generic cookie policy undermines your consent mechanism. Audit quarterly.',
                    '<strong>5. Undisclosed third-party cookies.</strong> Google Ads, Meta Pixel, LinkedIn Insight cookies must be named individually in the banner. Hiding behind "analytics partners" invites enforcement.',
                 ], None),
            ],
            faqs=[
                ('Do I need a cookie banner on every website I build?',
                 'If the site uses non-essential cookies (analytics, marketing pixels, tracking), yes. Most sites do. Document it if a site genuinely has no non-essential cookies.'),
                ('What is the difference between GDPR and ePrivacy consent?',
                 'GDPR is about personal data processing. ePrivacy is about accessing information on a device. Cookies typically trigger both. A compliant ePrivacy mechanism satisfies GDPR requirements for cookies.'),
                ('Can I use a free cookie banner plugin?',
                 'Complianz and Cookiebot have free tiers. The risk is misconfiguration. Always test the actual consent flow with browser dev tools before deploying.'),
                ('What happens without a compliant banner?',
                 'The site owner faces DPA fines. Privacy activists (e.g. noyb) can file complaints. If you built the site this way, you share liability.'),
                ('Do CDN cookies need consent?',
                 'Strictly necessary CDN cookies (load balancing, session persistence) are exempt. Disclose them but no consent needed.'),
                ('What consent records must I keep?',
                 'Unique identifier, timestamp, categories consented to, banner version, consent method, and any withdrawal. Store for cookie lifespan plus 6 months.'),
            ],
        ),
        dict(
            slug='wcag-22-what-changes',
            meta_desc='WCAG 2.2 explained for small web agencies: the 9 new success criteria, what changed from 2.1, which criteria were removed, and how to update client sites. Updated August 2026.',
            badge_label='EAA &amp; WCAG',
            h1='WCAG 2.2: What Changed<br>&amp; What It Means for Your Clients',
            subtitle='The 9 new success criteria, the ones removed, and a practical plan for bringing client sites up to date — no compliance team required.',
            reading_time='7 minutes',
            cta_product=('Test Any Site Free →', '/scan'),
            cta_secondary=('EAA Checklist Guide →', '/blog/eaa-accessibility-checklist',
                           'Our EAA Compliance e-books cover WCAG 2.1 AA criterion by criterion, with platform-specific fixes for WordPress, Shopify, Webflow, Wix, Squarespace and more — written for small agencies, not lawyers.'),
            sections=[
                ('Why WCAG 2.2 Matters Now', [
                    'WCAG 2.2 became a W3C Recommendation in October 2023, and it is now the reference standard for the European Accessibility Act (EAA), which entered into force in June 2025. If your clients sell products or services online in the EU, their sites are expected to conform to WCAG 2.1 AA as a minimum — and WCAG 2.2 is where the standard is heading.',
                    'WCAG 2.2 does not replace 2.1 — it extends it. A site that conforms to 2.2 AA automatically conforms to 2.1 AA. That makes upgrading the safest long-term target for any agency maintaining client sites in the EU.',
                 ],
                 [
                    ('⚖️', 'EAA Enforcement', 'Since June 2025, e-commerce, banking, transport and telecom services in the EU must be accessible. National market surveillance authorities can fine non-compliant businesses.'),
                    ('🎯', '9 New Criteria', 'WCAG 2.2 adds nine success criteria focused on cognitive accessibility, mobile interaction, and forms — areas where most sites fail today.'),
                    ('🗑️', '4 Removed', 'Four old criteria were removed because they overlapped with others. Sites built to 2.0 may find some requirements gone — but none got harder without replacement.'),
                 ]),
                ('The 9 New Success Criteria', [
                    'Here is each new criterion at Level A and AA, with what it means in practice for the sites you build:',
                    '<strong>2.4.11 Focus Not Obscured (Minimum) — AA.</strong> When an element receives keyboard focus, it must not be hidden by author-created content like sticky headers, cookie banners, or chat widgets. Test: tab through the page and check nothing covers the focused element.',
                    '<strong>2.5.7 Dragging Movements — AA.</strong> Any action done by dragging (sliders, drag-to-reorder, maps) must also be achievable with a single tap or click. Provide buttons as alternatives.',
                    '<strong>2.5.8 Target Size (Minimum) — AA.</strong> Interactive targets must be at least 24×24 CSS pixels, or have enough spacing around them. This kills tiny icon-only buttons and cramped mobile navs.',
                    '<strong>3.2.6 Consistent Help — A.</strong> If a site offers help (support link, chat), it must appear in the same place on every page. Moving help links between pages fails.',
                    '<strong>3.3.7 Redundant Entry — A.</strong> Users must not have to enter the same information twice in one process. Auto-fill previously entered data in multi-step checkouts and forms.',
                    '<strong>3.3.8 Accessible Authentication (Minimum) — AA.</strong> Login must not require cognitive function tests — memorising passwords is allowed, but puzzles, retyping codes from images, or transcription tests are not. Allow paste in password fields and support password managers.',
                 ],
                 [
                    ('⌨️', 'Focus Visibility', '2.4.11 + 2.4.13 together mean sticky headers must not swallow keyboard focus. The fix is usually scroll-padding-top CSS — cheap to implement, easy to demo to clients.'),
                    ('📱', 'Mobile Targets', '2.5.8 target size catches thumb-fatigue problems real users complain about. Frame accessibility upgrades as UX improvements when talking to clients.'),
                    ('🔐', 'Login Flows', '3.3.8 affects every client with a login. CAPTCHAs requiring transcription are a direct failure — switch to invisible risk-based checks.'),
                 ]),
                ('What Was Removed', [
                    'Four criteria from earlier versions were removed in 2.2 because they duplicated others or proved untestable:',
                    '<strong>4.1.1 Parsing</strong> — removed; duplicate IDs and malformed markup still break assistive technology, but the requirement is covered by other criteria and browser parsing behaviour. Fix duplicate IDs anyway (our scanner checks for them).',
                    'Other requirements were reorganised: 2.4.10 Section Headings and parts of the colour-contrast guidance were consolidated rather than tightened.',
                    'Practical takeaway: an audit against 2.0 will list failures that no longer exist, and miss failures that do. Re-baseline your audits against 2.2.',
                 ], None),
                ('How to Update Client Sites', [
                    'Most sites fail the new criteria in the same handful of places. Work through this order of impact:',
                    '<strong>1. Sticky headers and overlays.</strong> Add scroll-padding-top equal to header height, and ensure cookie banners close fully so they never trap focus.',
                    '<strong>2. Touch targets.</strong> Audit icon buttons, social icons, and pagination. Bump padding to reach 24×24 px minimum. On most sites this is pure CSS.',
                    '<strong>3. Drag alternatives.</strong> Any sortable list or slider needs visible click/tap controls. Many component libraries ship this behind a flag — turn it on.',
                    '<strong>4. Forms and checkouts.</strong> Auto-populate repeated fields, allow paste everywhere, remove puzzle CAPTCHAs.',
                    '<strong>5. Re-audit.</strong> Run a scan (ours is free, above), fix what it finds, then spot-check the new criteria manually. Document conformance claims against 2.2 AA going forward.',
                 ],
                 [
                    ('🆓', 'Free Scanner', 'Our scanner checks alt text, labels, contrast, target sizes, duplicate IDs and more — paste any URL, get a score in seconds. No signup.'),
                    ('📚', 'Platform Guides', 'We maintain step-by-step fix guides for WordPress, Shopify, Webflow, Wix, Squarespace, Drupal, Joomla and more — see the guides section on the front page.'),
                    ('📄', 'Statement Generator', 'After fixing, generate an accessibility statement for your client in minutes with our free tool.'),
                 ]),
            ],
            faqs=[
                ('Is WCAG 2.2 legally required in the EU?',
                 'The EAA references harmonised standards based on WCAG 2.1 AA today, but EN 301 549 is being updated toward 2.2. Conforming to 2.2 AA now means you are ahead of the requirement rather than chasing it.'),
                ('Does WCAG 2.2 apply to my clients outside the EU?',
                 'Similar trends exist globally — Section 508 in the US, EN 301 549 procurement rules, and national laws referencing WCAG. Building to 2.2 AA satisfies nearly all of them.'),
                ('We just passed a 2.1 audit. Are we compliant with 2.2?',
                 'Not automatically. Focus obscuration, target size, and accessible authentication are common new failures on sites that pass 2.1. Budget a small re-audit pass.'),
                ('Which new criterion breaks the most sites?',
                 'Target Size (2.5.8). Icon-only buttons under 24px are everywhere — social share rows, carousel arrows, mobile menus. It is also the cheapest class of fixes.'),
                ('Does our free scanner check WCAG 2.2?',
                 'It automates the machine-checkable subset (alt text, labels, contrast, duplicate IDs, viewport, headings and more). Some 2.2 criteria — dragging movements, redundant entry — need manual testing, and our guides walk you through those checks.'),
            ],
        ),
        dict(
            slug='gdpr-fines-2026',
            meta_desc='GDPR fines explained for small web agencies: the real 2026 numbers, what regulators actually fine companies for, the two-tier penalty system, and a practical risk check. Updated August 2026.',
            badge_label='GDPR ENFORCEMENT',
            h1='GDPR Fines in 2026:<br>What the Numbers Actually Mean',
            subtitle='€1.2 billion fined last year — but almost none of it hits small agencies. Here is what the enforcement data really says, and where a small agency can still get hurt.',
            reading_time='7 minutes',
            cta_product=('Get the Complete GDPR E-Book →', '/#products'),
            cta_secondary=('Cookie Consent Guide →', '/blog/cookie-consent-gdpr-compliance',
                           'Our GDPR Compliance for Small Web Agencies e-book includes ready-to-use DPA clauses, a RoPA template, an incident response plan, and a 14-day compliance action plan.'),
            sections=[
                ('The Real Numbers', [
                    'Headline figures first, with sources. The CMS Enforcement Tracker (the standard industry reference) recorded roughly €5.9 billion across about 3,200 published enforcement actions by mid-2026; DLA Piper\'s January 2026 survey, which also counts non-public totals, puts cumulative fines at around €7.1 billion since May 2018. Fines issued in the twelve months to January 2026 were approximately €1.2 billion — broadly flat versus 2024. Average breach notifications now run at 443 per day.',
                    'But the distribution matters more than the total. Roughly four out of every five euro ever collected comes from just ten decisions against Big Tech platforms. The largest single fine remains Meta\'s €1.2 billion (Ireland, 2023, under appeal) for unlawful EU-US data transfers. TikTok\'s €530 million (Ireland, 2025) is the second-largest standing fine. Amazon\'s famous €746 million fine was annulled by Luxembourg\'s Administrative Court in March 2026 on procedural grounds — many older articles still cite it, but it no longer stands.',
                 ],
                 [
                    ('📊', '€1.2B in 2025', 'Annual fines are stable around €1.2 billion/year. Enforcement volume (2,800+ recorded actions) keeps growing even as headline totals flatten.'),
                    ('🏢', '10 Decisions = 80%', 'Ten decisions — mostly Meta, TikTok, Google, Uber, LinkedIn — account for roughly 80% of all euros collected. The long tail of thousands of fines is much smaller.'),
                    ('⚖️', 'Fines Get Overturned', 'Amazon\'s €746M fine was annulled in March 2026. OpenAI\'s €15M fine met the same fate. Appeals are real — but do not plan your compliance strategy around them.'),
                 ]),
                ('What Regulators Actually Fine Companies For', [
                    'Strip away the Big Tech transfers cases, and the violation types in the long tail are remarkably consistent. Across published actions:',
                    '<strong>Insufficient legal basis (~34%)</strong> — processing personal data without a valid ground under Article 6. This is the single most common violation type, and it covers everything from marketing without consent to keeping old customer records "just in case."',
                    '<strong>Information obligations (~20%)</strong> — failing to tell people what happens to their data. Outdated privacy policies, missing disclosures, buried information.',
                    '<strong>Website and cookies (~10%)</strong> — non-compliant cookie banners, tracking pixels firing before consent, missing cookie policies. This is the category small agencies touch directly.',
                    'Note what barely registers at the top of the list: security breaches. Most fines are not about getting hacked — they are about processing data without permission or transparency.',
                 ], None),
                ('The Two-Tier Penalty System', [
                    'GDPR Article 83 sets two maximum tiers, and knowing which one applies changes how you think about risk:',
                    '<strong>Lower tier — up to €10 million or 2% of global annual turnover</strong> (whichever is higher): violations of Articles 25, 28, 30-34, and others. This includes not having a Data Processing Agreement with your sub-processors, failing to keep Records of Processing Activities (RoPA), inadequate security measures, and late breach notification.',
                    '<strong>Upper tier — up to €20 million or 4% of turnover:</strong> violations of the core principles (Article 5), lawful basis requirements (Article 6), consent conditions, and data subject rights. This is where the Big Tech fines land.',
                    'For a small agency, the lower tier is the relevant one — and every violation in it is a paperwork problem, not a technology problem. A DPA template, a RoPA spreadsheet, and an incident response plan eliminate most of the exposure.',
                 ], None),
                ('Can a Small Agency Actually Be Fined?', [
                    'Honest answer: yes, but rarely, and usually for avoidable reasons. Enforcement priorities follow complaints and media attention — that is why Spain leads fine volume (over 1,000 actions) and why most small-entity fines start with a customer complaint.',
                    'Where small businesses do get hit:',
                    '<strong>Video surveillance and doorbells</strong> — the classic Spanish/Italian enforcement pattern. Cameras capturing public space or neighbours\' property generate steady fines.',
                    '<strong>Marketing without consent</strong> — cold emailing purchased lists, SMS campaigns without opt-in.',
                    '<strong>Failing to respond to data subject requests</strong> — ignoring access or deletion requests within the one-month deadline is an easy, well-documented violation.',
                    'And where an agency specifically gets exposed: you process client data without a DPA (an Article 28 violation), or you build client sites with non-compliant cookie banners and tracking — which shifts liability onto both you and your client.',
                 ],
                 [
                    ('📨', 'Complaints Drive Enforcement', 'Most small-business fines begin with a single complaint from a customer, employee, or competitor. Handling data subject requests properly removes your biggest enforcement trigger.'),
                    ('🤝', 'Agencies = Processors', 'Without a signed DPA, you are an unlawful processor under Article 28 — a lower-tier violation that is entirely eliminated by having the right contract in place.'),
                    ('🍪', 'Client Sites Are Your Risk', 'A site you built with tracking pixels firing before consent creates exposure for your client — and they will remember who built it when the complaint arrives.'),
                 ]),
                ('A 15-Minute Risk Check for Your Agency', [
                    'You cannot eliminate regulatory risk entirely, but 15 minutes covers the items that actually produce small-agency fines:',
                    '<strong>1. DPAs signed?</strong> Check you have a signed DPA with every client whose data you process, and with every sub-processor you use (hosting, email, CRM).',
                    '<strong>2. RoPA exists?</strong> One spreadsheet listing what personal data you process, why, on what legal basis, and for how long. Required by Article 30.',
                    '<strong>3. Cookie banner honest?</strong> Test one client site you maintain: does anything beyond strictly necessary cookies load before consent? Browser dev tools, two minutes.',
                    '<strong>4. Privacy policy current?</strong> Does it name your actual tools and actual purposes? A policy last touched in 2019 is itself an information-obligation violation.',
                    '<strong>5. Request inbox works?</strong> Someone must own privacy@youragency.com and answer data subject requests within a month. An unanswered request is the easiest fine a regulator can issue.',
                    'Do those five things and you have eliminated nearly every enforcement scenario that realistically reaches a small EU web agency.',
                 ], None),
            ],
            faqs=[
                ('What is the largest GDPR fine ever issued?',
                 'Meta Platforms Ireland received a €1.2 billion fine from the Irish Data Protection Commission in May 2023 for unlawfully transferring EU user data to the US. It remains the largest on record and is under appeal. After Amazon\'s €746M fine was annulled in March 2026, TikTok\'s €530 million (Ireland, 2025) is the second-largest standing fine.'),
                ('What is the maximum GDPR fine?',
                 'Two tiers apply: up to €10 million or 2% of annual worldwide turnover for procedural violations (missing DPAs, no RoPA, inadequate security), and up to €20 million or 4% of turnover for core principle violations like unlawful processing or invalid consent. Whichever figure is higher applies.'),
                ('Can freelancers and sole traders be fined under GDPR?',
                 'Yes. GDPR applies to any entity processing personal data, regardless of size. In practice, small-entity fines are typically in the hundreds-to-low-thousands of euros range and usually start from a complaint — most commonly over surveillance cameras, unsolicited marketing, or ignored data subject requests.'),
                ('Is my agency liable if a client\'s website we built violates GDPR?',
                 'It depends on your role. If you only build and hand over, you are generally not the controller. If you host, maintain, or configured the tracking yourself, you share responsibility — as processor you need a DPA, and knowingly deploying a non-compliant cookie setup exposes you alongside the client.'),
                ('Has any GDPR fine been overturned?',
                 'Yes, notably. Amazon\'s €746 million fine was annulled by Luxembourg\'s Administrative Court in March 2026 on procedural grounds, and OpenAI\'s €15 million Italian fine was annulled the same month. Appeals succeed mainly on procedure — the underlying conduct usually remains regulated.'),
            ],
        ),
    ]
    for j in jobs:
        html = build_post(**j)
        path = f"site/blog/{j['slug']}.html"
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'wrote {path} ({len(html)} bytes)')


if __name__ == '__main__':
    main()