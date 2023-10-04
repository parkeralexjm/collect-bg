import json

with open('./seeds/mechanics-seeds.json', 'r', errors="ignore") as file:
    data = json.load(file)
    number = 0
    new_game = []
    # data['item'] is the array of games, go over the array and for each game, return a dict
    for game in data:
        game['fields']['id'] = game['fields']['pk']
        del game['fields']['pk']

        # Delete any additional names except the primary one
        # del game['name'][1:]

        # Delete game type (its always boardgame)
        # del game['_type']

        # Move the name and id -> "_value" to "name"
        # game["name"] = game["name"][0]["_value"]
        # del game['_id']

        # Move the year, min, max, time, age to their keys
        # game["yearpublished"] = game["yearpublished"]["_value"]
        # game["minplayers"] = game["minplayers"]["_value"]
        # game["maxplayers"] = game["maxplayers"]["_value"]
        # game["playingtime"] = game["playingtime"]["_value"]
        # game["minage"] = game["minage"]["_value"]

        # create the new key values
        # game['categories'] = []
        # game['categories'] = []

        # For each category and mechanic in the 'link', append it to the list
        # for option in game['link']:
        #     if option['_type'] == "boardgamecategory":
        #         game['categories'].append(option['_id'])
        #     elif option['_type'] == "boardgamemechanic":
        #         game['categories'].append(option['_id'])

        # game['id'] = game['_id']

        # remove min maxplay time
        # game.pop("minplaytime")
        # game.pop("maxplaytime")

        # Change the format to match the model

        # Delete the link list
        # del game['link']
        # del game['_id']
        # del game['_type']

        new_game.append({
            "model": "categories.category",
            "pk": int(game['pk']),
            "fields": game
        })

        # print(f"{number} {new_game['fields']['name']}")
        number += 1

    newData = json.dumps(data, indent=2)

with open('categories-seeds.json', 'w') as file:
    file.write(newData)
