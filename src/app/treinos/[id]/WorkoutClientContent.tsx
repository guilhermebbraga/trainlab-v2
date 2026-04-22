"use client";
import AppContainer from "@/src/components/Layout/AppContainer";
import Section from "@/src/components/Layout/Section";
import Exercises from "@/src/components/Exercises";
import BottomWrapper from "@/src/components/ButtonWrapper";
import Button from "@/src/components/Button";

import NavHeader from "@/src/components/NavHeader";
import { useState } from "react";
import Modal from "@/src/components/Modal";
import { WorkoutData } from "@/src/interfaces/Workout";

import { FiTrash } from "react-icons/fi";
import { CiPlay1 } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import ExerciseForm from "@/src/components/Forms/ExerciseForm";
import { deleteWorkoutAction } from "../../actions/workouts-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import WorkoutForm from "@/src/components/Forms/WorkoutForm";
import { BsThreeDots } from "react-icons/bs";

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
        <Modal modalTitle="Novo Exercício" setIsOpen={setModalOpen}>
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

          {/* <div className="relative">
            <div className="w-fit h-fit p-2 flex flex-col gap-2 border border-border-custom/40 bg-background-light absolute top-12 shadow-xl right-2 rounded-2xl">
              <Button
                text="Editar"
                onClick={handleDeleteWorkout}
              />

              <Button text="Compartilhar" onClick={handleDeleteWorkout} />

              <Button
                text="Deletar"
                onClick={handleDeleteWorkout}
              />

              <Button text="Exercício" onClick={() => setModalOpen(!modalOpen)} />
            </div>

            <Button text="" icon={BsThreeDots} onClick={handleDeleteWorkout} />
          </div> */}
        </div>

        <p className="text-text-muted text-sm mt-1">
          {description} Lorem ipsum dolor sit. Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Facilis, voluptatibus fuga sunt
          aspernatur
        </p>

        <Exercises exercises={exercises} />
      </section>

      <BottomWrapper>
        <Button
          text="Iniciar"
          icon={CiPlay1}
          otherStyles="relative group w-[60%]"
        />
        <Button text="Exercício" onClick={() => setModalOpen(!modalOpen)} />
      </BottomWrapper>
    </AppContainer>
  );
}
