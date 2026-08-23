# KDP Upload Kit — klar til indsættelse

Alt herunder er færdigskrevet. Mads: åbn kdp.amazon.com, opret konto, vælg "Create new title" og kopier felterne ind. 15 minutter.

---

## Bog 1: NIS2 Compliance for Small Web Agencies

| Felt | Værdi |
|------|-------|
| Title | NIS2 Compliance for Small Web Agencies |
| Subtitle | A Practical Guide to EU Cybersecurity Rules for Studios Under 50 People |
| Language | English |
| Author | Mahope Publishing (eller Mads' foretrukne pen name — besluttes ved opsætning) |
| Description | (se nedenfor) |
| Keywords slot 1 | nis2 compliance small business |
| Keywords slot 2 | eu cybersecurity directive guide |
| Keywords slot 3 | web agency legal requirements |
| Keywords slot 4 | incident reporting template |
| Keywords slot 5 | gdpr nis2 handbook |
| Categories | Computers & Technology > Security > Network Security; Business & Money > Industries > Computers & Internet |
| Age/Content warnings | None |
| Price | $12.99 USD (royalty 70% = $9.09) |
| Territories | All (worldwide rights) |
| DRM | Off |
| Upload files | `ebook/nis2-for-agencies.epub` + `ebook/cover.jpg` |

**Description (kopieres direkte):**

> The NIS2 Directive is now law across the EU — and it reaches further than most agency owners realize. If you build, host, or maintain websites for clients in Europe, your obligations may already include incident reporting deadlines measured in hours, documented risk assessments, and supply-chain due diligence you cannot currently prove.
>
> This is not another policy summary. It is a working manual written specifically for small web studios and freelancers who need to answer one question: what do I actually have to do?
>
> Inside:
> - Whether your agency is genuinely in scope — with a decision table, not legal jargon
> - The 24-hour and 72-hour reporting clocks explained in operational terms
> - Eight ready-to-adapt contract clauses that put compliance duties where they belong
> - A vendor assessment checklist with scoring you can hand to clients
> - Incident response templates you can fill in during an actual incident
>
> Written for teams under 50 people. No enterprise budget required. Every chapter ends with actions, not abstractions.
>
> Stop treating NIS2 as someone else's problem. Get the checklist your competitors will wish they had read first.

---

## Bog 2: EAA Compliance Checklist for WordPress Sites

| Felt | Værdi |
|------|-------|
| Title | EAA Compliance Checklist for WordPress Sites |
| Subtitle | A Practical Guide to Meeting EU Accessibility Requirements Under the European Accessibility Act |
| Language | English |
| Description | (se nedenfor) |
| Keywords slot 1 | european accessibility act wordpress |
| Keywords slot 2 | eaa compliance checklist |
| Keywords slot 3 | wcag website audit guide |
| Keywords slot 4 | accessibility statement template |
| Keywords slot 5 | ada wcag compliance book |
| Categories | Computers & Technology > Business > Website Design; Law > Business > Computer & Internet Law |
| Price | $9.99 USD (royalty 70% = $6.99) |
| Territories | All |
| DRM | Off |
| Upload files | `ebook/eaa-checklist.epub` + `ebook/eaa-cover.jpg` |

**Description (kopieres direkte):**

> The European Accessibility Act enforcement deadline has passed. Businesses across the EU are now legally required to make their digital services accessible — and the agencies that built their sites are getting the calls.
>
> This checklist turns the EAA into a concrete work plan for anyone managing WordPress sites for EU clients:
> - A scope test: does this site actually fall under the Act? (Most do.)
> - A prioritized audit checklist mapped to WCAG 2.1 AA
> - WordPress-specific fixes: themes, plugins, forms, media, navigation
> - A ready-to-use accessibility statement template for client handovers
> - How to document remediation so you can demonstrate compliance
>
> No theory chapters on disability history. No abstract standards talk. Just the tasks, in order, with pass/fail criteria for each.
>
> Accessibility is no longer optional in the EU. Be the agency that can prove it.

---

## Rækkefølge ved opsætning

1. Opret KDP-konto → udfyld W-8BEN (Danmark, traktat-sats ca. 0% på royalties med korrekt indberetning)
2. Bankoplysninger til royalty-udbetaling (SWIFT/IBAN)
3. "Create" → Book 1 → indsæt metadata fra tabellen → upload EPUB + cover → Launch previewer → Publish
4. Gentag for Book 2
5. Send mig URL'erne til de to Amazon-sider — så bygger jeg dem ind i landingssiden

## Efter udgivelse (jeg gør det)

- Opdater landingssiden med købs-links (erstatter "Awaiting account")
- Genudgiv via `./deploy.sh`
- Verificér links virker via self-check
