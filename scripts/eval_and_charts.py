"""
AILeetCode Evaluation & Chart Generation
Uses only: numpy, xgboost, matplotlib (NO sklearn/scipy — blocked by system DLL policy)
"""
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from xgboost import XGBClassifier, XGBRFClassifier
import json, os

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "paper_charts")
os.makedirs(OUT_DIR, exist_ok=True)

# ═══════════════════════════════════════════
# METRIC IMPLEMENTATIONS (no sklearn needed)
# ═══════════════════════════════════════════
def precision_score_manual(y_true, y_pred):
    tp = np.sum((y_pred == 1) & (y_true == 1))
    fp = np.sum((y_pred == 1) & (y_true == 0))
    return tp / (tp + fp) if (tp + fp) > 0 else 0.0

def recall_score_manual(y_true, y_pred):
    tp = np.sum((y_pred == 1) & (y_true == 1))
    fn = np.sum((y_pred == 0) & (y_true == 1))
    return tp / (tp + fn) if (tp + fn) > 0 else 0.0

def f1_score_manual(y_true, y_pred):
    p = precision_score_manual(y_true, y_pred)
    r = recall_score_manual(y_true, y_pred)
    return 2 * p * r / (p + r) if (p + r) > 0 else 0.0

def accuracy_score_manual(y_true, y_pred):
    return np.mean(y_true == y_pred)

def hamming_loss_manual(Y_true, Y_pred):
    return np.mean(Y_true != Y_pred)

def jaccard_score_manual(Y_true, Y_pred):
    scores = []
    for i in range(Y_true.shape[0]):
        inter = np.sum((Y_true[i] == 1) & (Y_pred[i] == 1))
        union = np.sum((Y_true[i] == 1) | (Y_pred[i] == 1))
        scores.append(inter / union if union > 0 else 1.0)
    return np.mean(scores)

def macro_precision(Y_true, Y_pred):
    return np.mean([precision_score_manual(Y_true[:, j], Y_pred[:, j]) for j in range(Y_true.shape[1])])

def macro_recall(Y_true, Y_pred):
    return np.mean([recall_score_manual(Y_true[:, j], Y_pred[:, j]) for j in range(Y_true.shape[1])])

def macro_f1(Y_true, Y_pred):
    return np.mean([f1_score_manual(Y_true[:, j], Y_pred[:, j]) for j in range(Y_true.shape[1])])

def roc_auc_single(y_true, y_prob):
    desc_order = np.argsort(-y_prob)
    y_sorted = y_true[desc_order]
    n_pos = np.sum(y_true == 1)
    n_neg = np.sum(y_true == 0)
    if n_pos == 0 or n_neg == 0:
        return 0.5
    tp, fp = 0, 0
    auc_val = 0.0
    for i in range(len(y_sorted)):
        if y_sorted[i] == 1:
            tp += 1
        else:
            fp += 1
            auc_val += tp
    return auc_val / (n_pos * n_neg)

def macro_roc_auc(Y_true, Y_prob):
    return np.mean([roc_auc_single(Y_true[:, j], Y_prob[:, j]) for j in range(Y_true.shape[1])])

def pr_auc_single(y_true, y_prob):
    desc_order = np.argsort(-y_prob)
    y_sorted = y_true[desc_order]
    tp_cum = np.cumsum(y_sorted)
    n = np.arange(1, len(y_sorted) + 1)
    prec = tp_cum / n
    rec = tp_cum / np.sum(y_true)
    # trapezoidal
    auc_val = 0.0
    for i in range(1, len(rec)):
        auc_val += (rec[i] - rec[i-1]) * (prec[i] + prec[i-1]) / 2
    return auc_val

def macro_pr_auc(Y_true, Y_prob):
    return np.mean([pr_auc_single(Y_true[:, j], Y_prob[:, j]) for j in range(Y_true.shape[1])])

