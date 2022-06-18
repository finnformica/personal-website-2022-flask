import pandas as pd
import numpy as np
import datetime
import csv

import pandas_datareader.data as pdr
import matplotlib.pyplot as plt

def scrape_data(interval): # interval 1M : mo | 1W : wk | 1D : d

    start_date = '2021-03-08' # date when archive data ends
    end_date = datetime.datetime.today()

    # scrape from yahoo finance
    data = pdr.get_data_yahoo('BTC-USD', start_date, end_date, interval=interval)

    return data.iloc[::-1] # rerverse order before returning


def concat_data(filename, interval):

    df2 = scrape_data(interval)

    if interval == 'wk':
        skip = lambda x : x % 7 != 0
        df1 = pd.read_csv(f'projects/bitcoin_risk/data/btc-{interval}.csv', index_col='Date', parse_dates=True, skiprows=skip) # read archive data

    else:
        df1 = pd.read_csv(f'projects/bitcoin_risk/data/btc-{interval}.csv', index_col='Date', parse_dates=True) # read archive data

    return df2.append(df1) # return dataframes together


def retreive_btc_data(interval):

    filename = f'projects/bitcoin_risk/data/new-btc-{interval}.csv'

    data = concat_data(filename, interval)
    data = data.drop(columns=['Volume', 'Adj Close'])

    return data


def calculate_volatility(data, period):

    # calculate volatility as a percentage of standard deviation
    data['Volatility'] = data['Close'].rolling(period).std()*np.sqrt(period)

    # calculate volatility as the standard deviation of the log of daily returns
    data['Returns'] = np.log(data['Close'] / data['Close'].shift(1))
    data['Volatility'] = data['Returns'].rolling(period).std()*np.sqrt(252)

    return data


def format_data(data):
    data = data.iloc[::-1]
    data['Date'] = data.index
    data['Date'] = data['Date'].view(np.int64) // 10 ** 9

    data.reset_index(drop=True, inplace=True)
    data.fillna(0, inplace=True)

    return data


def main(interval, period): # interval : d or wk

    data = retreive_btc_data(interval)
    data = calculate_volatility(data, period)
    data = format_data(data)

    # data.to_csv(f'projects/bitcoin_risk/data/btc-{interval}-js.csv', index=False)

    return data.to_dict()


if __name__ == '__main__':
    main('wk', 12)
