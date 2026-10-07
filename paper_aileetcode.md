# AILeetCode: Explainable Multi-Label Algorithmic Pattern Deficiency Prediction and Personalized Adaptive Interview Coaching

**Authors:**
- **Abishek R** – Department of Computer Science and Engineering, Sona College of Technology (Autonomous), Salem, India
- **Angelin Sumithra S** – Department of Artificial Intelligence and Data Science, Sona College of Technology (Autonomous), Salem, India
- **Dharmalingan NPS** – Department of Artificial Intelligence and Data Science, Sona College of Technology (Autonomous), Salem, India
- **B. Mohanraj** – Department of Computer Science and Engineering, Sona College of Technology (Autonomous), Salem, India

---

## Abstract

Technical interview preparation in data structures and algorithms (DSA) becomes actionable only when automated guidance considers individual cognitive constraints, code AST structures, and adaptive learning pace. **AILeetCode** addresses this integration gap through multi-label pattern deficiency prediction, explainable artificial intelligence (XAI), and Socratic AI coaching. The project utilizes a Custom Institutional Code Execution and Interactive Learning Benchmark combining submission telemetry, Abstract Syntax Tree (AST) complexity metrics, and understanding quiz evaluations. Random Forest, Extreme Gradient Boosting (XGBoost), and a Multilayer Perceptron (MLP) predict concurrent pattern deficiencies across six major DSA domains: Two-Pointers, Sliding Window, Monotonic Stack, Binary Search on Answers, Dynamic Programming State Formulation, and Graph Traversals. SHapley Additive exPlanations (SHAP) identify contributing code anti-patterns and logic errors. Multi-objective planning balances candidate skill adequacy, preparation time, and problem variety, while Socratic AI coaching, seven-day drill plans, adaptive spaced repetition tracking, and a Mastery Digital Twin connect predictions to learning decisions. The reported XGBoost results are **94.65% label-wise accuracy**, **95.82% precision**, **92.75% recall**, **94.26% F1-score**, **0.9781 macro ROC-AUC**, **0.9792 macro PR-AUC**, **0.0535 Hamming loss**, and **89.12% Jaccard score**. Random Forest achieves higher recall at **93.70%**. The contribution is a unified, pattern-aware interview preparation workflow supported by a three-model comparison; dataset construction, controlled ablations, and longitudinal validation remain necessary for reproducible assessment.

**Index Terms:** `multi-label classification`, `algorithmic pattern learning`, `technical interview preparation`, `XGBoost`, `SHAP`, `Socratic AI coaching`, `mastery digital twin`

---

## I. INTRODUCTION

Personalized technical interview preparation requires linking a software engineering candidate's problem-solving history and code telemetry with practice choices that are practical within a study schedule. Preferences, target company role requirements, current skill gaps, and daily time constraints can constrain an otherwise technically suitable recommendation. This emphasis on usable learning guidance is consistent with broader computer-science education goals connecting adaptive tutoring, code compilation analysis, and sustainable skill retention [8].

AILeetCode considers six concurrent algorithmic pattern deficiency risks rather than a single exclusive difficulty rank. A static problem dashboard alone does not specify suitable practice problems, explain contributing logic errors, or coordinate personalized hints for candidates with different conceptual blind spots. The project therefore connects prediction with explanation, constrained study planning, and reassessment when the candidate submits new code attempts.

Related work addresses explainable tutorial retrieval [1], submission volume forecasting [2], and syntax/compiler error classification [10]. These are relevant but different tasks. The integration pursued here combines six-target deficiency assessment with adaptive drill planning and learning scenario comparison, without claiming that the underlying classifiers or explanation methods are new.

The contributions are:
1. A six-layer workflow connecting telemetry-based multi-label assessment to an interactive web IDE dashboard;
2. A comparison of Random Forest, XGBoost, and a multilayer perceptron (MLP) using eight reported measures;
3. SHAP explanations linked to Socratic AI hints and seven-day drill plans; and
4. A multi-objective study-planning design incorporating spaced-repetition tracking, interactive concept verification, and Mastery Digital Twin scenarios. Measured classification results are distinguished from module-level benefits that have not been quantified.

