'use client';
import { UploadPage } from '@/components/UploadPage';
import { Table } from '@/components/tables';
export default function GuidelinesPage() {

  // Table actions
  const handleView = (guideline) => {
    console.log("Viewing guideline:", guideline);
  }
  const handleEdit = (guideline) => {
    console.log("Editing guideline:", guideline);
  }
  const handleDelete = (guideline) => {
    console.log("Deleting guideline:", guideline);
  }

  const guidelinesMock = [
    {
      title: "Pauta 1",
      text: "Pauta de la Interrogación 1 de Ciencias Naturales",
      link: "/guidelines/1"
    },
    {
      title: "Pauta 2",
      text: "Pauta de la Interrogación 2 de Ciencias Naturales",
      link: "/guidelines/2"
    },
    {
      title: "Pauta 3",
      text: "Pauta del Examen de Ciencias Naturales",
      link: "/guidelines/3"
    },
    {
      title: "Pauta 4",
      text: "Pauta de la Interrogación 1 de Matemáticas",
      link: "/guidelines/4"
    },
    {
      title: "Pauta 5",
      text: "Pauta de la Interrogación 2 de Matemáticas",
      link: "/guidelines/5"
    }
  ]
  return (
    <div>
      {/* Drag and Drop Upload */}
      <UploadPage apiEndpoint="/api/guidelines" method="POST" />

      {/* Tests Table */}
      <div className="flex justify-center items-center my-4">
        <h1 className="text-2xl font-bold">Tus pautas</h1>
      </div>
      <Table 
        data={guidelinesMock} 
        styleVariant="style2" 
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}