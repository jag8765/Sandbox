from boto3 import client
from json import loads
from random import choices
from string import ascii_lowercase, ascii_uppercase, digits, punctuation

PLAYERS_TABLE_NAME = "playersTable"
GAMES_TABLE_NAME = "gamesTable"
CHESS_TEMPLATE_PATH = "./chess_template.json"
PASSCODE_SIZE = 12
MAX_GAMES = 2

class DynamodbClient:
    def __init__(self):
        self.dynamodb = client('dynamodb')

    def too_many_games(self, max_games):
        item_count = self.dynamodb.scan(
            TableName = GAMES_TABLE_NAME
        )['Count']

        if item_count >= max_games:
            return True
        else:
            return False

    def add_game(self, game_id):
        with open(CHESS_TEMPLATE_PATH, 'r') as file:
            chess_template = loads(file.read())

        result = self.dynamodb.put_item(
            TableName = GAMES_TABLE_NAME,
            Item = {
                "game_id": {
                    "S": game_id,
                },
                "game_info": {
                    "M": chess_template,
                },
            }
        )['ResponseMetadata']['HTTPStatusCode']

        return result

    def add_players(self, player1_id, player2_id, game_id):
        player1_response = self.dynamodb.put_item(
            TableName = PLAYERS_TABLE_NAME,
            Item = {
                "player_id": {
                    "S": player1_id,
                },
                "game_id": {
                    "S": game_id,
                },
            }
        )['ResponseMetadata']['HTTPStatusCode']
        player2_response = self.dynamodb.put_item(
            TableName = PLAYERS_TABLE_NAME,
            Item={
                "player_id": {
                    "S": player2_id,
                },
                "game_id": {
                    "S": game_id,
                },
            },
        )['ResponseMetadata']['HTTPStatusCode']

        return player1_response, player2_response


def create_codes(passcode_size):
    player1_id = ''.join(choices(ascii_lowercase + ascii_uppercase + digits + punctuation, k=passcode_size))
    player2_id = ''.join(choices(ascii_lowercase + ascii_uppercase + digits + punctuation, k=passcode_size))
    game_id = ''.join(choices(ascii_lowercase + ascii_uppercase + digits + punctuation, k=passcode_size))

    return player1_id, player2_id, game_id


def lambda_handler(event, context):
    dynamodbClient = DynamodbClient()

    body = {}
    if dynamodbClient.too_many_games(MAX_GAMES):
        body['max_games'] = True
    else:
        body['max_games'] = False

        player1_id, player2_id, game_id = create_codes(PASSCODE_SIZE)

        game_response = dynamodbClient.add_game(game_id)
        player1_response, player2_response = dynamodbClient.add_players(player1_id, player2_id, game_id)
        if game_response == 200 and player1_response == 200 and player2_response == 200:
            body['client_error'] = False
            body['player1_id'] = player1_id
            body['player2_id'] = player2_id
        else:
            body['clientError'] = True

    response = {
        "statusCode": 200,
        "headers": {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : "true",
        "Content-Type": "application/json"
        },
        "body": body
    }
    
    return response