def roc_curve_manual(y_true, y_prob, n_thresholds=200):
    thresholds = np.linspace(1, 0, n_thresholds)
    fprs, tprs = [], []
    n_pos = np.sum(y_true == 1)
    n_neg = np.sum(y_true == 0)
    for t in thresholds:
        pred = (y_prob >= t).astype(int)
        tp = np.sum((pred == 1) & (y_true == 1))
        fp = np.sum((pred == 1) & (y_true == 0))
        fprs.append(fp / n_neg if n_neg > 0 else 0)
        tprs.append(tp / n_pos if n_pos > 0 else 0)
    return np.array(fprs), np.array(tprs)

def pr_curve_manual(y_true, y_prob, n_thresholds=200):
    thresholds = np.linspace(0, 1, n_thresholds)
    precs, recs = [], []
    n_pos = np.sum(y_true == 1)
    for t in thresholds:
        pred = (y_prob >= t).astype(int)
        tp = np.sum((pred == 1) & (y_true == 1))
        fp = np.sum((pred == 1) & (y_true == 0))
        precs.append(tp / (tp + fp) if (tp + fp) > 0 else 1.0)
        recs.append(tp / n_pos if n_pos > 0 else 0)
    return np.array(precs), np.array(recs)

# ═══════════════════════════════════════════
# SIMPLE NUMPY MLP (no sklearn needed)
# ═══════════════════════════════════════════
class SimpleMLP:
    def __init__(self, input_dim, hidden=(64, 32), lr=0.001, epochs=100):
        self.lr = lr
        self.epochs = epochs
        dims = [input_dim] + list(hidden) + [1]
        self.weights = []
        self.biases = []
        for i in range(len(dims) - 1):
            w = np.random.randn(dims[i], dims[i+1]) * np.sqrt(2.0 / dims[i])
            b = np.zeros((1, dims[i+1]))
            self.weights.append(w)
            self.biases.append(b)

    def _relu(self, x):
        return np.maximum(0, x)

    def _sigmoid(self, x):
        x = np.clip(x, -500, 500)
        return 1.0 / (1.0 + np.exp(-x))

    def forward(self, X):
        self.activations = [X]
        a = X
        for i in range(len(self.weights) - 1):
            z = a @ self.weights[i] + self.biases[i]
            a = self._relu(z)
            self.activations.append(a)
        z = a @ self.weights[-1] + self.biases[-1]
        a = self._sigmoid(z)
        self.activations.append(a)
        return a

    def fit(self, X, y):
        y = y.reshape(-1, 1).astype(float)
        batch_size = min(256, len(X))
        for epoch in range(self.epochs):
            idx = np.random.permutation(len(X))
            for start in range(0, len(X), batch_size):
                batch_idx = idx[start:start+batch_size]
                Xb, yb = X[batch_idx], y[batch_idx]
                out = self.forward(Xb)
                # backprop
                delta = out - yb  # (batch, 1)
                for i in range(len(self.weights) - 1, -1, -1):
                    dw = self.activations[i].T @ delta / len(Xb)
                    db = np.mean(delta, axis=0, keepdims=True)
                    self.weights[i] -= self.lr * dw
                    self.biases[i] -= self.lr * db
                    if i > 0:
                        delta = delta @ self.weights[i].T
                        delta = delta * (self.activations[i] > 0).astype(float)  # ReLU derivative

    def predict_proba(self, X):
        return self.forward(X).ravel()

    def predict(self, X):
        return (self.predict_proba(X) >= 0.5).astype(int)


# ═══════════════════════════════════════════
# DATA SYNTHESIS
# ═══════════════════════════════════════════
np.random.seed(42)
n_samples = 10000

nested_loop_depth   = np.random.poisson(lam=2.1, size=n_samples)
pointer_errors      = np.random.binomial(n=5, p=0.25, size=n_samples)
hashmap_lookups     = np.random.uniform(0.1, 1.0, size=n_samples)
submission_timeouts = np.random.beta(a=1.5, b=5.0, size=n_samples)
hint_dependency     = np.random.uniform(0.0, 1.0, size=n_samples)
quiz_score          = np.random.uniform(30.0, 100.0, size=n_samples)
recursion_overflow  = np.random.binomial(n=3, p=0.15, size=n_samples)
time_per_testcase   = np.random.exponential(scale=15.0, size=n_samples)
streak_volatility   = np.random.beta(a=2.0, b=3.0, size=n_samples)

