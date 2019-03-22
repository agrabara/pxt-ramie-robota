// Tutaj ustaw którymi złączkami S1-S8 masz masz podłączone serwa RoboRamienia
// w przypadku płytki sterowniczej DFRobot Micro:bit Driver Expansion Board (v1.0) 
// są to następujące łącza (w przypadku tej konfiguracji):
// S1 - 15 (tutaj podłączona baza)
// S2 - 14 (tutaj podłączone lewe serwo)
// S3 - 13 (tutaj podłączone szczęki)
// S4 - 12 (tutaj podłączone prawe serwo)
// S5 - 11
// S6 - 10
// S7 -  9
// S8 -  8

const SERV_0 = 0
const SERV_1 = 1
const SERV_2 = 2
const SERV_3 = 3
const SERV_4 = 4
const SERV_5 = 5
const SERV_6 = 6
const SERV_7 = 7
const SERV_8 = 8
const SERV_9 = 9
const SERV_10 = 10
const SERV_11 = 11
const SERV_12 = 12
const SERV_13 = 13
const SERV_14 = 14
const SERV_15 = 15

// setup min and max numer of servos to be changed using AB buttons 
const MAX_SERV = 15
const MIN_SERV = 12

// increase/decrease step
const SERV_STEP = 10


const SERV_P = SERV_12 //Prawy
const SERV_S = SERV_13 //Szczęki
const SERV_L = SERV_14 //Lewy
const SERV_B = SERV_15 //Baza

const MIN_SERV_P = 20
const MAX_SERV_P = 140
const MIN_SERV_L = 20

const MAX_SERV_L = 100
const MIN_SERV_S = 80
const MAX_SERV_S = 100
const MIN_SERV_B = 20
const MAX_SERV_B = 150


// Tutaj jest sekcja sterowania serwerem ramienia robota
const CMD_UP = "do_gory"
const CMD_DOWN = "na_dol"
const CMD_LEFT = "w_lewo"
const CMD_RIGHT = "w_prawo"
const CMD_OPEN = "otworz"
const CMD_CLOSE = "zamknij"
const CMD_INIT = "inicjuj"
const CMD_NEXTSERVO = "n_serwo"
const CMD_INC_ANGLE = "zw_kat"
const CMD_DEC_ANGLE = "zm_kat"
const CMD_CHGGROUP = "grupa"
const CMD_EMPTY = "empty"

const CMD_DISPSTR = "#ST#"
const CMD_DSPLED = "#LD#"
const CMD_DSPICON = "w_iko"

const ON = true
const OFF = false

const INIT_GROUP = 12

let LastCmd: string = CMD_EMPTY
let RGrpEndTime: number = 0
let DebugMode = false

let DspVal = ''

let NumerSerwaL: number //Lewe serwo
let KatSerwaL: number
let NumerSerwaP: number //Prawe serwo
let KatSerwaP: number
let NumerSerwaS: number //Szczęki
let KatSerwaS: number
let NumerSerwaB: number //Baza
let KatSerwaB: number

// ustawiam od którego serwa można zacząć kalibrację oraz kąt na 90 stopni
let NumerSerwa = 13
let KatSerwa = 90

function CmdInit() {
    // ustawiamy w pozycji "połowa" - przyda się w kalibracji
    // należy zdjąć ramię serwa i nałożyć je w mniej więcj połowie zakresu roboczego
    NumerSerwaL = SERV_L
    KatSerwaL = 20
    NumerSerwaP = SERV_P
    KatSerwaP = 20
    NumerSerwaS = SERV_S
    KatSerwaS = 80
    NumerSerwaB = SERV_B
    KatSerwaB = 90

    Servo.Servo(0, 90)
    Servo.Servo(1, 90)
    Servo.Servo(2, 90)
    Servo.Servo(3, 90)
    Servo.Servo(4, 90)
    Servo.Servo(5, 90)
    Servo.Servo(6, 90)
    Servo.Servo(7, 90)
    Servo.Servo(8, 90)
    Servo.Servo(9, 90)
    Servo.Servo(10, 90)
    Servo.Servo(11, 90)
    Servo.Servo(SERV_P, KatSerwaP) //prawy   -  20->140
    Servo.Servo(SERV_S, KatSerwaS) //szczęki -  80->100
    Servo.Servo(SERV_L, KatSerwaL) //lewy    -  20->100
    Servo.Servo(SERV_B, KatSerwaB) //baza    -  20->150
    LastCmd = CMD_INIT
}

