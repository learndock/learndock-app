import { useQuery } from "react-query";
import { Cell, Pie, PieChart } from "recharts";
import { useIsAuthenticated } from "../../../../hooks/Auth.hooks";
import { useLang } from "../../../../hooks/Language.hooks";
import { getSelfAssessmentRate } from "../../../../service/data/UserCompetenceAssessment.service";
import SimpleCard from "../../../lib/Cards/SimpleCard";
import { getThemeValue } from "../../../../utils/Colors.utils";

export default function SelfAssessmentRateCard() {
  const COLORS = [getThemeValue("--color-accent"), getThemeValue("--color-borders")];

  const { isAuthenticated } = useIsAuthenticated();
  const lang = useLang();

  const { data: rate = 0 } = useQuery({
    queryKey: ["self-assessment-rate"],
    queryFn: getSelfAssessmentRate,
    refetchInterval: 5000,
    enabled: isAuthenticated
  });

  const chartData = [
    { name: "Assessed", value: rate },
    { name: "Remaining", value: 100 - rate },
  ];

  if (!isAuthenticated) {
    return (
      <SimpleCard className="w-full max-w-sm bg-cards rounded-2xl shadow p-6 flex items-center justify-center">
        <p className="text-text-muted text-sm text-center">
          {lang("AUTH_LOGIN_TO_USE_FEATURE")}
        </p>
      </SimpleCard>
    );
  }

  return (
    <SimpleCard className="w-full max-w-sm bg-cards rounded-2xl shadow p-6 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="relative w-40 h-40">
          <PieChart width={160} height={160}>
            <Pie
              data={chartData}
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name + index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-text-primary">{rate}%</span>
          </div>
        </div>
        <p className="mt-4 text-text-secondary text-sm text-center">
          {lang("COMPETENCE_SELF_ASSESSMENT_COMPLETED")}
        </p>
      </div>
    </SimpleCard>
  );
}
