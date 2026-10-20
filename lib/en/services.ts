import type { ServiceCopyEn, ServiceExtraEn } from "./types";
import { enServiceSlugs } from "./slugs";

/** English versions of the eight complete service pages: a full translation of the Arabic copy in lib/service-copy.ts and lib/service-extra.ts. */
export const serviceCopyEn: Record<(typeof enServiceSlugs)[number], ServiceCopyEn> = {
  "corporate-contracts": {
    "title": "Corporate & Contracts Lawyer in Riyadh | Governance",
    "description": "Legal services for companies and contracts in Riyadh: company formation, shareholders' agreements, governance, and drafting and reviewing commercial contracts that work in practice.",
    "h1": "Corporate and contracts lawyer in Riyadh: from formation to the deal",
    "groups": [
      {
        "label": "Companies & governance",
        "intro": [
          "# Corporate lawyer in Riyadh for business, governance and partner disputes",
          "Many corporate problems start long before a dispute appears: unclear authority, a partnership agreement that does not reflect reality, an undocumented management decision, unregulated funding, or a partner's exit for which no mechanism was ever built. That is why we treat company law as a decision structure, not just formation documents."
        ],
        "sections": [
          {
            "h": "When does a company need this work?",
            "p": [
              "When forming a new entity, bringing in a partner or investor, changing ownership percentages, allocating authority, expanding into a new activity, changing management, restructuring a group, or when a disagreement arises over management, profits, shares, access to information, or decisions of the partners or the board."
            ]
          },
          {
            "h": "What do we review?",
            "p": [
              "We start with the articles of association or constitutional documents, partners' agreements if any, the ownership structure, resolutions, delegations, funding, key contracts, and the correspondence that shows how the company is actually run. The aim is to find the gap between the paper and the reality before it becomes liability or a dispute."
            ]
          },
          {
            "h": "Partners' agreements",
            "p": [
              "Their job is to regulate what the statutory documents alone may not cover: the decision-making mechanism, reserved matters, additional funding, profit distribution, restrictions on transfers, pre-emption rights, exit, deadlock, non-competition, confidentiality and dispute resolution."
            ]
          },
          {
            "h": "When a dispute arises",
            "p": [
              "We separate ownership disputes, management disputes and financial-rights disputes, because each path needs different evidence and different claims. The goal may be to protect a decision, to void one, to compel the other side to act, to recover money, to give a partner access to information, to negotiate an exit, or to move to litigation."
            ]
          },
          {
            "h": "What do you receive?",
            "p": [
              "Depending on scope: a legal position memorandum, an authority map, a partners' agreement, shareholder or board resolutions, a restructuring plan, a negotiation memorandum, a legal notice, or a full dispute strategy."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "If you have a new formation, a restructuring, a partners' agreement or a dispute inside the company, we can start by reviewing the core documents and identifying the decision points before choosing a path."
            ]
          }
        ]
      },
      {
        "label": "Commercial contracts",
        "intro": [
          "# Drafting and reviewing commercial contracts, tied to performance",
          "A good contract does not only describe the deal. It sets out what happens when circumstances change, performance is late, the parties read a term differently, or one of them wants out. So we do not treat drafting as a set of standard clauses, but as translating the deal into obligations, controls and mechanisms that can actually be operated."
        ],
        "sections": [
          {
            "h": "Before drafting",
            "p": [
              "We identify the parties, the commercial purpose, the scope of work, the consideration, the periods, the assumptions, the approvals, and the scenarios the client wants protected. This stage prevents a contract that is elegant in language but commercially incomplete."
            ]
          },
          {
            "h": "The clauses we focus on",
            "p": [
              "Definitions, scope of obligation, payment, acceptance and delivery, change, warranties, liability and indemnity, confidentiality, intellectual property, force majeure, termination and its effects, notices, governing law and dispute resolution."
            ]
          },
          {
            "h": "Reviewing the other side's contract",
            "p": [
              "We do not rewrite a contract merely because the style differs. We identify the clauses that change the legal or commercial position and rank them by risk: what must be amended, what can be negotiated, and what can be accepted if the commercial return justifies it."
            ]
          },
          {
            "h": "Repeat contracts",
            "p": [
              "For companies that sign recurring forms, we can build a master template, alternative clauses, an authority matrix, a negotiation playbook, and a list of cases that need escalation to the legal department."
            ]
          },
          {
            "h": "What do you receive?",
            "p": [
              "A new contract or a reviewed version with clear markings, a short risk memorandum, a list of negotiation points, or a package of templates and contracting policies."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "For an effective review, send the contract with a short summary of the deal, the commercial objective, and any sensitive negotiation points."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/en/blog/shareholders-agreement-saudi-arabia",
        "label": "Shareholders' agreements in Saudi Arabia"
      },
      {
        "href": "/en/services/compliance-governance",
        "label": "Governance & Compliance"
      },
      {
        "href": "/en/services/mergers-acquisitions",
        "label": "Mergers & Acquisitions"
      },
      {
        "href": "/en/blog/arbitration-clause-commercial-contracts-saudi-arabia",
        "label": "The arbitration clause in commercial contracts"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes & Arbitration"
      },
      {
        "href": "/blog/shareholder-partner-disputes-saudi-arabia",
        "label": "Shareholder and partner disputes in Saudi Arabia (Arabic)"
      }
    ]
  },
  "disputes-arbitration": {
    "title": "Commercial Disputes & Arbitration Lawyer in Riyadh",
    "description": "Legal representation in commercial disputes and arbitration in Riyadh: case assessment, evidence and advocacy strategy, drafting the arbitration clause, and enforcing awards.",
    "h1": "Commercial disputes and arbitration: from case assessment to award and enforcement",
    "groups": [
      {
        "label": "Commercial disputes",
        "intro": [
          "# Managing commercial disputes from case assessment to judgment and enforcement",
          "A good commercial case does not start with drafting the claim. It starts with establishing what actually happened, what we can prove, what is wanted commercially, and what the other side may do if we move. We handle commercial disputes with a method that ties the facts to the documents and to procedural strategy."
        ],
        "sections": [
          {
            "h": "Assessing the dispute before filing",
            "p": [
              "We test jurisdiction, standing, the contract or other source of the obligation, the amounts and periods, the correspondence, electronic evidence, transfers, invoices, and the effect of any settlement, admission or release. We also identify the strengths and weaknesses before the opponent uses them."
            ]
          },
          {
            "h": "Evidence strategy",
            "p": [
              "We build a table linking each fact to its proof, then test what the proof shows and whether it is direct or needs supporting inferences. This covers contracts, purchase orders, invoices, emails, messages, account statements, minutes and digital records."
            ]
          },
          {
            "h": "Litigation and advocacy",
            "p": [
              "We concentrate on framing the claims, ordering the facts chronologically, separating procedural issues from the merits, and answering the opponent's defence without distracting the court with details that do not change the outcome."
            ]
          },
          {
            "h": "Appeal and after judgment",
            "p": [
              "At the objection stage we identify the basis on which the court built its decision, and whether the objection concerns application, characterisation, evidence, inadequate treatment of the case or the claims. Once the instrument becomes enforceable, thinking moves to actual recovery."
            ]
          },
          {
            "h": "Settlement during the dispute",
            "p": [
              "Settlement can be a risk-management tool when its terms are enforceable and based on an accurate understanding of the legal position. We review the consideration, dates, security, the effect of breach, confidentiality and the mechanism for ending the pending proceedings."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "If the case has not yet been filed, it is best to start the review before sending a notice or taking a position that may limit your options. If proceedings are pending, we need the latest pleading or memorandum, the judgment or decision if any, and the key documents."
            ]
          }
        ]
      },
      {
        "label": "Arbitration",
        "intro": [
          "# Commercial arbitration: from drafting the clause to managing the dispute and enforcement",
          "The direction of many arbitrations is set before the proceedings begin: in drafting the clause, defining its scope, choosing the rules, seat and language, and then in the first decisions on jurisdiction, the formation of the tribunal and the procedural timetable. So we treat arbitration as a separate track that needs early procedural engineering."
        ],
        "sections": [
          {
            "h": "Drafting the arbitration clause",
            "p": [
              "We first review whether arbitration suits the transaction at all, then fix the institution or rules, seat, language, number of arbitrators, the scope of disputes, and its relationship to any prior negotiation or mediation."
            ]
          },
          {
            "h": "When a dispute starts",
            "p": [
              "We review the arbitration agreement, the contract, the likely claims, the value in dispute, urgent issues, jurisdiction, and any related parties or contracts, then build the case strategy, the evidence schedule and the potential experts."
            ]
          },
          {
            "h": "Institutional arbitration and the SCCA",
            "p": [
              "A dispute may be governed by the rules of the Saudi Center for Commercial Arbitration if the parties have agreed. The current version of the rules, and the procedure suited to the nature and value of the dispute, must always be checked before filing."
            ]
          },
          {
            "h": "Pleadings and evidence",
            "p": [
              "We focus on a coherent theory of the case, document management, experts where needed, witness preparation, and deciding what must be proved and what need not be, while watching the effect of procedural decisions on enforcement."
            ]
          },
          {
            "h": "After the award",
            "p": [
              "The next step may be to assess enforcement, deal with an annulment action within its statutory scope, or take enforcement-related steps depending on the nature of the award, the assets and the competent authority."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "If the contract contains an arbitration clause and a dispute has begun, send the full text of the clause, the contract and the key correspondence before taking any procedural step."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/en/blog/arbitration-vs-litigation-saudi-arabia",
        "label": "Arbitration or the courts in Saudi commercial disputes?"
      },
      {
        "href": "/en/blog/scca-arbitration-guide",
        "label": "SCCA arbitration: a practical guide"
      },
      {
        "href": "/blog/pre-litigation-commercial-strategy",
        "label": "Pre-litigation strategy in commercial disputes (Arabic)"
      },
      {
        "href": "/blog/evidence-commercial-cases-saudi-arabia",
        "label": "Evidence in commercial cases in Saudi Arabia (Arabic)"
      },
      {
        "href": "/en/services/corporate-contracts",
        "label": "Corporate & Contracts"
      },
      {
        "href": "/en/services/enforcement-recovery",
        "label": "Enforcement & Recovery"
      },
      {
        "href": "/en/blog/arbitration-clause-commercial-contracts-saudi-arabia",
        "label": "The arbitration clause in commercial contracts"
      }
    ]
  },
  "mergers-acquisitions": {
    "title": "M&A and Legal Due Diligence in Saudi Arabia | Riyadh Lawyers",
    "description": "Legal advice on mergers and acquisitions in Saudi Arabia: deal structuring, legal due diligence, negotiation, purchase documents and regulatory completion.",
    "h1": "Mergers, acquisitions and legal due diligence in Saudi Arabia",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Mergers, acquisitions and legal due diligence in Saudi Arabia",
          "A successful deal does not begin with the purchase agreement. It begins with understanding what is actually being bought, which obligations may travel with the deal, what must be a condition of closing, and what can be dealt with through price, security or indemnities."
        ],
        "sections": [
          {
            "h": "Structuring the deal",
            "p": [
              "We compare the available alternatives from the angle of the transfer of ownership, contracts, licences, employees and contingent liabilities. The result may be a purchase of shares or interests, an asset purchase, a staged investment, or a restructuring before the sale."
            ]
          },
          {
            "h": "Legal due diligence",
            "p": [
              "We review ownership, governance, key contracts, financing, security, licences, employment, disputes, intellectual property, real estate and regulatory obligations, then classify the findings by their effect on the deal."
            ]
          },
          {
            "h": "Deal documents",
            "p": [
              "Depending on the case: a letter of intent or memorandum of understanding, a purchase agreement, an investment agreement, a shareholders' agreement, disclosure schedules, corporate resolutions, completion documents and any transitional arrangements."
            ]
          },
          {
            "h": "Negotiation",
            "p": [
              "We concentrate on the issues that change the value of the deal or the client's position: representations and warranties, limits of liability, the claims period, conditions to closing, pre-closing undertakings and price-adjustment mechanisms."
            ]
          },
          {
            "h": "Completion and after",
            "p": [
              "We use a closing checklist showing who does what and when, and which documents must be signed or updated, then follow the post-closing obligations."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "If the deal is at an early stage, we can start before the memorandum of understanding is signed, to set the structure of the review, the documents and the negotiation points that should not be left until after the commercial agreement."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/en/blog/due-diligence-before-commercial-deal-saudi-arabia",
        "label": "Due diligence before a commercial deal in Saudi Arabia"
      },
      {
        "href": "/en/services/corporate-contracts",
        "label": "Corporate & Contracts"
      },
      {
        "href": "/en/services/compliance-governance",
        "label": "Governance & Compliance"
      }
    ]
  },
  "compliance-governance": {
    "title": "Corporate Governance & Compliance in Saudi Arabia | Riyadh",
    "description": "Governance and compliance services for companies in Saudi Arabia: allocating authority, board policies, conflicts of interest, internal regulations and compliance programmes.",
    "h1": "Governance and compliance that turn authority and obligations into a clear working system",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Governance and compliance that turn authority and obligations into a clear working system",
          "Governance is not a file to keep until someone asks for it. Its value shows when it is clear who holds the decision, who reviews it, how it is documented, and when disclosure or escalation is required. And compliance is not effective if it turns into a list of laws with no owner for each obligation and no practical procedure to apply it."
        ],
        "sections": [
          {
            "h": "Authority and decision map",
            "p": [
              "We review the ownership and management structure and the delegations, then identify the matters that need approval from the partners, the board or executive management, and the limits on signing, contracting, spending, hiring and settling."
            ]
          },
          {
            "h": "The board and its committees",
            "p": [
              "We help organise agendas, resolutions, minutes, disclosures, conflicts of interest, committees and the mechanisms for following up decisions, according to the type of company, the governing documents and sector requirements."
            ]
          },
          {
            "h": "The compliance programme",
            "p": [
              "It starts by listing the obligations attached to the activity and classifying them by risk and by the owner within the company, then setting the policies, controls, training, reporting and escalation mechanism, and periodic review."
            ]
          },
          {
            "h": "Policies and procedures",
            "p": [
              "These may cover delegation of authority, conflicts of interest, contracting and procurement, gifts and benefits, whistleblowing, record retention, confidentiality, signing, and dealing with regulators."
            ]
          },
          {
            "h": "Assessment and improvement",
            "p": [
              "A gap assessment can test both the documents and how they are applied in practice, and then produce a clear plan of priorities."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "If governance exists on paper but is unclear in operation, we start with a diagnostic session and a review of samples of decisions, delegations and policies, rather than rewriting everything from scratch."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/en/services/corporate-contracts",
        "label": "Corporate & Contracts"
      },
      {
        "href": "/en/services/legal-advisory",
        "label": "Outsourced Legal Counsel"
      }
    ]
  },
  "bankruptcy-restructuring": {
    "title": "Bankruptcy & Restructuring Lawyer in Saudi Arabia | Riyadh",
    "description": "Advice on bankruptcy and restructuring procedures in Saudi Arabia for debtors and creditors, from preventive settlement and financial reorganisation to liquidation and claims.",
    "h1": "Bankruptcy and restructuring: choose the path before the crisis chooses it",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Bankruptcy and restructuring: choose the path before the crisis chooses it",
          "When liquidity falters or obligations pile up, time becomes a legal and a commercial element at once. The common mistake is to wait until the options of renegotiation or restructuring turn into multiple disputes and scattered proceedings."
        ],
        "sections": [
          {
            "h": "For the company or debtor",
            "p": [
              "We review the nature of the distress, the debts due and expected, the principal creditors, security, key contracts, disputes and cash flows, then compare a private renegotiation, a preventive settlement, financial reorganisation or the other paths."
            ]
          },
          {
            "h": "For the creditor",
            "p": [
              "We identify the basis and amount of the claim, the security and its ranking, any dispute over the debt and the debtor's position in the procedure, then pursue the claim and participate in the plan as the case requires."
            ]
          },
          {
            "h": "Financial reorganisation",
            "p": [
              "It needs a workable view on continuing the business, dealing with obligations and the company's relationship with creditors, so the legal work must be integrated with the financial statements and the business plan."
            ]
          },
          {
            "h": "Preventive settlement",
            "p": [
              "It may suit some cases where the company needs an organised framework to reach a settlement with creditors while management continues, according to the statutory conditions and the facts."
            ]
          },
          {
            "h": "Liquidation",
            "p": [
              "When continuing is not realistic, we focus on the parties' legal positions, claims, contracts, assets and security within the procedure under way."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "In distress files, the earlier the review, the more options there are. You can start with a summary of the debts, the creditors, the security, the main contracts and the disputes under way."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/en/services/enforcement-recovery",
        "label": "Enforcement & Recovery"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes & Arbitration"
      }
    ]
  },
  "foreign-investment": {
    "title": "Foreign Investment Lawyer in Riyadh | Entering Saudi Arabia",
    "description": "Legal support for foreign investors in Saudi Arabia: market-entry structuring, investment registration, forming the entity, agreements, licences and operational compliance.",
    "h1": "A foreign investor's entry into the Saudi market, from registration to operation",
    "groups": [
      {
        "label": null,
        "intro": [
          "# A foreign investor's entry into the Saudi market, from registration to operation",
          "Entering the Saudi market is not a single step. Under the updated law, investment registration comes before activity for a foreign investor; then comes forming the entity and obtaining the approvals or licences the activity requires; and after that the real operating obligations begin."
        ],
        "sections": [
          {
            "h": "Choosing the entry structure",
            "p": [
              "We start with the type of activity, the partners or owners, the nature of the customers, the need for employees or assets in the Kingdom and the funding method, and then identify the most suitable entry structure under the relevant laws."
            ]
          },
          {
            "h": "Investment registration and formation",
            "p": [
              "The updated investment law relies on registration of the foreign investor before the investment is made, after which the commercial registration steps and the approvals needed to carry on the activity are completed. We therefore separate registration itself from the sector licences that may still be required."
            ]
          },
          {
            "h": "Contracts and governance",
            "p": [
              "Where there is a local partner or several investors, we focus on the partners' agreement, authority, funding, profit distribution, transfer of ownership, intellectual property, exit and dispute resolution."
            ]
          },
          {
            "h": "Operational compliance",
            "p": [
              "After formation, obligations begin that relate to the activity, employees, contracts, the register, data and governance, depending on the sector. So we prepare a Legal Launch Checklist showing the authorities, procedures and documents that must be followed."
            ]
          },
          {
            "h": "Expansion or acquisition",
            "p": [
              "An existing investor may need to restructure, add an activity, buy an existing company or enter a joint venture; here we connect the investment with due diligence, transactions and governance."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "If the project is at the planning stage, send a description of the activity, the proposed ownership structure, the nationality of the investors and whether there is a local partner. This information is usually enough to build the initial map of procedures."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/en/blog/investment-registration-saudi-arabia",
        "label": "Investment registration for foreign investors in Saudi Arabia"
      },
      {
        "href": "/en/services/mergers-acquisitions",
        "label": "Mergers & Acquisitions"
      },
      {
        "href": "/en/services/corporate-contracts",
        "label": "Corporate & Contracts"
      }
    ]
  },
  "enforcement-recovery": {
    "title": "Debt Recovery & Enforcement Lawyer in Riyadh",
    "description": "Managing the recovery of company receivables from demand and negotiation to claim and enforcement, with assessment of instruments and documents and choice of the best legal path.",
    "h1": "Recovering company receivables: from proving the debt to enforcement",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Recovering company receivables: from proving the debt to enforcement",
          "Effective recovery does not begin by sending a standard notice. It begins by understanding the source of the debt, the quality of the proof, the debtor's position, the value of the commercial relationship, and the assets or cash flows that may be available. Only then can the path be chosen: a direct demand, negotiation, a claim, or enforcement if the creditor holds a suitable instrument."
        ],
        "sections": [
          {
            "h": "Examining the claim",
            "p": [
              "We review the contract or purchase order, the invoices, delivery or completion, the correspondence, account statements, transfers, admissions, security and any earlier objections from the debtor."
            ]
          },
          {
            "h": "Demand and negotiation",
            "p": [
              "Where negotiation is worthwhile, we use a legal demand to open a serious path, not to repeat invoices, and we review any rescheduling offer from the angle of security and enforceability."
            ]
          },
          {
            "h": "The claim",
            "p": [
              "If the debt is disputed or there is no direct enforceable instrument, we prepare the claim or the suitable path, concentrating on proving entitlement and meeting the expected defences."
            ]
          },
          {
            "h": "Enforcement",
            "p": [
              "Where there is an enforceable instrument or an enforceable judgment, we move to a separate file whose aim is actual recovery: we review the debtor's details, the relevant security and earlier steps, then follow the steps the law makes available."
            ]
          },
          {
            "h": "A portfolio of company debts",
            "p": [
              "For companies with many claims, we can build a classification system: files ready, files needing documents completed, negotiation, claim and enforcement, showing the recoverable value and the next stage for each file."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "To begin, a statement of claims showing the debtor's name, the principal, the amount, the due date and the last step taken is enough, and we then identify which files deserve action first."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/blog/breach-of-contract-damages-saudi-arabia",
        "label": "Damages for breach of contract in Saudi Arabia (Arabic)"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes & Arbitration"
      },
      {
        "href": "/en/services/corporate-contracts",
        "label": "Corporate & Contracts"
      },
      {
        "href": "/en/services/bankruptcy-restructuring",
        "label": "Bankruptcy & Restructuring"
      }
    ]
  },
  "legal-advisory": {
    "title": "Outsourced Legal Counsel for Companies in Riyadh",
    "description": "An outsourced legal counsel service for companies covering advice, contracts, governance, risk and disputes within a defined scope, with clear contact and reporting.",
    "h1": "Outsourced legal counsel for companies, without building a full legal department",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Outsourced legal counsel for companies, without building a full legal department",
          "Some companies need an ongoing legal function but do not yet need a full legal department, or need outside support to help their internal team with a backlog or specialised files. An outsourced legal counsel service builds a single entry point for day-to-day matters with a clear mechanism for escalation and reporting."
        ],
        "sections": [
          {
            "h": "What can fall within the service?",
            "p": [
              "Contract review, day-to-day advice, company decisions and governance, selected policies, risk review before new initiatives, notices and demands, and managing court files or negotiations before escalation."
            ]
          },
          {
            "h": "Defining the scope",
            "p": [
              "We do not use a vague subscription of the 'all legal services' kind. We define the types of requests, response times, the people authorised to contact us, and the line between day-to-day advice and a separate project."
            ]
          },
          {
            "h": "A matter intake system",
            "p": [
              "A single channel for requests can be set up with a simple Matter Intake: what is the matter, what is the deadline, who decides, which documents, what level of confidentiality? The request is then classified as quick, routine, urgent or a separate project."
            ]
          },
          {
            "h": "Reporting and legal memory",
            "p": [
              "Over time the value multiplies when the company keeps a record of questions, decisions, contracts and risks. So the service can include a periodic report of open matters, important deadlines and recurring patterns."
            ]
          },
          {
            "h": "When is it suitable?",
            "p": [
              "For companies in a growth stage, foreign companies at the start of operations, businesses that depend on a large number of contracts, or organisations with a strong management team but no dedicated in-house counsel."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "If you are looking for ongoing legal support, we start by listing the type and volume of requests over the last two or three months, then build a realistic scope and the response level required."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/en/services/corporate-contracts",
        "label": "Corporate & Contracts"
      },
      {
        "href": "/en/services/compliance-governance",
        "label": "Governance & Compliance"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes & Arbitration"
      }
    ]
  },
  "employment-labor": {
    "title": "Employment Lawyer in Riyadh | Contracts & Labor Disputes",
    "description": "Labor law services for individuals and organizations in Riyadh: employment contracts, termination and entitlements, investigations and penalties, and labor disputes.",
    "h1": "Employment lawyer in Riyadh: contracts, termination and labor disputes",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Employment lawyer in Riyadh for workers and employers",
          "An employment relationship starts with a contract and ends with a settlement, and in between small decisions accumulate: a penalty, a transfer, a warning, a change in pay. Most labor disputes are decided by what was documented in those decisions, not by what either side intended. We work with individuals and organizations on structuring the relationship before a disagreement and on handling it when it arises."
        ],
        "sections": [
          {
            "h": "Our scope",
            "p": [
              "We provide labor law services to individuals and to organizations: employment contracts, internal work regulations, HR policies, termination and entitlements, investigations and penalties, and disputes before the competent bodies. These matters are governed by the Labor Law and its regulations."
            ]
          },
          {
            "h": "For workers",
            "p": [
              "We review an employment contract before it is signed, read a termination or penalty decision if there is one, explain the likely entitlements and the routes available, and review a release before it is signed, because a release may contain a waiver whose effect is only felt later. We represent the worker in a claim, in amicable settlement, and before the body competent for labor disputes."
            ]
          },
          {
            "h": "For employers",
            "p": [
              "We draft employment contracts to the type of role, the term, probation, pay and its components, confidentiality and non-competition, and we prepare work regulations suited to the organization's activity. A regulation that is approved and made available to staff protects the employer when a penalty or termination is challenged."
            ]
          },
          {
            "h": "Termination and entitlements",
            "p": [
              "The way a relationship ends (expiry of term, termination by the employer for a legitimate reason, termination without a legitimate reason, or resignation) determines the entitlements that follow: end-of-service award, leave and compensation. We review the position before the decision is taken, not after, because a mistake in characterising the termination can cost either side more than expected."
            ]
          },
          {
            "h": "Investigations and penalties",
            "p": [
              "Before a penalty or a dismissal for a legitimate reason, we check whether the violation is covered by the regulation, whether the investigation was run properly and the worker was given a chance to respond, and whether the penalty is proportionate and imposed in time. We draft investigation memoranda, warnings and penalty decisions, and we review them equally for the worker who has been penalised."
            ]
          },
          {
            "h": "Labor disputes",
            "p": [
              "These usually begin with an amicable settlement stage, followed by a claim before the labor court. We represent the worker or the organization in settlement and in the claim, and prepare the file: the contract, statements, correspondence, attendance records and entitlements paid. The more orderly the records, the shorter and cheaper the dispute."
            ]
          },
          {
            "h": "What you receive",
            "p": [
              "Depending on scope and on whether you are a worker or an employer: an opinion on an employment contract or its termination, a drafted contract or regulation, templates for warnings, investigations and penalties, a claim or response memorandum, and representation in settlement and in the claim."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "Send the employment contract, the termination or penalty decision if there is one, any claim you have received, and the salary and term details. That is enough to assess the position and set the next step."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/blog/employer-terminate-employment-without-reason-saudi-arabia",
        "label": "Can an employer end an employment contract without a reason? (Arabic)"
      },
      {
        "href": "/blog/end-of-employment-entitlements-saudi-arabia",
        "label": "What am I owed when my employment ends? (Arabic)"
      },
      {
        "href": "/en/individuals",
        "label": "Services for individuals"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes, Arbitration & Settlement"
      }
    ]
  },
  "criminal-defense": {
    "title": "Criminal Defense Lawyer in Riyadh | Criminal Cases",
    "description": "Criminal defense services in Riyadh: defense in criminal cases of every kind and in specialised penal matters, from the investigation stage through trial and appeal.",
    "h1": "Criminal defense lawyer in Riyadh: defense in criminal cases",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Criminal defense lawyer in Riyadh for criminal cases of every kind",
          "In a criminal case the most important decisions are taken in the first days: what is said at the investigation, what is signed, how the case file is read. So we start by understanding the facts and the documents of the case before any step is taken, and we build the defense on what is in the file, not on a first impression."
        ],
        "sections": [
          {
            "h": "When do you need a criminal defense lawyer?",
            "p": [
              "When you are summoned for investigation or learn of a complaint or report, on arrest or detention, when you are served with a statement of claim or a hearing date, and when a judgment is issued that you want to study and challenge. The earlier we are contacted, the wider the range of what can be done."
            ]
          },
          {
            "h": "Our scope",
            "p": [
              "We handle defense in criminal cases of every kind, and in specialised penal matters including cybercrime and economic cases and the investigations connected with them."
            ]
          },
          {
            "h": "Specialised criminal branches",
            "p": [
              "Alongside general criminal cases we handle specialised branches, including drug and psychotropic substance cases, driving under the influence of alcohol or drugs, assault and harm cases, defamation, insult and blackmail, fraud and breach of trust, and cybercrime and economic crime.",
              "Each branch has its own nature in accusation, proof and procedure, so we read the file according to its branch and do not treat cases on a single pattern. Cybercrime, and fraud and breach of trust, each have their own page on this site."
            ]
          },
          {
            "h": "The inquiry and investigation stage",
            "p": [
              "We read what is alleged against you and what the inquiry record contains, prepare you for what you will be asked, and follow the procedures with the competent authority. The law allows an accused person to be assisted by a lawyer in the proceedings, and we arrange attendance according to what each stage permits."
            ]
          },
          {
            "h": "Trial",
            "p": [
              "We read the statement of claim and the evidence submitted, prepare formal and substantive defenses and defense memoranda, and plead before the competent court. Our work rests on analysing the evidence, its consistency, and how it fits the legal characterisation of the act."
            ]
          },
          {
            "h": "Challenging a judgment",
            "p": [
              "We study the judgment and its reasons, identify what can be challenged, and prepare the appeal memorandum within the periods set by law. Delay in having a judgment read is one of the things that narrows options most, so we recommend bringing it to us as soon as it is received."
            ]
          },
          {
            "h": "Settlement and the private right",
            "p": [
              "In some cases a private right of an injured person is attached to the act, and settlement or waiver may have an effect depending on the law and the type of case. We explain what the law permits in your case and how it is documented properly."
            ]
          },
          {
            "h": "Confidentiality of the file",
            "p": [
              "What you tell us stays confidential and is shared only as far as professional need requires, and before accepting any engagement we check for conflicts of interest."
            ]
          },
          {
            "h": "The limits of what we offer",
            "p": [
              "No lawyer can promise an outcome; the outcome of a case depends on its facts, its evidence and the applicable law. What we offer is a frank assessment of the position, disciplined management of the procedures, and a defense built on the file."
            ]
          },
          {
            "h": "What you receive",
            "p": [
              "Depending on scope: a reading of the case file and its documents, a defense memorandum, pleading before the court, an appeal memorandum, and follow-up of procedures before the competent authorities."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "Send what you have: a summons, notice, statement of claim, decision or judgment, with the sequence of facts as you know them. That is enough for us to assess the position and set the next step."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/services/cyber-crime",
        "label": "Cyber Crime (Arabic)"
      },
      {
        "href": "/services/white-collar-aml",
        "label": "White-Collar Crime & AML (Arabic)"
      },
      {
        "href": "/en/individuals",
        "label": "Services for individuals"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes, Arbitration & Settlement"
      }
    ]
  },
  "estates-inheritance": {
    "title": "Estates & Inheritance Lawyer in Riyadh | Estate Division",
    "description": "Estate and inheritance legal services in Riyadh: identifying heirs and the estate, dividing it by agreement or through the courts, disputes among heirs, and management of estate assets.",
    "h1": "Estates and inheritance lawyer in Riyadh: estate division and heirs' disputes",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Estates and inheritance lawyer in Riyadh for every kind of estate matter",
          "A dispute over an estate combines money and kinship, and drags on if it is not handled clearly. What is needed first is to know who the heirs are, what the estate comprises and what it owes, and then to choose the route of division that suits the parties and the assets."
        ],
        "sections": [
          {
            "h": "When do you need this work?",
            "p": [
              "When a person dies leaving several heirs, when there is disagreement over dividing the estate or over who the heirs or the assets are, when an heir deals with estate property or withholds its documents, when a minor is among the heirs, and when real estate or a company forms part of the estate."
            ]
          },
          {
            "h": "Our scope",
            "p": [
              "We handle estate and inheritance matters in full: identifying the heirs and the estate, dividing it by agreement or through the courts, disputes among heirs, management of estate assets during a dispute, and the debts, rights and documents connected with them."
            ]
          },
          {
            "h": "Identifying the heirs and the estate",
            "p": [
              "We begin by determining the heirs and listing the estate's assets and obligations, including debts and rights. Any disagreement over who the heirs are or what the assets are is resolved before moving to division."
            ]
          },
          {
            "h": "Division by agreement",
            "p": [
              "If the heirs agree to divide by consent, it is faster and cheaper, provided the agreement is documented in clear terms. We draft the division agreement and review the effect of each term on each heir."
            ]
          },
          {
            "h": "Judicial division and disputes among heirs",
            "p": [
              "Where agreement is not possible, judicial division is an orderly route, and it may take a time that varies with the complexity of the assets. We prepare the claim or the response and follow the procedures, and we represent the heir in claims connected with the estate."
            ]
          },
          {
            "h": "Estates with real estate or a company",
            "p": [
              "Who manages the asset during the dispute has to be considered, and a written agreement on management is preferable. A jointly held asset may not be dealt with without the consent of the other heirs or the permission of the competent authority, and an independent valuation may be needed before division or sale."
            ]
          },
          {
            "h": "Minors and absent heirs",
            "p": [
              "They are subject to special rules on guardianship and permission, and division or dealing with their share cannot proceed without meeting them. We explain what is required before any step."
            ]
          },
          {
            "h": "What you receive",
            "p": [
              "Depending on scope: a reading of the estate file and its assets, a division agreement, a statement of claim or a response memorandum, representation before the competent authority, and follow-up of enforcement."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "Send what shows the death and the kinship, what you know of the estate's assets and debts, and any agreement or correspondence between the heirs. That is enough for us to assess the position and propose a route."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/blog/heirs-dispute-estate-division-saudi-arabia",
        "label": "What to do when heirs disagree on dividing an estate (Arabic)"
      },
      {
        "href": "/services/family-business",
        "label": "Family Business (Arabic)"
      },
      {
        "href": "/en/individuals",
        "label": "Services for individuals"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes, Arbitration & Settlement"
      }
    ]
  },
  "personal-status": {
    "title": "Personal Status Lawyer in Riyadh",
    "description": "Personal status legal services in Riyadh: family matters and their disputes, from marriage and separation to maintenance, custody, visitation and guardianship, handled with discretion.",
    "h1": "Personal status lawyer in Riyadh: family matters and disputes",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Personal status lawyer in Riyadh for family matters and their disputes",
          "Family matters differ from others: they involve lasting relationships, children, and a sensitivity that a long adversarial process does not tolerate. So we consider each matter with a view to what serves the parties, looking for an amicable settlement where one is possible and taking on the claim or the defense where it is needed."
        ],
        "sections": [
          {
            "h": "Our scope",
            "p": [
              "We provide advice and representation in personal status matters and their disputes in full, including marriage and its effects, separation and what follows from it, maintenance, custody and visitation, guardianship, and the related claims and settlements."
            ]
          },
          {
            "h": "Amicable settlement first",
            "p": [
              "Many family matters can be resolved by a written agreement that sets out rights and obligations and is documented properly, which is usually cheaper for the parties and better for the relationship. We prepare settlement agreements and review the effect of each term."
            ]
          },
          {
            "h": "Claims and defense",
            "p": [
              "Where settlement does not work, we prepare the statement of claim or the response, organise the documents and evidence, represent our client before the competent court, and follow challenges to judgments in line with the law."
            ]
          },
          {
            "h": "Enforcing judgments",
            "p": [
              "A judgment does not take full effect until it is enforced. We follow enforcement of personal status judgments before the competent authorities, and any difficulties that arise in enforcement."
            ]
          },
          {
            "h": "Privacy and confidentiality",
            "p": [
              "Family matters are among the most sensitive. What you tell us stays confidential and is shared only as far as professional need requires."
            ]
          },
          {
            "h": "What you receive",
            "p": [
              "Depending on scope: an opinion on the matter and its route, a statement of claim or response memorandum, a settlement agreement, representation before the court, and follow-up of enforcement."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "Send the documents connected with the matter, such as the marriage contract, earlier judgments or correspondence, with the sequence of facts as you know them. That is enough for us to assess the position and propose a route."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/en/services/estates-inheritance",
        "label": "Estates & Inheritance"
      },
      {
        "href": "/en/individuals",
        "label": "Services for individuals"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes, Arbitration & Settlement"
      }
    ]
  },
  "negotiable-instruments-debts": {
    "title": "Cheques, Notes & Debt Claims Lawyer in Riyadh",
    "description": "Legal services on cheques, promissory notes, bills of exchange, debt claims and enforcement in Riyadh: reading the instrument and documents, routes of claim, and follow-up of enforcement.",
    "h1": "Cheques, promissory notes and debts lawyer in Riyadh: from claim to enforcement",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Debt, cheque and promissory note lawyer in Riyadh for creditors and debtors",
          "A documented debt can lose its time between demand, claim and enforcement if its documents are not read correctly from the start. We work with the creditor on choosing the route that suits the document, and with the debtor on examining the debt, the defenses and a suitable settlement."
        ],
        "sections": [
          {
            "h": "When do you need this work?",
            "p": [
              "When a debtor is late paying a debt evidenced by a cheque, promissory note, bill of exchange, contract or correspondence; when a cheque is returned; when you are being pursued on an instrument you believe is not due or is defective; and when you want to enforce a judgment or an instrument."
            ]
          },
          {
            "h": "Our scope",
            "p": [
              "We handle cheques, promissory notes and bills of exchange, and claims for debts whether evidenced by a commercial instrument, a contract or correspondence, together with enforcement procedures, for the creditor or the debtor as the case may be."
            ]
          },
          {
            "h": "Reading the instrument and documents",
            "p": [
              "We begin by examining the instrument, its particulars, what evidences the debt, and the sequence of dates and correspondence. The route that suits a commercial instrument may not suit a debt evidenced by correspondence, and it varies with the type of instrument and its terms."
            ]
          },
          {
            "h": "For the creditor",
            "p": [
              "We prepare the amicable demand and the warning, file the claim or request enforcement as the law allows for your document, and follow enforcement against the debtor's assets. Actual recovery depends on the debtor's capacity and assets, so we assess that early."
            ]
          },
          {
            "h": "For the debtor",
            "p": [
              "We review the validity and amount of the debt and the defenses available, negotiate a settlement or rescheduling that we document in clear terms, and follow objections at the enforcement stage where the law permits."
            ]
          },
          {
            "h": "Settlement and rescheduling",
            "p": [
              "Many debts end in settlement. We document it so as to protect the creditor's right and make clear to the debtor what is owed and what follows from default."
            ]
          },
          {
            "h": "The limits of what we offer",
            "p": [
              "No lawyer can promise an outcome or the recovery of a sum; that depends on the documents and on the debtor. We give a frank reading of the position and disciplined management of the procedures."
            ]
          },
          {
            "h": "What you receive",
            "p": [
              "Depending on scope: a reading of the debt documents, a warning or amicable demand, a statement of claim or response memorandum, a settlement or rescheduling agreement, and follow-up of enforcement."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "Send the cheque, note or contract and whatever correspondence and statements you hold, with what you know of the debtor. That is enough for us to assess the position and propose a route."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/blog/claim-outstanding-debt-saudi-arabia",
        "label": "How to claim a documented debt (Arabic)"
      },
      {
        "href": "/en/services/enforcement-recovery",
        "label": "Enforcement & Recovery"
      },
      {
        "href": "/en/individuals",
        "label": "Services for individuals"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes, Arbitration & Settlement"
      }
    ]
  },
  "leases-eviction": {
    "title": "Lease & Eviction Lawyer in Riyadh | Late Rent",
    "description": "Legal services on leases, eviction and late rent in Riyadh for landlords and tenants: contract review, warnings, claims, proceedings and enforcement.",
    "h1": "Lease and eviction lawyer in Riyadh: tenancy contracts and late rent",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Lease and eviction lawyer in Riyadh for landlords and tenants",
          "A tenancy begins with a contract and usually ends with a handover, with rent, maintenance and renewal in between. Most disputes come from an unclear contract or from lateness that was never documented. We work with both sides on structuring the relationship before a dispute and handling it when it arises."
        ],
        "sections": [
          {
            "h": "When do you need this work?",
            "p": [
              "When signing a residential or commercial lease; when a tenant is late with rent; when a landlord wants to evict or a tenant wants to challenge eviction; and when there is a disagreement over renewal, termination, maintenance or return of the deposit."
            ]
          },
          {
            "h": "Our scope",
            "p": [
              "We handle residential and commercial leases: reviewing and drafting them, late rent, eviction, renewal and termination, maintenance and defects, and recovery of the deposit, for the landlord or the tenant."
            ]
          },
          {
            "h": "The contract and its documentation",
            "p": [
              "We review the term, rent, payment method, renewal, termination, maintenance and each side's rights before signing, and explain the accepted way of documenting the contract, since documentation makes proof easier in a dispute."
            ]
          },
          {
            "h": "For the landlord",
            "p": [
              "We prepare the warning to pay or vacate, claim the arrears, file the eviction claim as the law and the contract allow, and follow enforcement."
            ]
          },
          {
            "h": "For the tenant",
            "p": [
              "We review the ground for the demand to vacate or pay and whether it rests on the contract and the law, explain your rights on term, maintenance and deposit, and represent you in settlement and in the claim."
            ]
          },
          {
            "h": "Settlement",
            "p": [
              "Many lease disputes are resolved by a written agreement on rescheduling the rent or on a date to vacate. We document it so as to protect both sides."
            ]
          },
          {
            "h": "What you receive",
            "p": [
              "Depending on scope: an opinion on a lease or its renewal, a drafted contract, a warning, a claim, eviction or response memorandum, representation in the proceedings, and follow-up of enforcement."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "Send the lease and whatever receipts, correspondence and warnings you hold. That is enough to assess the position and set the next step."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/services/real-estate-construction",
        "label": "Real Estate & Construction (Arabic)"
      },
      {
        "href": "/en/services/property-disputes",
        "label": "Property Disputes, Sales & Conveyance"
      },
      {
        "href": "/en/individuals",
        "label": "Services for individuals"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes, Arbitration & Settlement"
      }
    ]
  },
  "property-disputes": {
    "title": "Property Disputes & Conveyance Lawyer in Riyadh",
    "description": "Legal services on property disputes, sale contracts and conveyance in Riyadh: title checks, drafting the sale contract, and disputes over ownership, handover and transfer.",
    "h1": "Property disputes lawyer in Riyadh: sale contracts, conveyance and ownership",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Property lawyer in Riyadh for sale contracts, conveyance and ownership disputes",
          "Real estate is often the most valuable thing an individual owns, and the flaws in its contract appear only at transfer or in a dispute. Before a deal we check and draft it; after a dispute we assess the suitable route."
        ],
        "sections": [
          {
            "h": "When do you need this work?",
            "p": [
              "When buying or selling property; when the other side refuses to transfer title; when handover is delayed, a defect appears or a competing claim to ownership is made; on a dispute over boundaries or entitlement; and in a joint property venture."
            ]
          },
          {
            "h": "Our scope",
            "p": [
              "We handle property sale contracts, deposits and instalments, conveyance and transfer of ownership, disputes over ownership, boundaries and entitlement, delay in handover or transfer, defects in the property sold, and joint property ventures."
            ]
          },
          {
            "h": "Before buying",
            "p": [
              "We check the title deed, the seller's capacity and any mortgage, restriction or obligation on the property, then draft the sale contract to set out the price, instalments, date of transfer and the effect of default. Checking before signing is easier than curing afterwards."
            ]
          },
          {
            "h": "When the seller refuses to transfer",
            "p": [
              "We set out the options: a warning and a demand to complete the sale, or rescission with a claim for compensation and refund, depending on the contract and the facts, and we represent you in settlement and in the claim."
            ]
          },
          {
            "h": "Ownership and boundary disputes",
            "p": [
              "We read the deeds, plans and related documents, prepare the claim or the response and organise the evidence. Some disputes need technical expertise, and we say so early."
            ]
          },
          {
            "h": "Settlement",
            "p": [
              "Many property disputes are resolved by a written settlement on a date of transfer or an agreed compensation. We document it to protect both sides."
            ]
          },
          {
            "h": "What you receive",
            "p": [
              "Depending on scope: a legal check memorandum on the property, a drafted or reviewed sale contract, a warning, a statement of claim or response memorandum, representation in the proceedings, and follow-up of enforcement."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "Send the title deed, the sale contract or its draft, and whatever correspondence and receipts you hold. That is enough to assess the position and set the next step."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/services/real-estate-construction",
        "label": "Real Estate & Construction (Arabic)"
      },
      {
        "href": "/en/services/leases-eviction",
        "label": "Leases & Eviction"
      },
      {
        "href": "/en/individuals",
        "label": "Services for individuals"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes, Arbitration & Settlement"
      }
    ]
  },
  "traffic-accidents": {
    "title": "Traffic Accident & Violations Lawyer in Riyadh",
    "description": "Legal services on traffic accidents, traffic violations and compensation in Riyadh: determining responsibility, the accident file, claiming compensation, and dealing with insurers.",
    "h1": "Traffic accident lawyer in Riyadh: responsibility, compensation and violations",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Traffic accident, violations and compensation lawyer in Riyadh",
          "After a road accident questions pile up: who is responsible, who bears the harm, and how is compensation assessed? The answers depend on what evidence was kept in the first days. We help you read the incident and assess your rights and the route."
        ],
        "sections": [
          {
            "h": "When do you need this work?",
            "p": [
              "After an accident with injury or damage; when responsibility is disputed; when an insurer refuses or delays; when you face a traffic violation you believe is wrong; and where a death or serious injury results from an accident."
            ]
          },
          {
            "h": "Our scope",
            "p": [
              "We handle determining responsibility for the accident, reading the accident report and the incident file, claiming compensation for bodily and material harm, dealing with the insurer, and traffic violations and objections to them."
            ]
          },
          {
            "h": "Straight after the accident",
            "p": [
              "Keep the accident report, photographs, witnesses' names and whatever shows the injury and treatment, and do not sign an acknowledgment or waiver before reading it. What is signed in the first hours is hard to retract."
            ]
          },
          {
            "h": "Responsibility and compensation",
            "p": [
              "We read the accident report and its circumstances and identify the responsible parties, then explain the possible heads of compensation: the injury and treatment, the resulting time off work, and damage to the vehicle. It is assessed on the facts and the evidence, and no sum is assumed in advance."
            ]
          },
          {
            "h": "Dealing with the insurer",
            "p": [
              "We review the policy and the insurer's position, prepare the claim with its documents, negotiate or object where it is refused or reduced, and represent you before the competent body."
            ]
          },
          {
            "h": "Traffic violations",
            "p": [
              "We review the violation, its basis and facts, explain the route to object and prepare the objection, mindful of the periods the law sets."
            ]
          },
          {
            "h": "What you receive",
            "p": [
              "Depending on scope: a reading of the accident file and an assessment of responsibility, a claim for compensation, an objection to the insurer's position, an objection to a violation, and representation before the competent body."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "Send the accident report, photographs, what shows injury or damage, and the insurance policy if there is one. That is enough to assess the position."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/en/services/insurance",
        "label": "Insurance"
      },
      {
        "href": "/en/services/criminal-defense",
        "label": "Criminal Defense"
      },
      {
        "href": "/en/individuals",
        "label": "Services for individuals"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes, Arbitration & Settlement"
      }
    ]
  },
  "fraud-breach-of-trust": {
    "title": "Fraud & Breach of Trust Lawyer in Riyadh",
    "description": "Legal services in fraud and breach of trust cases in Riyadh for victims and accused: documenting the incident, the complaint, claiming recovery, and defense at investigation and trial.",
    "h1": "Fraud and breach of trust lawyer in Riyadh: complaint, defense and recovery",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Fraud and breach of trust lawyer in Riyadh for victims and the accused",
          "A lot of money is lost because its owner trusted someone who did not deserve it: a transfer with nothing in return, a trust not returned, an investment promise not kept. The owner is left unsure between a criminal complaint and a civil claim, and the accused faces a description that may not fit what happened. We read the incident first and then decide the route."
        ],
        "sections": [
          {
            "h": "When do you need this work?",
            "p": [
              "When money is lost through deception, misappropriation of a trust or a transfer for nothing; when you are accused of any of these; and when you want to recover money handed to someone for a particular purpose and not returned."
            ]
          },
          {
            "h": "Our scope",
            "p": [
              "We handle fraud and breach of trust cases for the victim and for the accused, including those involving funds, partnerships, powers of attorney and transfers, together with any civil claim for recovery."
            ]
          },
          {
            "h": "A crime or a civil dispute?",
            "p": [
              "Not every financial incident is a crime; it may be a breach of contract. How the incident is characterised decides the competent body, the route and the evidence needed, so we characterise it properly before any step."
            ]
          },
          {
            "h": "For the victim",
            "p": [
              "We document the incident and the evidence, such as transfers, correspondence and contracts, prepare and follow the complaint, and consider a civil claim to recover the money, assessing what can actually be recovered."
            ]
          },
          {
            "h": "For the accused",
            "p": [
              "We read what is alleged and its evidence, prepare the defense, including denying the act or the intent or having it properly characterised, represent you at investigation and trial, and consider settlement and waiver where the law allows."
            ]
          },
          {
            "h": "The limits of what we offer",
            "p": [
              "We promise no outcome and no recovery of any sum; the result depends on the evidence, the facts and the law."
            ]
          },
          {
            "h": "What you receive",
            "p": [
              "Depending on scope: a reading and characterisation of the incident, documentation of the evidence, drafting of the complaint or defense memorandum, a claim for recovery, and representation before the competent bodies."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "Send the transfers, contracts, correspondence and the sequence of facts, and say whether you are the victim or the accused. Do not delete anything before we have reviewed it with you."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/en/services/criminal-defense",
        "label": "Criminal Defense"
      },
      {
        "href": "/services/white-collar-aml",
        "label": "White-Collar Crime & AML (Arabic)"
      },
      {
        "href": "/en/individuals",
        "label": "Services for individuals"
      },
      {
        "href": "/en/services/negotiable-instruments-debts",
        "label": "Cheques, Notes & Debt Claims"
      }
    ]
  },
  "administrative-grievances": {
    "title": "Administrative Grievances & Government Disputes Lawyer",
    "description": "Legal services on administrative grievances and disputes with government bodies in Riyadh: administrative decisions, grievances, claims before the administrative judiciary, and employee disputes.",
    "h1": "Administrative grievances lawyer in Riyadh: decisions and disputes with government bodies",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Administrative grievances and government disputes lawyer in Riyadh",
          "An administrative decision directly affects an individual or an organization: a refused licence, a penalty, a termination of service, a failure to act. The way to challenge it has a route and time limits, and delay in either can lose the right. So we read the decision first and then set the route."
        ],
        "sections": [
          {
            "h": "When do you need this work?",
            "p": [
              "When an administrative decision is issued that you believe breaches the law; when a request or licence is refused; when a penalty is imposed or a public employee's service is terminated; when a body fails to do what it must; and in a contractual dispute with a government body."
            ]
          },
          {
            "h": "Our scope",
            "p": [
              "We handle administrative grievances, disputes with government bodies, claims before the administrative judiciary, disputes of public employees, and related claims."
            ]
          },
          {
            "h": "The grievance before the body",
            "p": [
              "In many administrative claims a grievance to the body that issued the decision comes before the claim, and the grievance and the claim have time limits set by law whose lapse may lose the right. We therefore advise bringing the decision to us as soon as it is notified."
            ]
          },
          {
            "h": "The claim before the administrative judiciary",
            "p": [
              "We read the decision, its reasons and the documents, prepare the statement of claim and the pleas, represent you before the competent court, and follow what comes after judgment."
            ]
          },
          {
            "h": "The government employee",
            "p": [
              "We review decisions on public employment such as discipline, termination and entitlements, and explain the options, the route and the time limits."
            ]
          },
          {
            "h": "Contracts with government bodies",
            "p": [
              "A contractual dispute with a government body has its own nature and terms, and the contracts of organizations with government have a separate page."
            ]
          },
          {
            "h": "What you receive",
            "p": [
              "Depending on scope: a reading of the decision and the route to challenge it, a grievance memorandum, a statement of claim or response memorandum, and representation before the body and the court."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "Send the decision, what shows the date it was notified, and earlier correspondence. That is enough to assess the position, and it is best done as soon as you are notified."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/services/government-contracts",
        "label": "Government Contracts (Arabic)"
      },
      {
        "href": "/en/individuals",
        "label": "Services for individuals"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes, Arbitration & Settlement"
      },
      {
        "href": "/en/services/employment-labor",
        "label": "Employment & Labor"
      }
    ]
  },
  "wills-powers-of-attorney": {
    "title": "Wills & Powers of Attorney Lawyer in Riyadh",
    "description": "Legal services on wills and powers of attorney in Riyadh: drafting and documenting a will, setting the scope of a power of attorney and revoking it, and disputes over wills and powers.",
    "h1": "Wills and powers of attorney lawyer in Riyadh: drafting, documentation and disputes",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Wills and powers of attorney lawyer in Riyadh for drafting and documentation",
          "A will and a power of attorney are two short papers that can carry large consequences: distributing money after death, or authorising wide dealings in life. Vagueness or misuse usually leads to a dispute. We draft and document them clearly and handle disputes over them."
        ],
        "sections": [
          {
            "h": "When do you need this work?",
            "p": [
              "When you want to write or amend a will; when you need a power of attorney for a specific or general dealing; when you want to revoke a power; and when there is a dispute over a will or a suspicion that a power was misused."
            ]
          },
          {
            "h": "Our scope",
            "p": [
              "We draft and document wills, review existing wills, draft powers of attorney, their scope and their revocation, and handle disputes over wills and powers."
            ]
          },
          {
            "h": "The will",
            "p": [
              "We identify the purpose, the beneficiary and the subject of the bequest, draft the will consistently with the religious and legal rules, explain how to document it with the competent body, and its effect on the estate and its relation to the heirs' rights."
            ]
          },
          {
            "h": "The power of attorney",
            "p": [
              "The wider the power, the wider its risks. We set the authority, term and purpose precisely, and explain how to revoke it and notify the agent and the bodies concerned so its effects do not remain."
            ]
          },
          {
            "h": "Disputes",
            "p": [
              "We handle objections to a will, disputes over its interpretation and execution, and holding an agent to account where a power was misused, and prepare the necessary memoranda."
            ]
          },
          {
            "h": "What you receive",
            "p": [
              "Depending on scope: a will or a review of one, a power of attorney with defined authority, a revocation procedure, and a claim or response memorandum."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "Tell us the purpose and send the existing will or power if there is one. That is enough to set the drafting or the route."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/en/services/estates-inheritance",
        "label": "Estates & Inheritance"
      },
      {
        "href": "/blog/heirs-dispute-estate-division-saudi-arabia",
        "label": "When heirs disagree on dividing an estate (Arabic)"
      },
      {
        "href": "/en/individuals",
        "label": "Services for individuals"
      },
      {
        "href": "/en/services/personal-status",
        "label": "Personal Status"
      }
    ]
  },
  "cyber-crime": {
    "title": "Cybercrime Lawyer in Riyadh | Complaints & Defense",
    "description": "Legal representation in cybercrime in Riyadh: complaints about blackmail, defamation, electronic fraud and hacking, defense when accused, and preserving digital evidence.",
    "h1": "Cybercrime lawyer in Riyadh: complaint, defense and digital evidence",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Cybercrime, defamation and blackmail lawyer in Riyadh for victims and the accused",
          "A cybercrime is committed in minutes and leaves a digital trace that can disappear quickly. So the route depends on speed and on how well evidence is preserved, whether you are the victim of blackmail, defamation, hacking or fraud, or accused of a digital act. We represent either side as the case requires, and we serve organizations in hacking and leak incidents."
        ],
        "sections": [
          {
            "h": "Our scope",
            "p": [
              "We handle cybercrime complaints and defense: blackmail and online defamation, insult, electronic fraud, unauthorised access to accounts and systems, and the related claims for compensation."
            ]
          },
          {
            "h": "For the victim: what to do first",
            "p": [
              "Preserve the evidence before any step: screenshots of messages, accounts, links and dates. Do not delete chats or reply in a way that alters the evidence. We then assess the incident, decide where and how the complaint is made, follow it through, and may bring a claim for compensation."
            ]
          },
          {
            "h": "For the accused",
            "p": [
              "When you are summoned or accused of a digital act, we review what is alleged, the evidence and how it was obtained, prepare the defense, and represent you at investigation and before the court. Careful drafting of a reply can change how the incident is characterised."
            ]
          },
          {
            "h": "Digital evidence",
            "p": [
              "Proof rests on digital evidence: logs, data, images and messages. We help document evidence in a way that preserves its value, and challenge the other side's evidence where its source or integrity is flawed."
            ]
          },
          {
            "h": "Incidents at organizations",
            "p": [
              "On a breach or data leak we work with your technical team on containment, documentation and assessing the impact, identify notification duties, and bring the complaint against the perpetrator where known. Data protection has its own page."
            ]
          },
          {
            "h": "What you receive",
            "p": [
              "Depending on scope: documentation of the evidence, drafting and following a complaint, a defense memorandum, representation at investigation and trial, a claim for compensation, and a legal plan for an organization's incident."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "Send what evidence you have (images, links and dates) and a summary of the incident, and say whether you are the victim or the accused. Do not delete anything before we review it with you."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/en/services/criminal-defense",
        "label": "Criminal Defense"
      },
      {
        "href": "/services/personal-data-protection",
        "label": "Personal Data Protection (Arabic)"
      },
      {
        "href": "/en/individuals",
        "label": "Services for individuals"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes, Arbitration & Settlement"
      }
    ]
  },
  "insurance": {
    "title": "Insurance Lawyer in Riyadh | Policies & Claims",
    "description": "Legal services on insurance in Riyadh: reviewing policies, claims and exclusions, motor and medical cover, and disputes with insurers for policyholders and insurers.",
    "h1": "Insurance lawyer in Riyadh: policies, claims and disputes",
    "groups": [
      {
        "label": null,
        "intro": [
          "# Insurance lawyer in Riyadh for policyholders, individuals and businesses",
          "An insurance policy is a conditional promise, and most disputes turn on the conditions: is the event covered, does an exclusion apply, was it notified on time, did the policyholder disclose all they had to? We serve policyholders, whether individuals or companies, in claiming their rights, and insurers and intermediaries in compliance and defense."
        ],
        "sections": [
          {
            "h": "Our scope",
            "p": [
              "We handle reviewing policies before purchase, claims and refused or reduced claims, motor and medical insurance disputes, and insurance in commercial and construction contracts."
            ]
          },
          {
            "h": "Reviewing the policy",
            "p": [
              "We review the scope of cover, exclusions, the excess, limits of compensation, notification conditions and the policyholder's duties. An ambiguous phrase in the policy can change the fate of a large claim."
            ]
          },
          {
            "h": "Claiming compensation",
            "p": [
              "When an event occurs we arrange notification and documentation as the policy requires and prepare the claim with its documents: the event, the loss, the technical report and the basis of cover. If the claim is refused or reduced, we analyse the reason and bring the objection or the claim."
            ]
          },
          {
            "h": "Exclusions, notification and disclosure",
            "p": [
              "Claims are most often refused for late notification, non-disclosure of a material fact when the policy was taken out, or an exclusion. We examine whether the exclusion really applies and whether the conditions to rely on it are met."
            ]
          },
          {
            "h": "Compulsory and medical insurance",
            "p": [
              "Motor and medical insurance carry mandatory rules and competent bodies. We serve those affected and organizations in claims under these types and in an organization's duty to insure its workers."
            ]
          },
          {
            "h": "What you receive",
            "p": [
              "Depending on scope: a report on the scope and exclusions of the policy, a claim prepared with its documents, a memorandum objecting to a refusal, negotiation with the insurer, and representation before the competent body."
            ]
          },
          {
            "h": "Next step",
            "p": [
              "Send the policy, what happened and whatever decision or correspondence came from the insurer. We can then tell whether there is a right and what is needed to prove it."
            ]
          }
        ]
      }
    ],
    "links": [
      {
        "href": "/en/services/traffic-accidents",
        "label": "Traffic Accidents & Compensation"
      },
      {
        "href": "/en/individuals",
        "label": "Services for individuals"
      },
      {
        "href": "/en/services/disputes-arbitration",
        "label": "Disputes, Arbitration & Settlement"
      },
      {
        "href": "/en/services/corporate-contracts",
        "label": "Corporate, Contracts & Transactions"
      }
    ]
  },
};

export const serviceExtraEn: Record<(typeof enServiceSlugs)[number], ServiceExtraEn> = {
  "corporate-contracts": {
    "mistakes": [
      {
        "t": "Relying on a ready-made template",
        "d": "A contract or partners' agreement copied from another company does not reflect your allocation of authority, funding and exit, so its gaps surface at the first disagreement."
      },
      {
        "t": "Letting reality diverge from the paper",
        "d": "The company is run by oral decisions and scattered messages while the documents say otherwise, which makes proof difficult in a dispute."
      },
      {
        "t": "Neglecting exit and deadlock",
        "d": "No provision for how a partner leaves, how a tied vote is resolved, or how a stake is valued, so a management disagreement turns into an ownership crisis."
      },
      {
        "t": "A contract with no path to performance",
        "d": "Payment, delivery, termination and notice terms are unclear, so no one knows what is sent, when, or to whom."
      }
    ],
    "process": [
      {
        "t": "Reading the documents and the reality",
        "d": "We match what was written with what actually happens in the company or the deal, and identify the gaps."
      },
      {
        "t": "Mapping options and risks",
        "d": "We show you what can be done and what follows from each option, in the language of decisions rather than the language of texts."
      },
      {
        "t": "Drafting or negotiating",
        "d": "We draft the document or negotiate its terms from a position built on what can be proved and enforced."
      },
      {
        "t": "Handover and follow-up",
        "d": "We hand over the document with a list of the obligations that follow and who is responsible for each."
      }
    ],
    "docs": [
      "Articles of association or constitutional documents",
      "Partners' agreements, if any",
      "Ownership and funding structure",
      "Shareholder or board resolutions",
      "Key contracts and their drafts",
      "Correspondence showing actual performance"
    ],
    "faq": [
      {
        "q": "Are the articles of association enough to govern the relationship between partners?",
        "a": "Usually not. The articles cover the basics; additional funding, deadlock, exit and non-competition need a detailed partners' agreement."
      },
      {
        "q": "When should I ask for a contract review?",
        "a": "Before signing. Amending a clause before signature is far cheaper and easier than negotiating it after a dispute has arisen."
      },
      {
        "q": "Do you handle the negotiation with the other side?",
        "a": "Yes, we lead or join the negotiation and build our position on what can be proved and enforced."
      }
    ]
  },
  "disputes-arbitration": {
    "mistakes": [
      {
        "t": "Sending a notice before reviewing the evidence",
        "d": "A notice sent in haste can limit your options or reveal your position before the file is complete."
      },
      {
        "t": "Filing without linking each claim to its proof",
        "d": "A claim with no clear document behind it weakens the whole file, however strong the right."
      },
      {
        "t": "Relying on oral agreements",
        "d": "Calls and unrecorded promises are hard to prove; they are best fixed in a written message."
      },
      {
        "t": "Overlooking the arbitration clause",
        "d": "Where an arbitration agreement exists, a claim may be filed before an incompetent forum, wasting time and cost."
      }
    ],
    "process": [
      {
        "t": "Initial assessment of the file",
        "d": "We examine the contract, amounts, periods and correspondence and identify strengths and weaknesses."
      },
      {
        "t": "Evidence schedule",
        "d": "We link each fact to its proof and test what it shows."
      },
      {
        "t": "Choosing the path",
        "d": "We compare negotiation, litigation and arbitration against the relief sought and enforceability."
      },
      {
        "t": "Advocacy and managing hearings",
        "d": "We frame the claims, order the facts and answer the opponent's defence with focus."
      },
      {
        "t": "After the decision",
        "d": "We decide between challenge, enforcement and settlement according to what was issued."
      }
    ],
    "docs": [
      "The contract and its annexes",
      "Purchase orders and invoices",
      "Correspondence and emails",
      "Account statements and transfers",
      "Notices and the replies to them",
      "The arbitration agreement, if any"
    ],
    "faq": [
      {
        "q": "Should I start with settlement or with a claim?",
        "a": "It depends on the strength of the evidence, the relief sought, the time limits and the risks of delay. We assess the file first and then propose the path."
      },
      {
        "q": "What is the difference between the courts and arbitration?",
        "a": "In arbitration the parties agree on the forum, rules, seat and language, and it is often valued for confidentiality and speed of decision. The courts have the statutory levels of appeal. The choice is best made in the contract in advance."
      },
      {
        "q": "Can a judgment be enforced once it is issued?",
        "a": "Yes, once it has become enforceable; the enforcement steps differ according to the nature of the judgment and the assets."
      }
    ]
  },
  "mergers-acquisitions": {
    "mistakes": [
      {
        "t": "A vague memorandum of understanding",
        "d": "Not specifying what is binding and what is mere intent opens the door to a dispute before the deal even starts."
      },
      {
        "t": "Due diligence without measuring the impact",
        "d": "A list of documents is not enough; what matters is knowing the effect of each finding on price and protections."
      },
      {
        "t": "Separating the review from the agreement",
        "d": "The results of due diligence must be reflected in the warranties, indemnities and conditions to closing."
      },
      {
        "t": "No one responsible after closing",
        "d": "Post-closing obligations are forgotten unless each is assigned to a person and a deadline."
      }
    ],
    "process": [
      {
        "t": "The preliminary agreement",
        "d": "We draft the memorandum of understanding or letter of intent within their proper limits."
      },
      {
        "t": "Due diligence",
        "d": "We examine the legal side of the target and measure the effect of what we find."
      },
      {
        "t": "The agreement and negotiation",
        "d": "We draft the purchase agreement and protections and negotiate on price and risk."
      },
      {
        "t": "Closing",
        "d": "We use a closing checklist showing who does what and when."
      },
      {
        "t": "After closing",
        "d": "We follow the later obligations until they are complete."
      }
    ],
    "docs": [
      "Constitutional documents and the register of owners",
      "Key contracts",
      "Licences and registers",
      "Pending cases and claims",
      "Financial information to the extent the legal review requires"
    ],
    "faq": [
      {
        "q": "What is the difference between buying shares and buying assets?",
        "a": "A share purchase transfers the company with its rights and liabilities; an asset purchase transfers only what is expressly identified. Each has different effects on liabilities and approvals."
      },
      {
        "q": "How long does due diligence take?",
        "a": "It varies with the size of the company and how ready the documents are. We set its scope and duration at the start of the work."
      },
      {
        "q": "Does your service cover drafting or only the review?",
        "a": "Both, because the results of the review are translated into clauses of the agreement."
      }
    ]
  },
  "compliance-governance": {
    "mistakes": [
      {
        "t": "Written policies nobody knows",
        "d": "A policy the employee does not know and that is not applied does not protect the business and may even be used against it."
      },
      {
        "t": "Copying ready-made policies",
        "d": "A policy that does not fit the activity and size adds a burden without real control."
      },
      {
        "t": "No register of authority and conflicts",
        "d": "When it is not recorded who holds signing authority and who declared an interest, the decision is hard to defend later."
      },
      {
        "t": "Compliance as a one-off project",
        "d": "Obligations change with the activity and the laws, and need periodic review."
      }
    ],
    "process": [
      {
        "t": "The map of obligations",
        "d": "We identify the obligations that actually apply to your activity and size."
      },
      {
        "t": "Identifying the gaps",
        "d": "We compare actual practice with what is required."
      },
      {
        "t": "Policies and authority",
        "d": "We draft policies and procedures that can be applied, and a clear authority matrix."
      },
      {
        "t": "Training and documentation",
        "d": "We help move the policy into practice and document it."
      },
      {
        "t": "Periodic review",
        "d": "We review what has changed and update what is needed."
      }
    ],
    "docs": [
      "The organisational structure",
      "Existing internal regulations and policies",
      "Licences and registers",
      "Key third-party contracts",
      "The register of authority and delegations"
    ],
    "faq": [
      {
        "q": "Does every company need governance?",
        "a": "Yes, in varying degrees depending on size and ownership. The aim is for authority and responsibilities to be clear and documented."
      },
      {
        "q": "Do you prepare internal policies?",
        "a": "Yes, and we tie them to procedures that can be applied, not to theoretical texts."
      },
      {
        "q": "How do we start?",
        "a": "By identifying the activity, ownership and the main risks, then drawing the map of obligations."
      }
    ]
  },
  "bankruptcy-restructuring": {
    "mistakes": [
      {
        "t": "Waiting for the crisis to worsen",
        "d": "The later the advice, the narrower the legal and commercial options."
      },
      {
        "t": "Paying selected creditors",
        "d": "Preferring one creditor over another without assessing the effect may expose the company or its management to liability."
      },
      {
        "t": "Ignoring creditors' interests in the plan",
        "d": "A plan creditors will not accept will not be carried out, however tight it is on paper."
      },
      {
        "t": "Confusing temporary distress with permanent insolvency",
        "d": "The right path differs between a company that needs time and one that needs an orderly liquidation."
      }
    ],
    "process": [
      {
        "t": "Diagnosing the position",
        "d": "We read the financial and legal position: debts, security, contracts and cases."
      },
      {
        "t": "Comparing the paths",
        "d": "Amicable negotiation, settlement, reorganisation or liquidation, and the effect of each."
      },
      {
        "t": "Building the plan",
        "d": "We prepare the plan and documents in a form creditors will accept and that can be carried out."
      },
      {
        "t": "Negotiation and representation",
        "d": "We negotiate with creditors and represent you before the competent authority where needed."
      }
    ],
    "docs": [
      "A list of the debts, the creditors and their types",
      "The security provided",
      "Key contracts",
      "Pending cases and claims",
      "Recent financial statements"
    ],
    "faq": [
      {
        "q": "When should I consider the statutory path?",
        "a": "When an inability to pay appears or is expected soon. The earlier the move, the wider the options."
      },
      {
        "q": "Does reorganisation mean closing the company?",
        "a": "No. Its aim is usually to protect value and continue the business under a plan."
      },
      {
        "q": "Should I negotiate with creditors on my own?",
        "a": "You can, but organised negotiation backed by a documented plan is stronger and carries less risk."
      }
    ]
  },
  "foreign-investment": {
    "mistakes": [
      {
        "t": "Thinking registration is enough to start",
        "d": "Registration is one step; forming the entity and the sector licences are separate steps that may still be required."
      },
      {
        "t": "Choosing the structure before understanding the activity",
        "d": "The type of activity and the nature of the customers determine the right structure, not the reverse."
      },
      {
        "t": "Neglecting the agreement with the local partner",
        "d": "Having a partner without an agreement on authority, funding and exit brings the same problems back later."
      },
      {
        "t": "Delaying operational compliance",
        "d": "Employees, contracts, records and data carry obligations from day one of operation."
      }
    ],
    "process": [
      {
        "t": "Studying the activity and structure",
        "d": "We identify the entry structure that best suits your activity, partners and funding."
      },
      {
        "t": "Registration and formation",
        "d": "We put the procedures in the right sequence."
      },
      {
        "t": "Licences and approvals",
        "d": "We identify the authorities and requirements according to the activity."
      },
      {
        "t": "Contracts and employment",
        "d": "We draft the core contracts and arrange the contractual side of operation."
      },
      {
        "t": "The launch checklist",
        "d": "We hand you a list of the procedures and documents to follow after formation."
      }
    ],
    "docs": [
      "Description of the proposed activity",
      "The proposed ownership structure",
      "Investor details",
      "Parent-company documents, if any",
      "The funding plan"
    ],
    "faq": [
      {
        "q": "Do I need a Saudi partner?",
        "a": "It depends on the activity and the chosen structure, and we determine it when we study the case."
      },
      {
        "q": "How long does entering the market take?",
        "a": "It varies with the activity, the licences and how ready the documents are. We set an estimated timetable after studying the case."
      },
      {
        "q": "Do you follow up the licences?",
        "a": "We prepare a list of authorities and procedures and follow up with you what is needed."
      }
    ]
  },
  "enforcement-recovery": {
    "mistakes": [
      {
        "t": "Delaying the demand",
        "d": "Time weakens evidence and may extinguish the right; documentation is best begun at the first late payment."
      },
      {
        "t": "A demand without clear proof of the debt",
        "d": "A debt not proved by a document or an authenticated message is hard to collect however valid it is."
      },
      {
        "t": "Relying on oral deadlines",
        "d": "Unrecorded promises to pay are not an admission you can build on."
      },
      {
        "t": "Enforcing without mapping assets",
        "d": "A judgment without knowing the debtor's assets may not produce actual recovery."
      }
    ],
    "process": [
      {
        "t": "Documenting the debt and checking the instrument",
        "d": "We review the documents and identify what can be proved and the source of the obligation."
      },
      {
        "t": "Notice and amicable demand",
        "d": "We send a written demand that opens the door to settlement or establishes formal notice."
      },
      {
        "t": "The legal procedure",
        "d": "If settlement fails, we choose the procedure that suits the nature of the instrument."
      },
      {
        "t": "Enforcement",
        "d": "We follow enforcement against the debtor's assets until recovery is achieved."
      },
      {
        "t": "Payment settlement",
        "d": "When a rescheduling is agreed, we secure it so it can be enforced if it fails."
      }
    ],
    "docs": [
      "The contract and its annexes",
      "Invoices and delivery receipts",
      "Correspondence",
      "The account statement",
      "Cheques or commercial paper",
      "Any admission of the debt"
    ],
    "faq": [
      {
        "q": "Can a debt be recovered without a claim?",
        "a": "Sometimes through an amicable demand and settlement; otherwise through the appropriate legal procedure."
      },
      {
        "q": "What are the strongest documents to prove a debt?",
        "a": "A clear instrument showing the amount and date, then invoices and correspondence supported by an admission."
      },
      {
        "q": "Do you follow enforcement after judgment?",
        "a": "Yes, enforcement is part of the work and not a separate step."
      }
    ]
  },
  "legal-advisory": {
    "mistakes": [
      {
        "t": "Going to a lawyer after the problem occurs",
        "d": "Review before the decision is cheaper and less risky than remedying after it."
      },
      {
        "t": "Spreading advice across several firms",
        "d": "Institutional memory is lost and it is hard to track what was advised and why."
      },
      {
        "t": "Signing contracts without review",
        "d": "Small recurring contracts may carry large obligations that are noticed only at a dispute."
      },
      {
        "t": "Not documenting internal legal decisions",
        "d": "A sound decision with no record is hard to prove and defend later."
      }
    ],
    "process": [
      {
        "t": "Getting to know your business",
        "d": "We understand your work, contracts, structure and main risks."
      },
      {
        "t": "Defining scope and response times",
        "d": "We agree what the work covers, response times and the engagement model."
      },
      {
        "t": "A clear channel of contact",
        "d": "A designated point of contact for your day-to-day requests."
      },
      {
        "t": "Reports and escalation",
        "d": "Periodic summaries, and escalation of major matters before they worsen."
      }
    ],
    "docs": [
      "The company's key contracts",
      "Internal policies and regulations",
      "The organisational structure",
      "Employee files to the extent needed",
      "Pending cases and claims"
    ],
    "faq": [
      {
        "q": "When does an outsourced legal counsel suit?",
        "a": "When the volume of work does not justify a full legal department but the legal need is recurrent."
      },
      {
        "q": "How are fees set?",
        "a": "By prior agreement on the scope and the engagement model, confirmed in writing."
      },
      {
        "q": "What about confidentiality and conflicts of interest?",
        "a": "We check for conflicts before accepting any instruction, and what you disclose to us remains confidential."
      }
    ]
  },
  "employment-labor": {
    "mistakes": [
      {
        "t": "An employment contract that does not match reality",
        "d": "Terms that do not reflect what actually happens make proof difficult in a dispute, whether you are a worker or an employer."
      },
      {
        "t": "Signing a release without reading it",
        "d": "A release containing a general waiver may give up rights not yet counted, and its effect is only felt when someone tries to go back on it."
      },
      {
        "t": "Dismissal without a documented investigation",
        "d": "Ending the relationship without proper procedure may turn it into termination without a legitimate reason."
      },
      {
        "t": "An internal regulation that was never approved",
        "d": "Penalties applied without a regulation made available to staff are open to challenge."
      },
      {
        "t": "Incomplete records of entitlements",
        "d": "Lacking proof that entitlements were paid weakens the position however sound the right."
      }
    ],
    "process": [
      {
        "t": "Review the current position",
        "d": "We examine the contract, regulation, records and decisions issued."
      },
      {
        "t": "Set out the options",
        "d": "We explain the options and what follows from each."
      },
      {
        "t": "Draft or act",
        "d": "We draft the contract or prepare the claim, or the termination and investigation."
      },
      {
        "t": "Settlement or claim",
        "d": "We represent you in settlement or before the labor court."
      }
    ],
    "docs": [
      "The employment contract and its annexes",
      "The work regulation, if any",
      "Salary statements and entitlements",
      "The termination or penalty decision and any warnings",
      "Correspondence about the claim"
    ],
    "faq": [
      {
        "q": "Do you act for workers or for employers?",
        "a": "For both, though not for both sides of the same matter; we check for conflicts of interest before accepting any engagement."
      },
      {
        "q": "What is the first step on receiving a termination decision?",
        "a": "Ask for the decision in writing, keep the contract, statements and correspondence, and do not sign a release before it has been reviewed."
      },
      {
        "q": "Does my organization need a work regulation?",
        "a": "The rules apply to organizations depending on their circumstances, and the regulation is the basis for disciplinary penalties. We review your organization's position."
      },
      {
        "q": "Can an employment contract be changed by one party alone?",
        "a": "It depends on the type of change. Some material changes need the other party's consent, and we review the intended change before it is applied."
      }
    ]
  },
  "criminal-defense": {
    "mistakes": [
      {
        "t": "Giving statements before understanding the position",
        "d": "What is said at the inquiry and investigation stays in the file and is hard to change later."
      },
      {
        "t": "Signing a record that was not read carefully",
        "d": "A signature confirms the record, so it must be read in full and anything that does not match what you said must be corrected."
      },
      {
        "t": "Missing time limits",
        "d": "Challenges to judgments have statutory periods, and missing them narrows the options."
      },
      {
        "t": "Withholding facts from the lawyer",
        "d": "A defense is built on what the lawyer knows; undisclosed facts may surface in the file and surprise everyone."
      },
      {
        "t": "Relying on what others say about how a case will end",
        "d": "Each case has its own file and evidence, and what happened in one case is no yardstick for another."
      }
    ],
    "process": [
      {
        "t": "Listen and read the file",
        "d": "We understand the facts and read the papers issued."
      },
      {
        "t": "Assess the position",
        "d": "We explain the likely legal characterisation, the options and the risks."
      },
      {
        "t": "Defend",
        "d": "We attend the procedures, prepare defenses and memoranda, and plead."
      },
      {
        "t": "Challenge and follow up",
        "d": "We study the judgment, prepare the appeal and follow what comes after."
      }
    ],
    "docs": [
      "The summons, notice or statement of claim",
      "The inquiry or investigation record, if any",
      "Decisions and judgments issued",
      "Correspondence and documents connected with the act",
      "Your identification and contact details"
    ],
    "faq": [
      {
        "q": "Do you handle specialised criminal matters?",
        "a": "Yes, including drug offences, driving under the influence of alcohol or drugs, assault, cybercrime and economic cases, some of which have their own page on this site."
      },
      {
        "q": "Can I consult you before going to an investigation?",
        "a": "Yes, and it is better to do so: we read the summons and explain what is needed before you attend."
      },
      {
        "q": "Do you promise a particular outcome?",
        "a": "No. The outcome of a case depends on its facts, evidence and the law. We assess the position frankly and manage the procedures diligently."
      },
      {
        "q": "Is what I tell you kept confidential?",
        "a": "Yes. Confidentiality of what you tell us is a principle of our work, and it is shared only as far as professional need requires."
      }
    ]
  },
  "estates-inheritance": {
    "mistakes": [
      {
        "t": "Dealing with estate property before division",
        "d": "Any dealing without the consent of the other heirs or the permission of the competent authority can open a new dispute."
      },
      {
        "t": "Withholding asset documents",
        "d": "Keeping title deeds or accounts from the other heirs deepens the disagreement and prolongs it."
      },
      {
        "t": "Signing a waiver without understanding its effect",
        "d": "Waiving a share or a right may be final, so its effect must be understood before signing."
      },
      {
        "t": "Leaving assets without an agreed manager",
        "d": "A rented property or a running company needs someone to manage it during the dispute, or everyone loses."
      },
      {
        "t": "Overlooking the estate's obligations",
        "d": "The deceased's debts and third-party rights are part of the estate, and overlooking them disrupts the division."
      }
    ],
    "process": [
      {
        "t": "Identify",
        "d": "We determine the heirs and the estate's assets and obligations."
      },
      {
        "t": "Choose the route",
        "d": "We weigh with the heirs the cost of amicable and judicial division and what the assets call for."
      },
      {
        "t": "Agreement or claim",
        "d": "We draft the division agreement or prepare the claim and response."
      },
      {
        "t": "Enforcement",
        "d": "We follow the division and transfer of assets through to completion."
      }
    ],
    "docs": [
      "What shows the death and the kinship",
      "Title deeds and documents connected with the assets",
      "Account statements and known debts and obligations",
      "Company and share documents, if any",
      "Any agreement or correspondence between the heirs"
    ],
    "faq": [
      {
        "q": "Can I sell my share before division?",
        "a": "It depends on the nature of the asset and the rights of the other heirs, and the position is reviewed before any step."
      },
      {
        "q": "What if one of the heirs is a minor?",
        "a": "Special rules on guardianship and permission apply, and division or dealing with the share cannot proceed without meeting them."
      },
      {
        "q": "How long does division take?",
        "a": "It varies with the agreement reached and the complexity of the assets."
      },
      {
        "q": "Do you handle estates that include companies?",
        "a": "Yes, and we consider the management of the company during the dispute and the link between the estate and the company's constitution and its partners."
      }
    ]
  },
  "personal-status": {
    "mistakes": [
      {
        "t": "An oral agreement on a core matter",
        "d": "An unwritten agreement on maintenance, custody or visitation is hard to prove in a dispute."
      },
      {
        "t": "Signing a waiver or acknowledgment before understanding its effect",
        "d": "It may have a lasting effect, so it should be reviewed before signing."
      },
      {
        "t": "Drawing children into the dispute",
        "d": "It harms the children first and does not help anyone's legal position."
      },
      {
        "t": "Neglecting documents and correspondence",
        "d": "Documents and correspondence are what proof is later built on."
      },
      {
        "t": "Delaying advice",
        "d": "Some matters become harder with delay, and many are settled by early agreement."
      }
    ],
    "process": [
      {
        "t": "Listen and understand",
        "d": "We understand the facts, your goal and your priorities."
      },
      {
        "t": "Assess the route",
        "d": "We explain settlement and claim, and what follows from each."
      },
      {
        "t": "Draft or file",
        "d": "We draft the settlement agreement or prepare the claim and response."
      },
      {
        "t": "Enforce and follow up",
        "d": "We follow enforcement of the agreement or judgment."
      }
    ],
    "docs": [
      "The marriage contract and related papers",
      "Earlier judgments or agreements",
      "Documents and identification for the children",
      "Correspondence connected with the matter",
      "Any documents on maintenance or income"
    ],
    "faq": [
      {
        "q": "Do you handle all personal status matters?",
        "a": "Yes. We advise and represent in family matters and their disputes, and assess each case on its facts."
      },
      {
        "q": "Can the matter be resolved without a claim?",
        "a": "That may be possible through amicable settlement and a written agreement."
      },
      {
        "q": "Are family matters treated confidentially?",
        "a": "Yes. Confidentiality of what you tell us is a principle of our work."
      },
      {
        "q": "What should I bring to the first meeting?",
        "a": "The documents connected with the matter, with the sequence of facts as you know them."
      }
    ]
  },
  "negotiable-instruments-debts": {
    "mistakes": [
      {
        "t": "Delay in claiming",
        "d": "Time can weaken the position and make the debtor and their assets harder to trace, so review the case early."
      },
      {
        "t": "Relying on oral promises to pay",
        "d": "An oral promise proves nothing; a written acknowledgment or documented agreement is better."
      },
      {
        "t": "Losing or marking the original",
        "d": "The original cheque or note is the document of the right; keep it and do not write on it."
      },
      {
        "t": "Accepting rescheduling without careful drafting",
        "d": "Rescheduling with no clear terms does not say what follows a missed instalment."
      },
      {
        "t": "Using one approach for every debt",
        "d": "Each document has its own route; what works for an instrument may not work for a debt evidenced by a contract or messages."
      }
    ],
    "process": [
      {
        "t": "Read the documents",
        "d": "We examine the instrument and what evidences the debt."
      },
      {
        "t": "Choose the route",
        "d": "Amicable demand, claim or enforcement depending on the document."
      },
      {
        "t": "Act",
        "d": "We prepare and follow the warning, claim or objection."
      },
      {
        "t": "Enforce or settle",
        "d": "We follow recovery or document the settlement."
      }
    ],
    "docs": [
      "The original cheque, promissory note or bill of exchange",
      "The contract, invoices or statements connected to the debt",
      "Correspondence and acknowledgments",
      "What you know of the debtor and their assets",
      "Any earlier claim or decision"
    ],
    "faq": [
      {
        "q": "Do you act for creditors and for debtors?",
        "a": "Yes, though not for both sides of the same debt; we check for conflicts of interest before accepting."
      },
      {
        "q": "Do I need the original?",
        "a": "Usually the original is the document of the right, so keep it safe and bring it with you."
      },
      {
        "q": "Can it be settled without a claim?",
        "a": "Often, through a warning and a documented agreement, and we assess that case by case."
      },
      {
        "q": "Do you guarantee recovery of the debt?",
        "a": "No. Recovery depends on the documents and on the debtor's capacity, and we assess that frankly before we start."
      }
    ]
  },
  "leases-eviction": {
    "mistakes": [
      {
        "t": "An unwritten or undocumented lease",
        "d": "Rent, term and conditions are hard to prove in a dispute."
      },
      {
        "t": "Accepting rent without a receipt",
        "d": "Lack of proof of payment or receipt opens an avoidable dispute."
      },
      {
        "t": "Tolerating late payment with no warning",
        "d": "Undocumented tolerance can weaken the landlord's later claim."
      },
      {
        "t": "Leaving maintenance requests unwritten",
        "d": "A written request proves the other side knew."
      },
      {
        "t": "Evicting outside the legal route",
        "d": "Forcing eviction without proper procedure can open a new dispute and bring liability on whoever did it."
      }
    ],
    "process": [
      {
        "t": "Review the contract and facts",
        "d": "We read the lease, correspondence and receipts."
      },
      {
        "t": "Set out the options",
        "d": "Settlement, warning or claim."
      },
      {
        "t": "Act",
        "d": "We prepare the warning, claim or response."
      },
      {
        "t": "Enforce",
        "d": "We follow eviction or recovery."
      }
    ],
    "docs": [
      "The lease and its annexes",
      "Rent receipts and account statements",
      "Warnings and correspondence",
      "The title deed or what shows the landlord's capacity",
      "Photographs of the condition of the premises"
    ],
    "faq": [
      {
        "q": "Do you act for landlords and tenants?",
        "a": "Yes, though not for both sides of the same tenancy; we check for conflicts of interest before accepting."
      },
      {
        "q": "What should I do when a tenant is late?",
        "a": "We start with documentation and a warning, then assess a claim or eviction according to the contract."
      },
      {
        "q": "Can a landlord evict directly?",
        "a": "Eviction has a legal route, and we advise against any other."
      },
      {
        "q": "How do I recover the deposit?",
        "a": "Under the contract and the condition of the premises at handover; we review this and manage the claim."
      }
    ]
  },
  "property-disputes": {
    "mistakes": [
      {
        "t": "Paying before checking the title",
        "d": "Early payments without verifying ownership expose the buyer to risks that are hard to cure."
      },
      {
        "t": "A sale contract with no clear date of transfer",
        "d": "Without a date and the effect of delay, the buyer has no leverage when transfer is late."
      },
      {
        "t": "Relying on oral promises",
        "d": "A promise to transfer or that the property is free of obligations must be in writing."
      },
      {
        "t": "Overlooking a mortgage or restriction",
        "d": "It may prevent transfer or change the value of the deal."
      },
      {
        "t": "Delay in objecting to a defect",
        "d": "A defect not reported in time may weaken the claim."
      }
    ],
    "process": [
      {
        "t": "Check and read",
        "d": "We read the deed, the contract and correspondence."
      },
      {
        "t": "Choose the route",
        "d": "Settlement, warning or claim."
      },
      {
        "t": "Draft or act",
        "d": "We draft the contract or prepare the claim and response."
      },
      {
        "t": "Enforce",
        "d": "We follow transfer or enforcement of the judgment."
      }
    ],
    "docs": [
      "The title deed or what shows ownership",
      "The sale contract or draft and its annexes",
      "Payment receipts and transfers",
      "Correspondence with the other side",
      "Plans or technical reports, if any"
    ],
    "faq": [
      {
        "q": "Should I check the property before paying a deposit?",
        "a": "Preferably yes; an early check reveals the deed and any restrictions before you commit."
      },
      {
        "q": "What if the seller refuses to transfer?",
        "a": "We assess the contract and facts and propose a demand to complete or rescission with compensation."
      },
      {
        "q": "Do you handle property contracts for companies?",
        "a": "Yes, and the real estate and construction work for companies has its own page."
      },
      {
        "q": "Can the dispute be resolved without a claim?",
        "a": "Often, by written settlement, and we assess each case."
      }
    ]
  },
  "traffic-accidents": {
    "mistakes": [
      {
        "t": "Signing an acknowledgment or waiver early",
        "d": "It may limit the right to claim later."
      },
      {
        "t": "Not documenting the injury and treatment",
        "d": "Medical reports are the basis for assessing compensation."
      },
      {
        "t": "Repairing the vehicle before documenting",
        "d": "It can lose evidence of the damage."
      },
      {
        "t": "Delay in objecting to a violation",
        "d": "Objections have statutory periods, and missing them loses the chance."
      },
      {
        "t": "Accepting compensation without understanding its elements",
        "d": "It may be less than you are owed, so review it before accepting."
      }
    ],
    "process": [
      {
        "t": "Gather the evidence",
        "d": "We organise the report, photographs and medical reports."
      },
      {
        "t": "Assess responsibility and rights",
        "d": "We explain your position and the heads of compensation."
      },
      {
        "t": "Claim",
        "d": "Against the other party or the insurer or before the competent body."
      },
      {
        "t": "Follow up",
        "d": "We follow recovery or the objection."
      }
    ],
    "docs": [
      "The accident report",
      "Photographs of the accident and vehicles",
      "Medical reports and invoices",
      "The insurance policy",
      "The violation or traffic notice, if any"
    ],
    "faq": [
      {
        "q": "What should I do after an accident?",
        "a": "Keep the report, photographs and witness details, document the injury, and do not sign an acknowledgment before review."
      },
      {
        "q": "Can I claim compensation for an injury?",
        "a": "You may have a right depending on responsibility and evidence, and we assess it after reading the file."
      },
      {
        "q": "Do you handle objections to violations?",
        "a": "Yes, according to the route and periods the law sets."
      },
      {
        "q": "What if the insurer refuses?",
        "a": "We review the policy and the reason for refusal and assess an objection or a claim."
      }
    ]
  },
  "fraud-breach-of-trust": {
    "mistakes": [
      {
        "t": "Deleting chats or receipts",
        "d": "They are the basis of proof, and deleting them may lose the right."
      },
      {
        "t": "Handing over money with no document",
        "d": "An oral handover makes it hard to prove the trust and its purpose."
      },
      {
        "t": "Contacting the other side in a way that harms the evidence",
        "d": "Messages may be used against you or change the characterisation."
      },
      {
        "t": "Choosing the route before characterising the incident",
        "d": "A complaint in the wrong place or a claim at the wrong time wastes time."
      },
      {
        "t": "Accepting a settlement without careful drafting",
        "d": "It may waive the right or leave an effect that only appears later."
      }
    ],
    "process": [
      {
        "t": "Read the incident",
        "d": "We understand the facts and review the evidence."
      },
      {
        "t": "Characterise it",
        "d": "We determine whether it is a crime or a civil dispute."
      },
      {
        "t": "Act",
        "d": "Complaint, defense or claim."
      },
      {
        "t": "Follow up",
        "d": "We follow the investigation, claim or recovery."
      }
    ],
    "docs": [
      "Transfers and account statements",
      "Contracts or powers of attorney",
      "Correspondence and chats",
      "Any notice or summons",
      "The sequence of facts with dates"
    ],
    "faq": [
      {
        "q": "Do you act for victims and for the accused?",
        "a": "Yes, though not for both sides of the same incident."
      },
      {
        "q": "Should I file a criminal complaint or a civil claim?",
        "a": "It depends on how the incident is characterised, which we assess after reading the evidence."
      },
      {
        "q": "Do you guarantee recovery of the money?",
        "a": "No. The outcome depends on the evidence and the facts."
      },
      {
        "q": "Can I settle?",
        "a": "The law may allow settlement or waiver in some cases, and we explain what applies to yours."
      }
    ]
  },
  "administrative-grievances": {
    "mistakes": [
      {
        "t": "Delay in bringing the decision",
        "d": "The statutory periods for a grievance or claim may run out."
      },
      {
        "t": "Not recording the date of notification",
        "d": "Periods on which the right may depend run from that date."
      },
      {
        "t": "Writing to the body without keeping the correspondence",
        "d": "The correspondence is part of the proof."
      },
      {
        "t": "A general objection",
        "d": "An objection must identify the decision and why it is unlawful."
      },
      {
        "t": "Skipping a required grievance before the claim",
        "d": "It may expose the claim to dismissal on form."
      }
    ],
    "process": [
      {
        "t": "Read the decision",
        "d": "We understand it, its reasons and the date it was notified."
      },
      {
        "t": "Choose the route",
        "d": "Grievance, claim or settlement."
      },
      {
        "t": "Draft",
        "d": "We prepare the grievance or claim."
      },
      {
        "t": "Follow up",
        "d": "We follow before the body and the court."
      }
    ],
    "docs": [
      "The administrative decision under challenge",
      "What shows the date of notification",
      "The earlier request and correspondence",
      "The contract or licence connected to the matter",
      "Any earlier grievance"
    ],
    "faq": [
      {
        "q": "Do I file a grievance with the body before a claim?",
        "a": "In many cases it is required, and we explain what applies to yours."
      },
      {
        "q": "Do you handle disputes of government employees?",
        "a": "Yes, depending on the type of decision and its route."
      },
      {
        "q": "Do you serve organizations too?",
        "a": "Yes; organizations deal with administrative decisions such as licences and penalties, and have other services on this site."
      },
      {
        "q": "What matters most after I am notified of the decision?",
        "a": "Keep the decision and the date you were notified and bring it to us quickly."
      }
    ]
  },
  "wills-powers-of-attorney": {
    "mistakes": [
      {
        "t": "A general, unspecific will",
        "d": "Vagueness about what is left or to whom opens a dispute."
      },
      {
        "t": "A general power of attorney with no time limit",
        "d": "It may remain in force after the need has gone."
      },
      {
        "t": "Not notifying the agent and bodies of revocation",
        "d": "The agent may still be able to act."
      },
      {
        "t": "A will that ignores the heirs' rights",
        "d": "It may be challenged for breaching the rules."
      },
      {
        "t": "Keeping a single undocumented copy",
        "d": "The original may be lost or doubted."
      }
    ],
    "process": [
      {
        "t": "Understand the purpose",
        "d": "We establish what you want and what the law allows."
      },
      {
        "t": "Draft",
        "d": "We draft the will or power precisely."
      },
      {
        "t": "Document",
        "d": "We explain how to document it and follow it up."
      },
      {
        "t": "Review",
        "d": "We review it when circumstances change."
      }
    ],
    "docs": [
      "Your identification and related documents",
      "The existing will or power",
      "A statement of the assets or dealings intended",
      "Details of the beneficiary or agent",
      "Any existing dispute or correspondence"
    ],
    "faq": [
      {
        "q": "Must a will be documented?",
        "a": "Documentation makes it easier to prove and carry out, and we explain how according to the case."
      },
      {
        "q": "Can a will be amended?",
        "a": "Yes, according to the rules, and we review the effect of an amendment on the heirs."
      },
      {
        "q": "How do I revoke a power of attorney?",
        "a": "By a revocation procedure and notifying the agent and the bodies that deal with them under it."
      },
      {
        "q": "What if an agent misuses the power?",
        "a": "We assess the facts and explain the options from a claim to a complaint."
      }
    ]
  },
  "cyber-crime": {
    "mistakes": [
      {
        "t": "Deleting messages or accounts",
        "d": "It destroys the trace that proves the incident."
      },
      {
        "t": "Replying to a blackmailer or paying",
        "d": "It often prolongs the blackmail and may change the evidence."
      },
      {
        "t": "Screenshots with no dates or links",
        "d": "Evidence loses weight if its source and time are unclear."
      },
      {
        "t": "Delay in reporting",
        "d": "Accounts and records can disappear or be altered."
      },
      {
        "t": "Answering an accusation without reading it",
        "d": "A careless reply can change the characterisation of the incident."
      }
    ],
    "process": [
      {
        "t": "Preserve",
        "d": "We document the evidence in a form that holds up."
      },
      {
        "t": "Assess",
        "d": "We characterise the incident and choose the route."
      },
      {
        "t": "Act",
        "d": "Complaint, defense or claim."
      },
      {
        "t": "Follow up",
        "d": "We follow the investigation and the proceedings."
      }
    ],
    "docs": [
      "Images of messages, accounts and links with dates",
      "The account details involved",
      "Any summons or notice",
      "Transfers or related financial records",
      "A short account of the incident"
    ],
    "faq": [
      {
        "q": "I have been hacked. What is the first step?",
        "a": "Preserve digital evidence and do not tamper with devices or records, then seek quick legal advice before reporting."
      },
      {
        "q": "Can online blackmail be dealt with legally?",
        "a": "Yes, by reporting to the competent body and following the procedures with the evidence documented."
      },
      {
        "q": "Do you act for the accused too?",
        "a": "Yes, as the case requires, though never for both sides of the same incident."
      },
      {
        "q": "Do you handle defamation and insult?",
        "a": "Yes, whether bringing the complaint or defending against it."
      }
    ]
  },
  "insurance": {
    "mistakes": [
      {
        "t": "Buying a policy without reading the exclusions",
        "d": "The exclusions are where claims are most often lost."
      },
      {
        "t": "Late notification",
        "d": "Many policies require notice within a set time, and delay can be relied on against you."
      },
      {
        "t": "Incomplete disclosure when taking out the policy",
        "d": "Leaving out a material fact can give the insurer a ground for refusal."
      },
      {
        "t": "Accepting a refusal without examination",
        "d": "A refusal based on a general phrase may not stand."
      },
      {
        "t": "Settling before understanding the loss",
        "d": "A quick settlement may close a claim for less than it is worth."
      }
    ],
    "process": [
      {
        "t": "Read the policy",
        "d": "Scope, exclusions and conditions."
      },
      {
        "t": "Document the event",
        "d": "Notification, report and loss."
      },
      {
        "t": "Claim or object",
        "d": "A claim with its documents or an objection to the decision."
      },
      {
        "t": "Negotiate or proceed",
        "d": "Settlement with the insurer or a claim before the competent body."
      }
    ],
    "docs": [
      "The insurance policy and schedule",
      "What shows the event and the loss",
      "Reports (medical, technical, accident)",
      "Notices and the insurer's correspondence",
      "Invoices and supporting documents"
    ],
    "faq": [
      {
        "q": "What should I do if my insurance claim is refused?",
        "a": "We review the policy, the reason for refusal and the documents, then assess an objection or a claim."
      },
      {
        "q": "Should I review a policy before buying it?",
        "a": "Review reveals exclusions, limits of cover and notification conditions before they become a ground for dispute."
      },
      {
        "q": "Do you serve individuals and companies?",
        "a": "Yes, policyholders of both kinds, and insurers and intermediaries."
      },
      {
        "q": "Is insurance required in construction contracts?",
        "a": "Many contracts require it; we review its terms and its effect on liability."
      }
    ]
  },
};
