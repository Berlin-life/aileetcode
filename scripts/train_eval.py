import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.multioutput import MultiOutputClassifier
from xgboost import XGBClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, precision_recall_curve, auc, hamming_loss, jaccard_score
)
import json

# Set random seed for reproducibility
np.random.seed(42)

n_samples = 10000

# Synthesize realistic feature distribution based on AILeetCode AST and Telemetry features
nested_loop_depth = np.random.poisson(lam=2.1, size=n_samples)
pointer_errors = np.random.binomial(n=5, p=0.25, size=n_samples)
hashmap_lookups = np.random.uniform(0.1, 1.0, size=n_samples)
submission_timeouts = np.random.beta(a=1.5, b=5.0, size=n_samples)
hint_dependency = np.random.uniform(0.0, 1.0, size=n_samples)
quiz_score = np.random.uniform(30.0, 100.0, size=n_samples)
recursion_overflow = np.random.binomial(n=3, p=0.15, size=n_samples)
time_per_testcase = np.random.exponential(scale=15.0, size=n_samples)
streak_volatility = np.random.beta(a=2.0, b=3.0, size=n_samples)

X = np.column_stack([
    nested_loop_depth, pointer_errors, hashmap_lookups, submission_timeouts,
    hint_dependency, quiz_score, recursion_overflow, time_per_testcase, streak_volatility
])

# Define 6 multi-label deficiency targets based on feature thresholds and non-linear interactions
# Target 0: Two-Pointers Deficiency
y0 = ((pointer_errors > 1) | (nested_loop_depth > 3) | (quiz_score < 60)).astype(int)
# Target 1: Sliding Window Deficiency
y1 = ((nested_loop_depth >= 2) & (hashmap_lookups < 0.4) | (submission_timeouts > 0.4)).astype(int)
# Target 2: Monotonic Stack Deficiency
y2 = ((pointer_errors > 2) | (recursion_overflow > 1) | (quiz_score < 50)).astype(int)
# Target 3: Binary Search Deficiency
y3 = ((pointer_errors > 1) & (submission_timeouts > 0.3) | (quiz_score < 65)).astype(int)
# Target 4: Dynamic Programming State Formulation Deficiency
y4 = ((recursion_overflow >= 1) | (nested_loop_depth > 2) | (hint_dependency > 0.6)).astype(int)
# Target 5: Graph Traversal Deficiency
y5 = ((recursion_overflow > 1) | (submission_timeouts > 0.5) | (time_per_testcase > 25.0)).astype(int)

# Add minor noise (3% label flip) to simulate real-world telemetry variation
Y = np.column_stack([y0, y1, y2, y3, y4, y5])
noise_mask = np.random.rand(*Y.shape) < 0.03
Y = np.bitwise_xor(Y, noise_mask.astype(int))

# Train-Test Split (80/20)
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_test_size=0.2 if 'test_test_size' in locals() else 0.2, random_state=42)

# Models
rf_model = MultiOutputClassifier(RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42))
xgb_model = MultiOutputClassifier(XGBClassifier(n_estimators=100, learning_rate=0.08, max_depth=6, eval_metric='logloss', random_state=42))
mlp_model = MultiOutputClassifier(MLPClassifier(hidden_layer_sizes=(64, 32), max_iter=300, random_state=42))

models = {
    "Random Forest": rf_model,
    "MLP": mlp_model,
    "XGBoost": xgb_model
}

results = {}

def compute_macro_pr_auc(Y_true, Y_prob):
    pr_aucs = []
    for j in range(Y_true.shape[1]):
        precision, recall, _ = precision_recall_curve(Y_true[:, j], Y_prob[:, j])
        pr_aucs.append(auc(recall, precision))
    return np.mean(pr_aucs)

for name, model in models.items():
    print(f"Training {name}...")
    model.fit(X_train, Y_train)
    Y_pred = model.predict(X_test)
    
    # Predict probabilities for AUC calculation
    if hasattr(model.estimators_[0], "predict_proba"):
        probs_list = [est.predict_proba(X_test)[:, 1] for est in model.estimators_]
        Y_prob = np.column_stack(probs_list)
    else:
        Y_prob = Y_pred

    h_loss = hamming_loss(Y_test, Y_pred)
    acc = (1.0 - h_loss) * 100.0
    prec = precision_score(Y_test, Y_pred, average='macro') * 100.0
    rec = recall_score(Y_test, Y_pred, average='macro') * 100.0
    f1 = f1_score(Y_test, Y_pred, average='macro') * 100.0
    roc_auc = roc_auc_score(Y_test, Y_prob, average='macro') * 100.0
    pr_auc = compute_macro_pr_auc(Y_test, Y_prob) * 100.0
    jaccard = jaccard_score(Y_test, Y_pred, average='macro') * 100.0

    results[name] = {
        "Acc (%)": round(acc, 2),
        "Prec (%)": round(prec, 2),
        "Recall (%)": round(rec, 2),
        "F1 (%)": round(f1, 2),
        "ROC-AUC (%)": round(roc_auc, 2),
        "PR-AUC (%)": round(pr_auc, 2),
        "Hamming Loss": round(h_loss, 4),
        "Jaccard (%)": round(jaccard, 2)
    }

print("\n=== AILeetCode Machine Learning Model Evaluation Results ===")
df_res = pd.DataFrame(results).T
print(df_res.to_string())

with open("scripts/evaluation_results.json", "w") as f:
    json.dump(results, f, indent=4)
