let katserwo = 0
let index = 0
let index2 = 0

input.onButtonPressed(Button.A, function () {
    basic.showString("A")
    for (let index2 = 0; index2 <= 30; index2++) {
        katserwo = index2 * 1
        motor.servo(motor.Servos.S1, katserwo)
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
    basic.showString("B")
    for (let index2 = 0; index2 <= 30; index2++) {
        katserwo = 30 - index2 * 1
        motor.servo(motor.Servos.S1, katserwo)
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
index = 0
katserwo = 0
basic.forever(function () {

})
