// Global Variables
let CURRENT_TURN = 1;
let BOARD = []

// Helper Functions

const getAvailableMoves = (selector) => {

    return [];
}

// Elements
const cells = document.getElementsByClassName("cell")


const onPieceSelect = selector => {
    const availableMoves = getAvailableMoves(selector);

    for (let move = 0; move < availableMoves.length; move++) {
        // const availableCell = CURRENT_TURN === 1 ? P1_PIECES.find()
        // $(availableCell).css("filter","hue-rotate(45deg)");
    }
}

let row = []
for (let i = 0; i < cells.length; i++) {
    const cellId = cells[i].id;
    const cellSelector = `#${cellId}`;
    const cellData = cellId.split("-");

    const posX = i % 8;
    const posY = Math.floor(i / 8);

    if (cellId && cellData.length === 3) {
        row.push({
            id: cellId,
            player: parseInt(cellData[0].slice(1)),
            posX,
            posY,
            type: cellData[1],
            variant: cellData[2],
        })

        $(cellSelector).click(onPieceSelect(cellSelector))

        $(cellSelector).hover(
            () => {
                if ((CURRENT_TURN === 1 && cellData[0] === "p1")
                    || (CURRENT_TURN === 2 && cellData[0] === "p2")
                ) {
                    $(cellSelector).css("filter","hue-rotate(45deg)");
                    $(cellSelector).css("cursor","pointer");
                }
            }, () => {
                $(cellSelector).css("filter","");
                $(cellSelector).css("cursor","");
            }
        );
    } else {
        row.push({
            id: null,
            player: parseInt(cellData[0].slice(1)),
            posX,
            posY,
            type: "empty",
            variant: null,
        })
    }

    if (posX === 7 && row.length > 0) {
        BOARD.push(row);
        row = [];
    }
}

console.log(BOARD)
