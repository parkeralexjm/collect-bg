import json

with open('id_list.json', 'r', errors="ignore") as file:
    data = json.load(file)
    # data['item'] is the array of games, go over the array and for each game, return a dict
    ids = ''
    for game in data['item'][:100]:

        ids += (f',{game["_objectid"]}')
        print(ids)

    # print('original', data['item'])

    newData = json.dumps(ids)

with open('game-seeds-modified.json', 'w') as file:
    file.write(newData)
