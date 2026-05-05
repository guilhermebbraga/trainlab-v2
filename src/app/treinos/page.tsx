import Workouts from "@/src/components/Workouts";
import { Suspense } from "react"
import TreinosClient from "./TreinosClient";

export default function Treinos() {

  return (
    <TreinosClient>
      <Suspense fallback={<p>Carregando treinos...</p>}>
        <Workouts />
      </Suspense>
    </TreinosClient>
  );
}
