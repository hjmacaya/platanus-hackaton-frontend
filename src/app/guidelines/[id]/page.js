'use client';
import { UploadPage } from '@/components/UploadPage';
import { Table } from '@/components/tables';
import { configFile } from '../../../config';

export default function GuidelinesPage() {

  // Table actions
  const handleView = (test) => {
    console.log("Viewing test:", test);
  }
  const handleEdit = (test) => {
    console.log("Editing test:", test);
  }
  const handleDownload = (test) => {
    console.log("Downloading test:", test);
  }
  const handleDelete = (test) => {
    console.log("Deleting test:", test);
  }

  const testsMock = [
    {
      id: 1,
      nombre: "Prueba de Pepito Perez",
      puntajeTotal: "80/100",
      desempeño: "80%",
      link: "/tests/1"
    },
    {
      id: 2,
      nombre: "Prueba de Maria Gomez",
      puntajeTotal: "80/100",
      desempeño: "80%",
      link: "/tests/2"
    },
    {
      id: 3,
      nombre: "Prueba de Juan Pérez",
      puntajeTotal: "80/100",
      desempeño: "80%",
      link: "/tests/3"
    }
  ]
  return (
    <div>
      {/* Drag and Drop Upload */}
      <UploadPage apiEndpoint={`${configFile.API_BASE_URL}/prueba/`} method="POST" elementToDrop="pruebas" />

      {/* Tests Table */}
      <div className="flex justify-center items-center my-4">
        <h1 className="text-2xl font-bold">Tus Pruebas</h1>
      </div>
      <Table 
        data={testsMock} 
        styleVariant="style2" 
        onView={handleView}
        onEdit={handleEdit}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />
    </div>
  )
}