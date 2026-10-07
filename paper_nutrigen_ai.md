# NutriGen AI: Explainable Multi-Label Nutrient Deficiency Risk Prediction and Personalized Dietary Optimization

**Authors:**
- **Abishek R** – Department of Artificial Intelligence and Data Science, Sona College of Technology (Autonomous), Salem, India
- **Angelin Sumithra S** – Department of Artificial Intelligence and Data Science, Sona College of Technology (Autonomous), Salem, India
- **Dharmalingan NPS** – Department of Artificial Intelligence and Data Science, Sona College of Technology (Autonomous), Salem, India
- **B. Mohanraj** – Department of Artificial Intelligence and Data Science, Sona College of Technology (Autonomous), Salem, India

---

## Abstract

Multi-nutrient risk assessment becomes actionable only when dietary guidance considers individual constraints and shared household needs. **NutriGen AI** addresses this integration gap through multi-label prediction, explainable artificial intelligence, and personalized dietary planning. The project identifies the National Health and Nutrition Examination Survey (NHANES) and U.S. Department of Agriculture (USDA) FoodData Central as its health-profile and food-composition sources. Random Forest, Extreme Gradient Boosting (XGBoost), and a Multilayer Perceptron (MLP) predict risks for iron, vitamin D, vitamin B12, calcium, magnesium, and zinc. SHapley Additive exPlanations (SHAP) identify contributing features. Multi-objective planning balances nutrient adequacy, cost, and variety, while absorption intelligence, seven-day meal plans, family optimization, adaptive tracking, and a Nutrition Digital Twin connect predictions to dietary decisions. The reported XGBoost results are **94.28% label-wise accuracy**, **95.41% precision**, **92.33% recall**, **93.84% F1-score**, **0.9753 macro ROC-AUC**, **0.9774 macro PR-AUC**, **0.0572 Hamming loss**, and **88.58% Jaccard score**. Random Forest achieves higher recall at **93.31%**. The contribution is a unified, household-aware nutrition workflow supported by a three-model comparison; dataset construction, controlled ablations, and longitudinal validation remain necessary for reproducible assessment.

**Index Terms:** `multi-label classification`, `personalized nutrition`, `XGBoost`, `SHAP`, `family optimization`, `nutrition digital twin`

---

## I. INTRODUCTION

Personalized nutrition requires linking an individual’s dietary and health information with food choices that are practical within a household. Preferences, allergies, regional availability, and budget can constrain an otherwise nutritionally suitable recommendation. This emphasis on usable dietary guidance is consistent with broader nutrition-science goals connecting personalization, food composition, and sustainable food systems [8].

NutriGen AI considers six concurrent nutrient risks rather than a single exclusive class. A risk dashboard alone does not specify suitable meals, explain contributing attributes, or coordinate shared ingredients for family members with different needs. The project therefore connects prediction with explanation, constrained planning, and reassessment when the user supplies new information.

Related work addresses explainable nutrition retrieval [1], nutrition supply–demand forecasting [2], and genetic/dietary predictors of glucose response [10]. These are relevant but different tasks. The integration pursued here combines six-target assessment with household planning and dietary scenario comparison, without claiming that the underlying classifiers or explanation methods are new.

The contributions are:
1. A six-layer workflow connecting profile-based multi-label assessment to a web nutrition dashboard;
2. A comparison of Random Forest, XGBoost, and a multilayer perceptron (MLP) using eight reported measures;
3. SHAP explanations linked to personalized food matching and seven-day plans; and
4. A multi-objective family-planning design incorporating nutrient-interaction guidance, adaptive tracking, and Nutrition Digital Twin scenarios. Measured classification results are distinguished from module-level benefits that have not been quantified.

---

## II. RELATED WORK AND RESEARCH GAP

### A. Explainable Nutrition Recommendation
Dindukurthi et al. [1] use explainable graph retrieval augmented generation for personalized nutrition recommendations. Their retrieval endpoint differs from six-label deficiency risk classification. NutriGen AI instead connects predicted risks to food matching and household planning; retrieval metrics cannot be interpreted as classifier accuracy.

