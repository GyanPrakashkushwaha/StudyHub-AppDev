from flask import (
    Flask, render_template, request,
    redirect, url_for, flash
)
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    LoginManager, UserMixin, login_user,
    logout_user, login_required, current_user
)
from werkzeug.security import generate_password_hash, check_password_hash #flask_bcyrpt
import os

app = Flask(__name__)
app.secret_key = "supersecretkey123"

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(255))  # hashed

    def __repr__(self):
        return f"<User {self.username} {self.password}>"

@login_manager.user_loader
def load_user(user_id): #current_user
    print(user_id, User.query.get(int(user_id)))
    return User.query.get(int(user_id))

def init_db():
    if not os.path.exists("instance/users.db"):
        with app.app_context():
            db.create_all()
            # default admin user
            admin = User(
                username="admin",
                password=generate_password_hash("admin123")
            )
            user2 = User(
                username="himanshu",
                password=generate_password_hash("hello123")
            )
            db.session.add(admin)
            db.session.add(user2)
            db.session.commit()
            print("Created DB with default admin user")


@app.route("/")
def home():
    print(current_user) #session User who is currently logged in <User admin>
    if current_user.is_authenticated: # session["password"] == USER TABLE SQL User.query.filter_by(password == generate_password_hash("admin123"))
        return render_template("home_logged_in.html")
    return render_template("home_logged_out.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form["password"]

        user = User.query.filter_by(username=username).first() # Filtered for same username in my table for getting User object

        if not user: #PASSED
            flash("❌ User does not exist", "danger")
            return redirect(url_for("login"))

        if not check_password_hash(user.password, password): #PASS
            flash("❌ Incorrect password", "danger")
            return redirect(url_for("login"))

        login_user(user, remember=True) #session.permanent = True
        # session dictionary
        # {'user_id': 2} currently logged in person session id 1
        # current_user = 2
        # does session['user_id'] = str(user.get_id())
        # current_user = set as this user
        flash("✅ Login successful!", "success")
        return redirect(url_for("profile"))

    return render_template("login.html")


@app.route("/profile")
@login_required #user.is_authenticated == True
# session["username"] == user.query
def profile():
    return render_template("profile.html", username=current_user.username)


@app.route("/logout")
@login_required
def logout():
    logout_user() #session.pop("user_id") {"user_id": 2} DELETED -> {}
    flash("You have been logged out.", "info")
    return redirect(url_for("home"))



if __name__ == "__main__":
    init_db()
    app.run(debug=True)

# login_user <-> logout_user
# generate_password_hash <-> check_password_hash


# @app.route("/login", methods=["POST"])
# def login():
#     username = request.form["username"]
#     password = request.form["password"]

#     # BAD! Directly inserting user input
#     query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
#     user = db.engine.execute(query).fetchone()

#     if user:
#         return "Logged in!"
#     return "Invalid"

# def manual_login_user_tasks(user, remember=False, force=False, fresh=True):
#     """
#     Equivalent internal tasks of flask_login.login_user().
#     Note: This is a simplified approximation and does not cover
#     all edge cases or security measures of the official library.
#     """
#     if not force and not user.is_active:
#         return False  # User must be active to log in unless forced

#     # 1. Store the user ID in the Flask session
#     # The user ID is retrieved via the User model's get_id() method
#     session['user_id'] = user.get_id()
#     session['_fresh'] = fresh

#     # 2. Set up session expiration (for 'remember me' functionality)
#     if remember:
#         # If 'remember me' is True, set a long-term cookie expiration
#         # The actual duration is often configured in the Flask app config
#         (e.g., PERMANENT_SESSION_LIFETIME)
#         session.permanent = True
#         # The specific expiry time is handled by the browser/Flask configuration
#     else:
#         session.permanent = False

#     # 3. Handle session token/security hash (simplified)
#     # Flask-Login adds a secure hash to the session to prevent session tampering
#     # This part is complex to replicate manually without the library's internal logic.

#     # 4. Signal that the user has been logged in
#     # Flask-Login sends a signal which can be caught by other parts of the app
#     user_logged_in.send(current_app._get_current_object(), user=user)

#     # Note: The actual setting of the cookies is handled by Flask's response
#     # mechanism at the end of the request cycle, not directly in this function.

#     return True
# def manual_logout_equivalent():
#     if current_user.is_authenticated:
#         # 1. Mark the user as inactive for the current request
#         #    (Flask-Login does this internally by managing 'current_user' proxy state)
#         pass # The function itself manages this

#     # 2. Clear the user's ID from the session cookie
#     #    (This is the primary action of logout_user())
#     if 'user_id' in session:
#         del session['user_id']
    
#     # 3. Handle 'remember me' functionality by deleting the relevant cookie
#     #    (Flask-Login manages the cookie names, but it involves similar session clearing)
#     #    The 'logout_user' function implicitly invalidates the session and potentially the 'remember_token' cookie.

#     # 4. Flash messages or redirection logic
#     #    (These are application-specific tasks that often follow logout_user())

#     # After these steps, subsequent requests will trigger the `user_loader`
#     # callback, which, finding no valid user_id in the session,
#     # will set `current_user` to an `AnonymousUserMixin` object.

