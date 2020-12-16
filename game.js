// Global Variables
let CURRENT_TURN = 1
let P1_PIECES = []
let P2_PIECES = []

const piece = {
    posX: 0,
    posY: 0,
    type: "rook",
}

// Helper Functions

// const cellOwner = (cell) => {
//     cellOwner
// }

// Elements
const cells = document.getElementsByClassName("cell")


const onPieceSelect = selector => {
    
}

for (let i = 0; i < cells.length; i++) {
    const cellId = cells[i].id;
    const cellSelector = `#${cellId}`;
    const cellData = cellId.split("-")

    const posX = i % 8;
    const posY = Math.floor(i / 8);

    if (cellData.length === 3) {
        if (cellData[0] === "p1") {
            P1_PIECES.push({
                id: cellId,
                posX,
                posY,
                type: cellData[1],
                variant: cellData[2],
            })
        }
        else if (cellData[0] === "p2") {
            P2_PIECES.push({
                id: cellId,
                posX,
                posY,
                type: cellData[1],
                variant: cellData[2],
            })
        }
    }

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
}