// Increases angle of servo NumerSerwa by SERV_STEP
function CmdIncAngle() {

    switch (NumerSerwa) {
        case SERV_P:
            KatSerwaP += SERV_STEP
            if (KatSerwaP > MAX_SERV_P) KatSerwaP = MAX_SERV_P
            if (DebugMode) basic.showNumber(Math.round(KatSerwaP / 10))
            break;
        case SERV_L:
            KatSerwaL += SERV_STEP
            if (KatSerwaL > MAX_SERV_L) KatSerwaL = MAX_SERV_L
            if (DebugMode) basic.showNumber(Math.round(KatSerwaL / 10))
            break;
        case SERV_S:
            KatSerwaS += SERV_STEP
            if (KatSerwaS > MAX_SERV_S) KatSerwaS = MAX_SERV_S
            if (DebugMode) basic.showNumber(Math.round(KatSerwaS / 10))
            break;
        case SERV_B:
            KatSerwaB += SERV_STEP
            if (KatSerwaB > MAX_SERV_B) KatSerwaB = MAX_SERV_B
            if (DebugMode) basic.showNumber(Math.round(KatSerwaB / 10))
            break;
        default:
            KatSerwa += SERV_STEP
            if (KatSerwa > 180) KatSerwa = 180
            if (DebugMode) basic.showNumber(Math.round(KatSerwa / 10))
            Servo.Servo(NumerSerwa, KatSerwa)
    }
    Servo.Servo(SERV_P, KatSerwaP) //prawy
    Servo.Servo(SERV_S, KatSerwaS) //szczęki
    Servo.Servo(SERV_L, KatSerwaL) //lewy
    Servo.Servo(SERV_B, KatSerwaB) //baza
    LastCmd = CMD_INC_ANGLE
}

// Decreases angle of servo NumerSerwa by SERV_STEP
function CmdDecAngle() {

    switch (NumerSerwa) {
        case SERV_P:
            KatSerwaP -= SERV_STEP
            if (KatSerwaP < MIN_SERV_P) KatSerwaP = MIN_SERV_P
            if (DebugMode) basic.showNumber(Math.round(KatSerwaP / 10))
            break;
        case SERV_L:
            KatSerwaL -= SERV_STEP
            if (KatSerwaL < MIN_SERV_L) KatSerwaL = MIN_SERV_L
            if (DebugMode) basic.showNumber(Math.round(KatSerwaL / 10))
            break;
        case SERV_S:
            KatSerwaS -= SERV_STEP
            if (KatSerwaS < MIN_SERV_S) KatSerwaS = MIN_SERV_S
            if (DebugMode) basic.showNumber(Math.round(KatSerwaS / 10))
            break;
        case SERV_B:
            KatSerwaB -= SERV_STEP
            if (KatSerwaB < MIN_SERV_B) KatSerwaB = MIN_SERV_B
            if (DebugMode) basic.showNumber(Math.round(KatSerwaB / 10))
            break;
        default:
            KatSerwa -= SERV_STEP
            if (KatSerwa < 0) KatSerwa = 0
            Servo.Servo(NumerSerwa, KatSerwa)
            if (DebugMode) basic.showNumber(Math.round(KatSerwa / 10))
    }
    Servo.Servo(SERV_P, KatSerwaP) //prawy
    Servo.Servo(SERV_S, KatSerwaS) //szczęki
    Servo.Servo(SERV_L, KatSerwaL) //lewy
    Servo.Servo(SERV_B, KatSerwaB) //baza
    LastCmd = CMD_DEC_ANGLE
}