#### Table I: Task-Level Comparison with Selected Related Work

| Work | Principal Task | Distinction from NutriGen AI |
| :--- | :--- | :--- |
| **GraphRAG [1]** | Explainable food retrieval | Recommendation endpoint, not six-label risk classification |
| **Abdullah et al. [2]** | Nutrition supply–demand forecasting | Temporal/spatial forecasting rather than personal risk labels |
| **Reik [10]** | Postprandial glucose response | Genetic/dietary predictors and a different metabolic target |
| **NutriGen AI** | Six-label risk and dietary planning | SHAP, family constraints, and scenario comparison in one workflow |

### B. Forecasting and Individual Response
Abdullah et al. [2] combine temporal and spatial information for leakage-aware nutrition supply–demand forecasting, a different target from individual risk classification. Reik [10] studies genetic and dietary predictors of postprandial glucose response. This individualized metabolic-response task differs from the six micronutrient targets here; genetic inputs are not part of NutriGen AI.

### C. Research Gap and Comparison Scope
**Research gap:** The selected literature motivates connecting explainable nutrition assessment to individual constraints, shared household meals, and updated dietary scenarios within one workflow. NutriGen AI addresses this integration task through SHAP-supported multi-label prediction and multi-objective planning. This is a bounded design contribution, not a claim that every existing nutrition system lacks these capabilities.

Table I separates retrieval, forecasting, and metabolic-response studies from the present classification task. Different targets and evaluation protocols prevent a direct numerical state-of-the-art ranking. The only available like-for-like numerical comparison is the reported three-model evaluation in Section VI.

---

## III. PROPOSED METHODOLOGY AND ARCHITECTURE

### A. Data Sources and Input
The project identifies the National Health and Nutrition Examination Survey (NHANES), from the Centers for Disease Control and Prevention’s National Center for Health Statistics (CDC/NCHS), and USDA FoodData Central as its sources. NHANES provides health/nutrition data; FoodData Central provides food composition. Their extraction and integration procedures remain to be documented; food records are not labelled patient observations.

Users enter personal, health, and dietary information through the web platform. Features cover demographics, anthropometry, intake, lifestyle, symptoms, and laboratory attributes, including body mass index (BMI), activity, and sun exposure. Preferences, allergies, region, and budget accompany the profile as planning constraints.

### B. Six-Layer Data Flow
Fig. 1 preserves the supplied architecture:
- **Layer 1 (Data Ingestion):** Combines user profile/lifestyle information, health and laboratory indicators, and food preferences.
- **Layer 2 (Processing):** Performs cleaning, normalization, missing-data handling, and feature engineering to produce model inputs. The presentation specifies these operations, but not a particular imputation or scaling algorithm.
- **Layer 3 (Prediction):** Contains Random Forest, XGBoost, and MLP models that produce nutrient-risk scores. The diagram includes an ensemble aggregator, but no aggregation rule or ensemble result accompanies the three individual model scores.
- **Layer 4 (Explanation):** Applies SHAP to identify influential features and support risk review. Attribution is a model explanation, not proof of a causal dietary effect.
- **Layer 5 (Knowledge and Optimization):** Connects the food knowledge base, dietary constraints, family optimizer, and digital-twin simulator.
- **Layer 6 (Output):** Presents the risk dashboard, meal plans, and scenario reports. The feedback path returns updated user information to the workflow. It supports reassessment; an online retraining procedure is not documented.

### C. Dietary Intelligence and Family Planning
The recommendation stage matches high-risk nutrients with suitable foods and generates a seven-day plan under user constraints. Nutrient Absorption Intelligence highlights food pairings intended to support uptake or avoid interfering combinations.

Multi-objective optimization balances individual nutrient adequacy, food cost, and variety. Family planning identifies shared meals and ingredients while retaining each member’s requirements. Shared purchasing does not imply identical portions or removal of individual allergy restrictions. Recommended dietary allowance (RDA) coverage describes planned nutrient intake, not demonstrated correction of an existing deficiency.

