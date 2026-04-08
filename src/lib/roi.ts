export type RoiInputs = {
  repetitiveHoursPerWeek: number
  monthlySalaryArs: number
}

export type RoiOutputs = {
  monthlyRepetitiveCostArs: number
  monthlySavingsArs: number
  annualSavingsArs: number
  monthlyHoursRecovered: number
}

const MONTHLY_WORK_HOURS = 160
const WEEKS_PER_MONTH = 4
const AUTOMATION_EFFICIENCY = 0.85

export function calculateRoi(inputs: RoiInputs): RoiOutputs {
  const monthlyRepetitiveCostArs =
    (inputs.monthlySalaryArs / MONTHLY_WORK_HOURS) *
    inputs.repetitiveHoursPerWeek *
    WEEKS_PER_MONTH

  const monthlySavingsArs = monthlyRepetitiveCostArs * AUTOMATION_EFFICIENCY
  const annualSavingsArs = monthlySavingsArs * 12
  const monthlyHoursRecovered =
    inputs.repetitiveHoursPerWeek * WEEKS_PER_MONTH * AUTOMATION_EFFICIENCY

  return {
    monthlyRepetitiveCostArs,
    monthlySavingsArs,
    annualSavingsArs,
    monthlyHoursRecovered,
  }
}
