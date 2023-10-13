import json

with open('./seeds/board-game-seeds.json', 'r', errors="ignore") as file:
    data = json.load(file)
    # data['item'] is the array of games, go over the array and for each game, return a dict
    # categories = []
    # for game in data['games']:
    #     for option in game['link']:
    #         if option['_type'] == 'boardgamecategory':
    #             new_category = {
    #                 "id": option['_id'],
    #                 "name": option['_value']
    #             }
    #             if new_category not in categories:
    #                 categories.append(new_category)
    # mechanics = []
    # for game in data['games']:
    #     for option in game['link']:
    #         if option['_type'] == 'boardgamemechanic':
    #             new_category = {
    #                 "id": option['_id'],
    #                 "name": option['_value']
    #             }
    #             if new_category not in mechanics:
    #                 mechanics.append(new_category)

    for game in data:
        del game['fields']['image']

    newData = json.dumps(data, indent=2)

with open('board-game-seeds.json', 'w') as file:
    file.write(newData)