### D. Adaptive Tracking and Nutrition Digital Twin
Users compare hypothetical dietary scenarios and associated risk estimates. Adaptive tracking revisits recommendations when profile or dietary information changes. No physiological transition model or recovery forecast is specified; scenario comparisons therefore remain distinct from observed health changes.

---

## IV. PROBLEM FORMULATION AND ALGORITHM

### A. Multi-Label Prediction
Let $U = \{u_1, \dots, u_n\}$ contain $n$ profiles. For user $i$, define:
$$X_i = [D_i, A_i, Q_i, V_i, S_i, \text{Lab}_i], \quad z_i = g(X_i) \in \mathbb{R}^d \tag{1}$$

where $D_i, A_i, Q_i, V_i, S_i,$ and $\text{Lab}_i$ denote demographics, anthropometry, intake, lifestyle, symptoms, and laboratory attributes. Let $P_i$ collect preferences, allergies, and regional availability, and let $B_i$ be the planning budget.

The target $Y_i \in \{0, 1\}^L$ has $L = 6$ entries ordered as iron, vitamin D, vitamin B12, calcium, magnesium, and zinc. A model $f_\theta$ with parameters $\theta$ produces scores and labels:
$$p_i = f_\theta(z_i) \in [0, 1]^L, \quad \hat{y}_{ij} = \mathbb{I}[p_{ij} \ge \tau_j] \tag{2}$$

Here $\tau_j$ is the decision threshold for nutrient $j$ and $\mathbb{I}$ is the indicator function. This notation does not assume a particular multi-output wrapper or threshold-selection procedure.

The prediction objective is agreement with the reference labels. Reported label-wise error is:
$$L_H = \frac{1}{nL} \sum_{i=1}^n \sum_{j=1}^L \mathbb{I}[\hat{y}_{ij} \neq y_{ij}], \quad A_{\text{label}} = 1 - L_H \tag{3}$$

Hamming loss is an evaluation measure; the model-specific training losses are not documented. Write $\Phi_i \in \mathbb{R}^{L \times d}$ for per-label SHAP feature attributions.

---

### Algorithm 1: NutriGen AI Assessment and Planning

**Require:** Profiles $X_i$, constraints $P_i$, $B_H$, foods $\mathcal{F}$  
**Ensure:** Risks $\hat{Y}_i$, explanations $\Phi_i$, plan $M^*$, scenarios  

1. **Initialize** available models, preprocessing, SHAP, and food data.
2. **Collect** user profile, health, and dietary information.
3. **Clean, handle missing data, normalize, and engineer** features.
4. **Compute** nutrient scores with the evaluated classifiers.
5. **Apply** configured decision thresholds to obtain risk labels.
6. **Use SHAP** to explain contributing features.
7. **Match** risk-related nutrient needs with suitable foods.
8. **Apply** dietary exclusions and nutrient-pairing guidance.
9. **Plan seven days**, balancing adequacy, cost, and variety.
10. **if** household profiles are present **then**
11. &nbsp;&nbsp;&nbsp;&nbsp;Coordinate shared meals with member-specific needs.
12. **end if**
13. **if** dietary scenarios or updated profiles are supplied **then**
14. &nbsp;&nbsp;&nbsp;&nbsp;Compare scenario scores or reassess observed updates.
15. **end if**
16. **Display** the dashboard, plans, and simulation reports.
17. **Terminate** this assessment; await a new user update.

---

### B. Multi-Objective Planning
Let $\mathcal{H}$ denote a household, $\mathcal{F}$ available foods, and $M$ a seven-day plan specifying portions for its members. For member $h$, day $a \in \{1, \dots, 7\}$, and nutrient $j$, let $I_{haj}(M)$ be planned intake and $r_{hj} > 0$ the target. A normalized shortfall description is:
$$S(M) = \sum_{h \in \mathcal{H}} \sum_{a=1}^7 \sum_{j=1}^L \frac{\max\{0, r_{hj} - I_{haj}(M)\}}{r_{hj}} \tag{4}$$

