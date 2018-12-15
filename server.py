from flask import Flask, render_template, url_for, redirect, request, jsonify, session, flash
from flask_uploads import UploadSet, configure_uploads, IMAGES
from data_manager import *
import os


app = Flask(__name__)
photos = UploadSet('photos',IMAGES)
app.config["UPLOADED_PHOTOS_DEST"] = 'static/pics'
configure_uploads(app,photos)
app.secret_key = "very secret key"



@app.before_first_request
def clear_session():
    session.clear()



@app.route('/',methods=['GET','POST'])
def admin():
    if request.method == 'POST' and request.files:
        files = request.files.getlist("images")
        for file in files:
            filename = file.filename
            try:
                photos.save(file)
                add_image_to_db(filename)
                flash(f"{filename} image have been successfully uploaded", "success")
            except Exception:
                flash(f"Error: {filename} could not been", "fail")
        return redirect(request.referrer)
    images = get_images_from_db()
    if not images:
        flash("There are no images in the database!","fail")
        return render_template("index.html",images=images)
    return render_template("index.html",images=images)



@app.route('/delete_image/',methods=["POST"])
def delete_image():
    for filename in request.form:
        try:
            os.remove("static/pics/" + filename)
            remove_image_from_db(filename)
            flash(f"{filename} has been successfully deleted!", "success")
        except Exception:
            flash(f"Error: {filename} couldn't be deleted!","fail")
    return redirect(request.referrer)



@app.route('/game', methods=["POST", "GET"])
def game():
    if request.method == "POST":
        session["nick_name"] = request.form.get("nick_name", "")
        session["difficulty"] = request.form.get("difficulty", "")
        cards = get_cards(session.get('difficulty'))
        randomized_pairs(cards)
        return jsonify({"cards": cards})
    return render_template("game.html")



@app.route("/highscore", methods=["POST"])
def highscore():
    try:
        new_highscore(session.get("nick_name"),session.get("difficulty"))
    except Exception:
        update_highscore(session.get("nick_name"),session.get("difficulty"))
    highscores = get_highscores()
    return jsonify({"highscores": highscores})



if __name__ == "__main__":
    app.run(
        debug=True,
    )