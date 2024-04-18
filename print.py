import json
import random
import time

def generate_random_coordinate():
    min_lng = -43.952344
    max_lng = -43.938006
    min_lat = -19.951807
    max_lat = -19.940272
    
    lng = round(random.uniform(min_lng, max_lng), 6)
    lat = round(random.uniform(min_lat, max_lat), 6)
    
    return {"lng": lng, "lat": lat}

while True:
    new_coordinate = generate_random_coordinate()

    with open('./src/coordinates.json', 'r') as f:
        coordinates = json.load(f)

    coordinates.append(new_coordinate)

    with open('./src/coordinates.json', 'w') as f:
        json.dump(coordinates, f, indent=4)

    print("Nova coordenada adicionada ao arquivo JSON.")

    time.sleep(10)