The competing goals can be expressed as:
$$\min_{M \in \mathcal{C}_H} \Big( S(M), C(M), R(M) \Big) \tag{5}$$

where $C(M)$ is cost, $R(M)$ represents repetition, and $\mathcal{C}_H$ enforces preferences, allergies, availability, and budget $B_H$ ($B_i$ for one member).

### C. Workflow and Computational Scope
Algorithm 1 initializes the models, preprocessing, SHAP configuration, foods, and constraints. Scenario $s$ supplies a hypothetical profile $X_i^{(s)}$, scored as $f_\theta(g(X_i^{(s)}))$ for comparison with observed $X_i$. No temporal response law is assumed.

For at most $K$ trees per label, depth $D$, and $\ell$ leaves, conditional tree-inference time and storage are $\mathcal{O}(nLKD)$ and $\mathcal{O}(LK\ell)$. Food screening costs $\mathcal{O}(|\mathcal{F}|L)$ per pass. Preprocessing, SHAP, optimization, and scenarios add implementation-dependent work. Food storage follows record size; MLP storage follows parameter count. End-to-end runtime and memory are not measured.

---

## V. EXPERIMENTAL SETUP

### A. Dataset and Preprocessing
The project names NHANES and USDA FoodData Central and identifies six input-feature categories and six targets. The accompanying evaluation consists of a three-model metrics table and plots; no extracted dataset or prediction files are supplied. Survey cycles, inclusion criteria, sample size, class frequencies, target-label derivation, and food-record selection are therefore not recoverable from these materials. In particular, naming NHANES does not establish how all six deficiency labels were obtained.

Cleaning, normalization, imputation, and feature engineering appear in the architecture. The specific imputation statistic, encoding procedure, normalization range, and composite feature definitions are unspecified. Training-only fitting of preprocessing and separation of label-generating variables from predictors are necessary checks, not procedures demonstrated by the presentation.

### B. Models, Training, and Validation
Random Forest and MLP are the comparative models; XGBoost leads most reported metrics. Train–test ratio, cross-validation, seeds, hyperparameters, imbalance treatment, and thresholds are unspecified. Ensemble performance is unavailable despite the aggregator in the architecture. No particular training or validation protocol is inferred.

### C. Metrics and Reporting
The metrics are accuracy, precision, recall, F1-score, receiver operating characteristic area under the curve (ROC-AUC), precision–recall area under the curve (PR-AUC), Hamming loss, and Jaccard score. All three reported accuracies equal $100(1 - L_H)$, so they are interpreted as label-wise, not exact-match, accuracy. The curve legends identify macro AUCs. Averaging for precision, recall, F1, and Jaccard, the PR-AUC integration convention, and confidence intervals are unspecified. No independent external-validation result is reported.

---

## VI. RESULTS AND COMPARISON

### A. Three-Model Performance
Table II preserves all reported values. XGBoost has the highest accuracy, precision, F1, ROC-AUC, PR-AUC, and Jaccard score, and the lowest Hamming loss. Random Forest has the highest recall; consequently, the results do not identify a universally best classifier.

#### Table II: Reported Multi-Label Nutrient Deficiency Prediction Performance

| Model | Acc. (%) | Prec. (%) | Recall (%) | F1 (%) | ROC-AUC (%) | PR-AUC (%) | Hamming loss | Jaccard (%) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Random Forest** | 94.07 | 94.22 | **93.31** | 93.74 | 97.50 | 97.71 | 0.0593 | 88.40 |
| **MLP** | 93.68 | 94.23 | 92.45 | 93.32 | 97.14 | 97.50 | 0.0632 | 87.70 |
| **XGBoost** | **94.28** | **95.41** | 92.33 | **93.84** | **97.53** | **97.74** | **0.0572** | **88.58** |

