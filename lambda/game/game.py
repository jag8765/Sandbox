import boto3
from json import loads

CHESS_TEMPLATE_PATH = "./chess_template.json"
LETTER_LIST = ["a", "b", "c", "d", "e", "f", "g", "h"]
NUMBER_LIST = ["1", "2", "3", "4", "5", "6", "7", "8"]

class Chess:
    def __init__(self, current_spot: str, desired_spot: str):
        self.current_spot = list(current_spot)
        self.desired_spot = list(desired_spot)
        # with open(CHESS_TEMPLATE_PATH, 'r') as file:
        #     self.chess_template = loads(file.read())['positions']["L"]

    def post_move(self):
        """
        Make change to JSON file to move piece
        - check if proper turn
        - check if another item in spot
            - if same color, do nothing
            - if other color, replace and set piece to null
        """
        with open(CHESS_TEMPLATE_PATH, 'r') as file:
            chess_template = loads(file.read())

        # with open(CHESS_TEMPLATE_PATH, 'w') as file:
        #     file

    def piece_check():
        """
        check for friendly or enemy piece
        """

    def knight_move(self):
        ""

    def pawn_move(self):
        ""

def main():
    """
    color and piece input, piece determines which function is used
    """
    current_spot = "A1"
    desired_spot = "B1"
    chess = Chess(current_spot, desired_spot)
    chess.pawn_move()
    
main()