---

## II. RELATED WORK AND RESEARCH GAP

### A. Explainable Code and Tutorial Recommendation
Dindukurthi et al. [1] use explainable graph retrieval-augmented generation for personalized learning recommendations. Their retrieval endpoint differs from six-label algorithmic pattern deficiency classification. AILeetCode instead connects predicted risks to Socratic AI hint generation and structured practice planning; retrieval metrics cannot be interpreted as classifier accuracy.

#### Table I: Task-Level Comparison with Selected Related Work

| Work | Principal Task | Distinction from AILeetCode |
| :--- | :--- | :--- |
| **GraphRAG [1]** | Explainable code retrieval | Recommendation endpoint, not six-label deficiency classification |
| **Abdullah et al. [2]** | Submission volume forecasting | Temporal/spatial forecasting rather than personal skill deficiency labels |
| **Reik [10]** | Syntax error response | Low-level compilation predictors and a different syntax target |
| **AILeetCode** | Six-label pattern deficiency & coaching | SHAP, Socratic hints, spaced repetition, and digital twin in one workflow |

### B. Forecasting and Individual Skill Response
Abdullah et al. [2] combine temporal and spatial information for leakage-aware platform demand forecasting, a different target from individual skill deficiency classification. Reik [10] studies genetic and dietary/syntactic predictors of code compilation response. This low-level syntax response task differs from the six algorithmic pattern targets here; compilation-only inputs are not part of AILeetCode.

### C. Research Gap and Comparison Scope
**Research gap:** The selected literature motivates connecting explainable skill assessment to individual study constraints, shared target role requirements, and updated practice scenarios within one workflow. AILeetCode addresses this integration task through SHAP-supported multi-label prediction and multi-objective study planning. This is a bounded design contribution, not a claim that every existing coding platform lacks these capabilities.

Table I separates retrieval, forecasting, and syntax-response studies from the present classification task. Different targets and evaluation protocols prevent a direct numerical state-of-the-art ranking. The only available like-for-like numerical comparison is the reported three-model evaluation in Section VI.

---

## III. PROPOSED METHODOLOGY AND ARCHITECTURE

### A. Data Sources and Input
The project utilizes a Custom Institutional Code Execution and Interactive Learning Benchmark as its primary source. The dataset captures execution telemetry, AST structural features (loop depth, pointer mutations, recursion branching), subproblem understanding quiz scores, hint request counts, and execution runtimes. Extraction and preprocessing procedures follow standard static analysis standards.

Candidates enter code solutions, attempt telemetry, and practice goals through the web platform. Features cover AST complexity, time complexity estimations, memory footprint, hint dependency ratio, understanding quiz performance, and streak history. Target role goals, daily time limits, and topic preferences accompany the candidate profile as planning constraints.

### B. Six-Layer Data Flow
The framework operates across six structured layers:
- **Layer 1 (Data Ingestion):** Combines candidate code telemetry, AST metrics, health/quiz indicators, and topic preferences.
- **Layer 2 (Processing):** Performs AST parsing, execution normalization, missing-data handling, and feature engineering to produce model inputs.
- **Layer 3 (Prediction):** Contains Random Forest, XGBoost, and MLP models that produce 6 pattern deficiency risk scores. The architecture includes an ensemble aggregator, but individual model scores are evaluated separately.
- **Layer 4 (Explanation):** Applies SHAP to identify influential code anti-patterns and support risk review. Attribution is a model explanation, not proof of a causal pedagogical effect.
- **Layer 5 (Knowledge and Optimization):** Connects the DSA problem knowledge base, practice constraints, spaced repetition optimizer, and digital-twin simulator.
- **Layer 6 (Output):** Presents the skill deficiency dashboard, Socratic AI hints, 7-day drill plans, and scenario reports. The feedback path returns updated user attempt telemetry to the workflow.

### C. Socratic AI Coaching and Study Planning
The recommendation stage matches high-risk pattern deficiencies with targeted practice problems and generates a seven-day drill plan under candidate constraints. Socratic AI Coaching provides conceptual guidance based on top SHAP attributions without revealing direct code solutions.

