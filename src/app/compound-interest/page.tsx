"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCurrencyDetailed(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

const compoundingOptions = [
  { label: "Monthly", value: 12 },
  { label: "Quarterly", value: 4 },
  { label: "Annually", value: 1 },
];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualRate, setAnnualRate] = useState("7");
  const [compounding, setCompounding] = useState(12);
  const [years, setYears] = useState("10");

  const results = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualRate) || 0) / 100;
    const n = compounding;
    const t = parseInt(years) || 0;

    if (P <= 0 && PMT <= 0) return null;
    if (t <= 0) return null;

    const totalMonths = t * 12;
    const totalContributions = P + PMT * totalMonths;
    const monthlyRate = Math.pow(1 + r / n, n / 12) - 1;

    let balance = P;
    const yearlyBreakdown: {
      year: number;
      balance: number;
      contributions: number;
      interest: number;
    }[] = [];

    for (let month = 1; month <= totalMonths; month++) {
      balance = balance * (1 + monthlyRate) + PMT;

      if (month % 12 === 0) {
        const year = month / 12;
        const yearContributions = P + PMT * month;
        const yearInterest = balance - yearContributions;
        yearlyBreakdown.push({
          year,
          balance,
          contributions: yearContributions,
          interest: yearInterest,
        });
      }
    }

    const totalInterest = balance - totalContributions;

    return {
      finalBalance: balance,
      totalContributions,
      totalInterest,
      yearlyBreakdown,
    };
  }, [principal, monthlyContribution, annualRate, compounding, years]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <div className="flex items-center gap-2 font-semibold">
            <Calculator className="size-5" />
            <span>MoneyWise</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Compound Interest Calculator
            </h1>
            <p className="mt-2 text-muted-foreground">
              See how your money grows over time with the power of compounding.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <Card>
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
                <CardDescription>
                  Enter your investment details to see your projected growth.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="principal">Initial Principal</Label>
                  <Input
                    id="principal"
                    type="number"
                    placeholder="10,000"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    min="0"
                    step="1000"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="contribution">Monthly Contribution</Label>
                  <Input
                    id="contribution"
                    type="number"
                    placeholder="500"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    min="0"
                    step="50"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                    <Input
                      id="rate"
                      type="number"
                      placeholder="7"
                      value={annualRate}
                      onChange={(e) => setAnnualRate(e.target.value)}
                      min="0"
                      max="50"
                      step="0.1"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="years">Time Period (Years)</Label>
                    <Input
                      id="years"
                      type="number"
                      placeholder="10"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      min="1"
                      max="50"
                      step="1"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Compounding Frequency</Label>
                  <div className="flex gap-2">
                    {compoundingOptions.map((opt) => (
                      <Button
                        key={opt.value}
                        variant={
                          compounding === opt.value ? "default" : "outline"
                        }
                        onClick={() => setCompounding(opt.value)}
                      >
                        {opt.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Results</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {results ? (
                    <>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-muted-foreground">
                          Final Balance
                        </span>
                        <span className="text-3xl font-bold tracking-tight">
                          {formatCurrencyDetailed(results.finalBalance)}
                        </span>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">
                            Total Contributions
                          </span>
                          <span className="text-lg font-semibold">
                            {formatCurrency(results.totalContributions)}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">
                            Interest Earned
                          </span>
                          <span className="text-lg font-semibold text-chart-2">
                            {formatCurrency(results.totalInterest)}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Enter valid investment details to see your results.
                    </p>
                  )}
                </CardContent>
              </Card>

              {results && results.yearlyBreakdown.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Year-by-Year Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      {results.yearlyBreakdown.map((row) => (
                        <div
                          key={row.year}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            Year {row.year}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(row.balance)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
