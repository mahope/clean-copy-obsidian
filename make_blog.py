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
        # Blog 2: NIS2 Incident Report Checklist
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
    ]
    for j in jobs:
        html = build_post(**j)
        path = f"site/blog/{j['slug']}.html"
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'wrote {path} ({len(html)} bytes)')


if __name__ == '__main__':
    main()