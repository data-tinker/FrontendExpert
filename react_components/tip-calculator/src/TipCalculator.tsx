import './TipCalculator.css'
import { toFixedNumber } from './util.ts'
import { ChangeEvent, useState } from 'react'

export default function TipCalculator() {
  const [bill, setBill] = useState<number>(50)
  const [tip, setTip] = useState<number>(18)
  const [people, setPeople] = useState<number>(1)

  const handleBill = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setBill(value)
  }

  const handleTip = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setTip(value)
  }

  const handlePeople = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setPeople(value)
  }

  const totalTip: number = toFixedNumber(10, 2, (bill * (tip / 100)))
  const tipPerPerson: number = toFixedNumber(10, 2, (totalTip / people))

  return (
    <>
      <label>
        Bill
        <input type="number" value={bill} onChange={handleBill}></input>
      </label>
      <label>
        Tip Percentage
        <input type="number" value={tip} onChange={handleTip}></input>
      </label>
      <label>
        Number of People
        <input type="number" value={people} onChange={handlePeople}></input>
      </label>
      <p>Total Tip: {totalTip > 0 ? `$${totalTip.toFixed(2)}` : '-'}</p>
      <p>Tip Per Person: {tipPerPerson > 0 ? `$${tipPerPerson.toFixed(2)}` : '-'}</p>
    </>
  )
}
