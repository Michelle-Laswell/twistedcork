import os
os.environ['FLASK_ENV'] = 'development'

from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import check_password_hash, generate_password_hash
import sqlite3

app = Flask(__name__)
app.secret_key = 'your_secret_key'

def get_db_connection():
    conn = sqlite3.connect('data/twistedcork.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('loginForm.html')

@app.route('/submit_order', methods=['POST'])
def submit_order():
    if 'user' not in session:
        session['order'] = request.form.to_dict()
        print("Order data saved in session:", session['order'])  # Debugging statement
        return redirect(url_for('login'))
    
    # Process the order here
    print("Order data received:", request.form.to_dict())  # Debugging statement
    return redirect(url_for('payment'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        print("Login attempt with email:", email)  # Debugging statement
        print("Password received:", password)  # Debugging statement
        
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM customers WHERE email = ?', (email,)).fetchone()
        conn.close()
        
        print("User data retrieved from database:", user)  # Debugging statement
        
        if user is None or not check_password_hash(user['pswd_hash'], password):
            flash('Invalid email or password. Please register.')
            return redirect(url_for('register'))
        
        session['user'] = email
        flash('Login successful!')
        return redirect(url_for('index'))
    
    return render_template('loginForm.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        # Add user to the database
        conn = get_db_connection()
        conn.execute('INSERT INTO customers (email, pswd_hash) VALUES (?, ?)', (email, generate_password_hash(password)))
        conn.commit()
        conn.close()
        
        flash('Registration successful! Please log in.')
        return redirect(url_for('login'))
    
    return render_template('registerForm.html')

if __name__ == '__main__':   
    app.run(debug=True)