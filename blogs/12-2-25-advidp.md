---
title: "Advanced Document Processing with LLMs and AWS: Modern IDP Patterns at Scale"
date: "2025-12-02T18:45:00Z"
slug: "advanced-document-processing-idp-modern-patterns"
description: "Notes from AWS re:Invent 2025: A deep dive into the evolution of intelligent document processing, multimodal extraction pipelines, and AWS-native orchestration patterns for high-assurance workflows."
tags: ["aws", "llm", "document-processing", "idp", "bedrock", "nova", "step-functions", "AWS re:Invent"]
---

# Advanced Document Processing with LLMs and AWS

## TLDR
- IDP has evolved from manual OCR workflows to LLM-centric, multimodal extraction systems.
- Modern pipelines rely on per-page processing, orchestration layers, and deterministic merging for reliability.
- AWS Step Functions excel as an agent control plane for large, complex, unbounded documents.
- Contract processing follows a repeatable conceptual flow: classification → summarization → extraction → validation.
- Always use a **separate** LLM as a judge model; skipping this step introduces major quality and bias risks.
- Continuous improvement spans RAG, alignment, fine-tuning, and domain-specific pretraining.

Intelligent Document Processing (IDP) has quietly undergone one of the most dramatic evolutions in enterprise AI. What started as manual data entry and brittle OCR templates has turned into highly scalable, multimodal, LLM-powered workflows capable of handling complex, heterogeneous, and high-risk document streams—like those found in banking and large financial institutions.

This session offered one of the clearer, more pragmatic looks at how AWS customers are modernizing IDP, the architectural patterns that work at scale, and where LLMs are an accelerator rather than a silver bullet.

## The Evolution of IDP: From Manual Work to Generative AI
A key slide walked through the timeline of IDP techniques from the 1990s onward. Each decade introduced new automation layers, but the breakthrough moment arrived with modern LLMs.

### 1990s  
- **Document classification:** Manual  
- **Data extraction:** Manual  
- **Document understanding:** Manual  
- **Comparison:** Basic text diff  
- **Contact review:** Manual  

### 2000s  
- Heuristic classification  
- Templated OCR  
- Keyword extraction  
- Text diff for comparisons  
- Keyword search for reviews  

### 2010s  
- SVM, RCF, ML-enhanced OCR  
- Rule-based NLP  
- Semantic similarity  
- ML clause extraction  

### 2020s  
- CNN & BERT for classification  
- Deep learning–based extraction  
- Transformer-based understanding and comparison  

### 2023 and beyond  
- LLMs for classification, understanding, and comparison  
- LLMs + advanced CV for extraction  
- LLMs + RAG for complex reasoning  
- Generative AI as a core IDP capability  

Across all categories, a clear progression emerges:  
**Manual → Automation → Machine Learning → Generative AI**

The shift wasn’t just about accuracy—it was about *accessibility*. LLMs unlocked workflows teams could actually build without multi-year ML investments.

## Why LLM + RAG Became the Dominant Pattern
The presenters echoed a theme common across many AI sessions: even if specialized extraction tools can outperform in certain narrow tasks, the **velocity**, **accessibility**, and **ease of iteration** with LLMs outweigh the marginal accuracy differences.

Teams adopt LLMs because:

- They can start fast.  
- They don’t need rigid document templates.  
- They can improve incrementally with grounding, examples, and guardrails.  

Especially in domains like finance, where document formats are effectively unbounded, the agility advantage is enormous.

## A Real-World Banking Scenario
The session centered on a banking use case with:

- Dozens of document types  
- Highly inconsistent formatting  
- Mixed handwriting, tables, and embedded images  
- Regulatory and audit pressures  
- Large, multi-hundred-page PDFs  

Traditional OCR-based solutions struggled because they assumed a predictable structure. LLM-based multimodal pipelines, by contrast, were able to reason about each page in context.

## Step Functions as the Agent Control Plane
AWS used **Step Functions** as the orchestration backbone—a pattern they’ve now seen across many customer IDP deployments.

Why Step Functions?

- Native ability to handle fan-out/fan-in workflows  
- Easy integration with Bedrock, Lambda, S3, and Textract  
- Deterministic control over retries, branching, validation, and error handling  
- A natural “agent runtime” that avoids non-deterministic agent loop behavior  