function CmdNextServo() {
    NumerSerwa += 1
    if (NumerSerwa > MAX_SERV) NumerSerwa = MIN_SERV

    //if debug mode ON - display servo ID
    switch (NumerSerwa) {
        case SERV_P:
            if (DebugMode) basic.showString("P")
            break;
        case SERV_S:
            if (DebugMode) basic.showString("S")
            break;
        case SERV_L:
            if (DebugMode) basic.showString("L")
            break;
        case SERV_B:
            if (DebugMode) basic.showString("B")
            break;
        default:
            if (DebugMode) basic.showNumber(NumerSerwa)
    }
    LastCmd = CMD_NEXTSERVO
}


function CmdDown() {

    for (let i = 0; i < 24; i++) {

        KatSerwaP += 5
        if (KatSerwaP > MAX_SERV_P) KatSerwaP = MAX_SERV_P
        if (DebugMode) basic.showNumber(Math.round(KatSerwaP / 10))
        KatSerwaL -= 5
        //ponizej jest +40 aby ograniczyć ruchomość serwo aby za bardzo nie opadło
        if (KatSerwaL < MIN_SERV_L + 40) KatSerwaL = MIN_SERV_L + 40
        if (DebugMode) basic.showNumber(Math.round(KatSerwaL / 10))
        Servo.Servo(SERV_P, KatSerwaP) //prawy   -  20->140
        Servo.Servo(SERV_L, KatSerwaL) //lewy    -  20->100
        basic.pause(50)
    }
    LastCmd = CMD_DOWN
}


function CmdUp() {
    for (let i = 0; i < 24; i++) {

        KatSerwaL += 5
        if (KatSerwaL > MAX_SERV_L) KatSerwaL = MAX_SERV_L
        if (DebugMode) basic.showNumber(Math.round(KatSerwaL / 10))
        KatSerwaP -= 5
        if (KatSerwaP < MIN_SERV_P) KatSerwaP = MIN_SERV_P
        if (DebugMode) basic.showNumber(Math.round(KatSerwaP / 10))
        Servo.Servo(SERV_P, KatSerwaP) //prawy   -  20->140
        Servo.Servo(SERV_L, KatSerwaL) //lewy    -  20->100
        basic.pause(50)
    }
    LastCmd = CMD_UP
}

function CmdOpen() {
    for (let i = 0; i < 10; i++) {
        KatSerwaS -= 2
        if (KatSerwaS < MIN_SERV_S) KatSerwaS = MIN_SERV_S
        if (DebugMode) basic.showNumber(Math.round(KatSerwaS / 10))
        Servo.Servo(SERV_S, KatSerwaS) //szczęki -  80->100
        basic.pause(100)
    }
    LastCmd = CMD_OPEN
}

function CmdClose() {
    for (let i = 0; i < 10; i++) {
        KatSerwaS += 2
        if (KatSerwaS > MAX_SERV_S) KatSerwaS = MAX_SERV_S
        if (DebugMode) basic.showNumber(Math.round(KatSerwaS / 10))
        Servo.Servo(SERV_S, KatSerwaS) //szczęki -  80->100
        basic.pause(100)
    }
    LastCmd = CMD_CLOSE
}

function CmdRight() {
    for (let i = 0; i < 130; i++) {
        KatSerwaB -= 1
        if (KatSerwaB < MIN_SERV_B) KatSerwaB = MIN_SERV_B
        if (DebugMode) basic.showNumber(Math.round(KatSerwaB / 10))
        Servo.Servo(SERV_B, KatSerwaB) //baza    -  20->150
        basic.pause(30)
    }
    LastCmd = CMD_RIGHT
}

function CmdLeft() {
    for (let i = 0; i < 130; i++) {
        KatSerwaB += 1
        if (KatSerwaB > MAX_SERV_B) KatSerwaB = MAX_SERV_B
        if (DebugMode) basic.showNumber(Math.round(KatSerwaB / 10))
        Servo.Servo(SERV_B, KatSerwaB) //baza    -  20->150
        basic.pause(30)
    }
    LastCmd = CMD_LEFT
}



