"use client";
import Button from "@/src/components/Button";
import BottomWrapper from "@/src/components/ButtonWrapper";
import WorkoutForm from "@/src/components/Forms/WorkoutForm";
import AppContainer from "@/src/components/Layout/AppContainer";
import Section from "@/src/components/Layout/Section";
import Modal from "@/src/components/Modal";
import NavHeader from "@/src/components/NavHeader";
import Workouts from "@/src/components/Workouts";
import { useState } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";

export default function Treinos() {

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AppContainer>
      {modalOpen && (
        <Modal modalTitle="Criar treino" setIsOpen={setModalOpen}>
          <WorkoutForm closeModal={() => setModalOpen(false)}/>
        </Modal>
      )}

      <NavHeader />

      <Section title="Meus Treinos">
        <Workouts />
      </Section>

      <BottomWrapper>
        <Button icon={FaFilter} text="Filtrar" />
        <Button
          icon={FaPlus}
          text="Novo Treino"
          onClick={() => setModalOpen(true)}
        />
      </BottomWrapper>
    </AppContainer>
  );
}