*Bold indicates the best value; lower Hamming loss is better. Accuracy equals $100(1 - L_H)$ and is interpreted as label-wise. AUCs are macro-labelled; other averaging conventions are unspecified. No ensemble results were supplied.*

XGBoost’s accuracy exceeds Random Forest by 0.21 percentage points and MLP by 0.60 points; its F1 advantages are 0.10 and 0.52 points. In contrast, Random Forest recall is 93.31%, versus 92.33% for XGBoost and 92.45% for MLP (Fig. 2). This distinction matters when choosing between missed-risk and false-alarm trade-offs.

The reported macro ROC-AUCs are 0.9753, 0.9750, and 0.9714 for XGBoost, Random Forest, and MLP, respectively (Fig. 3). XGBoost and Random Forest differ by only 0.0003 in both ROC-AUC and PR-AUC. These aggregate gaps do not establish statistical superiority or consistent advantages for every nutrient.

Fig. 4 includes label error and set overlap. XGBoost’s Hamming loss of 0.0572 describes errors on 5.72% of label assignments, not correct six-label profiles for 94.28% of users. Its Jaccard score is 88.58%. Label-specific performance and exact-match accuracy cannot be recovered from the table. No external study in Table I supplies a matched evaluation that would support a state-of-the-art claim.

---

### Figure Summaries & Visual Data

- **Fig. 1:** Original NutriGen AI architecture, from data ingestion to dietary outputs. Feedback and ensemble paths represent design capabilities, not evaluated online retraining or ensemble performance.
- **Fig. 2:** Classification performance: XGBoost leads accuracy, precision, and F1; Random Forest leads recall. The vertical axis is truncated.
- **Fig. 3:** Reported macro ROC-AUC: XGBoost 0.9753, Random Forest 0.9750, and MLP 0.9714. Statistical separation is not established.
- **Fig. 4:** Comprehensive metrics: percentages at left and fractional Hamming loss at right. Numerical values appear in Table II; axis ranges differ.
- **Fig. 5:** Training and validation loss over 30 epochs. Model identity and aggregation are unspecified; the curve is not attributed to XGBoost.
- **Fig. 6:** SHAP feature importance ranking dominated by iron-related features:
  1. *Iron Anemia Composite* (0.1322)
  2. *Low Iron Diet* (0.1041)
  3. *Pale Skin* (0.0606)
  4. *Fatigue* (0.0411)
  5. *Weak Nails* (0.0368)
  6. *Iron Vitd Synergy* (0.0334)
  7. *Neuro Spasm Synergy* (0.0235)
  8. *B12 Neuro Composite* (0.0166)
  9. *Symptom Ratio* (0.0139)
  10. *Symptom Count* (0.0099)
  11. *Diet Type Vegetarian* (0.0084)
  12. *Age Sq* (0.0071)
- **Fig. 7:** Illustrative RDA coverage and daily costs:
  - *Original Diet:* ₹280.0 INR/day
  - *Single LP Plan:* ₹180.0 INR/day (35.71% reduction)
  - *Family Shared Co-Op Plan:* ₹112.5 INR/day (59.82% total reduction, 37.50% below single plan)

---

### B. Training Behaviour and Explainability
The loss trajectories in Fig. 5 generally decrease over 30 epochs, with fluctuations and a remaining training–validation gap. Model identity and loss aggregation are not specified in that graphic. Its trend cannot therefore be attributed specifically to XGBoost or used as independent evidence of generalization.

The supplied SHAP ranking (Fig. 6) is led by Iron Anemia Composite (0.1322), Low Iron Diet (0.1041), Pale Skin (0.0606), Fatigue (0.0411), and Weak Nails (0.0368). The ranking is strongly iron-oriented; without the explained label, background, and cross-label aggregation, it cannot represent all six outputs. Composite-feature definitions are needed to assess whether the explanation reflects useful predictors or variables overlapping with target construction.