FEATURE_NAMES = [
    "Nested Loop Depth", "Pointer Error Count", "Unused HashMap Ratio",
    "Timeout Ratio", "Hint Dependency", "Quiz Score",
    "Recursion Overflow", "Time/Testcase", "Streak Volatility"
]
LABEL_NAMES = [
    "Two-Pointers", "Sliding Window", "Monotonic Stack",
    "Binary Search", "Dynamic Programming", "Graph Traversal"
]

X = np.column_stack([
    nested_loop_depth, pointer_errors, hashmap_lookups, submission_timeouts,
    hint_dependency, quiz_score, recursion_overflow, time_per_testcase, streak_volatility
])

y0 = ((pointer_errors > 1) | (nested_loop_depth > 3) | (quiz_score < 60)).astype(int)
y1 = ((nested_loop_depth >= 2) & (hashmap_lookups < 0.4) | (submission_timeouts > 0.4)).astype(int)
y2 = ((pointer_errors > 2) | (recursion_overflow > 1) | (quiz_score < 50)).astype(int)
y3 = ((pointer_errors > 1) & (submission_timeouts > 0.3) | (quiz_score < 65)).astype(int)
y4 = ((recursion_overflow >= 1) | (nested_loop_depth > 2) | (hint_dependency > 0.6)).astype(int)
y5 = ((recursion_overflow > 1) | (submission_timeouts > 0.5) | (time_per_testcase > 25.0)).astype(int)

Y = np.column_stack([y0, y1, y2, y3, y4, y5])
noise_mask = np.random.rand(*Y.shape) < 0.03
Y = np.bitwise_xor(Y, noise_mask.astype(int))

# Train-test split (manual, no sklearn)
n_test = int(0.2 * n_samples)
perm = np.random.permutation(n_samples)
test_idx, train_idx = perm[:n_test], perm[n_test:]
X_train, X_test = X[train_idx], X[test_idx]
Y_train, Y_test = Y[train_idx], Y[test_idx]

# Normalize features (min-max on train)
X_min = X_train.min(axis=0)
X_max = X_train.max(axis=0)
X_range = X_max - X_min
X_range[X_range == 0] = 1
X_train_norm = (X_train - X_min) / X_range
X_test_norm = (X_test - X_min) / X_range

# ═══════════════════════════════════════════
# TRAIN MODELS (per label)
# ═══════════════════════════════════════════
print("=" * 60)
print("AILeetCode Model Evaluation — Training 3 Models × 6 Labels")
print("=" * 60)

all_preds = {}
all_probs = {}

# 1. XGBoost Random Forest (acts as our "Random Forest")
print("\n[1/3] Training Random Forest (XGBRFClassifier)...")
rf_preds, rf_probs = [], []
rf_importances = np.zeros(len(FEATURE_NAMES))
for j in range(6):
    model = XGBRFClassifier(n_estimators=100, max_depth=12, learning_rate=1.0,
                            subsample=0.8, colsample_bynode=0.8,
                            random_state=42, verbosity=0, eval_metric='logloss')
    model.fit(X_train, Y_train[:, j])
    rf_preds.append(model.predict(X_test))
    rf_probs.append(model.predict_proba(X_test)[:, 1])
    rf_importances += model.feature_importances_
rf_importances /= 6
all_preds["Random Forest"] = np.column_stack(rf_preds)
all_probs["Random Forest"] = np.column_stack(rf_probs)
print("  ✓ Done")

# 2. MLP (numpy implementation)
print("\n[2/3] Training MLP (NumPy implementation)...")
mlp_preds, mlp_probs = [], []
for j in range(6):
    mlp = SimpleMLP(input_dim=9, hidden=(64, 32), lr=0.005, epochs=80)
    mlp.fit(X_train_norm, Y_train[:, j])
    prob = mlp.predict_proba(X_test_norm)
    mlp_probs.append(prob)
    mlp_preds.append((prob >= 0.5).astype(int))
all_preds["MLP"] = np.column_stack(mlp_preds)
all_probs["MLP"] = np.column_stack(mlp_probs)
print("  ✓ Done")

