"use client";
import Button from "@/src/components/Button";
import WorkoutForm from "@/src/components/Forms/WorkoutForm";
import AppContainer from "@/src/components/Layout/AppContainer";
import Section from "@/src/components/Layout/Section";
import Modal from "@/src/components/Modal";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

interface TreinosClientProps {
  children: React.ReactNode;
}

export default function TreinosClient({ children }: TreinosClientProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AppContainer>
      {modalOpen && (
        <Modal modalTitle="Criar treino" setIsOpen={setModalOpen}>
          <WorkoutForm closeModal={() => setModalOpen(false)} />
        </Modal>
      )}

      {/* <NavHeader /> */}

      <Section title="Meus Treinos">
        {children}

        <div className="w-full mt-5 flex justify-center">
          <Button
            icon={FaPlus}
            text="Novo treino"
            style="simple"
            onClick={() => setModalOpen(true)}
          />
        </div>
      </Section>
    </AppContainer>
  );
}