### C. Dietary Coverage and Cost
Fig. 7 shows optimized intake above the plotted 100% RDA target for all six nutrients. Daily expenditures are INR 280.0 for the original diet, INR 180.0 for the single-plan bar, and INR 112.5 for shared family planning. Relative reductions from the original diet are 35.71% and 59.82%; the shared plan figure is 37.50% below the single-plan figure.

The single-plan bar is labelled “Single LP Plan” in the original graphic, but the presentation specifies only multi-objective optimization, not a particular linear-programming implementation. Household size, accounting basis, prices, portions, and solver settings are not supplied. The chart is therefore an illustrative planning result, not verified per-household savings or evidence of biomarker improvement.

### D. Ablation Evidence
No component-removal results are supplied. The three classifier rows are model comparisons, not ablations of SHAP, absorption intelligence, family planning, or the digital twin. A measurable ablation analysis cannot be reported without full-system and removed-component observations under matched conditions. Future evaluation should separate classification endpoints from explanation comprehension, planning cost/coverage, and scenario validity; no numerical component effect is inferred here.

---

## VII. DISCUSSION

The reported scores suggest that the three classifiers achieve similar aggregate discrimination, with different precision–recall trade-offs. Model selection should therefore reflect the intended risk-screening objective rather than accuracy alone. Per-label errors and calibration remain important because a high aggregate AUC does not ensure reliable probabilities for every nutrient.

The technical contribution is the connection between assessment and practical dietary decisions: SHAP supports risk-factor review, food matching connects risk to ingredients, and multi-objective planning addresses member-specific needs under shared household resources. Scenario comparison and progress updates extend the workflow beyond a static recommendation. These functions match the project design, but improved trust, adherence, fairness, and nutritional outcomes require direct evaluation rather than inference from their presence in an architecture.

---

## VIII. LIMITATIONS

Dataset sources are identified, but their extraction, label construction, population coverage, and evaluation split are not documented. These omissions limit reproducibility and interpretation of generalization. Missing or self-reported inputs and undocumented symptom composites may affect prediction reliability. The model comparison also lacks uncertainty estimates and label-wise results.

Computation depends on SHAP configuration, household constraints, and scenario count; no deployment latency or memory profile is available. Food costs, regional coverage, and interaction rules require documented sources. The digital twin lacks longitudinal validation, so its scenarios should not be treated as recovery forecasts. The web platform handles sensitive health and household information and requires privacy safeguards. It supports dietary decisions rather than autonomous clinical diagnosis.

---

## IX. CONCLUSION

NutriGen AI connects six-label nutrient-risk prediction with SHAP explanations, food matching, personalized seven-day plans, family optimization, and scenario-based monitoring. The reported XGBoost accuracy, F1-score, and macro ROC-AUC are 94.28%, 93.84%, and 0.9753, while Random Forest leads recall. The principal contribution is a unified, household-aware dietary intelligence workflow, not a new classifier or established clinical benefit. Further work should document dataset construction and training, complete controlled module evaluation, and validate planning and scenario outputs during integration and deployment.

---

## REFERENCES

