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

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState("300000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [loanType, setLoanType] = useState<"pi" | "interest-only">("pi");

  const results = useMemo(() => {
    const principal = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(interestRate) || 0;
    const years = parseInt(loanTerm) || 0;
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = years * 12;

    if (principal <= 0 || monthlyRate <= 0 || totalMonths <= 0) {
      return null;
    }

    let monthlyPayment: number;
    let totalPaid: number;
    let totalInterest: number;

    if (loanType === "pi") {
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      totalPaid = monthlyPayment * totalMonths;
      totalInterest = totalPaid - principal;
    } else {
      monthlyPayment = principal * monthlyRate;
      totalPaid = monthlyPayment * totalMonths + principal;
      totalInterest = monthlyPayment * totalMonths;
    }

    return { monthlyPayment, totalPaid, totalInterest };
  }, [loanAmount, interestRate, loanTerm, loanType]);

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
              Mortgage Repayment Calculator
            </h1>
            <p className="mt-2 text-muted-foreground">
              Calculate your monthly repayments and see the full cost of your
              home loan.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>
                  Enter your mortgage information to see your repayment schedule.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="loanAmount">Loan Amount</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="300,000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    min="0"
                    step="1000"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="interestRate">
                      Annual Interest Rate (%)
                    </Label>
                    <Input
                      id="interestRate"
                      type="number"
                      placeholder="6.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      min="0"
                      max="30"
                      step="0.1"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      placeholder="30"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      min="1"
                      max="50"
                      step="1"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Loan Type</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={loanType === "pi" ? "default" : "outline"}
                      onClick={() => setLoanType("pi")}
                    >
                      Principal & Interest
                    </Button>
                    <Button
                      variant={loanType === "interest-only" ? "default" : "outline"}
                      onClick={() => setLoanType("interest-only")}
                    >
                      Interest Only
                    </Button>
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
                          Monthly Repayment
                        </span>
                        <span className="text-3xl font-bold tracking-tight">
                          {formatCurrencyDetailed(results.monthlyPayment)}
                        </span>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">
                            Total Interest
                          </span>
                          <span className="text-lg font-semibold">
                            {formatCurrency(results.totalInterest)}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">
                            Total Paid
                          </span>
                          <span className="text-lg font-semibold">
                            {formatCurrency(results.totalPaid)}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Enter valid loan details to see your results.
                    </p>
                  )}
                </CardContent>
              </Card>

              {results && (
                <Card>
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Over{" "}
                      <span className="font-medium text-foreground">
                        {loanTerm} years
                      </span>
                      , you will pay{" "}
                      <span className="font-medium text-foreground">
                        {formatCurrency(results.totalPaid)}
                      </span>{" "}
                      in total, which includes{" "}
                      <span className="font-medium text-foreground">
                        {formatCurrency(results.totalInterest)}
                      </span>{" "}
                      in interest charges. That&apos;s{" "}
                      <span className="font-medium text-foreground">
                        {formatCurrency(results.totalInterest / (parseInt(loanTerm) || 1))}
                      </span>{" "}
                      per year in interest alone.
                    </p>
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
