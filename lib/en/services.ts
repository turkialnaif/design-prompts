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
  }
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
  }
};
