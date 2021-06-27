from flask import Flask, request, render_template, jsonify, Response 
import sqlite3

"""This Initializes a Flask app"""
app = Flask(__name__, 
            template_folder='templates',
            static_folder='static'
            )


def does_api_exist(api):
    """
        This Checks if a api_key exists, and returns the id,
        of the user it exist for
    """
    query = "select id from Users where api_key='{}'".format(api)
    conn = sqlite3.connect('server.db')
    cursor = conn.cursor()
    cursor.execute(query)
    ids = cursor.fetchone()
    conn.close()

    if ids == None:
        return False
    return [True, ids]


@app.route('/get_GCOM', methods=['POST'])
def get_GCOM():
    """
        This is api route, meaning that it will only send
        file data, if the api_key matches at least one user
        in the database. It sends js and css file. For
        the logic and the looks of your web application
    """
    api_key = request.get_json()['API_KEY']
    exist_ = does_api_exist(api_key)
    if type(exist_) == list:
        data= open('static/js/GCOM.js', 'r').read()
        style=  open('static/css/GCOM.css', 'r').read()
        return jsonify({'data': "\n"+data, 'style':style})
    return jsonify({'data':'\n', 'style': '\n'})


def add_comment(name, message, URL, user_id):
    """
        This adds a new comment to your database.
        The comment table looks like so 

        Comment = {
            'id': 'ID OF COMMENT',

            'Name': "NAME OF THE THE PERSON THAT SEND THE COMMENT. 
                    If a name was not provided, the name would be,
                    DEFAULT",

            'URL': "The URL the comment belongs to,
                    Comments are designated to certain urls, to simplify
                    the process of adding and retriving a comment"
            
            "User_id": "The user_id is connected with what api_key was 
                        used to post the comment"

        }
    """
    query = "insert into Comments (name, message, URL, user_id) values ('{}', '{}', '{}', {})".format(name, message, URL, user_id)
    conn = sqlite3.connect('server.db')
    cursor = conn.cursor()
    cursor.execute(query)
    conn.commit()
    conn.close()

@app.route('/set_GCOM', methods=['POST'])
def set_GCOM():
    """
        This is a api routes, that adds a comment to the database
    """
    data = request.get_json()
    exist_ = does_api_exist(data['API_KEY'])
    if type(exist_) == list:
        add_comment(data['name'], data['Message'], data['URL'], exist_[1][0])
        return jsonify({'return': 'Success'})
    return jsonify({'return':'Incorrect API_KEY'})

def load_comments(URL):
    """
        This functions grabs comments from database based
        on the comment url
    """
    query = """select name, message from Comments where URL='{}'""".format(URL)
    conn = sqlite3.connect('server.db')
    cursor = conn.cursor()
    cursor.execute(query)
    Messages = cursor.fetchall()
    m = []
    for me in Messages:
        m.append({'name': me[0], 'message': me[1]})
    conn.close()
    return m

@app.route('/grab/comments')
def grab_comments():
    """
        Starts a event stream, sending comment data to client
        for it to continuesly load new comments
    """
    URL = request.args['URL']
    def eventStream():
        while True:
            messages = load_comments(URL)
            yield 'data:{}\n\n'.format(messages)

    exist_ = does_api_exist(request.args['API_KEY']) 
    if type(exist_) == list:
        return Response(eventStream(), mimetype="text/event-stream")
    else:
        return jsonify({'return': "Incorrect API_KEY"})

if __name__ == '__main__':
    app.run(debug=True)