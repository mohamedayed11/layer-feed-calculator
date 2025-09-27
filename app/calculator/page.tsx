'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

type ChartPoint = { name: string; value: number }
type Result = {
  dailyFeedCost: number
  dailyEggs: number
  dailyIncome: number
  profit: number
  data: ChartPoint[]
}

export default function CalculatorPage() {
  const [feedPrice, setFeedPrice] = useState<number>(0)
  const [eggPrice, setEggPrice] = useState<number>(0)
  const [feedIntake, setFeedIntake] = useState<number>(110)
  const [hens, setHens] = useState<number>(1000)
  const [productionRate, setProductionRate] = useState<number>(85)

  const [result, setResult] = useState<Result | null>(null)

  const calculate = () => {
    const intakeKg = (feedIntake / 1000) * hens
    const dailyFeedCost = intakeKg * feedPrice
    const dailyEggs = hens * (productionRate / 100)
    const dailyIncome = dailyEggs * eggPrice
    const profit = dailyIncome - dailyFeedCost
    const data: ChartPoint[] = [
      { name: "Feed Cost", value: dailyFeedCost },
      { name: "Egg Income", value: dailyIncome },
      { name: "Profit", value: profit },
    ]
    setResult({ dailyFeedCost, dailyEggs, dailyIncome, profit, data })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">💡 Layer Feed Profit Calculator</h1>
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="inputs">
            <TabsList>
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="mt-4 grid gap-4">
              <div>
                <Label>Feed Price (per kg)</Label>
                <Input type="number" value={feedPrice} onChange={e => setFeedPrice(+e.target.value)} />
              </div>
              <div>
                <Label>Egg Price (per egg)</Label>
                <Input type="number" value={eggPrice} onChange={e => setEggPrice(+e.target.value)} />
              </div>
              <div>
                <Label>Feed Intake (g per hen per day)</Label>
                <Input type="number" value={feedIntake} onChange={e => setFeedIntake(+e.target.value)} />
              </div>
              <div>
                <Label>Number of Hens</Label>
                <Input type="number" value={hens} onChange={e => setHens(+e.target.value)} />
              </div>
              <div>
                <Label>Production Rate (%)</Label>
                <Input type="number" value={productionRate} onChange={e => setProductionRate(+e.target.value)} />
              </div>

              <Button onClick={calculate} className="mt-4">Calculate</Button>
            </TabsContent>

            <TabsContent value="results" className="mt-4">
              {result ? (
                <div className="grid gap-4">
                  <p><b>Daily Feed Cost:</b> {result.dailyFeedCost.toFixed(2)}</p>
                  <p><b>Daily Eggs:</b> {result.dailyEggs.toFixed(0)}</p>
                  <p><b>Daily Income:</b> {result.dailyIncome.toFixed(2)}</p>
                  <p><b>Profit:</b> {result.profit.toFixed(2)}</p>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={result.data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <p>No results yet. Please enter inputs and click Calculate.</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
