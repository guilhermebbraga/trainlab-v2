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

interface WorkoutClientContentProps {
    workout: WorkoutData
}

export default function WorkoutClientContent({workout}: WorkoutClientContentProps) {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false);
  const { name, exercises, id } = workout;
  

  if(!exercises || !exercises || !id) {
    return <p>Exercício não encontrado</p>
  }

  const handleDeleteWorkout = async () => {
    const response = await deleteWorkoutAction(id)

    if(response.success){
      toast.success("Treino deletado.")
      router.push('/treinos')
    }else {
      toast.error('Ocorreu um erro.')
    }
  }

  return (
    <AppContainer>
      {modalOpen && (
        <Modal modalTitle="Novo Exercício" setIsOpen={setModalOpen}>
          <ExerciseForm closeModal={() => setModalOpen(false)} workoutId={id} />
        </Modal>
      )}

      <NavHeader />
      <Section title={name}>
        <Exercises exercises={exercises} />
      </Section>

      <BottomWrapper>
        <Button text="Novo" icon={GoPlus} onClick={() => setModalOpen(!modalOpen)}/>

        <Button text="Iniciar" icon={CiPlay1}/>

        <Button text="Excluir" icon={FiTrash} onClick={handleDeleteWorkout}/>
      </BottomWrapper>
    </AppContainer>
  );
}