# 3. XGBoost
print("\n[3/3] Training XGBoost...")
xgb_preds, xgb_probs = [], []
xgb_importances = np.zeros(len(FEATURE_NAMES))
for j in range(6):
    model = XGBClassifier(n_estimators=100, learning_rate=0.08, max_depth=6,
                          eval_metric='logloss', random_state=42, verbosity=0)
    model.fit(X_train, Y_train[:, j])
    xgb_preds.append(model.predict(X_test))
    xgb_probs.append(model.predict_proba(X_test)[:, 1])
    xgb_importances += model.feature_importances_
xgb_importances /= 6
all_preds["XGBoost"] = np.column_stack(xgb_preds)
all_probs["XGBoost"] = np.column_stack(xgb_probs)
print("  ✓ Done")

# ═══════════════════════════════════════════
# COMPUTE METRICS
# ═══════════════════════════════════════════
print("\n" + "=" * 60)
print("COMPUTING METRICS")
print("=" * 60)

model_names = ["Random Forest", "MLP", "XGBoost"]
all_results = {}
per_label_results = {}

for name in model_names:
    Y_pred = all_preds[name]
    Y_prob = all_probs[name]

    h_loss = hamming_loss_manual(Y_test, Y_pred)
    res = {
        "Acc (%)":      round((1.0 - h_loss) * 100, 2),
        "Prec (%)":     round(macro_precision(Y_test, Y_pred) * 100, 2),
        "Recall (%)":   round(macro_recall(Y_test, Y_pred) * 100, 2),
        "F1 (%)":       round(macro_f1(Y_test, Y_pred) * 100, 2),
        "ROC-AUC":      round(macro_roc_auc(Y_test, Y_prob), 4),
        "PR-AUC":       round(macro_pr_auc(Y_test, Y_prob), 4),
        "Hamming Loss":  round(h_loss, 4),
        "Jaccard (%)":  round(jaccard_score_manual(Y_test, Y_pred) * 100, 2)
    }
    all_results[name] = res

    label_metrics = {}
    for j, lbl in enumerate(LABEL_NAMES):
        label_metrics[lbl] = {
            "Accuracy": round(accuracy_score_manual(Y_test[:, j], Y_pred[:, j]) * 100, 2),
            "F1":       round(f1_score_manual(Y_test[:, j], Y_pred[:, j]) * 100, 2),
            "ROC-AUC":  round(roc_auc_single(Y_test[:, j], Y_prob[:, j]), 4)
        }
    per_label_results[name] = label_metrics

# Print results
print("\n=== AGGREGATE RESULTS ===\n")
header = f"{'Model':<18} {'Acc%':>7} {'Prec%':>7} {'Rec%':>7} {'F1%':>7} {'ROC':>7} {'PR':>7} {'H-Loss':>7} {'Jacc%':>7}"
print(header)
print("-" * len(header))
for name in model_names:
    r = all_results[name]
    print(f"{name:<18} {r['Acc (%)']:>7.2f} {r['Prec (%)']:>7.2f} {r['Recall (%)']:>7.2f} "
          f"{r['F1 (%)']:>7.2f} {r['ROC-AUC']:>7.4f} {r['PR-AUC']:>7.4f} "
          f"{r['Hamming Loss']:>7.4f} {r['Jaccard (%)']:>7.2f}")

print("\n=== PER-LABEL F1 SCORES ===")
for name in model_names:
    print(f"\n  {name}:")
    for lbl in LABEL_NAMES:
        m = per_label_results[name][lbl]
        print(f"    {lbl:25s}  Acc={m['Accuracy']:6.2f}%  F1={m['F1']:6.2f}%  AUC={m['ROC-AUC']:.4f}")

# Save JSON
with open(os.path.join(OUT_DIR, "evaluation_results.json"), "w") as f:
    json.dump({"aggregate": all_results, "per_label": per_label_results}, f, indent=2)

# ═══════════════════════════════════════════
# CHART GENERATION
# ═══════════════════════════════════════════
COLORS = {"Random Forest": "#4C72B0", "MLP": "#DD8452", "XGBoost": "#55A868"}
plt.rcParams.update({
    'font.family': 'sans-serif', 'font.size': 11, 'axes.titlesize': 13,
    'axes.labelsize': 11, 'figure.dpi': 200, 'savefig.bbox': 'tight',
    'savefig.pad_inches': 0.15,
})

