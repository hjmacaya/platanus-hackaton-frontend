'use client';
import { UploadPage } from '@/components/UploadPage';
import { Table } from '@/components/tables';
export default function GuidelinesPage() {

  // Table actions
  const handleView = (test) => {
    console.log("Viewing test:", test);
  }
  const handleEdit = (test) => {
    console.log("Editing test:", test);
  }
  const handleDelete = (test) => {
    console.log("Deleting test:", test);
  }

  const testsMock = [
    {
      id: 1,
      title: "Prueba de Pepito Perez",
      text: "Prueba de Pepito Perez",
      link: "/tests/1"
    },
    {
      id: 2,
      title: "Prueba de Maria Gomez",
      text: "Test de Matemáticas",
      link: "/tests/2"
    },
    {
      id: 3,
      title: "Prueba de Juan Pérez",
      text: "Test de Historia",
      link: "/tests/3"
    },
    {
      id: 4,
      title: "Prueba de Ana Gomez",
      text: "Test de Lengua",
      link: "/tests/4"
    },
    {
      id: 5,
      title: "Prueba de Pedro Gomez",
      text: "Test de Inglés",
      link: "/tests/5"
    }
  ]
  return (
    <div>
      {/* Drag and Drop Upload */}
      <UploadPage apiEndpoint="/pruebas" method="POST" elementToDrop="pruebas" />

      {/* Tests Table */}
      <div className="flex justify-center items-center my-4">
        <h1 className="text-2xl font-bold">Tus Pruebas</h1>
      </div>
      <Table 
        data={testsMock} 
        styleVariant="style2" 
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}