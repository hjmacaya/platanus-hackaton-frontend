'use client';
import { UploadPage } from '@/components/UploadPage';
import { Table } from '@/components/tables';
import { configFile } from '../../config';
import { useRouter } from 'next/navigation';

export default function GuidelinesPage() {
  const router = useRouter();

  // Table actions
  const handleView = (guideline) => {
    // Go to the guideline page
    router.push(`/guidelines/${guideline.id}/tests`);
  }
  const handleEdit = (guideline) => {
    console.log("Editing guideline:", guideline);
  }
  const handleDownload = (guideline) => {
    console.log("Downloading guideline:", guideline);
  };
  const handleDelete = (guideline) => {
    console.log("Deleting guideline:", guideline);
  }

  const guidelinesMock = [
    { 
      id: 1,
      nombre: "Pauta 1",
      descripcion: "Pauta de la Interrogación 1 de Ciencias Naturales",
      fecha: "2024-01-01",
    },
    {
      id: 2,
      nombre: "Pauta 2",
      descripcion: "Pauta de la Interrogación 2 de Ciencias Naturales",
      fecha: "2024-01-01",
    },
    {
      id: 3,
      nombre: "Pauta 3",
      descripcion: "Pauta del Examen de Ciencias Naturales",
      fecha: "2024-01-01",
    },
    {
      id: 4,
      nombre: "Pauta 4",
      descripcion: "Pauta de la Interrogación 1 de Matemáticas",
      fecha: "2024-01-01",
    },
    {
      id: 5,
      nombre: "Pauta 5",
      descripcion: "Pauta de la Interrogación 2 de Matemáticas",
      fecha: "2024-01-01",
    }
  ]
  return (
    <div>
      {/* {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )} */}

      {/* Drag and Drop Upload */}
      <UploadPage 
        apiEndpoint={`${configFile.API_BASE_URL}/pauta/`} 
        method="POST"
        elementToDrop="pautas"
      />

      {/* Guidelines Table */}
      <div className="flex justify-center items-center my-4">
        <h1 className="text-2xl font-bold">Tus pautas</h1>
      </div>
      <Table 
        data={guidelinesMock} 
        styleVariant="style2" 
        onView={handleView}
        onEdit={handleEdit}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />

      {/* Guidelines Cards */}
      {/* <div className="flex flex-row items-center justify-evenly flex-wrap gap-4">
        {guidelinesMock.map((guideline, index) => (
          <GuidelineCard key={index} {...guideline} />
        ))}
      </div> */}
    </div>
  )
}