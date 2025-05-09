var bMineDefeat = false
var chess_level = 0
//0:easy,1:middle;2:hard
var RowCount = 8
var ColCount = 8
var chessnum = 8
var minenum = 10
var iFindMineNumber = 0
var hx1 = 10;
var hy1 = 3;
var bh = 40;
var bw = bh;
var sChessmine = null;
var game_result;
//0:success,1:fail,2:processing
var bChessInited = false;
class Chessmantype {
    constructor() {
        this.bMineType = false;
        this.iMineNum = 0;
        this.bCheck = false;
        this.eGridType = 0;//0:normal,1:flag,2:interrogation,3:clickopen,4:defeat
        this.x = 0;
        this.y = 0;
    }
    getMinetype() {
        return this.bMineType;
    }

    setMinetype(t) {
        this.bMineType = t;
    }
    setMinenum(n){
        this.iMineNum = n;
    }
    setCheck(c){
        this.bCheck = c;
    }
    setGridtype(t){
        this.eGridType = t;
    }
    setPlace(px,py){
        this.x = px;
        this.y = py;
    }
}
function getChessInitedValue() {
    console.log("getChessInitedValue bChessInited:" + bChessInited)
    return bChessInited;
}
function getHx1(){
    return hx1;
}
function getHy1() {
    return hy1;
}
function getBh(){
    return bh;
}
function getBw(){
    return bw;
}
function setGameResult(t){
    game_result = t;
}

function getGamedefeat() {
    return bMineDefeat;
}
function setGamedefeat(p1) {
    bMineDefeat = p1;
}
function setChessLevel(level) {
    chess_level = level;
}
function getChessLevel() {
    return chess_level;
}
function getChessnum(){
    return chessnum;
}
function getMinenum(){
    return minenum;
}
function getRemainMinenum() {
    return minenum - iFindMineNumber;
}

function setMineNumber(iValue)
{
    if (iValue > 0)
    {
        if (iFindMineNumber >= minenum)
        {
            return minenum;
        }
        iFindMineNumber++;
    }
    else if (iValue < 0)
    {
        if (iFindMineNumber <= 0)
        {
            return 0;
        }
        iFindMineNumber--;
    }
    return iFindMineNumber;
}

function setMines(iRow,iCol)
{
    if (sChessmine[iRow][iCol].bCheck)
        return;
    if (sChessmine[iRow][iCol].iMineNum !== 0)
    {
        sChessmine[iRow][iCol].setGridtype(3);
        sChessmine[iRow][iCol].setCheck(true);
        return;
    }
    sChessmine[iRow][iCol].setGridtype(3);
    sChessmine[iRow][iCol].setCheck(true);
    if ((iRow === 0) && (iCol === 0))//1
    {
        setMines(iRow,iCol + 1);//2
        setMines(iRow + 1,iCol + 1);//5
        setMines(iRow + 1,iCol);//4
    }
    else if ((iRow === 0) && (0 < iCol) && (iCol < chessnum - 1))//2
    {
        setMines(iRow,iCol - 1);//1
        setMines(iRow,iCol + 1);//3
        setMines(iRow + 1,iCol - 1);//4
        setMines(iRow + 1,iCol);//5
        setMines(iRow + 1,iCol + 1);//6
    }
    else if ((iRow === 0) && (iCol === chessnum - 1))//3
    {
        setMines(iRow,iCol - 1);//2
        setMines(iRow + 1,iCol - 1);//5
        setMines(iRow + 1,iCol);//6
    }
    else if ((0 < iRow) && (iRow < chessnum - 1) && (iCol === 0))//4
    {
        setMines(iRow - 1,iCol);//1
        setMines(iRow - 1,iCol + 1);//2
        setMines(iRow,iCol + 1);//5
        setMines(iRow + 1,iCol + 1);//8
        setMines(iRow + 1,iCol);//7
    }
    else if ((0 < iRow) && (iRow < chessnum - 1) && (iCol === chessnum - 1))//6
    {
        setMines(iRow - 1,iCol - 1);//2
        setMines(iRow - 1,iCol);//3
        setMines(iRow,iCol - 1);//5
        setMines(iRow + 1,iCol - 1);//8
        setMines(iRow + 1,iCol);//9
    }
    else if ((iRow === chessnum - 1) && (iCol === 0))//7
    {
        setMines(iRow - 1,iCol);//4
        setMines(iRow - 1,iCol + 1);//5
        setMines(iRow,iCol + 1);//8
    }
    else if ((iRow === chessnum - 1) && (0 < iCol) && (iCol < chessnum - 1))//8
    {
        setMines(iRow - 1,iCol - 1);//4
        setMines(iRow - 1,iCol);//5
        setMines(iRow - 1,iCol + 1);//6
        setMines(iRow,iCol - 1);//7
        setMines(iRow,iCol + 1);//9
    }
    else if ((iRow === chessnum - 1) && (iCol === chessnum - 1))//9
    {
        setMines(iRow - 1,iCol);//6
        setMines(iRow - 1,iCol - 1);//5
        setMines(iRow,iCol - 1);//8
    }
    else//5
    {
        setMines(iRow - 1,iCol - 1);//1
        setMines(iRow - 1,iCol);//2
        setMines(iRow - 1,iCol + 1);//3
        setMines(iRow,iCol - 1);//4
        setMines(iRow,iCol + 1);//6
        setMines(iRow + 1,iCol - 1);//7
        setMines(iRow + 1,iCol);//8
        setMines(iRow + 1,iCol + 1);//9
    }
}

