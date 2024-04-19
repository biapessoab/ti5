import serial
import requests

serial_port = '/dev/cu.usbmodem2101'

ser = serial.Serial(serial_port, 9600)

firebase_url = 'https://arduino-ti5-default-rtdb.firebaseio.com/coordenadas.json'  # Substitua pelo URL do seu banco de dados Firebase

try:
    while True:
        data = ser.readline().strip().decode("utf-8")

        latitude, longitude = data.split(",")

        payload = {'latitude': float(latitude), 'longitude': float(longitude)}

        response = requests.post(firebase_url, json=payload)
        print("Enviado: ", payload)

except KeyboardInterrupt:
    ser.close()  
