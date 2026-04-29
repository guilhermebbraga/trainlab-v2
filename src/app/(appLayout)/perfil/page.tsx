import { toast } from "sonner";
import { getUserAction } from "../../actions/user-actions";
import { UserMe } from "@/src/interfaces/User";
import { getStatsAction } from "../../actions/stats-action";
import { StatsData } from "@/src/interfaces/Stats";
import { StatsGoal, statsGoalTranslate } from "@/src/constants/stats";
import { IoIosStats } from "react-icons/io";

export default async function Perfil() {
  const userResponse = await getUserAction();
  const statsResponse = await getStatsAction();

  if (!userResponse.success) {
    toast.success(userResponse.error);
    throw new Error();
  }

  if (!statsResponse.success) {
    toast.success(statsResponse.error);
    throw new Error();
  }

  const { name, email } = userResponse.data as UserMe;
  const stats = statsResponse.data as StatsData;

  return (
    <main>
      <section className="w-full h-50 bg-background-dark overflow-hidden relative flex items-end p-5">
        <div className="flex flex-col">
          <h3 className="text-4xl">{name}</h3>

          <p className="text-text-muted text-sm">{email}</p>
        </div>
        <div className="absolute right-0 h-full w-[76%] bg-primary/25 rounded-full blur-[100px]"/>
      </section>

      <section className="px-2 py-5">
        <div className="bg-background-dark/30 border-border-custom/40 border p-5 rounded-2xl">
          <div className="flex items-center gap-2 text-2xl">
            <IoIosStats />
            <h3 className="">Resumo</h3>
          </div>

          <div className="w-full h-px bg-white/5 rounded-full mt-2 mb-4" />
          <ul className="w-full grid grid-cols-3 gap-5">
            {(Object.entries(stats) as [StatsGoal, number][]).map(
              ([key, value]) => (
                <li className="text-center" key={key}>
                  <h3 className="text-2xl">{value}</h3>

                  <span className="text-sm text-text-muted">
                    {statsGoalTranslate[key]}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
