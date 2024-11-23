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
    router.push(`/guidelines/${guideline.id}`);
  
  }
  const handleEdit = (guideline) => {
    console.log("Editing guideline:", guideline);
  }
  const handleDelete = (guideline) => {
    console.log("Deleting guideline:", guideline);
  }

  const guidelinesMock = [
    { 
      id: 1,
      title: "Pauta 1",
      text: "Pauta de la Interrogación 1 de Ciencias Naturales",
      link: "/guidelines/1"
    },
    {
      id: 2,
      title: "Pauta 2",
      text: "Pauta de la Interrogación 2 de Ciencias Naturales",
      link: "/guidelines/2"
    },
    {
      id: 3,
      title: "Pauta 3",
      text: "Pauta del Examen de Ciencias Naturales",
      link: "/guidelines/3"
    },
    {
      id: 4,
      title: "Pauta 4",
      text: "Pauta de la Interrogación 1 de Matemáticas",
      link: "/guidelines/4"
    },
    {
      id: 5,
      title: "Pauta 5",
      text: "Pauta de la Interrogación 2 de Matemáticas",
      link: "/guidelines/5"
    }
  ]
  return (
    <div>
      {/* Drag and Drop Upload */}
      <UploadPage apiEndpoint={`${configFile.API_BASE_URL}/pauta/`} method="POST" />

      {/* Guidelines Table */}
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

      {/* Guidelines Cards */}
      {/* <div className="flex flex-row items-center justify-evenly flex-wrap gap-4">
        {guidelinesMock.map((guideline, index) => (
          <GuidelineCard key={index} {...guideline} />
        ))}
      </div> */}
    </div>
  )
}