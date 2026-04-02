export type RoiInputs = {
  repetitiveHoursPerWeek: number
  monthlyCostArs: number
  averageTicketArs: number
}

export type RoiOutputs = {
  monthlyHoursRecovered: number
  monthlyRecoveredValue: number
  monthlyOperationalSavings: number
  totalMonthlyImpactArs: number
  annualImpactArs: number
}

const TIME_RECOVERY_RATIO = 0.55
const TASK_AUTOMATION_RATIO = 0.45
const REVENUE_LEAKAGE_RATIO = 0.12

export function calculateRoi(inputs: RoiInputs): RoiOutputs {
  const monthlyHoursRecovered =
    inputs.repetitiveHoursPerWeek * 4.33 * TIME_RECOVERY_RATIO
  const monthlyOperationalSavings =
    inputs.monthlyCostArs * TASK_AUTOMATION_RATIO
  const monthlyRecoveredValue =
    inputs.averageTicketArs * REVENUE_LEAKAGE_RATIO
  const totalMonthlyImpactArs =
    monthlyOperationalSavings + monthlyRecoveredValue

  return {
    monthlyHoursRecovered,
    monthlyRecoveredValue,
    monthlyOperationalSavings,
    totalMonthlyImpactArs,
    annualImpactArs: totalMonthlyImpactArs * 12,
  }
}
