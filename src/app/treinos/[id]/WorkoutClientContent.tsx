"use client";
import AppContainer from "@/src/components/Layout/AppContainer";
import Exercises from "@/src/components/Exercises";
import BottomWrapper from "@/src/components/ButtonWrapper";
import Button from "@/src/components/Button";

import NavHeader from "@/src/components/NavHeader";
import { useState } from "react";
import Modal from "@/src/components/Modal";
import { WorkoutData } from "@/src/interfaces/Workout";
import { MdEdit } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import { CiPlay1 } from "react-icons/ci";
import ExerciseForm from "@/src/components/Forms/ExerciseForm";
import { deleteWorkoutAction } from "../../actions/workouts-actions";
import { MdOutlineAdd } from "react-icons/md";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import WorkoutForm from "@/src/components/Forms/WorkoutForm";
import { BsThreeDotsVertical } from "react-icons/bs";

interface WorkoutClientContentProps {
  workout: WorkoutData;
}

export default function WorkoutClientContent({
  workout,
}: WorkoutClientContentProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const { name, exercises, id, description } = workout;

  if (!exercises || !exercises || !id) {
    return <p>Exercício não encontrado</p>;
  }

  const handleDeleteWorkout = async () => {
    const response = await deleteWorkoutAction(id);

    if (response.success) {
      toast.success("Treino deletado.");
      router.push("/treinos");
    } else {
      toast.error("Ocorreu um erro.");
    }
  };

  return (
    <AppContainer>
      {modalOpen && (
        <Modal modalTitle="Novo Exercício" setIsOpen={setModalOpen}>
          <ExerciseForm closeModal={() => setModalOpen(false)} workoutId={id} />
        </Modal>
      )}

      {workoutModalOpen && (
        <Modal modalTitle="Editar Treino" setIsOpen={setWorkoutModalOpen}>
          <WorkoutForm
            closeModal={() => setWorkoutModalOpen(false)}
            editing={id}
          />
        </Modal>
      )}

      <NavHeader />

      <section>
        <div className="flex gap-5 items-center justify-between">
          <h1 className="text-2xl font-medium">{name}</h1>

          <Button style="simple" icon={BsThreeDotsVertical} popup>
            <Button
              text="Adicionar"
              style="simple"
              icon={MdOutlineAdd}
              reverse
              onClick={() => setModalOpen(true)}
            />

            <Button
              style="simple"
              text="Editar"
              icon={MdEdit}
              reverse
              onClick={() => setWorkoutModalOpen(true)}
            />

            <Button
              text="Deletar"
              style="danger"
              reverse
              icon={FiTrash}
              onClick={handleDeleteWorkout}
            />
          </Button>
        </div>

        <p className="text-text-muted text-sm mt-2">{description}</p>

        <Exercises exercises={exercises} />
      </section>

      <BottomWrapper>
        <Button
          text="Iniciar"
          icon={CiPlay1}
          otherStyles="relative group w-[60%]"
        />
      </BottomWrapper>
    </AppContainer>
  );
}
