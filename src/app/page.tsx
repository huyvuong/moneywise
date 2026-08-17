import Link from "next/link";
import {
  Home as HomeIcon,
  TrendingUp,
  Calculator,
  BarChart3,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: HomeIcon,
    title: "Mortgage Repayment Calculator",
    description:
      "Calculate your monthly repayments, total interest, and see a full breakdown of your home loan costs over time.",
    href: "/mortgage",
    color: "text-chart-1",
  },
  {
    icon: TrendingUp,
    title: "Compound Interest Calculator",
    description:
      "See how your money grows over time with the power of compounding. Add regular contributions and watch your wealth build.",
    href: "/compound-interest",
    color: "text-chart-2",
  },
];

const steps = [
  {
    icon: Calculator,
    title: "Enter your numbers",
    description: "Plug in your loan details, interest rate, or investment amount.",
  },
  {
    icon: BarChart3,
    title: "Get instant results",
    description: "See monthly payments, total interest, or projected growth in real time.",
  },
  {
    icon: Lightbulb,
    title: "Make smarter decisions",
    description: "Use the insights to plan your finances with confidence.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Calculator className="size-5" />
            <span>MoneyWise</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/mortgage"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Mortgage
            </Link>
            <Link
              href="/compound-interest"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Compound Interest
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Plan your finances
            <br />
            <span className="text-muted-foreground">with confidence</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Free mortgage repayment and compound interest calculators to help
            you make smarter money decisions.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              render={<Link href="/mortgage" />}
            >
              Mortgage Calculator
              <ArrowRight className="size-4" data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/compound-interest" />}
            >
              Compound Interest Calculator
              <ArrowRight className="size-4" data-icon="inline-end" />
            </Button>
          </div>
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              Two powerful calculators
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">
              Everything you need to understand your loans and grow your savings.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <Card key={feature.href}>
                  <CardHeader>
                    <div
                      className={`mb-1 flex size-10 items-center justify-center rounded-lg bg-muted ${feature.color}`}
                    >
                      <feature.icon className="size-5" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="ghost"
                      className="w-full"
                      render={<Link href={feature.href} />}
                    >
                      Try it now
                      <ArrowRight
                        className="size-4"
                        data-icon="inline-end"
                      />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              How it works
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-foreground">
                    <step.icon className="size-6" />
                  </div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6 text-sm text-muted-foreground">
          <span>MoneyWise</span>
          <span>Free financial calculators</span>
        </div>
      </footer>
    </div>
  );
}
