import json

with open('board-game-seeds.json', 'r', errors="ignore") as file:
    data = json.load(file)
    number = 0
    # data['item'] is the array of games, go over the array and for each game, return a dict
    for game in data['games']:
        # Delete any additional names except the primary one
        # del game['name'][1:]

        # Delete game type (its always boardgame)
        # del game['_type']

        # Move the name and id -> "_value" to "name"
        # game["name"] = game["name"][0]["_value"]
        del game['_id']

        # Move the year, min, max, time, age to their keys
        # game["yearpublished"] = game["yearpublished"]["_value"]
        # game["minplayers"] = game["minplayers"]["_value"]
        # game["maxplayers"] = game["maxplayers"]["_value"]
        # game["playingtime"] = game["playingtime"]["_value"]
        # game["minage"] = game["minage"]["_value"]

        # create the new key values
        # game['categories'] = []
        # game['mechanics'] = []

        # For each category and mechanic in the 'link', append it to the list
        # for option in game['link']:
        #     if option['_type'] == "boardgamecategory":
        #         game['categories'].append(option['_value'])
        #     elif option['_type'] == "boardgamemechanic":
        #         game['mechanics'].append(option['_value'])

        # Delete the link list
        # del game['link']

        # remove min maxplay time
        # game.pop("minplaytime")
        # game.pop("maxplaytime")

        print(f"{number} {game['name']}")
        number += 1
    # print('original', data['item'])

    newData = json.dumps(data, indent=4)

with open('board-game-seeds.json', 'w') as file:
    file.write(newData)