# ─── CHART 1: Aggregate Metrics ───
print("\nGenerating Chart 1: Aggregate metrics...")
fig, ax = plt.subplots(figsize=(12, 5.5))
metrics_keys = ["Acc (%)", "Prec (%)", "Recall (%)", "F1 (%)", "Jaccard (%)"]
x = np.arange(len(metrics_keys))
width = 0.22
for i, name in enumerate(model_names):
    vals = [all_results[name][m] for m in metrics_keys]
    bars = ax.bar(x + i * width, vals, width, label=name, color=COLORS[name], edgecolor='white', linewidth=0.5)
    for bar, val in zip(bars, vals):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.3,
                f'{val:.1f}', ha='center', va='bottom', fontsize=8, fontweight='bold')
ax.set_ylabel('Score (%)')
ax.set_title('Fig. 1: Multi-Label Classification — Aggregate Performance Comparison')
ax.set_xticks(x + width)
ax.set_xticklabels([m.replace(" (%)", "") for m in metrics_keys])
ax.set_ylim(80, 100)
ax.legend(loc='lower right')
ax.grid(axis='y', alpha=0.3)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.savefig(os.path.join(OUT_DIR, "chart1_aggregate_metrics.png"))
plt.close()

# ─── CHART 2: Per-Label F1 ───
print("Generating Chart 2: Per-label F1...")
fig, ax = plt.subplots(figsize=(13, 5.5))
x = np.arange(len(LABEL_NAMES))
width = 0.22
for i, name in enumerate(model_names):
    vals = [per_label_results[name][lbl]["F1"] for lbl in LABEL_NAMES]
    bars = ax.bar(x + i * width, vals, width, label=name, color=COLORS[name], edgecolor='white', linewidth=0.5)
    for bar, val in zip(bars, vals):
        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.3,
                f'{val:.1f}', ha='center', va='bottom', fontsize=7.5, fontweight='bold')
ax.set_ylabel('F1-Score (%)')
ax.set_title('Fig. 2: Per-Label F1-Score Across Six DSA Pattern Deficiencies')
ax.set_xticks(x + width)
ax.set_xticklabels(LABEL_NAMES, rotation=15, ha='right')
ax.set_ylim(75, 100)
ax.legend(loc='lower right')
ax.grid(axis='y', alpha=0.3)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.savefig(os.path.join(OUT_DIR, "chart2_perlabel_f1.png"))
plt.close()

# ─── CHART 3: ROC Curves ───
print("Generating Chart 3: ROC curves...")
fig, ax = plt.subplots(figsize=(7, 6))
for name in model_names:
    all_fpr_list, all_tpr_list = [], []
    for j in range(6):
        fpr, tpr = roc_curve_manual(Y_test[:, j], all_probs[name][:, j])
        all_fpr_list.append(fpr)
        all_tpr_list.append(tpr)
    common_fpr = np.linspace(0, 1, 200)
    mean_tpr = np.zeros_like(common_fpr)
    for j in range(6):
        mean_tpr += np.interp(common_fpr, all_fpr_list[j], all_tpr_list[j])
    mean_tpr /= 6
    trap_auc = np.trapz(mean_tpr, common_fpr)
    ax.plot(common_fpr, mean_tpr, label=f'{name} (AUC={trap_auc:.4f})', color=COLORS[name], linewidth=2)
ax.plot([0, 1], [0, 1], 'k--', alpha=0.4, linewidth=1)
ax.set_xlabel('False Positive Rate')
ax.set_ylabel('True Positive Rate')
ax.set_title('Fig. 3: Macro-Average ROC Curve')
ax.legend(loc='lower right')
ax.grid(alpha=0.3)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.savefig(os.path.join(OUT_DIR, "chart3_roc_curves.png"))
plt.close()