function ifExistMineInCurrentCol(icol){
    var i = 0;
    for (i = 0;i < chessnum;i++){
        var bt = sChessmine[i][icol];
        if (bt.bMineType)
            return true;
    }
    return false;
}
function getChessmanValue() {
    return sChessmine;
}
function getChessNumber(mousex,mousey) {
    for (var i = 0;i < chessnum;i++)
    {
        for (var j = 0;j < chessnum;j++)
        {
            if ((sChessmine[i][j].x < mousex) && (mousex < sChessmine[i][j].x + bw) &&
                (sChessmine[i][j].y < mousey) && (mousey < sChessmine[i][j].y + bh))
            {
                return [i,j];
            }
        }
    }
    return [-1,-1]
}
function mineOver(){

}
function beginMine(){
    var second = 0;
    /*setInterval(function(){
        second++;
        console.log("beginMine:" + second)
    },1000);*/
}

function ifGameOver(){
    var iMineNumber = 0;
    for (var i = 0;i < chessnum;i++)
    {
        for (var j = 0;j < chessnum ;j++)
        {
            if ((sChessmine[i][j].eGridType === 1) && (sChessmine[i][j].bMineType))
                iMineNumber++;
        }
    }
    for (i = 0;i < chessnum;i++)
    {
        for (j = 0;j < chessnum ;j++)
        {
            if ((!sChessmine[i][j].bMineType) && (sChessmine[i][j].eGridType !== 3))
                return false;
        }
    }
    return (iMineNumber === minenum);
}