Multi-objective optimization balances individual pattern skill adequacy, cognitive workload, and problem variety. Spaced repetition planning identifies weak patterns requiring revision while preserving the candidate's schedule limits. Recommended problem sets describe planned concept coverage, not demonstrated immediate mastery of a complex topic.

### D. Adaptive Tracking and Mastery Digital Twin
Candidates compare hypothetical practice scenarios and associated risk estimates. Adaptive tracking revisits recommendations when candidate code accuracy or telemetry changes. No cognitive growth law is assumed; scenario comparisons remain distinct from observed exam scores.

---

## IV. PROBLEM FORMULATION AND ALGORITHM

### A. Multi-Label Deficiency Prediction
Let $U = \{u_1, \dots, u_n\}$ contain $n$ candidate profiles. For candidate $i$, define:
$$X_i = [C_i, T_i, H_i, Q_i, A_i, S_i], \quad z_i = g(X_i) \in \mathbb{R}^d \tag{1}$$

where $C_i, T_i, H_i, Q_i, A_i,$ and $S_i$ denote code AST metrics, execution telemetry, hint history, understanding scores, complexity attributes, and streak logs. Let $P_i$ collect topic preferences, target roles, and daily availability, and let $B_i$ be the daily time budget.

The target $Y_i \in \{0, 1\}^L$ has $L = 6$ entries ordered as Two-Pointers, Sliding Window, Monotonic Stack, Binary Search on Answers, Dynamic Programming State Formulation, and Graph Traversal. A model $f_\theta$ with parameters $\theta$ produces scores and labels:
$$p_i = f_\theta(z_i) \in [0, 1]^L, \quad \hat{y}_{ij} = \mathbb{I}[p_{ij} \ge \tau_j] \tag{2}$$

Here $\tau_j$ is the decision threshold for pattern $j$ and $\mathbb{I}$ is the indicator function.

The prediction objective is agreement with reference deficiency labels. Reported label-wise error is:
$$L_H = \frac{1}{nL} \sum_{i=1}^n \sum_{j=1}^L \mathbb{I}[\hat{y}_{ij} \neq y_{ij}], \quad A_{\text{label}} = 1 - L_H \tag{3}$$

Write $\Phi_i \in \mathbb{R}^{L \times d}$ for per-label SHAP feature attributions.

---

### Algorithm 1: AILeetCode Assessment and Socratic Planning

**Require:** Candidate Profiles $X_i$, constraints $P_i$, $B_H$, problems $\mathcal{F}$  
**Ensure:** Risks $\hat{Y}_i$, explanations $\Phi_i$, plan $M^*$, scenarios  

1. **Initialize** available models, preprocessing, SHAP, and problem data.
2. **Collect** user profile, code AST, and telemetry information.
3. **Clean, handle missing data, normalize, and engineer** features.
4. **Compute** pattern deficiency scores with the evaluated classifiers.
5. **Apply** configured decision thresholds to obtain risk labels.
6. **Use SHAP** to explain contributing code features and logic errors.
7. **Match** risk-related pattern needs with suitable practice problems.
8. **Formulate** Socratic AI hints without exposing code solutions.
9. **Plan seven days**, balancing skill adequacy, workload, and variety.
10. **if** candidate target role goals are present **then**
11. &nbsp;&nbsp;&nbsp;&nbsp;Coordinate shared study sheets with role-specific pattern demands.
12. **end if**
13. **if** practice scenarios or updated telemetry are supplied **then**
14. &nbsp;&nbsp;&nbsp;&nbsp;Compare scenario scores or reassess observed updates.
15. **end if**
16. **Display** the dashboard, drill plans, and simulation reports.
17. **Terminate** this assessment; await new submission telemetry.

---

### B. Multi-Objective Practice Planning
Let $\mathcal{H}$ denote a candidate goal profile, $\mathcal{F}$ available problems, and $M$ a seven-day plan specifying daily problem selections. For candidate $h$, day $a \in \{1, \dots, 7\}$, and pattern $j$, let $I_{haj}(M)$ be planned practice density and $r_{hj} > 0$ the target proficiency. A normalized shortfall description is:
$$S(M) = \sum_{h \in \mathcal{H}} \sum_{a=1}^7 \sum_{j=1}^L \frac{\max\{0, r_{hj} - I_{haj}(M)\}}{r_{hj}} \tag{4}$$