# ─── CHART 4: PR Curves ───
print("Generating Chart 4: PR curves...")
fig, ax = plt.subplots(figsize=(7, 6))
for name in model_names:
    all_prec_list, all_rec_list = [], []
    for j in range(6):
        prec, rec = pr_curve_manual(Y_test[:, j], all_probs[name][:, j])
        all_prec_list.append(prec)
        all_rec_list.append(rec)
    common_rec = np.linspace(0, 1, 200)
    mean_prec = np.zeros_like(common_rec)
    for j in range(6):
        sorted_idx = np.argsort(all_rec_list[j])
        mean_prec += np.interp(common_rec, all_rec_list[j][sorted_idx], all_prec_list[j][sorted_idx])
    mean_prec /= 6
    trap_prauc = np.trapz(mean_prec, common_rec)
    ax.plot(common_rec, mean_prec, label=f'{name} (PR-AUC={trap_prauc:.4f})', color=COLORS[name], linewidth=2)
ax.set_xlabel('Recall')
ax.set_ylabel('Precision')
ax.set_title('Fig. 4: Macro-Average Precision-Recall Curve')
ax.legend(loc='lower left')
ax.grid(alpha=0.3)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.savefig(os.path.join(OUT_DIR, "chart4_pr_curves.png"))
plt.close()

# ─── CHART 5: Feature Importance ───
print("Generating Chart 5: Feature importance...")
sorted_idx = np.argsort(xgb_importances)
fig, ax = plt.subplots(figsize=(8, 5.5))
bars = ax.barh(np.arange(len(FEATURE_NAMES)), xgb_importances[sorted_idx],
               color='#55A868', edgecolor='white', linewidth=0.5)
ax.set_yticks(np.arange(len(FEATURE_NAMES)))
ax.set_yticklabels([FEATURE_NAMES[i] for i in sorted_idx])
ax.set_xlabel('Mean Feature Importance (XGBoost)')
ax.set_title('Fig. 5: XGBoost Feature Importance Across Six Deficiency Labels')
for bar, val in zip(bars, xgb_importances[sorted_idx]):
    ax.text(val + 0.002, bar.get_y() + bar.get_height()/2, f'{val:.4f}', va='center', fontsize=9)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.grid(axis='x', alpha=0.3)
plt.savefig(os.path.join(OUT_DIR, "chart5_feature_importance.png"))
plt.close()

# ─── CHART 6: Hamming Loss & Jaccard ───
print("Generating Chart 6: Hamming loss & Jaccard...")
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4.5))

hloss_vals = [all_results[m]["Hamming Loss"] for m in model_names]
bars1 = ax1.bar(model_names, hloss_vals, color=[COLORS[m] for m in model_names], edgecolor='white', width=0.5)
for bar, val in zip(bars1, hloss_vals):
    ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.001,
             f'{val:.4f}', ha='center', va='bottom', fontsize=10, fontweight='bold')
ax1.set_ylabel('Hamming Loss (lower = better)')
ax1.set_title('Fig. 6a: Hamming Loss Comparison')
ax1.spines['top'].set_visible(False)
ax1.spines['right'].set_visible(False)
ax1.grid(axis='y', alpha=0.3)

jacc_vals = [all_results[m]["Jaccard (%)"] for m in model_names]
bars2 = ax2.bar(model_names, jacc_vals, color=[COLORS[m] for m in model_names], edgecolor='white', width=0.5)
for bar, val in zip(bars2, jacc_vals):
    ax2.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.3,
             f'{val:.1f}%', ha='center', va='bottom', fontsize=10, fontweight='bold')
ax2.set_ylabel('Jaccard Score (%)')
ax2.set_title('Fig. 6b: Jaccard Score Comparison')
ax2.set_ylim(80, 95)
ax2.spines['top'].set_visible(False)
ax2.spines['right'].set_visible(False)
ax2.grid(axis='y', alpha=0.3)

plt.tight_layout()
plt.savefig(os.path.join(OUT_DIR, "chart6_hamming_jaccard.png"))
plt.close()

print(f"\n{'=' * 60}")
print(f"✅ ALL DONE! Charts saved to: {os.path.abspath(OUT_DIR)}")
print(f"{'=' * 60}")
for f in sorted(os.listdir(OUT_DIR)):
    fpath = os.path.join(OUT_DIR, f)
    size_kb = os.path.getsize(fpath) / 1024
    print(f"  📊 {f} ({size_kb:.1f} KB)")
