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

interface WorkoutClientContentProps {
    workout: WorkoutData
}

export default function WorkoutClientContent({workout}: WorkoutClientContentProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { name, exercises, id } = workout;
  

  if(!exercises || !exercises || !id) {
    return <p>Exercício não encontrado</p>
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

        <Button text="Excluir" icon={FiTrash}/>
      </BottomWrapper>
    </AppContainer>
  );
}
