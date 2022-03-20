// Global Variables
let CURRENT_TURN = 1;
let BOARD = []

// Helper Functions

const getAvailableMoves = selectedCellInfo => {
    const availableMoves = [];
    const { type, player, posX, posY } = selectedCellInfo;
    const currentPlayer = `p${CURRENT_TURN}`;
    
    if (type === "pawn") {
        if (player === 1) {
            availableMoves.push({ posX, posY: posY + 1})
            if (posY === 1) availableMoves.push({ posX, posY: posY + 2})
        } else {
            availableMoves.push({ posX, posY: posY - 1})
            if (posY === 6) availableMoves.push({ posX, posY: posY - 2})
        }
    }

    // Remove the spots where there is another 

    return availableMoves;
}

// Elements
const cells = document.getElementsByClassName("cell")


const onPieceSelect = selectedCellInfo => {
    const availableMoves = getAvailableMoves(selectedCellInfo);
    const selectedCell = $(`#${selectedCellInfo.id}`);

    if (selectedCell.hasClass("selected-cell")) {
        selectedCell.removeClass("selected-cell");
    } else {
        selectedCell.addClass("selected-cell");
    }

    for (let move = 0; move < availableMoves.length; move++) {
        const { posX, posY } = availableMoves[move];
        const cellNum = posX + (8 * posY) + 1;
        const availableCell = $(`.cell:nth-of-type(${cellNum})`);

        if (selectedCell.hasClass("selected-cell")) {
            availableCell.addClass("available-cell");
        } else {
            availableCell.removeClass("available-cell");
        }
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
        const cell = {
            id: cellId,
            player: parseInt(cellData[0].slice(1)),
            posX,
            posY,
            type: cellData[1],
            variant: cellData[2],
        }
        row.push(cell)

        $(cellSelector).click(() => onPieceSelect(cell))

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
            player: null,
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