1. V. Dindukurthi, D. Jain, A. Tripathi, J. M. Obbineni, and I. Kandasamy, “An explainable graph retrieval augmented generation framework for personalized nutrition recommendation,” *Front. Artif. Intell.*, vol. 9, Art. no. 1808444, 2026, doi: 10.3389/frai.2026.1808444.
2. M. A. A. Abdullah, J. L. Oropeza Rodriguez, C. Guzmán Sánchez-Mejorada, M. J. Torres Ruiz, and R. Quintero Tellez, “A leakage-aware multimodal machine learning framework for nutrition supply–demand forecasting using temporal and spatial data fusion,” *Computers*, vol. 15, no. 3, Art. no. 156, 2026.
3. F. Xue et al., “Advances in clinical management strategies for sarcopenia: From exercise and nutrition to pharmacotherapy and comprehensive interventions,” *Mol. Neurobiol.*, vol. 63, no. 1, Art. no. 721, 2026, doi: 10.1007/s12035-026-06017-1.
4. D. Choudhary et al., “8 Nutritional interactions.” [Incomplete supplied entry; appears to duplicate the chapter in Ref. [5].]
5. D. Choudhary, M. N. Khan, R. Rana, S. Mehan, Z. Khan, A. K. Sharma, and M. Kumar, “Nutritional interactions: Cofactor minerals, PUFA, polyphenols, and vitamin synergy in brain health,” in *Vitamins and Neurodegeneration: Mechanisms and Therapeutic Insights*. CRC Press, pp. 141–185.
6. C. López-Otín and G. Kroemer, “The missing hallmark of health: Psychosocial adaptation,” *Cell Stress*, vol. 8, pp. 21–50, 2024, doi: 10.15698/cst2024.03.294.
7. D. C. Anih and K. A. Arowora, “Biochemical interplay between gut microbiota, nutritional modulators, and mycotoxin detoxification, a triadic framework for foodborne toxicity mitigation: A review,” *J. Food Saf. Hyg.*, vol. 11, no. 4, 2026, doi: 10.18502/jfsh.v11i4.21680.
8. E. M. Berry et al., “Goals in Nutrition Science 2025–2030,” *Front. Nutr.*, vol. 13, Art. no. 1784021, 2026, doi: 10.3389/fnut.2026.1784021.
9. G. Ayele, H. Admassu, G. Mosisa, A. Desalegn, and M. Abeje, “Meta-analysis of fruit waste-derived single-cell protein for programmable nutrition via synthetic biology in sustainable food systems,” *npj Sci. Food*, 2026, doi: 10.1038/s41538-026-00850-3.
10. A. Reik, “Genetic and dietary predictors for the postprandial glucose response and possible implications of the postprandial metabolic phenotype on weight management,” Ph.D. dissertation, Technische Universität München, Munich, Germany, 2023.
11. J. Layek, K. Ramesh, B. Pramanick, and Y. S. Shivay, entry associated with Diversified Agri-food Production Systems for Nutritional Security, 2024.
12. D. Vauzour et al., “Nutrition for the ageing brain: Towards evidence for an optimal diet,” *Ageing Res. Rev.*, vol. 35, pp. 222–240, 2017, doi: 10.1016/j.arr.2016.09.010.
13. Z. H. Almahal, A. Hasan, S. A. Razzak, A. Nzila, and S. Uddin, “Molecular perspective of dietary influences on the gut microbiome alongside neurological health: Exploring the gut-brain axis,” *ACS Chem. Neurosci.*, vol. 16, no. 11, pp. 1996–2012, 2025, doi: 10.1021/acschemneuro.5c00058.
14. F. T. Nguyen-Grozavu, “Determining insecurity, nutritional behaviors, and health status—Drug users and undernutrition: Objectives and new guidelines (DINH DUONG),” Ph.D. dissertation, Univ. California, Los Angeles, CA, USA, 2010.
15. G. Ece et al., “Basic microbiome analysis: Analytical steps from sampling to sequencing,” *Microorganisms*, vol. 14, no. 2, Art. no. 387, 2026.
16. X. Zhang, R. Li, Y. Gao, W. Zhang, T. Ni, and Y. Liu, “The gut as a central hub for multi-organ crosstalk in aging,” *Cell. Mol. Life Sci.*, vol. 83, no. 1, Art. no. 162, 2026.
17. Y. Mamula, “Evaluating dietary intake, body composition, and metabolic parameters in endometrial cancer survivors,” 2026.
18. V. Alanko, “Translational studies on biological signatures, risk profiles, and prevention of dementia,” Ph.D. dissertation, Karolinska Institutet, Stockholm, Sweden, 2025.
19. A. Desai, *Biotechnology for Food Security*. Educohack Press, 2026.
20. A. B. Abubakar, Y. Abel, and U. Yakubu, “Special topics in fisheries and aquaculture for improved nutrition and national development.”