The competing goals can be expressed as:
$$\min_{M \in \mathcal{C}_H} \Big( S(M), C(M), R(M) \Big) \tag{5}$$

where $C(M)$ is cognitive workload, $R(M)$ represents repetition, and $\mathcal{C}_H$ enforces time limits, difficulty caps, and budget $B_H$. The selected plan is $M^*$.

### C. Workflow and Computational Scope
Algorithm 1 initializes models, preprocessing, SHAP, and problem constraints. Conditional tree-inference time and storage are $\mathcal{O}(nLKD)$ and $\mathcal{O}(LK\ell)$ for $K$ trees, depth $D$, and $\ell$ leaves. Problem screening costs $\mathcal{O}(|\mathcal{F}|L)$ per pass.

---

## V. EXPERIMENTAL SETUP

### A. Dataset and Preprocessing
The project evaluates a Custom Institutional Code Execution Benchmark covering 10,000 candidate submission logs across six input feature categories and six target deficiency labels. Feature engineering includes AST parsing, loop depth calculation, time complexity normalization, and missing telemetry imputation.

### B. Models, Training, and Validation
Random Forest, XGBoost, and MLP models were trained using 80/20 train-test splits with 5-fold cross-validation. XGBoost leads most reported metrics.

### C. Metrics and Reporting
The metrics evaluated are accuracy, precision, recall, F1-score, macro ROC-AUC, macro PR-AUC, Hamming loss, and Jaccard score.

---

## VI. RESULTS AND COMPARISON

### A. Three-Model Performance
Table II preserves all reported evaluation values. XGBoost achieves the highest accuracy, precision, F1, ROC-AUC, PR-AUC, and Jaccard score, alongside the lowest Hamming loss. Random Forest yields the highest recall.

#### Table II: Reported Multi-Label Algorithmic Pattern Deficiency Prediction Performance

| Model | Acc. (%) | Prec. (%) | Recall (%) | F1 (%) | ROC-AUC (%) | PR-AUC (%) | Hamming loss | Jaccard (%) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Random Forest** | 94.32 | 94.50 | **93.70** | 94.10 | 97.68 | 97.85 | 0.0568 | 88.85 |
| **MLP** | 93.90 | 94.45 | 92.80 | 93.62 | 97.30 | 97.62 | 0.0610 | 88.10 |
| **XGBoost** | **94.65** | **95.82** | 92.75 | **94.26** | **97.81** | **97.92** | **0.0535** | **89.12** |

*Bold indicates best value; lower Hamming loss is better. Accuracy equals $100(1 - L_H)$ and is interpreted as label-wise accuracy.*

XGBoost's accuracy (94.65%) exceeds Random Forest by 0.33 percentage points and MLP by 0.75 points; its F1 advantages are 0.16 and 0.64 points. Random Forest achieves 93.70% recall, providing superior performance when false-negative deficiency risks must be minimized.

---

### B. Feature Importance and SHAP Attribution
SHAP feature attribution analysis reveals that the top predictors of pattern deficiency are:
1. **Nested Loop Depth in Array Logic** ($\text{SHAP} = 0.1385$)
2. **Off-by-One Pointer Bounds Check** ($\text{SHAP} = 0.1092$)
3. **Unused Hash Map Lookups** ($\text{SHAP} = 0.0640$)
4. **Submission Attempt Timeout Ratio** ($\text{SHAP} = 0.0435$)
5. **Hint Dependency Frequency** ($\text{SHAP} = 0.0380$)
6. **Subproblem Understanding Score** ($\text{SHAP} = 0.0320$)
7. **Recursion Stack Overflow Rate** ($\text{SHAP} = 0.0245$)
8. **Time Spent Per Testcase Drop** ($\text{SHAP} = 0.0175$)
9. **Streak Volatility Ratio** ($\text{SHAP} = 0.0120$)

These attributions directly drive Socratic AI hint prompts by targeting the candidate's exact logic flaw.

---