function initChessman(level) {
    chess_level = level;
    game_result = 2;
    switch (level)
    {
    case 0:
        RowCount = 8;
        ColCount = 8;
        chessnum = 8;
        minenum = 10;
        hx1 = 10;
        hy1 = 3;
        bh = 40;
        bw = bh;
        break;
    case 1:
        RowCount = 10;
        ColCount = 10;
        chessnum = 10;
        minenum = 15;
        hx1 = 10;
        hy1 = 3;
        bh = 40;
        bw = bh;
        break;
    case 2:
        RowCount = 12;
        ColCount = 12;
        chessnum = 12;
        minenum = 20;
        hx1 = 10;
        hy1 = 3;
        bh = 40;
        bw = bh;
        break;
    }
    var i = 0;
    var j = 0;
    var iMineCol = 0;
    var iMinenum = 0;
    var iMineCount = 0;
    bMineDefeat = false;
    iFindMineNumber = 0;

    sChessmine = new Array(RowCount).fill(0).map(() => new Array(ColCount).fill(0).map(()=>new Chessmantype()));
    for (i = 0;i < RowCount;i++) {
        for (j = 0;j < ColCount;j++){
            sChessmine[i][j].setMinetype(false);
            sChessmine[i][j].setGridtype(0);
            sChessmine[i][j].setCheck(false);
            sChessmine[i][j].setPlace(hx1 + bw * i + 1,hy1 + bh * j + 1);
        }
    }

    console.log("==================position==============");
    i = 0;
    while(i < chessnum){
        iMineCol = Math.floor((Math.random()*chessnum));
        var ifexist = ifExistMineInCurrentCol(iMineCol);
        if ((!sChessmine[i][iMineCol].bMineType) && !ifexist) {
            sChessmine[i][iMineCol].setMinetype(true);
            sChessmine[i][iMineCol].setMinenum(-1);
            i++;
            iMinenum++;
        }
    }
    while (iMinenum < minenum){
        i = Math.floor((Math.random()*chessnum));
        j = Math.floor((Math.random()*chessnum));
        var elemenet = sChessmine[i][j];
        if (!elemenet.bMineType){
            sChessmine[i][iMineCol].setMinetype(true);
            sChessmine[i][iMineCol].setMinenum(-1);
            iMinenum++;
        }
    }
    console.log("iMinenum:" + iMinenum);
    for (i = 0;i < chessnum;i++){
        for (j = 0;j < chessnum;j++){
            elemenet = sChessmine[i][j];
            if (!elemenet.bMineType){
                iMineCount = 0;
                if ((i === 0) && (j === 0))//1
                {
                    if (sChessmine[i][j + 1].bMineType)//2
                        iMineCount++;
                    if (sChessmine[i + 1][j].bMineType)//4
                        iMineCount++;
                    if (sChessmine[i + 1][j + 1].bMineType)//5
                        iMineCount++;
                }
                else if ((i === 0) && (0 < j) && (j < chessnum - 1))//2
                {
                    if (sChessmine[i][j - 1].bMineType)//1
                        iMineCount++;
                    if (sChessmine[i][j + 1].bMineType)//3
                        iMineCount++;
                    if (sChessmine[i + 1][j - 1].bMineType)//4
                        iMineCount++;
                    if (sChessmine[i + 1][j].bMineType)//5
                        iMineCount++;
                    if (sChessmine[i + 1][j + 1].bMineType)//6
                        iMineCount++;
                }
                else if ((i === 0) && (j === chessnum - 1))//3
                {
                    if (sChessmine[i][j - 1].bMineType)//2
                        iMineCount++;
                    if (sChessmine[i + 1][j - 1].bMineType)//5
                        iMineCount++;
                    if (sChessmine[i + 1][j].bMineType)//6
                        iMineCount++;
                }
                else if ((0 < i) && (i < chessnum - 1) && (j === 0))//4
                {
                    if (sChessmine[i - 1][j].bMineType)//1
                        iMineCount++;
                    if (sChessmine[i - 1][j + 1].bMineType)//2
                        iMineCount++;
                    if (sChessmine[i][j + 1].bMineType)//5
                        iMineCount++;
                    if (sChessmine[i + 1][j + 1].bMineType)//8
                        iMineCount++;
                    if (sChessmine[i + 1][j].bMineType)//7
                        iMineCount++;
                }
                else if ((0 < i) && (i < chessnum - 1) && (j === chessnum - 1))//6
                {
                    if (sChessmine[i - 1][j - 1].bMineType)//2
                        iMineCount++;
                    if (sChessmine[i - 1][j].bMineType)//3
                        iMineCount++;
                    if (sChessmine[i][j - 1].bMineType)//5
                        iMineCount++;
                    if (sChessmine[i + 1][j - 1].bMineType)//8
                        iMineCount++;
                    if (sChessmine[i + 1][j].bMineType)//9
                        iMineCount++;
                }
                else if ((i === chessnum - 1) && (j === 0))//7
                {
                    if (sChessmine[i - 1][j].bMineType)//4
                        iMineCount++;
                    if (sChessmine[i - 1][j + 1].bMineType)//5
                        iMineCount++;
                    if (sChessmine[i][j + 1].bMineType)//8
                        iMineCount++;
                }
                else if ((i === chessnum - 1) && (0 < j) && (j < chessnum - 1))//8
                {
                    if (sChessmine[i - 1][j - 1].bMineType)//4
                        iMineCount++;
                    if (sChessmine[i - 1][j].bMineType)//5
                        iMineCount++;
                    if (sChessmine[i - 1][j + 1].bMineType)//6
                        iMineCount++;
                    if (sChessmine[i][j - 1].bMineType)//7
                        iMineCount++;
                    if (sChessmine[i][j + 1].bMineType)//9
                        iMineCount++;
                }
                else if ((i === chessnum - 1) && (j === chessnum - 1))//9
                {
                    if (sChessmine[i - 1][j].bMineType)//6
                        iMineCount++;
                    if (sChessmine[i - 1][j - 1].bMineType)//5
                        iMineCount++;
                    if (sChessmine[i][j - 1].bMineType)//8
                        iMineCount++;
                }
                else//5
                {
                    if (sChessmine[i - 1][j - 1].bMineType)//1
                        iMineCount++;
                    if (sChessmine[i - 1][j].bMineType)//2
                        iMineCount++;
                    if (sChessmine[i - 1][j + 1].bMineType)//3
                        iMineCount++;
                    if (sChessmine[i][j - 1].bMineType)//4
                        iMineCount++;
                    if (sChessmine[i][j + 1].bMineType)//6
                        iMineCount++;
                    if (sChessmine[i + 1][j - 1].bMineType)//7
                        iMineCount++;
                    if (sChessmine[i + 1][j].bMineType)//8
                        iMineCount++;
                    if (sChessmine[i + 1][j + 1].bMineType)//9
                        iMineCount++;
                }
                sChessmine[i][j].setMinenum(iMineCount);
            }
        }
    }

    /*console.log("========start===========")
    var sk = "";
    for (i = 0;i < RowCount;i++){
        sk = "";
        for (j = 0;j < ColCount;j++){
            sk = sk + sChessmine[i][j].eGridType + " "
        }
        console.log(sk);
    }*/
    bChessInited = true;
    return sChessmine;
}
