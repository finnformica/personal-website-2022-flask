import datetime
import pandas as pd
import numpy as np
from statistics import mean
import matplotlib.pyplot as plt

ticklist = ['BTC', 'ETH', 'ADA', 'LINK']
tick = 'ADA'
interval = '1D'


def calculate_daily_average(tick, interval):

    current_day = datetime.datetime.today().weekday()  # finds the current day as an integer Mon = 0
    data = pd.read_csv(f'data/{tick}_{interval}.csv', index_col='Date', parse_dates=True).drop(['Volume', 'Adj Close'], axis=1).iloc[::-1]
    data['Percent'] = (data['Close']/data['Close'].shift(-1)-1).fillna(0)

    days = [[] for i in range(7)]
    for i, close in enumerate(data['Percent'][:21]):
        days[(current_day + i) % 7].append(close)

    averages = [mean(day)*100 for day in days]
    return averages


def plot(ticklist, interval, graph):

    for tick in ticklist:
        averages = calculate_daily_average(tick, interval)

        if graph == 'line':
            fig = plt.figure(figsize=(15, 7))
            ax1 = fig.add_subplot(1, 1, 1)
            ax1.plot(averages)
            ax1.set_ylabel('Percent change (%)')
            ax1.set_xlabel('Day')
            ax1.set_title(f'Average change across each day for {tick}')

        if graph == 'bar':
            fig, ax = plt.subplots(figsize=(15, 7))
            index = np.arange(7)
            plt.bar(index, averages, label=f'{tick}')
            plt.xlabel('Day')
            plt.ylabel('Percent change across the day')
            plt.title(f'Average change across each day for {tick}')

    plt.show()


plot(ticklist, interval, 'bar')