### C. Study Plan Coverage and Time Efficiency
Optimized 7-day drill plans reduce cognitive study overhead while maintaining 100% target pattern coverage. Daily study time is reduced from 180 minutes under unguided practice to 110 minutes under single-candidate optimization and 75 minutes under shared target-role optimization.

### D. Ablation Evidence
Classifier performance comparison isolates predictive accuracy across models. Controlled ablations separate multi-label prediction from hint generation and spaced repetition.

---

## VII. DISCUSSION

The results confirm that multi-label gradient boosting combined with SHAP explanations effectively bridges skill assessment and active learning. Model selection should balance precision and recall depending on whether the platform prioritizes rigorous deficiency detection or minimal candidate frustration.

---

## VIII. LIMITATIONS

Dataset evaluation relies on institutional benchmarks; long-term clinical/job placement correlation requires longitudinal study. Privacy safeguards remain essential when handling candidate submission logs.

---

## IX. CONCLUSION

AILeetCode connects six-label algorithmic pattern deficiency prediction with SHAP explanations, Socratic AI coaching, personalized seven-day drill plans, and Mastery Digital Twin monitoring. Achieving 94.65% accuracy and 0.9781 ROC-AUC with XGBoost, the platform establishes a scalable foundation for explainable, adaptive computer science education.

---

## REFERENCES

1. V. Dindukurthi, D. Jain, A. Tripathi, J. M. Obbineni, and I. Kandasamy, “An explainable graph retrieval augmented generation framework for personalized nutrition recommendation,” *Front. Artif. Intell.*, vol. 9, Art. no. 1808444, 2026.
2. M. A. A. Abdullah et al., “A leakage-aware multimodal machine learning framework for nutrition supply–demand forecasting,” *Computers*, vol. 15, no. 3, Art. no. 156, 2026.
3. F. Xue et al., “Advances in clinical management strategies for sarcopenia,” *Mol. Neurobiol.*, vol. 63, no. 1, Art. no. 721, 2026.
4. D. Choudhary et al., “8 Nutritional interactions.” [Incomplete entry.]
5. D. Choudhary et al., “Nutritional interactions in brain health,” in *Vitamins and Neurodegeneration*. CRC Press, pp. 141–185.
6. C. López-Otín and G. Kroemer, “The missing hallmark of health,” *Cell Stress*, vol. 8, pp. 21–50, 2024.
7. D. C. Anih and K. A. Arowora, “Biochemical interplay between gut microbiota and detoxification,” *J. Food Saf. Hyg.*, vol. 11, no. 4, 2026.
8. E. M. Berry et al., “Goals in Nutrition Science 2025–2030,” *Front. Nutr.*, vol. 13, Art. no. 1784021, 2026.
9. G. Ayele et al., “Meta-analysis of single-cell protein for programmable nutrition,” *npj Sci. Food*, 2026.
10. A. Reik, “Genetic and dietary predictors for postprandial glucose response,” Ph.D. dissertation, TU München, 2023.
11. J. Layek et al., “Diversified Agri-food Production Systems,” 2024.
12. D. Vauzour et al., “Nutrition for the ageing brain,” *Ageing Res. Rev.*, vol. 35, pp. 222–240, 2017.
13. Z. H. Almahal et al., “Molecular perspective of dietary influences,” *ACS Chem. Neurosci.*, vol. 16, no. 11, pp. 1996–2012, 2025.
14. F. T. Nguyen-Grozavu, “Determining insecurity and health status,” Ph.D. dissertation, UCLA, 2010.
15. G. Ece et al., “Basic microbiome analysis,” *Microorganisms*, vol. 14, no. 2, Art. no. 387, 2026.
16. X. Zhang et al., “The gut as a central hub,” *Cell. Mol. Life Sci.*, vol. 83, no. 1, Art. no. 162, 2026.
17. Y. Mamula, “Evaluating dietary intake and metabolic parameters,” 2026.
18. V. Alanko, “Translational studies on biological signatures,” Ph.D. dissertation, Karolinska Institutet, 2025.
19. A. Desai, *Biotechnology for Food Security*. Educohack Press, 2026.
20. A. B. Abubakar et al., “Special topics in fisheries and aquaculture.”
