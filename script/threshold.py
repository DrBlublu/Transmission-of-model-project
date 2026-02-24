import os
import pandas as pd
import numpy as np
from scipy import stats
from scipy.interpolate import interp1d
from scipy.optimize import brentq

results_dir = '../data/processed/threshold'
results_paths = []
for folder, subs, files in os.walk(results_dir):
  for filename in files:
    if filename.endswith(".csv") and 'fitted_parameters' in filename:
      results_paths.append(os.path.abspath(os.path.join(folder, filename)))
df_sim  = [pd.read_csv(f,sep=',') for f in results_paths]
df_sim_summary  = pd.concat(df_sim, ignore_index=True)

# Collect tipping points for all generations

understanding_bins = np.linspace(df_sim_summary['simulated_transition_understanding_end'].min(), 
                                 df_sim_summary['simulated_transition_understanding_end'].max(), 10)
df_sim_summary['understanding_bin'] = pd.cut(df_sim_summary['simulated_transition_understanding_end'], bins=understanding_bins, include_lowest=True)

tipping_points = []

for gen in df_sim_summary['generation'].unique():
    # Calculate derivatives for this generation
    derivatives = []
    for bin_interval in df_sim_summary['understanding_bin'].unique():
        if pd.isna(bin_interval):
            continue
        
        subset = df_sim_summary[(df_sim_summary['understanding_bin'] == bin_interval) &
                                (df_sim_summary['generation'] == gen)]
        
        if len(subset) > 2:
            slope, intercept, r_value, p_value, std_err = stats.linregress(subset['w'], subset['simulated_score_corrected'])
            midpoint = bin_interval.mid
            
            derivatives.append({
                'understanding_midpoint': midpoint,
                'derivative': slope
            })
    
    derivative_df_gen = pd.DataFrame(derivatives).sort_values('understanding_midpoint')
    
    # Find tipping point for this generation
    if (derivative_df_gen['derivative'].min() < 0) and (derivative_df_gen['derivative'].max() > 0):
        try:
            f = interp1d(derivative_df_gen['understanding_midpoint'], derivative_df_gen['derivative'], kind='linear')
            x_min = derivative_df_gen['understanding_midpoint'].min()
            x_max = derivative_df_gen['understanding_midpoint'].max()
            tipping_point = brentq(f, x_min, x_max)
            
            tipping_points.append({
                'generation': gen,
                'tipping_point': tipping_point
            })
            print(f"Generation {gen}: Tipping point = {tipping_point:.4f}")
        except:
            tipping_points.append({'generation': gen, 'tipping_point': np.nan})
            print(f"Generation {gen}: Could not find tipping point")
    else:
        tipping_points.append({'generation': gen, 'tipping_point': np.nan})
        print(f"Generation {gen}: Derivative doesn't cross zero")

df_tipping_points = pd.DataFrame(tipping_points).sort_values('generation')

df_tipping_points.to_csv("df_threshold.csv", index=False)