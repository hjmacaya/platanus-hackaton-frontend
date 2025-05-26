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
      const testsData = await getAllTestsByGuidelineId(params.guideline_id);
      console.log("Tests raw data:", testsData);
      
      // Make sure we're working with an array
      let testsArray = [];
      
      if (Array.isArray(testsData)) {
        testsArray = testsData;
      } else if (testsData && Array.isArray(testsData.data)) {
        testsArray = testsData.data;
      } else if (testsData && typeof testsData === 'object') {
        // If it's a single object, wrap it in an array
        testsArray = [testsData];
      }
      
      // Format the tests to match the table requirements
      const formattedData = testsArray.map(test => ({
        ...test,
        // Format dates to be human-readable if needed
        created_at: test.created_at ? new Date(test.created_at).toLocaleDateString() : '',
        updated_at: test.updated_at ? new Date(test.updated_at).toLocaleDateString() : ''
      }));
      
      const formattedTests = {
        data: formattedData
      };
      
      console.log("Formatted tests:", formattedTests);
      setTests(formattedTests);
    } catch (error) {
      console.error("Error fetching tests:", error);
      // Set empty array to prevent rendering errors
      setTests({ data: [] });
    }
  }

  // Fetch tests on component mount
  useEffect(() => {
    fetchTests();
  }, []);

  const showTable = tests?.data?.length > 0;
  const headersToIgnore = ['id', 'created_at', 'updated_at', 'guideline_id', 's3_link', 's3_filename', 'student_id', 'professor_id'];
  const headersMapping = {
    'title': 'Título',
    'student_score': 'Puntaje alumno',
    'description': 'Descripción',
    'subject': 'Asignatura',
    'total_points': 'Puntaje total',
    'positional_index': 'Posición'
  };
  return (
    <div>
      {/* Drag and Drop Upload */}
      <UploadPage 
        apiEndpoint={`${configFile.API_BASE_URL}/saveTest/`} 
        method="POST" 
        elementToDrop="pruebas" 
        isMultipleFiles={true}
        fetchFunction={fetchTests}
      />

      {/* Tests Table */}
      <div className="flex justify-center items-center my-4">
        <h1 className="text-2xl font-bold">Tus Pruebas</h1>
      </div>
      {tests?.data && Array.isArray(tests.data) && tests.data.length > 0 ? (
        <Table
          data={tests.data}
          styleVariant="style2"
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          headersToIgnore={headersToIgnore}
          headersMapping={headersMapping}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No hay pruebas disponibles para esta pauta.</p>
        </div>
      )}
    </div>
  )
}