// Uruchomienie słuchania na standardowej grupie, chyba, że podczas startu wciśniesz:
// A - wtedy grupa + 10
// B - wtedy grupa + 20
let RadioCh = INIT_GROUP
if (input.buttonIsPressed(Button.A)) RadioCh = INIT_GROUP + 10
else if (input.buttonIsPressed(Button.B)) RadioCh = INIT_GROUP + 20
radio.setGroup(RadioCh)
basic.showString("CH=" + RadioCh)

input.onButtonPressed(Button.AB, function () {
    DebugMode = !DebugMode
    basic.showString(' D=' + DebugMode)
})

input.onButtonPressed(Button.A, function () {
    if (DebugMode) {
        basic.showString('C')
        CmdInit()
        basic.clearScreen()
    }
})

input.onButtonPressed(Button.B, function () {
    //Demo
    CmdInit()
    basic.showString('C')
    CmdClose()
    basic.showString('U')
    CmdUp()
    basic.showString('L')
    CmdLeft()
    basic.showString('O')
    CmdOpen()
    basic.showString('D')
    CmdDown()
    basic.showString('C')
    CmdClose()
    basic.showString('U')
    CmdUp()
    basic.showString('R')
    CmdRight()
    basic.showString('D')
    CmdDown()
    basic.showString('O')
    CmdOpen()
    basic.clearScreen()
})




function CmdChangeRadioGroup(On: boolean, NewRadioGroup: number) {
    if (On) {
        RGrpEndTime = input.runningTime() + 60000 //po minucie zmieniam
        radio.setGroup(NewRadioGroup)
    } else {
        RGrpEndTime = 0
        radio.setGroup(INIT_GROUP)
    }
}




function ShowEncodedImg(EImg: string) {
    let len = EImg.length
    let pos = 0
    while (pos < len) {
        let digits = EImg.substr(pos, 2)
        let val = parseInt(digits)
        for (let i = 0; i < 5; i++) {
            if ((val % 2) == 1) led.plot(4 - i, Math.idiv(pos, 2))
            else led.unplot(4 - i, Math.idiv(pos, 2))
            val = Math.idiv(val, 2)
        }
        pos = pos + 2
    }
}
function CmdDisplay(receivedString: string) {

    let len = receivedString.length
    if (len > 4) {
        let Cmd = receivedString.substr(0, 4)
        let DspVal = receivedString.substr(4, len - 4)
        if (DebugMode) {
            basic.showString(Cmd + ">>" + DspVal)
        }
        if (Cmd == CMD_DISPSTR) {
            control.inBackground(function () {
                basic.showString(DspVal)
            })
        }
        if (Cmd == CMD_DSPLED) {
            ShowEncodedImg(DspVal)
        }
    }
}

function CmdDspIcon(Icon: IconNames) {
    basic.showIcon(Icon)
}

radio.onReceivedValue(function (Cmd: string, CmdValue: number) {
    if (DebugMode) {
        basic.showString(Cmd)
        basic.showNumber(CmdValue)
    }
    if (Cmd.charAt(0) == '#') CmdDisplay(Cmd)
    if (Cmd == CMD_LEFT) CmdLeft()
    if (Cmd == CMD_RIGHT) CmdRight()
    if (Cmd == CMD_UP) CmdRight()
    if (Cmd == CMD_DOWN) CmdRight()
    if (Cmd == CMD_OPEN) CmdRight()
    if (Cmd == CMD_CLOSE) CmdRight()
    if (Cmd == CMD_INIT) CmdRight()
    if (Cmd == CMD_NEXTSERVO) CmdRight()
    if (Cmd == CMD_INC_ANGLE) CmdRight()
    if (Cmd == CMD_DEC_ANGLE) CmdRight()
    if (Cmd == CMD_CHGGROUP) CmdChangeRadioGroup(ON, CmdValue)
    if (Cmd == CMD_DSPICON) CmdDspIcon(CmdValue)
})


basic.forever(function () {
    if (RGrpEndTime != 0) {
        if (RGrpEndTime <= input.runningTime()) {
            CmdChangeRadioGroup(OFF, INIT_GROUP)
        }
    }
    basic.pause(2)
}) 