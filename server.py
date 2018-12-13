from flask import Flask, render_template, url_for, redirect, request, jsonify, session
from data_manager import *


app = Flask(__name__)
app.secret_key = "very secret key"


@app.before_first_request
def clear_session():
    session.clear()


@app.route('/')
def index():
    return render_template("index.html")



@app.route('/game', methods=["POST", "GET"])
def game():
    if request.method == "POST":
        session["nick_name"] = request.form.get("nick_name", "")
        difficulty = request.form.get("difficulty", "")
        cards = get_cards(difficulty)
        randomized_pairs(cards)
        print(cards)
        return jsonify({"cards": cards})
    return render_template("game.html")

@app.route("/win", methods=["POST"])
def win():
    return jsonify({"response": "ok"})



if __name__ == "__main__":
    app.run(
        debug=True,
    )