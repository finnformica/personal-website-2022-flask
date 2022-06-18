from flask import Flask, render_template, url_for
import os
import pandas as pd

from projects.bitcoin_risk.main import main

import json

app = Flask(__name__)

@app.route('/')
def about():
    return render_template("about.html")


@app.route('/projects')
def projects():
    return render_template("projects.html", title="Projects")


@app.route('/flappy-bird-neat')
def flappy():
    return render_template("flappy-bird.html")


@app.route('/snake')
def snake():
    return render_template("snake.html")


@app.route('/bitcoin-risk-metric')
def bitcoin_risk():
    # use forms to return dropdown content

    data = main('wk', 14)

    close = list(data['Close'].values())
    date  = list(data['Date'].values())
    vol   = list(data['Volatility'].values())

    return render_template("bitcoin-risk.html",
                            close=json.dumps(close),
                            date=json.dumps(date),
                            vol=json.dumps(vol))


@app.route('/fuzzy-logic-control')
def fuzzy():
    return render_template("fuzzy.html")



@app.route('/finn-formica-website')
def website():
    return render_template("website.html")


if __name__ == '__main__':
    app.run(debug=True)


# figure out how to link navbar to id of sections
# add personal skills learnt in projects (time management, dealing with setbacks, documentation...)
# add algorithmic trader and show backtrader UI (maybe make it interactive?)
# implement learning with a carousel
# courses - CS50, Angela Yu, Space Doggos, Blockchain and Money by MIT, fast.ai,
