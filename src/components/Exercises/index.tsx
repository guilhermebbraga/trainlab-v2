'use client'

import { Exercise } from "@/src/interfaces/Exercise";
import ExerciseLi from "../ExerciseLi";
import { useState } from "react";
import Modal from "../Modal";
import ExerciseForm from "../Forms/ExerciseForm";

interface ExercisesProps {
  exercises: Exercise[];
}

export default function Exercises({ exercises }: ExercisesProps) {

  const [editing, setEditing] = useState<string | null>()
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  
  const handleOpenModal = (id: string) => {
    setExerciseModalOpen(true)
    setEditing(id)
  }

  return (
    <>

    {exerciseModalOpen && (
        <Modal modalTitle="Editar Exercício" setIsOpen={setExerciseModalOpen}>
          <ExerciseForm
            workoutId=""
            closeModal={() => setExerciseModalOpen(false)}
            editing={editing}
          />
        </Modal>
      )}
    
    <ul className="mt-7.5 mb-20 flex flex-col gap-5">
      {exercises?.map((exercise, index) => (

        <ExerciseLi key={index} exercise={exercise} editing={handleOpenModal}/>
        
      ))}
    </ul>
    </>
  );
}
