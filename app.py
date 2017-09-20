import flask
app = flask.Flask(__name__)

@app.route('/')
def home():
	return flask.send_file('home.html')

@app.route('/game')
def game():
	return flask.send_file('game/index.html')

@app.route('/<path:path>')
def stat(path):
	try:
		return flask.send_file('game/' + path)
	except:
		return flask.abort(404)

if __name__ == '__main__':
	from os import path, walk

	extra_dirs = ['game',]
	extra_files = extra_dirs[:]
	for extra_dir in extra_dirs:
		for dirname, dirs, files in walk(extra_dir):
			for filename in files:
				filename = path.join(dirname, filename)
				if path.isfile(filename):
					extra_files.append(filename)
	app.run(host='10.138.186.201', debug=True, use_reloader=True, extra_files=extra_files)
