# Waste Management Data Collection & Analysis

Field project (S.Y.B.Sc. Computer Science, University of Mumbai, 2025–26) studying
why household waste segregation fails between the kitchen and the collection point
across three housing typologies in Mumbai.

**Student:** Pranjal Yadav (Roll No. 202503021) · **Guide:** Asst. Prof. Ashish Yadav

## Key findings

| Metric | Value | Source |
|---|---|---|
| Waste collected nationally | 91.8% (1,56,449 TPD) | CPCB Annual Report 2021–22, Table-1 |
| Waste treated nationally | 53.7% (91,511 TPD) | CPCB Annual Report 2021–22, Table-1 |
| Wards claiming full segregation | 90.1% (MIS self-report) | SBM-Urban MIS 2023 |
| Wards verified above 90% segregation | 48.8% (field audit) | Garbage Free City 2023 |
| Households using a single mixed bin | 53% | Primary survey, N=100 |
| Served by single-chamber vehicles | 67% | Primary survey, N=100 |
| Observed handlers remixing segregated bags | 87% | Primary survey, N=100 |

Core conclusion: collection is largely solved; the binding constraint is
**segregation quality at the handover step**, and the failure mode differs by
housing type (delegation failure in gated societies, space constraints in
chawl/market streets, timing-and-distance failure at community-bin points).
Nine recommendations (R1–R9) with implementing agencies and monitoring
indicators are set out in the report and on the website.

## Website

Open `website/index.html` in a browser (internet needed for fonts and charts),
or host the `website/` folder on any static host. Seven pages:

- Home, Field Visit, Methodology, Findings (Figures F-1–F-6, interactive),
  Survey (Figures P-S1–P-S5 + N=100 frequency table), Solutions (R1–R9),
  Academic (certificate, declaration, guide diary, downloads), References.

## Repository layout

```
website/            Static site (HTML + CSS + JS, ECharts figures, no build step)
website/assets/     Figure archives (PNG, superseded by live charts)
website/data/       survey-responses.csv · survey-data.js · field-project-report.docx
graphs_updated/     Standalone figure exports (F1–F6, S1–S5)
form-1 - Form Responses 1.csv        Raw Google Form responses, N=100
Waste-Management-Field-Project-Pranjal-Yadav-UPDATED.docx   Full report (submitted)
Waste-Management-Field-Project-Pranjal-Yadav-FINAL.docx     Final report copy
Main Page for Field Project Report.docx                     Title/certificate pages
```

## Data & reproducibility

- Primary data: `form-1 - Form Responses 1.csv` (2 Oct 2026, 13:55–14:07, N=100,
  no duplicate timestamps). All survey figures compute live from
  `website/data/survey-data.js`, generated from this file.
- Secondary data: CPCB Annual Report 2021–22 (Table-1); SBM-Urban MIS +
  Garbage Free City 2023; MPCB Q4-2020 and Annual 2023; five published field
  studies (Delhi ISI, Mulund, IIT-Mandi/WPI, FOSSEE Thiruvananthapuram,
  Thanisandra). Full citations on the References page.

## Citation

> Pranjal (2026). *Waste Management Data Collection & Analysis: A Comparative
> Field Study on Urban Waste Segregation Pipelines Across Varied Residential
> Typologies.* Field Project, S.Y.B.Sc. Computer Science, University of Mumbai.