A particularly useful pattern:  
**an iterator function manages model context windows**, chunking large documents cleanly into page-level operations.

## Per-Page Multimodal Processing: A Critical Design Choice
The presenters stressed this repeatedly:  
**Always process documents at the page level using the source images—not extracted text.**

Why?

- Text-only extraction loses layout, signals, and multimodal cues.  
- Page-level isolation prevents runaway context window issues.  
- Failures become diagnosable (one page breaks, not the whole document).  
- Fragment merging can be deterministic and auditable.  

This is fully aligned with best-practice IDP architectures:  
**process locally, merge globally.**

## The Conceptual Flow for Contract Processing
Across contracts and other structured documents, AWS outlined a repeatable logical flow:

1. **Orchestration** (Step Functions coordinating all steps)
2. **Contract Type Classification**  
3. **Contract Purpose Summarization**  
4. **Contract Insights / Information Extraction**  
5. **Process Validation** (LLM as a judge)  
6. **Continuous Improvement / Model Tuning**  

This model mirrors the extraction lifecycle many enterprise teams already follow, but with improved structure and more effective use of LLMs.

## Summarizing Contract Purpose with Nova Lite
For summarization tasks, AWS selected **Amazon Nova Lite**, describing it as:

- More efficient for summarization  
- Stronger text comprehension  
- Broad multilingual support  
- Cost-efficient  
- Supports large context windows  

The flow:

- Split PDF into pages  
- Run each page through Nova Pro for page-level analysis  
- Combine results into an aggregated understanding of contract purpose  

The design choice here was interesting:  
Use Nova Lite for the summarization *judgment*, but use Nova Pro as the per-page reasoning engine.

## Extracting Contract Details with Nova Pro
For structured extraction—names, dates, amounts, clauses—the system uses **Amazon Nova Pro** because of its:

- Large context window support  
- Multilingual capabilities  
- Strong tool-use and function-calling behavior  
- Cost-efficiency at scale  

Each page produces structured output (JSON), and a consolidation Lambda merges results deterministically.

This is where multimodal page-level processing really pays off.

## Process Validation: Using a Different Model as the Judge
This was one of the strongest recommendations in the session:

> **Never use the same model as both extractor and judge.**

AWS validated outputs by:

- Running the extracted JSON + page images through **Claude Haiku 4.5**  
- Using Bedrock Batch for cost-effective cross-checking  
- Achieving ~50% cost reduction due to batch parallelization  

Why a different model?

- It reduces confirmation bias  
- It increases robustness under edge cases  
- It makes failures more explainable  

Many customers skip this step—and AWS said it consistently leads to higher defect rates.

## Optimization Techniques That Matter at Scale
Several production-ready patterns emerged:

### Page Classification to Reduce Downstream Cost  
Identify “dead pages” early and exclude them before expensive LLM steps.

### Include a Justification Field  
Every extracted field included a short justification string—hugely useful for:

- Evals  
- QA  
- Debugging  
- Audits  

### Use LLM for Conflict Resolution Only  
Most merging is deterministic.  
LLMs step in only when conflicting values require domain reasoning.

## Continuous Improvement Strategies
The final slide outlined four improvement levers teams can mix and match:

### 1. RAG  
- Fastest boost to relevance  
- Requires no training  
- Uses enterprise knowledge as grounding  

### 2. Alignment  
- Adjusts outputs to brand/voice  
- Uses feedback or ranking data  
- Ensures cross-team consistency  

### 3. Supervised Fine-Tuning  
- Uses real workflow examples  
- Encodes institutional know-how  
- Improves extraction consistency  

### 4. Continued Pre-Training  
- Deep domain understanding  
- Uses unlabeled internal data  
- Produces domain-smart base models  

Together, these create a continuous improvement loop where models evolve alongside the business.

## Additional Resources
- Bedrock Custom Models: https://github.com/aws-samples/amazon-bedrock-samples  
- Amazon Textract: https://aws.amazon.com/textract  
- Amazon Bedrock: https://aws.amazon.com/bedrock  
- Step Functions: https://aws.amazon.com/step-functions  
- AWS re:Invent session catalog: https://reinvent.awsevents.com  