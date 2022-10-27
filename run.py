from flask import Flask, render_template, url_for
import os
import pandas as pd

from projects.bitcoin_risk.main import main
from forms import BitcoinRiskForm

import json

app = Flask(__name__)

app.config['SECRET_KEY'] = '383342493182458560de5960d00a1f37b49cf9d4334e842e1f07c1454a35d99e5f466fd649839ec0069f2c5e2990995d838466a9baf3fa1a53a7f5a78a087da0'

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/projects')
def projects():
    return render_template("projects.html", title="Projects")


@app.route('/artificial-intelligence')
def artificial_intelligence():
    return render_template("artificial-intelligence.html")


@app.route('/web-development')
def web_development():
    return render_template("web-development.html")


@app.route('/data-science', methods=["GET", "POST"])
def data_science():
    d = {'Daily': 'd', 'Weekly': 'wk', 'Monthly': 'mo'}

    form = BitcoinRiskForm()
    if form.validate_on_submit():
        candles = d[form.candles.data]
        period = form.period.data

    else:
        candles = 'wk'
        period = 14

    data = main(candles, period)

    close = list(data['Close'].values())
    date  = list(data['Date'].values())
    vol   = list(data['Volatility'].values())

    vol = vol[-period:] + vol[:-period] # move trailing zeroes to list start

    return render_template("data-science.html",
                            period=period,
                            candles=candles,
                            close=json.dumps(close),
                            date=json.dumps(date),
                            vol=json.dumps(vol),
                            form=form)


@app.route('/fuzzy-logic-control')
def fuzzy():
    return render_template("fuzzy.html")


if __name__ == '__main__':
    app.run(debug=False)


# add learning content
