from flask import Flask, render_template, url_for, redirect, request
from data_manager import *


app = Flask(__name__)


card_number = 5



@app.route('/')
def index():
    return render_template("index.html")



@app.route('/game')
def game():
    cards = get_cards("easy")
    randomized_pairs(cards)
    return render_template("game.html",cards=cards)



if __name__ == "__main__":
    app.run(
        debug=True
    )