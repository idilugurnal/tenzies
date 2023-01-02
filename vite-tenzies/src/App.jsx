import React from "react"
import Die from "./components/Die"
import "./style.css"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App()
{
    const [allDice, setAllDice] = React.useState(newDice(10))
    const [gameOver, setGameOver] = React.useState(false)

    React.useEffect(() =>
    {
        const value = allDice[0].value
        if (allDice.every(dice => dice.value === value && dice.isHeld))
        {
            setGameOver(true)
        }
    }, [allDice])

    function holdDice(id)
    {
        setAllDice(prevDice =>
        {
            return prevDice.map(dice =>
            {
                return dice.id === id ?
                    {...dice, isHeld: !dice.isHeld} :
                    dice
            })
        })
    }

    function generateDie()
    {
        return {
            value: Math.floor(1 + Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function newDice(length)
    {
        const numbers = []
        for (let i = 0; i < length; i++)
        {
            numbers.push(generateDie())
        }
        return numbers
        //return Array.from({ length: 10 }, () => Math.floor(1 + Math.random() * 6));
    }

    function rollDice()
    {
        if (gameOver)
        {
            const dice = newDice(10)
            setAllDice(dice)
            setGameOver(false)
        }
        else
        {
            setAllDice(currentDice =>
            {
                return currentDice.map(dice =>
                {
                    return dice.isHeld ? dice :
                        generateDie()
                })
            })
        }
    }

    return (
        <main>
            {gameOver &&  <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.
            </p>
            <div className="die-container">
                {allDice.map(dice =>
                    <Die
                        key={dice.id}
                        value={dice.value} 
                        isHeld={dice.isHeld}
                        handleHold={() => holdDice(dice.id)}
                    />
                )}
            </div>
            <button className="roll-dice" onClick={rollDice}>
                {gameOver ? "Reset Game" : "Roll"}
            </button>
        </main>
    )
}