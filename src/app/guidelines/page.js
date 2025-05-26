'use client';
import { UploadPage } from '@/components/UploadPage';
import { Table } from '@/components/tables';
import { configFile } from '../../config';
import { useRouter } from 'next/navigation';
import { getAllGuidelines } from '../../api';
import { useEffect, useState } from 'react';

export default function GuidelinesPage() {
  const router = useRouter();
  const [allGuidelines, setAllGuidelines] = useState([]);

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

  // Rename the function to avoid conflict with the imported function
  const fetchGuidelines = async () => {
    try {
      const guidelines = await getAllGuidelines();
      console.log("Guidelines raw:", guidelines);

      // Format the guidelines to match the table requirements
      // The backend model has changed, so we need to adapt
      const formattedGuidelines = {
        data: Array.isArray(guidelines) ? guidelines.map(guideline => ({
          ...guideline,
          // Format dates to be human-readable if needed
          created_at: new Date(guideline.created_at).toLocaleDateString(),
          updated_at: new Date(guideline.updated_at).toLocaleDateString()
        })) : []
      };

      console.log("Formatted guidelines:", formattedGuidelines);
      setAllGuidelines(formattedGuidelines);
    } catch (error) {
      console.error('Error fetching guidelines:', error);
    }
  }

  useEffect(() => {
    fetchGuidelines();
  }, []);

  const showTable = allGuidelines?.data?.length > 0;

  const headersToIgnore = ['id', 'created_at', 'updated_at', 's3_link', 'professor_id', 's3_filename'];
  const headersMapping = {
    "max_score": "Puntaje máximo",
    "title": "Título",
    "topic": "Tema",
    "description": "Descripción"
  }

  return (
    <div className='mb-5'>

      {/* Drag and Drop Upload */}
      <UploadPage 
        apiEndpoint={`${configFile.API_BASE_URL}/saveFile/`} 
        method="POST"
        elementToDrop="pautas"
        fetchFunction={fetchGuidelines}
      />

      {/* Guidelines Table */}
      <div className="flex justify-center items-center my-4">
        <h1 className="text-2xl font-bold">Tus pautas</h1>
      </div>

      {allGuidelines?.data && allGuidelines.data.length > 0 ? ( 
        <Table 
          data={allGuidelines.data} 
          styleVariant="style2" 
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          headersToIgnore={headersToIgnore}
          headersMapping={headersMapping}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No hay pautas disponibles. Por favor sube una nueva pauta.</p>
        </div>
      )}
    </div>
  )
}