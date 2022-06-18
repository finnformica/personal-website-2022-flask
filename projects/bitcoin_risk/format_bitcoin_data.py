import pandas as pd

skip_w = lambda x : x % 7 != 0
skip_m = lambda x : x

df_w = pd.read_csv(f'data/btc-daily.csv', skiprows=skip_w)


print(df_w)

df_w.to_csv('data/btc-w.csv')
