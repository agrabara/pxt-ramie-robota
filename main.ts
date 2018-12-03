let katserwo = 0
let index = 0
let index2 = 0
let numerserwa = 8
let maks_kat = 0
let DebugOn = 0

input.onButtonPressed(Button.A, function () {
    basic.showString("A")

    /*
        basic.showString("0")
        motor.servo(motor.Servos.S8, 0)
        basic.pause(2000)
        basic.showString("3")
        motor.servo(motor.Servos.S8, 5)
        basic.pause(2000)
        basic.showString("6")
        motor.servo(motor.Servos.S8, 10)
        basic.pause(2000)
        basic.showString("9")
        motor.servo(motor.Servos.S8, 15)
        basic.pause(2000)
        basic.showString("12")
        motor.servo(motor.Servos.S8, 20)
        basic.pause(2000)
        basic.showString("15")
        motor.servo(motor.Servos.S8, 25)
        basic.pause(2000)
        basic.showString("18")
        motor.servo(motor.Servos.S8, 30)
        basic.pause(2000)
    
    */

    basic.showString("A")


    for (let index2 = 0; index2 <= maks_kat; index2++) {
        katserwo = index2 * 1
        motor.servo(numerserwa, katserwo)
        basic.pause(100)
    }

    basic.showIcon(IconNames.Butterfly)

    for (let index2 = 0; index2 <= maks_kat; index2++) {
        katserwo = maks_kat - index2 * 1
        motor.servo(numerserwa, katserwo)
        basic.pause(100)
    }

    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
input.onButtonPressed(Button.B, function () {

    numerserwa++
    if (numerserwa > 8) { numerserwa = 1 }
    if (DebugOn == 1) { basic.showNumber(9 - numerserwa) }
    switch (numerserwa) {
        case 1: maks_kat = 180; break //serwo 8
        case 2: maks_kat = 120; break //serwo 7
        case 3: maks_kat = 120; break //serwo 6
        case 4: maks_kat = 180; break //serwo 5
        case 5: maks_kat = 30; break //serwo 4 - szczeki
        case 6: maks_kat = 40; break //serwo 3 - lewy roboczy
        case 7: maks_kat = 70; break //serwo 2 - baza
        case 8: maks_kat = 50; break //serwo 1 - prawy roboczy
        default: maks_kat = 30;
    }
    if (DebugOn == 1) {
        basic.showString("->")
        basic.showNumber(maks_kat)
    }
})

basic.forever(function () { })

//on start - if button A pressed DebugOn
if (input.buttonIsPressed(Button.A)) {
    DebugOn = 1
    if (DebugOn == 1) {
        basic.showString("DebugOn, ramie robota v14")
    }
}

