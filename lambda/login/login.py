from boto3 import client

PLAYERS_TABLE_NAME = "playersTable"
GAMES_TABLE_NAME = "gamesTable"

class DynamodbClient:
    def __init__(self):
        self.dynamodb = client('dynamodb')

    def get_user_info(self, player_id):
        try: 
            return self.dynamodb.get_item(
                TableName=PLAYERS_TABLE_NAME,
                Key={
                    'player_id': {'S': player_id}
                }
            )['Item']
        except KeyError:
            return None

    def check_game_id(self, game_id):
        self.dynamodb


def lambda_handler(event, context):
    dynamodbClient = DynamodbClient()

    body = {}
    player_info = dynamodbClient.get_user_info(event['player_id'])
    if player_info:
        body['invalid_player_id'] = False
        body['game_id'] = player_info['game_id']['S']
        body['player_id'] = event['player_id']
    else:
        body['invalid_player_id'] = True


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
