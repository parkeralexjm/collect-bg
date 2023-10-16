import json

with open('./seeds/new-game-seeds.json', 'r', errors="ignore") as file:
    data = json.load(file)
    number = 0
    new_game = []
    # data['item'] is the array of games, go over the array and for each game, return a dict
    for game in data:
        # game['fields']['id'] = game['fields']['pk']
        # del game['fields']['pk']

        # Delete any additional names except the primary one
        # del game['name'][1:]

        # Delete game type (its always boardgame)
        # del game['_type']

        # Move the name and id -> "_value" to "name"
        # game["name"] = game["name"][0]["_value"]
        # del game['categories']
        # del game['fields']['link']

        # Move the year, min, max, time, age to their keys
        # game["yearpublished"] = game["yearpublished"]["_value"]
        # game["minplayers"] = game["minplayers"]["_value"]
        # game["maxplayers"] = game["maxplayers"]["_value"]
        # game["playingtime"] = game["playingtime"]["_value"]
        # game["minage"] = game["minage"]["_value"]

        # create the new key values
        # game['fields']['categories'] = []
        # game['fields']['mechanics'] = []

        # For each category and mechanic in the 'link', append it to the list
        # for option in game['fields']['link']:
        #     if option['_type'] == "boardgamecategory":
        #         game['fields']['categories'].append(option['_id'])
        #     elif option['_type'] == "boardgamemechanic":
        #         game['fields']['mechanics'].append(option['_id'])

        # game['fields']['id'] = game['fields']['_id']

        # remove min maxplay time
        # game.pop("minplaytime")
        # game.-pop("maxplaytime")

        # Change the format to match the model

        # Delete the link list
        # del game['fields']['link']
        # del game['fields']['_id']
        # del game['_type']

        # new_game.append({
        #     "model": "games.game",
        #     "pk": int(game['_id']),
        #     "fields": game
        # })
        # game['fields']['owned'] = ["1"]

        # print(f"{number} {new_game['fields']['name']}")
        # number += 1

    newData = json.dumps(data, indent=2)

with open('new-game-seeds.json', 'w') as file:
    file.write(newData)
