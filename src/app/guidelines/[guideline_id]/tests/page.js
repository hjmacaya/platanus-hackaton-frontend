'use client';
import { UploadPage } from '@/components/UploadPage';
import { Table } from '@/components/tables';
import { useRouter, useParams } from 'next/navigation';
import { configFile } from '../../../../config';
import { useState, useEffect } from 'react';
import { getAllTestsByGuidelineId } from '../../../../api';

export default function GuidelinesPage() {
  const router = useRouter();
  const params = useParams();
  const [tests, setTests] = useState([]);

  // Table actions
  const handleView = (test) => {
    // Go to the test page
    router.push(`/guidelines/${params.guideline_id}/tests/${test.id}`);
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

  // Get all tests by guideline id
  const fetchTests = async () => {
    try {
      const tests = await getAllTestsByGuidelineId(params.guideline_id);
      console.log("Tests:", tests);
      setTests(tests);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  }

  // Fetch tests on component mount
  useEffect(() => {
    fetchTests();
  }, []);

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

  const showTable = tests?.data?.length > 0;
  const headersToIgnore = ['created_at', 'guideline_id', 's3_link', 'positional_index', 's3_filename', 'student_id', 'id'];
  const headersMapping = {
    'title': 'Título',
    'student_score': 'Puntaje alumno',
  };
  return (
    <div>
      {/* Drag and Drop Upload */}
      <UploadPage apiEndpoint={`${configFile.API_BASE_URL}/prueba/`} method="POST" elementToDrop="pruebas" isMultipleFiles={true} />

      {/* Tests Table */}
      <div className="flex justify-center items-center my-4">
        <h1 className="text-2xl font-bold">Tus Pruebas</h1>
      </div>
      {showTable && (
        <Table 
          data={tests.data} 
          styleVariant="style2" 
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          headersToIgnore={headersToIgnore}
          headersMapping={headersMapping}
        />
      )}
    </div>
  )
}